"use client";

import { motion } from "motion/react";
import { usePresentation } from "@/components/presentation/use-presentation";
import Deck, { type DeckScene } from "@/components/presentation/deck";
import { SceneHeader, Kicker, Stat, OrbitalRings } from "@/components/scene/kit";
import { NodeStack, Accordion } from "@/components/scene/archetypes";
import { ChapterFinale } from "@/components/scene/chapter-nav";

const HIDDEN = [
  {
    id: "stub",
    label: "The parent stub",
    metric: "Overlooked",
    detail:
      "Everyone chases the shiny new spin-co. The de-rated parent left behind is often the cheaper, cleaner opportunity, ignored precisely because it is old news.",
  },
  {
    id: "taxfree",
    label: "The tax-free distribution",
    metric: "Overlooked",
    detail:
      "A qualifying spin hands you a second security with no tax bill. That is a structural advantage over a sale, and it is why boards choose spins even when a sale looks simpler.",
  },
  {
    id: "window",
    label: "The 12 to 24 month window",
    metric: "Overlooked",
    detail:
      "The mispricing is not permanent. Forced selling clears, coverage begins, and the gap closes. The edge is knowing the clock, not just the setup.",
  },
  {
    id: "signal",
    label: "The insider signal",
    metric: "Overlooked",
    detail:
      "When spin-co managers buy their own newly listed shares in the open market, they are telling you the opening price is wrong. It is the single most useful confirmation.",
  },
];

const SUBTLE = [
  {
    tag: "Nuance",
    q: "The spin-co is often the one loaded with debt",
    a: "Parents sometimes push leverage onto the entity they are shedding. Read the balance sheet before assuming the small new listing is the bargain.",
  },
  {
    tag: "Nuance",
    q: "Forced selling is a gift, not a warning",
    a: "Price falling on day one because index funds must sell tells you nothing about the business. It tells you a non-economic seller is setting the price.",
  },
  {
    tag: "Nuance",
    q: "Two winners are allowed",
    a: "You do not have to choose parent or child. In many separations both re-rate. The framing of one versus the other is itself a trap.",
  },
];

export default function WhatMostPeopleMissChapter() {
  const scenes: DeckScene[] = [
    { id: "hero", name: "The Edge", render: (a) => <Hero active={a} /> },
    { id: "claim", name: "The Blind Spot", render: () => <Claim /> },
    { id: "hidden", name: "Four Overlooked", render: () => <Hidden /> },
    { id: "signal", name: "The Signal", render: (a) => <Signal active={a} /> },
    { id: "subtle", name: "The Nuances", render: () => <Subtle /> },
    {
      id: "finale",
      name: "To The Thesis",
      render: (a) => (
        <ChapterFinale
          current="what-most-people-miss"
          active={a}
          thesis="The edge is behavioral, structural, and timed. So how do you turn it into a strategy you can actually run?"
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
        <Kicker className="flex justify-center">Chapter 09 / The Edge</Kicker>
        <h1 className="mt-5 text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          What Most
          <br />
          <span className="text-gradient-gold">People Miss</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm text-white/60 sm:text-base">
          The parent stub, the tax-free distribution, and the twelve-to-twenty-
          four month window.
        </p>
      </motion.div>
    </div>
  );
}

function Claim() {
  return (
    <div className="mx-auto max-w-3xl">
      <Kicker>The Blind Spot</Kicker>
      <p className="mt-5 text-balance text-2xl font-bold leading-[1.25] sm:text-4xl">
        Most investors watch the spin-co and stop there. The real edge lives in{" "}
        <span className="text-accent-gold">the parts no one is looking at</span>:
        the stub, the clock, and the insider.
      </p>
    </div>
  );
}

function Hidden() {
  return (
    <div>
      <SceneHeader
        kicker="Hidden In Plain Sight"
        title="Four Things People Overlook"
        lede="Click each to see the layer the crowd walks past."
      />
      <div className="mt-8">
        <NodeStack nodes={HIDDEN} />
      </div>
    </div>
  );
}

function Signal({ active }: { active: boolean }) {
  return (
    <div>
      <SceneHeader
        kicker="The Confirmation"
        title="Watch What Insiders Do"
        lede="An open-market purchase by spin-co management is the market's clearest tell that the opening price undervalues the business."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat value={3} suffix="x" label="Edge when insiders buy" active={active} accent />
        <Stat value={45} suffix=" days" label="Watch the first filings" active={active} />
        <Stat value={1} label="Signal that matters most" active={active} />
      </div>
    </div>
  );
}

function Subtle() {
  return (
    <div>
      <SceneHeader
        kicker="Where People Trip"
        title="Three Nuances That Bite"
        lede="The traps hiding inside the opportunity."
      />
      <div className="mt-8 max-w-2xl">
        <Accordion items={SUBTLE} />
      </div>
    </div>
  );
}
