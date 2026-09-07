import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { projects, profile } from "@/data/portfolio";
import { Frame } from "@/components/site/Frame";

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
    return {
      meta: [
        { title: `${project.title} — Case Study by ${profile.name}` },
        { name: "description", content: project.summary },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project, next } = Route.useLoaderData();

  return (
    <div className="pt-22 pb-14 sm:pt-28 sm:pb-18">
      <Frame>
        {/* Back Link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to all projects</span>
        </Link>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="rounded-full bg-primary/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              {project.category}
            </span>
            <span className="rounded-full border border-border px-3.5 py-1 text-xs font-mono font-medium text-muted-foreground">
              {project.year}
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-foreground">
            {project.title}
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-xl text-muted-foreground leading-relaxed">
            {project.summary}
          </p>
        </motion.div>

        {/* Hero Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="my-12 relative aspect-[16/10] w-full overflow-hidden rounded-[2.5rem] border border-border/70 bg-muted shadow-2xl"
        >
          <img
            src={project.image}
            alt={`${project.title} Cover`}
            className="size-full object-cover"
          />
        </motion.div>

        {/* Project Meta Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-y border-border/40 my-10">
          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Client
            </p>
            <p className="font-display text-lg font-bold text-foreground">{project.client || "Confidential"}</p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Role
            </p>
            <p className="font-display text-lg font-bold text-foreground">{project.role}</p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Timeline
            </p>
            <p className="font-display text-lg font-bold text-foreground">{project.year}</p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Services
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-surface/80 border border-border/60 px-2.5 py-0.5 text-xs font-medium text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study Overview & Story */}
        <div className="max-w-3xl space-y-6 my-12">
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground">
            Project Overview
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {project.overview}
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            We collaborated closely with the team to establish a scalable design language, intuitive interaction flows, and pixel-perfect deliverables ready for rapid engineering implementation.
          </p>
        </div>

        {/* Next Project Nav Banner */}
        <div className="mt-20 pt-10 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
              Next Project
            </p>
            <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground">
              {next.title}
            </h3>
          </div>

          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-background transition-all duration-300 hover:scale-105"
          >
            <span>View Case Study</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Frame>
    </div>
  );
}
