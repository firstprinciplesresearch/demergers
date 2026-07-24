"use client";

import { useEffect, useRef, useState, useMemo } from "react";
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

export default function TheHookChapter() {
  const scenes: DeckScene[] = [
    {
      id: "opening",
      name: "The Core Question",
      render: (active) => <OpeningScene active={active} controller={controller} />,
    },
    {
      id: "value-unlocking",
      name: "Value Unlocking",
      render: (active) => <ValueUnlockingScene active={active} controller={controller} />,
    },
    {
      id: "change-control",
      name: "Change of Control",
      render: (active) => <ChangeControlScene active={active} controller={controller} />,
    },
    {
      id: "regulatory-recharacterisation",
      name: "Regulatory Recharacterisation",
      render: (active) => <RegulatoryRecharacterisationScene active={active} controller={controller} />,
    },
    {
      id: "global-parent",
      name: "Global Parent Restructuring",
      render: (active) => <GlobalParentRestructuringScene active={active} controller={controller} />,
    },
    {
      id: "family-settlement-new",
      name: "Family Settlement",
      render: (active) => <FamilySettlementNewScene active={active} controller={controller} />,
    },
    {
      id: "hidden",
      name: "Hidden Inside",
      render: (active) => <HiddenBusinessScene active={active} controller={controller} />,
    },
    {
      id: "loss",
      name: "Loss-Making",
      render: (active) => <LossMakingScene active={active} controller={controller} />,
    },
    {
      id: "focus",
      name: "Strategic Focus",
      render: (active) => <StrategicFocusScene active={active} controller={controller} />,
    },
    {
      id: "regulatory",
      name: "Regulatory Catalyst",
      render: (active) => <RegulatoryScene active={active} controller={controller} />,
    },
    {
      id: "family",
      name: "Family Settlement",
      render: (active) => <FamilySettlementScene active={active} controller={controller} />,
    },
    {
      id: "stock",
      name: "Underperformance",
      render: (active) => <UnderperformanceScene active={active} controller={controller} />,
    },
    {
      id: "ending",
      name: "The Trapped Value",
      render: (active) => <EndingScene active={active} controller={controller} />,
    },
  ];

  const controller = usePresentation(scenes.length);

  return <Deck controller={controller} scenes={scenes} />;
}

/* ==========================================================================
   SCENE 1: OPENING SCENE (Successful company question + building outline)
   ========================================================================== */
function OpeningScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, totalFrames } = controller;
  const seg = 1 / totalFrames;

  // Fade phrases in independently
  const phraseWords = "Why would companies demerger?".split(" ");

  const textOpacity = useTransform(progress, [0, seg * 0.8], [1, 0.25]);

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
      {/* Moving Spotlight building background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-40 select-none">
        <motion.div
          animate={active ? { x: [-100, 100, -100] } : {}}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute h-64 w-64 rounded-full bg-accent-gold/5 blur-3xl"
        />

        <svg viewBox="0 0 100 80" className="h-[260px] w-auto text-white/5 fill-none stroke-current stroke-[0.6]">
          {/* Skyline premium corporate buildings */}
          <path d="M10 80 L10 35 L28 35 L28 15 L48 15 L48 5 L55 5 L55 25 L72 25 L72 45 L90 45 L90 80 Z" />
          <line x1="28" y1="35" x2="90" y2="35" />
          <line x1="48" y1="15" x2="55" y2="15" />
          {/* Faint internal vertical grids */}
          <path d="M20 80 L20 35 M38 80 L38 15 M62 80 L62 25 M80 80 L80 45" strokeDasharray="2 4" />
        </svg>
      </div>

      <motion.div style={{ opacity: textOpacity }} className="relative z-10 select-none max-w-4xl">
        <div className="mb-6 flex justify-center">
          <Kicker>Chapter 01 / The Catalyst</Kicker>
        </div>

        <h1 className="text-balance text-4xl font-black uppercase leading-[1.1] tracking-tight sm:text-6xl md:text-7xl">
          {phraseWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={active ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              className={cn(
                "inline-block mr-3",
                word.toLowerCase().includes("demerger") ? "text-gradient-gold" : "text-white"
              )}
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   SCENE 2: VALUE UNLOCKING (Interactive drivers toggle and company reveal)
   ========================================================================== */
function ValueUnlockingScene({ active, controller }: { active: boolean; controller: any }) {
  const { presentationActive } = controller;
  const [showCompanies, setShowCompanies] = useState(false);

  const cards = [
    { letter: "a", text: "Hidden or fast-growing business inside a larger one" },
    { letter: "b", text: "Loss-making unit dragging consolidated numbers" },
    { letter: "c", text: "Strategic focus" },
    { letter: "d", text: "Different investor preference" },
  ];

  const companies = [
    "Aarti Industries", "GHCL", "Bajaj Electricals", "Forbes and Company", 
    "Vikram Thermo", "RDB Realty", "Rossell India", "Hercules Hoists", 
    "ITC Hotels", "Sterlite Technologies", "Raymond", "Aditya Birla Fashion", 
    "Khadim India", "Valor Estate", "Shankara Building Products", "Tata Motors", 
    "Prima Plastics", "Pricol", "Vedanta", "Chembond", 
    "Triveni Engineering", "Mirza International", "HEG", "Naperol Investments", 
    "Oriental Carbon", "Genus Power"
  ];

  return (
    <div className="relative flex min-h-[70vh] w-full flex-col justify-between overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 w-full">
        <div>
          <span className="font-mono text-xs font-semibold text-accent-gold">01</span>
          <h2 className="mt-1 text-2xl font-black uppercase text-white tracking-tight sm:text-3xl">
            {showCompanies ? "The Demerger Universe" : "Value unlocking"}
          </h2>
        </div>
        
        {/* Big visual number "26" on the right */}
        <div className="font-mono text-5xl font-black text-accent-gold opacity-85 sm:text-6xl tracking-tighter">
          26
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-6 flex items-center justify-center min-h-[260px]">
        <AnimatePresence mode="wait">
          {!showCompanies ? (
            <motion.div
              key="drivers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid gap-4 sm:grid-cols-2 w-full"
            >
              {cards.map((card) => (
                <div
                  key={card.letter}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#14130f]/60 hover:bg-[#1a1812] hover:border-accent-gold/20 p-4 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                >
                  <span className="font-mono text-xs font-bold text-accent-gold mt-0.5">
                    {card.letter}
                  </span>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
                    {card.text}
                  </p>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="universe"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col gap-4"
            >
              <p className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                Indian corporate demergers mapping to these value drivers:
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-h-[200px] overflow-y-auto pr-1">
                {companies.map((name, i) => (
                  <motion.span
                    key={name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="rounded-full bg-white/5 border border-white/5 hover:border-accent-gold/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70 hover:text-white transition-all duration-200"
                  >
                    {name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Button Action */}
      <div className="flex justify-end border-t border-white/5 pt-4">
        <button
          onClick={() => setShowCompanies(!showCompanies)}
          className="interactive-control flex items-center gap-2 rounded-full border border-accent-gold/40 bg-accent-gold/5 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-accent-gold hover:bg-accent-gold/15 transition-all duration-300 shadow-[0_0_15px_rgba(255,184,0,0.05)]"
        >
          <span>{showCompanies ? "Show value drivers" : "Next"}</span>
          <ChevronRight size={12} className={cn("transition-transform duration-300", showCompanies && "rotate-180")} />
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 2.5: CHANGE OF CONTROL (Thesis card and transaction reveal)
   ========================================================================== */
function ChangeControlScene({ active, controller }: { active: boolean; controller: any }) {
  const [showCompanies, setShowCompanies] = useState(false);

  const companies = [
    { from: "Edelweiss", to: "Nuvama", details: "Wealth Management separation to clear path for institutional buy-in." },
    { from: "Kesoram", to: "UltraTech", details: "Cement division carve-out leading to UltraTech's strategic buyout." },
    { name: "NMDC Steel", details: "Government separation of steel asset to prepare for disinvestment and strategic sale." },
    { from: "Shipping Corp", to: "SCILAL", details: "Land & non-core asset stripping to facilitate shipping company privatization." },
  ];

  return (
    <div className="relative flex min-h-[70vh] w-full flex-col justify-between overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 w-full">
        <div>
          <span className="font-mono text-xs font-semibold text-accent-gold">02</span>
          <h2 className="mt-1 text-2xl font-black uppercase text-white tracking-tight sm:text-3xl">
            {showCompanies ? "Transaction Pipeline" : "Change of control"}
          </h2>
        </div>
        
        {/* Big visual number "4" on the right */}
        <div className="font-mono text-5xl font-black text-accent-gold opacity-85 sm:text-6xl tracking-tighter">
          4
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-6 flex items-center justify-center min-h-[260px]">
        <AnimatePresence mode="wait">
          {!showCompanies ? (
            <motion.div
              key="drivers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl text-center md:text-left flex flex-col gap-4 bg-[#14130f]/40 border border-white/5 rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-gold">
                Strategic Thesis
              </span>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                Demerge in order to sell
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-medium">
                Conglomerates often isolate non-core divisions or specialized assets to prepare them for direct sale, mergers, or privatization. Demerging solves structural complexities and regulatory roadblocks, attracting target acquirers who would not buy the parent entity.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="universe"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid gap-4 sm:grid-cols-2 w-full"
            >
              {companies.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="rounded-xl border border-white/5 bg-space-panel/60 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:border-accent-gold/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {item.from ? (
                      <>
                        <span className="font-mono text-[10px] uppercase font-bold text-white">{item.from}</span>
                        <ArrowRight size={10} className="text-accent-gold" />
                        <span className="font-mono text-[10px] uppercase font-bold text-accent-gold">{item.to}</span>
                      </>
                    ) : (
                      <span className="font-mono text-[10px] uppercase font-bold text-accent-gold">{item.name}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                    {item.details}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Button Action */}
      <div className="flex justify-end border-t border-white/5 pt-4">
        <button
          onClick={() => setShowCompanies(!showCompanies)}
          className="interactive-control flex items-center gap-2 rounded-full border border-accent-gold/40 bg-accent-gold/5 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-accent-gold hover:bg-accent-gold/15 transition-all duration-300 shadow-[0_0_15px_rgba(255,184,0,0.05)]"
        >
          <span>{showCompanies ? "Show Thesis" : "Next"}</span>
          <ChevronRight size={12} className={cn("transition-transform duration-300", showCompanies && "rotate-180")} />
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 2.7: REGULATORY RECHARACTERISATION (Thesis card and transaction reveal)
   ========================================================================== */
function RegulatoryRecharacterisationScene({ active, controller }: { active: boolean; controller: any }) {
  const [showCompanies, setShowCompanies] = useState(false);

  const companies = [
    { name: "TVS Holdings", details: "Restructuring equity holdings and investment operations to address RBI regulatory caps." },
    { from: "Reliance", to: "Jio Financial", details: "Demerger of financial services unit to build a pure-play NBFC & digital lending ecosystem." },
    { name: "CP Capital", details: "Recharacterising wealth management and asset advisory arms to fit SEBI license guidelines." },
  ];

  return (
    <div className="relative flex min-h-[70vh] w-full flex-col justify-between overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 w-full">
        <div>
          <span className="font-mono text-xs font-semibold text-accent-gold">03</span>
          <h2 className="mt-1 text-2xl font-black uppercase text-white tracking-tight sm:text-3xl">
            {showCompanies ? "Entities Affected" : "Regulatory recharacterisation"}
          </h2>
        </div>
        
        {/* Big visual number "3" on the right */}
        <div className="font-mono text-5xl font-black text-accent-gold opacity-85 sm:text-6xl tracking-tighter">
          3
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-6 flex items-center justify-center min-h-[260px]">
        <AnimatePresence mode="wait">
          {!showCompanies ? (
            <motion.div
              key="drivers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl text-center md:text-left flex flex-col gap-4 bg-[#14130f]/40 border border-white/5 rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-gold">
                Compliance Thesis
              </span>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                Unlock Value Under Regulated Norms
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-medium">
                When a parent company hosts a highly-regulated sub-division (such as lending, mutual funds, or insurance), central banking rules often limit parent ownership or impose strict capital adequacy constraints. Spin-offs allow these entities to operate under native licenses, increasing financial agility.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="universe"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid gap-4 sm:grid-cols-3 w-full"
            >
              {companies.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="rounded-xl border border-white/5 bg-space-panel/60 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:border-accent-gold/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                    {item.from ? (
                      <>
                        <span className="font-mono text-[10px] uppercase font-bold text-white">{item.from}</span>
                        <ArrowRight size={10} className="text-accent-gold" />
                        <span className="font-mono text-[10px] uppercase font-bold text-accent-gold">{item.to}</span>
                      </>
                    ) : (
                      <span className="font-mono text-[10px] uppercase font-bold text-accent-gold">{item.name}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                    {item.details}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Button Action */}
      <div className="flex justify-end border-t border-white/5 pt-4">
        <button
          onClick={() => setShowCompanies(!showCompanies)}
          className="interactive-control flex items-center gap-2 rounded-full border border-accent-gold/40 bg-accent-gold/5 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-accent-gold hover:bg-accent-gold/15 transition-all duration-300 shadow-[0_0_15px_rgba(255,184,0,0.05)]"
        >
          <span>{showCompanies ? "Show Thesis" : "Next"}</span>
          <ChevronRight size={12} className={cn("transition-transform duration-300", showCompanies && "rotate-180")} />
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 2.8: GLOBAL PARENT RESTRUCTURING (Thesis card and transaction reveal)
   ========================================================================== */
function GlobalParentRestructuringScene({ active, controller }: { active: boolean; controller: any }) {
  const [showCompanies, setShowCompanies] = useState(false);

  const companies = [
    { name: "Siemens", details: "Demerger of the energy business in India to align with Siemens Energy AG's global separation." },
    { name: "Sanofi India", details: "Separation of consumer healthcare division to replicate the global spin-off of Platon." },
    { name: "SKF India", details: "Local operations carve-out following global parent directives for regional simplification." },
  ];

  return (
    <div className="relative flex min-h-[70vh] w-full flex-col justify-between overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 w-full">
        <div>
          <span className="font-mono text-xs font-semibold text-accent-gold">04</span>
          <h2 className="mt-1 text-2xl font-black uppercase text-white tracking-tight sm:text-3xl">
            {showCompanies ? "Entities Restructured" : "Global parent restructuring"}
          </h2>
        </div>
        
        {/* Big visual number "3" on the right */}
        <div className="font-mono text-5xl font-black text-accent-gold opacity-85 sm:text-6xl tracking-tighter">
          3
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-6 flex items-center justify-center min-h-[260px]">
        <AnimatePresence mode="wait">
          {!showCompanies ? (
            <motion.div
              key="drivers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl text-center md:text-left flex flex-col gap-4 bg-[#14130f]/40 border border-white/5 rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-gold">
                Multinational Alignment
              </span>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                Mirror Global Corporate Carve-outs
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-medium">
                When global parent conglomerates restructure their business units (e.g. separating power, automotive, or pharmaceuticals), their publicly-listed domestic subsidiaries follow the same blueprint. This creates clean mirror-image pure-plays for domestic market participants.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="universe"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid gap-4 sm:grid-cols-3 w-full"
            >
              {companies.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="rounded-xl border border-white/5 bg-space-panel/60 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:border-accent-gold/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-accent-gold">{item.name}</span>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                    {item.details}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Button Action */}
      <div className="flex justify-end border-t border-white/5 pt-4">
        <button
          onClick={() => setShowCompanies(!showCompanies)}
          className="interactive-control flex items-center gap-2 rounded-full border border-accent-gold/40 bg-accent-gold/5 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-accent-gold hover:bg-accent-gold/15 transition-all duration-300 shadow-[0_0_15px_rgba(255,184,0,0.05)]"
        >
          <span>{showCompanies ? "Show Thesis" : "Next"}</span>
          <ChevronRight size={12} className={cn("transition-transform duration-300", showCompanies && "rotate-180")} />
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 2.9: FAMILY SETTLEMENT NEW (Thesis card and transaction reveal)
   ========================================================================== */
function FamilySettlementNewScene({ active, controller }: { active: boolean; controller: any }) {
  const [showCompanies, setShowCompanies] = useState(false);

  const companies = [
    { name: "Lux Industries", details: "Promoter division split agreement resolving ownership and operating leadership roles." },
    { name: "Shri Dinesh Mills", details: "Board-approved family separation of legacy holdings and plant assets." },
  ];

  return (
    <div className="relative flex min-h-[70vh] w-full flex-col justify-between overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 w-full">
        <div>
          <span className="font-mono text-xs font-semibold text-accent-gold">05</span>
          <h2 className="mt-1 text-2xl font-black uppercase text-white tracking-tight sm:text-3xl">
            {showCompanies ? "Settlements Resolved" : "Family settlement"}
          </h2>
        </div>
        
        {/* Big visual number "2" on the right */}
        <div className="font-mono text-5xl font-black text-accent-gold opacity-85 sm:text-6xl tracking-tighter">
          2
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-6 flex items-center justify-center min-h-[260px]">
        <AnimatePresence mode="wait">
          {!showCompanies ? (
            <motion.div
              key="drivers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl text-center md:text-left flex flex-col gap-4 bg-[#14130f]/40 border border-white/5 rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-gold">
                Governance Thesis
              </span>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                Governance & Succession Restructuring
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-medium">
                Generational shifts or factional agreements in family-owned conglomerates often block fast decision making. Demerging operating divisions separates control, clears board disputes, and aligns business focus for promoter branches.
              </p>
              
              {/* Extra context block from the screenshot */}
              <div className="mt-2 rounded bg-accent-gold/5 border border-accent-gold/10 px-3 py-2 text-[10px] sm:text-xs text-accent-gold/90 font-mono text-center">
                Both 2026 — settlement agreement filed within a day of board approval.
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="universe"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 sm:grid-cols-2 w-full max-w-2xl"
            >
              {companies.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.15 }}
                  className="rounded-xl border border-white/5 bg-space-panel/60 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:border-accent-gold/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="font-mono text-xs uppercase font-bold text-accent-gold">{item.name}</span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed font-medium">
                    {item.details}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Button Action */}
      <div className="flex justify-end border-t border-white/5 pt-4">
        <button
          onClick={() => setShowCompanies(!showCompanies)}
          className="interactive-control flex items-center gap-2 rounded-full border border-accent-gold/40 bg-accent-gold/5 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-accent-gold hover:bg-accent-gold/15 transition-all duration-300 shadow-[0_0_15px_rgba(255,184,0,0.05)]"
        >
          <span>{showCompanies ? "Show Thesis" : "Next"}</span>
          <ChevronRight size={12} className={cn("transition-transform duration-300", showCompanies && "rotate-180")} />
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 3: HIDDEN BUSINESS (Parent box, growth node, multiple 15x -> 35x)
   ========================================================================== */
function HiddenBusinessScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const [growthPos, setGrowthPos] = useState(0); // 0 to 100

  const growthScroll = useTransform(progress, [seg * 6, seg * 7], [0, 100]);

  useEffect(() => {
    if (presentationActive) return;
    const unsubscribe = growthScroll.on("change", (v) => {
      setGrowthPos(v);
    });
    return () => unsubscribe();
  }, [growthScroll, presentationActive]);

  useGSAP(() => {
    if (!presentationActive || !active) {
      if (presentationActive) setGrowthPos(0);
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
          setGrowthPos(this.targets()[0].val);
        },
      }
    );
  }, [presentationActive, active]);

  const factor = growthPos / 100;

  // Box details: gold box separates from grey parent box
  const parentBoxX = 20 + factor * -10; // slightly slides left
  const goldNodeX = 65 + factor * 20; // slides right

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Valuation Arbitrage"
          title="Hidden Inside"
          lede="Sometimes, a high-growth technology or speciality unit is trapped inside a legacy conglomerate. Because investors price the conglomerate at a discount, the fast-growing business is effectively priced at zero."
        />
        
        {/* Dynamic multiples reveal */}
        <div className="mt-8 flex items-center gap-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">Conglomerate Multiple</span>
            <div className="mt-1 font-mono text-3xl font-black text-white/50">15x</div>
            <span className="font-mono text-[8px] text-white/30">Discounted Base</span>
          </div>
          <ChevronRight className="text-white/20 mt-4" size={20} />
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-accent-gold">Spin-off Multiple</span>
            <div className="mt-1 font-mono text-3xl font-black text-accent-gold">
              <AnimatedCounter value={35} active={growthPos > 50} prefix="" suffix="x" />
            </div>
            <span className="font-mono text-[8px] text-accent-gold/60">Standalone Multiple</span>
          </div>
        </div>
      </div>

      {/* Visual box separation */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[340px] overflow-hidden">
        <svg viewBox="0 0 300 200" className="h-[260px] w-full fill-none overflow-visible">
          {/* Main Parent Box */}
          <rect
            x={parentBoxX}
            y="40"
            width="120"
            height="120"
            rx="12"
            className="stroke-white/10 fill-white/[0.01] stroke-[1.5]"
          />
          <text x={parentBoxX + 15} y="30" className="fill-white/40 font-mono text-[8px] uppercase tracking-wider">
            Legacy Parent Co
          </text>

          {/* Internal divisions in parent box */}
          <circle cx={parentBoxX + 30} cy="70" r="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
          <circle cx={parentBoxX + 80} cy="80" r="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
          <circle cx={parentBoxX + 45} cy="120" r="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />

          {/* Exploding Gold Division Node */}
          <g transform={`translate(${goldNodeX}, 30)`}>
            <motion.rect
              x="50"
              y="10"
              width="90"
              height="80"
              rx="10"
              className="stroke-accent-gold/40 fill-accent-gold/[0.02] stroke-[1.5]"
              style={{
                strokeDasharray: factor > 0.8 ? "none" : "3 3",
              }}
            />
            <text x="60" y="2" className="fill-accent-gold font-mono text-[8px] uppercase tracking-widest">
              Fast-Growth Spin
            </text>
            
            {/* Rapid growth miniature line graph */}
            <path
              d="M 65,70 L 80,65 L 95,50 L 110,40 L 125,25"
              stroke="var(--color-accent-gold)"
              strokeWidth="2"
              className="animate-pulse"
            />
            {/* Nodes on graph */}
            <circle cx="125" cy="25" r="3.5" fill="var(--color-accent-gold)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 4: LOSS-MAKING DIVISION (Green dashboard, red node detaching, margin stats)
   ========================================================================== */
function LossMakingScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const [lossPos, setLossPos] = useState(0);

  const lossScroll = useTransform(progress, [seg * 7, seg * 8], [0, 100]);

  useEffect(() => {
    if (presentationActive) return;
    const unsubscribe = lossScroll.on("change", (v) => {
      setLossPos(v);
    });
    return () => unsubscribe();
  }, [lossScroll, presentationActive]);

  useGSAP(() => {
    if (!presentationActive || !active) {
      if (presentationActive) setLossPos(0);
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
          setLossPos(this.targets()[0].val);
        },
      }
    );
  }, [presentationActive, active]);

  const factor = lossPos / 100;

  // Red loss-making division detaches downwards
  const redNodeY = 110 + factor * 60;
  const redNodeOpacity = Math.max(0.1, 1 - factor * 0.9);

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Consolidated Drag"
          title="The Loss-Making Anchor"
          lede="A highly profitable core business is frequently forced to subsidize a bleeding division. By spinning off or shutting down the loss-maker, the parent's metrics immediately expand."
        />

        <div className="mt-8 flex gap-8">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">Consolidated Margin</span>
            <div className="mt-1 font-mono text-3xl font-black text-white/50">6.2%</div>
            <span className="font-mono text-[8px] text-white/30">Dragging Average</span>
          </div>
          <div className="border-l border-white/10 pl-6">
            <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400">Post-Split Margin</span>
            <div className="mt-1 font-mono text-3xl font-black text-emerald-400">
              <AnimatedCounter value={18.5} active={lossPos > 60} decimals={1} prefix="" suffix="%" />
            </div>
            <span className="font-mono text-[8px] text-emerald-400/60">Core Profitability Unlock</span>
          </div>
        </div>
      </div>

      {/* Margins Dashboard */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[340px] overflow-hidden">
        <svg viewBox="0 0 300 200" className="h-[260px] w-full fill-none overflow-visible">
          {/* Parent container grid */}
          <rect x="20" y="30" width="260" height="110" rx="10" className="stroke-white/5 fill-white/[0.01]" />
          <text x="32" y="20" className="fill-white/30 font-mono text-[8px] uppercase tracking-wider">
            Conglomerate Consolidated Portfolio
          </text>

          {/* Healthy Division 1 */}
          <g transform="translate(40, 50)">
            <rect x="0" y="0" width="100" height="35" rx="6" className="stroke-emerald-500/20 fill-emerald-500/[0.02]" />
            <circle cx="16" cy="17" r="4" className="fill-emerald-500" />
            <text x="28" y="15" className="fill-white font-mono text-[9px] font-bold">Premium Core</text>
            <text x="28" y="27" className="fill-emerald-400 font-mono text-[8px]">+22.4% ROCE</text>
          </g>

          {/* Healthy Division 2 */}
          <g transform="translate(160, 50)">
            <rect x="0" y="0" width="100" height="35" rx="6" className="stroke-emerald-500/20 fill-emerald-500/[0.02]" />
            <circle cx="16" cy="17" r="4" className="fill-emerald-500" />
            <text x="28" y="15" className="fill-white font-mono text-[9px] font-bold">Services Unit</text>
            <text x="28" y="27" className="fill-emerald-400 font-mono text-[8px]">+16.8% ROCE</text>
          </g>

          {/* Red Loss-Making Division (detaches down) */}
          <g transform={`translate(100, ${redNodeY})`} opacity={redNodeOpacity}>
            <rect x="0" y="0" width="100" height="35" rx="6" className="stroke-red-500/30 fill-red-500/[0.02]" />
            <circle cx="16" cy="17" r="4" className="fill-red-500 animate-pulse" />
            <text x="28" y="15" className="fill-white font-mono text-[9px] font-bold">Legacy Retail</text>
            <text x="28" y="27" className="fill-red-400 font-mono text-[8px]">-8.2% ROCE</text>
          </g>
        </svg>

        {/* Separator line warning */}
        {factor > 0.4 && (
          <div className="absolute bottom-16 right-6 font-mono text-[8px] uppercase tracking-widest text-red-400/80 animate-pulse">
            Forced Spin-Off Triggered
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 5: STRATEGIC FOCUS (Conglomerate to Specialist blueprint morph)
   ========================================================================== */
function StrategicFocusScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const [focusPos, setFocusPos] = useState(0);

  const focusScroll = useTransform(progress, [seg * 8, seg * 9], [0, 100]);

  useEffect(() => {
    if (presentationActive) return;
    const unsubscribe = focusScroll.on("change", (v) => {
      setFocusPos(v);
    });
    return () => unsubscribe();
  }, [focusScroll, presentationActive]);

  useGSAP(() => {
    if (!presentationActive || !active) {
      if (presentationActive) setFocusPos(0);
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
          setFocusPos(this.targets()[0].val);
        },
      }
    );
  }, [presentationActive, active]);

  const f = focusPos / 100;

  // Fade out other sectors, focus on Defence
  const otherOpacity = Math.max(0.04, 1 - f * 1.2);
  const blueprintReveal = Math.max(0, (f - 0.4) / 0.6); // starts half way

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Asset Specialization"
          title="Strategic Focus"
          lede="Conglomerates often split because they want to go from a diversified holding structure to pure-play specialist entities. A board that manages aerospace, chemicals, and retail at once rarely excels at any."
        />
        
        {/* Conglomerate to Specialist label morph */}
        <div className="mt-8 flex items-center gap-4">
          <span
            className={cn(
              "font-mono text-xs uppercase tracking-widest border border-white/10 rounded-full px-3 py-1.5 transition-colors",
              f < 0.6 ? "text-white bg-white/5 border-white/20" : "text-white/30"
            )}
          >
            Conglomerate
          </span>
          <ChevronRight className="text-white/20" size={16} />
          <span
            className={cn(
              "font-mono text-xs uppercase tracking-widest border rounded-full px-3 py-1.5 transition-colors",
              f >= 0.6 ? "text-accent-gold bg-accent-gold/10 border-accent-gold/30" : "text-white/20 border-white/5"
            )}
          >
            Pure-Play Specialist
          </span>
        </div>
      </div>

      {/* Blueprint Visual */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[340px] overflow-hidden">
        {/* Blueprint background grid lines */}
        {f > 0.4 && (
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,199,107,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,199,107,0.02)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />
        )}

        <svg viewBox="0 0 300 200" className="h-[260px] w-full fill-none overflow-visible">
          {/* Conglomerate sector nodes */}
          <g opacity={otherOpacity}>
            <circle cx="50" cy="50" r="15" className="stroke-white/15 fill-white/[0.01]" />
            <text x="50" y="53" textAnchor="middle" className="fill-white/40 font-mono text-[7px]">CHEM</text>
            
            <circle cx="250" cy="50" r="15" className="stroke-white/15 fill-white/[0.01]" />
            <text x="250" y="53" textAnchor="middle" className="fill-white/40 font-mono text-[7px]">POWER</text>

            <circle cx="50" cy="150" r="15" className="stroke-white/15 fill-white/[0.01]" />
            <text x="50" y="153" textAnchor="middle" className="fill-white/40 font-mono text-[7px]">AUTO</text>

            <circle cx="250" cy="150" r="15" className="stroke-white/15 fill-white/[0.01]" />
            <text x="250" y="153" textAnchor="middle" className="fill-white/40 font-mono text-[7px]">RETAIL</text>
            
            {/* Linking paths */}
            <path d="M 50,65 L 150,100 M 250,65 L 150,100 M 50,135 L 150,100 M 250,135 L 150,100" stroke="rgba(255,255,255,0.05)" />
          </g>

          {/* Central Defence / Specialty Division */}
          <g transform="translate(150, 100)">
            <circle
              cx="0"
              cy="0"
              r="24"
              className={cn(
                "transition-all duration-500",
                f > 0.5 ? "stroke-accent-gold/40 fill-accent-gold/[0.02]" : "stroke-white/20 fill-white/[0.02]"
              )}
            />
            <text
              x="0"
              y="3"
              textAnchor="middle"
              className={cn(
                "font-mono text-[9px] uppercase tracking-wider font-bold transition-colors",
                f > 0.5 ? "fill-accent-gold" : "fill-white/70"
              )}
            >
              DEFENCE
            </text>

            {/* Blueprint expansions (Rockets/Satellites SVG lines) */}
            {f > 0.4 && (
              <g opacity={blueprintReveal} className="stroke-accent-gold/30 stroke-[0.8] overflow-visible">
                {/* Orbital path */}
                <circle cx="0" cy="0" r="55" strokeDasharray="3 3" />
                {/* Satellite symbol */}
                <g transform="translate(48, -28)">
                  <circle cx="0" cy="0" r="3" fill="var(--color-accent-gold)" />
                  <rect x="-8" y="-1" width="16" height="2" />
                  <rect x="-3" y="-5" width="6" height="10" strokeDasharray="1 1" />
                </g>
                {/* Micro tech vector links */}
                <line x1="0" y1="-24" x2="0" y2="-55" />
                <line x1="24" y1="0" x2="55" y2="0" />
                <line x1="-24" y1="0" x2="-55" y2="0" strokeDasharray="2 2" />
                
                {/* Aerospace target grid details */}
                <circle cx="0" cy="0" r="75" strokeDasharray="1 5" />
              </g>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 6: DIFFERENT INVESTORS (Income dividend graph vs Growth rocket chart)
   ========================================================================== */
function DifferentInvestorsScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const [investPos, setInvestPos] = useState(0);

  const investScroll = useTransform(progress, [seg * 5, seg * 6], [0, 100]);

  useEffect(() => {
    if (presentationActive) return;
    const unsubscribe = investScroll.on("change", (v) => {
      setInvestPos(v);
    });
    return () => unsubscribe();
  }, [investScroll, presentationActive]);

  useGSAP(() => {
    if (!presentationActive || !active) {
      if (presentationActive) setInvestPos(0);
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
          setInvestPos(this.targets()[0].val);
        },
      }
    );
  }, [presentationActive, active]);

  const f = investPos / 100;

  // Split-screen alignment
  const splitOffset = f * 70; // moves panels outwards

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Investor Base Alignment"
          title="Different Investors"
          lede="An income fund wants stable utility dividends. A venture fund wants zero dividends and aggressive growth reinvestment. When they are locked inside the same shareholder base, neither group gets what they want."
        />
        <p className="mt-4 text-xs text-white/50 leading-relaxed max-w-md">
          A demerger resolves this friction. By splitting, it allows separate investor groups to hold the exact asset profile matching their mandate.
        </p>
      </div>

      {/* Split screen investor match */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[340px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center gap-4 w-full px-4">
          
          {/* Income Investor Card (Slides Left) */}
          <div
            className="flex-1 glass rounded-xl p-4 border-blue-500/20 bg-space-dark/85 relative transition-transform duration-100 ease-out"
            style={{
              transform: `translateX(-${splitOffset}px)`,
            }}
          >
            <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-blue-400">
              <Layers size={10} />
              <span>Income Mandate</span>
            </div>
            <h4 className="text-sm font-black mt-2 text-white">Stable Dividend Yield</h4>
            
            {/* Steady blue yield graph */}
            <div className="mt-4 h-16 w-full border-b border-white/10 relative overflow-hidden">
              <svg viewBox="0 0 100 50" className="h-full w-full stroke-blue-500 fill-none stroke-2">
                <path d="M 5,35 L 20,33 L 40,34 L 60,32 L 80,33 L 95,32" />
                <path d="M 5,35 L 20,33 L 40,34 L 60,32 L 80,33 L 95,32 L 95,50 L 5,50 Z" className="fill-blue-500/5 stroke-none" />
              </svg>
            </div>
            <span className="font-mono text-[8px] text-white/40 block mt-2">Target Multiple: 12x EV/EBITDA</span>
          </div>

          {/* Growth Investor Card (Slides Right) */}
          <div
            className="flex-1 glass rounded-xl p-4 border-orange-500/20 bg-space-dark/85 relative transition-transform duration-100 ease-out"
            style={{
              transform: `translateX(${splitOffset}px)`,
            }}
          >
            <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-orange-400">
              <TrendingUp size={10} />
              <span>Growth Mandate</span>
            </div>
            <h4 className="text-sm font-black mt-2 text-white">Capital Reinvestment</h4>
            
            {/* Spiking orange growth graph */}
            <div className="mt-4 h-16 w-full border-b border-white/10 relative overflow-hidden">
              <svg viewBox="0 0 100 50" className="h-full w-full stroke-orange-500 fill-none stroke-2">
                <path d="M 5,45 L 25,40 L 50,30 L 70,18 L 95,4" />
                <path d="M 5,45 L 25,40 L 50,30 L 70,18 L 95,4 L 95,50 L 5,50 Z" className="fill-orange-500/5 stroke-none" />
              </svg>
            </div>
            <span className="font-mono text-[8px] text-white/40 block mt-2">Target Multiple: 35x EV/EBITDA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 7: REGULATORY REASONS (Courthouse outline, compliance seal stamp)
   ========================================================================== */
function RegulatoryScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const [regPos, setRegPos] = useState(0);

  const regScroll = useTransform(progress, [seg * 9, seg * 10], [0, 100]);

  useEffect(() => {
    if (presentationActive) return;
    const unsubscribe = regScroll.on("change", (v) => {
      setRegPos(v);
    });
    return () => unsubscribe();
  }, [regScroll, presentationActive]);

  useGSAP(() => {
    if (!presentationActive || !active) {
      if (presentationActive) setRegPos(0);
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
          setRegPos(this.targets()[0].val);
        },
      }
    );
  }, [presentationActive, active]);

  const f = regPos / 100;

  // Stamp physics: scale down and rotate on stamp reveal (d > 0.6)
  const stampOpacity = f > 0.6 ? 1 : 0;
  const stampScale = f > 0.6 ? 1 : 1.35;
  const stampRotate = f > 0.6 ? 12 : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Statutory Mandate"
          title="Regulatory Separation"
          lede="Antitrust directives, foreign ownership restrictions, or complex bank regulations often leave boards with no choice: businesses must legally detach. If they remain inside the same corporate envelope, they risk severe capital penalties."
        />
      </div>

      {/* Premium compliance stamp animation */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[340px] overflow-hidden">
        {/* Stylized Courthouse background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
          <svg viewBox="0 0 100 100" className="h-[220px] w-auto fill-none stroke-white stroke-[0.8]">
            <path d="M10 80 L90 80 M15 80 L15 45 M30 80 L30 45 M50 80 L50 45 M70 80 L70 45 M85 80 L85 45" />
            {/* Columns */}
            <polygon points="10,45 90,45 50,20" />
          </svg>
        </div>

        {/* Legal Document Card */}
        <div className="glass rounded-xl p-5 border-white/10 bg-space-dark/90 w-64 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="font-mono text-[8px] uppercase tracking-wider text-white/40">Docket #9218-SEC</span>
            <Shield size={12} className="text-accent-gold opacity-50" />
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-1.5 w-full bg-white/10 rounded" />
            <div className="h-1.5 w-5/6 bg-white/10 rounded" />
            <div className="h-1.5 w-4/5 bg-white/10 rounded" />
            <div className="h-1.5 w-2/3 bg-white/5 rounded" />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="font-mono text-[7px] text-white/35">COMPLIANCE REVIEW</span>
            
            {/* Approved Stamp */}
            <motion.div
              style={{
                opacity: stampOpacity,
                scale: stampScale,
                rotate: `${stampRotate}deg`,
              }}
              className="border-2 border-emerald-500/60 rounded px-2 py-1 font-mono text-[8px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/5 select-none"
            >
              Approved
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 8: FAMILY SETTLEMENT (Ownership tree nodes separating)
   ========================================================================== */
function FamilySettlementScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const [familyPos, setFamilyPos] = useState(0);

  const familyScroll = useTransform(progress, [seg * 10, seg * 11], [0, 100]);

  useEffect(() => {
    if (presentationActive) return;
    const unsubscribe = familyScroll.on("change", (v) => {
      setFamilyPos(v);
    });
    return () => unsubscribe();
  }, [familyScroll, presentationActive]);

  useGSAP(() => {
    if (!presentationActive || !active) {
      if (presentationActive) setFamilyPos(0);
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
          setFamilyPos(this.targets()[0].val);
        },
      }
    );
  }, [presentationActive, active]);

  const f = familyPos / 100;

  // Family branches separation offset
  const separationX = f * 30;

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Governance Resolution"
          title="Family Settlement"
          lede="In family-controlled conglomerates, generational handovers often create internal governance gridlock. Demerging divisions into separate operating companies resolves family disputes cleanly, giving each faction complete control over their own business."
        />
      </div>

      {/* Ownership Tree */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[340px] overflow-hidden">
        <svg viewBox="0 0 300 200" className="h-[260px] w-full fill-none overflow-visible">
          {/* Founder Root Node */}
          <circle cx="150" cy="30" r="8" fill="rgba(10,10,20,0.9)" stroke="var(--color-accent-gold)" strokeWidth="1.5" />
          <text x="150" y="16" textAnchor="middle" className="fill-white/60 font-mono text-[7px] uppercase tracking-wider">Founder Stub</text>

          {/* Connectors to Branch 1 & Branch 2 */}
          <line x1="150" y1="38" x2={100 - separationX} y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <line x1="150" y1="38" x2={200 + separationX} y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

          {/* Branch 1 Group (Left) */}
          <g transform={`translate(${100 - separationX}, 80)`}>
            <circle cx="0" cy="0" r="6" fill="var(--color-accent-gold)" />
            <text x="-12" y="3" textAnchor="end" className="fill-white/50 font-mono text-[7px]">Family Branch A</text>
            
            {/* Connected business node */}
            <line x1="0" y1="6" x2="-20" y2="45" stroke="rgba(255,255,255,0.06)" />
            <circle cx="-20" cy="45" r="12" className="stroke-white/10 fill-white/[0.02]" />
            <text x="-20" y="48" textAnchor="middle" className="fill-white/70 font-mono text-[8px]">Group A Ops</text>
          </g>

          {/* Branch 2 Group (Right) */}
          <g transform={`translate(${200 + separationX}, 80)`}>
            <circle cx="0" cy="0" r="6" fill="#fff" />
            <text x="12" y="3" textAnchor="start" className="fill-white/50 font-mono text-[7px]">Family Branch B</text>

            {/* Connected business node */}
            <line x1="0" y1="6" x2="20" y2="45" stroke="rgba(255,255,255,0.06)" />
            <circle cx="20" cy="45" r="12" className="stroke-white/10 fill-white/[0.02]" />
            <text x="20" y="48" textAnchor="middle" className="fill-white/70 font-mono text-[8px]">Group B Ops</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 9: UNDERPERFORMANCE STOCK CHART (Lagging parent co stock line splits)
   ========================================================================== */
function UnderperformanceScene({ active, controller }: { active: boolean; controller: any }) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const [chartPos, setChartPos] = useState(0);

  const chartScroll = useTransform(progress, [seg * 11, seg * 12], [0, 100]);

  useEffect(() => {
    if (presentationActive) return;
    const unsubscribe = chartScroll.on("change", (v) => {
      setChartPos(v);
    });
    return () => unsubscribe();
  }, [chartScroll, presentationActive]);

  useGSAP(() => {
    if (!presentationActive || !active) {
      if (presentationActive) setChartPos(0);
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
          setChartPos(this.targets()[0].val);
        },
      }
    );
  }, [presentationActive, active]);

  const f = chartPos / 100;

  // Chart width/height and grid calculations
  const w = 320;
  const h = 180;
  const padX = 30;
  const padY = 20;

  // Split calculations (f > 0.4 triggers split)
  const isSplit = f > 0.4;
  const splitProgress = isSplit ? (f - 0.4) / 0.6 : 0;

  // Define stock line paths
  // Index (benchmark - white/30)
  const indexPath = `M ${padX} 140 L 100 120 L 160 100 L 220 85 L 300 70`;
  
  // Conglomerate stock line before split (flat/declining)
  // Split point is at x: 160, y: 125
  const parentBeforeSplit = `M ${padX} 145 L 100 135 L 160 125`;
  
  // After split: Parent re-rates (Gold)
  const parentAfterSplitY = 125 - splitProgress * 35;
  const parentAfterSplit = `M 160 125 L 220 110 L 300 ${parentAfterSplitY}`;

  // After split: Spin-co re-rates aggressively (Orange)
  const spinAfterSplitY = 125 - splitProgress * 75;
  const spinAfterSplit = `M 160 125 L 220 90 L 300 ${spinAfterSplitY}`;

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Value Gap Arbitrage"
          title="Persistent Underperformance"
          lede="The market isn&apos;t always wrong. Sometimes the corporate structure is."
        />
        <p className="mt-4 text-xs text-white/50 leading-relaxed max-w-md">
          A conglomerate discount routinely locks a company below its intrinsic sum-of-the-parts (SOTP) valuation. Demerger breaks the structure, forcing the market to price the units independently and close the value gap.
        </p>
      </div>

      {/* SVG Stock Chart */}
      <div className="relative rounded-xl border border-white/5 bg-space-panel p-4 shadow-xl">
        <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/80">SOTP Discount Closing</span>
          </div>
          <span className="font-mono text-[8px] text-white/40">12M Post-Split Trajectory</span>
        </div>

        <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full select-none overflow-visible fill-none">
          {/* Horizontal grid lines */}
          {[50, 100, 150].map((gridY) => (
            <line key={gridY} x1={padX} y1={gridY} x2={w - padX} y2={gridY} stroke="rgba(255,255,255,0.04)" />
          ))}

          {/* Benchmark Index */}
          <path d={indexPath} stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" strokeDasharray="3 3" />
          <text x={w - padX + 5} y="72" className="fill-white/35 font-mono text-[7px] uppercase">INDEX</text>

          {/* Conglomerate Line Before Split */}
          <path d={parentBeforeSplit} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

          {/* Split indicator line */}
          <line x1="160" y1={padY} x2="160" y2={h - padY} stroke="rgba(255,255,255,0.12)" strokeDasharray="2 2" />
          <text x="160" y="15" textAnchor="middle" className="fill-accent-gold font-mono text-[6px] uppercase tracking-widest">
            Demerger Date
          </text>

          {/* Post-Split lines */}
          {isSplit && (
            <>
              {/* Parent Re-rated */}
              <path d={parentAfterSplit} stroke="var(--color-accent-gold)" strokeWidth="2" />
              <text x={w - padX + 5} y={parentAfterSplitY + 2} className="fill-accent-gold font-mono text-[7px] uppercase font-bold">
                Parent (+45%)
              </text>

              {/* Spin-Co Re-rated */}
              <path d={spinAfterSplit} stroke="var(--color-accent-orange)" strokeWidth="2.5" />
              <text x={w - padX + 5} y={spinAfterSplitY + 2} className="fill-accent-orange font-mono text-[7px] uppercase font-bold">
                Spin-Co (+110%)
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 10: ENDING SCENE (Thesis reveals, transition link to Module 2)
   ========================================================================== */
function EndingScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <Kicker className="flex justify-center">The Catalyst Conclusion</Kicker>

      <div className="mt-8 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-balance text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl"
        >
          &quot;Demerger doesn&apos;t create value.&quot;
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-balance text-3xl font-black uppercase leading-none tracking-tight text-gradient-gold sm:text-5xl"
        >
          &quot;It reveals value that was already there.&quot;
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 0.6 } : {}}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mx-auto max-w-lg text-xs leading-relaxed text-white/60 pt-4"
        >
          The structural arbitrage lies in recognizing these organizational shifts before the market adjusts. Now that we understand the catalyst, we investigate the history of split-ups.
        </motion.p>
      </div>

      {/* Chapter 2 Navigation Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 3.8 }}
        className="mt-12"
      >
        <Link
          href="/chapters/where-it-began"
          className="interactive-control bg-accent-gold hover:bg-accent-gold/90 text-black flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide shadow-2xl"
        >
          <span>Continue to Chapter 2</span>
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
