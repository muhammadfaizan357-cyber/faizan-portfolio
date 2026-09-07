import { motion } from "framer-motion";

interface RollingTextProps {
  text: string;
  className?: string;
  isHovered?: boolean;
}

export function RollingText({ text, className = "" }: RollingTextProps) {
  const letters = Array.from(text);

  return (
    <span className={`inline-flex overflow-hidden relative ${className}`}>
      <span className="inline-flex">
        {letters.map((char, index) => (
          <motion.span
            key={index}
            className="inline-block relative"
            initial={{ y: 0 }}
            whileHover={{ y: "-100%" }}
            transition={{
              duration: 0.3,
              delay: index * 0.02,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            <span className="block">{char === " " ? "\u00A0" : char}</span>
            <span className="absolute top-full left-0 block text-primary font-bold">
              {char === " " ? "\u00A0" : char}
            </span>
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export function RollingWord({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`inline-block relative overflow-hidden h-[1.2em] leading-none ${className}`}>
      <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span className="block h-[1.2em] flex items-center">{text}</span>
        <span className="block h-[1.2em] flex items-center text-primary font-bold">{text}</span>
      </span>
    </span>
  );
}
