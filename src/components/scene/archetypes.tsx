"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "./kit";

/* --------------------------------------------------------------------------
   Accordion: problem <-> solution reveal
-------------------------------------------------------------------------- */
export interface AccordionItem {
  q: string;
  a: string;
  tag?: string;
}

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={cn(
              "glass interactive-control overflow-hidden rounded-xl",
              isOpen && "border-accent-gold/40"
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="flex items-center gap-3">
                {item.tag && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-gold">
                    {item.tag}
                  </span>
                )}
                <span className="text-sm font-semibold sm:text-base">
                  {item.q}
                </span>
              </span>
              <ChevronDown
                size={16}
                className={cn(
                  "shrink-0 text-white/50 transition-transform",
                  isOpen && "rotate-180 text-accent-gold"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="px-5 pb-4 text-sm leading-relaxed text-white/60">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Node network / stack diagram with detail panel
-------------------------------------------------------------------------- */
export interface DiagramNode {
  id: string;
  label: string;
  detail: string;
  metric?: string;
}

export function NodeStack({ nodes }: { nodes: DiagramNode[] }) {
  const [selected, setSelected] = useState(0);
  const active = nodes[selected];
  return (
    <div className="grid gap-5 md:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col gap-2">
        {nodes.map((n, i) => {
          const on = selected === i;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => setSelected(i)}
              className={cn(
                "interactive-control glass flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-left",
                on && "border-accent-gold/50 bg-accent-gold/5"
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded font-mono text-[10px]",
                    on
                      ? "bg-accent-gold text-black"
                      : "bg-white/10 text-white/60"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    on ? "text-white" : "text-white/70"
                  )}
                >
                  {n.label}
                </span>
              </span>
              {n.metric && (
                <span className="font-mono text-[10px] text-accent-gold">
                  {n.metric}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.3 }}
          className="glass flex flex-col justify-center rounded-xl p-6"
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-accent-gold">
            {active.metric ?? "Layer"}
          </div>
          <h4 className="mt-2 text-xl font-bold">{active.label}</h4>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            {active.detail}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Comparison table with emphasized row
-------------------------------------------------------------------------- */
export interface CompareRow {
  label: string;
  cells: string[];
  emphasize?: boolean;
}

export function CompareTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: CompareRow[];
}) {
  return (
    <div className="glass overflow-x-auto rounded-xl">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-3" />
            {columns.map((c) => (
              <th
                key={c}
                className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.label}
              className={cn(
                "border-b border-white/5 last:border-0",
                r.emphasize && "bg-accent-gold/5"
              )}
            >
              <td
                className={cn(
                  "px-4 py-3 font-medium",
                  r.emphasize ? "text-accent-gold" : "text-white/80"
                )}
              >
                {r.label}
              </td>
              {r.cells.map((cell, i) => (
                <td
                  key={i}
                  className={cn(
                    "px-4 py-3",
                    r.emphasize ? "text-white" : "text-white/60"
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Horizontal bar chart that grows when active
-------------------------------------------------------------------------- */
export interface BarDatum {
  label: string;
  value: number;
  display?: string;
  emphasize?: boolean;
}

export function BarChart({
  data,
  active,
  suffix = "",
  max,
}: {
  data: BarDatum[];
  active: boolean;
  suffix?: string;
  max?: number;
}) {
  const peak = max ?? Math.max(...data.map((d) => d.value));
  return (
    <div className="flex flex-col gap-3">
      {data.map((d, i) => (
        <div key={d.label} className="flex items-center gap-3">
          <div className="w-28 shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.12em] text-white/60 sm:w-40">
            {d.label}
          </div>
          <div className="relative h-7 flex-1 overflow-hidden rounded bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: active ? `${(d.value / peak) * 100}%` : 0 }}
              transition={{ duration: 0.9, delay: 0.06 * i, ease: "easeOut" }}
              className={cn(
                "h-full rounded",
                d.emphasize
                  ? "bg-gradient-to-r from-accent-orange to-accent-gold"
                  : "bg-white/25"
              )}
            />
          </div>
          <div
            className={cn(
              "w-16 shrink-0 font-mono text-xs tabular-nums",
              d.emphasize ? "text-accent-gold" : "text-white/70"
            )}
          >
            {d.display ?? (
              <AnimatedCounter value={d.value} active={active} suffix={suffix} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Vertical timeline rail
-------------------------------------------------------------------------- */
export interface TimelineItem {
  year: string;
  title: string;
  detail: string;
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative pl-6">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-accent-gold/60 via-white/15 to-transparent" />
      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div key={item.year} className="relative">
            <span className="absolute -left-6 top-1 flex h-4 w-4 items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-accent-gold ring-4 ring-accent-gold/15" />
            </span>
            <div className="font-mono text-[11px] tracking-[0.2em] text-accent-gold">
              {item.year}
            </div>
            <div className="mt-0.5 text-sm font-semibold sm:text-base">
              {item.title}
            </div>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-white/55">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
