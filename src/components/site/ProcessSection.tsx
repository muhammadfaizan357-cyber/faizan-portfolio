import { process } from "@/data/portfolio";
import { motion } from "framer-motion";
import { MessageSquare, Sparkles, Rocket, ArrowRight } from "lucide-react";
import { useRevealSection } from "@/hooks/useReveal";

const stepIcons = [MessageSquare, Sparkles, Rocket];
const stepColors = ["#08b9d4", "#a855f7", "#10b981"];
const stepGradients = [
  "from-cyan-500/10 via-cyan-400/5 to-transparent",
  "from-purple-500/10 via-purple-400/5 to-transparent",
  "from-emerald-500/10 via-emerald-400/5 to-transparent",
];

export function ProcessSection() {
  const sectionRef = useRevealSection();
  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="pt-8 sm:pt-10 pb-12 sm:pb-16 border-t border-border/40 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16 relative">
        {/* Section Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 sm:mb-9">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-2.5">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              How I Work
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-foreground leading-[0.9]">
              Simple<br />3-Step<br />Process
            </h2>
          </div>
          <p className="max-w-sm text-sm sm:text-base text-muted-foreground leading-relaxed sm:text-right">
            A transparent, collaborative workflow engineered to move fast without sacrificing quality or creative craft.
          </p>
        </div>

        {/* Process Steps — connected with arrow line */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Connecting Line (desktop only) */}
          <div className="hidden md:block absolute top-[3.5rem] left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-emerald-500/40 z-0" />

          {process.map((step, index) => {
            const Icon = stepIcons[index] || Sparkles;
            const color = stepColors[index] || "#08b9d4";
            const gradient = stepGradients[index] || stepGradients[0];

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                transition={{ duration: 0.6, delay: index * 0.18 }}
                className="group relative overflow-hidden rounded-[2rem] border border-border/70 bg-surface/40 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 z-10"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative p-7 sm:p-9 flex flex-col h-full">
                  {/* Top Row: Icon + Step Number */}
                  <div className="flex items-start justify-between mb-8">
                    <div
                      className="flex size-14 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                      style={{
                        borderColor: `${color}30`,
                        backgroundColor: `${color}15`,
                        color,
                        boxShadow: `0 0 20px ${color}20`,
                      }}
                    >
                      <Icon className="size-6" />
                    </div>
                    <span
                      className="font-display text-6xl font-black transition-all duration-300 group-hover:scale-110"
                      style={{ color: `${color}25` }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                    {step.body}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center gap-3 pt-5 border-t border-border/40">
                    <span
                      className="text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
                      style={{ color }}
                    >
                      Step {step.number}
                    </span>
                    <ArrowRight
                      className="size-3.5 transition-all duration-300 group-hover:translate-x-1"
                      style={{ color }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 sm:mt-10 text-center"
        >
          <p className="text-xs sm:text-sm text-muted-foreground">
            From kickoff to deployment —{" "}
            <span className="text-primary font-semibold">typically 1–4 weeks</span>{" "}
            depending on project scope.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
