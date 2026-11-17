import { useState, useEffect } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Download, Menu, X, Home, User, Code2, FolderOpen, Briefcase, Mail, Moon, Sun, Github } from "lucide-react";
import { LiquidNavbar, type LiquidNavItem } from "@/components/ui/liquid-navbar";
import { profile } from "@/data/portfolio";
import { toast } from "sonner";
import { scrollToTarget, scrollToTop } from "@/lib/scroll";

interface NavItem {
  id: string;
  label: string;
  hash: string;
  routePath: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", hash: "#home", routePath: "/" },
  { id: "about", label: "About", hash: "#about", routePath: "/about" },
  { id: "stack", label: "Skills", hash: "#stack", routePath: "/#stack" },
  { id: "projects", label: "Projects", hash: "#projects", routePath: "/projects" },
  { id: "services", label: "Services", hash: "#services", routePath: "/services" },
  { id: "contact", label: "Contact", hash: "#contact", routePath: "/contact" },
];

const liquidItems: LiquidNavItem[] = [
  { label: "Home", icon: <Home size={18} />, fx: "glow" },
  { label: "About", icon: <User size={18} />, fx: "wave" },
  { label: "Skills", icon: <Code2 size={18} />, fx: "spin" },
  { label: "Projects", icon: <FolderOpen size={18} />, fx: "pop" },
  { label: "Services", icon: <Briefcase size={18} />, fx: "drop" },
  { label: "Contact", icon: <Mail size={18} />, fx: "plane" },
];

export function SiteHeader() {
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const routerState = useRouterState();
  const navigate = useNavigate();
  const pathname = routerState.location.pathname;
  const isHomePage = pathname === "/";

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

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
    toast.success(next ? "Switched to Dark Mode" : "Switched to Light Mode");
  };

  // Track scroll position for header glass intensity and active section
  useEffect(() => {
    let ticking = false;
    const sectionIds = ["home", "about", "stack", "projects", "services", "contact"];

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const scrolled = window.scrollY > 20;
        setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

        if (isHomePage) {
          const scrollPos = window.scrollY + 240;
          let current = "home";
          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= scrollPos) {
              current = id;
            }
          }
          setActiveSection((prev) => (prev !== current ? current : prev));
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isHomePage) {
      if (item.id === "home") {
        scrollToTop();
        setActiveSection("home");
        return;
      }
      if (scrollToTarget(item.hash)) {
        setActiveSection(item.id);
        return;
      }
    }

    // Subpage navigation
    if (item.id === "home") {
      navigate({ to: "/" });
    } else if (item.id === "stack") {
      navigate({ to: "/" }).then(() => {
        setTimeout(() => {
          scrollToTarget("#stack");
        }, 150);
      });
    } else {
      navigate({ to: item.routePath });
    }
  };

  // Determine active item
  const getIsActive = (item: NavItem) => {
    if (isHomePage) {
      return activeSection === item.id;
    }
    if (item.id === "projects") return pathname.startsWith("/projects");
    if (item.id === "home") return false;
    return pathname.startsWith(item.routePath);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "header-scrolled bg-white/80 dark:bg-[#080c14]/85 backdrop-blur-2xl border-b border-slate-200/80 dark:border-blue-500/15 shadow-[0_4px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] py-3"
          : "header-transparent bg-transparent border-b border-transparent py-4 sm:py-5"
      }`}
    >
      <div className="mx-auto w-full max-w-[1340px] px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Left: Modern Blue/Indigo Monogram + FAIZAN Brand */}
        <Link
          to="/"
          onClick={(e) => {
            if (isHomePage) {
              e.preventDefault();
              scrollToTop();
            }
          }}
          className="flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.02] active:scale-95"
        >
          <div className="relative flex size-9 sm:size-10 items-center justify-center rounded-xl border border-blue-500/30 dark:border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-cyan-500/10 dark:bg-white/[0.04] backdrop-blur-xl shadow-[0_0_24px_rgba(37,99,235,0.2)] group-hover:border-blue-500/75 group-hover:shadow-[0_0_28px_rgba(37,99,235,0.35)] transition-all">
            <svg
              width="22"
              height="22"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <defs>
                <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="50%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <path
                d="M6 6H33L29.5 13H14.5L13 17.5H26.5L23 24.5H10.5L7.5 33H0.5L6 6Z"
                fill="url(#brand-grad)"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base sm:text-lg font-black tracking-[0.16em] text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-none">
              FAIZAN
            </span>
            <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.24em] text-neutral-500 dark:text-white/55 uppercase mt-1">
              FULL-STACK DEV
            </span>
          </div>
        </Link>

        {/* Center: Glassmorphism Floating Capsule Navigation */}
        <div className="hidden md:block">
          <LiquidNavbar
            tone={dark ? "dark" : "light"}
            items={liquidItems}
            active={Math.max(0, navItems.findIndex((item) => getIsActive(item)))}
            onChange={(i) =>
              handleNavClick(
                { preventDefault() {} } as React.MouseEvent<HTMLAnchorElement>,
                navItems[i]!
              )
            }
          />
        </div>

        {/* Right: Pill 'Download CV' + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href="/Muhammad-Faizan-CV.pdf"
            download="Muhammad-Faizan-CV.pdf"
            onClick={() => toast.success("Downloading Muhammad Faizan's CV...")}
            className="group hidden sm:inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer select-none
              bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600
              hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500
              text-white
              border border-blue-400/30 dark:border-cyan-400/30
              shadow-[0_4px_16px_rgba(37,99,235,0.35),0_8px_24px_rgba(79,70,229,0.22),inset_0_1px_1.5px_rgba(255,255,255,0.35)]
              hover:shadow-[0_6px_20px_rgba(37,99,235,0.45),0_12px_32px_rgba(79,70,229,0.35),inset_0_1px_2px_rgba(255,255,255,0.5)]
              hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.97]"
          >
            <Download className="size-3.5 stroke-[2.4] text-white transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span>Download CV</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex size-9.5 items-center justify-center rounded-full border border-neutral-300 dark:border-white/15 bg-white/80 dark:bg-white/[0.04] text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-xs active:scale-95"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#080c14]/98 backdrop-blur-3xl px-6 py-5 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = getIsActive(item);
              return (
                <a
                  key={item.id}
                  href={isHomePage ? item.hash : item.routePath}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600/15 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/30"
                      : "text-neutral-800 dark:text-white/80 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-blue-600 dark:hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="size-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                  )}
                </a>
              );
            })}

            <div className="pt-3 mt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <a
                href="/Muhammad-Faizan-CV.pdf"
                download="Muhammad-Faizan-CV.pdf"
                onClick={() => {
                  setMobileMenuOpen(false);
                  toast.success("Downloading Muhammad Faizan's CV...");
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-blue-500/40 bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(37,99,235,0.35)]"
              >
                <Download className="size-3.5" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
