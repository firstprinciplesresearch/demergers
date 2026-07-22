"use client";

import { motion } from "motion/react";
import { usePresentation } from "@/components/presentation/use-presentation";
import Deck, { type DeckScene } from "@/components/presentation/deck";
import { SceneHeader, Kicker, Stat, OrbitalRings } from "@/components/scene/kit";
import { Timeline, BarChart, Accordion } from "@/components/scene/archetypes";
import { ChapterFinale } from "@/components/scene/chapter-nav";

const TIMELINE = [
  {
    year: "1960s",
    title: "The empire-building decade",
    detail:
      "Cheap debt and merger mania build sprawling conglomerates. ITT, Litton, and Gulf+Western buy everything from insurance to bakeries.",
  },
  {
    year: "1980s",
    title: "The discount hardens",
    detail:
      "Investors learn that a group of unrelated businesses trades below the sum of its parts. Raiders start buying to break up.",
  },
  {
    year: "1993",
    title: "The academic proof",
    detail:
      "Cusatis, Miles, and Woolridge publish evidence that spin-offs and their parents beat the market over the years that follow.",
  },
  {
    year: "2010s",
    title: "The focus era",
    detail:
      "Activists industrialize the playbook. Break-ups become a default board response to a sagging multiple.",
  },
];

const OUTPERFORMANCE = [
  { label: "S&P 500", value: 100, display: "Base", emphasize: false },
  { label: "Parent cos", value: 118, display: "+18%", emphasize: false },
  { label: "Spun-off cos", value: 130, display: "+30%", emphasize: true },
];

const WHY = [
  {
    tag: "Cause",
    q: "Diversification was oversold",
    a: "The theory said unrelated businesses smooth earnings. In practice, investors can diversify themselves for free and refuse to pay managers to do it for them.",
  },
  {
    tag: "Cause",
    q: "Capital was misallocated",
    a: "A strong division's cash flow got funneled into a weak one. Separation forces each business to earn its own capital on its own return profile.",
  },
  {
    tag: "Cause",
    q: "No one could value the whole",
    a: "A single analyst covering six industries covers none of them well. Complexity is a discount the market applies for its own confusion.",
  },
];

export default function WhereItBeganChapter() {
  const scenes: DeckScene[] = [
    { id: "hero", name: "The Origin", render: (a) => <Hero active={a} /> },
    { id: "era", name: "The Empire Era", render: () => <Era /> },
    { id: "timeline", name: "Timeline", render: () => <TimelineScene /> },
    { id: "proof", name: "The Proof", render: (a) => <Proof active={a} /> },
    { id: "why", name: "Why It Broke", render: () => <Why /> },
    { id: "tape", name: "The Tape", render: (a) => <Tape active={a} /> },
    {
      id: "finale",
      name: "To The Mechanics",
      render: (a) => (
        <ChapterFinale
          current="where-it-began"
          active={a}
          thesis="History proved the pattern pays. Next we open the machine and see exactly how a separation is built."
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
        <Kicker className="flex justify-center">Chapter 02 / The Origin</Kicker>
        <h1 className="mt-5 text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          The Conglomerate Era
          <br />
          <span className="text-gradient-gold">And Its Undoing</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm text-white/60 sm:text-base">
          How the empires of the 1960s became the breakups of the 1990s, and the
          study that proved separation paid.
        </p>
      </motion.div>
    </div>
  );
}

function Era() {
  return (
    <div className="mx-auto max-w-3xl">
      <Kicker>The Empire Era</Kicker>
      <p className="mt-5 text-balance text-2xl font-bold leading-[1.25] sm:text-4xl">
        For a generation, bigger meant safer. Buy an insurer, a bakery, and a
        defense contractor, and you had{" "}
        <span className="text-accent-gold">a fortress</span>. Then the market
        decided fortresses were just fog.
      </p>
    </div>
  );
}

function TimelineScene() {
  return (
    <div>
      <SceneHeader
        kicker="Four Turning Points"
        title="From Empire To Breakup"
        lede="The arc from conglomerate mania to the modern focus playbook."
      />
      <div className="mt-8 max-w-2xl">
        <Timeline items={TIMELINE} />
      </div>
    </div>
  );
}

function Proof({ active }: { active: boolean }) {
  return (
    <div>
      <SceneHeader
        kicker="The Landmark Study"
        title="Separation Beat The Market"
        lede="The 1993 Cusatis, Miles, and Woolridge study tracked spin-offs and their parents. Both groups outperformed for years after the split."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat value={36} suffix=" mo" label="Window studied" active={active} />
        <Stat value={30} suffix="%" label="Est. spin-co excess return" active={active} accent />
        <Stat value={161} label="Separations sampled" active={active} />
      </div>
      <p className="mt-6 max-w-2xl font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
        Figures paraphrase the study for narrative purposes.
      </p>
    </div>
  );
}

function Why() {
  return (
    <div>
      <SceneHeader
        kicker="The Diagnosis"
        title="Why The Empires Broke"
        lede="Three structural flaws that the market eventually refused to pay for."
      />
      <div className="mt-8 max-w-2xl">
        <Accordion items={WHY} />
      </div>
    </div>
  );
}

function Tape({ active }: { active: boolean }) {
  return (
    <div>
      <SceneHeader
        kicker="What The Tape Said"
        title="Both Halves, Ahead Of The Index"
        lede="Rebased to 100, the parents and their spin-offs each pulled ahead of the broad market in the years after separation."
      />
      <div className="mt-8 max-w-2xl">
        <BarChart data={OUTPERFORMANCE} active={active} max={140} />
      </div>
    </div>
  );
}
