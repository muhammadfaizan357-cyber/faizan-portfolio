import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Code2, CheckCircle2, ShieldCheck, Terminal } from "lucide-react";
import avatarImg from "@/assets/avatar.png";

interface HeroPortraitProps {
  className?: string;
}

export function HeroPortrait({ className = "" }: HeroPortraitProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 200, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const transX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const transY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none w-full max-w-[500px] mx-auto ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* ── Ambient Studio Backlight & Rings ── */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        {/* Core primary glow */}
        <div className="size-[340px] sm:size-[420px] rounded-full bg-gradient-to-tr from-primary/30 via-cyan-500/20 to-primary/10 blur-[90px] animate-pulse" style={{ animationDuration: "6s" }} />
        {/* Secondary warm accent glow */}
        <div className="absolute size-[260px] sm:size-[320px] rounded-full bg-emerald-500/15 blur-[80px] translate-y-12" />
      </div>

      {/* ── 3D Interactive Canvas Wrapper ── */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: transX,
          y: transY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full flex items-center justify-center"
      >
        {/* Decorative backdrop pedestal ring */}
        <div className="absolute inset-x-8 bottom-6 h-36 rounded-[3rem] bg-gradient-to-t from-primary/10 to-transparent border-b border-primary/20 pointer-events-none -z-10" />

        {/* ── Portrait Container with Smooth Blur-up Reveal ── */}
        <div className="relative w-[300px] sm:w-[380px] lg:w-[420px] h-[400px] sm:h-[500px] lg:h-[550px] flex items-end justify-center overflow-visible">
          {/* Skeleton / Ambient Shimmer during load */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-64 rounded-full bg-primary/10 blur-2xl animate-pulse" />
            </div>
          )}

          {/* High-definition Avatar Image with smooth transition */}
          <motion.img
            src={avatarImg}
            alt="Muhammad Faizan"
            onLoad={() => setIsLoaded(true)}
            initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              scale: isLoaded ? 1 : 0.94,
              filter: isLoaded ? "blur(0px)" : "blur(12px)",
            }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_25px_45px_rgba(8,185,212,0.25)] pointer-events-none"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://framerusercontent.com/images/3NmVs6Ife0wqg36gV9ooKFjyCQE.png";
            }}
          />

          {/* Smooth bottom fade mask for clean grounding */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
        </div>

        {/* ── Floating Badge 1: Role & Tech (Top-Right) ── */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ transform: "translateZ(45px)" }}
          className="absolute -top-2 right-2 sm:right-4 z-20"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3 rounded-2xl border border-border/80 bg-background/85 px-4 py-2.5 shadow-xl backdrop-blur-xl"
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
              <Terminal className="size-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                Full-Stack Dev
              </div>
              <div className="text-[10px] font-medium text-muted-foreground">
                Laravel • PHP • React
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Floating Badge 2: Stats & Quality (Bottom-Left) ── */}
        <motion.div
          initial={{ opacity: 0, x: -20, y: 15 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{ transform: "translateZ(55px)" }}
          className="absolute bottom-16 -left-2 sm:-left-4 z-20"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="flex items-center gap-3 rounded-2xl border border-border/80 bg-background/85 px-4 py-3 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
              <Sparkles className="size-5" />
            </div>
            <div>
              <div className="font-display text-lg font-black text-foreground tabular-nums leading-none">
                15<span className="text-primary">+</span> Projects
              </div>
              <div className="text-[10px] font-semibold text-muted-foreground mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="size-3 text-emerald-500" />
                100% Satisfaction
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Floating Badge 3: Active Status (Bottom-Center) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          style={{ transform: "translateZ(35px)" }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-background/90 px-3.5 py-1.5 text-[11px] font-bold text-emerald-400 backdrop-blur-md shadow-lg">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span>Available for Work</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroPortrait;
