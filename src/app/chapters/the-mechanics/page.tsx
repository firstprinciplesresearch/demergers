"use client";

import { motion } from "motion/react";
import { usePresentation } from "@/components/presentation/use-presentation";
import Deck, { type DeckScene } from "@/components/presentation/deck";
import { SceneHeader, Kicker, Stat, OrbitalRings } from "@/components/scene/kit";
import { NodeStack, Accordion } from "@/components/scene/archetypes";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    id: "board",
    label: "Board Decision",
    metric: "Step 01",
    detail:
      "The parent's board approves a separation and picks the structure: a full spin-off, a partial carve-out with an IPO, or a split-off share exchange.",
  },
  {
    id: "form10",
    label: "Information Filing",
    metric: "Step 02",
    detail:
      "The spin-co files an information statement (or draft scheme) laying out its standalone financials, capital structure, and management.",
  },
  {
    id: "distribution",
    label: "Share Distribution",
    metric: "Step 03",
    detail:
      "Existing holders receive spin-co shares as a dividend, at a fixed ratio. Own the parent on the record date and you automatically own the child.",
  },
  {
    id: "when-issued",
    label: "When-Issued Trading",
    metric: "Step 04",
    detail:
      "For a short window both entities trade on a provisional basis, letting the market pre-price the split before it is final.",
  },
  {
    id: "listing",
    label: "Regular-Way Listing",
    metric: "Step 05",
    detail:
      "The spin-co begins trading under its own ticker. Two independent companies, two boards, two currencies for future deals.",
  },
];

const TAX = [
  {
    tag: "Structure",
    q: "Why most spin-offs are tax-free",
    a: "Structured under the right rules, the distribution is not a taxable event for shareholders. That is a large part of why boards prefer a spin-off to an outright sale of the division.",
  },
  {
    tag: "Structure",
    q: "The distribution ratio",
    a: "You might receive one spin-co share for every three parent shares. The ratio is set so the new entity lists at a sensible price, not to change the economics you already own.",
  },
  {
    tag: "Structure",
    q: "Carve-out versus clean spin",
    a: "A carve-out floats a minority stake first and spins the rest later. It raises cash but leaves an overhang. A clean spin distributes everything at once.",
  },
];

export default function MechanicsChapter() {
  const scenes: DeckScene[] = [
    { id: "hero", name: "How It Works", render: (a) => <Hero active={a} /> },
    { id: "claim", name: "The Plumbing", render: () => <Claim /> },
    { id: "steps", name: "Five Steps", render: () => <Steps /> },
    { id: "ratio", name: "The Ratio", render: (a) => <Ratio active={a} /> },
    { id: "tax", name: "Tax And Structure", render: () => <Tax /> },
    { id: "ending", name: "Path Forward", render: (a) => <EndingScene active={a} /> },
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
        <Kicker className="flex justify-center">Chapter 03 / Anatomy of a Spin-off</Kicker>
        <h1 className="mt-5 text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          Anatomy Of
          <br />
          <span className="text-gradient-gold">A Spin-Off</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-xs uppercase tracking-widest text-white/50 leading-relaxed">
          Parent, spin-co, share distribution, listing. The plumbing of separation, made visible.
        </p>
      </motion.div>
    </div>
  );
}

function Claim() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Kicker>The Plumbing</Kicker>
      <p className="mt-5 text-balance text-2xl font-bold leading-[1.25] sm:text-4xl">
        A demerger is not a transaction between strangers. It is a company{" "}
        <span className="text-accent-gold">handing you a second stock</span> you already owned, wrapped inside the first.
      </p>
    </div>
  );
}

function Steps() {
  return (
    <div>
      <SceneHeader
        kicker="Click Through The Sequence"
        title="Five Steps To Separation"
        lede="From boardroom vote to first trade under a new ticker."
      />
      <div className="mt-8">
        <NodeStack nodes={STEPS} />
      </div>
    </div>
  );
}

function Ratio({ active }: { active: boolean }) {
  return (
    <div>
      <SceneHeader
        kicker="The Mechanics In Numbers"
        title="What You Actually Receive"
        lede="A shareholder does nothing and ends up holding two positions. The ratio and the tax treatment do the work."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat value={1} suffix=" : 3" label="Typical distribution ratio" active={active} accent />
        <Stat value={0} prefix="$" label="Cash you must put up" active={active} />
        <Stat value={0} suffix="%" label="Tax on a qualifying spin" active={active} />
      </div>
      <p className="mt-6 max-w-2xl font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
        Structures vary by jurisdiction. Illustrative only.
      </p>
    </div>
  );
}

function Tax() {
  return (
    <div>
      <SceneHeader
        kicker="The Fine Print That Matters"
        title="Tax And Structure"
        lede="Three details that decide whether a separation creates value or merely reshuffles it."
      />
      <div className="mt-8 max-w-2xl">
        <Accordion items={TAX} />
      </div>
    </div>
  );
}

function EndingScene({ active }: { active: boolean }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <Kicker className="flex justify-center">Next Chapter</Kicker>

      <div className="mt-8 space-y-4">
        <h2 className="text-balance text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
          Decoding the Filings
        </h2>

        <h2 className="text-balance text-3xl font-black uppercase leading-none tracking-tight text-gradient-gold sm:text-5xl">
          The Scheme of Arrangement
        </h2>

        <p className="mx-auto max-w-lg text-xs leading-relaxed text-white/60 pt-4">
          To truly analyze any demerger in detail, you must go beyond the summary announcement and learn how to dissect the legal Scheme of Arrangement document to find hidden red flags.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="mt-12"
      >
        <Link
          href="/chapters/the-catalyst"
          className="interactive-control bg-accent-gold hover:bg-accent-gold/90 text-black flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide shadow-2xl"
        >
          <span>Continue to Chapter 4</span>
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
