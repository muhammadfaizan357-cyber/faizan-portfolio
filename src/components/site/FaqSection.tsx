import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/portfolio";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/site/ScrollReveal";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-20 sm:py-24 border-t border-neutral-200/80 dark:border-white/[0.06] bg-[#f8fafc] dark:bg-[#080c14] text-neutral-900 dark:text-white overflow-hidden select-none transition-colors duration-300">
      <div className="mx-auto max-w-[1340px] px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <Reveal direction="up" className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-[2px] bg-blue-600 dark:bg-blue-400" />
              <span className="text-xs font-bold tracking-[0.24em] text-blue-600 dark:text-blue-400 uppercase">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-900 dark:text-white leading-[1.08]">
              QUESTIONS &amp;{" "}
              <span className="text-blue-600 dark:text-blue-400">
                ANSWERS
              </span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-neutral-600 dark:text-white/65 leading-relaxed">
            Got questions about technologies, timelines, or project scope? Here
            are clear answers to common inquiries.
          </p>
        </Reveal>

        {/* FAQs Accordion */}
        <div className="space-y-3.5 max-w-4xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.42,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-200 ${
                  isOpen
                    ? "border-blue-500/50 dark:border-blue-500/60 bg-white dark:bg-[#0c101a]/95 shadow-[0_12px_32px_rgba(37,99,235,0.12)] dark:shadow-[0_14px_38px_rgba(0,0,0,0.5),0_0_24px_rgba(37,99,235,0.15)]"
                    : "border-neutral-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0c101a]/70 hover:border-blue-500/40 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                >
                  <span
                    className={`font-display text-base sm:text-lg font-extrabold tracking-wide transition-colors ${
                      isOpen
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-neutral-900 dark:text-white"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl border transition-all ${
                      isOpen
                        ? "border-blue-600 bg-blue-600 text-white shadow-[0_0_16px_rgba(37,99,235,0.4)]"
                        : "border-neutral-300 dark:border-white/15 bg-neutral-100 dark:bg-white/[0.04] text-neutral-700 dark:text-blue-400"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="size-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="size-4 stroke-[2.5]" />
                    )}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 text-xs sm:text-sm text-neutral-600 dark:text-white/75 leading-[1.8] border-t border-neutral-200/80 dark:border-white/10">
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

export default FaqSection;
