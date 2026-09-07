import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import avatarImg from "@/assets/avatar.png";

export function HeroAvatar({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  // Mouse cursor tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);

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
    <motion.span
      ref={ref}
      style={{
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`inline-flex items-center justify-center align-middle mx-2 sm:mx-4 cursor-pointer select-none relative z-10 ${className}`}
    >
      {/* Glow ambient background ring */}
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl transition-all duration-300 group-hover:bg-primary/40 pointer-events-none" />

      {/* Clean, original 3D avatar with high-definition styling */}
      <motion.img
        src={avatarImg}
        alt="Muhammad Faizan Avatar"
        whileHover={{ scale: 1.12, rotate: 3 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="h-[0.9em] w-auto max-w-[110px] sm:max-w-[150px] lg:max-w-[180px] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_15px_30px_rgba(0,189,241,0.25)] pointer-events-auto"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://framerusercontent.com/images/3NmVs6Ife0wqg36gV9ooKFjyCQE.png";
        }}
      />
    </motion.span>
  );
}

export default HeroAvatar;
