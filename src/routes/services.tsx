import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { services, profile } from "@/data/portfolio";
import { Frame } from "@/components/site/Frame";
import { ProcessSection } from "@/components/site/ProcessSection";
import { FaqSection } from "@/components/site/FaqSection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Services & Pricing — ${profile.name}` },
      {
        name: "description",
        content: `Web design, branding, product design and graphics design services by ${profile.name}. Flat-fee pricing and fast delivery.`,
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="pt-22 pb-14 sm:pt-28 sm:pb-18">
      <Frame>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md mb-4"
          >
            <span className="size-2 rounded-full bg-primary animate-ping" />
            <span className="text-foreground">Capabilities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-foreground"
          >
            What I Offer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Four dedicated creative services designed to elevate your brand presence and increase customer conversion. Flat-fee transparent pricing on all projects.
          </motion.p>
        </div>

        {/* Detailed Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-border/70 bg-surface/40 p-6 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl font-black text-muted-foreground/40 group-hover:text-primary transition-colors">
                    {service.number}
                  </span>
                  <span className="rounded-full border border-border/60 bg-background/80 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {service.tagline}
                  </span>
                </div>

                <div className="my-6 relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted/60 border border-border/40">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>

                <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border/40">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
                  Scope & Deliverables:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="size-2.5" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Frame>

      {/* Process */}
      <ProcessSection />

      {/* FAQs */}
      <FaqSection />

      {/* Bottom CTA */}
      <Frame className="mt-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground px-6 py-16 text-center text-background sm:px-12 sm:py-20 shadow-2xl">
          <video
            src="https://framerusercontent.com/assets/YPFx7qAc2UGdUn03CPT6hmYY.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 size-full object-cover opacity-35 pointer-events-none"
          />
          <div className="relative z-10">
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              Ready to Discuss Your Project?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-xs sm:text-base text-white/80">
              Get in touch today for a free discovery conversation and flat-fee estimate.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-2xl hover:scale-105 transition-transform"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );
}
