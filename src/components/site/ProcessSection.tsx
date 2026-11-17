import { process } from "@/data/portfolio";
import { motion } from "framer-motion";
import { MessageSquare, Code2, Rocket, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/ScrollReveal";

const stepIcons = [MessageSquare, Code2, Rocket];

export function ProcessSection() {
  return (
    <section className="relative py-20 sm:py-24 border-t border-neutral-200/80 dark:border-white/[0.06] bg-[#f8fafc] dark:bg-[#080c14] text-neutral-900 dark:text-white overflow-hidden select-none transition-colors duration-300">
      {/* Subtle Blue & Indigo Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[620px] rounded-full opacity-15 blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.35) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1340px] px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <Reveal direction="up" className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-[2px] bg-blue-600 dark:bg-blue-400" />
              <span className="text-xs font-bold tracking-[0.24em] text-blue-600 dark:text-blue-400 uppercase">
                HOW I WORK
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-900 dark:text-white leading-[1.08]">
              DEVELOPMENT{" "}
              <span className="text-blue-600 dark:text-blue-400">
                WORKFLOW
              </span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-neutral-600 dark:text-white/65 leading-relaxed">
            A transparent, 3-stage engineering process built to deliver clean
            code, secure APIs, and production stability on time.
          </p>
        </Reveal>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {process.map((step, index) => {
            const Icon = stepIcons[index] || Code2;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 26, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.46,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#0c101a]/95 p-6 sm:p-8 backdrop-blur-xl shadow-[0_12px_35px_-12px_rgba(15,23,42,0.08)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.5)] space-y-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/55 hover:shadow-[0_20px_45px_rgba(37,99,235,0.15)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_28px_rgba(37,99,235,0.2)]"
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] opacity-35 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-blue-500/35 dark:border-blue-500/40 bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Icon className="size-5 stroke-[2.2]" />
                    </div>
                    <span className="font-display text-3xl font-black text-neutral-200 dark:text-white/25 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-white/70 leading-[1.75]">
                      {step.body}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200/80 dark:border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="size-4" />
                    <span>Stage {step.number} of 03</span>
                  </span>
                  <span className="h-1.5 w-12 rounded-full bg-blue-500/20 dark:bg-blue-500/30 overflow-hidden">
                    <span
                      className="block h-full bg-blue-600 dark:bg-blue-500"
                      style={{ width: `${((index + 1) / 3) * 100}%` }}
                    />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
