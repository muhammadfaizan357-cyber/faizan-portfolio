import { motion, useReducedMotion } from "framer-motion";
import { Download, MousePointerClick } from "lucide-react";
import { Reveal } from "@/components/site/ScrollReveal";
import { FlipCard } from "@/components/site/FlipCard";
import { categories } from "@/components/site/skillsData";

/** Short, factual back-of-card copy. */
const backCopy: Record<string, { lead: string; points: string[] }> = {
  frontend: {
    lead: "Interfaces I build and ship.",
    points: [
      "Angular single-page apps (CookSmart, FanHub Plus)",
      "React & TypeScript components and hooks",
      "Responsive HTML5 / CSS3 & Tailwind layouts",
      "Modern JavaScript (ES6+) & Three.js visuals",
    ],
  },
  backend: {
    lead: "Server-side code behind the UI.",
    points: [
      "C# & ASP.NET Core Web APIs & Entity Framework",
      "PHP 8 & Laravel (MVC, Eloquent ORM, auth, CRUD)",
      "Clean, modular architecture & role-based guards",
    ],
  },
  database: {
    lead: "Where the data lives.",
    points: [
      "SQL Server & MySQL relational schema design",
      "Normalized tables, foreign keys, joins & indexing",
      "Firebase and Azure / RunASP cloud deployments",
    ],
  },
  tools: {
    lead: "How I work day to day.",
    points: [
      "Git & GitHub for version control and collaboration",
      "Docker for repeatable local development setups",
      "VS Code as my daily frontend & Laravel editor",
    ],
  },
  other: {
    lead: "Everything around the code.",
    points: [
      "Postman & Swagger for testing REST endpoints",
      "Visual Studio for C# / ASP.NET Core debugging",
      "Comfortable developing on Linux and Windows",
    ],
  },
};

export function SkillsSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="stack"
      className="relative w-full overflow-hidden bg-neutral-50 py-20 text-neutral-900 transition-colors duration-500 sm:py-28 dark:bg-[#0b0d12] dark:text-white"
    >
      {/* subtle grid + glow (pure CSS, no images) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5] dark:opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.14) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[120px] dark:bg-blue-600/10"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-blue-600 dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-400">
            Skills &amp; Technologies
          </span>
          <h2 className="font-display mt-5 text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Tools I build <span className="text-blue-600 dark:text-blue-400">with</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-white/65">
            The languages, frameworks, databases, and tools I use to build and deploy full-stack applications.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-white/45">
            <MousePointerClick className="size-3.5 text-blue-600 dark:text-blue-400" />
            Hover or tap any card to flip for details
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const back = backCopy[cat.id];
            return (
              <motion.div
                key={cat.id}
                initial={reduce ? false : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <FlipCard
                  label={cat.title}
                  className="h-[320px]"
                  front={
                    <span className="flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[#121621] dark:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]">
                      <span className="flex items-start justify-between">
                        <span className="flex size-12 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-400">
                          <Icon className="size-6" />
                        </span>
                        <span className="font-display text-3xl font-black text-neutral-200 dark:text-white/15">
                          {cat.number}
                        </span>
                      </span>
                      <span>
                        <span className="font-display mb-4 block text-xl font-extrabold tracking-tight">
                          {cat.title}
                        </span>
                        <span className="grid grid-cols-5 gap-2.5">
                          {cat.techs.map((t) => (
                            <span
                              key={t.name}
                              title={t.name}
                              className="flex aspect-square items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 p-2.5 dark:border-white/10 dark:bg-white/[0.04]"
                            >
                              <span className="size-full">{t.renderIcon()}</span>
                            </span>
                          ))}
                        </span>
                      </span>
                    </span>
                  }
                  back={
                    <span className="flex h-full flex-col justify-between rounded-3xl border border-blue-500/40 bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] p-6 text-neutral-900 dark:border-blue-500/45 dark:from-[#0d1527] dark:to-[#080d1a] dark:text-white">
                      <span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                          {cat.title}
                        </span>
                        <span className="font-display mt-2 block text-xl font-extrabold leading-snug">
                          {back?.lead}
                        </span>
                      </span>
                      <span className="space-y-2 text-sm">
                        {back?.points.map((p) => (
                          <span key={p} className="flex items-start gap-2">
                            <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                            <span className="text-neutral-700 dark:text-white/80">{p}</span>
                          </span>
                        ))}
                      </span>
                      <span className="text-xs font-semibold text-neutral-600 dark:text-white/50">
                        {cat.techs.map((t) => t.name).join(" · ")}
                      </span>
                    </span>
                  }
                />
              </motion.div>
            );
          })}

          {/* 6th slot: CV call-to-action */}
          <Reveal direction="scale" delay={0.15} className="h-[320px]">
            <a
              href="/Muhammad-Faizan-CV.pdf"
              download="Muhammad-Faizan-CV.pdf"
              className="group flex h-full flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-blue-500/40 bg-transparent p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-500/10 dark:border-blue-400/40 dark:hover:border-blue-400 dark:hover:bg-blue-500/15"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-[0_10px_24px_rgba(37,99,235,0.35)] transition-transform duration-300 group-hover:scale-110">
                <Download className="size-6" />
              </span>
              <span className="font-display text-xl font-extrabold">Want the full picture?</span>
              <span className="text-sm text-neutral-600 dark:text-white/60">
                Download my CV (PDF)
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
