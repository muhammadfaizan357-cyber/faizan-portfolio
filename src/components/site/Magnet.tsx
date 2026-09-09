import { useRef, useState, useEffect, type ReactNode, type CSSProperties } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  style?: CSSProperties;
}

export function Magnet({
  children,
  strength = 4,
  activeTransition = "transform 0.15s ease-out",
  inactiveTransition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
  className = "",
  style = {},
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) / strength;
    const distY = (e.clientY - centerY) / strength;

    el.style.transition = activeTransition;
    el.style.transform = `translate3d(${distX}px, ${distY}px, 0)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = inactiveTransition;
    el.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

export default Magnet;
