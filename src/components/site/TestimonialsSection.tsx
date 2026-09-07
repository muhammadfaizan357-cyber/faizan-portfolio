import { useState, useEffect } from "react";
import { testimonials } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useRevealSection } from "@/hooks/useReveal";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const prev = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [autoplay]);

  const sectionRef = useRevealSection();
  const current = testimonials[currentIndex] ?? testimonials[0];
  if (!current) return null;

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="pt-8 sm:pt-10 pb-12 sm:pb-16 border-t border-border/40 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16 relative">
        {/* Section Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 sm:mb-9">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-2.5">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              What My Clients Said
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-foreground leading-[0.9]">
              Client<br />Testimonials
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            {/* Dot indicators */}
            <div className="flex items-center gap-1.5 mr-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoplay(false); setCurrentIndex(i); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-border/60 hover:bg-border"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-surface/50 text-foreground transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-surface/50 text-foreground transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-95 cursor-pointer"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-[2.5rem] border border-border/70 bg-surface/40 backdrop-blur-xl shadow-2xl"
          >
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-12 space-y-8">
              {/* Top: Stars + Quote Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                  <Quote className="size-5" />
                </div>
              </div>

              {/* Quote */}
              <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground leading-[1.15]">
                "{current.quote}"
              </blockquote>

              {/* Author */}
              <div className="pt-6 border-t border-border/40 flex items-center gap-4">
                {/* Avatar initials */}
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 border border-primary/20 text-primary font-display font-black text-lg uppercase shrink-0">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground">
                    {current.name}
                  </h3>
                  <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-0.5">
                    {current.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Video / Portrait */}
            <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[360px] lg:min-h-full overflow-hidden bg-muted border-t lg:border-t-0 lg:border-l border-border/60">
              <video
                src="https://framerusercontent.com/assets/kaZXokE7i93m4gPuO5suJs7pqU.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="size-full object-cover absolute inset-0"
              />
              <img
                src={current.avatar || "https://framerusercontent.com/images/Brmkbsvgw7oq52QXNYK8FUciR0.jpg"}
                alt={current.name}
                className="size-full object-cover absolute inset-0 opacity-0 pointer-events-none"
                onError={(e) => {
                  (e.target as HTMLElement).style.opacity = "1";
                }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-surface/30 via-transparent to-transparent lg:from-transparent lg:via-transparent lg:to-transparent" />
              {/* Testimonial counter badge */}
              <div className="absolute bottom-4 right-4 rounded-full bg-background/90 border border-border/60 px-3.5 py-1.5 text-[11px] font-mono font-semibold text-muted-foreground backdrop-blur-md">
                {currentIndex + 1} / {testimonials.length}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
