"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Presentation,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import { cn, formatElapsed } from "@/lib/utils";
import { CHAPTERS, chapterHref } from "@/lib/site";
import { SPEAKER_NOTES } from "@/lib/speaker-notes";

const TOTAL = CHAPTERS.length;

/**
 * The speaker's private console (distinct from the audience-facing
 * PresentationChrome). Full-screen overlay toggled with P: chapter quick-jump,
 * speaker notes, decorative live metrics, and a timer.
 */
export default function PresenterMode() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [running, setRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [fps, setFps] = useState(60);
  const base = useRef(0);

  // Keyboard: P toggles, arrows navigate while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const editing =
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable);
      if ((e.key === "p" || e.key === "P") && !editing) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open || editing) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => Math.min(TOTAL - 1, i + 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Timer + decorative FPS jitter.
  useEffect(() => {
    if (!open || !running) return;
    if (base.current === 0) base.current = Date.now() - elapsed;
    const id = setInterval(() => {
      setElapsed(Date.now() - base.current);
      setFps(57 + Math.floor(Math.random() * 6));
    }, 500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, running]);

  const resetTimer = () => {
    base.current = Date.now();
    setElapsed(0);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CHAPTERS.filter(
      (c) => !q || c.title.toLowerCase().includes(q) || c.kicker.toLowerCase().includes(q)
    );
  }, [query]);

  const chapter = CHAPTERS[index];
  const note = SPEAKER_NOTES[chapter.n];

  return (
    <>
      {/* Trigger, bottom-right, when console closed */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="interactive-control glass fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
        >
          <Presentation size={14} className="text-accent-gold" />
          Presenter
          <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] text-white/70">
            P
          </kbd>
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-space-black/95 backdrop-blur-xl"
          >
            {/* Header */}
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 rounded-full bg-accent-gold/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-accent-gold">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-gold opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-gold" />
                  </span>
                  Presenter Mode Active
                </span>
              </div>

              <div className="flex items-center gap-2">
                <label className="glass flex items-center gap-2 rounded-full px-3 py-1.5">
                  <Search size={12} className="text-white/40" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Quick jump..."
                    className="w-28 bg-transparent font-mono text-[11px] text-white outline-none placeholder:text-white/30 sm:w-40"
                  />
                </label>

                <div className="glass flex items-center gap-1 rounded-full px-2 py-1.5">
                  <span className="px-2 font-mono text-[11px] tabular-nums text-white/80">
                    {formatElapsed(elapsed)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setRunning((r) => !r)}
                    aria-label={running ? "Pause timer" : "Start timer"}
                    className="interactive-control flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/10"
                  >
                    {running ? <Pause size={12} /> : <Play size={12} />}
                  </button>
                  <button
                    type="button"
                    onClick={resetTimer}
                    aria-label="Reset timer"
                    className="interactive-control flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/10"
                  >
                    <RotateCcw size={12} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close presenter mode"
                  className="interactive-control glass flex h-8 w-8 items-center justify-center rounded-full"
                >
                  <X size={14} />
                </button>
              </div>
            </header>

            {/* Body: 3 columns */}
            <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden p-4 sm:px-6 lg:grid-cols-[240px_1fr_260px]">
              {/* Left: chapter list */}
              <aside className="allow-scroll hidden overflow-y-auto lg:block">
                <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">
                  Chapters
                </div>
                <div className="mt-3 flex flex-col gap-1">
                  {filtered.map((c) => {
                    const i = CHAPTERS.indexOf(c);
                    const active = i === index;
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => setIndex(i)}
                        className={cn(
                          "interactive-control flex items-baseline gap-2 rounded-lg px-3 py-2 text-left",
                          active
                            ? "bg-accent-gold/10 text-white"
                            : "text-white/60 hover:bg-white/5"
                        )}
                      >
                        <span
                          className={cn(
                            "font-mono text-[9px]",
                            active ? "text-accent-gold" : "text-white/40"
                          )}
                        >
                          {String(c.n).padStart(2, "0")}
                        </span>
                        <span className="text-xs leading-tight">{c.title}</span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Center: notes */}
              <section className="allow-scroll flex flex-col overflow-y-auto">
                <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-accent-gold">
                  {chapter.label} / {chapter.kicker}
                </div>
                <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                  {chapter.title}
                </h2>

                <div className="mt-6 flex flex-col gap-2">
                  {note?.notes.map((n, i) => (
                    <NoteCard key={i} n={i + 1} text={n} />
                  ))}
                </div>

                <Link
                  href={chapterHref(chapter.slug)}
                  className="interactive-control glass mt-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs"
                >
                  Open this chapter deck
                  <ChevronRight size={14} className="text-accent-gold" />
                </Link>

                <div className="mt-auto pt-6">
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                    <span>Arrow keys: navigate</span>
                    <span>P: toggle</span>
                    <span>Esc: close</span>
                  </div>
                </div>
              </section>

              {/* Right: metrics + controls */}
              <aside className="flex flex-col gap-3">
                <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">
                  Live Session
                </div>
                <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
                  <Metric label="Audience" value="128" />
                  <Metric label="Stream" value="LIVE" accent />
                  <Metric label="FPS" value={String(fps)} />
                </div>

                <div className="glass mt-2 rounded-xl p-4">
                  <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                    <span>Progress</span>
                    <span className="text-accent-gold">
                      {chapter.n} / {TOTAL}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent-orange to-accent-gold"
                      animate={{ width: `${((index + 1) / TOTAL) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIndex((i) => Math.max(0, i - 1))}
                    disabled={index === 0}
                    className="interactive-control glass flex items-center justify-center gap-1 rounded-xl py-3 text-xs font-medium disabled:opacity-30"
                  >
                    <ChevronLeft size={14} /> Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => setIndex((i) => Math.min(TOTAL - 1, i + 1))}
                    disabled={index === TOTAL - 1}
                    className="interactive-control flex items-center justify-center gap-1 rounded-xl bg-accent-gold py-3 text-xs font-semibold text-black disabled:opacity-30"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NoteCard({ n, text }: { n: number; text: string }) {
  const match = text.match(/^(HOOK|METRIC|TRANSITION):\s*(.*)$/);
  const tag = match?.[1];
  const body = match?.[2] ?? text;
  return (
    <div className="glass flex gap-3 rounded-lg px-4 py-3">
      <span className="mt-0.5 font-mono text-xs text-white/30">
        {String(n).padStart(2, "0")}
      </span>
      <p className="text-sm leading-relaxed text-white/75">
        {tag && (
          <span className="mr-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent-gold">
            {tag}
          </span>
        )}
        {body}
      </p>
    </div>
  );
}

function Metric({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="glass rounded-xl px-3 py-3 text-center lg:text-left">
      <div
        className={cn(
          "font-mono text-lg font-bold tabular-nums",
          accent ? "text-accent-gold" : "text-white"
        )}
      >
        {value}
      </div>
      <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">
        {label}
      </div>
    </div>
  );
}
