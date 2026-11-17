import { Link } from "@tanstack/react-router";
import { Sparkles, ShieldCheck, ArrowUpRight, Terminal, Layers, Zap } from "lucide-react";
import { Lanyard } from "./Lanyard";
import cardFront from "@/assets/card-front.svg";
import cardBack from "@/assets/card-back.svg";

export function LanyardBadgeSection() {
  return (
    <section
      id="credentials"
      className="relative w-full py-8 sm:py-12 overflow-hidden bg-background border-t border-border/40"
    >
      {/* Lightweight static ambient glow (no scroll-scale repaints) */}
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 size-[380px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(8,185,212,0.12)_1px,transparent_1px)] [background-size:32px_32px] opacity-35 pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* ── Left Column: Bold Typography, Minimal Content, Premium Tech Badges ── */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left order-2 lg:order-1">
            {/* 1. Status Eyebrow Badge */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-500 dark:text-emerald-400 shadow-sm w-fit">
                <ShieldCheck className="size-3.5" />
                <span>Verified Developer Pass</span>
                <span className="size-1.5 rounded-full bg-emerald-500 ml-0.5" />
              </div>
            </div>

            {/* 2. Extra Bold Headline */}
            <h2 className="font-display font-black uppercase tracking-tight text-foreground text-4xl sm:text-5xl lg:text-6xl mb-4">
              Identity &amp; <br />
              <span className="bg-gradient-to-r from-primary via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                Architecture
              </span>
            </h2>

            {/* 3. Short Single-Line Punchy Pitch */}
            <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed mb-6 max-w-[440px]">
              Engineered with Laravel 11, robust APIs, and ultra-fast reactive frontend experiences.
            </p>

            {/* 4. Minimalist Tech Tag Row */}
            <div className="flex flex-wrap gap-2.5 mb-7 max-w-[440px]">
              <div className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface/60 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-foreground">
                <Terminal className="size-3.5 text-primary" />
                <span>Laravel Pro</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface/60 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-foreground">
                <Layers className="size-3.5 text-cyan-500" />
                <span>React &amp; PHP</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
                <Zap className="size-3.5" />
                <span>Available</span>
              </div>
            </div>

            {/* 5. High-Impact CTA Buttons */}
            <div className="flex items-center gap-3.5">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-foreground px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-background overflow-hidden transition-transform duration-200 hover:scale-105 active:scale-95 shadow-lg"
              >
                <span>Hire Developer</span>
                <ArrowUpRight className="size-4 text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground transition-colors duration-200 hover:border-primary"
              >
                <span>View Work</span>
              </Link>
            </div>
          </div>

          {/* ── Right Column: 3D Floating Lanyard Card (No laggy scroll-scale wrapper) ── */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative order-1 lg:order-2">
            {/* Interactive hint badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary mb-2 shadow-sm">
              <Sparkles className="size-3" />
              <span>Scroll to Flip Back Side • Drag to Swing • Click to Spin</span>
            </div>

            {/* Seamless 3D Canvas Viewport */}
            <div className="relative w-full h-[460px] sm:h-[510px] lg:h-[540px] flex items-center justify-center">
              <Lanyard
                frontImage={cardFront}
                backImage={cardBack}
                orientation="portrait"
                cardColor="#0a0f1d"
                finish="glossy"
                size={0.72}
                strapLength={0.42}
                strapColor="#080c14"
                strapWidth={0.7}
                metal="silver"
                gravity={0.9}
                elasticity={0.45}
                damping={0.45}
                breeze={0.3}
                interactive={true}
                intro={true}
                flipOnScroll={true}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default LanyardBadgeSection;
