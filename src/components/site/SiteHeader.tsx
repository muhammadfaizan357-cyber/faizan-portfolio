import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Layers, Palette, User, ArrowUpRight, MessageCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { profile } from "@/data/portfolio";
import avatarImg from "@/assets/avatar.png";

const navLinks = [
  { to: "/projects", label: "Projects", icon: Layers },
  { to: "/services", label: "Services", icon: Palette },
  { to: "/about", label: "About", icon: User },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center gap-1 sm:gap-2 rounded-full border bg-background/90 backdrop-blur-2xl shadow-xl transition-all duration-500 ${
          isScrolled
            ? "border-border/80 bg-background/95 shadow-2xl px-3 py-2"
            : "border-border/60 px-3 py-2"
        }`}
      >
        {/* Logo / Avatar Home Link */}
        <Link
          to="/"
          className="group relative flex items-center justify-center shrink-0"
          title="Home"
          aria-label="Home"
        >
          <div className="relative size-9 rounded-full border-2 border-primary/40 bg-muted overflow-hidden transition-transform duration-300 group-hover:scale-110 shadow-md">
            <img
              src={avatarImg}
              alt={profile.name}
              className="size-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://framerusercontent.com/images/3NmVs6Ife0wqg36gV9ooKFjyCQE.png";
              }}
            />
          </div>
          <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
        </Link>

        {/* Divider */}
        <div className="h-5 w-px bg-border/60 mx-1" />

        {/* Nav Links */}
        <nav className="flex items-center gap-0.5">
          {navLinks.map(({ to, label }) => {
            const isActive =
              to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`rounded-full px-3 py-1.5 text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-primary/10 border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface/80"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="h-5 w-px bg-border/60 mx-1" />

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider text-background shadow-md transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="hidden sm:inline">Contact</span>
            <MessageCircle className="size-3.5 sm:hidden" />
          </Link>
        </div>
      </div>
    </header>
  );
}
