import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Code2,
  ExternalLink,
  CheckCircle2,
  Github,
  FileText,
  FolderGit2,
  Monitor,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import CardSwap, { Card, type CardSwapHandle } from "@/components/ui/CardSwap";
import { Reveal } from "@/components/site/ScrollReveal";
import { DevicePreviewPanel } from "@/components/site/DevicePreviewPanel";

function useIsDark() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  return isDark;
}

export function FeaturedProjectsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const swapRef = useRef<CardSwapHandle | null>(null);
  const navigate = useNavigate();
  const isDark = useIsDark();

  const safeIndex = activeIndex % Math.max(1, projects.length);
  const currentProject = projects[safeIndex] ?? projects[0]!;

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 border-t border-neutral-200/80 dark:border-white/[0.06] bg-[#f8fafc] dark:bg-[#080c14] text-neutral-900 dark:text-white overflow-hidden select-none transition-colors duration-300"
    >
      {/* Ambient Blue & Indigo Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-[8%] top-[12%] h-[420px] w-[420px] rounded-full opacity-20 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[6%] bottom-[10%] h-[460px] w-[460px] rounded-full opacity-20 blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(79,70,229,0.35) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1340px] px-5 sm:px-8 lg:px-12">
        {/* ── Clean Section Header (No Duplicate Filter Tabs) ── */}
        <Reveal
          direction="up"
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <span className="w-7 h-[2px] bg-blue-600 dark:bg-blue-400" />
              <span className="text-xs font-bold tracking-[0.24em] text-blue-600 dark:text-blue-400 uppercase">
                SELECTED ENGINEERING WORK
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-900 dark:text-white leading-[1.08]">
              FEATURED{" "}
              <span className="text-blue-600 dark:text-blue-400">
                PROJECTS
              </span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-neutral-600 dark:text-white/65 leading-relaxed">
            Drag the front card to swap, click any card in the stack to bring it forward, or select a project below to inspect its full-stack architecture.
          </p>
        </Reveal>

        {/* ── Main Showcase Container (Single Top Bar + Larger 3D CardSwap) ── */}
        <div className="rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#0c101a]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.65)] overflow-hidden">
          {/* Single Unified Top Navigation Bar */}
          <div className="flex items-center justify-between gap-3 px-5 sm:px-8 py-3.5 border-b border-neutral-200/80 dark:border-white/10 bg-neutral-50/90 dark:bg-[#080c14]/85">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              {projects.map((proj, idx) => {
                const isCurrent = idx === safeIndex;
                return (
                  <button
                    key={proj.slug}
                    type="button"
                    onClick={() => {
                      swapRef.current?.goTo(idx);
                      setActiveIndex(idx);
                    }}
                    className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-extrabold shadow-[0_4px_14px_rgba(37,99,235,0.4)]"
                        : "border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-neutral-600 dark:text-white/70 hover:border-blue-500/60"
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-75">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{proj.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:inline-block font-mono text-xs font-bold text-neutral-500 dark:text-white/60 mr-1">
                {String(safeIndex + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => swapRef.current?.prev()}
                aria-label="Previous project card"
                className="flex size-9 items-center justify-center rounded-full border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/[0.05] text-neutral-800 dark:text-white hover:border-blue-500 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="size-4 stroke-[2.4]" />
              </button>
              <button
                type="button"
                onClick={() => swapRef.current?.next()}
                aria-label="Next project card"
                className="flex size-9 items-center justify-center rounded-full border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/[0.05] text-neutral-800 dark:text-white hover:border-blue-500 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight className="size-4 stroke-[2.4]" />
              </button>
            </div>
          </div>

          {/* 12-Column Split Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10 p-6 sm:p-8 lg:p-10">
            {/* Left 5 Columns: Active Project Breakdown */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              <div className="space-y-3.5">
                {/* Category & Live Status Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-blue-500/35 dark:border-blue-500/40 bg-blue-500/10 dark:bg-blue-500/15 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {currentProject.category}
                  </span>
                  <span className="rounded-full border border-neutral-200 dark:border-white/15 bg-neutral-100 dark:bg-white/[0.05] px-2.5 py-0.5 text-[11px] font-mono font-bold text-neutral-700 dark:text-white/80">
                    {currentProject.year}
                  </span>
                  {currentProject.liveUrl && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-700 dark:text-emerald-300">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Deployed
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-neutral-900 dark:text-white leading-tight">
                  {currentProject.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-white/70 leading-relaxed">
                  {currentProject.summary}
                </p>

                {/* Key Highlights */}
                {currentProject.highlights && currentProject.highlights.length > 0 && (
                  <ul className="space-y-2 pt-1">
                    {currentProject.highlights.slice(0, 3).map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs text-neutral-700 dark:text-white/80"
                      >
                        <CheckCircle2 className="size-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {currentProject.services.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] font-bold text-neutral-800 dark:text-white/85"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action CTAs */}
              <div className="pt-4 border-t border-neutral-200/80 dark:border-white/10 flex flex-wrap items-center gap-3">
                <Link
                  to="/projects/$slug"
                  params={{ slug: currentProject.slug }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:scale-[1.03] active:scale-95 transition-transform"
                >
                  <FileText className="size-3.5 stroke-[2.4]" />
                  <span>Read Case Study</span>
                  <ArrowUpRight className="size-4 stroke-[2.4]" />
                </Link>

                {/* Device Preview Switcher Button */}
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/50 bg-blue-500/10 hover:bg-blue-600 hover:text-white px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 transition-all cursor-pointer shadow-xs"
                >
                  <Monitor className="size-3.5 stroke-[2.2]" />
                  <span>Device Preview</span>
                </button>

                {currentProject.liveUrl && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/[0.04] hover:border-emerald-500 hover:text-emerald-500 px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white transition-all"
                  >
                    <ExternalLink className="size-3.5 stroke-[2.3]" />
                    <span>Live Site</span>
                  </a>
                )}

                {currentProject.githubUrl && (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/[0.04] hover:border-blue-500 px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white transition-all"
                  >
                    <Github className="size-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right 7 Columns: Larger, Prominent React Bits <CardSwap /> 3D Stack */}
            <div className="group/cardstack lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[490px]">
              {/* Hover-Only Left / Right Mouse Buttons on the Card Stack */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  swapRef.current?.prev();
                }}
                aria-label="Previous project"
                title="Previous project (Right-click or Left arrow)"
                className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-30 flex size-11 items-center justify-center rounded-full border border-neutral-300/90 dark:border-white/20 bg-white/95 dark:bg-[#080c14]/90 text-neutral-900 dark:text-white shadow-[0_8px_24px_rgba(15,23,42,0.18)] dark:shadow-[0_8px_28px_rgba(0,0,0,0.65)] backdrop-blur-md opacity-0 pointer-events-none group-hover/cardstack:opacity-100 group-hover/cardstack:pointer-events-auto hover:bg-blue-600 hover:border-blue-500 hover:text-white dark:hover:bg-blue-600 transition-all duration-200 cursor-pointer"
              >
                <ChevronLeft className="size-5 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  swapRef.current?.next();
                }}
                aria-label="Next project"
                title="Next project (Left-click or Right arrow)"
                className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-30 flex size-11 items-center justify-center rounded-full border border-neutral-300/90 dark:border-white/20 bg-white/95 dark:bg-[#080c14]/90 text-neutral-900 dark:text-white shadow-[0_8px_24px_rgba(15,23,42,0.18)] dark:shadow-[0_8px_28px_rgba(0,0,0,0.65)] backdrop-blur-md opacity-0 pointer-events-none group-hover/cardstack:opacity-100 group-hover/cardstack:pointer-events-auto hover:bg-blue-600 hover:border-blue-500 hover:text-white dark:hover:bg-blue-600 transition-all duration-200 cursor-pointer"
              >
                <ChevronRight className="size-5 stroke-[2.5]" />
              </button>

              <CardSwap
                ref={swapRef}
                width={640}
                height={400}
                cardDistance={24}
                verticalDistance={28}
                depth={65}
                skewAmount={0}
                visibleCards={3}
                delay={4500}
                autoplay={false}
                pauseOnHover={true}
                draggable={true}
                speed={1.05}
                bounce={0.26}
                parallax={0.3}
                hoverSpread={0.12}
                dim={0.36}
                cardRadius={20}
                theme={isDark ? "dark" : "light"}
                onChange={(newIdx) => setActiveIndex(newIdx)}
              >
                {projects.map((proj, idx) => (
                  <Card key={proj.slug}>
                    <div className="card-swap-item">
                      {/* Clean, Minimal Card Header */}
                      <div className="card-swap-head justify-between">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="card-swap-icon text-blue-600 dark:text-blue-400">
                            <Code2 className="size-3.5 stroke-[2.2]" />
                          </span>
                          <span className="card-swap-title font-semibold">
                            {proj.title}
                          </span>
                          <span className="hidden sm:inline-block text-xs opacity-55 truncate">
                            — {proj.filterGroup ?? "Full-Stack"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 pr-1">
                          {proj.liveUrl && (
                            <span
                              title="Live Deployed"
                              className="size-2 rounded-full bg-emerald-500"
                            />
                          )}
                          <span className="font-mono text-[11px] font-semibold opacity-60">
                            {String(idx + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
                          </span>
                        </div>
                      </div>

                      {/* Framed Screenshot Media */}
                      <div className="card-swap-media group/media">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          draggable={false}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate({
                              to: "/projects/$slug",
                              params: { slug: proj.slug },
                            });
                          }}
                          className="absolute bottom-3.5 right-3.5 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#080c14]/85 hover:bg-blue-600 text-white hover:text-white border border-white/15 px-4 py-2 text-xs font-bold tracking-wide backdrop-blur-md shadow-lg transition-all cursor-pointer"
                        >
                          <FolderGit2 className="size-3.5 text-blue-400 group-hover/media:text-white" />
                          <span>Case Study</span>
                          <ArrowUpRight className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>

        {/* ── View All Projects Archive Footer Link ── */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-white/60">
            Want to browse all projects side-by-side in a grid with search &amp; category filters?
          </p>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-blue-500/40 dark:border-blue-400/40 bg-white/85 dark:bg-white/[0.04] hover:bg-blue-600 hover:text-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white transition-all"
          >
            <Layers className="size-3.5 text-blue-600 dark:text-blue-400 group-hover:text-white" />
            <span>Open Full Projects Archive</span>
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* ── Device Preview Modal (Desktop • Tablet • Mobile + GitHub Repo) ── */}
      <AnimatePresence>
        {showPreviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setShowPreviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl"
            >
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="absolute top-4 right-4 z-50 flex size-9 items-center justify-center rounded-full bg-black/75 hover:bg-black text-white border border-white/20 transition-all cursor-pointer shadow-lg"
                aria-label="Close Device Preview"
              >
                <X className="size-4" />
              </button>
              <DevicePreviewPanel project={currentProject} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default FeaturedProjectsSlider;
