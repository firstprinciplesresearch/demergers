"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePresentation } from "@/components/presentation/use-presentation";
import Deck, { type DeckScene } from "@/components/presentation/deck";
import { SceneHeader, Kicker, Stat, OrbitalRings } from "@/components/scene/kit";
import { NodeStack } from "@/components/scene/archetypes";

const PLAYBOOK = [
  {
    id: "screen",
    label: "Screen the pipeline",
    metric: "Step 01",
    detail:
      "Track announced and completed separations across the US, Europe, and India. The universe is small enough to follow by hand and large enough to always hold candidates.",
  },
  {
    id: "structure",
    label: "Read the structure",
    metric: "Step 02",
    detail:
      "Check the distribution ratio, the tax treatment, and where the debt landed. The structure tells you whether the parent or the spin-co is the real opportunity.",
  },
  {
    id: "forced",
    label: "Wait for forced selling",
    metric: "Step 03",
    detail:
      "Let index-driven and mandate-driven sellers clear. The best entry is often weeks after listing, not on day one.",
  },
  {
    id: "insiders",
    label: "Follow the insiders",
    metric: "Step 04",
    detail:
      "Open-market buying by spin-co management is your confirmation. Size up when incentives and price disagree in your favor.",
  },
];

export default function OpportunityChapter() {
  const scenes: DeckScene[] = [
    { id: "hero", name: "The Thesis", render: (a) => <Hero active={a} /> },
    { id: "playbook", name: "The Playbook", render: () => <Playbook /> },
    { id: "sizing", name: "Market Sizing", render: (a) => <Sizing active={a} /> },
    { id: "finale", name: "This Has Begun", render: (a) => <CinematicFinale active={a} /> },
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
        <Kicker className="flex justify-center">Chapter 10 / The Thesis</Kicker>
        <h1 className="mt-5 text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          This Has
          <br />
          <span className="text-gradient-gold">Only Just Begun</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm text-white/60 sm:text-base">
          Building a demerger strategy from first principles. Where the next
          unlock is hiding.
        </p>
      </motion.div>
    </div>
  );
}

function Playbook() {
  return (
    <div>
      <SceneHeader
        kicker="From Thesis To Process"
        title="The Four-Step Playbook"
        lede="A repeatable process, not a one-off bet. Click through the sequence."
      />
      <div className="mt-8">
        <NodeStack nodes={PLAYBOOK} />
      </div>
    </div>
  );
}

function Sizing({ active }: { active: boolean }) {
  return (
    <div>
      <SceneHeader
        kicker="The Opportunity Set"
        title="A Deep, Renewing Pool"
        lede="Separations happen every year, in every major market, driven by forces that are only intensifying. The pipeline refills itself."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat value={80} suffix="+" label="Global separations per year" active={active} accent />
        <Stat value={300} prefix="$" suffix="B+" label="Annual value in motion" active={active} />
        <Stat value={24} suffix=" mo" label="The window to act" active={active} />
      </div>
      <p className="mt-6 max-w-2xl font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
        Illustrative figures for narrative purposes.
      </p>
    </div>
  );
}

function CinematicFinale({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setTilt({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex min-h-[72vh] items-center justify-center overflow-hidden rounded-2xl"
    >
      {/* Breathing gradient */}
      <div
        aria-hidden
        className="animate-breathe absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, rgba(255,184,0,0.16), rgba(255,107,0,0.06) 45%, transparent 72%)",
        }}
      />
      {/* Floating particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-accent-gold/60"
            style={{
              left: `${(i * 53) % 100}%`,
              bottom: "-10px",
              animation: `float-up ${6 + (i % 5)}s linear ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Parallax content */}
      <motion.div
        animate={{
          x: tilt.x * -14,
          y: tilt.y * -14,
          opacity: active ? 1 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
        className="relative z-10 mx-auto max-w-3xl px-4 text-center"
      >
        <Kicker className="flex justify-center">First Principles Research</Kicker>
        <h2 className="mt-5 text-balance text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Value is never destroyed in a demerger.
          <br />
          <span className="text-gradient-gold">It is finally set free.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm text-white/60">
          The empires keep breaking. The forced sellers keep selling. The
          insiders keep buying. The only question is whether you are watching.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/case-studies"
            className="interactive-control glass flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
          >
            Explore the case studies
            <ArrowUpRight size={16} className="text-accent-gold" />
          </Link>
          <Link
            href="/"
            className="interactive-control rounded-full px-6 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/60"
          >
            Back to overview
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
