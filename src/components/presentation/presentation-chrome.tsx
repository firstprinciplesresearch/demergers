"use client";
 
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, X, ChevronDown, BookOpen } from "lucide-react";
import { cn, formatElapsed } from "@/lib/utils";
import { getLenis } from "@/lib/lenis-ref";
import { BrandGlyph, BrandWordmark } from "@/components/brand-mark";
import { CHAPTERS, chapterHref } from "@/lib/site";
import type { PresentationController } from "./use-presentation";

export interface PresentationScene {
  id: string;
  name: string;
  label: string; // "01 / n"
  startFrame: number;
  endFrame: number;
}

function ChaptersDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative select-none">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "presentation-controls interactive-control glass flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.24em] transition-all cursor-pointer",
          isOpen ? "text-accent-gold border-accent-gold/20" : "text-white/60 hover:text-white"
        )}
      >
        <BookOpen size={10} />
        <span>Chapters</span>
        <ChevronDown size={10} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="glass absolute right-0 mt-2 w-72 origin-top-right rounded-2xl p-2 shadow-2xl border border-white/10 max-h-[60vh] overflow-y-auto flex flex-col gap-0.5 z-[100] allow-scroll"
          >
            <div className="px-3 py-1.5 border-b border-white/5 mb-1 select-none">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">
                Course Syllabus
              </span>
            </div>
            {CHAPTERS.map((c) => (
              <Link
                key={c.slug}
                href={chapterHref(c.slug)}
                onClick={() => setIsOpen(false)}
                className="flex items-start gap-2.5 rounded-xl px-3 py-2 text-left hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-accent-gold mt-0.5 font-semibold group-hover:scale-105 transition-transform">
                  {c.label.split(" ")[0]}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium text-white/80 group-hover:text-white transition-colors leading-tight">
                    {c.title}
                  </span>
                  <span className="text-[9px] text-white/40 leading-relaxed group-hover:text-white/50 transition-colors">
                    {c.kicker}
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
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

      {/* Top-right: Controls & Navigation */}
      <div className="hud-overlay fixed right-4 top-4 z-50 flex items-center gap-2">
        <ChaptersDropdown />

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
