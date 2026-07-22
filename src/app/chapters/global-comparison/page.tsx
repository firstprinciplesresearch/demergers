"use client";

import { motion } from "motion/react";
import { usePresentation } from "@/components/presentation/use-presentation";
import Deck, { type DeckScene } from "@/components/presentation/deck";
import { SceneHeader, Kicker, Stat, OrbitalRings } from "@/components/scene/kit";
import { CompareTable, Accordion } from "@/components/scene/archetypes";
import { ChapterFinale } from "@/components/scene/chapter-nav";

const COLUMNS = ["United States", "Europe", "India"];
const ROWS = [
  {
    label: "Deal volume",
    cells: ["Highest", "High", "Rising fast"],
    emphasize: false,
  },
  {
    label: "Tax on spin",
    cells: ["Often tax-free", "Varies by state", "Tax-neutral if compliant"],
    emphasize: false,
  },
  {
    label: "Regulator",
    cells: ["SEC, Form 10", "National + EU rules", "NCLT scheme of arrangement"],
    emphasize: true,
  },
  {
    label: "Timeline",
    cells: ["6 to 12 months", "9 to 18 months", "12 to 24 months"],
    emphasize: false,
  },
  {
    label: "Retail depth",
    cells: ["Deep", "Moderate", "Deep and growing"],
    emphasize: false,
  },
];

const INDIA = [
  {
    tag: "India",
    q: "The NCLT scheme route",
    a: "Indian demergers run through a court-approved scheme of arrangement at the National Company Law Tribunal. It is slower than a US Form 10 but gives the separation a firm legal backbone.",
  },
  {
    tag: "India",
    q: "Tax neutrality is conditional",
    a: "A demerger can be tax-neutral for the company and shareholders if it meets the conditions in the Income Tax Act, including transferring the undertaking on a going-concern basis.",
  },
  {
    tag: "India",
    q: "Why the pipeline is swelling",
    a: "Family groups are simplifying sprawling structures, and a deep retail base rewards clean, single-theme listings. The setup that drove US break-ups in the 1990s is arriving at scale.",
  },
];

export default function GlobalComparisonChapter() {
  const scenes: DeckScene[] = [
    { id: "hero", name: "The Field", render: (a) => <Hero active={a} /> },
    { id: "claim", name: "Same Logic", render: () => <Claim /> },
    { id: "table", name: "Three Markets", render: () => <Table /> },
    { id: "scale", name: "The Scale", render: (a) => <Scale active={a} /> },
    { id: "india", name: "India Spotlight", render: () => <India /> },
    {
      id: "finale",
      name: "To The Case Studies",
      render: (a) => (
        <ChapterFinale
          current="global-comparison"
          active={a}
          thesis="The logic travels. Now let us watch it play out on the tape, in four separations that repriced the map."
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
        <Kicker className="flex justify-center">Chapter 07 / The Field</Kicker>
        <h1 className="mt-5 text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          Demergers
          <br />
          <span className="text-gradient-gold">Across Borders</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm text-white/60 sm:text-base">
          The United States, Europe, and India. Same logic, very different tax
          and regulatory terrain.
        </p>
      </motion.div>
    </div>
  );
}

function Claim() {
  return (
    <div className="mx-auto max-w-3xl">
      <Kicker>Same Logic, Different Terrain</Kicker>
      <p className="mt-5 text-balance text-2xl font-bold leading-[1.25] sm:text-4xl">
        The behavior that creates the edge is universal. What changes across
        borders is <span className="text-accent-gold">the friction</span>: how
        long it takes, who signs off, and who pays tax.
      </p>
    </div>
  );
}

function Table() {
  return (
    <div>
      <SceneHeader
        kicker="Side By Side"
        title="Three Markets, One Pattern"
        lede="The regulator row is where the real differences hide."
      />
      <div className="mt-8">
        <CompareTable columns={COLUMNS} rows={ROWS} />
      </div>
    </div>
  );
}

function Scale({ active }: { active: boolean }) {
  return (
    <div>
      <SceneHeader
        kicker="Where The Volume Is"
        title="The Global Pipeline"
        lede="The United States still leads on volume, but India is the fastest-growing arena for corporate separations."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat value={50} suffix="+" label="US separations per year" active={active} />
        <Stat value={20} suffix="+" label="European separations per year" active={active} />
        <Stat value={40} suffix="%" label="India pipeline growth" active={active} accent />
      </div>
      <p className="mt-6 max-w-2xl font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
        Illustrative figures for narrative purposes.
      </p>
    </div>
  );
}

function India() {
  return (
    <div>
      <SceneHeader
        kicker="The Fastest Arena"
        title="India Spotlight"
        lede="A different legal route, a conditional tax break, and a swelling pipeline."
      />
      <div className="mt-8 max-w-2xl">
        <Accordion items={INDIA} />
      </div>
    </div>
  );
}
