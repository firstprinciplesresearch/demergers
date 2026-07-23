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
  XCircle,
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

export default function OpportunityChapter() {
  const scenes: DeckScene[] = [
    {
      id: "hero",
      name: "Common Mistakes",
      render: (active) => <HeroScene active={active} controller={controller} />,
    },
    {
      id: "concept",
      name: "Core Pitfalls",
      render: (active) => <ConceptScene active={active} controller={controller} />,
    },
    {
      id: "mistakes-1",
      name: "Structural Mistakes",
      render: (active) => <Mistakes1Scene active={active} controller={controller} />,
    },
    {
      id: "mistakes-2",
      name: "Technical Mistakes",
      render: (active) => <Mistakes2Scene active={active} controller={controller} />,
    },
    {
      id: "takeaway",
      name: "Final Takeaway",
      render: (active) => <TakeawayScene active={active} controller={controller} />,
    },
  ];

  const controller = usePresentation(scenes.length);

  return <Deck controller={controller} scenes={scenes} />;
}

/* ==========================================================================
   SCENE 1: HERO / MISTAKES INTRO
   ========================================================================== */
function HeroScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const textOpacity = useTransform(progress, [0, seg * 0.8], [1, 0.25]);

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-20 select-none">
        <motion.div
          animate={active ? { scale: [1, 1.06, 1] } : {}}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute h-96 w-96 rounded-full border border-red-500/5"
        />
      </div>

      <motion.div style={{ opacity: textOpacity }} className="relative z-10 select-none max-w-3xl">
        <div className="mb-6 flex justify-center">
          <Kicker>Chapter 10 / Final Session</Kicker>
        </div>

        <h1 className="text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          Mistakes Investors
          <br />
          <span className="text-gradient-gold">Commonly Make</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-xs uppercase tracking-widest text-white/50 leading-relaxed">
          Ending the masterclass by identifying the analytical errors that repeatedly trap investor capital.
        </p>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   SCENE 2: THE CONCEPT (Auditing Pitfalls)
   ========================================================================== */
function ConceptScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Capital Protection"
          title="Repeatable Pitfalls"
          lede="Corporate events generate opportunities, but they also trigger structural blind spots. Understanding mistakes protects your capital floor."
        />
        <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-md">
          Promoters frequently use demergers to separate liabilities, transfer debt, or dump slower-growth segments. Identifying these plays distinguishes real wealth creation from accounting smoke.
        </p>
      </div>

      {/* Warning Box */}
      <div className="rounded-xl border border-red-500/20 bg-red-500/[0.01] p-6 max-w-sm">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-red-400 font-bold mb-3">
          <XCircle size={12} />
          <span>Core Rule</span>
        </div>
        <h3 className="text-sm font-black text-white uppercase">The Red Flag Filters</h3>
        <p className="text-xs text-white/60 mt-2 leading-relaxed">
          Before buying any demerger or spinoff, we screen for leverage dumping, cross-holding puzzles, promoter pledge details, and non-aligned executive incentives.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 3: STRUCTURAL MISTAKES (Mistakes 1-4)
   ========================================================================== */
function Mistakes1Scene({ active, controller }: { active: boolean; controller: any }) {
  const mistakes = [
    { num: "01", label: "Assuming wealth creation", desc: "A demerger itself does not magically build value. If segment operations are poor, separation only exposes weak standalone units." },
    { num: "02", label: "Ignoring debt allocation", desc: "Always check where promoter leverage lands. Parents often dump legacy debt onto the spin-co before listing." },
    { num: "03", label: "Overlooking capital rules", desc: "Freed divisions can star in growth, but high CAPEX cycles will dilute margins without group cash backing." },
    { num: "04", label: "Buying immediately on day 1", desc: "Jumping in on listing day ignores initial index-fund index-exclusion mechanical dumping pressure." },
  ];

  return (
    <div>
      <SceneHeader
        kicker="Pitfall Classification"
        title="Structural Mistakes"
        lede="Audit these four structural errors before calculating sum-of-the-parts values."
      />

      <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-4 max-w-4xl">
        {mistakes.map((m, i) => (
          <motion.div
            key={m.num}
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative rounded-xl border border-white/5 bg-space-panel p-4 hover:border-red-500/20 transition-all duration-300"
          >
            <span className="font-mono text-[8px] text-red-400 font-bold block mb-1">MISTAKE {m.num}</span>
            <h4 className="font-black text-xs uppercase tracking-tight text-white leading-snug">
              {m.label}
            </h4>
            <p className="mt-2 text-[10px] text-white/50 leading-relaxed">
              {m.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 4: TECHNICAL MISTAKES (Mistakes 5-7)
   ========================================================================== */
function Mistakes2Scene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Filing Pitfalls"
          title="Technical Mistakes"
          lede="The remaining mistakes repeatedly observed relate to filing neglect and corporate governance."
        />
      </div>

      <div className="space-y-4 max-w-sm">
        {/* Mistake 5 */}
        <div className="flex gap-3 border border-white/5 bg-space-panel rounded-lg p-3">
          <XCircle className="text-red-400 flex-shrink-0" size={16} />
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">05 / Not Reading the Scheme document</h4>
            <p className="text-[10px] text-white/50 mt-1 leading-relaxed">
              Investors skip prospectuses, missing appointed accounting dates, employee continuation terms, and promoter guarantee limits.
            </p>
          </div>
        </div>

        {/* Mistake 6 */}
        <div className="flex gap-3 border border-white/5 bg-space-panel rounded-lg p-3">
          <XCircle className="text-red-400 flex-shrink-0" size={16} />
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">06 / Focusing only on price vs quality</h4>
            <p className="text-[10px] text-white/50 mt-1 leading-relaxed">
              Buying cheap demerged stubs because the price adjusted down, without verifying if the business possesses standalone margins.
            </p>
          </div>
        </div>

        {/* Mistake 7 */}
        <div className="flex gap-3 border border-white/5 bg-space-panel rounded-lg p-3">
          <XCircle className="text-red-400 flex-shrink-0" size={16} />
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-white font-bold">07 / Ignoring management incentives</h4>
            <p className="text-[10px] text-white/50 mt-1 leading-relaxed">
              Verify if standalone managers receive ESOPs or if promoters hold high cross-holding pledge metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 5: CINEMATIC FINALE (Final Takeaway with Tilt Effect)
   ========================================================================== */
function TakeawayScene({ active, controller }: { active: boolean; controller: any }) {
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
      className="relative flex min-h-[72vh] items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-space-panel p-8"
    >
      {/* Breathing gradient */}
      <div
        aria-hidden
        className="animate-breathe absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, rgba(255,184,0,0.16), rgba(255,107,0,0.06) 45%, transparent 72%)",
        }}
      />
      {/* Floating particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
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
        className="relative z-10 mx-auto max-w-3xl px-4 text-center select-none"
      >
        <Kicker className="flex justify-center">First Principles Research</Kicker>
        <h2 className="mt-5 text-balance text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl text-white">
          A demerger is not
          <br />
          <span className="text-gradient-gold">an investment thesis.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-xs uppercase tracking-widest text-white/50 leading-relaxed">
          It is simply a corporate event. The real opportunity lies in identifying whether the separation results in a stronger, more focused business that the market is yet to value correctly.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="interactive-control bg-accent-gold hover:bg-accent-gold/90 text-black flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide shadow-2xl"
          >
            <span>Return to overview</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
