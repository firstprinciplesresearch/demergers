"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CHAPTERS, chapterHref } from "@/lib/site";
import { BrandGlyph, BrandWordmark } from "@/components/brand-mark";

const PRIMARY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/chapters/the-hook", label: "Read" },
  { href: "/case-studies", label: "Cases" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Hide the navbar entirely when a deck is presenting (class set on <html>).
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 [html.presentation-active_&]:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="glass interactive-control flex items-center gap-2 rounded-full px-3 py-1.5"
          onClick={() => setOpen(false)}
        >
          <BrandGlyph />
          <BrandWordmark compact />
        </Link>

        {/* Desktop links */}
        <nav className="glass interactive-control hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex">
          {PRIMARY_LINKS.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href.split("/").slice(0, 2).join("/"));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors",
                  active
                    ? "bg-accent-gold/15 text-accent-gold"
                    : "text-white/60 hover:text-white"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="glass interactive-control flex h-9 w-9 items-center justify-center rounded-full md:hidden"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="pointer-events-auto mx-4 mt-1 md:hidden">
          <nav className="glass max-h-[70vh] overflow-y-auto rounded-2xl p-2">
            {PRIMARY_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-white/10" />
            {CHAPTERS.map((c) => (
              <Link
                key={c.slug}
                href={chapterHref(c.slug)}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-2 rounded-lg px-3 py-2 text-white/70 hover:bg-white/5 hover:text-white"
              >
                <span className="font-mono text-[9px] tracking-[0.2em] text-accent-gold">
                  {c.label.split(" ")[0]}
                </span>
                <span className="text-xs">{c.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
