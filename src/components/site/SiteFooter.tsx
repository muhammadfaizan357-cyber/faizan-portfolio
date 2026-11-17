import { scrollToTarget, scrollToTop } from "@/lib/scroll";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { profile, socials } from "@/data/portfolio";
import { ArrowUpRight, Clock, Code2, Download, Mail } from "lucide-react";
import {
  WhatsAppIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/site/BrandIcons";

const footerNavItems = [
  { label: "Home", hash: "home" },
  { label: "About", hash: "about" },
  { label: "Skills", hash: "stack" },
  { label: "Projects", hash: "projects" },
  { label: "Services", hash: "services" },
  { label: "Contact", hash: "contact" },
];

export function SiteFooter() {
  const [time, setTime] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSectionLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    e.preventDefault();
    if (location.pathname === "/") {
      if (!scrollToTarget("#" + hash)) {
        scrollToTop();
      }
    } else {
      navigate({ to: "/", hash });
    }
  };

  return (
    <footer className="border-t border-neutral-200/80 dark:border-white/10 bg-white dark:bg-[#080c14] text-neutral-900 dark:text-white py-14 sm:py-16 select-none transition-colors duration-300">
      <div className="mx-auto max-w-[1340px] px-5 sm:px-8 lg:px-12">
        {/* Top Row: Brand Identity + Local Karachi Time Pill */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-200/80 dark:border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border border-blue-500/40 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 6H33L29.5 13H14.5L13 17.5H26.5L23 24.5H10.5L7.5 33H0.5L6 6Z"
                    fill="url(#brand-grad-footer)"
                  />
                  <defs>
                    <linearGradient id="brand-grad-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wider text-neutral-900 dark:text-white">
                {profile.name}
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
              {profile.subtitle} • {profile.location}
            </p>
          </div>

          {/* Local Karachi Time Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-200 dark:border-white/12 bg-neutral-100 dark:bg-[#0d1322]/90 px-4 py-2.5 text-xs font-semibold self-start md:self-auto text-neutral-800 dark:text-white">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <Clock className="size-4 text-blue-600 dark:text-blue-400" />
            <span className="text-neutral-500 dark:text-white/60">Karachi Time:</span>
            <span className="font-bold text-neutral-900 dark:text-white">{time || "12:00 PM"}</span>
          </div>
        </div>

        {/* Middle Navigation & Socials */}
        <div className="py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-600 dark:text-white/70">
            {footerNavItems.map((item) => (
              <a
                key={item.hash}
                href={`/#${item.hash}`}
                onClick={(e) => handleSectionLink(e, item.hash)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/projects"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              All Works
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {socials.map((s) => {
              const Icon =
                s.name === "WhatsApp"
                  ? WhatsAppIcon
                  : s.name === "GitHub"
                  ? GitHubIcon
                  : s.name === "LinkedIn"
                  ? LinkedInIcon
                  : Mail;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    s.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-white/12 bg-neutral-100 dark:bg-white/[0.04] hover:border-blue-500 hover:bg-blue-500/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white/85 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon className="size-3.5" />
                  <span>{s.name}</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              );
            })}

            <a
              href="/Muhammad-Faizan-CV.pdf"
              download="Muhammad-Faizan-CV.pdf"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm hover:scale-105 transition-transform"
            >
              <Download className="size-3.5 stroke-[2.3]" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-neutral-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-white/55">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2 font-semibold text-neutral-700 dark:text-white/75">
            <Code2 className="size-4 text-blue-600 dark:text-blue-400" />
            <span>
              Built with C# / ASP.NET Core, Angular, PHP &amp; Laravel
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
