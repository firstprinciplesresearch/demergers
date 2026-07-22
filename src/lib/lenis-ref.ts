import type Lenis from "lenis";

/**
 * Typed access to the global Lenis instance. The `lenis` npm package declares
 * its own `window.lenis` (debug metadata) with a conflicting type, so we keep a
 * module-level singleton for type-safe access and mirror it onto the window for
 * devtools convenience.
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
  if (typeof window !== "undefined") {
    (window as unknown as { lenis?: Lenis }).lenis = l ?? undefined;
  }
}

export function getLenis(): Lenis | null {
  return instance;
}
