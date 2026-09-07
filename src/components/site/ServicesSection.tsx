import { services } from "@/data/portfolio";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";

export function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-32 border-t border-border/40 relative overflow-hidden">
      {/* Background accent */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px] bg-primary/5 blur-[150px] rounded-full" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16 relative">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-4"
            >
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              What I Offer
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-foreground leading-[0.9]"
            >
              Services &<br />Capabilities
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-sm text-sm sm:text-base text-muted-foreground leading-relaxed sm:text-right"
          >
            Specialized digital craft to take your brand from initial concept to a conversion-ready, high-performance product.
          </motion.p>
        </div>

        {/* Services Grid (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-border/70 bg-surface/40 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/8"
            >
              {/* Top gradient accent bar */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="p-7 sm:p-9">
                {/* Top Row: Number & Tagline */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-4xl sm:text-5xl font-black text-primary/20 group-hover:text-primary/40 transition-colors duration-500 leading-none">
                    {service.number}
                  </span>
                  <span className="rounded-full border border-border/60 bg-background/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-md group-hover:border-primary/40 group-hover:text-primary transition-all duration-300">
                    {service.tagline}
                  </span>
                </div>

                {/* Service Visual Preview */}
                <div className="mb-7 relative aspect-[16/8] w-full overflow-hidden rounded-2xl bg-muted/60 border border-border/40 shadow-inner">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="size-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Floating icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/90 text-primary-foreground shadow-2xl backdrop-blur-md">
                      <ArrowUpRight className="size-5" />
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-7">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="pt-6 border-t border-border/40">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/60 mb-4">
                    What's Included
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/20 group-hover:bg-primary/25 transition-colors duration-300">
                          <Check className="size-3" />
                        </span>
                        <span className="truncate font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
