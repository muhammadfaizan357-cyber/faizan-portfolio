import { scrollToTarget, scrollToTop } from "@/lib/scroll";
import { useEffect, useState } from "react";
import { useRouterState, useNavigate } from "@tanstack/react-router";
import { Home, Mail, Sun, Moon } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";
import {
  WhatsAppIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/site/BrandIcons";

export function FloatingSocialDock() {
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const routerState = useRouterState();
  const navigate = useNavigate();
  const isHomePage = routerState.location.pathname === "/";

  // Synchronize theme with html.dark class
  useEffect(() => {
    const checkDark = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setDark(isDark);
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Track active section on scroll if on home page
  useEffect(() => {
    if (!isHomePage) return;

    let ticking = false;
    const sectionIds = [
      "home",
      "about",
      "stack",
      "projects",
      "services",
      "contact",
    ];

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const scrollPos = window.scrollY + 260;
        let current = "home";
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPos) {
            current = id;
          }
        }
        setActiveSection((prev) => (prev !== current ? current : prev));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
    toast.success(next ? "Switched to Dark Mode" : "Switched to Light Mode");
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHomePage) {
      scrollToTop();
    } else {
      navigate({ to: "/" });
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHomePage) {
      scrollToTarget("#contact");
    } else {
      navigate({ to: "/contact" });
    }
  };

  return (
    <aside
      aria-label="Quick navigation and social links"
      data-floating="true"
      className="fixed right-3 sm:right-2 sm:scale-95 min-[1500px]:right-6 min-[1500px]:scale-100 origin-right top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2.5 sm:gap-3 rounded-full p-2 sm:p-2.5 transition-all duration-300
        bg-white/90 dark:bg-[#080c14]/90
        border border-neutral-200/90 dark:border-blue-500/25
        backdrop-blur-2xl
        shadow-[0_12px_40px_rgba(15,23,42,0.12),inset_0_1px_1.5px_rgba(255,255,255,0.95)]
        dark:shadow-[0_12px_42px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.15)]"
    >
      {/* Home */}
      <a
        href="/#home"
        onClick={handleHomeClick}
        title="Home"
        aria-label="Home"
        className={`group relative flex size-9 sm:size-9.5 items-center justify-center rounded-full transition-all duration-300 ease-out active:scale-90 ${
          isHomePage && activeSection === "home"
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_14px_rgba(37,99,235,0.5),inset_0_1px_1px_rgba(255,255,255,0.6)]"
            : "text-neutral-700 dark:text-white/80 hover:bg-blue-500/15 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110"
        }`}
      >
        <Home className="size-4 stroke-[2.2]" />
        <span className="pointer-events-none absolute right-full mr-3 rounded-lg bg-neutral-900 dark:bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white dark:text-neutral-900 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-md">
          Home
        </span>
      </a>

      {/* GitHub (Official Octocat SVG) */}
      <a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub (@muhammadfaizan01-DEV)"
        aria-label="GitHub Profile"
        className="group relative flex size-9 sm:size-9.5 items-center justify-center rounded-full text-neutral-700 dark:text-white/80 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 hover:scale-110 active:scale-95 transition-all duration-300 ease-out"
      >
        <GitHubIcon className="size-4.5" />
        <span className="pointer-events-none absolute right-full mr-3 rounded-lg bg-neutral-900 dark:bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white dark:text-neutral-900 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-md">
          GitHub
        </span>
      </a>

      {/* LinkedIn (Official LinkedIn SVG) */}
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn Profile"
        aria-label="LinkedIn Profile"
        className="group relative flex size-9 sm:size-9.5 items-center justify-center rounded-full text-neutral-700 dark:text-white/80 hover:bg-[#0A66C2] hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 ease-out"
      >
        <LinkedInIcon className="size-4.5" />
        <span className="pointer-events-none absolute right-full mr-3 rounded-lg bg-[#0A66C2] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-md">
          LinkedIn
        </span>
      </a>

      {/* Contact / Email */}
      <a
        href="/#contact"
        onClick={handleContactClick}
        title="Contact / Email Me"
        aria-label="Contact Me"
        className={`group relative flex size-9 sm:size-9.5 items-center justify-center rounded-full transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${
          (isHomePage && activeSection === "contact") ||
          (!isHomePage && routerState.location.pathname === "/contact")
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_14px_rgba(37,99,235,0.5),inset_0_1px_1px_rgba(255,255,255,0.6)]"
            : "text-neutral-700 dark:text-white/80 hover:bg-blue-500/15 hover:text-blue-600 dark:hover:text-blue-400"
        }`}
      >
        <Mail className="size-4 stroke-[2.2]" />
        <span className="pointer-events-none absolute right-full mr-3 rounded-lg bg-blue-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-md">
          Email / Contact
        </span>
      </a>

      {/* WhatsApp (Official WhatsApp SVG) */}
      <a
        href={profile.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp Direct Chat (+92 302 2679431)"
        aria-label="WhatsApp"
        className="group relative flex size-9 sm:size-9.5 items-center justify-center rounded-full text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-[#25D366] hover:text-white hover:shadow-[0_4px_16px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 ease-out"
      >
        <WhatsAppIcon className="size-4.5" />
        <span className="pointer-events-none absolute right-full mr-3 rounded-lg bg-[#25D366] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-md">
          WhatsApp
        </span>
      </a>

      <div className="w-5 h-px bg-neutral-300 dark:bg-white/15 my-0.5" />

      {/* 3D Soft Tactile Theme Switcher Button */}
      <button
        type="button"
        onClick={toggleTheme}
        title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        aria-label="Toggle theme"
        className="group relative flex size-9 sm:size-9.5 items-center justify-center rounded-full transition-all duration-300 ease-out cursor-pointer active:scale-90
          bg-neutral-100 hover:bg-blue-600 dark:bg-white/[0.08] dark:hover:bg-blue-600
          border border-neutral-300/80 hover:border-blue-500 dark:border-blue-500/35 dark:hover:border-blue-500
          text-neutral-800 hover:text-white dark:text-blue-400 dark:hover:text-white
          shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)]
          dark:shadow-[0_2px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
          hover:shadow-[0_4px_16px_rgba(37,99,235,0.5),inset_0_1px_1px_rgba(255,255,255,0.8)]
          hover:-translate-y-0.5"
      >
        {dark ? (
          <Sun className="size-4 stroke-[2.2] text-cyan-400 group-hover:text-white" />
        ) : (
          <Moon className="size-4 stroke-[2.2]" />
        )}
        <span className="pointer-events-none absolute right-full mr-3 rounded-lg bg-neutral-900 dark:bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white dark:text-neutral-900 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-md">
          {dark ? "Light Mode" : "Dark Mode"}
        </span>
      </button>
    </aside>
  );
}
