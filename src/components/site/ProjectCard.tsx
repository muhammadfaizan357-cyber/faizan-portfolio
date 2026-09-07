import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/data/portfolio";
import { RollingWord } from "./RollingText";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-border/70 bg-surface/40 p-5 sm:p-7 backdrop-blur-xl transition-all duration-500 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer block"
      >
        {/* Project Thumbnail Image Container with Zoom & Floating Arrow */}
        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2rem] bg-muted mb-6 border border-border/50">
          <img
            src={project.image}
            alt={project.title}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />

          {/* Glowing gradient hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Floating Circle Arrow Badge */}
          <div className="absolute top-4 right-4 flex size-12 items-center justify-center rounded-full border border-white/20 bg-background/80 text-foreground backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-lg">
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          {/* Year Tag Badge */}
          <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-background/80 px-3 py-1 text-xs font-mono font-medium text-foreground backdrop-blur-md">
            {project.year}
          </div>
        </div>

        {/* Project Info */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {project.category}
              </p>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground transition-colors group-hover:text-primary">
              <RollingWord text={project.title} />
            </h3>

            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
              {project.summary}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
