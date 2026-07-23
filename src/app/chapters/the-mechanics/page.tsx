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
  Calendar,
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

export default function MechanicsChapter() {
  const scenes: DeckScene[] = [
    {
      id: "hero",
      name: "The Document",
      render: (active) => <HeroScene active={active} controller={controller} />,
    },
    {
      id: "purpose",
      name: "Why Read It?",
      render: (active) => <PurposeScene active={active} controller={controller} />,
    },
    {
      id: "assets-liabilities",
      name: "Assets & Liabilities",
      render: (active) => <AssetsLiabilitiesScene active={active} controller={controller} />,
    },
    {
      id: "cash-debt",
      name: "Cash & Debt",
      render: (active) => <CashDebtScene active={active} controller={controller} />,
    },
    {
      id: "ratio",
      name: "Share Ratio",
      render: (active) => <ShareRatioScene active={active} controller={controller} />,
    },
    {
      id: "employees",
      name: "Employees",
      render: (active) => <EmployeesScene active={active} controller={controller} />,
    },
    {
      id: "dates",
      name: "Key Dates",
      render: (active) => <DatesScene active={active} controller={controller} />,
    },
    {
      id: "tax",
      name: "Tax Implications",
      render: (active) => <TaxScene active={active} controller={controller} />,
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
   SCENE 1: HERO / THE DOCUMENT
   ========================================================================== */
function HeroScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const textOpacity = useTransform(progress, [0, seg * 0.8], [1, 0.25]);

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-20 select-none">
        <motion.div
          animate={active ? { y: [-15, 15, -15] } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-96 w-96 rounded-full border border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px]"
        />
      </div>

      <motion.div style={{ opacity: textOpacity }} className="relative z-10 select-none max-w-3xl">
        <div className="mb-6 flex justify-center">
          <Kicker>Chapter 03 / Reading the Scheme</Kicker>
        </div>

        <h1 className="text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          Reading a Scheme
          <br />
          <span className="text-gradient-gold">of Arrangement</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-xs uppercase tracking-widest text-white/50 leading-relaxed">
          The ultimate guide to decoding demerger prospectuses and identifying structural red flags.
        </p>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   SCENE 2: WHY READ IT / THE PURPOSE
   ========================================================================== */
function PurposeScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Prospectus Analysis"
          title="The Most Important Document"
          lede="A Scheme of Arrangement is the legal contract between the parent, the spin-co, and the courts. It is the least understood but most critical part of demerger analysis."
        />
        <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-md">
          Understanding the document tells you exactly how the business is being split, who gets what assets, and if promoters are tipping the valuation scales.
        </p>
      </div>

      {/* Red Flags Panel */}
      <div className="rounded-xl border border-red-500/10 bg-red-500/[0.01] p-6 max-w-sm">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-red-400 font-bold">
          <AlertTriangle size={12} />
          <span>Core Objective</span>
        </div>
        <h3 className="text-sm font-black mt-2 text-white uppercase">Spotting Red Flags</h3>
        <p className="text-xs text-white/60 mt-2 leading-relaxed">
          The point of analyzing the scheme is to discover if the demerger is a genuine value unlock, or just financial engineering. We inspect the **valuation methodologies** used for the share-exchange ratio and seek signs of asset-dumping.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 3: ASSETS & LIABILITIES
   ========================================================================== */
function AssetsLiabilitiesScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Balance Sheet Split"
          title="Assets &amp; Liabilities"
          lede="The scheme defines the exact boundary line of the transaction. You must verify that the spun-off unit is receiving the operating assets required to support its growth."
        />
      </div>

      {/* Asset Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border border-white/5 bg-space-panel rounded-lg p-4">
          <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-bold block mb-1">Transferred Assets</span>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Must specify physical factories, land bank deeds, intellectual properties (IP/patents), and brand trademarks belonging specifically to the demerged undertaking.
          </p>
        </div>

        <div className="border border-white/5 bg-space-panel rounded-lg p-4">
          <span className="font-mono text-[9px] uppercase tracking-wider text-red-400 font-bold block mb-1">Assigned Liabilities</span>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Includes direct trade payables, operational provisions, litigation liabilities, and tax claims tied directly to the demerged division.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 4: CASH & DEBT ALLOCATION (Interactive balance sheet split)
   ========================================================================== */
function CashDebtScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const [splitProgress, setSplitProgress] = useState(0);

  const scrollTransform = useTransform(progress, [seg * 3, seg * 4], [0, 100]);

  useEffect(() => {
    if (presentationActive) return;
    const unsubscribe = scrollTransform.on("change", (v) => {
      setSplitProgress(v);
    });
    return () => unsubscribe();
  }, [scrollTransform, presentationActive]);

  useGSAP(() => {
    if (!presentationActive || !active) {
      if (presentationActive) setSplitProgress(0);
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
          setSplitProgress(this.targets()[0].val);
        },
      }
    );
  }, [presentationActive, active]);

  const f = splitProgress / 100;

  // Debt/Cash allocation split coordinates
  const offsetSide = f * 60; // pushes cards left/right

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Treasury Allocation"
          title="Debt &amp; Cash Balances"
          lede="The single most common red flag in Indian demergers is unequal debt allocation. A promoter may keep the cash at the parent while loading the spin-co with leverage."
        />
        
        {/* Dynamic warning text */}
        {f > 0.5 && (
          <div className="mt-6 flex gap-2 items-start text-xs border border-red-500/10 bg-red-500/[0.01] rounded-lg p-3 max-w-md">
            <AlertTriangle className="text-red-400 flex-shrink-0 mt-0.5" size={14} />
            <p className="text-white/60">
              <strong>Leverage Warning:</strong> Always look for corporate guarantees. If the parent remains a guarantor for the spin-co&apos;s debt, the separation is not truly clean.
            </p>
          </div>
        )}
      </div>

      {/* Interactive balance sheet cards */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[340px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center gap-4 px-4 w-full">
          {/* Parent Post-Split Card */}
          <div
            className="flex-1 border border-white/10 rounded-lg p-4 bg-space-dark/95 transition-transform duration-100 ease-out"
            style={{ transform: `translateX(-${offsetSide}px)` }}
          >
            <span className="font-mono text-[8px] uppercase tracking-wider text-white/40">Parent Co Residual</span>
            <h4 className="text-xs font-black text-white mt-1 uppercase">Debt / Cash Ratio</h4>
            <div className="mt-4 space-y-2 font-mono text-[9px]">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/50">Allocated Debt</span>
                <span className="text-white font-bold">$20M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Allocated Cash</span>
                <span className="text-accent-gold font-bold">$80M</span>
              </div>
            </div>
            <span className="font-mono text-[7px] text-emerald-400 block mt-2 font-bold uppercase tracking-wider">Net Debt: Negative (Cash Rich)</span>
          </div>

          {/* Spin-Co Card */}
          <div
            className="flex-1 border border-red-500/25 rounded-lg p-4 bg-space-dark/95 transition-transform duration-100 ease-out"
            style={{ transform: `translateX(${offsetSide}px)` }}
          >
            <span className="font-mono text-[8px] uppercase tracking-wider text-red-400">Spin-Co Allocation</span>
            <h4 className="text-xs font-black text-white mt-1 uppercase">Debt / Cash Ratio</h4>
            <div className="mt-4 space-y-2 font-mono text-[9px]">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/50">Allocated Debt</span>
                <span className="text-red-400 font-bold">$120M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Allocated Cash</span>
                <span className="text-white font-bold">$10M</span>
              </div>
            </div>
            <span className="font-mono text-[7px] text-red-400 block mt-2 font-bold uppercase tracking-wider">Net Debt: $110M (Leveraged)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 5: SHARE ENTITLEMENT RATIO
   ========================================================================== */
function ShareRatioScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Equity Allotment"
          title="Share Entitlement Ratio"
          lede="The demerger ratio determines how many shares of the new company you receive relative to your parent holding. It is typically expressed as a simple fraction."
        />
        <p className="mt-4 text-xs text-white/50 leading-relaxed max-w-md">
          A ratio of <strong>1:5</strong> means for every 5 shares held in Parent Co, you receive 1 share in the newly listed Spin-Co. Promoters rely on valuation advisories (using DCF or market multiples) to justify this swap ratio.
        </p>
      </div>

      {/* Share Swap Diagram */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[340px] overflow-hidden">
        <div className="w-full max-w-xs text-center space-y-6 font-mono text-[10px] uppercase tracking-wider">
          <div className="flex justify-center items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <circle key={i} cx="0" cy="0" r="10" className="stroke-white/30 fill-white/5 border text-[7px] flex items-center justify-center h-7 w-7 rounded-full font-bold">
                P
              </circle>
            ))}
          </div>
          <span className="text-white/40 block">For every 5 Parent Shares held</span>
          <div className="flex justify-center my-2">
            <ChevronRight className="text-accent-gold rotate-90" size={16} />
          </div>
          <div className="flex justify-center items-center">
            <circle cx="0" cy="0" r="14" className="stroke-accent-gold/40 fill-accent-gold/10 border text-[9px] flex items-center justify-center h-10 w-10 rounded-full font-bold text-accent-gold">
              S
            </circle>
          </div>
          <span className="text-accent-gold font-bold block">Receive 1 Spun-Off Share</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 6: EMPLOYEES
   ========================================================================== */
function EmployeesScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Human Capital Continuity"
          title="Employee Transfer Rules"
          lede="The Scheme of Arrangement must explicitly protect human capital. Employees cannot be terminated or have their contract terms degraded during the transition."
        />
      </div>

      {/* Employee protection items */}
      <div className="space-y-4 max-w-sm">
        <div className="flex gap-3 border border-white/5 bg-space-panel rounded-lg p-3">
          <CheckCircle className="text-emerald-400 flex-shrink-0" size={16} />
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">Continuity of Service</h4>
            <p className="text-[10px] text-white/50 mt-1 leading-relaxed">
              Employment is treated as continuous, preserving historical tenure for gratuity and severance calculations.
            </p>
          </div>
        </div>

        <div className="flex gap-3 border border-white/5 bg-space-panel rounded-lg p-3">
          <CheckCircle className="text-emerald-400 flex-shrink-0" size={16} />
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">Retirement Fund Vesting</h4>
            <p className="text-[10px] text-white/50 mt-1 leading-relaxed">
              Provident Fund (PF) and Gratuity trust balances must be transferred to corresponding trusts in the resulting company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 7: APPOINTED DATE VS EFFECTIVE DATE (Timeline comparison)
   ========================================================================== */
function DatesScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const [dateProgress, setDateProgress] = useState(0);

  const scrollTransform = useTransform(progress, [seg * 6, seg * 7], [0, 100]);

  useEffect(() => {
    if (presentationActive) return;
    const unsubscribe = scrollTransform.on("change", (v) => {
      setDateProgress(v);
    });
    return () => unsubscribe();
  }, [scrollTransform, presentationActive]);

  useGSAP(() => {
    if (!presentationActive || !active) {
      if (presentationActive) setDateProgress(0);
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
          setDateProgress(this.targets()[0].val);
        },
      }
    );
  }, [presentationActive, active]);

  const f = dateProgress / 100;

  // Timeline indicator drawing
  const pathReveal = f * 120; // draws connector line

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Temporal Mechanics"
          title="Appointed Date vs. Effective Date"
          lede="This is a primary point of confusion for investors. The Scheme operates on two completely different dates."
        />
        <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-md">
          <strong>The Appointed Date</strong> is the retroactive date from which the accounts are split.
          <br />
          <strong>The Effective Date</strong> is the legal trigger date when the filing with the Registrar of Companies (ROC) completes.
        </p>
      </div>

      {/* Date Timeline Graphic */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[340px] overflow-hidden">
        <svg viewBox="0 0 200 180" className="h-[280px] w-full fill-none overflow-visible">
          {/* Main timeline axis */}
          <line x1="30" y1="90" x2="170" y2="90" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

          {/* Appointed Date (Retroactive) */}
          <g transform="translate(45, 90)">
            <circle cx="0" cy="0" r="5" fill="var(--color-accent-gold)" />
            <text x="0" y="-14" textAnchor="middle" className="fill-accent-gold font-mono text-[7px] uppercase tracking-wider font-bold">Appointed Date</text>
            <text x="0" y="16" textAnchor="middle" className="fill-white/40 font-mono text-[6px]">Retroactive Accounting</text>
          </g>

          {/* Effective Date (Current/Future) */}
          <g transform="translate(155, 90)">
            <circle cx="0" cy="0" r="5" fill="#fff" className={cn(f > 0.7 ? "animate-pulse" : "")} />
            <text x="0" y="-14" textAnchor="middle" className="fill-white font-mono text-[7px] uppercase tracking-wider font-bold">Effective Date</text>
            <text x="0" y="16" textAnchor="middle" className="fill-white/40 font-mono text-[6px]">ROC File / Legal Split</text>
          </g>

          {/* Connective animation line */}
          {f > 0.1 && (
            <path
              d={`M 45 90 H ${45 + pathReveal}`}
              stroke="var(--color-accent-gold)"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          )}

          <text x="100" y="120" textAnchor="middle" className="fill-white/20 font-mono text-[6px] uppercase tracking-widest">
            Retroactive Gap Window (typically 6-12M)
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 8: TAX IMPLICATIONS (Acquisition cost split)
   ========================================================================== */
function TaxScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Taxation Rules"
          title="Tax Implications &amp; Acquisition Cost"
          lede="While a compliant demerger is tax-free on day one, you must calculate the split in your Cost of Acquisition (COA) for future capital gains."
        />
        <p className="mt-4 text-xs text-white/50 leading-relaxed max-w-md">
          The parent company declares a ratio (based on the net asset value split) to divide your original purchase cost. For example, the cost of acquisition may be allocated <strong>75%</strong> to the Parent and <strong>25%</strong> to the Spin-Co.
        </p>
      </div>

      {/* Cost Split Graphic */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[340px] overflow-hidden">
        <div className="w-full max-w-xs space-y-4 font-mono text-[9px] uppercase tracking-wider">
          <div className="border border-white/10 rounded-lg p-3 bg-space-dark/85">
            <span className="text-white font-bold block mb-1">Original Cost of Acquisition</span>
            <div className="flex justify-between text-[11px] text-accent-gold font-bold mt-1">
              <span>Original Parent buy price</span>
              <span>$100 / Share</span>
            </div>
          </div>
          
          <div className="flex justify-center text-white/20">
            <ChevronRight className="rotate-90" size={12} />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 border border-white/5 bg-space-panel rounded-lg p-3">
              <span className="text-white/40 block mb-1 text-[7px]">Parent Cost Allocation</span>
              <span className="text-[12px] text-white font-bold">75%</span>
              <span className="text-white/60 block mt-1 text-[8px]">$75 / Share</span>
            </div>

            <div className="flex-1 border border-accent-gold/20 bg-accent-gold/[0.01] rounded-lg p-3">
              <span className="text-accent-gold block mb-1 text-[7px]">Spin-Co Cost Allocation</span>
              <span className="text-[12px] text-accent-gold font-bold">25%</span>
              <span className="text-white/60 block mt-1 text-[8px]">$25 / Share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 9: ENDING CARD (Transition link to Chapter 4: why boards split)
   ========================================================================== */
function EndingScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <Kicker className="flex justify-center">The Next Step</Kicker>

      <div className="mt-8 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-balance text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl"
        >
          From Legal Plumbing
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-balance text-3xl font-black uppercase leading-none tracking-tight text-gradient-gold sm:text-5xl"
        >
          To Board Decisions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 0.6 } : {}}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mx-auto max-w-lg text-xs leading-relaxed text-white/60 pt-4"
        >
          Now that you know how to dissect the scheme, identify red-flags, and calculate dates, we look at the strategic catalyst that forces boards to trigger the demerger in the first place.
        </motion.p>
      </div>

      {/* Chapter 4 Navigation Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 3.8 }}
        className="mt-12"
      >
        <Link
          href="/chapters/the-catalyst"
          className="interactive-control bg-accent-gold hover:bg-accent-gold/90 text-black flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide shadow-2xl"
        >
          <span>Continue to Chapter 4</span>
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
