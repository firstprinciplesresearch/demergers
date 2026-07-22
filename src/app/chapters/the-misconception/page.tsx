"use client";

import { motion } from "motion/react";
import { usePresentation } from "@/components/presentation/use-presentation";
import Deck, { type DeckScene } from "@/components/presentation/deck";
import { SceneHeader, Kicker, OrbitalRings } from "@/components/scene/kit";
import { Accordion } from "@/components/scene/archetypes";
import { ChapterFinale } from "@/components/scene/chapter-nav";

const TRUTHS = [
  {
    tag: "Where value lives",
    q: "In the incentives, not the accounting",
    a: "A spin-co gives managers equity in the thing they actually run. Aligned owners make sharper capital decisions than salaried stewards of a division buried in a group.",
  },
  {
    tag: "Where value lives",
    q: "In the forced sellers, not the buyers",
    a: "Index funds and mandates often must dump the small new spin-co the moment it lands. That mechanical selling can push price below value with no view on the business at all.",
  },
  {
    tag: "Where value lives",
    q: "In the coverage gap, not the balance sheet",
    a: "A freshly listed spin-co has no analyst following and no history. Neglect, not leverage, is what leaves the mispricing on the table.",
  },
];

export default function MisconceptionChapter() {
  const scenes: DeckScene[] = [
    { id: "hero", name: "The Misread", render: (a) => <Hero active={a} /> },
    { id: "obvious", name: "The Obvious Take", render: () => <Obvious /> },
    { id: "analogy", name: "The Analogy", render: () => <Analogy /> },
    { id: "truths", name: "Where Value Lives", render: () => <Truths /> },
    { id: "reframe", name: "The Reframe", render: () => <Reframe /> },
    {
      id: "finale",
      name: "To The Alpha Engine",
      render: (a) => (
        <ChapterFinale
          current="the-misconception"
          active={a}
          thesis="If the edge is not accounting but incentives and forced selling, then there is a repeatable engine underneath. Let us name its parts."
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
        <Kicker className="flex justify-center">Chapter 05 / The Misread</Kicker>
        <h1 className="mt-5 text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          It Is Not
          <br />
          <span className="text-gradient-gold">Financial Engineering</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm text-white/60 sm:text-base">
          The obvious take is wrong. The value is not in the accounting. It is in
          the incentives.
        </p>
      </motion.div>
    </div>
  );
}

function Obvious() {
  return (
    <div className="mx-auto max-w-3xl">
      <Kicker>The Obvious Take</Kicker>
      <p className="mt-5 text-balance text-2xl font-bold leading-[1.25] sm:text-4xl">
        The skeptic says a demerger is a{" "}
        <span className="text-white/50 line-through">magic trick</span>: same
        assets, new wrapper, no real value. On the assets alone, the skeptic is
        right. That is exactly why the skeptic misses it.
      </p>
    </div>
  );
}

function Analogy() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Kicker className="flex justify-center">The Analogy</Kicker>
      <p className="mt-6 text-balance text-2xl font-black leading-[1.2] tracking-tight sm:text-4xl">
        A house sells for more once you
        <br />
        <span className="text-gradient-gold">turn the lights on.</span>
      </p>
      <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/60">
        Nothing about the structure changed. The buyer can finally see the rooms.
        A demerger turns the lights on inside a business the market had stopped
        bothering to look at.
      </p>
    </div>
  );
}

function Truths() {
  return (
    <div>
      <SceneHeader
        kicker="Follow The Real Edge"
        title="Where The Value Actually Lives"
        lede="Not on the balance sheet. Click each to see the true source."
      />
      <div className="mt-8 max-w-2xl">
        <Accordion items={TRUTHS} />
      </div>
    </div>
  );
}

function Reframe() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Kicker className="flex justify-center">The Reframe</Kicker>
      <p className="mt-6 text-balance text-2xl font-black leading-[1.15] tracking-tight sm:text-4xl">
        The engineering is trivial.
        <br />
        <span className="text-gradient-gold">
          The behavior it triggers is everything.
        </span>
      </p>
    </div>
  );
}
