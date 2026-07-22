"use client";

import { AnimatePresence, motion, useTransform, type MotionValue } from "motion/react";
import { clamp } from "@/lib/utils";
import PresentationChrome, {
  type PresentationScene,
} from "./presentation-chrome";
import type { PresentationController } from "./use-presentation";

export interface DeckScene {
  id: string;
  name: string;
  /** Rendered in both modes. `active` is true when this is the focused frame. */
  render: (active: boolean) => React.ReactNode;
}

/**
 * The dual-mode stage. In scroll mode it pins a viewport and cross-fades the
 * scenes as the runway scrolls. In presentation mode it renders the identical
 * scene components as discrete AnimatePresence frames. Same content, two modes.
 */
export default function Deck({
  controller,
  scenes,
}: {
  controller: PresentationController;
  scenes: DeckScene[];
}) {
  const { containerRef, progress, presentationActive, currentFrameIndex } =
    controller;
  const total = scenes.length;

  const presentationScenes: PresentationScene[] = scenes.map((s, i) => ({
    id: s.id,
    name: s.name,
    label: `${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
    startFrame: i,
    endFrame: i,
  }));

  return (
    <>
      {/* Scroll runway. Height scales with scene count. */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: `${total * 100}vh` }}
      >
        {/* Pinned viewport */}
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-40" />
          <div className="radial-vignette pointer-events-none absolute inset-0" />

          {presentationActive ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFrameIndex}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.01 }}
                transition={{ duration: 0.48, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0 flex items-center justify-center px-5 py-20 sm:px-10"
              >
                <div className="w-full max-w-6xl">
                  {scenes[currentFrameIndex]?.render(true)}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            scenes.map((scene, i) => (
              <ScrollLayer
                key={scene.id}
                progress={progress}
                index={i}
                total={total}
                active={currentFrameIndex === i}
              >
                {scene.render(currentFrameIndex === i)}
              </ScrollLayer>
            ))
          )}
        </div>
      </div>

      <PresentationChrome controller={controller} scenes={presentationScenes} />
    </>
  );
}

function ScrollLayer({
  progress,
  index,
  total,
  active,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  active: boolean;
  children: React.ReactNode;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  const fade = seg * 0.28;

  // Edge scenes stay fully visible at the runway extremes.
  const first = index === 0;
  const last = index === total - 1;

  const inStart = clamp(start - fade, 0, 1);
  const inFull = clamp(start + fade, 0, 1);
  const outStart = clamp(end - fade, 0, 1);
  const outEnd = clamp(end + fade, 0, 1);

  const opacity = useTransform(
    progress,
    [inStart, inFull, outStart, outEnd],
    [first ? 1 : 0, 1, 1, last ? 1 : 0]
  );
  const y = useTransform(
    progress,
    [inStart, inFull, outStart, outEnd],
    [first ? 0 : 24, 0, 0, last ? 0 : -24]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex items-center justify-center px-5 py-24 sm:px-10 ${
        active ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="w-full max-w-6xl">{children}</div>
    </motion.div>
  );
}
