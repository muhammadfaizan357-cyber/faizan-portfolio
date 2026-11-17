/**
 * One place for programmatic scrolling.
 * Uses Lenis (when running) so anchor clicks glide with the same easing as
 * wheel scrolling; falls back to native smooth scroll otherwise.
 */
type LenisLike = {
  scrollTo: (
    target: number | string | HTMLElement,
    opts?: { offset?: number; duration?: number; immediate?: boolean },
  ) => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike | null;
  }
}

const HEADER_OFFSET = -88;

export function scrollToTarget(selector: string) {
  if (typeof window === "undefined") return false;
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return false;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.2 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
  return true;
}

export function scrollToTop() {
  if (typeof window === "undefined") return;
  if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.1 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
