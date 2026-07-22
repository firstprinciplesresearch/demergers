"use client";

import { motion } from "motion/react";
import { usePresentation } from "@/components/presentation/use-presentation";
import Deck, { type DeckScene } from "@/components/presentation/deck";
import { SceneHeader, Kicker, Stat, OrbitalRings } from "@/components/scene/kit";
import { NodeStack, BarChart } from "@/components/scene/archetypes";
import { ChapterFinale } from "@/components/scene/chapter-nav";

const CATALYSTS = [
  {
    id: "focus",
    label: "Focus",
    metric: "Driver 01",
    detail:
      "A management team that does one thing tends to do it better. Separation lets each business set strategy, hire specialists, and be judged on its own scoreboard.",
  },
  {
    id: "capital",
    label: "Capital allocation",
    metric: "Driver 02",
    detail:
      "Inside a conglomerate, cash quietly subsidizes the weakest unit. Standalone companies must fund themselves at their own cost of capital, which sharpens every decision.",
  },
  {
    id: "discount",
    label: "Closing the discount",
    metric: "Driver 03",
    detail:
      "Boards separate to recapture the sum-of-the-parts gap. If the market values two clean stories higher than one messy one, the split is free money for holders.",
  },
  {
    id: "activist",
    label: "Activist pressure",
    metric: "Driver 04",
    detail:
      "An activist takes a stake, publishes a break-up thesis, and campaigns for board seats. The separation is often the settlement that ends the fight.",
  },
];

const DRIVERS = [
  { label: "Focus / strategy", value: 34, display: "34%", emphasize: true },
  { label: "Activist demand", value: 28, display: "28%", emphasize: false },
  { label: "Close the discount", value: 24, display: "24%", emphasize: false },
  { label: "Tax / regulatory", value: 14, display: "14%", emphasize: false },
];

export default function CatalystChapter() {
  const scenes: DeckScene[] = [
    { id: "hero", name: "The Turning Point", render: (a) => <Hero active={a} /> },
    { id: "claim", name: "The Calculus", render: () => <Claim /> },
    { id: "drivers", name: "Four Drivers", render: () => <Drivers /> },
    { id: "mix", name: "The Mix", render: (a) => <Mix active={a} /> },
    { id: "activist", name: "The Activist", render: (a) => <Activist active={a} /> },
    {
      id: "finale",
      name: "To The Misconception",
      render: (a) => (
        <ChapterFinale
          current="the-catalyst"
          active={a}
          thesis="Boards separate for focus, capital, and pressure. But the common story about where the value comes from is wrong."
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
        <Kicker className="flex justify-center">Chapter 04 / The Turning Point</Kicker>
        <h1 className="mt-5 text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          Why Boards
          <br />
          <span className="text-gradient-gold">Pull The Trigger</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm text-white/60 sm:text-base">
          Focus, capital allocation, the conglomerate discount, and the activist
          knocking at the door.
        </p>
      </motion.div>
    </div>
  );
}

function Claim() {
  return (
    <div className="mx-auto max-w-3xl">
      <Kicker>The Board&apos;s Calculus</Kicker>
      <p className="mt-5 text-balance text-2xl font-bold leading-[1.25] sm:text-4xl">
        No board separates for elegance. They do it when{" "}
        <span className="text-accent-gold">the discount gets loud enough</span>{" "}
        that keeping the empire together starts to cost them their jobs.
      </p>
    </div>
  );
}

function Drivers() {
  return (
    <div>
      <SceneHeader
        kicker="What Forces The Decision"
        title="Four Drivers Of A Split"
        lede="Click each to see how it tips a board toward separation."
      />
      <div className="mt-8">
        <NodeStack nodes={CATALYSTS} />
      </div>
    </div>
  );
}

function Mix({ active }: { active: boolean }) {
  return (
    <div>
      <SceneHeader
        kicker="Stated Rationale"
        title="Why Companies Say They Split"
        lede="Focus leads the reasons boards give, but activist pressure is the quiet accelerant behind many of them."
      />
      <div className="mt-8 max-w-2xl">
        <BarChart data={DRIVERS} active={active} max={40} />
      </div>
      <p className="mt-6 max-w-2xl font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
        Illustrative distribution of stated motives.
      </p>
    </div>
  );
}

function Activist({ active }: { active: boolean }) {
  return (
    <div>
      <SceneHeader
        kicker="The Uninvited Catalyst"
        title="The Activist Playbook"
        lede="Take a position, publish the break-up math, campaign for the board, and let the sum-of-the-parts gap do the arguing."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat value={40} suffix="+" label="Break-up campaigns per year" active={active} accent />
        <Stat value={9} suffix=" mo" label="Median campaign to split" active={active} />
        <Stat value={2} suffix="x" label="Board seats often sought" active={active} />
      </div>
    </div>
  );
}
