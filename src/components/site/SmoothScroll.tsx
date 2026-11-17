import { useEffect } from "react";

/** Inertial smooth scrolling (Lenis). Skipped for reduced-motion users. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let disposed = false;
    let instance: {
      raf: (t: number) => void;
      destroy: () => void;
      scrollTo: NonNullable<Window["__lenis"]>["scrollTo"];
    } | null = null;

    void (async () => {
      const { default: Lenis } = await import("lenis");
      if (disposed) return;
      const lenis = new Lenis({
        lerp: 0.085,
        duration: 1.25,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.25,
        infinite: false,
      });
      instance = lenis as unknown as NonNullable<typeof instance>;
      window.__lenis = instance;
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.__lenis = null;
      instance?.destroy();
    };
  }, []);

  return null;
}
