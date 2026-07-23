"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useTransform } from "motion/react";
import {
  ArrowRight,
  TrendingUp,
  FileText,
  DollarSign,
  Briefcase,
  Users,
  Compass,
  LayoutGrid,
  Shield,
  Layers,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Scale,
  Award,
  ChevronDown,
  LineChart,
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePresentation } from "@/components/presentation/use-presentation";
import Deck, { type DeckScene } from "@/components/presentation/deck";
import { Kicker, Stat, OrbitalRings, AnimatedCounter, SceneHeader } from "@/components/scene/kit";
import { cn } from "@/lib/utils";

// Register GSAP ScrollTrigger safely on client
if (typeof window !== "undefined") {
  const { ScrollTrigger } = require("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhatMostPeopleMissChapter() {
  const scenes: DeckScene[] = [
    {
      id: "hero",
      name: "The Analysis",
      render: (active) => <HeroScene active={active} controller={controller} />,
    },
    {
      id: "subject",
      name: "The Subject",
      render: (active) => <SubjectScene active={active} controller={controller} />,
    },
    {
      id: "presentation",
      name: "Investor Presentation",
      render: (active) => <PresentationScene active={active} controller={controller} />,
    },
    {
      id: "scheme",
      name: "Scheme Document",
      render: (active) => <SchemeScene active={active} controller={controller} />,
    },
    {
      id: "shareholders",
      name: "Shareholding Pattern",
      render: (active) => <ShareholdersScene active={active} controller={controller} />,
    },
    {
      id: "financials",
      name: "Financial Audits",
      render: (active) => <FinancialsScene active={active} controller={controller} />,
    },
    {
      id: "thesis",
      name: "Building Thesis",
      render: (active) => <ThesisScene active={active} controller={controller} />,
    },
    {
      id: "ending",
      name: "Next Step",
      render: (active) => <EndingScene active={active} controller={controller} />,
    },
  ];

  const controller = usePresentation(scenes.length);

  return <Deck controller={controller} scenes={scenes} />;
}

/* ==========================================================================
   SCENE 1: HERO / PROCESS INTRO
   ========================================================================== */
function HeroScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const textOpacity = useTransform(progress, [0, seg * 0.8], [1, 0.25]);

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-20 select-none">
        <motion.div
          animate={active ? { scale: [1, 1.05, 1], y: [-10, 10, -10] } : {}}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute h-96 w-96 rounded-full border border-white/5"
        />
      </div>

      <motion.div style={{ opacity: textOpacity }} className="relative z-10 select-none max-w-3xl">
        <div className="mb-6 flex justify-center">
          <Kicker>Chapter 09 / Live Case Study</Kicker>
        </div>

        <h1 className="text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          Dissecting a Live
          <br />
          <span className="text-gradient-gold">Demerger</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-xs uppercase tracking-widest text-white/50 leading-relaxed">
          Instead of revealing a ready-made conclusion, we walk through the entire analytical thought process behind building an investment thesis from scratch.
        </p>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   SCENE 2: THE SUBJECT (Tata Motors case outline)
   ========================================================================== */
function SubjectScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Active Case Study"
          title="The Tata Motors Restructuring"
          lede="To learn the process, we analyze the ongoing demerger of Tata Motors into two independent listed entities: Commercial Vehicles (CV) and Passenger/EV Vehicles (PV)."
        />
        <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-md">
          This large-cap split provides a perfect blueprint to audit treasury lines, growth cycles, and institutional rotation.
        </p>
      </div>

      {/* Case Outline Card */}
      <div className="rounded-xl border border-white/10 bg-space-dark/85 p-6 max-w-sm font-mono text-[9px] uppercase tracking-wider relative">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <span>TATA MOTORS RESTRO</span>
          <span className="text-accent-gold">ONGOING</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-white/40">Entity A (Residual)</span>
            <span className="text-white font-bold">Commercial Vehicles (Trucks/Buses)</span>
          </div>
          <div className="flex justify-between border-t border-white/5 pt-2">
            <span className="text-white/40">Entity B (Spin-co)</span>
            <span className="text-accent-gold font-bold">Passenger Vehicles &amp; EV (Jaguar Land Rover)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 3: STEP 1 - INVESTOR PRESENTATION
   ========================================================================== */
function PresentationScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Filing Step 1"
          title="Investor Presentation Review"
          lede="The presentation outlines the board&apos;s strategic rationale. We look past the graphics to analyze the operating synergy claims."
        />
        <p className="mt-4 text-xs text-white/50 leading-relaxed max-w-md">
          <strong>The Thesis:</strong> The commercial vehicle segment operates on cyclical B2B freight cycles, while passenger EV/JLR runs on B2C premium luxury trends. Combining them dilutes both investment themes.
        </p>
      </div>

      {/* Presentation slide highlight */}
      <div className="border border-white/5 bg-space-panel rounded-lg p-5 max-w-sm">
        <span className="font-mono text-[8px] text-accent-gold block mb-1">STRATEGIC HIGHLIGHTS</span>
        <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold">Operating Segregation</h4>
        <ul className="mt-3 space-y-2 text-[10px] text-white/50 list-disc pl-4 leading-relaxed">
          <li><strong>CV Division:</strong> Solid cash flow generating machine, funding its own CAPEX.</li>
          <li><strong>PV/EV Division:</strong> High capital expenditure requirement to develop global EV architectures.</li>
          <li><strong>Synergy overlap:</strong> Minimal. Independent leadership can accelerate decision speeds.</li>
        </ul>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 4: STEP 2 - SCHEME OF ARRANGEMENT
   ========================================================================== */
function SchemeScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      {/* Covenants checklist */}
      <div className="grid gap-3 font-mono text-[9px] uppercase tracking-wider max-w-xs">
        <div className="border border-white/5 bg-space-panel rounded-lg p-3">
          <span className="text-accent-gold font-bold block mb-1">Swap Ratio check</span>
          <span className="text-white/60">Share entitlement set at 1:1. Shareholders receive 1 share in the PV/EV entity for every 1 share held in Tata Motors.</span>
        </div>
        <div className="border border-white/5 bg-space-panel rounded-lg p-3">
          <span className="text-white/40 block mb-1">Treasury Allocation</span>
          <span className="text-white/60">Net debt and capital reserves allocated to support JLR operations standalone.</span>
        </div>
      </div>

      <div>
        <SceneHeader
          kicker="Filing Step 2"
          title="Scheme of Arrangement Audit"
          lede="We audit the NCLT Scheme document to check the exact share entitlement ratios, treasury allocations, and Appointed Dates."
        />
        <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-md">
          A proportionate **1:1 ratio** ensures no dilution for public shareholders, keeping tax neutrality intact under Section 2(19AA).
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 5: STEP 3 - SHAREHOLDING PATTERN
   ========================================================================== */
function ShareholdersScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Filing Step 3"
          title="Shareholding Pattern Analysis"
          lede="Analyzing the voter registers tells us who the natural buyers and forced sellers will be post-split."
        />
        <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-md">
          Since the PV/EV unit will list as a separate entity, index-restricted mutual funds holding Tata Motors will be forced to sell the PV shares if it does not qualify for their specific index weight constraints.
        </p>
      </div>

      {/* Shareholding pie segments */}
      <div className="border border-white/5 bg-space-panel rounded-xl p-5 max-w-sm font-mono text-[9px]">
        <span className="text-white/40 block mb-2">Voter Registry Allocation</span>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span>Promoter Group (Tata Sons)</span>
            <span className="text-white font-bold">~46.4%</span>
          </div>
          <div className="flex justify-between border-t border-white/5 pt-1.5">
            <span>Foreign Institutions (FII)</span>
            <span className="text-accent-gold font-bold">~18.2% (Key Rotation Risk)</span>
          </div>
          <div className="flex justify-between border-t border-white/5 pt-1.5">
            <span>Domestic Institutions (Mutual Funds)</span>
            <span className="text-white font-bold">~17.5%</span>
          </div>
          <div className="flex justify-between border-t border-white/5 pt-1.5">
            <span>Public float</span>
            <span className="text-white/45">~17.9%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 6: STEP 4 - FINANCIAL STATEMENTS
   ========================================================================== */
function FinancialsScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      {/* Financial ratios card */}
      <div className="border border-white/5 bg-space-panel rounded-xl p-5 max-w-sm font-mono text-[9px]">
        <span className="text-white/40 block mb-2">Standalone segment metrics</span>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span>CV Standalone EBITDA Margin</span>
            <span className="text-white font-bold">~10.5% (Stable)</span>
          </div>
          <div className="flex justify-between border-t border-white/5 pt-1.5">
            <span>PV/JLR EBITDA Margin</span>
            <span className="text-accent-gold font-bold">~16.2% (Expanding)</span>
          </div>
          <div className="flex justify-between border-t border-white/5 pt-1.5">
            <span>PV EV Segment ROCE</span>
            <span className="text-white font-bold">Targeting 20%+ post-split</span>
          </div>
        </div>
      </div>

      <div>
        <SceneHeader
          kicker="Filing Step 4"
          title="Financial Statement Separation"
          lede="We carve out historical segment financials from annual reports to project standalone margins and returns."
        />
        <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-md">
          Comparing the PV/JLR EBITDA margins against direct global passenger car peers (like BMW, Mercedes) reveals a substantial valuation discount relative to Tata Motors&apos; current consolidated trading multiple.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 7: THESIS FORMULATION
   ========================================================================== */
function ThesisScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Thesis Synthesis"
          title="Formulating the SOTP Valuation"
          lede="Instead of looking at ready-made target prices, we calculate the sum-of-the-parts (SOTP) values manually to locate the arbitrage gap."
        />
        <p className="mt-4 text-xs text-white/50 leading-relaxed max-w-md">
          By applying a cyclical B2B B2C EV valuation multiple split (e.g. 10x EV/EBITDA to the CV division, and 18x multiple to the premium passenger EV segment), we estimate the post-demerger fair valuation floor.
        </p>
      </div>

      {/* SOTP Table */}
      <div className="border border-accent-gold/20 bg-accent-gold/[0.01] rounded-xl p-5 max-w-sm font-mono text-[9px]">
        <span className="text-accent-gold font-bold block mb-2">SOTP Valuation Template</span>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span>CV segment (Residual)</span>
            <span>10x EV/EBITDA Target</span>
          </div>
          <div className="flex justify-between border-t border-white/5 pt-1.5">
            <span>PV/JLR segment (Spin-co)</span>
            <span className="text-accent-gold font-bold">18x EV/EBITDA Target</span>
          </div>
          <div className="flex justify-between border-t border-white/5 pt-1.5">
            <span>Estimated Value Unlock</span>
            <span className="text-accent-gold font-bold">+28% Conglomerate Rerating</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 8: ENDING CARD (Transition link to Chapter 10)
   ========================================================================== */
function EndingScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <Kicker className="flex justify-center">Next Chapter</Kicker>

      <div className="mt-8 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-balance text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl"
        >
          Building the Strategy
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-balance text-3xl font-black uppercase leading-none tracking-tight text-gradient-gold sm:text-5xl"
        >
          The Final Thesis
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 0.6 } : {}}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mx-auto max-w-lg text-xs leading-relaxed text-white/60 pt-4"
        >
          We have run the live analysis from annual reports to share ratios. Now we assemble the final thesis blocks to build a scalable, structured demerger portfolio strategy.
        </motion.p>
      </div>

      {/* Chapter 10 Navigation Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 3.8 }}
        className="mt-12"
      >
        <Link
          href="/chapters/the-opportunity"
          className="interactive-control bg-accent-gold hover:bg-accent-gold/90 text-black flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide shadow-2xl"
        >
          <span>Continue to Chapter 10</span>
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
