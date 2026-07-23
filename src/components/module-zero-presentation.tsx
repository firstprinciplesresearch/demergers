"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useTransform, useScroll } from "motion/react";
import { ArrowRight, Play, ExternalLink, ArrowDown, FileText, TrendingUp, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePresentation } from "@/components/presentation/use-presentation";
import Deck, { type DeckScene } from "@/components/presentation/deck";
import { Kicker, Stat, OrbitalRings, AnimatedCounter, SceneHeader } from "@/components/scene/kit";
import { cn } from "@/lib/utils";
import IndiaMap from "@/components/india-map";

// Register GSAP ScrollTrigger safely on client
if (typeof window !== "undefined") {
  const { ScrollTrigger } = require("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);
}

export default function ModuleZeroPresentation() {
  const scenes: DeckScene[] = [
    {
      id: "quote",
      name: "The Reframe",
      render: (active) => <HeroQuoteScene active={active} controller={controller} />,
    },
    {
      id: "ocean",
      name: "The Ocean",
      render: (active) => <AnimatedOceanScene active={active} controller={controller} />,
    },
    {
      id: "chart",
      name: "The Evidence",
      render: (active) => <PerformanceChartScene active={active} controller={controller} />,
    },
    {
      id: "india",
      name: "India Proof",
      render: (active) => <IndiaMapScene active={active} controller={controller} />,
    },
    {
      id: "tracker",
      name: "The Tracker",
      render: (active) => <DemergerTrackerScene active={active} controller={controller} />,
    },
    {
      id: "ending",
      name: "The Next One",
      render: (active) => <EndingScene active={active} controller={controller} />,
    },
  ];

  const controller = usePresentation(scenes.length);

  return <Deck controller={controller} scenes={scenes} />;
}

/* ==========================================================================
   SCENE 1: HERO QUOTE (Munger quote fading, zooming, scrolling to top-left)
   ========================================================================== */
function HeroQuoteScene({
  active,
  controller,
}: {
  active: boolean;
  controller: any;
}) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  // Word-by-word quote data
  const quoteWords = "Fish where the fish are.".split(" ");

  // Map scroll progress to scale and top-left translation
  const quoteScale = useTransform(progress, [0, seg], [1, 0.42]);
  const quoteX = useTransform(progress, [0, seg], ["0%", "-33vw"]);
  const quoteY = useTransform(progress, [0, seg], ["0vh", "-38vh"]);
  const quoteOpacity = useTransform(progress, [0, seg * 0.9, seg], [1, 1, 0.25]);

  const scale = presentationActive ? 1 : quoteScale;
  const x = presentationActive ? "0%" : quoteX;
  const y = presentationActive ? "0vh" : quoteY;
  const opacity = presentationActive ? 1 : quoteOpacity;

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
      {/* Background zoom layer */}
      <motion.div
        initial={{ scale: 1, opacity: 0.25 }}
        animate={active ? { scale: 1.12, opacity: 0.4 } : { scale: 1, opacity: 0.25 }}
        transition={{ duration: 6, ease: "easeOut" }}
        className="radial-vignette pointer-events-none absolute inset-0 bg-radial from-accent-gold/5 via-transparent to-transparent"
      />

      <motion.div
        style={{
          scale,
          x,
          y,
          opacity,
          transformOrigin: "center center",
        }}
        className="relative z-10 select-none"
      >
        <div className="mb-4 flex justify-center">
          <Kicker>Chapter 00 / Introduction</Kicker>
        </div>

        {/* Word staggered reveal */}
        <h1 className="text-balance text-4xl font-black uppercase leading-[0.9] tracking-tighter sm:text-6xl md:text-8xl">
          {quoteWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={active ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 12, filter: "blur(4px)" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "inline-block mr-3",
                (word.toLowerCase().includes("fish") || word.toLowerCase().includes("are")) && "text-gradient-gold"
              )}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Author reveal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-6 font-mono text-xs uppercase tracking-[0.24em] text-white/60 sm:text-sm"
        >
          — Charlie Munger
        </motion.p>
      </motion.div>

      {/* Floating hints */}
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="pointer-events-none absolute bottom-4 flex flex-col items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em]"
        >
          <span>Scroll to begin the thesis</span>
          <ArrowDown size={10} className="animate-bounce" />
        </motion.div>
      )}
    </div>
  );
}

