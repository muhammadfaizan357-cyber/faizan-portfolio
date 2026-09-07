import { stack } from "@/data/portfolio";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Server, Database, Layout, ShoppingCart, Check, Sparkles } from "lucide-react";
import { useRef, MouseEvent } from "react";
import { useRevealSection } from "@/hooks/useReveal";

const skillCategories = [
  {
    title: "Backend & Architecture",
    icon: Server,
    color: "#ff2d20",
    glowColor: "rgba(255,45,32,0.25)",
    gradient: "from-red-500/20 via-red-400/5 to-transparent",
    skills: [
      "PHP (OOP & MVC)",
      "Laravel Framework",
      "RESTful API Design",
      "Authentication & Middleware",
      "CRUD Architecture",
    ],
  },
  {
    title: "Database Systems",
    icon: Database,
    color: "#00bdf1",
    glowColor: "rgba(0,189,241,0.25)",
    gradient: "from-cyan-500/20 via-cyan-400/5 to-transparent",
    skills: [
      "MySQL",
      "Relational Schema Design",
      "Query Optimization",
      "Indexing & Transactions",
      "Data Security",
    ],
  },
  {
    title: "Frontend & UI",
    icon: Layout,
    color: "#a855f7",
    glowColor: "rgba(168,85,247,0.25)",
    gradient: "from-purple-500/20 via-purple-400/5 to-transparent",
    skills: [
      "JavaScript (ES6+)",
      "React",
      "Angular",
      "Tailwind CSS",
      "HTML5 & CSS3",
    ],
  },
  {
    title: "CMS & E-Commerce",
    icon: ShoppingCart,
    color: "#10b981",
    glowColor: "rgba(16,185,129,0.25)",
    gradient: "from-emerald-500/20 via-emerald-400/5 to-transparent",
    skills: [
      "Custom Laravel E-Commerce",
      "WordPress",
      "Shopify",
      "Payment Gateways",
      "Cart & Order Workflows",
    ],
  },
];

/* ─── 3D Tilt Card ─────────────────────────────────────────── */
function TiltCard({
  cat,
  index,
}: {
  cat: (typeof skillCategories)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = cat.icon;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 18 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-14, 14]), springConfig);
  const glowX = useSpring(useTransform(rawX, [-0.5, 0.5], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(rawY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(nx);
    rawY.set(ny);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="cursor-default"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-[2rem] overflow-hidden h-full"
      >
        {/* ── Card base ─────────────────────────────────── */}
        <div
          className="relative h-full rounded-[2rem] border border-white/10 dark:border-white/10 bg-white/80 dark:bg-[#1a1a1a]/90 backdrop-blur-2xl shadow-2xl overflow-hidden"
          style={{
            boxShadow: `0 25px 60px -10px ${cat.glowColor}, 0 0 0 1px rgba(255,255,255,0.08)`,
          }}
        >
          {/* Moving spotlight glow */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${cat.glowColor} 0%, transparent 60%)`,
            }}
          />

          {/* Top gradient strip */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-[2rem]"
            style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}40)` }}
          />

          {/* Background diagonal gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} pointer-events-none`} />

          {/* 3D floating icon (translateZ lifts it forward) */}
          <div className="p-7 sm:p-8 flex flex-col h-full relative z-10">
            {/* Icon block */}
            <div
              className="relative mb-6 self-start"
              style={{ transform: "translateZ(30px)" }}
            >
              <div
                className="flex size-16 items-center justify-center rounded-2xl shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${cat.color}25, ${cat.color}08)`,
                  border: `1.5px solid ${cat.color}40`,
                  boxShadow: `0 8px 32px ${cat.glowColor}, inset 0 1px 0 rgba(255,255,255,0.15)`,
                }}
              >
                <Icon className="size-7" style={{ color: cat.color }} />
              </div>
              {/* Reflection blob behind icon */}
              <div
                className="absolute -inset-2 rounded-3xl blur-xl opacity-40 -z-10"
                style={{ backgroundColor: cat.color }}
              />
            </div>

            {/* Title */}
            <div style={{ transform: "translateZ(20px)" }}>
              <h3
                className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground mb-1"
              >
                {cat.title}
              </h3>
              <div
                className="h-0.5 w-10 rounded-full mb-5"
                style={{ backgroundColor: cat.color }}
              />
            </div>

            {/* Skills List — no bars, just clean pills/checkmarks */}
            <ul className="space-y-2.5 flex-1" style={{ transform: "translateZ(10px)" }}>
              {cat.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-3 group/item">
                  {/* Animated check icon */}
                  <span
                    className="flex size-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover/item:scale-110"
                    style={{
                      borderColor: `${cat.color}50`,
                      backgroundColor: `${cat.color}12`,
                      color: cat.color,
                    }}
                  >
                    <Check className="size-2.5" />
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-foreground/80 group-hover/item:text-foreground transition-colors duration-200">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div
              className="mt-6 pt-4 border-t flex items-center justify-between"
              style={{
                borderColor: `${cat.color}25`,
                transform: "translateZ(15px)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="size-3.5" style={{ color: cat.color }} />
                <span
                  className="text-[11px] font-black uppercase tracking-widest"
                  style={{ color: cat.color }}
                >
                  Verified
                </span>
              </div>
              <span
                className="size-2 rounded-full animate-pulse"
                style={{ backgroundColor: cat.color }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Section ─────────────────────────────────────────── */
export function StackSection() {
  const sectionRef = useRevealSection();
  return (
    <section id="stack" ref={sectionRef as React.RefObject<HTMLElement>} className="py-14 sm:py-20 border-t border-border/40 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 size-[700px] rounded-full bg-red-500 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -right-40 size-[700px] rounded-full bg-primary blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-purple-500 blur-[120px]"
        />
      </div>

      <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16 relative">
        {/* Section Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-4 shadow-sm">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Technical Stack
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-foreground leading-[0.9]">
              Skills &<br />Expertise
            </h2>
          </div>
          <p className="max-w-sm text-sm sm:text-base text-muted-foreground leading-relaxed sm:text-right">
            Core technologies I use to engineer scalable, high-performance full-stack web applications — hover to feel the depth.
          </p>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {skillCategories.map((cat, index) => (
            <TiltCard key={cat.title} cat={cat} index={index} />
          ))}
        </div>

        {/* Tool Pills Row */}
        <div className="reveal reveal-d2 mt-8 sm:mt-10 rounded-2xl border border-border/60 bg-surface/30 backdrop-blur-sm p-5 sm:p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-5 text-center">
            Full Technology Toolbelt
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {stack.map((s, idx) => (
              <motion.span
                key={s.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.035 }}
                whileHover={{ scale: 1.12, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-xs sm:text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-surface/90 hover:shadow-lg cursor-default"
              >
                <span
                  className="size-2 rounded-full shadow-sm"
                  style={{ backgroundColor: s.color }}
                />
                <span>{s.name}</span>
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StackSection;
