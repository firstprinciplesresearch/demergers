"use client";

import { motion } from "motion/react";
import { ArrowRight, Split } from "lucide-react";
import { usePresentation } from "@/components/presentation/use-presentation";
import Deck, { type DeckScene } from "@/components/presentation/deck";
import {
  SceneHeader,
  Kicker,
  Stat,
  OrbitalRings,
  Panel,
} from "@/components/scene/kit";
import { Accordion, BarChart } from "@/components/scene/archetypes";
import { ChapterFinale } from "@/components/scene/chapter-nav";

const MISREADS = [
  {
    tag: "Misread",
    q: "A split just moves value around",
    a: "It does not. Two focused boards, two currencies for deals, two sets of aligned incentives. The sum is worth more than the whole because the market can finally price each part on its own merits.",
  },
  {
    tag: "Misread",
    q: "The parent must be weakened",
    a: "The parent often re-rates upward too. Freed of a business that masked its economics, a cleaner franchise attracts a cleaner multiple. Both sides can win at once.",
  },
  {
    tag: "Misread",
    q: "This is a rare, exotic event",
    a: "Hundreds of separations happen every decade across the United States, Europe, and India. It is one of the most repeatable value-unlock patterns in public markets.",
  },
];

const BEFORE_AFTER = [
  { label: "Conglomerate", value: 100, display: "$100B", emphasize: false },
  { label: "Parent, post-split", value: 78, display: "$78B", emphasize: true },
  { label: "Spin-co, listed", value: 41, display: "$41B", emphasize: true },
];

export default function TheHookChapter() {
  const scenes: DeckScene[] = [
    { id: "hero", name: "The Question", render: (a) => <Hero active={a} /> },
    { id: "paradox", name: "One Plus One", render: (a) => <Paradox active={a} /> },
    { id: "split", name: "The Split", render: (a) => <SplitScene active={a} /> },
    { id: "discount", name: "The Discount", render: (a) => <Discount active={a} /> },
    { id: "claim", name: "The Claim", render: () => <Claim /> },
    { id: "misreads", name: "Three Misreads", render: () => <Misreads /> },
    { id: "math", name: "The Math", render: (a) => <TheMath active={a} /> },
    { id: "reframe", name: "The Reframe", render: () => <Reframe /> },
    {
      id: "finale",
      name: "To The Origin",
      render: (a) => (
        <ChapterFinale
          current="the-hook"
          active={a}
          thesis="If separation can add billions without adding a single asset, the question is not whether to watch demergers. It is how they became a machine."
        />
      ),
    },
  ];

  const controller = usePresentation(scenes.length);
  return <Deck controller={controller} scenes={scenes} />;
}

/* --------------------------------- Scenes --------------------------------- */

function Hero({ active }: { active: boolean }) {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
      <OrbitalRings />
      <motion.div
        initial={false}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 16 }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <Kicker className="flex justify-center">Chapter 01 / The Question</Kicker>
        <h1 className="mt-5 text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          A Demerger
          <br />
          <span className="text-gradient-gold">Destroys Nothing</span>
          <br />
          And Creates Billions
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm text-white/60 sm:text-base">
          Splitting a company in two does not shrink it. It reprices it. This is
          the reframe that starts everything.
        </p>
      </motion.div>
    </div>
  );
}

