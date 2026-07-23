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
  ClipboardList,
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

export default function GlobalComparisonChapter() {
  const scenes: DeckScene[] = [
    {
      id: "hero",
      name: "The Checklist",
      render: (active) => <HeroScene active={active} controller={controller} />,
    },
    {
      id: "concept",
      name: "Core Framework",
      render: (active) => <ConceptScene active={active} controller={controller} />,
    },
    {
      id: "part-1",
      name: "Asset & Multiple Checks",
      render: (active) => <Part1Scene active={active} controller={controller} />,
    },
    {
      id: "part-2",
      name: "Balance Sheet Checks",
      render: (active) => <Part2Scene active={active} controller={controller} />,
    },
    {
      id: "part-3",
      name: "Liquidity & Risk Checks",
      render: (active) => <Part3Scene active={active} controller={controller} />,
    },
    {
      id: "worksheet",
      name: "Scoring Worksheet",
      render: (active) => <WorksheetScene active={active} controller={controller} />,
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
          animate={active ? { scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute h-96 w-96 rounded-full border border-white/5 border-dashed"
        />
      </div>

      <motion.div style={{ opacity: textOpacity }} className="relative z-10 select-none max-w-3xl">
        <div className="mb-6 flex justify-center">
          <Kicker>Chapter 08 / The Framework</Kicker>
        </div>

        <h1 className="text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          The Demerger
          <br />
          <span className="text-gradient-gold">Checklist</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-xs uppercase tracking-widest text-white/50 leading-relaxed">
          Instead of memorizing past examples, build a repeatable framework to evaluate any future corporate separation.
        </p>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   SCENE 2: THE CONCEPT (Framework over Memorization)
   ========================================================================== */
function ConceptScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Mental Models"
          title="Repeatable Evaluation"
          lede="The goal is to leave you with a quantitative framework you can apply to any demerger filing in any sector."
        />
        <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-md">
          A disciplined investor does not guess. They run every scheme through a structured 10-point filter to grade asset quality, treasury splits, and liquidity adjustments.
        </p>
      </div>

      {/* Checklist Preview Box */}
      <div className="rounded-xl border border-accent-gold/20 bg-accent-gold/[0.01] p-6 max-w-sm">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-accent-gold font-bold mb-3">
          <ClipboardList size={12} />
          <span>Repeatable Filter</span>
        </div>
        <h3 className="text-sm font-black text-white uppercase">The 10-Point Scorecard</h3>
        <p className="text-xs text-white/60 mt-2 leading-relaxed">
          By isolating the asset, multiple, balance sheet, forced-selling, and liquidity indicators, we determine whether a demerger will yield structural alpha or trap capital.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 3: PART 1 - ASSET & MULTIPLE CHECKS (Q1-4)
   ========================================================================== */
function Part1Scene({ active, controller }: { active: boolean; controller: any }) {
  const checks = [
    { num: "Q1", q: "Is there a hidden business?", a: "Look for operating divisions outgrowing the legacy parent, masked by consolidated financials." },
    { num: "Q2", q: "Does it deserve a different multiple?", a: "Check SOTP peer multiples. Specialist pure-plays routinely fetch valuation premiums." },
    { num: "Q3", q: "Will management become focused?", a: "Verify dedicated boards and standalone executive incentives (ESOP splits)." },
    { num: "Q4", q: "Can capital allocation improve?", a: "Confirm separate treasuries. Standalone units must fund themselves directly." },
  ];

  return (
    <div>
      <SceneHeader
        kicker="Checklist Phase 1"
        title="Asset &amp; Multiple Filters"
        lede="Verify the qualitative drivers of separation before reviewing the balance sheet."
      />

      <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-4 max-w-4xl">
        {checks.map((c, i) => (
          <motion.div
            key={c.num}
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative rounded-xl border border-white/5 bg-space-panel p-4 hover:border-accent-gold/20 transition-all duration-300"
          >
            <span className="font-mono text-[8px] text-accent-gold font-bold block mb-1">{c.num} / CORE ANALYSIS</span>
            <h4 className="font-black text-xs uppercase tracking-tight text-white leading-snug">
              {c.q}
            </h4>
            <p className="mt-2 text-[10px] text-white/50 leading-relaxed">
              {c.a}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 4: PART 2 - BALANCE SHEET CHECKS (Q5-8)
   ========================================================================== */
function Part2Scene({ active, controller }: { active: boolean; controller: any }) {
  const checks = [
    { num: "Q5", q: "Is the balance sheet strong?", a: "Look for debt-dumping. The spun-off unit must have sufficient asset coverage to support its leverage." },
    { num: "Q6", q: "Is there forced selling risk?", a: "Analyze parent index weights. Index-fund mandates trigger automatic selling post-listing." },
    { num: "Q7", q: "Will institutional base change?", a: "Watch shareholder rotation. Income funds will exit high-growth non-dividend spin-cos." },
    { num: "Q8", q: "Who is the natural shareholder?", a: "Determine if the spin-co matches growth or value investor preferences." },
  ];

  return (
    <div>
      <SceneHeader
        kicker="Checklist Phase 2"
        title="Balance Sheet &amp; Market Mechanics"
        lede="Track capital structures and technical institutional flow indicators."
      />

      <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-4 max-w-4xl">
        {checks.map((c, i) => (
          <motion.div
            key={c.num}
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative rounded-xl border border-white/5 bg-space-panel p-4 hover:border-accent-gold/20 transition-all duration-300"
          >
            <span className="font-mono text-[8px] text-accent-gold font-bold block mb-1">{c.num} / TREASURY &amp; FLOWS</span>
            <h4 className="font-black text-xs uppercase tracking-tight text-white leading-snug">
              {c.q}
            </h4>
            <p className="mt-2 text-[10px] text-white/50 leading-relaxed">
              {c.a}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 5: PART 3 - LIQUIDITY & RISK CHECKS (Q9-10)
   ========================================================================== */
function Part3Scene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Checklist Phase 3"
          title="Liquidity &amp; Risk Checkpoints"
          lede="The final filters isolate systemic risks and trading parameters."
        />
      </div>

      <div className="grid gap-4">
        {/* Q9 Card */}
        <div className="border border-white/5 bg-space-panel rounded-lg p-4">
          <span className="font-mono text-[9px] uppercase tracking-wider text-accent-gold font-bold block mb-1">Q9 / Will liquidity be sufficient?</span>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Verify post-listing free float. Small spun-off shares risk low daily volumes, causing high bid-ask spreads for institutional buyers.
          </p>
        </div>

        {/* Q10 Card */}
        <div className="border border-red-500/10 bg-red-500/[0.01] rounded-lg p-4">
          <span className="font-mono text-[9px] uppercase tracking-wider text-red-400 font-bold block mb-1">Q10 / What are the biggest risks?</span>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Analyze promoter governance history, cross-holding simplifications, and potential execution lags during the NCLT timeline.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 6: WORKSHEET SCORECARD
   ========================================================================== */
function WorksheetScene({ active, controller }: { active: boolean; controller: any }) {
  const [checkedList, setCheckedList] = useState<boolean[]>([false, false, false, false, false]);

  const toggleCheck = (idx: number) => {
    const next = [...checkedList];
    next[idx] = !next[idx];
    setCheckedList(next);
  };

  const checklistItems = [
    "Spin-co revenue growth exceeds consolidated parent growth.",
    "Parent Net Debt is allocated proportionally based on asset NAV split.",
    "Promoter shareholding is kept clean of pledge or complex shells.",
    "Spin-co is excluded from major indices, indicating forced selling.",
    "Management receives stock options directly tied to stand-alone ROCE.",
  ];

  const score = checkedList.filter(Boolean).length;

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Valuation Scorecard"
          title="Repeatable Scoring Worksheet"
          lede="Run upcoming Indian demergers through this rapid scorecard to check if the structural setup favors alpha."
        />

        {/* Score display */}
        <div className="mt-8">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">Restructuring Strength Score</span>
          <div className="mt-1 font-mono text-3xl font-black text-accent-gold">
            {score} / 5
          </div>
          <span className="font-mono text-[8px] text-white/30">
            {score >= 4 ? "Excellent (High Conviction Split)" : score >= 2 ? "Moderate Restructuring" : "High Structural Risk"}
          </span>
        </div>
      </div>

      {/* Interactive check boxes */}
      <div className="space-y-2 max-w-sm">
        {checklistItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => toggleCheck(idx)}
            className={cn(
              "flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors text-[10px] font-mono uppercase tracking-wider",
              checkedList[idx]
                ? "border-accent-gold/40 bg-accent-gold/[0.02] text-white"
                : "border-white/5 hover:border-white/10 text-white/40"
            )}
          >
            <div
              className={cn(
                "h-4 w-4 rounded border flex items-center justify-center",
                checkedList[idx] ? "border-accent-gold bg-accent-gold text-black" : "border-white/20"
              )}
            >
              {checkedList[idx] && <span className="font-bold text-[8px]">✓</span>}
            </div>
            <span className="leading-tight select-none">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 7: ENDING CARD (Transition link to Chapter 9)
   ========================================================================== */
function EndingScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <Kicker className="flex justify-center">The Framework Conclusion</Kicker>

      <div className="mt-8 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-balance text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl"
        >
          Checklist Built.
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-balance text-3xl font-black uppercase leading-none tracking-tight text-gradient-gold sm:text-5xl"
        >
          Valuation Locked.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 0.6 } : {}}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mx-auto max-w-lg text-xs leading-relaxed text-white/60 pt-4"
        >
          With our 10-point scorecard established, we move to the next chapter to examine the specific structural nuances that almost everyone misses.
        </motion.p>
      </div>

      {/* Chapter 9 Navigation Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 3.8 }}
        className="mt-12"
      >
        <Link
          href="/chapters/what-most-people-miss"
          className="interactive-control bg-accent-gold hover:bg-accent-gold/90 text-black flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide shadow-2xl"
        >
          <span>Continue to Chapter 9</span>
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
