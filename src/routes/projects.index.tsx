import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  Search,
  Sparkles,
  CheckCircle2,
  Zap,
  Database,
  Layers,
} from "lucide-react";
import { projects, profile } from "@/data/portfolio";
import { ProjectCard } from "@/components/site/ProjectCard";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: `Projects & Case Studies — ${profile.name}` },
      {
        name: "description",
        content: `Explore C# / ASP.NET Core, Angular, PHP, Laravel, and E-Commerce case studies built by ${profile.name}.`,
      },
    ],
  }),
  component: ProjectsPage,
});

const FILTER_GROUPS = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.filterGroup).filter(Boolean) as string[])),
];

const stats = [
  { label: "Total Projects", value: `${projects.length} Built`, icon: Layers },
  { label: "Live Deployed", value: "4 Live Apps", icon: Zap },
  { label: "Backend Stacks", value: ".NET & Laravel", icon: Database },
  { label: "Databases", value: "SQL & MySQL", icon: CheckCircle2 },
];

function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat =
        activeCategory === "All" ||
        p.filterGroup === activeCategory ||
        p.category.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch =
        searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.services.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080c14] text-neutral-900 dark:text-white pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-28 relative overflow-hidden transition-colors duration-300">
      {/* Ambient Blue & Indigo Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-[10%] top-[8%] h-[420px] w-[420px] rounded-full opacity-20 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.45) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[8%] bottom-[12%] h-[460px] w-[460px] rounded-full opacity-20 blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(79,70,229,0.38) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1340px] px-5 sm:px-8 lg:px-12">
        {/* Top Back Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/[0.04] hover:border-blue-500/60 hover:bg-blue-50 dark:hover:bg-blue-500/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white/85 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm transition-all"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Home Portfolio</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-4"
          >
            <Sparkles className="size-3.5 text-blue-600 dark:text-blue-400" />
            <span>ENGINEERING PORTFOLIO ARCHIVE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-neutral-900 dark:text-white"
          >
            PROJECTS &amp;{" "}
            <span className="text-blue-600 dark:text-blue-400">CASE STUDIES</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-white/65 leading-relaxed"
          >
            Full-stack applications built with C# / ASP.NET Core, Angular, PHP / Laravel, SQL Server, and MySQL — each with a breakdown of the problem, architecture, and technical solutions.
          </motion.p>
        </div>

        {/* ── FACTUAL METRICS RIBBON ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#0e1422]/85 p-4 sm:p-5 text-center shadow-sm dark:shadow-none backdrop-blur-xl hover:border-blue-500/45 transition-colors"
              >
                <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                  <Icon className="size-4" />
                  <span className="font-display text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                    {s.value}
                  </span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-white/55 block">
                  {s.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* ── SEARCH & CATEGORY FILTERS ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-neutral-200/80 dark:border-white/10">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-blue-600 dark:text-blue-400" />
            <input
              type="text"
              placeholder="Search by technology or project…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-neutral-300 dark:border-white/15 bg-white dark:bg-[#0e1422]/90 pl-11 pr-4 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/45 shadow-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {FILTER_GROUPS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_6px_22px_rgba(37,99,235,0.35)]"
                    : "bg-white dark:bg-white/[0.04] border border-neutral-300 dark:border-white/12 text-neutral-700 dark:text-white/75 hover:text-neutral-900 dark:hover:text-white hover:border-blue-500/50 shadow-sm dark:shadow-none"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-neutral-300 dark:border-white/15 bg-white/50 dark:bg-[#0e1422]/50">
            <p className="text-base font-bold text-neutral-900 dark:text-white mb-2">
              No projects matching your search
            </p>
            <p className="text-xs text-neutral-500 dark:text-white/60 mb-4">
              Try adjusting your search query or category filter
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="rounded-full bg-blue-600 px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-white cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          >
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProjectCard project={project} index={idx} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* CTA Bottom Box */}
        <div className="mt-16 relative overflow-hidden rounded-3xl border border-neutral-200/90 dark:border-blue-500/35 bg-white dark:bg-gradient-to-br dark:from-[#0e1422] dark:via-[#0a0f1c] dark:to-[#060a12] px-6 py-14 text-center sm:px-12 sm:py-16 shadow-[0_20px_50px_rgba(15,23,42,0.06)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
              Have a Project in <span className="text-blue-600 dark:text-blue-400">Mind?</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-white/70 leading-relaxed">
              Let&apos;s build a clean, reliable web application tailored to your goals.
            </p>
            <div className="mt-7 flex justify-center">
              <Link
                to="/"
                hash="contact"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-extrabold uppercase tracking-[0.12em] text-white transition-all duration-300 cursor-pointer select-none
                bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600
                hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500
                border border-blue-400/40
                shadow-[0_4px_16px_rgba(37,99,235,0.4),0_10px_28px_rgba(79,70,229,0.3),inset_0_1px_1.5px_rgba(255,255,255,0.4)]
                hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]"
              >
                <span>Start a Conversation</span>
                <ArrowUpRight className="size-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
