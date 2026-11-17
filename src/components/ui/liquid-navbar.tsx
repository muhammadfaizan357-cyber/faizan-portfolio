import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";

export type LiquidFx = "glow" | "wave" | "spin" | "pop" | "drop" | "plane";

export interface LiquidNavItem {
  label: string;
  icon: ReactNode;
  fx?: LiquidFx;
}

interface LiquidNavbarProps {
  items: LiquidNavItem[];
  active: number;
  onChange: (index: number) => void;
  tone?: "dark" | "light";
}

const fxAnimation: Record<LiquidFx, Record<string, number[]>> = {
  glow: { scale: [1, 1.25, 1] },
  wave: { rotate: [0, -18, 18, -10, 0] },
  spin: { rotate: [0, 360] },
  pop: { scale: [1, 1.35, 0.95, 1] },
  drop: { y: [0, 5, -3, 0] },
  plane: { x: [0, 5, -2, 0], y: [0, -4, 0] },
};

/** Glassy capsule nav with a liquid sliding highlight and per-item icon effects. */
export function LiquidNavbar({ items, active, onChange, tone = "dark" }: LiquidNavbarProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const dark = tone === "dark";

  return (
    <nav
      aria-label="Primary Navigation"
      className={`relative flex items-center gap-1 rounded-full border p-1.5 backdrop-blur-2xl transition-all duration-300 ${
        dark
          ? "border-white/15 bg-[#0c111e]/80 shadow-[0_10px_34px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)]"
          : "border-slate-200/90 bg-white/85 shadow-[0_8px_28px_rgba(15,23,42,0.08),inset_0_1px_1px_#fff]"
      }`}
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const isHover = hovered === i;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onChange(i)}
            onMouseEnter={() => setHovered(i)}
            className={`relative flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 select-none ${
              isActive
                ? "text-white"
                : dark
                  ? "text-slate-300 hover:text-white"
                  : "text-slate-600 hover:text-blue-600"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="liquid-active"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 shadow-[0_4px_16px_rgba(37,99,235,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.35)]"
              />
            )}
            {!isActive && isHover && (
              <motion.span
                layoutId="liquid-hover"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className={`absolute inset-0 rounded-full ${
                  dark ? "bg-white/10" : "bg-blue-500/10"
                }`}
              />
            )}
            <motion.span
              animate={isHover ? fxAnimation[item.fx ?? "pop"] : { scale: 1, rotate: 0, x: 0, y: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="relative z-10 flex items-center justify-center"
            >
              {item.icon}
            </motion.span>
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
