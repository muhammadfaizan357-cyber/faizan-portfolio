import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Code2,
  AlertTriangle,
  Wrench,
  Github,
  ExternalLink,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import { projects, profile } from "@/data/portfolio";
import { DevicePreviewPanel } from "@/components/site/DevicePreviewPanel";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const index = projects.findIndex((p) => p.slug === params.slug);
    if (index === -1) throw notFound();
    return {
      project: projects[index]!,
      next: projects[(index + 1) % projects.length]!,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project Not Found" }],
      };
    }
    const { project } = loaderData;
    const pageTitle = `${project.title} — Case Study by ${profile.name}`;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: project.summary },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: project.summary },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project, next } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080c14] text-neutral-900 dark:text-white pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-28 relative overflow-hidden transition-colors duration-300">
      {/* Ambient Blue & Indigo Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-[8%] top-[6%] h-[420px] w-[420px] rounded-full opacity-20 blur-[140px]"
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

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        {/* Top Back Navigation */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/[0.04] hover:border-blue-500/60 hover:bg-blue-50 dark:hover:bg-blue-500/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white/85 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm transition-all"
          >
            <ArrowLeft className="size-4" />
            <span>All Projects</span>
          </Link>

          <Link
            to="/"
            hash="projects"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-blue-500/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-white/65 hover:text-neutral-900 dark:hover:text-white shadow-sm transition-all"
          >
            <span>Back to 3D Deck</span>
          </Link>
        </div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="rounded-full border border-blue-500/40 bg-blue-50 dark:bg-blue-500/15 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 shadow-sm">
              {project.category}
            </span>
            <span className="rounded-full border border-neutral-200 dark:border-white/15 bg-white dark:bg-white/[0.04] px-3.5 py-1 text-xs font-mono font-bold text-neutral-800 dark:text-white/85 shadow-sm">
              {project.year}
            </span>
            {project.liveUrl && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 shadow-sm">
                <span className="size-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                Live Deployed
              </span>
            )}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
                {project.title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm sm:text-lg text-neutral-600 dark:text-white/75 leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Primary Live + GitHub Action Buttons in Header */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 px-6 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-white shadow-[0_8px_25px_rgba(37,99,235,0.35)] hover:scale-105 transition-transform"
                >
                  <ExternalLink className="size-4 stroke-[2.3]" />
                  <span>Open Live App</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-blue-500/50 bg-white dark:bg-blue-500/10 hover:bg-blue-50 dark:hover:bg-blue-600 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-neutral-800 dark:text-blue-400 hover:text-blue-600 dark:hover:text-white shadow-sm transition-all"
                >
                  <Github className="size-4" />
                  <span>GitHub Repo</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Responsive Device Preview Panel (Desktop • Tablet • Mobile View + GitHub Repo) */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="my-10"
        >
          <DevicePreviewPanel project={project} />
        </motion.div>

        {/* Project Meta Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-8 px-6 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#121621]/85 shadow-sm dark:shadow-none my-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
              Project Type
            </p>
            <p className="font-display text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              {project.client || "Full-Stack Application"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
              My Role
            </p>
            <p className="font-display text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              {project.role}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
              Year Built
            </p>
            <p className="font-display text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              {project.year}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">
              Tech Stack Used
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-neutral-200 dark:border-blue-500/30 bg-neutral-100 dark:bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold text-neutral-700 dark:text-blue-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── 10/10 STRUCTURED CASE STUDY: PROBLEM -> WHAT I BUILT -> CHALLENGES ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-12 items-start">
          {/* Left 7 Cols: Problem, Overview & What I Built */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. The Problem */}
            {project.problem && (
              <div className="rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#121621]/90 p-6 sm:p-7 space-y-3 shadow-sm dark:shadow-none">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                  <AlertTriangle className="size-4" />
                  <span>01 • The Problem</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
                  Why This Project Was Needed
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-white/75 leading-[1.8]">
                  {project.problem}
                </p>
              </div>
            )}

            {/* 2. What I Built (Architecture, Auth, API, Database) */}
            <div className="rounded-3xl border border-neutral-200/90 dark:border-blue-500/30 bg-white dark:bg-[#0e1422]/90 p-6 sm:p-7 space-y-4 shadow-sm dark:shadow-none">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                <Code2 className="size-4" />
                <span>02 • What I Built</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
                Architecture, API &amp; Database Implementation
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-white/75 leading-[1.8]">
                {project.overview}
              </p>

              {project.whatIBuilt && project.whatIBuilt.length > 0 && (
                <ul className="space-y-3 pt-2">
                  {project.whatIBuilt.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] p-3.5 text-xs sm:text-sm text-neutral-700 dark:text-white/85"
                    >
                      <CheckCircle2 className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 3. Technical Challenges & How I Solved Them */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#0e1422]/90 p-6 sm:p-7 space-y-4 shadow-sm dark:shadow-none">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                  <Wrench className="size-4" />
                  <span>03 • Engineering Challenges &amp; Solutions</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
                  What Was Hard &amp; How I Solved It
                </h2>
                <div className="space-y-4 pt-1">
                  {project.challenges.map((c, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-black/25 p-4 space-y-2"
                    >
                      <p className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-300">
                        Challenge: {c.challenge}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-white/75 leading-relaxed">
                        <strong className="text-neutral-900 dark:text-white font-semibold">Solution: </strong>
                        {c.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right 5 Cols: Key Highlights, Stack Summary & Action Card */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="rounded-3xl border border-neutral-200/90 dark:border-blue-500/30 bg-white dark:bg-[#0e1422]/90 p-6 sm:p-7 backdrop-blur-xl shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:shadow-xl space-y-5">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Zap className="size-4.5" />
                <h3 className="text-xs font-extrabold uppercase tracking-[0.15em] text-neutral-900 dark:text-white">
                  Key Features Shipped
                </h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-white/80">
                {(project.highlights ?? []).map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {project.metrics && (
                <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-neutral-200/80 dark:border-white/10">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-black/30 p-3 text-center"
                    >
                      <div className="text-xs sm:text-sm font-black text-blue-600 dark:text-blue-400">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-neutral-500 dark:text-white/55 mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-neutral-200/80 dark:border-white/10 flex flex-col gap-2.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.1em] text-white shadow-[0_8px_25px_rgba(37,99,235,0.35)] hover:scale-[1.02] transition-transform"
                  >
                    <ExternalLink className="size-4 stroke-[2.3]" />
                    <span>Visit Live Application</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 dark:border-blue-500/50 bg-white dark:bg-blue-500/10 hover:bg-blue-50 dark:hover:bg-blue-600 px-6 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-neutral-800 dark:text-blue-400 hover:text-blue-600 dark:hover:text-white shadow-sm transition-all"
                  >
                    <Github className="size-4" />
                    <span>View Source / GitHub Profile</span>
                  </a>
                )}

                <Link
                  to="/"
                  hash="contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/[0.04] hover:border-blue-500/60 px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-neutral-800 dark:text-white shadow-sm transition-all"
                >
                  <Layers className="size-4 text-blue-600 dark:text-blue-400" />
                  <span>Discuss a Similar Project</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Next Project Nav Banner */}
        <div className="mt-16 pt-8 border-t border-neutral-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-1">
              Next Case Study
            </p>
            <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
              {next.title}
            </h3>
          </div>

          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.1em] text-white shadow-[0_8px_25px_rgba(37,99,235,0.35)] transition-all duration-200 hover:scale-105"
          >
            <span>Explore Next Project</span>
            <ArrowRight className="size-4 stroke-[2.3] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
