import { motion, useScroll, useSpring } from "motion/react";

/** Thin reading-progress line pinned under the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed top-0 left-0 z-[60] h-[2px] w-full origin-left bg-primary"
    />
  );
}
