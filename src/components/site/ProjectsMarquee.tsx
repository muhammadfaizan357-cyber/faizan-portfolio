import { Link } from "@tanstack/react-router";
import { marqueeGallery } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function ProjectsMarquee() {
  // Triple the items for seamless infinite sliding loop
  const items = [...marqueeGallery, ...marqueeGallery, ...marqueeGallery];

  return (
    <div className="relative w-full overflow-hidden border-y border-border/40 bg-surface/20 py-2 select-none">
      {/* Subtle Side Fade Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 sm:w-36 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 sm:w-36 bg-gradient-to-l from-background to-transparent" />

      {/* Infinite Smooth Sliding Row powered by Framer Motion */}
      <motion.div
        className="flex w-max gap-4 py-4 px-2"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          ease: "linear",
          duration: 30,
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {items.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            to="/projects"
            className="group relative w-[260px] sm:w-[320px] shrink-0 overflow-hidden rounded-2xl border border-border/70 bg-background/80 p-3 transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/10 cursor-pointer block"
          >
            {/* Thumbnail Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted/80">
              <img
                src={item.image}
                alt={item.title}
                loading="eager"
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80";
                }}
              />
              {/* Category Pill */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md text-foreground border border-border/60 shadow-sm">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Title & Arrow Row */}
            <div className="mt-3 flex items-center justify-between px-1">
              <h4 className="font-display text-sm sm:text-base font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors truncate">
                {item.title}
              </h4>
              <span className="ml-2 flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:scale-110">
                <ArrowUpRight className="size-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

export default ProjectsMarquee;
