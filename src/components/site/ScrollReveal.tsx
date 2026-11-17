import { type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Thin accent progress bar that follows page scroll. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
    />
  );
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale";
  delay?: number;
  duration?: number;
  once?: boolean;
}

const OFFSETS = {
  up: { x: 0, y: 32, scale: 1 },
  down: { x: 0, y: -32, scale: 1 },
  left: { x: -36, y: 0, scale: 1 },
  right: { x: 36, y: 0, scale: 1 },
  scale: { x: 0, y: 16, scale: 0.94 },
} as const;

/**
 * Scroll-in reveal. Transform + opacity only (GPU friendly, no blur filter),
 * short distances, and disabled for reduced-motion users.
 */
export function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const o = OFFSETS[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x: o.x, y: o.y, scale: o.scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
