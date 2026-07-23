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

export default function WhereItBeganChapter() {
  const scenes: DeckScene[] = [
    {
      id: "hero",
      name: "The Process",
      render: (active) => <HeroScene active={active} controller={controller} />,
    },
    {
      id: "statutory",
      name: "Statutory Pillars",
      render: (active) => <StatutoryPillarsScene active={active} controller={controller} />,
    },
    {
      id: "stakeholders",
      name: "The Stakeholders",
      render: (active) => <StakeholdersScene active={active} controller={controller} />,
    },
    {
      id: "timeline",
      name: "Timeline",
      render: (active) => <TimelineScene active={active} controller={controller} />,
    },
    {
      id: "stages",
      name: "Step-by-Step",
      render: (active) => <StagesScene active={active} controller={controller} />,
    },
    {
      id: "upside",
      name: "Value Creation",
      render: (active) => <UpsideScene active={active} controller={controller} />,
    },
    {
      id: "downside",
      name: "Value Destruction",
      render: (active) => <DownsideScene active={active} controller={controller} />,
    },
    {
      id: "opportunity",
      name: "The Arbitrage",
      render: (active) => <OpportunityScene active={active} controller={controller} />,
    },
    {
      id: "ending",
      name: "The Path Forward",
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
          animate={active ? { rotate: 360 } : {}}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute h-96 w-96 rounded-full border border-white/5 border-dashed"
        />
        <motion.div
          animate={active ? { rotate: -360 } : {}}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute h-[500px] w-[500px] rounded-full border border-white/[0.02]"
        />
      </div>

      <motion.div style={{ opacity: textOpacity }} className="relative z-10 select-none max-w-3xl">
        <div className="mb-6 flex justify-center">
          <Kicker>Chapter 02 / The Legal Blueprint</Kicker>
        </div>

        <h1 className="text-balance text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl">
          The Spin-Off
          <br />
          <span className="text-gradient-gold">Process</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-xs uppercase tracking-widest text-white/50 leading-relaxed">
          How structural, regulatory, and corporate forces combine to build a standalone enterprise in India.
        </p>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   SCENE 2: STATUTORY PILLARS (Section 230-232 & Section 2(19AA))
   ========================================================================== */
function StatutoryPillarsScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Statutory Anchors"
          title="The Two Legal Pillars"
          lede="In India, a demerger is not a simple board transaction. It is anchored in two heavy statutory codes that dictate corporate restructuring and tax neutrality."
        />
        <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-md">
          Failing to satisfy either pillar turns a tax-free restructuring into a taxable event, destroying the transaction&apos;s financial rationale.
        </p>
      </div>

      {/* Pillars Dashboard Grid */}
      <div className="grid gap-4">
        {/* Companies Act Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-xl p-5 border-white/10 bg-space-dark/80 relative"
        >
          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-wider text-accent-gold">
            <Scale size={14} />
            <span>Companies Act, 2013</span>
          </div>
          <h3 className="text-base font-black mt-3 text-white uppercase">Section 230 - 232</h3>
          <p className="text-xs text-white/60 mt-2 leading-relaxed">
            The legal mechanism governing Schemes of Arrangement. Demergers require sanction by the <strong>National Company Law Tribunal (NCLT)</strong>, following board, shareholder, and creditor voting thresholds.
          </p>
        </motion.div>

        {/* Income Tax Act Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-xl p-5 border-white/10 bg-space-dark/80 relative"
        >
          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-wider text-accent-gold">
            <Shield size={14} />
            <span>Income Tax Act, 1961</span>
          </div>
          <h3 className="text-base font-black mt-3 text-white uppercase">Section 2(19AA)</h3>
          <p className="text-xs text-white/60 mt-2 leading-relaxed">
            Defines a tax-compliant &quot;demerger.&quot; All assets/liabilities must transfer at book value to the resulting company, which must issue shares to the parent shareholders on a proportionate basis to remain tax-neutral.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 3: STAKEHOLDERS (Interactive interactive network map)
   ========================================================================== */
function StakeholdersScene({ active, controller }: { active: boolean; controller: any }) {
  const [selectedStakeholder, setSelectedStakeholder] = useState<number | null>(null);

  const stakeholders = [
    { name: "Company", role: "Board & Restructuring Team", detail: "Approves the scheme and files the petition." },
    { name: "NCLT", role: "National Company Law Tribunal", detail: "Provides final judicial sanction for the scheme." },
    { name: "SEBI", role: "Securities Regulator", detail: "Ensures compliance with listing terms and minority protections." },
    { name: "Lenders", stroke: "#ffb800", role: "Creditors & Banks", detail: "Requires consent thresholds, typically >75% by value." },
    { name: "Shareholders", role: "Equity Partners", detail: "Requires >75% approval majority in court-convened meetings." },
    { name: "Exchanges", role: "BSE & NSE", detail: "Issues no-objection certificates and processes listing details." },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Consensual Gridlock"
          title="The Stakeholder Web"
          lede="A demerger is a complex coordination game. Six independent stakeholder groups must align before a single new share can trade."
        />
        <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-md">
          Each stakeholder acts as a gating checkpoint. A veto from lenders, SEBI, or shareholders halts the entire process.
        </p>

        {/* Selected Stakeholder Detail Panel */}
        <div className="mt-8 min-h-[90px]">
          <AnimatePresence mode="wait">
            {selectedStakeholder !== null ? (
              <motion.div
                key={selectedStakeholder}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="rounded-lg border border-accent-gold/20 bg-accent-gold/[0.02] p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-accent-gold font-bold">
                    {stakeholders[selectedStakeholder].name}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1 uppercase">
                  {stakeholders[selectedStakeholder].role}
                </h4>
                <p className="text-xs text-white/60 mt-1">
                  {stakeholders[selectedStakeholder].detail}
                </p>
              </motion.div>
            ) : (
              <div className="text-xs text-white/30 italic flex items-center gap-2 border border-white/5 rounded-lg p-4">
                Click any stakeholder node to inspect their approval mechanics.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stakeholders Graph */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[340px] overflow-hidden">
        <svg viewBox="0 0 200 200" className="h-[280px] w-full fill-none overflow-visible">
          {/* Central Target Circle */}
          <circle cx="100" cy="100" r="16" className="stroke-accent-gold/20 fill-accent-gold/[0.02] stroke-[1]" />
          <text x="100" y="103" textAnchor="middle" className="fill-accent-gold font-mono text-[6px] uppercase tracking-widest font-bold">
            Scheme
          </text>

          {/* Connectors and Nodes */}
          {stakeholders.map((s, i) => {
            const angle = (i * 2 * Math.PI) / stakeholders.length;
            const r = 65;
            const nodeX = 100 + r * Math.cos(angle);
            const nodeY = 100 + r * Math.sin(angle);

            return (
              <g key={s.name} className="cursor-pointer group" onClick={() => setSelectedStakeholder(i)}>
                {/* Connecting lines */}
                <line
                  x1="100"
                  y1="100"
                  x2={nodeX}
                  y2={nodeY}
                  className={cn(
                    "transition-all duration-300",
                    selectedStakeholder === i ? "stroke-accent-gold/60 stroke-[1.5]" : "stroke-white/10 group-hover:stroke-white/30"
                  )}
                  strokeDasharray="2 3"
                />

                {/* Node circle */}
                <circle
                  cx={nodeX}
                  cy={nodeY}
                  r="12"
                  className={cn(
                    "transition-all duration-300",
                    selectedStakeholder === i
                      ? "stroke-white fill-accent-gold/10 stroke-[1.5]"
                      : "stroke-white/20 fill-space-panel group-hover:stroke-white/40"
                  )}
                />
                
                {/* Inner symbol/text */}
                <text
                  x={nodeX}
                  y={nodeY + 2.5}
                  textAnchor="middle"
                  className={cn(
                    "font-mono text-[5.5px] uppercase tracking-wider font-bold pointer-events-none select-none",
                    selectedStakeholder === i ? "fill-white" : "fill-white/40 group-hover:fill-white/80"
                  )}
                >
                  {s.name.substring(0, 4)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 4: TIMELINE (Timeline Image in white premium container)
   ========================================================================== */
function TimelineScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Milestone Projections"
          title="The Restructuring Timeline"
          lede="Unlike acquisitions which close quickly, a demerger in India routinely spans 12 to 15 months from initial board announcement to listing."
        />
        <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-md">
          During this prolonged window, the parent company stock often fluctuates widely as arbitrageurs and index funds prepare for the listing event.
        </p>
      </div>

      {/* Timeline PNG Container (Paper White Card) */}
      <div className="relative rounded-2xl border border-white/5 bg-white p-6 shadow-2xl flex items-center justify-center min-h-[300px]">
        <img
          src="/images/spin_off_timeline.png"
          alt="Spin-off Timeline in India"
          className="w-full h-auto max-h-[220px] object-contain select-none pointer-events-none"
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 5: STAGES (Super detailed step by step + Stages image)
   ========================================================================== */
function StagesScene({ active, controller }: { active: boolean; controller: any }) {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stagesData = [
    {
      title: "Stage 1: Statutory Approvals",
      points: [
        "Board of Directors reviews and approves the Valuation Report and Scheme of Restructuring.",
        "Scheme submitted to BSE & NSE for initial vetting and NOC (No Objection Certificate).",
        "Filed with SEBI for compliance review and feedback.",
      ],
    },
    {
      title: "Stage 2: Consent Convening",
      points: [
        "NCLT issues orders to convene court-convened meetings of shareholders and creditors.",
        "Shareholder approval (>75% majority by value voting) is secured.",
        "Creditor/lender approvals or NOCs are compiled.",
        "Final petition filed back to NCLT for scheme confirmation.",
      ],
    },
    {
      title: "Stage 3: Restructuring & Listing",
      points: [
        "NCLT issues final order sanctioning the scheme, filed with the ROC (Registrar of Companies).",
        "Board declares the 'Record Date' to determine share allocation eligibility.",
        "Parent company shares adjust to reflect demerger value.",
        "Spun-off shares are allotted to eligible accounts.",
        "In-principle listing approvals processed by stock exchanges.",
      ],
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      {/* Stages PNG Container (Paper White Card) */}
      <div className="relative rounded-2xl border border-white/5 bg-white p-5 shadow-2xl flex items-center justify-center min-h-[280px]">
        <img
          src="/images/demerger_stages.png"
          alt="Step by Step Demerger process stages"
          className="w-full h-auto max-h-[220px] object-contain select-none pointer-events-none"
        />
      </div>

      {/* Accordion List */}
      <div>
        <SceneHeader
          kicker="Detailed Pipeline"
          title="Step-by-Step Restructuring"
          lede="The step-by-step demerger pipeline involves three logical stages of execution."
        />

        <div className="mt-6 space-y-3 max-w-md">
          {stagesData.map((stage, idx) => (
            <div
              key={idx}
              className={cn(
                "rounded-lg border transition-colors cursor-pointer p-3",
                activeStage === idx
                  ? "border-accent-gold/30 bg-accent-gold/[0.02]"
                  : "border-white/5 hover:border-white/10"
              )}
              onClick={() => setActiveStage(idx)}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                  {stage.title}
                </h4>
                <ChevronDown
                  size={14}
                  className={cn(
                    "text-white/40 transition-transform duration-300",
                    activeStage === idx ? "rotate-180 text-accent-gold" : ""
                  )}
                />
              </div>

              {activeStage === idx && (
                <ul className="mt-3 space-y-2 border-t border-white/5 pt-2 pl-4 list-disc text-[11px] text-white/60 leading-relaxed">
                  {stage.points.map((p, pIdx) => (
                    <li key={pIdx}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 6: VALUE CREATION FACTORS (Upside grid)
   ========================================================================== */
function UpsideScene({ active, controller }: { active: boolean; controller: any }) {
  const factorUpsides = [
    { title: "Better Capital Allocation", detail: "Profits are no longer diverted to support weak divisions; capital is reinvested directly into high-return segments." },
    { title: "Higher Margins & Growth", detail: "Spun-off specialty units reveal their true growth metrics, free from legacy consolidated drag." },
    { title: "Focused Management", detail: "Separate boards can focus 100% on their core business without distraction." },
    { title: "Clearer Strategy", detail: "Strategic directions are simplified, allowing pure-play alignment." },
    { title: "Pure-Play Valuations", detail: "Conglomerate discounts dissolve as the market prices the segments as specialists." },
    { title: "Capital Access", detail: "Standalones can raise capital directly, targeting investors interested in their specific sector." },
    { title: "Independent Balance Sheet", detail: "Debt covenants and cash allocations are customized for each unit." },
    { title: "Relevant Peer Comparisons", detail: "Allows transparent benchmarking against direct peers, attracting proper research coverage." },
  ];

  return (
    <div>
      <SceneHeader
        kicker="Value Drivers"
        title="Why Demergers Create Value"
        lede="One of the biggest misconceptions is that every demerger is automatically a great investment. That is not true. However, when successful, value is unlocked through eight fundamental changes:"
      />

      <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-4 max-w-4xl">
        {factorUpsides.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative rounded-xl border border-white/5 bg-space-panel p-4 hover:border-accent-gold/20 transition-all duration-300"
          >
            <div className="h-1.5 w-6 rounded bg-accent-gold/40 group-hover:bg-accent-gold transition-colors" />
            <h4 className="mt-3 font-black text-xs uppercase tracking-tight text-white leading-snug">
              {f.title}
            </h4>
            <p className="mt-2 text-[10px] text-white/50 leading-relaxed">
              {f.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 7: VALUE DESTRUCTION RISKS (Downside cautionary alert cards)
   ========================================================================== */
function DownsideScene({ active, controller }: { active: boolean; controller: any }) {
  const downsides = [
    {
      title: "Weak Standalone Business",
      detail: "Sometimes the spun-off unit is a weak, structurally declining legacy business designed purely to clean up the parent.",
    },
    {
      title: "Excessive Debt Dumping",
      detail: "Parents often saddle the spun-off entity with disproportionate debt (e.g., Piramal Pharma's initial post-split debt burden).",
    },
    {
      title: "Lack of Scale",
      detail: "Small spun-off companies struggle with standalone administrative costs, losing leverage in procurement.",
    },
    {
      title: "Financial Engineering",
      detail: "Restructurings triggered for temporary multiple hype rather than operational value (e.g., Inox Wind/green wind debt splits).",
    },
    {
      title: "Poor Promoter Governance",
      detail: "Unfavorable promoter shares, cross-holdings, or governance structures that disadvantage minority shareholders.",
    },
  ];

  return (
    <div>
      <SceneHeader
        kicker="Risk Analysis"
        title="Where Things Go Wrong"
        lede="A demerger can also destroy value. Restructurings that occur for the wrong reasons often leave minority shareholders holding holding structural wreckage."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-5 max-w-4xl">
        {downsides.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative rounded-xl border border-red-500/10 bg-space-panel p-4 hover:border-red-500/25 transition-all duration-300"
          >
            <AlertTriangle className="text-red-400/40 group-hover:text-red-400 transition-colors" size={16} />
            <h4 className="mt-3 font-black text-xs uppercase tracking-tight text-white leading-snug">
              {d.title}
            </h4>
            <p className="mt-2 text-[10px] text-white/50 leading-relaxed">
              {d.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 8: OPPORTUNITY ARBITRAGE (How to capture the disconnects)
   ========================================================================== */
function OpportunityScene({ active, controller }: { active: boolean; controller: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <SceneHeader
          kicker="Market Inefficiency"
          title="Turning Disconnects into Opportunity"
          lede="The core opportunity does not lie in the legal filing. It lies in the price dislocation that occurs immediately after approval."
        />
        <p className="mt-4 text-xs text-white/50 leading-relaxed max-w-md">
          Because index funds and large mutual funds are mandated to dump spun-off stocks that fall outside their size thresholds, massive forced selling pressure drives the spin-co price down below its fair valuation.
        </p>
      </div>

      {/* Dislocation Graphic */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[340px] overflow-hidden">
        <div className="w-full max-w-xs space-y-4 font-mono text-[9px] uppercase tracking-wider">
          <div className="border border-white/10 rounded-lg p-3 bg-space-dark/80 relative">
            <span className="text-red-400 font-bold block mb-1">1. Forced Institutional Selling</span>
            <p className="text-[10px] text-white/50 font-sans tracking-normal normal-case">
              Index funds are legally required to dump the new stock. Share price declines rapidly on high volume.
            </p>
          </div>
          <div className="flex justify-center text-white/30 my-1">
            <ChevronDown size={14} />
          </div>
          <div className="border border-white/10 rounded-lg p-3 bg-space-dark/80">
            <span className="text-accent-gold font-bold block mb-1">2. SOTP Disconnect Reveal</span>
            <p className="text-[10px] text-white/50 font-sans tracking-normal normal-case">
              The parent stub trades at a severe discount. Real assets are priced at fractions of direct competitors.
            </p>
          </div>
          <div className="flex justify-center text-white/30 my-1">
            <ChevronDown size={14} />
          </div>
          <div className="border border-accent-gold/30 rounded-lg p-3 bg-accent-gold/[0.02]">
            <span className="text-white font-bold block mb-1">3. Valuation Correction Alpha</span>
            <p className="text-[10px] text-white/50 font-sans tracking-normal normal-case">
              Incentivized promoters deliver operation metrics. Long-term institutional funds buy back, closing the value gap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 9: ENDING CARD (Transition link to Chapter 3: Anatomy)
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
          Structure Dictates
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-balance text-3xl font-black uppercase leading-none tracking-tight text-gradient-gold sm:text-5xl"
        >
          Valuation
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 0.6 } : {}}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mx-auto max-w-lg text-xs leading-relaxed text-white/60 pt-4"
        >
          Now that we understand the legal steps, timeline milestones, and valuation drivers, we dissect the exact mechanics of share ratios and listing math.
        </motion.p>
      </div>

      {/* Chapter 3 Navigation Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 3.8 }}
        className="mt-12"
      >
        <Link
          href="/chapters/the-mechanics"
          className="interactive-control bg-accent-gold hover:bg-accent-gold/90 text-black flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide shadow-2xl"
        >
          <span>Continue to Chapter 3</span>
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
