import { useState } from "react";
import { faqs } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="pt-8 sm:pt-10 pb-12 sm:pb-16 border-t border-border/40">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              <span className="size-1.5 rounded-full bg-primary" />
              Frequently Asked Questions
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-foreground">
              Questions & Answers
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-muted-foreground">
            Got questions about process, timelines, or pricing? Here are answers to common inquiries.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-primary/50 bg-surface/60 shadow-xl shadow-primary/5"
                    : "border-border/70 bg-surface/30 hover:border-border"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 p-6 sm:p-7 text-left"
                >
                  <span className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground">
                    {faq.q}
                  </span>
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/30 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
