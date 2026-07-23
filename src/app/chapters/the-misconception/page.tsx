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
  Building2,
  Percent,
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

export default function MisconceptionChapter() {
  const scenes: DeckScene[] = [
    {
      id: "hero",
      name: "The Reframe",
      render: (active) => <HeroScene active={active} controller={controller} />,
    },
    {
      id: "financials",
      name: "Core Metrics",
      render: (active) => <FinancialsScene active={active} controller={controller} />,
    },
    {
      id: "capital-debt",
      name: "Capital & Debt",
      render: (active) => <CapitalDebtScene active={active} controller={controller} />,
    },
    {
      id: "governance",
      name: "Ownership & Mgmt",
      render: (active) => <GovernanceScene active={active} controller={controller} />,
    },
    {
      id: "peers",
      name: "Peer Valuation",
      render: (active) => <PeersScene active={active} controller={controller} />,
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
          animate={active ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute h-[420px] w-[420px] rounded-full border border-white/[0.03]"
        />
      </div>

      <motion.div style={{ opacity: textOpacity }} className="relative z-10 select-none max-w-3xl">
        <div className="mb-6 flex justify-center">
          <Kicker>Chapter 05 / The Structural Shift</Kicker>
        </div>

        <h1 className="text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          What Changes
          <br />
          <span className="text-gradient-gold">After the Split?</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-xs uppercase tracking-widest text-white/50 leading-relaxed">
          The share price is only one part of the story. True alpha lies in tracking the fundamental realignment of operational assets.
        </p>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   SCENE 2: CORE FINANCIALS (Revenue, EBITDA, ROCE)
   ========================================================================== */
function FinancialsScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const [comparePos, setComparePos] = useState(0);

  const scrollTransform = useTransform(progress, [seg, seg * 2], [0, 100]);

  useEffect(() => {
    if (presentationActive) return;
    const unsubscribe = scrollTransform.on("change", (v) => {
      setComparePos(v);
    });
    return () => unsubscribe();
  }, [scrollTransform, presentationActive]);

  useGSAP(() => {
    if (!presentationActive || !active) {
      if (presentationActive) setComparePos(0);
      return;
    }
    gsap.fromTo(
      { val: 0 },
      { val: 100 },
      {
        val: 100,
        duration: 3,
        ease: "power2.out",
        onUpdate: function () {
          setComparePos(this.targets()[0].val);
        },
      }
    );
  }, [presentationActive, active]);

  const f = comparePos / 100;

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Performance Rerating"
          title="Revenue, EBITDA &amp; ROCE"
          lede="Once the demerger is final, consolidated financials decouple. Operating metrics reflect standalone focus without conglomerate subsidization."
        />
      </div>

      {/* Comparison Grid */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[340px] overflow-hidden">
        <div className="w-full max-w-xs space-y-4 font-mono text-[9px] uppercase tracking-wider">
          <span className="text-white/40 block border-b border-white/5 pb-1">Comparison metrics</span>
          
          {/* Revenue */}
          <div className="border border-white/5 rounded-lg p-3 bg-space-dark/80">
            <span className="text-white font-bold block mb-1">Revenue Performance</span>
            <div className="flex justify-between text-[11px] mt-1">
              <span className="text-white/40">Consolidated</span>
              <span className="text-white/70">$1.2B</span>
            </div>
            <div className="flex justify-between text-[11px] mt-0.5">
              <span className="text-accent-gold font-bold">Spin-co Pure-play</span>
              <span className="text-accent-gold font-bold">
                $<AnimatedCounter value={450} active={comparePos > 50} />M (+24% YoY)
              </span>
            </div>
          </div>

          {/* EBITDA & ROCE */}
          <div className="flex gap-4">
            <div className="flex-1 border border-white/5 bg-space-panel rounded-lg p-3">
              <span className="text-white/40 block mb-1 text-[7px]">EBITDA margin</span>
              <span className="text-[12px] text-white font-bold">
                <AnimatedCounter value={18} active={comparePos > 60} />%
              </span>
              <span className="text-emerald-400 block mt-1 text-[8px]">+450bps expansion</span>
            </div>

            <div className="flex-1 border border-accent-gold/20 bg-accent-gold/[0.01] rounded-lg p-3">
              <span className="text-accent-gold block mb-1 text-[7px]">Standalone ROCE</span>
              <span className="text-[12px] text-accent-gold font-bold">
                <AnimatedCounter value={22} active={comparePos > 70} />%
              </span>
              <span className="text-accent-gold/60 block mt-1 text-[8px]">vs 8% pre-split</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 3: CAPITAL & DEBT
   ========================================================================== */
function CapitalDebtScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Balance Sheet Deleveraging"
          title="Capital Allocation &amp; Debt Levels"
          lede="Post-split treasury operations undergo radical changes. Debt is allocated according to asset-backing, and capital expenditure matches division requirements."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border border-white/5 bg-space-panel rounded-lg p-4">
          <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-bold block mb-1">CAPEX Freedom</span>
          <p className="text-[11px] text-white/50 leading-relaxed">
            The specialty business is no longer starved of cash flow to support legacy projects; CAPEX is funded directly from dedicated equity/debt pools.
          </p>
        </div>

        <div className="border border-white/5 bg-space-panel rounded-lg p-4">
          <span className="font-mono text-[9px] uppercase tracking-wider text-accent-gold font-bold block mb-1">Custom Leverage Ratio</span>
          <p className="text-[11px] text-white/50 leading-relaxed">
            A debt-free spun-off unit can negotiate credit terms with lenders on the strength of its own standalone ROCE, avoiding high group premium costs.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 4: GOVERNANCE & OWNERSHIP (Promoters & Institutions)
   ========================================================================== */
function GovernanceScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Governance Realignment"
          title="Promoters &amp; Institutional Shareholding"
          lede="The shareholder base transforms. Passive tracker selling creates opportunities, while management incentives are aligned directly to standalone performance."
        />
        <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-md">
          Promoter incentives shift as cross-holdings are untangled, and dedicated executive leadership focuses exclusively on the standalone business.
        </p>
      </div>

      {/* Governance Grid */}
      <div className="space-y-4 max-w-sm">
        <div className="flex gap-3 border border-white/5 bg-space-panel rounded-lg p-3">
          <CheckCircle className="text-emerald-400 flex-shrink-0" size={16} />
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">Uncluttered Promoter Structure</h4>
            <p className="text-[10px] text-white/50 mt-1 leading-relaxed">
              Simplifies cross-holdings, giving promoters direct aligned skin-in-the-game without complex group shell structures.
            </p>
          </div>
        </div>

        <div className="flex gap-3 border border-white/5 bg-space-panel rounded-lg p-3">
          <CheckCircle className="text-emerald-400 flex-shrink-0" size={16} />
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">Management ESOP Alignment</h4>
            <p className="text-[10px] text-white/50 mt-1 leading-relaxed">
              Standalone executives receive stock options directly matching the value they create in their specific operating company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 5: PEER VALUATION (Relative multiples rerating)
   ========================================================================== */
function PeersScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const [peersPos, setPeersPos] = useState(0);

  const scrollTransform = useTransform(progress, [seg * 4, seg * 5], [0, 100]);

  useEffect(() => {
    if (presentationActive) return;
    const unsubscribe = scrollTransform.on("change", (v) => {
      setPeersPos(v);
    });
    return () => unsubscribe();
  }, [scrollTransform, presentationActive]);

  useGSAP(() => {
    if (!presentationActive || !active) {
      if (presentationActive) setPeersPos(0);
      return;
    }
    gsap.fromTo(
      { val: 0 },
      { val: 100 },
      {
        val: 100,
        duration: 3,
        ease: "power2.out",
        onUpdate: function () {
          setPeersPos(this.targets()[0].val);
        },
      }
    );
  }, [presentationActive, active]);

  const f = peersPos / 100;

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Peer Valuation Arbitrage"
          title="Peers Valuation Rerating"
          lede="Instead of comparing the business against generic conglomerates, analysts can benchmark the spin-co directly against pure-play sector peers."
        />
        <p className="mt-4 text-xs text-white/50 leading-relaxed max-w-md">
          This transparency triggers a multiple expansion, bringing the company in line with industry valuations as the conglomerate discount is eliminated.
        </p>
      </div>

      {/* Peers Multiples Card */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[340px] overflow-hidden">
        <div className="w-full max-w-xs space-y-4 font-mono text-[9px] uppercase tracking-wider">
          <span className="text-white/40 block border-b border-white/5 pb-1">Industry Valuation Multiples</span>
          
          <div className="border border-white/5 rounded-lg p-3 bg-space-dark/80">
            <span className="text-white/50 block mb-1">Direct Industry Peer Avg</span>
            <div className="flex justify-between text-[12px] font-bold text-white mt-1">
              <span>Pure-Play Multiples</span>
              <span>28x EV/EBITDA</span>
            </div>
          </div>

          <div className="flex justify-center text-white/20">
            <ChevronRight className="rotate-90" size={12} />
          </div>

          <div className="border border-accent-gold/30 rounded-lg p-3 bg-accent-gold/[0.01]">
            <span className="text-accent-gold block mb-1">Spin-Co Valuation Target</span>
            <div className="flex justify-between text-[12px] font-bold text-accent-gold mt-1">
              <span>Closing the gap</span>
              <span>
                <AnimatedCounter value={26} active={peersPos > 60} />x EV/EBITDA
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 6: ENDING CARD (Transition link to Chapter 6: alpha engine)
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
          Analyzing the
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-balance text-3xl font-black uppercase leading-none tracking-tight text-gradient-gold sm:text-5xl"
        >
          Alpha Engine
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 0.6 } : {}}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mx-auto max-w-lg text-xs leading-relaxed text-white/60 pt-4"
        >
          Now that we understand what metrics to benchmark before and after the split, we examine the quantitative market anomalies that consistently generate excess returns.
        </motion.p>
      </div>

      {/* Chapter 6 Navigation Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 3.8 }}
        className="mt-12"
      >
        <Link
          href="/chapters/the-alpha-engine"
          className="interactive-control bg-accent-gold hover:bg-accent-gold/90 text-black flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide shadow-2xl"
        >
          <span>Continue to Chapter 6</span>
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
