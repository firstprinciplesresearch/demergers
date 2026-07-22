"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Mono, uppercase, wide-tracked micro-label above every heading. */
export function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-mono text-[9px] uppercase tracking-[0.32em] text-accent-gold",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Standard scene header: kicker + big headline + optional lede. */
export function SceneHeader({
  kicker,
  title,
  lede,
  align = "left",
  className,
}: {
  kicker: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto text-center",
        "max-w-3xl",
        className
      )}
    >
      <Kicker className={align === "center" ? "flex justify-center" : ""}>
        {kicker}
      </Kicker>
      <h2 className="mt-3 text-balance text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {lede && (
        <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/60 sm:text-base">
          {lede}
        </p>
      )}
    </div>
  );
}

/** Glass panel with hover-accent border. */
export function Panel({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass rounded-xl",
        interactive && "interactive-control cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Counts up to `value` once `active` becomes true. Respects reduced-motion by
 * snapping to the final value.
 */
export function AnimatedCounter({
  value,
  active,
  duration = 1200,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  active: boolean;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number>(0);
  const played = useRef(false);

  useEffect(() => {
    if (!active) {
      played.current = false;
      setDisplay(0);
      return;
    }
    if (played.current) return;
    played.current = true;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, value, duration]);

  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/** A labeled stat block. */
export function Stat({
  value,
  label,
  active,
  decimals = 0,
  prefix = "",
  suffix = "",
  accent = false,
}: {
  value: number;
  label: string;
  active: boolean;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div className="glass rounded-xl px-5 py-4">
      <div
        className={cn(
          "font-mono text-3xl font-black tracking-tight sm:text-4xl",
          accent ? "text-accent-gold" : "text-white"
        )}
      >
        <AnimatedCounter
          value={value}
          active={active}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
        />
      </div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
        {label}
      </div>
    </div>
  );
}

/** Orbital rings backdrop for hero-type scenes. */
export function OrbitalRings({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        className
      )}
    >
      {[280, 460, 660, 900].map((size, i) => (
        <div
          key={size}
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5",
            i % 2 === 0 ? "animate-spin-slower" : "animate-spin-slow"
          )}
          style={{ width: size, height: size }}
        >
          <span
            className="absolute h-1.5 w-1.5 rounded-full bg-accent-gold/50"
            style={{ top: -3, left: "50%" }}
          />
        </div>
      ))}
    </div>
  );
}

/** Fade-and-rise wrapper for content that appears when a scene is active. */
export function Reveal({
  children,
  active,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  active: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={false}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 8 }}
      transition={{ duration: 0.5, delay: active ? delay : 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
