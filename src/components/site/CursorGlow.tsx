import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Soft accent halo that trails the cursor on pointer devices. */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const x = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.5 });
  const y = useSpring(my, { stiffness: 120, damping: 20, mass: 0.5 });

  useEffect(() => {
    const fine =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    setEnabled(true);
    const onMove = (event: PointerEvent) => {
      mx.set(event.clientX);
      my.set(event.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="pointer-events-none fixed top-0 left-0 z-[55] -ml-[190px] -mt-[190px] size-[380px] rounded-full opacity-60 blur-[90px] mix-blend-plus-lighter"
    >
      <div className="size-full rounded-full bg-primary/25" />
    </motion.div>
  );
}
