import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/portfolio";
import { AnimatePresence, motion } from "framer-motion";
import { useRevealSection } from "@/hooks/useReveal";

const featured = projects.filter((p) => p.featured).slice(0, 4);
const displayProjects = featured.length >= 3 ? featured : projects.slice(0, 4);

export function FeaturedProjectsSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRevealSection();
  const active = displayProjects[activeIdx];

  return (
    <section
      id="projects"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="pt-10 sm:pt-14 pb-8 sm:pb-10 border-t border-border/40"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-3 shadow-sm">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Featured Work
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-foreground">
              Selected Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground backdrop-blur-md transition-all duration-300 hover:border-primary hover:text-primary self-start sm:self-auto"
          >
            View All Projects
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Tab Selector — horizontal pills like meetfaisal.com */}
        <div className="reveal reveal-d1 flex flex-wrap items-center gap-2 mb-8">
          {displayProjects.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setActiveIdx(i)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeIdx === i
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-[1.04]"
                  : "bg-surface/40 border border-border/60 text-muted-foreground hover:text-foreground hover:border-border/80"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Active Project Card — 2-column split like meetfaisal */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-[2.5rem] border border-border/70 bg-surface/40 backdrop-blur-xl shadow-2xl"
            >
              {/* Left: Info */}
              <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 xl:p-12">
                <div className="space-y-5">
                  {/* Category + Year */}
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {active.category}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">{active.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-foreground leading-tight">
                    {active.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {active.summary}
                  </p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {active.services.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex items-center gap-3">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: active.slug }}
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-bold uppercase tracking-wider text-background shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <ExternalLink className="size-3.5" />
                    Full Case Study
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  {/* Prev / Next */}
                  <div className="flex items-center gap-1.5 ml-auto">
                    <button
                      onClick={() => setActiveIdx((i) => (i === 0 ? displayProjects.length - 1 : i - 1))}
                      className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-surface/50 text-muted-foreground transition-all hover:border-primary hover:text-primary cursor-pointer"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setActiveIdx((i) => (i + 1) % displayProjects.length)}
                      className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-surface/50 text-muted-foreground transition-all hover:border-primary hover:text-primary cursor-pointer"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[360px] lg:min-h-full overflow-hidden bg-muted border-t lg:border-t-0 lg:border-l border-border/50">
                <img
                  src={active.image}
                  alt={active.title}
                  className="size-full object-cover absolute inset-0 transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-surface/30 via-transparent to-transparent lg:from-transparent" />
                {/* Counter */}
                <div className="absolute bottom-4 right-4 rounded-full bg-background/90 border border-border/60 px-3.5 py-1.5 text-[11px] font-mono font-semibold text-muted-foreground backdrop-blur-md">
                  {activeIdx + 1} / {displayProjects.length}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default FeaturedProjectsSlider;
