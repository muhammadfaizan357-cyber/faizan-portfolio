import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/portfolio";

export function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const dismissedRef = useRef(false);

  const dismiss = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setProgress(100);
    setIsLoading(false);
    try {
      sessionStorage.setItem("mf_portfolio_loaded", "true");
    } catch {
      // Ignore storage errors in private browsing/sandboxed iframes
    }
  };

  useEffect(() => {
    setMounted(true);

    // Check if user already saw the intro loader in current session
    try {
      const hasLoaded = sessionStorage.getItem("mf_portfolio_loaded");
      if (hasLoaded) {
        setIsLoading(false);
        dismissedRef.current = true;
        return;
      }
    } catch {
      // Ignore storage errors
    }

    // Hard failsafe: Unconditionally dismiss so it NEVER blocks user
    const failsafeTimer = setTimeout(() => {
      dismiss();
    }, 900);

    const duration = 550; // Smooth 550ms intro
    const startTime = performance.now();
    let frameId: number;

    const updateCounter = (currentTime: number) => {
      if (dismissedRef.current) return;
      const elapsed = currentTime - startTime;
      const t = Math.min(1, elapsed / duration);

      // Smooth easeOutCubic
      const easedT = 1 - Math.pow(1 - t, 3);
      const currentVal = Math.min(100, Math.floor(easedT * 100));
      setProgress(currentVal);

      if (t < 1) {
        frameId = requestAnimationFrame(updateCounter);
      } else {
        setProgress(100);
        setTimeout(() => {
          dismiss();
        }, 80);
      }
    };

    frameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(failsafeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: {
              duration: 0.28,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          onClick={dismiss}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-[#08090b] px-6 py-12 text-white select-none overflow-hidden cursor-pointer"
        >
          {/* Background Ambient Glow */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-primary/15 blur-[140px]" />

          {/* Top Status */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono text-white/70 backdrop-blur-md">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Full-Stack Development Portfolio</span>
          </div>

          {/* Center: Monogram Logo & Name */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-4 max-w-md">
            {/* Monogram Badge */}
            <div className="relative flex size-20 items-center justify-center rounded-3xl border border-primary/40 bg-surface/50 p-4 backdrop-blur-xl shadow-2xl shadow-primary/20">
              <div className="absolute inset-0 rounded-3xl bg-primary/10 animate-pulse" />
              <span className="font-display text-3xl font-black tracking-wider text-primary">
                MF
              </span>
            </div>

            {/* Name & Role */}
            <div className="space-y-1">
              <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                {profile.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">
                PHP / Laravel & Web Developer
              </p>
            </div>

            {/* Glowing Loading Progress Bar */}
            <div className="w-full max-w-[260px] pt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10 p-0.5 border border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-emerald-400 to-primary transition-all duration-75 ease-out shadow-lg shadow-primary/50"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Click to skip hint */}
            <p className="text-[11px] text-white/40 tracking-wider uppercase font-mono pt-1">
              Click anywhere to skip
            </p>
          </div>

          {/* Bottom Row: Percentage Counter & Location */}
          <div className="flex w-full max-w-[1240px] items-center justify-between text-xs text-white/50 font-mono">
            <span>{profile.location}</span>
            <span className="text-base sm:text-lg font-bold text-primary font-mono tabular-nums">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
