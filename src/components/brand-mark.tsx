import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/site";

/** Small SVG mark: two arcs separating from a shared core (a demerger glyph). */
export function BrandGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-5 w-5", className)}
      fill="none"
      aria-hidden
    >
      <circle cx="16" cy="16" r="3.2" fill="var(--color-accent-gold)" />
      <path
        d="M16 12.5 C 22 6, 27 8, 28 14"
        stroke="var(--color-accent-gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M16 19.5 C 10 26, 5 24, 4 18"
        stroke="var(--color-accent-orange)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="28" cy="14" r="2" fill="var(--color-accent-gold)" />
      <circle cx="4" cy="18" r="2" fill="var(--color-accent-orange)" />
    </svg>
  );
}

/** Wordmark: first word white, second word accent. */
export function BrandWordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "font-mono uppercase tracking-[0.2em]",
        compact ? "text-[10px]" : "text-xs",
        className
      )}
    >
      <span className="text-white">{BRAND.first} </span>
      <span className="text-accent-gold">{BRAND.second}</span>
    </span>
  );
}