function Paradox({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Kicker className="flex justify-center">The Arithmetic Of Focus</Kicker>
      <div className="mt-8 flex items-center gap-4 font-mono text-5xl font-black sm:gap-8 sm:text-8xl">
        <span className="text-white">1</span>
        <span className="text-white/40">+</span>
        <span className="text-white">1</span>
        <span className="text-white/40">=</span>
        <motion.span
          initial={false}
          animate={active ? { scale: [0.8, 1.15, 1] } : { scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-gradient-gold"
        >
          3
        </motion.span>
      </div>
      <p className="mt-8 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
        Public markets pay a premium for clarity. Two clean, understandable
        businesses attract more capital than one sprawling story no analyst can
        model. That gap is the demerger opportunity.
      </p>
    </div>
  );
}

function SplitScene({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <SceneHeader
        align="center"
        kicker="What Actually Happens"
        title="One Ticker Becomes Two"
        lede="Shareholders wake up owning both halves. No cash changes hands, yet two independent stories begin trading the very next morning."
      />
      <div className="mt-10 flex w-full max-w-3xl items-center justify-center gap-4 sm:gap-8">
        <Node label="CONGLOMERATE" sub="Before" />
        <motion.div
          initial={false}
          animate={active ? { rotate: [0, 8, 0], scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.8 }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-gold text-black"
        >
          <Split size={20} />
        </motion.div>
        <div className="flex flex-col gap-3">
          <Node label="PARENT CO" sub="Focused core" small />
          <Node label="SPIN CO" sub="Newly listed" small accent />
        </div>
      </div>
    </div>
  );
}

function Node({
  label,
  sub,
  small = false,
  accent = false,
}: {
  label: string;
  sub: string;
  small?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`glass rounded-xl px-4 py-4 text-center ${
        small ? "min-w-[130px]" : "min-w-[150px] sm:px-6 sm:py-6"
      } ${accent ? "border-accent-gold/40" : ""}`}
    >
      <div
        className={`font-mono font-bold tracking-tight ${
          small ? "text-sm" : "text-base sm:text-lg"
        } ${accent ? "text-accent-gold" : "text-white"}`}
      >
        {label}
      </div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
        {sub}
      </div>
    </div>
  );
}

function Discount({ active }: { active: boolean }) {
  return (
    <div>
      <SceneHeader
        kicker="The Hidden Tax"
        title="The Conglomerate Discount"
        lede="Diversified groups routinely trade below the sum of their parts. That persistent gap is not a rounding error. It is dead weight the market applies to complexity."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat value={13} suffix="%" label="Median SOTP discount" active={active} accent />
        <Stat value={280} prefix="$" suffix="B" label="Est. value locked, S&P 500" active={active} />
        <Stat value={70} suffix="+" label="Large separations, past decade" active={active} />
      </div>
      <p className="mt-6 max-w-2xl font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
        Illustrative figures for narrative purposes.
      </p>
    </div>
  );
}

function Claim() {
  return (
    <div className="mx-auto max-w-3xl">
      <Kicker>The Core Claim</Kicker>
      <p className="mt-5 text-balance text-2xl font-bold leading-[1.25] sm:text-4xl">
        A demerger does not manufacture value out of thin air. It{" "}
        <span className="text-accent-gold">removes the friction</span> that was
        hiding value already there: mispriced complexity, misaligned managers,
        and mismatched investors all holding the same share.
      </p>
    </div>
  );
}

function Misreads() {
  return (
    <div>
      <SceneHeader
        kicker="Clearing The Fog"
        title="Three Things People Get Wrong"
        lede="Click each to reveal what actually happens."
      />
      <div className="mt-8 max-w-2xl">
        <Accordion items={MISREADS} />
      </div>
    </div>
  );
}

function TheMath({ active }: { active: boolean }) {
  return (
    <div>
      <SceneHeader
        kicker="Watch The Repricing"
        title="Before And After, In Dollars"
        lede="A single $100B group can list as a $78B parent and a $41B spin-co. The market simply refuses to pay 100 for a story it cannot cleanly value."
      />
      <div className="mt-8 max-w-2xl">
        <BarChart data={BEFORE_AFTER} active={active} />
      </div>
      <p className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-gold">
        <ArrowRight size={12} /> 78 + 41 = 119. Nineteen billion, from clarity
        alone.
      </p>
    </div>
  );
}

function Reframe() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Kicker className="flex justify-center">The Reframe</Kicker>
      <p className="mt-6 text-balance text-2xl font-black leading-[1.15] tracking-tight sm:text-4xl">
        Stop asking what a company owns.
        <br />
        <span className="text-gradient-gold">
          Start asking who is forced to own it.
        </span>
      </p>
      <p className="mx-auto mt-6 max-w-xl text-sm text-white/60">
        The deepest edge in demergers is not accounting. It is the plumbing of
        who holds the shares and why. That is where we go next.
      </p>
    </div>
  );
}
