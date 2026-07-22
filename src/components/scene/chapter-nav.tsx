"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { nextChapter, chapterHref, type ChapterMeta } from "@/lib/site";
import { Kicker } from "./kit";

/** Cinematic finale scene: thesis line + link to the next chapter. */
export function ChapterFinale({
  current,
  thesis,
  active,
}: {
  current: string;
  thesis: string;
  active: boolean;
}) {
  const next = nextChapter(current);
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <Kicker className="flex justify-center">
        {next ? "Next Chapter" : "End Of Arc"}
      </Kicker>
      <motion.h2
        initial={false}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 12 }}
        transition={{ duration: 0.6 }}
        className="mt-4 text-balance text-2xl font-black leading-[1.05] tracking-tight sm:text-4xl"
      >
        {thesis}
      </motion.h2>

      {next ? (
        <NextChapterLink next={next} />
      ) : (
        <Link
          href="/"
          className="interactive-control glass mt-8 rounded-full px-6 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-accent-gold"
        >
          Return to the overview
        </Link>
      )}
    </div>
  );
}

export function NextChapterLink({ next }: { next: ChapterMeta }) {
  return (
    <Link
      href={chapterHref(next.slug)}
      className="interactive-control glass group mt-8 flex items-center gap-4 rounded-2xl px-6 py-4 text-left"
    >
      <div>
        <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-accent-gold">
          {next.label}
        </div>
        <div className="mt-1 text-base font-bold">{next.title}</div>
      </div>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-gold text-black transition-transform group-hover:translate-x-1">
        <ArrowRight size={16} />
      </span>
    </Link>
  );
}
