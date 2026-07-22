"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMotionValueEvent, useScroll, type MotionValue } from "motion/react";
import { clamp } from "@/lib/utils";
import { getLenis } from "@/lib/lenis-ref";

export const TRANSITION_DURATION = 500;

/** Targets where a stray click/keypress should NOT drive slide navigation. */
const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, kbd, [role='button'], .interactive-control, .hud-overlay, .presentation-controls";

export interface PresentationController {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
  totalFrames: number;
  presentationActive: boolean;
  currentFrameIndex: number;
  hudOpen: boolean;
  elapsedTime: number; // ms
  isTransitioning: boolean;
  setHudOpen: (v: boolean) => void;
  goToFrame: (i: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  enter: () => void;
  exit: () => void;
}

/**
 * Shared dual-mode controller. Drives scroll cross-fades (via `progress`) and
 * discrete presentation frames (via `currentFrameIndex`). Every chapter deck
 * consumes this so they behave identically.
 */
export function usePresentation(totalFrames: number): PresentationController {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [presentationActive, setPresentationActive] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [hudOpen, setHudOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const lastFrame = totalFrames - 1;
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTime = useRef<number | null>(null);

  // --- Scroll mode: derive the active frame from progress -------------------
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (presentationActive) return;
    const idx = clamp(Math.floor(v * totalFrames), 0, lastFrame);
    setCurrentFrameIndex(idx);
  });

  // --- Frame navigation ------------------------------------------------------
  const lockTransition = useCallback(() => {
    setIsTransitioning(true);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(
      () => setIsTransitioning(false),
      TRANSITION_DURATION
    );
  }, []);

  const goToFrame = useCallback(
    (i: number) => {
      const target = clamp(i, 0, lastFrame);
      setCurrentFrameIndex(target);
      lockTransition();
    },
    [lastFrame, lockTransition]
  );

  const nextSlide = useCallback(() => {
    setCurrentFrameIndex((i) => {
      if (i >= lastFrame) return i;
      lockTransition();
      return i + 1;
    });
  }, [lastFrame, lockTransition]);

  const prevSlide = useCallback(() => {
    setCurrentFrameIndex((i) => {
      if (i <= 0) return i;
      lockTransition();
      return i - 1;
    });
  }, [lockTransition]);

  // --- Enter / exit ----------------------------------------------------------
  const enter = useCallback(() => {
    setPresentationActive(true);
    setHudOpen(true);
    startTime.current = Date.now() - elapsedTime;
  }, [elapsedTime]);

  const exit = useCallback(() => {
    setPresentationActive(false);
    setHudOpen(false);
    // Return the scroll runway to roughly the frame we were on.
    const el = containerRef.current;
    if (el) {
      const runway = el.scrollHeight - window.innerHeight;
      const y =
        el.offsetTop + (runway * currentFrameIndex) / Math.max(1, totalFrames - 1);
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(y, { immediate: true });
      else window.scrollTo({ top: y });
    }
  }, [currentFrameIndex, totalFrames]);

  // --- Body / html class + scroll lock while presenting ---------------------
  useEffect(() => {
    if (!presentationActive) return;

    document.documentElement.classList.add("presentation-active");
    document.body.classList.add("presentation-active");
    getLenis()?.stop();

    const block = (e: Event) => {
      // Allow scrolling inside explicitly scrollable HUD panels.
      const target = e.target as HTMLElement | null;
      if (target?.closest(".allow-scroll")) return;
      e.preventDefault();
    };
    window.addEventListener("wheel", block, { passive: false, capture: true });
    window.addEventListener("touchmove", block, {
      passive: false,
      capture: true,
    });

    return () => {
      document.documentElement.classList.remove("presentation-active");
      document.body.classList.remove("presentation-active");
      getLenis()?.start();
      window.removeEventListener("wheel", block, { capture: true } as never);
      window.removeEventListener("touchmove", block, {
        capture: true,
      } as never);
    };
  }, [presentationActive]);

  // --- Elapsed timer ---------------------------------------------------------
  useEffect(() => {
    if (!presentationActive) return;
    if (startTime.current == null) startTime.current = Date.now();
    const id = setInterval(() => {
      if (startTime.current != null)
        setElapsedTime(Date.now() - startTime.current);
    }, 250);
    return () => clearInterval(id);
  }, [presentationActive]);

  // --- Keyboard --------------------------------------------------------------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // "P" toggles presentation from anywhere.
      if ((e.key === "p" || e.key === "P") && !isEditable(e.target)) {
        e.preventDefault();
        if (presentationActive) exit();
        else enter();
        return;
      }
      if (!presentationActive) return;

      if (isEditable(e.target)) return;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
        case "Enter":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "Backspace":
          e.preventDefault();
          prevSlide();
          break;
        case "Escape":
          e.preventDefault();
          exit();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [presentationActive, enter, exit, nextSlide, prevSlide]);

  // --- Click / contextmenu navigation while presenting ----------------------
  useEffect(() => {
    if (!presentationActive) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) return;
      if (e.shiftKey) prevSlide();
      else nextSlide();
    };
    const onContext = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) return;
      e.preventDefault();
      prevSlide();
    };
    window.addEventListener("click", onClick);
    window.addEventListener("contextmenu", onContext);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("contextmenu", onContext);
    };
  }, [presentationActive, nextSlide, prevSlide]);

  // --- Deep link: ?presentation=true ----------------------------------------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("presentation") === "true") enter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    containerRef,
    progress: scrollYProgress,
    totalFrames,
    presentationActive,
    currentFrameIndex,
    hudOpen,
    elapsedTime,
    isTransitioning,
    setHudOpen,
    goToFrame,
    nextSlide,
    prevSlide,
    enter,
    exit,
  };
}

function isEditable(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable
  );
}
