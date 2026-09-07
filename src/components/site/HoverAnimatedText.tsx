import { motion } from "framer-motion";

interface HoverAnimatedTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

export function HoverAnimatedText({
  text,
  className = "",
  wordClassName = "",
}: HoverAnimatedTextProps) {
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.3em] gap-y-[0.15em] ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex whitespace-nowrap overflow-visible">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className={`inline-block transition-colors duration-200 cursor-default select-none ${wordClassName}`}
              whileHover={{
                scale: 1.35,
                y: -6,
                color: "var(--color-primary, #00bdf1)",
                textShadow: "0 0 16px rgba(0, 189, 241, 0.6)",
              }}
              transition={{
                type: "spring",
                stiffness: 450,
                damping: 15,
                mass: 0.5,
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

export function HoverParagraph({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <p className={`flex flex-wrap gap-x-[0.35em] gap-y-[0.2em] leading-relaxed ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block rounded-md px-1 py-0.5 -mx-0.5 transition-all duration-200 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:border-primary/30"
          whileHover={{
            scale: 1.08,
            y: -2,
            color: "var(--color-primary, #00bdf1)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export default HoverAnimatedText;
