import { useEffect, useRef } from "react";

/**
 * useReveal — lightweight IntersectionObserver scroll reveal hook.
 * Adds .is-visible to elements with .reveal / .reveal-left / .reveal-right.
 * Zero Framer Motion cost, GPU-only CSS transitions = buttery 60fps.
 */
export function useReveal(rootMargin = "250px 0px 50px 0px") {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-left, .reveal-right"
    );
    if (!targets.length) return;

    // Reveal immediately if already within or above the viewport
    const vh = window.innerHeight;
    targets.forEach((t) => {
      const rect = t.getBoundingClientRect();
      if (rect.top < vh + 200) {
        t.classList.add("is-visible");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0 }
    );

    targets.forEach((t) => {
      if (!t.classList.contains("is-visible")) {
        observer.observe(t);
      }
    });

    return () => observer.disconnect();
  }, [rootMargin]);

  return ref;
}

/**
 * useRevealSection — attach to a section's container div ref.
 * All .reveal children inside will animate in smoothly in advance as user scrolls.
 */
export function useRevealSection() {
  return useReveal("250px 0px 50px 0px");
}

