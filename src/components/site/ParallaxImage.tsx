import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/** Image that drifts inside its frame as the section scrolls past. */
export function ParallaxImage({
  src,
  alt,
  className,
  amount = 12,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  amount?: number;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        style={{ y }}
        className="h-[125%] w-full object-cover"
      />
    </div>
  );
}