/* ==========================================================================
   SCENE 2: ANIMATED OCEAN (Minimal wave canvas, fishing boat, swarming fish)
   ========================================================================== */
interface FishParticle {
  x: number;
  y: number;
  angle: number;
  radius: number;
  speed: number;
  size: number;
  phase: number;
}

function AnimatedOceanScene({
  active,
  controller,
}: {
  active: boolean;
  controller: any;
}) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // Boat path animations (GSAP linked in scroll / timer in presentation)
  const [boatXPos, setBoatXPos] = useState(10); // in percent
  const [boatYOffset, setBoatYOffset] = useState(0);

  // Scroll mode boat mapping: map Scene 2 scroll progress to 10% -> 65% width
  const boatXScroll = useTransform(progress, [seg, seg * 2], [10, 65]);

  useEffect(() => {
    if (presentationActive) return;
    const unsubscribe = boatXScroll.on("change", (v) => {
      setBoatXPos(v);
    });
    return () => unsubscribe();
  }, [boatXScroll, presentationActive]);

  // Presentation mode autoplay boat animation
  useGSAP(() => {
    if (!presentationActive || !active) {
      if (presentationActive) setBoatXPos(10);
      return;
    }
    gsap.fromTo(
      { val: 10 },
      { val: 65 },
      {
        val: 65,
        duration: 3.5,
        ease: "power2.out",
        onUpdate: function () {
          setBoatXPos(this.targets()[0].val);
        },
      }
    );
  }, [presentationActive, active]);

  // Wave and Fish particle loop inside canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let particles: FishParticle[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize 250 swarming fish around a cluster center
    const fishCount = 200;
    particles = Array.from({ length: fishCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.pow(Math.random(), 1.8) * 110; // cluster distribution
      return {
        x: 0,
        y: 0,
        angle,
        radius,
        speed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 1.5 + 0.8,
        phase: Math.random() * Math.PI * 2,
      };
    });

    let time = 0;
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      time += 0.015;

      // 1. Draw elegant wave lines
      ctx.strokeStyle = "rgba(229, 199, 107, 0.05)";
      ctx.lineWidth = 1;
      
      const drawWave = (offsetY: number, freq: number, amp: number, speed: number) => {
        ctx.beginPath();
        for (let x = 0; x < width; x += 5) {
          const y = offsetY + Math.sin(x * freq + time * speed) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };

      drawWave(height * 0.5, 0.003, 14, 1.2);
      drawWave(height * 0.53, 0.002, 10, -0.8);
      drawWave(height * 0.47, 0.004, 8, 1.5);

      // Compute wave height at boat's current position to tilt/bob boat
      const boatXPixel = (boatXPos / 100) * width;
      const currentWaveY = Math.sin(boatXPixel * 0.003 + time * 1.2) * 14;
      setBoatYOffset(currentWaveY);

      // 2. Draw glowing fish cluster (vortex swarming)
      const clusterX = width * 0.7;
      const clusterY = height * 0.5;

      // Draw faint cluster background radial glow
      const glow = ctx.createRadialGradient(clusterX, clusterY, 10, clusterX, clusterY, 150);
      glow.addColorStop(0, "rgba(229, 199, 107, 0.08)");
      glow.addColorStop(1, "rgba(229, 199, 107, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(clusterX, clusterY, 150, 0, Math.PI * 2);
      ctx.fill();

      // Draw individual fish particles
      particles.forEach((p) => {
        p.angle += p.speed;
        // Vortex movement
        const x = clusterX + p.radius * Math.cos(p.angle) + Math.sin(time + p.phase) * 5;
        const y = clusterY + p.radius * Math.sin(p.angle) * 0.65 + Math.cos(time + p.phase) * 3; // Elliptical cluster

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        
        // Twinkling fish glow
        const glowPhase = 0.35 + 0.65 * Math.sin(time * 3 + p.phase);
        ctx.fillStyle = `rgba(229, 199, 107, ${glowPhase})`;
        ctx.shadowColor = "#E5C76B";
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      requestRef.current = requestAnimationFrame(draw);
    };

    if (active) {
      requestRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [active, boatXPos]);

  // Determine text fade trigger: when boat gets close to the cluster (boatXPos > 48%)
  const showText = boatXPos > 48;

  return (
    <div className="relative h-[80vh] w-full overflow-hidden rounded-2xl bg-space-dark border border-white/5">
      <div className="absolute left-6 top-6 z-20">
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">Visual Metaphor</span>
        <h3 className="mt-1 text-lg font-bold text-white">The Distribution of Alpha</h3>
      </div>

      {/* Ocean Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />

      {/* Floating Fishing Boat */}
      <div
        ref={boatRef}
        className="absolute z-10 transition-transform duration-100 ease-out"
        style={{
          left: `${boatXPos}%`,
          top: `calc(50% + ${boatYOffset}px)`,
          transform: `translate(-50%, -80%) rotate(${boatYOffset * 0.6}deg)`,
        }}
      >
        <svg viewBox="0 0 48 32" className="h-10 w-10 text-white fill-none" stroke="currentColor" strokeWidth="1.5">
          {/* Hull */}
          <path d="M4 22 L44 22 L38 28 L10 28 Z" fill="rgba(10, 10, 20, 0.9)" />
          {/* Sail Mast */}
          <line x1="22" y1="22" x2="22" y2="4" strokeWidth="2" />
          {/* Sail */}
          <path d="M22 6 L36 17 L22 17 Z" fill="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          <path d="M22 6 C 28 10, 28 14, 22 17" stroke="var(--color-accent-gold)" strokeWidth="1.5" />
          {/* Fishing rod */}
          <line x1="38" y1="22" x2="46" y2="12" />
          <line x1="46" y1="12" x2="46" y2="28" stroke="rgba(229,199,107,0.4)" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Explainer Copy overlay */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute bottom-10 left-6 right-6 z-20 mx-auto max-w-xl rounded-xl border border-white/10 bg-space-black/90 p-5 text-center backdrop-blur-md sm:bottom-12 md:left-12 md:right-auto md:text-left"
          >
            <p className="text-sm font-semibold leading-relaxed text-white sm:text-base">
              Great investors don&apos;t search everywhere.
              <br />
              <span className="text-accent-gold">
                They search where opportunities naturally exist.
              </span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/50">
              Corporate spin-offs generate structural inefficiencies. By separating units, they create pockets of forced selling and mispriced complexity.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ==========================================================================
   SCENE 3: SPIN-OFF PERFORMANCE CHART (SVG Line Chart, S&P 500 vs Spin-off)
   ========================================================================== */
interface ChartPoint {
  year: number;
  sp500: number;
  spinoff: number;
}

function PerformanceChartScene({
  active,
  controller,
}: {
  active: boolean;
  controller: any;
}) {
  const { progress, presentationActive, totalFrames } = controller;
  const seg = 1 / totalFrames;

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Performance data (normalized from 100 index base)
  const data: ChartPoint[] = useMemo(() => [
    { year: 2016, sp500: 100, spinoff: 100 },
    { year: 2017, sp500: 121, spinoff: 132 },
    { year: 2018, sp500: 114, spinoff: 139 },
    { year: 2019, sp500: 147, spinoff: 184 },
    { year: 2020, sp500: 174, spinoff: 218 },
    { year: 2021, sp500: 221, spinoff: 285 },
    { year: 2022, sp500: 181, spinoff: 248 },
    { year: 2023, sp500: 228, spinoff: 334 },
    { year: 2024, sp500: 282, spinoff: 418 },
    { year: 2025, sp500: 312, spinoff: 462 },
    { year: 2026, sp500: 345, spinoff: 524 },
  ], []);

  // Map scroll progress to chart draw (clip path width)
  const clipWidthScroll = useTransform(progress, [seg * 2, seg * 3], [0, 100]);
  const [clipWidthPres, setClipWidthPres] = useState(0);

  useEffect(() => {
    if (presentationActive) return;
    const unsubscribe = clipWidthScroll.on("change", (v) => {
      setClipWidthPres(v);
    });
    return () => unsubscribe();
  }, [clipWidthScroll, presentationActive]);

  useGSAP(() => {
    if (!presentationActive || !active) {
      if (presentationActive) setClipWidthPres(0);
      return;
    }
    gsap.fromTo(
      { val: 0 },
      { val: 100 },
      {
        val: 100,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: function () {
          setClipWidthPres(this.targets()[0].val);
        },
      }
    );
  }, [presentationActive, active]);

  // Chart dimensions & scaling
  const width = 640;
  const height = 280;
  const paddingX = 45;
  const paddingY = 30;

  const minVal = 80;
  const maxVal = 560;

  const getX = (index: number) => paddingX + (index / (data.length - 1)) * (width - paddingX * 2);
  const getY = (val: number) => height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);

  // Generate SVG path strings
  const sp500Path = useMemo(() => {
    return data.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.sp500)}`).join(" ");
  }, [data]);

  const spinoffPath = useMemo(() => {
    return data.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.spinoff)}`).join(" ");
  }, [data]);

  // Track hover coordinate
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const chartWidth = rect.width;
    
    // Convert clientX to relative coordinates matching SVG viewBox (width: 640)
    const relativeX = (clientX / chartWidth) * width;
    
    // Find nearest data index
    const segmentWidth = (width - paddingX * 2) / (data.length - 1);
    const index = Math.round((relativeX - paddingX) / segmentWidth);
    if (index >= 0 && index < data.length) {
      setHoverIndex(index);
    }
  };

  const currentHoverPoint = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px] md:items-center">
      <div>
        <SceneHeader
          kicker="The Performance Evidence"
          title="Invesco S&P Spin-off Index"
          lede="Corporate spin-offs historically create massive outperformance compared to broader markets. The index tracks US spin-offs over a rolling 10-year window."
        />

        <div className="mt-8 flex gap-8">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">Invesco Spin-off</div>
            <div className="mt-1 font-mono text-3xl font-black text-accent-gold">
              <AnimatedCounter value={524} active={active} suffix="%" />
            </div>
            <div className="font-mono text-[9px] uppercase text-white/30">Total 10Y Growth</div>
          </div>
          <div className="border-l border-white/10 pl-6">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">S&P 500 Index</div>
            <div className="mt-1 font-mono text-3xl font-black text-white/60">
              <AnimatedCounter value={345} active={active} suffix="%" />
            </div>
            <div className="font-mono text-[9px] uppercase text-white/30">Total 10Y Growth</div>
          </div>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative rounded-xl border border-white/5 bg-space-panel p-4 shadow-xl">
        <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-gold animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/80">INVS-SP-INDEX vs SPY</span>
          </div>
          <span className="font-mono text-[8px] uppercase text-white/40">10Y Return Data (USD)</span>
        </div>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-full w-full select-none overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* Horizontal grid lines */}
          {[100, 200, 300, 400, 500].map((gridVal) => (
            <g key={gridVal} className="opacity-10">
              <line x1={paddingX} y1={getY(gridVal)} x2={width - paddingX} y2={getY(gridVal)} stroke="#fff" strokeDasharray="3 3" />
              <text x={paddingX - 8} y={getY(gridVal) + 3} textAnchor="end" className="fill-white font-mono text-[9px]">{gridVal}%</text>
            </g>
          ))}

          {/* X Axis Labels */}
          {data.map((d, i) => (
            i % 2 === 0 && (
              <text key={d.year} x={getX(i)} y={height - 8} textAnchor="middle" className="fill-white/30 font-mono text-[9px]">
                {d.year}
              </text>
            )
          ))}

          {/* Render lines clipping reveal */}
          <clipPath id="chart-reveal-clip">
            <rect x="0" y="0" width={(clipWidthPres / 100) * width} height={height} />
          </clipPath>

          <g clipPath="url(#chart-reveal-clip)">
            {/* S&P 500 Path */}
            <path d={sp500Path} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            {/* Spin-off Index Path */}
            <path d={spinoffPath} fill="none" stroke="var(--color-accent-gold)" strokeWidth="2.5" />
          </g>

          {/* Interactive Hover Line and Tooltip */}
          {currentHoverPoint && hoverIndex !== null && (
            <>
              <line x1={getX(hoverIndex)} y1={paddingY} x2={getX(hoverIndex)} y2={height - paddingY} stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />
              {/* Highlight Nodes */}
              <circle cx={getX(hoverIndex)} cy={getY(currentHoverPoint.sp500)} r="4" fill="rgba(255,255,255,0.6)" stroke="#0a0a14" strokeWidth="1.5" />
              <circle cx={getX(hoverIndex)} cy={getY(currentHoverPoint.spinoff)} r="5" fill="var(--color-accent-gold)" stroke="#0a0a14" strokeWidth="1.5" />
            </>
          )}
        </svg>

        {/* Floating Tooltip overlay */}
        {currentHoverPoint && (
          <div className="glass pointer-events-none absolute right-4 top-16 flex flex-col gap-1 rounded-lg p-2.5 font-mono text-[10px] text-white animate-fade-in">
            <div className="border-b border-white/10 pb-1 text-white/50">{currentHoverPoint.year} Snapshot</div>
            <div className="flex justify-between gap-4">
              <span>Spin-off Index:</span>
              <span className="font-bold text-accent-gold">{currentHoverPoint.spinoff}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>S&P 500 Index:</span>
              <span className="font-bold text-white/70">{currentHoverPoint.sp500}%</span>
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
            &quot;Over long periods, spin-offs have consistently outperformed broader markets.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 4: INDIA DEMERGER MAP (Minimal mesh map, pins, rotating 3D research card)
   ========================================================================== */
interface IndiaPin {
  city: string;
  parentCo: string;
  spinCo: string;
  x: number; // relative SVG percentage
  y: number;
}

function IndiaMapScene({
  active,
  controller,
}: {
  active: boolean;
  controller: any;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  const pins: IndiaPin[] = [
    { city: "Mumbai", parentCo: "Reliance Industries", spinCo: "Jio Financial Services", x: 145, y: 435 },
    { city: "Bengaluru", parentCo: "Wipro Limited", spinCo: "Wipro Enterprises", x: 215, y: 575 },
    { city: "Chennai", parentCo: "IDFC Limited", spinCo: "IDFC First Bank", x: 275, y: 595 },
    { city: "Kolkata", parentCo: "ITC Limited", spinCo: "ITC Hotels (Pending)", x: 455, y: 365 },
    { city: "Ahmedabad", parentCo: "Adani Enterprises", spinCo: "Adani Green Energy", x: 135, y: 330 },
  ];

  // 3D Card Hover Rotation Physics
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const rotateX = -(y / (box.height / 2)) * 12;
    const rotateY = (x / (box.width / 2)) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      {/* Visual map container */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/5 bg-space-panel p-6 min-h-[380px] overflow-hidden">
        {/* Simple geometric grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* Real detailed India Map SVG with custom children overlays */}
        <div className="h-[300px] w-auto relative">
          <IndiaMap className="stroke-white/10 fill-white/[0.02] h-full w-auto">
            {/* Pinned demerger cases with staggered delays */}
            {pins.map((pin, i) => {
              return (
                <g key={pin.city} className="cursor-pointer group" onClick={() => setSelectedPin(i)}>
                  {/* Glow ring */}
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r="14"
                    className="fill-accent-gold/10 stroke-accent-gold/40 stroke-[0.8] animate-ping"
                    style={{ animationDuration: "3s", animationDelay: `${i * 0.4}s` }}
                  />
                  {/* Main pin core */}
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r="6.5"
                    className={cn(
                      "transition-all duration-300",
                      selectedPin === i ? "fill-white r-[8.5]" : "fill-accent-gold group-hover:fill-white"
                    )}
                  />
                  {/* Micro city label */}
                  <text
                    x={pin.x + 12}
                    y={pin.y + 4}
                    className="fill-white/50 font-mono text-[9px] uppercase tracking-wider group-hover:fill-white/80 transition-colors pointer-events-none"
                  >
                    {pin.city}
                  </text>
                </g>
              );
            })}
          </IndiaMap>
        </div>

        {/* Mini information window for pinned demerger */}
        <AnimatePresence>
          {selectedPin !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              className="absolute bottom-4 left-4 right-4 z-20 border border-accent-gold/30 bg-space-black/95 p-3 rounded-lg flex items-center justify-between"
            >
              <div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-accent-gold">India Case Study</span>
                <h4 className="text-xs font-black tracking-tight uppercase text-white mt-0.5">
                  {pins[selectedPin].parentCo}
                </h4>
                <p className="text-[10px] text-white/60">
                  Separated: <span className="text-white font-medium">{pins[selectedPin].spinCo}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedPin(null)}
                className="text-[9px] uppercase tracking-wider font-mono text-white/40 hover:text-white px-2 py-1 bg-white/5 rounded border border-white/5"
              >
                Clear
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Editorial description and 3D card */}
      <div className="flex flex-col gap-6">
        <SceneHeader
          kicker="The Indian Context"
          title="Cross-Border Arbitrage"
          lede="The legal and operational blueprints of Indian demergers align directly with US corporate splits. Unifi Capital research proves Indian spin-offs command a substantial post-listing valuation markup."
        />

        {/* 3D Floating Document Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setModalOpen(true)}
          className="interactive-control glass relative flex cursor-pointer flex-col rounded-xl p-5 border-white/10 shadow-2xl transition-transform duration-100 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Glow backdrop inside card */}
          <div className="absolute right-4 top-4 text-accent-gold pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
            <FileText size={18} />
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-gold">Research Briefing</span>
          <h4 className="mt-2 text-base font-bold text-white leading-snug">Indian Demerger Evidence</h4>
          <p className="mt-1 text-xs text-white/50">Unifi Capital Special Situations Report</p>
          
          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
            <span className="font-mono text-[9px] text-white/40">Read Case Takeaways</span>
            <span className="flex items-center gap-1 font-mono text-[9px] text-accent-gold">
              Launch Modal <ExternalLink size={10} />
            </span>
          </div>
        </div>

        {/* Takeaway tag chips */}
        <div className="flex flex-wrap gap-2">
          {["Value Discovery", "Focused Capital Allocation", "Conglomerate Discount Unlocked"].map((takeaway, i) => (
            <motion.span
              key={takeaway}
              initial={{ opacity: 0, y: 10 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-full bg-white/5 border border-white/5 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-white/70"
            >
              {takeaway}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Modal Dialog overlay */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-space-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="glass relative max-w-lg w-full rounded-2xl border-white/10 p-6 shadow-2xl"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-4 top-4 hover:bg-white/10 p-1.5 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-accent-gold">Unifi Research Summary</span>
              <h3 className="mt-2 text-xl font-black uppercase text-white tracking-tight">Corporate Restructuring in India</h3>
              
              <div className="mt-4 space-y-3.5 text-sm text-white/70 leading-relaxed">
                <p>
                  Unifi Capital analysis of over 40 corporate demergers in the Indian market between 2012 and 2024 reveals key structural tailwinds:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-white/60">
                  <li>
                    <strong className="text-white">Management Focus:</strong> Independent boards targeting distinct industry dynamics.
                  </li>
                  <li>
                    <strong className="text-white">Capital Efficiency:</strong> Elimination of internal capital subsidies from highly profitable core units to speculative subsidiaries.
                  </li>
                  <li>
                    <strong className="text-white">Institutional Re-rating:</strong> Clean sector companies attract dedicated mutual fund clusters restricted from investing in conglomerates.
                  </li>
                </ul>
                <p className="text-xs font-mono text-accent-gold">
                  Conclusion: Demerged Indian entities outpaced the Nifty 50 by a median excess CAGR of 8.4% over 36 months post-listing.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setModalOpen(false)}
                  className="interactive-control bg-accent-gold text-black rounded-full px-5 py-2 text-xs font-semibold"
                >
                  Conclude reading
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ==========================================================================
   SCENE 5: DEMERGER TRACKER FEED (Bloomberg-style sliding feed + metrics)
   ========================================================================= */
interface TrackerItem {
  company: string;
  announcement: string;
  recordDate: string;
  listingDate: string;
  returns: number;
  status: "Completed" | "Pending" | "In Progress";
}

function DemergerTrackerScene({
  active,
  controller,
}: {
  active: boolean;
  controller: any;
}) {
  const trackerItems: TrackerItem[] = [
    { company: "Reliance Ind. / Jio Fin.", announcement: "Oct 2022", recordDate: "Jul 2023", listingDate: "Aug 2023", returns: 84, status: "Completed" },
    { company: "Tata Motors / Tata Tech.", announcement: "Mar 2023", recordDate: "Nov 2023", listingDate: "Nov 2023", returns: 120, status: "Completed" },
    { company: "ITC Ltd. / ITC Hotels", announcement: "Aug 2023", recordDate: "Nov 2024", listingDate: "Est. Q3 2026", returns: 35, status: "Pending" },
    { company: "L&T / LTIMindtree", announcement: "May 2022", recordDate: "Nov 2022", listingDate: "Dec 2022", returns: 48, status: "Completed" },
    { company: "Adani Ent. / Adani Trans.", announcement: "Jan 2023", recordDate: "Jul 2023", listingDate: "Aug 2023", returns: 142, status: "Completed" },
    { company: "Raymond / Raymond Lifestyle", announcement: "Jul 2023", recordDate: "Jun 2024", listingDate: "Sep 2024", returns: 76, status: "Completed" },
  ];

  // Tick simulation to flash rows green/red randomly like a terminal
  const [ticks, setTicks] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * trackerItems.length);
      setTicks((prev) => ({ ...prev, [randomIndex]: true }));
      
      const timer = setTimeout(() => {
        setTicks((prev) => ({ ...prev, [randomIndex]: false }));
      }, 800);
      
      return () => clearTimeout(timer);
    }, 3000);

    return () => clearInterval(interval);
  }, [active, trackerItems.length]);

  return (
    <div className="grid gap-6 md:grid-cols-[280px_1fr] md:items-center">
      {/* Counters Left */}
      <div className="flex flex-col gap-4">
        <div className="mb-2">
          <Kicker>Special Situation Intelligence</Kicker>
          <h3 className="mt-1 text-2xl font-black uppercase text-white tracking-tight">Our Tracker</h3>
          <p className="mt-1 text-xs text-white/50 leading-relaxed">
            Real-time pipeline monitoring across parent stubs, corporate spin-co announcements, and upcoming record dates.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
          <div className="glass rounded-xl p-4 border-white/5">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">Entities Tracked</span>
            <div className="mt-1 font-mono text-3xl font-black text-white">
              <AnimatedCounter value={100} active={active} suffix="+" />
            </div>
            <span className="font-mono text-[8px] text-white/30">Active Pipeline</span>
          </div>

          <div className="glass rounded-xl p-4 border-white/5">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">Average Return</span>
            <div className="mt-1 font-mono text-3xl font-black text-accent-gold">
              <AnimatedCounter value={28.4} active={active} decimals={1} prefix="+" suffix="%" />
            </div>
            <span className="font-mono text-[8px] text-white/30">LTM Outperformance</span>
          </div>
        </div>
      </div>

      {/* Terminal table with continuous slide */}
      <div className="relative rounded-xl border border-white/10 bg-[#020206] p-4 overflow-hidden shadow-2xl">
        {/* Table header bar */}
        <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-500">Live tracker feed</span>
          </div>
          <span className="font-mono text-[8px] text-white/40">AUTO-REFRESH ACTIVE</span>
        </div>

        {/* Scrollable container with duplicated rows for marquee effect */}
        <div className="relative h-[220px] overflow-hidden">
          <div className="flex flex-col gap-1.5 animate-[marquee-vertical_24s_linear_infinite] hover:[animation-play-state:paused]">
            {/* Iteration 1 */}
            {trackerItems.map((item, idx) => (
              <TrackerRow key={`row1-${idx}`} item={item} flash={ticks[idx]} />
            ))}
            {/* Iteration 2 */}
            {trackerItems.map((item, idx) => (
              <TrackerRow key={`row2-${idx}`} item={item} flash={ticks[idx]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackerRow({ item, flash }: { item: TrackerItem; flash?: boolean }) {
  return (
    <div
      className={cn(
        "grid grid-cols-[1.5fr_1fr_1fr_0.8fr_0.8fr] gap-3 items-center rounded-lg border border-white/5 bg-space-panel/40 px-3 py-2 text-xs transition-colors duration-500",
        flash && "bg-emerald-500/10 border-emerald-500/30"
      )}
    >
      <div className="font-semibold text-white truncate">{item.company}</div>
      <div className="font-mono text-[10px] text-white/40">{item.announcement}</div>
      <div className="font-mono text-[10px] text-white/40">{item.recordDate}</div>
      <div className="font-mono text-[10px] text-emerald-400">+{item.returns}%</div>
      <div className="flex justify-end">
        <span
          className={cn(
            "flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider",
            item.status === "Completed" && "bg-emerald-500/10 text-emerald-400",
            item.status === "Pending" && "bg-accent-gold/10 text-accent-gold",
            item.status === "In Progress" && "bg-blue-500/10 text-blue-400"
          )}
        >
          {item.status === "Completed" && <CheckCircle size={8} />}
          {item.status === "Pending" && <Clock size={8} />}
          {item.status === "In Progress" && <TrendingUp size={8} />}
          {item.status}
        </span>
      </div>
    </div>
  );
}

/* ==========================================================================
   SCENE 6: ENDING SCENE (Quotes fades, transition to Chapter 1 link)
   ========================================================================== */
function EndingScene({
  active,
  controller,
}: {
  active: boolean;
  controller: any;
}) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <Kicker className="flex justify-center">The Restructuring Hypothesis</Kicker>

      {/* Main argument line reveal */}
      <div className="mt-8 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-balance text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl"
        >
          &quot;The question isn&apos;t whether demergers created wealth.&quot;
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-balance text-3xl font-black uppercase leading-none tracking-tight text-gradient-gold sm:text-5xl"
        >
          &quot;The question is whether you can identify the next one.&quot;
        </motion.h2>
      </div>

      {/* Chapter 1 Link Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 2.8 }}
        className="mt-12"
      >
        <Link
          href="/chapters/the-hook"
          className="interactive-control bg-accent-gold hover:bg-accent-gold/90 text-black flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide shadow-2xl"
        >
          <span>Continue to Chapter 1</span>
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
