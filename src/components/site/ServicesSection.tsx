import { services } from "@/data/portfolio";
import { motion } from "framer-motion";
import {
  Check,
  Code2,
  ShoppingBag,
  Layers,
  Database,
  Cpu,
} from "lucide-react";
import { Reveal } from "@/components/site/ScrollReveal";

const serviceIcons = [Cpu, Code2, ShoppingBag, Database];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 border-t border-neutral-200/80 dark:border-white/[0.06] bg-[#f8fafc] dark:bg-[#080c14] text-neutral-900 dark:text-white overflow-hidden select-none transition-colors duration-300"
    >
      {/* Ambient Blue Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute right-[10%] top-[10%] h-[420px] w-[420px] rounded-full opacity-20 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.38) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-[6%] bottom-[12%] h-[450px] w-[450px] rounded-full opacity-15 blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(79,70,229,0.32) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1340px] px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <Reveal
          direction="up"
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-[2px] bg-blue-600 dark:bg-blue-400" />
              <span className="text-xs font-bold tracking-[0.24em] text-blue-600 dark:text-blue-400 uppercase">
                WHAT I OFFER
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-900 dark:text-white leading-[1.08]">
              SERVICES &amp;{" "}
              <span className="text-blue-600 dark:text-blue-400">
                CAPABILITIES
              </span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-neutral-600 dark:text-white/65 leading-relaxed">
            Full-stack development — from{" "}
            <strong className="text-neutral-900 dark:text-white font-semibold">
              C# / ASP.NET Core &amp; Angular
            </strong>{" "}
            web applications to custom{" "}
            <strong className="text-neutral-900 dark:text-white font-semibold">
              PHP / Laravel &amp; E-Commerce
            </strong>{" "}
            platforms.
          </p>
        </Reveal>

        {/* Architectural Bento Service Cards — Scannable & Direct */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-7">
          {services.map((service, index) => {
            const Icon = serviceIcons[index] || Layers;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: (index % 2) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#0c101a]/95 p-7 sm:p-8 shadow-[0_12px_35px_-12px_rgba(15,23,42,0.08)] dark:shadow-[0_18px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/45"
              >
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span className="flex size-12 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:border-blue-400/35 dark:bg-blue-500/10 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                        <Icon className="size-5 stroke-[2.1]" />
                      </span>
                      <span className="inline-block rounded-full border border-blue-500/25 bg-blue-500/[0.08] px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {service.tagline}
                      </span>
                    </div>

                    <span className="font-mono text-xs font-bold tracking-widest text-neutral-400 dark:text-white/30">
                      /{service.number}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase leading-tight tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-white/65">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-200/80 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.includes.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 text-xs font-semibold text-neutral-800 dark:text-white/85"
                    >
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        <Check className="size-2.5 stroke-[3]" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
