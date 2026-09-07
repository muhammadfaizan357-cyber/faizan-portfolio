import { useEffect, useRef } from "react";

/**
 * useReveal — lightweight IntersectionObserver scroll reveal hook.
 * Adds .is-visible to elements with .reveal / .reveal-left / .reveal-right.
 * Zero Framer Motion cost, GPU-only CSS transitions = buttery 60fps.
 */
export function useReveal(rootMargin = "0px 0px -60px 0px") {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-left, .reveal-right"
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Once visible, stop observing — avoids reverse pop-out
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0.1 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [rootMargin]);

  return ref;
}

/**
 * useRevealSection — attach to a section's container div ref.
 * All .reveal children inside will animate in on scroll.
 */
export function useRevealSection() {
  return useReveal("0px 0px -40px 0px");
}
