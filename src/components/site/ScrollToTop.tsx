import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const shouldShow = window.scrollY > 360;
        setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-50">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll back to top"
        title="Scroll to top"
        className="group flex size-11 items-center justify-center rounded-full border border-blue-500/40 dark:border-blue-500/50 bg-white/95 dark:bg-[#080c14]/90 text-blue-600 dark:text-blue-400 backdrop-blur-xl shadow-[0_8px_24px_rgba(15,23,42,0.12)] dark:shadow-[0_8px_28px_rgba(0,0,0,0.65)] transition-all duration-200 hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:scale-110 active:scale-95 cursor-pointer"
      >
        <ArrowUp className="size-4 stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}

export default ScrollToTop;
