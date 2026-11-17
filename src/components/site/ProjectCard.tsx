import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, ExternalLink, FileText, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="h-full"
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#0c101a]/95 p-5 sm:p-6 backdrop-blur-xl shadow-[0_10px_30px_-12px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/60 hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.18)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(37,99,235,0.2)]">
        {/* Top Blue Highlight Bar */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

        {/* Clickable thumbnail → case study */}
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          aria-label={`Open ${project.title} case study`}
          className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-[#090b10] mb-5 border border-neutral-200/80 dark:border-white/10"
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 dark:from-[#080c14] via-transparent to-transparent opacity-80" />

          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
            <span className="rounded-full border border-blue-500/40 bg-white/90 dark:bg-[#080c14]/85 px-2.5 py-0.5 text-[11px] font-mono font-extrabold text-blue-600 dark:text-blue-400 backdrop-blur-md shadow-sm">
              0{index + 1}
            </span>
            <span className="rounded-full border border-neutral-200 dark:border-white/20 bg-white/90 dark:bg-[#080c14]/85 px-3 py-0.5 text-[11px] font-mono font-semibold text-neutral-800 dark:text-white backdrop-blur-md shadow-sm">
              {project.year}
            </span>
          </div>

          <div className="absolute top-3.5 right-3.5">
            <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 dark:border-white/20 bg-white/90 dark:bg-[#080c14]/85 px-2.5 py-0.5 text-[10px] font-bold text-neutral-800 dark:text-white/80 backdrop-blur-md shadow-sm">
              <Monitor className="size-3 text-blue-600 dark:text-blue-400" />
              <span>Preview</span>
            </span>
          </div>

          <div className="absolute bottom-3.5 left-3.5 right-3.5">
            <span className="inline-block max-w-full truncate rounded-full border border-blue-500/40 bg-white/95 dark:bg-[#080c14]/85 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 backdrop-blur-md shadow-sm">
              {project.category}
            </span>
          </div>
        </Link>

        {/* Project Info */}
        <div className="flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600 dark:text-blue-400 mb-1">
            {project.role}
          </p>

          <h3 className="font-display text-2xl sm:text-[26px] font-black uppercase tracking-tight text-neutral-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
            <Link to="/projects/$slug" params={{ slug: project.slug }}>
              {project.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-white/65 line-clamp-3 mt-2 leading-relaxed">
            {project.summary}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-3.5 space-y-1.5">
              {project.highlights.slice(0, 2).map((h) => (
                <div key={h} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-white/75">
                  <CheckCircle2 className="size-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{h}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.services.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-neutral-200 dark:border-white/10 bg-neutral-100/90 dark:bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold text-neutral-700 dark:text-white/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-4 border-t border-neutral-200/80 dark:border-white/10 grid grid-cols-2 gap-2.5">
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-[0_6px_18px_rgba(37,99,235,0.3)] transition-transform hover:scale-[1.03] active:scale-95"
          >
            <FileText className="size-3.5 stroke-[2.4]" />
            <span>Case Study</span>
          </Link>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-blue-500/60 bg-blue-500/10 px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 transition-all hover:bg-blue-500/20 active:scale-95"
            >
              <ExternalLink className="size-3.5 stroke-[2.4]" />
              <span>Live Site</span>
            </a>
          ) : (
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-300 dark:border-white/20 bg-neutral-100 dark:bg-white/[0.04] px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-white/85 transition-all hover:border-blue-500/60 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95"
            >
              <span>View Details</span>
              <ArrowUpRight className="size-3.5 stroke-[2.4]" />
            </Link>
          )}
        </div>
      </article>
    </motion.div>
  );
}
