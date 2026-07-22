"use client";

import { motion } from "motion/react";
import { usePresentation } from "@/components/presentation/use-presentation";
import Deck, { type DeckScene } from "@/components/presentation/deck";
import { SceneHeader, Kicker, Stat, OrbitalRings } from "@/components/scene/kit";
import { NodeStack, BarChart } from "@/components/scene/archetypes";
import { ChapterFinale } from "@/components/scene/chapter-nav";

const MECHANISMS = [
  {
    id: "forced",
    label: "Forced selling",
    metric: "Engine 01",
    detail:
      "A large-cap parent spins a small-cap child. Index funds tracking the parent's benchmark are not allowed to hold it, so they sell indiscriminately on day one. Price detaches from value.",
  },
  {
    id: "insiders",
    label: "Insider alignment",
    metric: "Engine 02",
    detail:
      "Spin-co managers receive fresh equity and options struck at the low opening price. For the first time they own the upside of the business they run. Watch what insiders buy.",
  },
  {
    id: "neglect",
    label: "Analyst neglect",
    metric: "Engine 03",
    detail:
      "No coverage, no history, no marketing. The spin-co is an orphan. The diligent investor is paid for the work no one else has bothered to do yet.",
  },
  {
    id: "parent",
    label: "The cleaner parent",
    metric: "Engine 04",
    detail:
      "Stripped of the drag, the parent often re-rates too. The same holder can win on both sides of the same split.",
  },
];

const RETURNS = [
  { label: "Broad market", value: 100, display: "Base", emphasize: false },
  { label: "Parents", value: 116, display: "+16%", emphasize: false },
  { label: "Small spin-cos", value: 122, display: "+22%", emphasize: false },
  { label: "Insider-bought", value: 138, display: "+38%", emphasize: true },
];

export default function AlphaEngineChapter() {
  const scenes: DeckScene[] = [
    { id: "hero", name: "The Core", render: (a) => <Hero active={a} /> },
    { id: "claim", name: "The Machine", render: () => <Claim /> },
    { id: "mechanisms", name: "Four Engines", render: () => <Mechanisms /> },
    { id: "evidence", name: "The Evidence", render: (a) => <Evidence active={a} /> },
    { id: "returns", name: "By Mechanism", render: (a) => <Returns active={a} /> },
    { id: "window", name: "The Window", render: (a) => <Window active={a} /> },
    {
      id: "finale",
      name: "To The Global Field",
      render: (a) => (
        <ChapterFinale
          current="the-alpha-engine"
          active={a}
          thesis="The engine runs on behavior, not geography. But the terrain it runs on changes sharply from one country to the next."
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
        <Kicker className="flex justify-center">Chapter 06 / The Core</Kicker>
        <h1 className="mt-5 text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          The
          <br />
          <span className="text-gradient-gold">Alpha Engine</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm text-white/60 sm:text-base">
          Forced selling, orphaned small-caps, aligned insiders. Why the numbers
          keep favoring the spun-off.
        </p>
      </motion.div>
    </div>
  );
}

function Claim() {
  return (
    <div className="mx-auto max-w-3xl">
      <Kicker>The Machine</Kicker>
      <p className="mt-5 text-balance text-2xl font-bold leading-[1.25] sm:text-4xl">
        The demerger edge is not luck and it is not one trick. It is{" "}
        <span className="text-accent-gold">four forces</span> that fire at the
        same moment a spin-co is born.
      </p>
    </div>
  );
}

function Mechanisms() {
  return (
    <div>
      <SceneHeader
        kicker="Under The Hood"
        title="The Four Engines"
        lede="Click each to see how it manufactures mispricing."
      />
      <div className="mt-8">
        <NodeStack nodes={MECHANISMS} />
      </div>
    </div>
  );
}

function Evidence({ active }: { active: boolean }) {
  return (
    <div>
      <SceneHeader
        kicker="What The Studies Find"
        title="The Numbers Keep Repeating"
        lede="Across decades and markets, spin-offs and their parents have tended to beat their benchmarks in the years after separation."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat value={10} suffix=" pts" label="Avg annual excess, spin-cos" active={active} accent />
        <Stat value={24} suffix=" mo" label="Where most gains land" active={active} />
        <Stat value={3} suffix="x" label="Insider-buy signal edge" active={active} />
      </div>
      <p className="mt-6 max-w-2xl font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
        Directional figures drawn from published spin-off research.
      </p>
    </div>
  );
}

function Returns({ active }: { active: boolean }) {
  return (
    <div>
      <SceneHeader
        kicker="Sorting The Edge"
        title="Return, By Which Engine Fired"
        lede="The strongest signal is not the split itself. It is a spin-co where insiders were buyers at the open."
      />
      <div className="mt-8 max-w-2xl">
        <BarChart data={RETURNS} active={active} max={145} />
      </div>
    </div>
  );
}

function Window({ active }: { active: boolean }) {
  return (
    <div>
      <SceneHeader
        kicker="Timing The Trade"
        title="The First Two Years"
        lede="Forced selling clears, coverage arrives, and incentives compound. Most of the repricing happens in a window you can actually plan around."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat value={90} suffix=" days" label="Peak forced-selling pressure" active={active} />
        <Stat value={12} suffix=" mo" label="Coverage typically initiates" active={active} accent />
        <Stat value={24} suffix=" mo" label="Repricing largely complete" active={active} />
      </div>
    </div>
  );
}
