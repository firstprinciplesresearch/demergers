"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { CASE_STUDIES } from "@/lib/case-studies";
import { Kicker, Stat } from "@/components/scene/kit";
import { chapterHref } from "@/lib/site";

export default function CaseStudiesOverview() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-28 sm:pt-32">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <Kicker>The Evidence</Kicker>
        <h1 className="mt-3 text-balance text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl">
          Four Separations,
          <br />
          <span className="text-gradient-gold">Repriced In Public</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base text-white/60">
          Real demergers, each a clean illustration of the machine at work. The
          shape repeats across markets and decades.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={chapterHref("case-studies")}
            className="interactive-control flex items-center gap-2 rounded-full bg-accent-gold px-5 py-2.5 text-sm font-semibold text-black"
          >
            <Play size={14} /> Present these as a deck
          </Link>
          <Link
            href="/"
            className="interactive-control glass rounded-full px-5 py-2.5 text-sm font-medium"
          >
            Back to overview
          </Link>
        </div>
      </motion.header>

      <div className="flex flex-col gap-6">
        {CASE_STUDIES.map((c, i) => (
          <motion.article
            id={c.id}
            key={c.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="glass scroll-mt-24 rounded-2xl p-6 sm:p-8"
          >
            <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div>
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
                  <span className="text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-accent-gold">{c.year}</span>
                  <span className="text-white/40">{c.region}</span>
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-2xl font-black tracking-tight sm:text-3xl">
                    {c.parent}
                  </span>
                  <ArrowRight size={18} className="text-white/40" />
                  <span className="text-2xl font-black tracking-tight text-accent-gold sm:text-3xl">
                    {c.spin}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-bold sm:text-xl">
                  {c.headline}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {c.summary}
                </p>
                <div className="mt-5 rounded-xl border-l-2 border-accent-gold/60 bg-white/[0.03] p-4">
                  <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-accent-gold">
                    Takeaway
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {c.takeaway}
                  </p>
                </div>
              </div>
              <div className="grid gap-3">
                {c.stats.map((s) => (
                  <Stat
                    key={s.label}
                    value={s.value}
                    label={s.label}
                    active
                    prefix={s.prefix}
                    suffix={s.suffix}
                    accent
                  />
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
