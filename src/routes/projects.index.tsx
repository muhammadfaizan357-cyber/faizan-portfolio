import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, profile } from "@/data/portfolio";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Frame } from "@/components/site/Frame";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: `Projects & Works — ${profile.name}` },
      {
        name: "description",
        content: `Explore selected client projects, case studies, and visual designs by ${profile.name}.`,
      },
    ],
  }),
  component: ProjectsPage,
});

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="pt-22 pb-14 sm:pt-28 sm:pb-18">
      <Frame>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md mb-4"
          >
            <span className="size-2 rounded-full bg-primary animate-ping" />
            <span className="text-foreground">Selected Portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-foreground"
          >
            Featured Works
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            A curated showcase of high-impact websites, brand identities, and product design systems built for global clients.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                  : "bg-surface/50 border border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Bottom Box */}
        <div className="mt-20 relative overflow-hidden rounded-[2.5rem] bg-foreground px-6 py-16 text-center text-background sm:px-12 sm:py-20 shadow-2xl border border-border/40">
          <video
            src="https://framerusercontent.com/assets/YPFx7qAc2UGdUn03CPT6hmYY.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 size-full object-cover opacity-30 pointer-events-none"
          />
          <div className="relative z-10">
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              Have a Project in Mind?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-xs sm:text-base text-white/80">
              Let's team up to build something extraordinary for your brand.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-2xl hover:scale-105 transition-transform"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );
}
