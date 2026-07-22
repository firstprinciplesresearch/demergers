"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { CHAPTERS, chapterHref, BRAND } from "@/lib/site";
import { CASE_STUDIES } from "@/lib/case-studies";
import { Kicker, Stat, OrbitalRings } from "@/components/scene/kit";
import { BrandGlyph } from "@/components/brand-mark";
import PresenterMode from "@/components/presenter-mode";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Thesis />
      <StatsBand />
      <ChapterIndex />
      <CaseTeaser />
      <Author />
      <Disclaimer />
      <ClosingCTA />
      <PresenterMode />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-5 text-center">
      <OrbitalRings />
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-40" />
      <div className="radial-vignette pointer-events-none absolute inset-0" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-4xl"
      >
        <div className="mb-6 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
          <BrandGlyph className="h-4 w-4" /> {BRAND.full}
        </div>
        <h1 className="text-balance text-5xl font-black uppercase leading-[0.82] tracking-tight sm:text-7xl md:text-8xl">
          The Value
          <br />
          <span className="text-gradient-gold">Unlock</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-white/60 sm:text-lg">
          A first-principles investigation of corporate demergers. Why splitting
          a company reprices it, how the spin-off machine works, and where the
          next unlock is hiding.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={chapterHref("the-hook")}
            className="interactive-control flex items-center gap-2 rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-black"
          >
            Begin the narrative <ArrowRight size={16} />
          </Link>
          <Link
            href={`${chapterHref("the-hook")}?presentation=true`}
            className="interactive-control glass flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
          >
            <Play size={14} className="text-accent-gold" /> Present it live
          </Link>
        </div>
        <div className="mt-14 font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
          Scroll to explore / Press P for presenter mode
        </div>
      </motion.div>
    </section>
  );
}

function Thesis() {
  return (
    <section className="relative mx-auto max-w-4xl px-5 py-28 sm:py-36">
      <motion.div {...reveal}>
        <Kicker>The Thesis</Kicker>
        <p className="mt-6 text-balance text-3xl font-black leading-[1.1] tracking-tight sm:text-5xl">
          A demerger destroys nothing.
          <br />
          <span className="text-gradient-gold">
            It sets trapped value free.
          </span>
        </p>
        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/60">
          When a company splits, no asset is created or lost. Yet two focused
          businesses, priced on their own merits, routinely command more than the
          sprawling whole ever did. This series unpacks why, from first
          principles, in ten chapters.
        </p>
      </motion.div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="relative mx-auto max-w-5xl px-5 py-16">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard value={80} suffix="+" label="Separations per year" />
        <StatCard value={13} suffix="%" label="Median SOTP discount" />
        <StatCard value={24} suffix=" mo" label="The repricing window" />
        <StatCard value={10} label="Chapters of argument" />
      </div>
      <p className="mt-6 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
        Illustrative figures for narrative purposes
      </p>
    </section>
  );
}

function StatCard({
  value,
  label,
  suffix,
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  return (
    <motion.div {...reveal}>
      <ActiveStat value={value} label={label} suffix={suffix} />
    </motion.div>
  );
}

/** Wrapper so the counter animates in when scrolled into view. */
function ActiveStat(props: { value: number; label: string; suffix?: string }) {
  return <Stat {...props} active accent />;
}

function ChapterIndex() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24">
      <motion.div {...reveal} className="mb-10">
        <Kicker>The Narrative Arc</Kicker>
        <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl">
          Ten Chapters, One Argument
        </h2>
        <p className="mt-4 max-w-2xl text-base text-white/60">
          From the opening reframe to the closing thesis. Each chapter is a
          dual-mode deck: scroll to read, or press P to present it live.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CHAPTERS.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
          >
            <Link
              href={chapterHref(c.slug)}
              className="interactive-control glass group flex h-full flex-col rounded-xl p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-accent-gold">
                  {c.label}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-gold"
                />
              </div>
              <h3 className="mt-3 text-lg font-bold leading-tight">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {c.blurb}
              </p>
              <span className="mt-4 font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
                {c.kicker}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CaseTeaser() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24">
      <motion.div {...reveal} className="mb-10 flex items-end justify-between gap-4">
        <div>
          <Kicker>The Evidence</Kicker>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl">
            Case Studies
          </h2>
        </div>
        <Link
          href="/case-studies"
          className="interactive-control glass hidden items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:flex"
        >
          View all <ArrowRight size={14} className="text-accent-gold" />
        </Link>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CASE_STUDIES.map((c) => (
          <motion.div key={c.id} {...reveal}>
            <Link
              href={`/case-studies#${c.id}`}
              className="interactive-control glass group flex flex-col rounded-xl p-6"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-accent-gold">{c.year}</span>
                <span className="text-white/40">{c.region}</span>
              </div>
              <div className="mt-3 flex flex-wrap items-baseline gap-2">
                <span className="text-xl font-black tracking-tight">
                  {c.parent}
                </span>
                <ArrowRight size={14} className="text-white/40" />
                <span className="text-xl font-black tracking-tight text-accent-gold">
                  {c.spin.split(",")[0]}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {c.headline}.
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Author() {
  return (
    <section className="relative mx-auto max-w-4xl px-5 py-24">
      <motion.div {...reveal} className="glass rounded-2xl p-8 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/15">
            <BrandGlyph className="h-6 w-6" />
          </span>
          <div>
            <div className="text-lg font-bold">{BRAND.full}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              {BRAND.tagline}
            </div>
          </div>
        </div>
        <p className="mt-6 text-pretty text-base leading-relaxed text-white/65">
          We study special situations from first principles: separations,
          restructurings, and the moments when the market misprices complexity.
          This series is built to be read at your own pace or presented live to a
          room. Press P at any time to enter presenter mode.
        </p>
      </motion.div>
    </section>
  );
}

function Disclaimer() {
  return (
    <section className="relative mx-auto max-w-3xl px-5 pb-8">
      <motion.p
        {...reveal}
        className="text-center font-mono text-[10px] leading-relaxed tracking-[0.08em] text-white/35"
      >
        This material is for educational and illustrative purposes only. It is
        not investment advice, a recommendation, or an offer to buy or sell any
        security. Figures are directional and rounded to serve the narrative.
        Do your own research and consult a licensed professional before
        investing.
      </motion.p>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative mx-auto max-w-4xl px-5 py-28 text-center">
      <motion.div {...reveal}>
        <h2 className="text-balance text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
          The Empires Keep Breaking.
          <br />
          <span className="text-gradient-gold">Start Watching.</span>
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={chapterHref("the-hook")}
            className="interactive-control flex items-center gap-2 rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-black"
          >
            Chapter 01 <ArrowRight size={16} />
          </Link>
          <Link
            href="/case-studies"
            className="interactive-control glass rounded-full px-6 py-3 text-sm font-medium"
          >
            The case studies
          </Link>
        </div>
        <footer className="mt-16 border-t border-white/10 pt-8 font-mono text-[9px] uppercase tracking-[0.24em] text-white/30">
          {BRAND.full} / Demergers: The Value Unlock
        </footer>
      </motion.div>
    </section>
  );
}
