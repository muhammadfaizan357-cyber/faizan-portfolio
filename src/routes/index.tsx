import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  MapPin,
  Github,
  Linkedin,
  Code2,
  FolderOpen,
  Download,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";

import { HeroPortrait } from "@/components/site/HeroPortrait";
import {
  WhatsAppIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/site/BrandIcons";
import { AboutSection } from "@/components/site/AboutSection";
import { SkillsSection } from "@/components/site/SkillsSection";
import { FeaturedProjectsSlider } from "@/components/site/FeaturedProjectsSlider";
import { ServicesSection } from "@/components/site/ServicesSection";
import { ProcessSection } from "@/components/site/ProcessSection";
import { FaqSection } from "@/components/site/FaqSection";
import { Reveal } from "@/components/site/ScrollReveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ShapeGrid from "@/components/ui/ShapeGrid";

import { profile } from "@/data/portfolio";
import { scrollToTarget } from "@/lib/scroll";

function useIsDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

const title = `${profile.name} — Full-Stack Developer (ASP.NET Core, Angular & Laravel)`;
const description = `${profile.name} builds business web applications with C#, ASP.NET Core, Angular, PHP, Laravel, SQL Server, and MySQL in ${profile.location}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: "/favicon.svg" },
    ],
  }),
  component: Index,
});

// ─── HERO (10/10 Focused Value Proposition + 2 Primary CTAs) ─────────────────
function Hero() {
  const isDark = useIsDark();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <section
      id="home"
      className="luxury-hero-section relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-white dark:bg-[#0b0d12] text-neutral-900 dark:text-white pt-24 sm:pt-28 md:pt-32 transition-colors duration-500"
    >
      {/* ── React Bits ShapeGrid Interactive Background (Hero Section Only) ── */}
      <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden">
        <ShapeGrid
          shape="square"
          direction="diagonal"
          lineColor={isDark ? "#1e293b" : "#e2e8f0"}
          hoverColor={isDark ? "#38bdf8" : "#2563eb"}
          hoverFillColor={isDark ? "#38bdf8" : "#2563eb"}
          fillOpacity={isDark ? 0.15 : 0.18}
          cellSize={40}
          speed={0.5}
          tiltX={0}
          tiltY={0}
          rainbow={false}
        />
      </div>

      {/* Subtle Topographic Wave Lines in Bottom-Left Corner */}
      <svg
        aria-hidden="true"
        viewBox="0 0 260 220"
        fill="none"
        className="pointer-events-none absolute bottom-0 left-0 w-52 sm:w-64 opacity-20 dark:opacity-30 z-[1]"
      >
        {[0, 12, 24, 36, 48, 60, 72, 84].map((offset) => (
          <path
            key={offset}
            d={`M -20 ${120 + offset} C 40 ${110 + offset}, 75 ${165 + offset}, 145 ${185 + offset} C 195 ${198 + offset}, 220 ${225 + offset}, 250 ${240 + offset}`}
            stroke={isDark ? "#3b82f6" : "#2563eb"}
            strokeWidth="1"
            strokeOpacity={0.55 - offset * 0.005}
          />
        ))}
      </svg>

      {/* ── Main Hero Split Grid ── */}
      <div className="relative z-20 mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-14 flex-1 grid grid-cols-1 lg:grid-cols-12 items-end gap-8 pt-4 lg:pt-0">
        {/* Left Column: Typography, 1-Line Value Prop, 2 Primary CTAs & Factual Stats (7 cols) */}
        <Reveal direction="left" duration={0.7} className="lg:col-span-7 flex flex-col justify-center self-center py-8 lg:py-12 space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 self-start rounded-full border border-blue-500/25 dark:border-blue-500/25 bg-blue-500/[0.06] dark:bg-blue-500/[0.06] backdrop-blur-md px-4 py-1.5">
            <span className="w-4 h-[1.5px] bg-blue-600 dark:bg-blue-400" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-blue-600 dark:text-blue-400 uppercase">
              FULL-STACK DEVELOPER • KARACHI
            </span>
          </div>

          {/* Display Title: I'M FAIZAN + Clear 1-Line Value Proposition */}
          <div className="space-y-3">
            <div className="relative inline-flex flex-wrap items-baseline gap-x-4">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-[80px] font-black uppercase tracking-tight leading-none text-neutral-900 dark:text-white">
                I’M{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  FAIZAN
                </span>
              </h1>
            </div>

            {/* Sharp 1-Line Value Proposition */}
            <p className="text-base sm:text-lg md:text-xl font-bold text-neutral-800 dark:text-white/95 leading-snug max-w-xl pt-1">
              I build business web applications with{" "}
              <span className="text-blue-600 dark:text-blue-400">
                C# / ASP.NET Core, Angular
              </span>{" "}
              &amp;{" "}
              <span className="text-blue-600 dark:text-blue-400">
                PHP / Laravel
              </span>
              .
            </p>
          </div>

          {/* Concise, Authentic 2-Sentence Bio */}
          <p className="max-w-xl text-xs sm:text-sm md:text-[15px] leading-[1.75] text-neutral-600 dark:text-white/65">
            From RESTful APIs and normalized{" "}
            <strong className="text-neutral-900 dark:text-white font-semibold">
              SQL Server &amp; MySQL
            </strong>{" "}
            databases to responsive{" "}
            <strong className="text-neutral-900 dark:text-white font-semibold">
              Angular &amp; React
            </strong>{" "}
            frontends, I turn complex workflows into clean, working software.
          </p>

          {/* Two Primary CTAs: View Projects & Download CV */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            {/* Primary Blue CTA: View Projects */}
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, "#projects")}
              className="group inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.1em] text-white transition-all duration-300 cursor-pointer select-none
                bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600
                hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500
                border border-blue-400/40
                shadow-[0_4px_16px_rgba(37,99,235,0.4),0_10px_28px_rgba(79,70,229,0.3),inset_0_1px_1.5px_rgba(255,255,255,0.4)]
                hover:shadow-[0_8px_24px_rgba(37,99,235,0.5),0_16px_36px_rgba(79,70,229,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)]
                hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]"
            >
              <FolderOpen className="size-4 stroke-[2.4]" />
              <span>VIEW PROJECTS</span>
              <ArrowRight className="size-4 stroke-[2.4] transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            {/* Secondary Glass CTA: Download CV */}
            <a
              href="/Muhammad-Faizan-CV.pdf"
              download="Muhammad-Faizan-CV.pdf"
              onClick={() =>
                toast.success("Downloading Muhammad Faizan's CV...")
              }
              className="group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer select-none
                bg-white/85 hover:bg-white text-neutral-900 border border-slate-300/80 hover:border-blue-500
                shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1.5px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(0,0,0,0.04)]
                hover:shadow-[0_8px_26px_rgba(37,99,235,0.25),inset_0_1px_1.5px_rgba(255,255,255,1)]
                dark:bg-[#0e1422]/80 dark:hover:bg-[#131c30]/90 dark:text-white dark:border-white/15 dark:hover:border-blue-400
                dark:shadow-[0_4px_20px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.18)]
                dark:hover:shadow-[0_8px_30px_rgba(37,99,235,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)]
                hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]"
            >
              <Download className="size-3.5 text-blue-600 dark:text-blue-400 stroke-[2.4] transition-transform duration-200 group-hover:-translate-y-0.5" />
              <span>DOWNLOAD CV</span>
            </a>
          </div>

          {/* Bottom Glassmorphic 3-Column Factual Bar */}
          <div className="inline-flex flex-wrap items-center gap-5 sm:gap-7 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl px-5 py-4 shadow-[0_12px_36px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.4)] self-start mt-2">
            {/* Stat 1 */}
            <div className="group flex items-center gap-3 cursor-default">
              <span className="flex size-10 items-center justify-center rounded-xl border border-blue-500/30 dark:border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                <FolderOpen className="size-5 stroke-[2]" />
              </span>
              <div>
                <div className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white leading-tight">
                  7 Projects (4 Live)
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-white/60">
                  CookSmart, FanHub, Meraki &amp; Hamdan
                </div>
              </div>
            </div>

            <div className="h-8 w-px bg-neutral-200 dark:bg-white/10 hidden sm:block" />

            {/* Stat 2 */}
            <div className="group flex items-center gap-3 cursor-default">
              <span className="flex size-10 items-center justify-center rounded-xl border border-blue-500/30 dark:border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                <GraduationCap className="size-5 stroke-[2]" />
              </span>
              <div>
                <div className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white leading-tight">
                  Aptech HDSE
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-white/60">
                  3rd Semester • 1st Place Winner
                </div>
              </div>
            </div>

            <div className="h-8 w-px bg-neutral-200 dark:bg-white/10 hidden sm:block" />

            {/* Stat 3 */}
            <div className="group flex items-center gap-3 cursor-default">
              <span className="flex size-10 items-center justify-center rounded-xl border border-blue-500/30 dark:border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                <Code2 className="size-5 stroke-[2]" />
              </span>
              <div>
                <div className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white leading-tight">
                  .NET • Angular • Laravel
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-white/60">
                  SQL Server &amp; MySQL
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Portrait (5 cols) */}
        <Reveal direction="right" delay={0.12} duration={0.75} className="lg:col-span-5 relative flex items-end justify-center self-end">
          <HeroPortrait />
        </Reveal>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION (Direct AJAX Email Submission + Instant Fallback) ───────
function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState("");

  const quickSubjects = [
    "C# / ASP.NET Core & Angular App",
    "PHP & Laravel Web Portal",
    "E-Commerce / Shopify Store",
    "Full-Time / Internship Role",
  ];

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 border-t border-neutral-200/80 dark:border-white/[0.06] bg-[#f8fafc] dark:bg-[#080c14] text-neutral-900 dark:text-white overflow-hidden select-none transition-colors duration-300"
    >
      {/* Ambient Blue & Indigo Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute right-[8%] top-[10%] h-[420px] w-[420px] rounded-full opacity-20 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.42) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-[6%] bottom-[8%] h-[440px] w-[440px] rounded-full opacity-18 blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(79,70,229,0.35) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1340px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <Reveal direction="up" className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              <Mail className="size-3.5 text-blue-600 dark:text-blue-400" />
              <span>GET IN TOUCH</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-900 dark:text-white leading-[1.08]">
              LET&apos;S BUILD{" "}
              <span className="text-blue-600 dark:text-blue-400">
                TOGETHER
              </span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-neutral-600 dark:text-white/65 leading-relaxed">
            Have an{" "}
            <strong className="text-neutral-900 dark:text-white font-semibold">
              ASP.NET Core &amp; Angular
            </strong>{" "}
            project, custom{" "}
            <strong className="text-neutral-900 dark:text-white font-semibold">Laravel</strong>{" "}
            portal, or developer role in mind? Send a message directly below.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Direct Contact & Social Profiles */}
          <Reveal direction="left" delay={0.08} className="lg:col-span-5">
            <div className="rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#0c101a]/95 p-6 sm:p-8 backdrop-blur-xl shadow-[0_12px_35px_-12px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_55px_rgba(0,0,0,0.6)] space-y-5">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-wide text-neutral-900 dark:text-white">
                  Direct Contact Channels
                </h3>
                <p className="text-xs text-neutral-600 dark:text-white/60 mt-1">
                  Available for full-time roles, internships, and freelance web projects.
                </p>
              </div>

              {/* Email (Click to Copy) */}
              <button
                type="button"
                onClick={copyEmail}
                className="w-full flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-white/[0.03] hover:border-blue-500/60 hover:bg-blue-500/[0.06] p-4 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/35">
                    <Mail className="size-5" />
                  </span>
                  <div className="text-left min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Official Email (Click to Copy)
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white truncate block">
                      {profile.email}
                    </span>
                  </div>
                </div>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-neutral-300 dark:border-white/15 bg-white dark:bg-black/30 text-neutral-700 dark:text-white/75 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all">
                  {copied ? (
                    <Check className="size-4 text-emerald-500 dark:text-emerald-400 group-hover:text-white" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </span>
              </button>

              {/* Phone / WhatsApp */}
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-white/[0.03] hover:border-emerald-500/60 hover:bg-emerald-500/[0.06] p-4 transition-all text-neutral-900 dark:text-white group"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-[#25D366] dark:text-emerald-400 border border-emerald-500/30">
                    <WhatsAppIcon className="size-5" />
                  </span>
                  <div>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">
                      WhatsApp / Direct Chat
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-white block">
                      {profile.formattedPhone}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-neutral-500 dark:text-white/60 group-hover:text-emerald-500 transition-colors" />
              </a>

              {/* Location */}
              <div className="flex items-center gap-3.5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-white/[0.03] p-4 text-neutral-900 dark:text-white">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/35">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-white/50 block">
                    Base Location
                  </span>
                  <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                    {profile.location} (Remote &amp; On-Site Ready)
                  </span>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-4 border-t border-neutral-200/80 dark:border-white/10 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500 dark:text-white/50">
                  Official Profiles &amp; Resume
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-500/10 hover:bg-[#0A66C2] hover:text-white px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 transition-all"
                  >
                    <LinkedInIcon className="size-4" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>

                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/[0.04] hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white transition-all"
                  >
                    <GitHubIcon className="size-4" />
                    <span>GitHub</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>

                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-[#25D366] hover:text-white px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 transition-all"
                  >
                    <WhatsAppIcon className="size-4" />
                    <span>WhatsApp</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>

                  <a
                    href="/Muhammad-Faizan-CV.pdf"
                    download="Muhammad-Faizan-CV.pdf"
                    onClick={() =>
                      toast.success("Downloading Muhammad Faizan's CV...")
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/[0.04] hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white transition-all"
                  >
                    <Download className="size-4 text-blue-600 dark:text-blue-400" />
                    <span>CV PDF</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Direct AJAX Contact Form (FormSubmit AJAX + Instant Delivery) */}
          <Reveal direction="right" delay={0.14} className="lg:col-span-7">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formEl = e.currentTarget;
                const fd = new FormData(formEl);
                const name = String(fd.get("name") || "").trim();
                const email = String(fd.get("email") || "").trim();
                const message = String(fd.get("message") || "").trim();
                if (!name || !email || !message) {
                  toast.error("Please fill in your name, email, and message.");
                  return;
                }
                const subj = subject.trim() || `Portfolio Inquiry from ${name}`;
                setSending(true);
                try {
                  const res = await fetch(
                    `https://formsubmit.co/ajax/${profile.email}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      body: JSON.stringify({
                        name,
                        email,
                        _replyto: email,
                        _subject: subj,
                        _template: "table",
                        _captcha: "false",
                        message,
                      }),
                    }
                  );
                  if (res.ok) {
                    setSent(true);
                    formEl.reset();
                    setSubject("");
                    toast.success("Message sent directly to Muhammad Faizan!");
                    setTimeout(() => setSent(false), 5000);
                  } else {
                    throw new Error("Fallback to mailto");
                  }
                } catch {
                  const body = `${message}\n\n— ${name} (${email})`;
                  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
                    subj
                  )}&body=${encodeURIComponent(body)}`;
                  setSent(true);
                  toast.success("Opening your email client with the message ready.");
                  setTimeout(() => setSent(false), 4000);
                } finally {
                  setSending(false);
                }
              }}
              className="rounded-3xl border border-blue-500/30 dark:border-blue-500/25 bg-white dark:bg-[#0c101a]/95 p-6 sm:p-8 backdrop-blur-xl shadow-[0_12px_35px_-12px_rgba(37,99,235,0.12)] dark:shadow-[0_20px_55px_rgba(0,0,0,0.6)] space-y-5"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-wide text-neutral-900 dark:text-white">
                  Send a Direct Message
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Direct Inbox Delivery</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-white/75 block">
                    Your Name
                  </label>
                  <Input
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="h-12 rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-50 dark:bg-black/35 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/40 focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black/40 px-4 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-white/75 block">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="h-12 rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-50 dark:bg-black/35 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/40 focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black/40 px-4 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-white/75 block">
                  Project Type / Subject
                </label>
                <Input
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder=".NET & Angular App / Laravel Portal / Job Opportunity"
                  className="h-12 rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-50 dark:bg-black/35 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/40 focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black/40 px-4 transition-all"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {quickSubjects.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSubject(item)}
                      className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                        subject === item
                          ? "bg-blue-600 text-white shadow-xs font-extrabold"
                          : "border border-neutral-200 dark:border-white/12 bg-neutral-100 dark:bg-white/[0.04] text-neutral-700 dark:text-white/70 hover:border-blue-500 hover:text-blue-600 dark:hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-white/75 block">
                  Project or Role Details
                </label>
                <Textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project requirements, tech stack, or role opportunity…"
                  className="rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-50 dark:bg-black/35 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/40 focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black/40 p-4 resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2.5 rounded-full py-4 text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] text-white transition-all duration-300 cursor-pointer select-none disabled:opacity-60
                  bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600
                  hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500
                  border border-blue-400/40
                  shadow-[0_4px_16px_rgba(37,99,235,0.4),0_10px_28px_rgba(79,70,229,0.3),inset_0_1px_1.5px_rgba(255,255,255,0.4)]
                  hover:shadow-[0_8px_24px_rgba(37,99,235,0.5),0_16px_36px_rgba(79,70,229,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)]
                  hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.99]"
              >
                {sent ? (
                  <>
                    <Check className="size-4 stroke-[2.5]" />
                    <span>Message Sent Successfully!</span>
                  </>
                ) : sending ? (
                  <span>Sending Message…</span>
                ) : (
                  <>
                    <Send className="size-4 stroke-[2.3]" />
                    <span>Send Direct Message</span>
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
function Index() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjectsSlider />
      <ServicesSection />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
