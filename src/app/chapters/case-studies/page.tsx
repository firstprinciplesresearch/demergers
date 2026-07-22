"use client";

import { motion } from "motion/react";
import { usePresentation } from "@/components/presentation/use-presentation";
import Deck, { type DeckScene } from "@/components/presentation/deck";
import { SceneHeader, Kicker, Stat, OrbitalRings } from "@/components/scene/kit";
import { ChapterFinale } from "@/components/scene/chapter-nav";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";

export default function CaseStudiesChapter() {
  const caseScenes: DeckScene[] = CASE_STUDIES.map((c) => ({
    id: c.id,
    name: `${c.parent} / ${c.spin.split(",")[0]}`,
    render: (a: boolean) => <CaseScene study={c} active={a} />,
  }));

  const scenes: DeckScene[] = [
    { id: "hero", name: "The Evidence", render: (a) => <Hero active={a} /> },
    ...caseScenes,
    {
      id: "finale",
      name: "To The Edge",
      render: (a) => (
        <ChapterFinale
          current="case-studies"
          active={a}
          thesis="Four separations, one repeating shape. Now the part almost everyone overlooks."
        />
      ),
    },
  ];
  const controller = usePresentation(scenes.length);
  return <Deck controller={controller} scenes={scenes} />;
}

function Hero({ active }: { active: boolean }) {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
      <OrbitalRings />
      <motion.div
        initial={false}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 16 }}
        transition={{ duration: 0.7 }}
      >
        <Kicker className="flex justify-center">Chapter 08 / The Evidence</Kicker>
        <h1 className="mt-5 text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          Four Separations
          <br />
          <span className="text-gradient-gold">That Repriced The Map</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm text-white/60 sm:text-base">
          From eBay and PayPal to Reliance and Jio Financial. What the tape
          actually did.
        </p>
      </motion.div>
    </div>
  );
}

function CaseScene({ study, active }: { study: CaseStudy; active: boolean }) {
  return (
    <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
      <div>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
          <span className="text-accent-gold">{study.year}</span>
          <span className="text-white/40">{study.region}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-2xl font-black tracking-tight sm:text-3xl">
            {study.parent}
          </span>
          <span className="text-accent-gold">splits</span>
          <span className="text-2xl font-black tracking-tight text-accent-gold sm:text-3xl">
            {study.spin}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-bold sm:text-xl">{study.headline}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          {study.summary}
        </p>
        <div className="glass mt-5 rounded-xl border-l-2 border-accent-gold/60 p-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-accent-gold">
            Takeaway
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {study.takeaway}
          </p>
        </div>
      </div>
      <div className="grid gap-3">
        {study.stats.map((s) => (
          <Stat
            key={s.label}
            value={s.value}
            label={s.label}
            active={active}
            prefix={s.prefix}
            suffix={s.suffix}
            accent
          />
        ))}
      </div>
    </div>
  );
}
