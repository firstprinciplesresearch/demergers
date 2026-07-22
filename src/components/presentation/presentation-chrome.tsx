"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { cn, formatElapsed } from "@/lib/utils";
import { getLenis } from "@/lib/lenis-ref";
import { BrandGlyph, BrandWordmark } from "@/components/brand-mark";
import type { PresentationController } from "./use-presentation";

export interface PresentationScene {
  id: string;
  name: string;
  label: string; // "01 / n"
  startFrame: number;
  endFrame: number;
}

export default function PresentationChrome({
  controller,
  scenes,
}: {
  controller: PresentationController;
  scenes: PresentationScene[];
}) {
  const {
    presentationActive,
    currentFrameIndex,
    totalFrames,
    elapsedTime,
    enter,
    exit,
    nextSlide,
    prevSlide,
    goToFrame,
  } = controller;

  const activeScene =
    scenes.find(
      (s) =>
        currentFrameIndex >= s.startFrame && currentFrameIndex <= s.endFrame
    ) ?? scenes[0];

  return (
    <>
      {/* Brand chip, bottom-left */}
      <div className="hud-overlay pointer-events-none fixed bottom-4 left-4 z-50">
        <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5">
          <BrandGlyph className="h-4 w-4" />
          <BrandWordmark compact />
        </div>
      </div>

      {/* Top-right: PRESENTATION MODE toggle */}
      <div className="hud-overlay fixed right-4 top-4 z-50">
        <button
          type="button"
          onClick={() => (presentationActive ? exit() : enter())}
          className={cn(
            "presentation-controls interactive-control glass flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.24em]",
            presentationActive ? "text-accent-gold" : "text-white/60"
          )}
        >
          <span>Presentation Mode</span>
          <span
            className={cn(
              "rounded px-1.5 py-0.5",
              presentationActive
                ? "bg-accent-gold text-black"
                : "bg-white/10 text-white/70"
            )}
          >
            {presentationActive ? "ON" : "OFF"}
          </span>
        </button>
      </div>

      {/* Scroll-mode only: progress dots + entry button */}
      {!presentationActive && (
        <>
          <nav
            aria-label="Scene progress"
            className="hud-overlay fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2.5 md:flex"
          >
            {scenes.map((s) => {
              const active = activeScene?.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToFrame(controller, s.startFrame)}
                  title={s.name}
                  className="presentation-controls group relative flex items-center"
                >
                  <span
                    className={cn(
                      "block rounded-full transition-all duration-300",
                      active
                        ? "h-5 w-1.5 bg-accent-gold"
                        : "h-1.5 w-1.5 bg-white/25 group-hover:bg-white/60"
                    )}
                  />
                </button>
              );
            })}
          </nav>

          <div className="hud-overlay fixed bottom-4 right-4 z-50">
            <button
              type="button"
              onClick={enter}
              className="presentation-controls interactive-control glass flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-gold" />
              </span>
              Present
              <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] text-white/70">
                P
              </kbd>
            </button>
          </div>
        </>
      )}

      {/* Presentation-mode clicker bar */}
      <AnimatePresence>
        {presentationActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="hud-overlay presentation-controls fixed bottom-4 left-1/2 z-50 -translate-x-1/2 opacity-40 transition-opacity duration-300 hover:opacity-100"
          >
            <div className="glass flex items-center gap-1 rounded-full px-2 py-1.5">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="interactive-control flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex flex-col items-center px-2">
                <span className="font-mono text-[11px] tabular-nums text-accent-gold">
                  {String(currentFrameIndex + 1).padStart(2, "0")}
                  <span className="text-white/40">
                    {" "}
                    / {String(totalFrames).padStart(2, "0")}
                  </span>
                </span>
                <span className="max-w-[160px] truncate font-mono text-[8px] uppercase tracking-[0.18em] text-white/50">
                  {activeScene?.name}
                </span>
              </div>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="interactive-control flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
              >
                <ChevronRight size={16} />
              </button>

              <div className="mx-1 h-6 w-px bg-white/10" />

              <span className="px-2 font-mono text-[11px] tabular-nums text-white/70">
                {formatElapsed(elapsedTime)}
              </span>

              <button
                type="button"
                onClick={exit}
                className="interactive-control flex h-8 items-center gap-1 rounded-full px-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X size={12} /> Exit
              </button>
            </div>

            {/* Scene scrubber dots */}
            <div className="mt-2 flex items-center justify-center gap-1.5">
              {scenes.map((s) => {
                const active =
                  currentFrameIndex >= s.startFrame &&
                  currentFrameIndex <= s.endFrame;
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Go to ${s.name}`}
                    onClick={() => goToFrame(s.startFrame)}
                    className={cn(
                      "h-1 rounded-full transition-all",
                      active
                        ? "w-6 bg-accent-gold"
                        : "w-1.5 bg-white/25 hover:bg-white/50"
                    )}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* First-frame hint */}
      {presentationActive && currentFrameIndex === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="hud-overlay pointer-events-none fixed bottom-24 left-1/2 z-40 -translate-x-1/2 text-center"
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">
            <Play size={9} className="mr-1 inline" />
            Click or press arrow to advance
          </p>
        </motion.div>
      )}
    </>
  );
}

/** Smooth-scroll the runway so a given frame is centered (scroll mode). */
function scrollToFrame(controller: PresentationController, frame: number) {
  const el = controller.containerRef.current;
  if (!el) return;
  const runway = el.scrollHeight - window.innerHeight;
  const y =
    el.offsetTop +
    (runway * frame) / Math.max(1, controller.totalFrames - 1);
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(y, { duration: 1.1 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}
