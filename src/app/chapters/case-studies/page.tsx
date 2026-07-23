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
  Activity,
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

export default function CaseStudiesChapter() {
  const scenes: DeckScene[] = [
    {
      id: "hero",
      name: "The Cases",
      render: (active) => <HeroScene active={active} controller={controller} />,
    },
    {
      id: "insight",
      name: "Core Lesson",
      render: (active) => <InsightScene active={active} controller={controller} />,
    },
    {
      id: "wealth-creators",
      name: "Wealth Creators",
      render: (active) => <WealthCreatorsScene active={active} controller={controller} />,
    },
    {
      id: "moderate",
      name: "Moderate Outcomes",
      render: (active) => <ModerateScene active={active} controller={controller} />,
    },
    {
      id: "disappointments",
      name: "Disappointments",
      render: (active) => <DisappointmentsScene active={active} controller={controller} />,
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
   SCENE 1: HERO / INTRO
   ========================================================================== */
function HeroScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const textOpacity = useTransform(progress, [0, seg * 0.8], [1, 0.25]);

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-20 select-none">
        <motion.div
          animate={active ? { scale: [1, 1.05, 1], rotate: [0, 90, 0] } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute h-[380px] w-[380px] rounded-full border border-white/[0.02]"
        />
      </div>

      <motion.div style={{ opacity: textOpacity }} className="relative z-10 select-none max-w-3xl">
        <div className="mb-6 flex justify-center">
          <Kicker>Chapter 07 / The Case Studies</Kicker>
        </div>

        <h1 className="text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          Learning Through
          <br />
          <span className="text-gradient-gold">Case Studies</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-xs uppercase tracking-widest text-white/50 leading-relaxed">
          Dividing demergers into performance categories to extract actionable investment rules.
        </p>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   SCENE 2: CORE LESSON (Learning from Failure)
   ========================================================================== */
function InsightScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Analytical Strategy"
          title="Compare the Outcomes"
          lede="Rather than looking only at success stories, we must divide splits into categories. Understanding why some demergers failed is often more valuable than studying only the successful ones."
        />
        <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-md">
          A symmetric study of wealth creators, average outcomes, and clear disappointments exposes promoter intentions and operational pitfalls.
        </p>
      </div>

      {/* Grid Categories */}
      <div className="grid gap-3 font-mono text-[9px] uppercase tracking-wider max-w-xs">
        <div className="border border-emerald-500/10 bg-emerald-500/[0.01] rounded-lg p-3 flex items-center justify-between">
          <span>1. Significant Wealth Creators</span>
          <TrendingUp className="text-emerald-400" size={12} />
        </div>
        <div className="border border-white/5 bg-space-panel rounded-lg p-3 flex items-center justify-between">
          <span>2. Moderate Outcomes</span>
          <Activity className="text-white/40" size={12} />
        </div>
        <div className="border border-red-500/10 bg-red-500/[0.01] rounded-lg p-3 flex items-center justify-between">
          <span>3. Disappointments</span>
          <AlertTriangle className="text-red-400" size={12} />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 3: SIGNIFICANT WEALTH CREATORS
   ========================================================================== */
function WealthCreatorsScene({ active, controller }: { active: boolean; controller: any }) {
  const creators = [
    { name: "Anup Engineering", splitFrom: "Arvind Ltd", insight: "Dedicated heavy engineering focus unlocked massive post-split capital expenditure and expansion." },
    { name: "Rossell Techsys", splitFrom: "Rossell India", insight: "Specialized defense/aerospace operations gained direct promoter and customer attention, driving rerating." },
    { name: "Greenpanel Industries", splitFrom: "Greenply Industries", insight: "High-margin MDF (Medium Density Fiberboard) division outgrew and out-margin&apos;d the legacy plywood parent." },
    { name: "Aarti Pharmalabs", splitFrom: "Aarti Industries", insight: "Chemical API segment unlocked dedicated pharmaceutical research funding and standalone valuation." },
  ];

  return (
    <div>
      <SceneHeader
        kicker="Category 01"
        title="Significant Wealth Creators"
        lede="These demergers created exponential shareholder value. Each featured a high-growth operating division freed from a slower legacy parent."
      />

      <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-4 max-w-4xl">
        {creators.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative rounded-xl border border-emerald-500/5 bg-space-panel p-4 hover:border-emerald-500/20 transition-all duration-300"
          >
            <span className="font-mono text-[7px] text-emerald-400 font-bold block mb-1">Split from {c.splitFrom}</span>
            <h4 className="font-black text-xs uppercase tracking-tight text-white leading-snug">
              {c.name}
            </h4>
            <p className="mt-2 text-[10px] text-white/50 leading-relaxed">
              {c.insight}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 4: MODERATE OUTCOMES
   ========================================================================== */
function ModerateScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Category 02"
          title="Moderate Outcomes"
          lede="Cases where structural value was created, but high capital requirements or industry cycles kept long-term returns close to market averages."
        />
      </div>

      {/* Motherson Sumi Card */}
      <div className="border border-white/5 bg-space-panel rounded-xl p-5 max-w-sm">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-white/40 mb-3">
          <Activity size={12} />
          <span>Restructuring Case Study</span>
        </div>
        <h4 className="text-sm font-black text-white uppercase">Motherson Sumi Systems</h4>
        <p className="text-xs text-white/60 mt-2 leading-relaxed">
          The demerger separated the domestic wiring harness business from global operations to simplify shareholdings. While it cleaned up the structure and created a clear pure-play domestic proxy, the automotive industry capital intensity kept returns close to sector averages.
        </p>
        <div className="mt-4 border-t border-white/5 pt-2 flex items-center justify-between font-mono text-[8px] text-white/30">
          <span>STATUS: RESTRUCTURED</span>
          <span>RETURNS: MODERATE / AVERAGE</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 5: DISAPPOINTMENTS (Piramal Pharma analysis)
   ========================================================================== */
function DisappointmentsScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Category 03"
          title="Disappointments &amp; Traps"
          lede="Examples where the market anticipated an immediate valuation re-rating, but execution lag and balance sheet burdens fell short."
        />
        <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-md">
          A demerger is not a magic shield against poor operations. If the spun-off entity is structurally weak or debt-heavy, separation only exposes its vulnerability.
        </p>
      </div>

      {/* Piramal Pharma details */}
      <div className="border border-red-500/10 bg-red-500/[0.01] rounded-xl p-5 max-w-sm">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-red-400 mb-3 font-bold">
          <AlertTriangle size={12} />
          <span>Underperformance Case</span>
        </div>
        <h4 className="text-sm font-black text-white uppercase">Piramal Pharma Limited</h4>
        <p className="text-xs text-white/60 mt-2 leading-relaxed">
          Spun off from Piramal Enterprises to unlock the pharmaceutical segment. However, the business was loaded with parent debt, hit by global API margins compression, and suffered from high operational overheads, leading to a long post-split recovery path before the floor was established.
        </p>
        <div className="mt-4 border-t border-red-500/10 pt-2 flex items-center justify-between font-mono text-[8px] text-red-400/60">
          <span>FLAG: HIGH DEBT / LOW EBITDA</span>
          <span>OUTCOME: INITIAL CAPITULATION</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 6: ENDING CARD (Transition link to Chapter 8: global comparison)
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
          Crossing Borders
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-balance text-3xl font-black uppercase leading-none tracking-tight text-gradient-gold sm:text-5xl"
        >
          Global Comparisons
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 0.6 } : {}}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mx-auto max-w-lg text-xs leading-relaxed text-white/60 pt-4"
        >
          Now that we have compared the historical case studies of wealth creators and disappointments in India, we cross borders to compare global structural differences.
        </motion.p>
      </div>

      {/* Chapter 8 Navigation Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 3.8 }}
        className="mt-12"
      >
        <Link
          href="/chapters/global-comparison"
          className="interactive-control bg-accent-gold hover:bg-accent-gold/90 text-black flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide shadow-2xl"
        >
          <span>Continue to Chapter 8</span>
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
