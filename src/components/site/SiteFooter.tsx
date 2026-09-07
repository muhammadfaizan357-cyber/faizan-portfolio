import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { profile, socials } from "@/data/portfolio";
import { ArrowUpRight, Clock, Code } from "lucide-react";

export function SiteFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-border/40 bg-surface/20 py-10 sm:py-12">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
        {/* Top Big Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/40">
          <div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-foreground">
              {profile.name}
            </h2>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mt-2">
              {profile.role} • {profile.location}
            </p>
          </div>

          {/* Local Karachi Time Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-xs font-mono backdrop-blur-md self-start md:self-auto shadow-sm">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <Clock className="size-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Karachi Local:</span>
            <span className="font-bold text-foreground">{time || "12:00:00 PM"}</span>
          </div>
        </div>

        {/* Middle Navigation & Socials */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link to="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/services" className="hover:text-foreground transition-colors">
              Services
            </Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary hover:scale-105"
              >
                <span>{s.name}</span>
                <ArrowUpRight className="size-3" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-medium">
            <Code className="size-3.5 text-primary" />
            <span>Built with Laravel, React & Clean Code Principles</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
