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

export default function AlphaEngineChapter() {
  const scenes: DeckScene[] = [
    {
      id: "hero",
      name: "The Timing Game",
      render: (active) => <HeroScene active={active} controller={controller} />,
    },
    {
      id: "lesson",
      name: "The Piramal Lesson",
      render: (active) => <PiramalLessonScene active={active} controller={controller} />,
    },
    {
      id: "stages",
      name: "The 7 Stages",
      render: (active) => <SevenStagesScene active={active} controller={controller} />,
    },
    {
      id: "chart",
      name: "Trajectory Chart",
      render: (active) => <TrajectoryScene active={active} controller={controller} />,
    },
    {
      id: "examples",
      name: "Case Examples",
      render: (active) => <ExamplesScene active={active} controller={controller} />,
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
   SCENE 1: HERO / THE TIMING GAME
   ========================================================================== */
function HeroScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const textOpacity = useTransform(progress, [0, seg * 0.8], [1, 0.25]);

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-20 select-none">
        <motion.div
          animate={active ? { rotate: [-360, 0] } : {}}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute h-96 w-96 rounded-full border border-white/5 border-dashed"
        />
      </div>

      <motion.div style={{ opacity: textOpacity }} className="relative z-10 select-none max-w-3xl">
        <div className="mb-6 flex justify-center">
          <Kicker>Chapter 06 / The Timing Game</Kicker>
        </div>

        <h1 className="text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          Identifying the
          <br />
          <span className="text-gradient-gold">Opportunity</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-xs uppercase tracking-widest text-white/50 leading-relaxed">
          One question everyone asks is: When should I buy? The timing of entry dictates whether you capture alpha or absorb drawdowns.
        </p>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   SCENE 2: PIRAMAL LESSON (Cautionary Case Study)
   ========================================================================== */
function PiramalLessonScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Arbitrage Pitfalls"
          title="The Piramal Lesson"
          lede="One of the biggest misconceptions is that every demerger is automatically a great investment. Buying at the wrong stage can be a fatal mistake."
        />
        <p className="mt-4 text-xs text-white/50 leading-relaxed max-w-md">
          During the Piramal demerger, many investors bought the parent pre-record date hoping to capture the pharmaceutical upside. Post-listing, a wave of forced institutional selling hammered **Piramal Pharma**, sending the stock tumbling from **₹200 down to ₹60** before its true valuation base was discovered.
        </p>
      </div>

      {/* Warning Card Panel */}
      <div className="rounded-xl border border-red-500/20 bg-red-500/[0.01] p-6 max-w-sm relative">
        <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <AlertTriangle size={14} />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-red-400 font-bold">Case Warning</span>
        <h3 className="text-sm font-black mt-2 text-white uppercase">Piramal Pharma Crash</h3>
        <div className="mt-4 font-mono text-3xl font-black text-red-400">
          ₹200 <span className="text-white/30 text-xl font-normal">→</span> ₹60
        </div>
        <p className="text-[10px] text-white/40 mt-3 leading-relaxed">
          Mechanical index dumping and pre-demerger leverage transfers triggered a massive post-split capitulation. Investors who bought pre-split absorbed a **-70% drawdown** in the spin-co.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 3: THE 7 STAGES MATRIX
   ========================================================================== */
function SevenStagesScene({ active, controller }: { active: boolean; controller: any }) {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  const stages = [
    { name: "1. Pre-Announcement", detail: "Pure speculation. High risk, high potential reward as activist theories float." },
    { name: "2. Post-Announcement", detail: "Arbitrage window opens. Deal parameters are public, but timeline is long (12-15M)." },
    { name: "3. Pre-Record Date", detail: "Allocation run-up. Investors buy to qualify for the proportionate spun-off shares." },
    { name: "4. Post-Record Date", detail: "Temporal adjustment. Parent share price drops to account for the split division value." },
    { name: "5. Immediately Post-Listing", detail: "Initial listing volatility. Spun-off shares debut but lack research coverage." },
    { name: "6. Forced Selling", detail: "Index funds and size-restricted mandates dump the new spun-off shares, creating a valuation floor." },
    { name: "7. Price Discovery", detail: "The bottom clears. Standalone coverage initiates, and promoters begin executing strategy." },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Entry Horizons"
          title="The Seven Stages of buying"
          lede="Demergers evolve through seven distinct market windows. The risk/reward profile changes completely at each milestone."
        />
        
        {/* Stage details */}
        <div className="mt-6 min-h-[90px] max-w-md">
          {selectedStage !== null ? (
            <div className="rounded-lg border border-accent-gold/20 bg-accent-gold/[0.02] p-4">
              <span className="font-mono text-[8px] uppercase tracking-widest text-accent-gold font-bold">Stage Details</span>
              <h4 className="text-xs font-bold text-white mt-1 uppercase">{stages[selectedStage].name}</h4>
              <p className="text-[11px] text-white/60 mt-1 leading-relaxed">{stages[selectedStage].detail}</p>
            </div>
          ) : (
            <div className="text-[11px] text-white/30 italic border border-white/5 rounded-lg p-4">
              Click any stage on the right to inspect its transaction mechanics.
            </div>
          )}
        </div>
      </div>

      {/* Stages list */}
      <div className="space-y-2 max-w-sm">
        {stages.map((s, idx) => (
          <div
            key={s.name}
            onClick={() => setSelectedStage(idx)}
            className={cn(
              "rounded border p-2 cursor-pointer font-mono text-[10px] uppercase tracking-wider transition-colors",
              selectedStage === idx
                ? "border-accent-gold/30 bg-accent-gold/5 text-white"
                : "border-white/5 bg-space-dark text-white/40 hover:border-white/10"
            )}
          >
            {s.name}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 4: TRAJECTORY CHART (SVG curve mapping forced-selling bottoms)
   ========================================================================== */
function TrajectoryScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const [trajectoryPos, setTrajectoryPos] = useState(0);

  const scrollTransform = useTransform(progress, [seg * 3, seg * 4], [0, 100]);

  useEffect(() => {
    if (presentationActive) return;
    const unsubscribe = scrollTransform.on("change", (v) => {
      setTrajectoryPos(v);
    });
    return () => unsubscribe();
  }, [scrollTransform, presentationActive]);

  useGSAP(() => {
    if (!presentationActive || !active) {
      if (presentationActive) setTrajectoryPos(0);
      return;
    }
    gsap.fromTo(
      { val: 0 },
      { val: 100 },
      {
        val: 100,
        duration: 3.5,
        ease: "power2.out",
        onUpdate: function () {
          setTrajectoryPos(this.targets()[0].val);
        },
      }
    );
  }, [presentationActive, active]);

  const f = trajectoryPos / 100;

  // Render SVG curve coordinates
  const w = 320;
  const h = 180;
  const padX = 20;

  // Standard demerger price trajectory path
  // Announcement spike -> Drift -> Record Date -> Listing Selloff (bottom) -> Recovery
  const curvePath = `M 20 120 C 50 80, 80 110, 120 100 C 140 100, 160 145, 200 155 C 240 155, 280 80, 300 40`;
  const revealProgress = f * 320;

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Behavioral Trajectory"
          title="The Price Trajectory"
          lede="The classic demerger price path shows how mechanical selling pressure forces a bottom post-listing, creating a structural buy window."
        />
      </div>

      {/* SVG Price curve */}
      <div className="relative rounded-xl border border-white/5 bg-space-panel p-4 shadow-xl">
        <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-accent-gold">Typical Spin-Co Price Path</span>
          <span className="font-mono text-[7px] text-white/40">Illustrative Path</span>
        </div>

        <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full select-none overflow-visible fill-none">
          {/* Timeline segments */}
          <line x1="160" y1="20" x2="160" y2="160" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 2" />
          <text x="155" y="15" textAnchor="end" className="fill-white/30 font-mono text-[6px] uppercase">Record Date</text>

          <line x1="200" y1="20" x2="200" y2="160" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 2" />
          <text x="205" y="15" textAnchor="start" className="fill-red-400/50 font-mono text-[6px] uppercase font-bold">Forced Selling Bottom</text>

          {/* Curve drawing */}
          <path d={curvePath} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          {f > 0.05 && (
            <path
              d={curvePath}
              stroke="var(--color-accent-gold)"
              strokeWidth="2"
              strokeDasharray={`${revealProgress} 320`}
            />
          )}

          {/* Highlight buying zones */}
          {f > 0.6 && (
            <>
              <circle cx="200" cy="155" r="5" className="fill-accent-orange animate-ping" style={{ animationDuration: '2s' }} />
              <circle cx="200" cy="155" r="3.5" fill="var(--color-accent-orange)" />
              <text x="210" y="160" className="fill-accent-orange font-mono text-[7px] uppercase font-bold">Buy Window (Forced Selling Bottom)</text>
            </>
          )}
        </svg>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 5: HISTORICAL CASE COMPARISON
   ========================================================================== */
function ExamplesScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Case Studies"
          title="Opportunities Look Different"
          lede="Looking at past Indian splits demonstrates how listing windows vary depending on promoter incentives and regulatory environments."
        />
      </div>

      <div className="grid gap-4">
        {/* Piramal Case */}
        <div className="border border-white/5 bg-space-panel rounded-lg p-4">
          <span className="font-mono text-[9px] uppercase tracking-wider text-red-400 font-bold block mb-1">Piramal Pharma (Capitulation Entry)</span>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Immediate listing created a forced index-selling vacuum, driving the stock from ₹200 to ₹60. The actual buy window opened 30-60 days post-listing at the bottom of the forced-selling dump.
          </p>
        </div>

        {/* Jio Financial Case */}
        <div className="border border-white/5 bg-space-panel rounded-lg p-4">
          <span className="font-mono text-[9px] uppercase tracking-wider text-accent-gold font-bold block mb-1">Jio Financial Services (Index Cushion)</span>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Listed inside key stock indexes temporarily, allowing a phased window of institutional buying before index exclusion triggered brief consolidation, establishing a clean buying base.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 6: ENDING CARD (Transition link to Chapter 7: global comparison)
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
          Now that we understand the timing window and entry points, we cross borders to compare tax, legal, and structural differences in global demerger plays.
        </motion.p>
      </div>

      {/* Chapter 7 Navigation Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 3.8 }}
        className="mt-12"
      >
        <Link
          href="/chapters/case-studies"
          className="interactive-control bg-accent-gold hover:bg-accent-gold/90 text-black flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide shadow-2xl"
        >
          <span>Continue to Case Studies</span>
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
