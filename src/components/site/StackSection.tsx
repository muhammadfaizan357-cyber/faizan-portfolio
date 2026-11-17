import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  ChevronRight,
  Monitor,
  Server,
  Database,
  Cog,
  Layers,
  Box,
  Clock,
  Folder,
  Code2,
} from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/site/ScrollReveal";
import skillsBgLight from "@/assets/skills-bg-light.jpg";
import skillsBgDark from "@/assets/skills-bg-dark.jpg";

interface TechItem {
  name: string;
  renderIcon: () => React.ReactNode;
}

interface CategoryCard {
  id: string;
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  techs: TechItem[];
}

// ── Complete Tech Stack Matching Reference Images 1:1 ──
const categories: CategoryCard[] = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend Development",
    icon: Monitor,
    techs: [
      {
        name: "Angular",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <polygon points="24,4 6,10.5 8.8,34.5 24,44 39.2,34.5 42,10.5" fill="#DD0031" />
            <polygon points="24,4 24,44 39.2,34.5 42,10.5" fill="#C3002F" />
            <path d="M24 9.5L12.8 34.5H17L19.3 28.8H28.7L31 34.5H35.2L24 9.5ZM20.8 25L24 17.2L27.2 25H20.8Z" fill="#FFFFFF" />
          </svg>
        ),
      },
      {
        name: "React",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <ellipse cx="24" cy="24" rx="18" ry="7" fill="none" stroke="#00D8FF" strokeWidth="2.5" />
            <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)" fill="none" stroke="#00D8FF" strokeWidth="2.5" />
            <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)" fill="none" stroke="#00D8FF" strokeWidth="2.5" />
            <circle cx="24" cy="24" r="3.2" fill="#00D8FF" />
          </svg>
        ),
      },
      {
        name: "HTML5",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <polygon points="8,4 40,4 37,39 24,44 11,39" fill="#E34F26" />
            <polygon points="24,7 37,7 34.5,36.5 24,40.5" fill="#EF652A" />
            <path d="M24 19H17.5L17 14H24V9.5H12L13.2 23.5H24V19ZM24 30.5L18.5 29L18.1 25H13.5L14.2 33L24 36V30.5Z" fill="#EBEBEB" />
            <path d="M24 19V23.5H29.8L29.2 29L24 30.5V36L33.8 33L35 19H24ZM24 9.5V14H35.4L35.8 9.5H24Z" fill="#FFFFFF" />
          </svg>
        ),
      },
      {
        name: "CSS3",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <polygon points="8,4 40,4 37,39 24,44 11,39" fill="#1572B6" />
            <polygon points="24,7 37,7 34.5,36.5 24,40.5" fill="#33A9DC" />
            <path d="M24 19H30.2L30.7 14H24V9.5H36L34.8 23.5H24V19ZM24 30.5L29.5 29L30 23.5H24V19H34.8L33.8 33L24 36V30.5Z" fill="#FFFFFF" />
            <path d="M24 19V23.5H13.3L12.9 19H24ZM24 9.5V14H12.4L12 9.5H24ZM24 30.5V36L14.2 33L13.5 25.5H18.2L18.5 29L24 30.5Z" fill="#EBEBEB" />
          </svg>
        ),
      },
      {
        name: "JavaScript",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <rect x="5" y="5" width="38" height="38" rx="6" fill="#F7DF1E" />
            <path d="M19.5 34.2C20.5 35.8 22 37 24.4 37C26.7 37 28.2 35.8 28.2 33.4V21.5H24.6V33.2C24.6 34.3 24.1 34.7 23.3 34.7C22.4 34.7 21.9 34.1 21.4 33.2L19.5 34.2ZM30.2 34.1C31.3 36 33.4 37.1 36.2 37.1C39.5 37.1 41.8 35.4 41.8 32.4C41.8 29.6 40.2 28.4 37.3 27.1L36.4 26.7C34.9 26.1 34.2 25.6 34.2 24.5C34.2 23.6 34.9 22.9 36.1 22.9C37.2 22.9 37.9 23.4 38.6 24.5L41.4 22.7C40.2 20.6 38.5 19.8 36.1 19.8C33 19.8 30.9 21.4 30.9 24.4C30.9 27.1 32.5 28.4 35.1 29.5L36 29.9C37.7 30.6 38.5 31.2 38.5 32.5C38.5 33.6 37.5 34.3 36 34.3C34.4 34.3 33.4 33.5 32.7 32.2L30.2 34.1Z" fill="#111111" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "tools",
    number: "04",
    title: "Tools & Platforms",
    icon: Cog,
    techs: [
      {
        name: "Git",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <rect x="7" y="7" width="34" height="34" rx="7" transform="rotate(45 24 24)" fill="#F05032" />
            <circle cx="17" cy="24" r="3" fill="#FFFFFF" />
            <circle cx="31" cy="18" r="3" fill="#FFFFFF" />
            <circle cx="31" cy="30" r="3" fill="#FFFFFF" />
            <line x1="17" y1="24" x2="31" y2="18" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="17" y1="24" x2="31" y2="30" stroke="#FFFFFF" strokeWidth="2.5" />
          </svg>
        ),
      },
      {
        name: "GitHub",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 6C14.06 6 6 14.06 6 24C6 31.95 11.16 38.7 18.32 41.08C19.22 41.24 19.55 40.69 19.55 40.22C19.55 39.8 19.53 38.45 19.53 36.98C14.52 38.07 13.47 34.8 13.47 34.8C12.65 32.72 11.47 32.17 11.47 32.17C9.84 31.05 11.59 31.08 11.59 31.08C13.4 31.2 14.35 32.93 14.35 32.93C15.95 35.67 18.55 34.88 19.57 34.42C19.73 33.26 20.2 32.46 20.71 32.01C16.71 31.56 12.51 30.01 12.51 23.11C12.51 21.14 13.21 19.54 14.36 18.28C14.17 17.82 13.56 15.99 14.53 13.52C14.53 13.52 16.05 13.03 19.5 15.37C20.95 14.97 22.48 14.77 24.01 14.76C25.54 14.77 27.07 14.97 28.52 15.37C31.97 13.03 33.49 13.52 33.49 13.52C34.46 15.99 33.85 17.82 33.67 18.28C34.82 19.54 35.51 21.14 35.51 23.11C35.51 30.03 31.3 31.55 27.28 31.99C27.92 32.55 28.5 33.64 28.5 35.32C28.5 37.74 28.48 39.69 28.48 40.22C28.48 40.7 28.8 41.26 29.72 41.08C36.87 38.69 42 31.95 42 24C42 14.06 33.94 6 24 6Z"
              className="fill-neutral-900 dark:fill-white"
            />
          </svg>
        ),
      },
      {
        name: "Docker",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <path d="M10 24h5v-4h-5v4zm6 0h5v-4h-5v4zm6 0h5v-4h-5v4zm6 0h5v-4h-5v4zm-12-5h5v-4h-5v4zm6 0h5v-4h-5v4zm6 0h5v-4h-5v4zm-6-5h5v-4h-5v4z" fill="#0ea5e9" />
            <path d="M43 24c-.5-3.5-3-5-3-5s-1 1-1.5 1.5c-1-1.5-3.5-2.5-6.5-2.5-1 0-2 .1-3 .4v1.6h2v4h-26v2c0 6 5 11 11 11h14c6.5 0 12-4 13-13z" fill="#0ea5e9" />
          </svg>
        ),
      },
      {
        name: "VS Code",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <path d="M35 8L15 22L8 16L4 18V30L8 32L15 26L35 40L44 36V12L35 8Z" fill="#0066B8" />
            <path d="M35 8L22 20L35 30V8Z" fill="#007ACC" />
            <path d="M35 30L15 44L44 36V34L35 30Z" fill="#1F9CF0" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "backend",
    number: "02",
    title: "Backend Development",
    icon: Server,
    techs: [
      {
        name: "PHP",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <ellipse cx="24" cy="24" rx="20" ry="12" fill="#777BB4" />
            <text x="24" y="28" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="13.5">
              php
            </text>
          </svg>
        ),
      },
      {
        name: "Laravel",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <path d="M10 14L19 9L28 14V25L35 21L42 25V35L28 43L10 33V14Z" fill="none" stroke="#FF2D20" strokeWidth="2.8" strokeLinejoin="round" />
            <path d="M10 14L19 19L28 14M19 19V30M28 25L35 29L42 25M35 29V39M19 30L28 35V25" fill="none" stroke="#FF2D20" strokeWidth="2.2" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        name: "C#",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <polygon points="24,4 42,14 42,34 24,44 6,34 6,14" fill="#68217A" />
            <polygon points="24,4 42,14 42,34 24,44" fill="#9B4F96" fillOpacity="0.75" />
            <path d="M21.5 16C16.5 16 13 19.4 13 24C13 28.6 16.5 32 21.5 32C24.2 32 26.5 30.9 27.9 29L25.2 26.8C24.3 27.9 23 28.5 21.5 28.5C18.7 28.5 16.8 26.7 16.8 24C16.8 21.3 18.7 19.5 21.5 19.5C23 19.5 24.3 20.1 25.2 21.2L27.9 19C26.5 17.1 24.2 16 21.5 16Z" fill="#FFFFFF" />
            <path d="M31 18.5V30.5M35.5 18.5V30.5M28.8 22.5H37.8M28.8 26.5H37.8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: "Node.js",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <path d="M24 6L40 15.5V34.5L24 44L8 34.5V15.5L24 6Z" fill="#339933" />
            <path d="M24 16C21 16 19 18 19 21V28C19 31 21 33 24 33C27 33 29 31 29 28V26H25V28C25 29 24.5 29.5 24 29.5C23.5 29.5 23 29 23 28V21C23 20 23.5 19.5 24 19.5C24.5 19.5 25 20 25 21V22H29V21C29 18 27 16 24 16Z" fill="#FFFFFF" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "other",
    number: "05",
    title: "Other Technologies",
    icon: Layers,
    techs: [
      {
        name: "Postman",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <circle cx="24" cy="24" r="18" fill="#FF6C37" />
            <path d="M30 18L18 24L24 26L26 32L30 18Z" fill="#FFFFFF" />
          </svg>
        ),
      },
      {
        name: "Visual Studio",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <path d="M34 10L18 23L11 17L6 20V28L11 31L18 25L34 38L42 34V14L34 10Z" fill="#5C2D91" />
            <path d="M34 10L24 20L34 29V10Z" fill="#68217A" />
            <path d="M34 29L18 42L42 34V32L34 29Z" fill="#8B5CF6" />
          </svg>
        ),
      },
      {
        name: "Linux",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <ellipse cx="24" cy="26" rx="14" ry="15" fill="#F8FAFC" stroke="#111827" strokeWidth="2.5" />
            <ellipse cx="24" cy="14" rx="10" ry="9" fill="#111827" />
            <ellipse cx="21" cy="13" rx="2" ry="3" fill="#FFFFFF" />
            <ellipse cx="27" cy="13" rx="2" ry="3" fill="#FFFFFF" />
            <circle cx="21" cy="14" r="1.2" fill="#111827" />
            <circle cx="27" cy="14" r="1.2" fill="#111827" />
            <polygon points="21,17 27,17 24,22" fill="#F59E0B" />
            <ellipse cx="14" cy="38" rx="5" ry="3" fill="#F59E0B" />
            <ellipse cx="34" cy="38" rx="5" ry="3" fill="#F59E0B" />
          </svg>
        ),
      },
      {
        name: "Windows",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <path d="M8 12L22 10V22H8V12ZM24 9.7L40 7V22H24V9.7ZM8 25H22V37L8 35V25ZM24 25H40V40L24 37.3V25Z" fill="#0078D7" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "database",
    number: "03",
    title: "Database & Cloud",
    icon: Database,
    techs: [
      {
        name: "MySQL",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <path d="M14 29C14 19 21 10 30 9C27 14 27 20 31 25C34 28 37 29 39 30C34 31 30 29 27 27C23 24 19 25 14 29Z" fill="none" stroke="#00A4CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="24" y="41" textAnchor="middle" fill="#F29111" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="10">MySQL</text>
          </svg>
        ),
      },
      {
        name: "SQL Server",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <ellipse cx="24" cy="12" rx="14" ry="5.5" fill="none" stroke="#EE3124" strokeWidth="2.5" />
            <path d="M10 12V24C10 27 16.3 29.5 24 29.5C31.7 29.5 38 27 38 24V12" fill="none" stroke="#EE3124" strokeWidth="2.2" />
            <path d="M10 24V36C10 39 16.3 41.5 24 41.5C31.7 41.5 38 39 38 36V24" fill="none" stroke="#F5B52E" strokeWidth="2.2" />
          </svg>
        ),
      },
      {
        name: "Firebase",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <path d="M10 35L15 8L20 18L10 35Z" fill="#FFA000" />
            <path d="M10 35L33 13L38 22L10 35Z" fill="#F57C00" />
            <path d="M23 22L20 18L10 35L38 35L23 22Z" fill="#FFCA28" />
          </svg>
        ),
      },
      {
        name: "Azure",
        renderIcon: () => (
          <svg viewBox="0 0 48 48" className="size-full">
            <path d="M10 38L23 8H31L18 38H10Z" fill="#0089D6" />
            <path d="M25 21L30 10H38L28 38H18L25 21Z" fill="#0078D4" />
          </svg>
        ),
      },
    ],
  },
];

// ── iPhone / iOS Liquid Frosted Glass Skill Tile ──
function AppleGlassSkillTile({ tech }: { tech: TechItem }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 420, damping: 25 }}
      className="group relative flex flex-col items-center justify-center py-2.5 sm:py-3 px-1 rounded-2xl cursor-pointer select-none overflow-hidden transition-all duration-300
        /* iOS Liquid Glass Base */
        bg-gradient-to-b from-white/70 via-white/50 to-white/35
        dark:bg-gradient-to-b dark:from-white/[0.12] dark:via-white/[0.06] dark:to-white/[0.02]
        hover:from-white/90 hover:via-white/75 hover:to-white/55
        dark:hover:from-white/[0.22] dark:hover:via-white/[0.14] dark:hover:to-white/[0.06]
        backdrop-blur-xl
        /* iOS Specular Border */
        border border-white/80 dark:border-white/[0.14]
        hover:border-blue-400/60 dark:hover:border-blue-400/70
        /* Apple Refraction Shadows: Ambient Drop + Top-Edge Specular Inset Highlight */
        shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.95)]
        dark:shadow-[0_6px_20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.22)]
        hover:shadow-[0_10px_26px_rgba(59,130,246,0.15),inset_0_1px_2px_rgba(255,255,255,1)]
        dark:hover:shadow-[0_10px_28px_rgba(37,99,235,0.3),inset_0_1px_0_rgba(255,255,255,0.4)]"
    >
      {/* iOS Liquid Gloss Reflection Sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%] rounded-t-2xl bg-gradient-to-b from-white/50 dark:from-white/[0.15] to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />

      {/* Brand Icon with smooth pop */}
      <div className="relative size-7 sm:size-8 shrink-0 flex items-center justify-center mb-1 drop-shadow-[0_2px_5px_rgba(0,0,0,0.14)] group-hover:scale-110 transition-transform duration-200">
        {tech.renderIcon()}
      </div>

      {/* Skill Label */}
      <span className="relative text-[10px] sm:text-[10.5px] font-semibold tracking-tight text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white truncate max-w-full text-center transition-colors">
        {tech.name}
      </span>
    </motion.div>
  );
}

export function StackSection() {
  return (
    <section
      id="stack"
      className="relative w-full py-16 sm:py-24 overflow-hidden text-neutral-900 dark:text-white transition-colors duration-500"
    >
      {/* ── Light Mode Custom Generated Background Art ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 opacity-100 dark:opacity-0"
        style={{ backgroundImage: `url(${skillsBgLight})` }}
      />

      {/* ── Dark Mode Custom Generated Background Art ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 opacity-0 dark:opacity-100"
        style={{ backgroundImage: `url(${skillsBgDark})` }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* ── Main Layout: Left Column (~30%) + Center Bento Cards (~55%) + Right 3D Area (~15%) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          {/* ════════════ LEFT COLUMN: HEADER & CV ACTION (Cols 1-4) ════════════ */}
          <Reveal
            direction="up"
            className="lg:col-span-4 flex flex-col justify-between space-y-7 pt-2"
          >
            <div className="space-y-4">
              {/* Eyebrow with Flanking Dash Lines */}
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-[2px] bg-blue-600 dark:bg-blue-400" />
                <span className="text-[12px] font-bold tracking-[0.22em] text-neutral-800 dark:text-white/90 uppercase">
                  SKILLS &amp; TECHNOLOGIES
                </span>
                <span className="w-8 h-[2px] bg-blue-600 dark:bg-blue-400" />
              </div>

              {/* Main Headline */}
              <h2
                className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.12]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                <span className="text-neutral-900 dark:text-white block">
                  My Skills
                </span>
                <span className="text-blue-600 dark:text-blue-400 block drop-shadow-sm">
                  &amp; Technologies
                </span>
              </h2>

              {/* Subtitle Description */}
              <p className="text-sm sm:text-[14px] leading-relaxed text-neutral-600 dark:text-white/70 max-w-sm">
                I work with modern technologies to build fast, secure and
                scalable web applications. Here are the tools and technologies I
                use to turn ideas into reality.
              </p>

              {/* Download CV Button */}
              <div className="pt-2">
                <a
                  href="/Muhammad-Faizan-CV.pdf"
                  download="Muhammad-Faizan-CV.pdf"
                  onClick={() => toast.success("Downloading Muhammad Faizan's CV...")}
                  className="group inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer select-none
                    bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600
                    hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500
                    text-white
                    border border-blue-400/40
                    shadow-[0_4px_16px_rgba(37,99,235,0.4),0_10px_28px_rgba(79,70,229,0.3)]
                    hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]"
                >
                  <Download className="size-4 text-white transition-transform duration-200 group-hover:-translate-y-0.5" />
                  <span>DOWNLOAD CV</span>
                  <ChevronRight className="size-4 text-white transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* ── Key Metrics Counters Row with Vertical Divider Lines ── */}
            <div className="flex items-center justify-between pt-5 border-t border-neutral-300/80 dark:border-white/10">
              {/* Stat 1: 12+ Technologies */}
              <div className="flex items-start gap-2.5 pr-2">
                <Box className="size-5 text-blue-600 dark:text-blue-400 shrink-0 stroke-[2.2] mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white leading-none block">
                    12+
                  </span>
                  <span className="text-[10.5px] font-medium text-neutral-500 dark:text-white/60 block whitespace-nowrap">
                    Technologies
                  </span>
                </div>
              </div>

              {/* Vertical Divider 1 */}
              <div className="w-[1px] h-9 bg-neutral-300 dark:bg-white/15 mx-1" />

              {/* Stat 2: 3+ Years Experience */}
              <div className="flex items-start gap-2.5 px-2">
                <Clock className="size-5 text-blue-600 dark:text-blue-400 shrink-0 stroke-[2.2] mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white leading-none block">
                    3+
                  </span>
                  <span className="text-[10.5px] font-medium text-neutral-500 dark:text-white/60 block whitespace-nowrap">
                    Years Experience
                  </span>
                </div>
              </div>

              {/* Vertical Divider 2 */}
              <div className="w-[1px] h-9 bg-neutral-300 dark:bg-white/15 mx-1" />

              {/* Stat 3: 10+ Projects Completed */}
              <div className="flex items-start gap-2.5 pl-2">
                <Folder className="size-5 text-blue-600 dark:text-blue-400 shrink-0 stroke-[2.2] mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white leading-none block">
                    10+
                  </span>
                  <span className="text-[10.5px] font-medium text-neutral-500 dark:text-white/60 block whitespace-nowrap">
                    Projects Completed
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Slogan Motto with Flanking Dash Lines */}
            <div className="flex items-center gap-3 pt-1">
              <span className="w-8 h-[1.5px] bg-blue-600 dark:bg-blue-400" />
              <span className="text-[11px] font-mono font-bold tracking-[0.24em] text-neutral-600 dark:text-white/60 uppercase">
                CODE / BUILD / INNOVATE
              </span>
              <span className="w-8 h-[1.5px] bg-blue-600 dark:bg-blue-400" />
            </div>
          </Reveal>

          {/* ════════════ CENTER BENTO CARDS GRID (Cols 5-11, 7 Columns) ════════════ */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4.5 sm:gap-5">
            {/* ── CARD 01: Frontend Development ── */}
            <Reveal direction="up" delay={0.05} className="md:col-span-1">
              <div className="relative group rounded-3xl border border-white/80 dark:border-white/10 dark:border-t-blue-500/35 bg-white/60 dark:bg-[#0a0e1a]/65 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_16px_40px_rgba(186,230,253,0.3),inset_0_1px_1.5px_rgba(255,255,255,0.95)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.14)] hover:border-blue-400/60 dark:hover:border-blue-500/60 transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-slate-200/60 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center">
                      <Monitor className="size-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xs sm:text-[13px] font-bold tracking-tight text-neutral-900 dark:text-white">
                      Frontend Development
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-white/40">
                    01
                  </span>
                </div>

                {/* 5 Tech Tiles Row with iPhone Liquid Glassmorphism */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {categories[0]?.techs.map((tech) => (
                    <AppleGlassSkillTile key={tech.name} tech={tech} />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── CARD 04: Tools & Platforms ── */}
            <Reveal direction="up" delay={0.1} className="md:col-span-1">
              <div className="relative group rounded-3xl border border-white/80 dark:border-white/10 dark:border-t-blue-500/35 bg-white/60 dark:bg-[#0a0e1a]/65 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_16px_40px_rgba(186,230,253,0.3),inset_0_1px_1.5px_rgba(255,255,255,0.95)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.14)] hover:border-blue-400/60 dark:hover:border-blue-500/60 transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-slate-200/60 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center">
                      <Cog className="size-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xs sm:text-[13px] font-bold tracking-tight text-neutral-900 dark:text-white">
                      Tools &amp; Platforms
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-white/40">
                    04
                  </span>
                </div>

                {/* 4 Tech Tiles Row with iPhone Liquid Glassmorphism */}
                <div className="grid grid-cols-4 gap-2">
                  {categories[1]?.techs.map((tech) => (
                    <AppleGlassSkillTile key={tech.name} tech={tech} />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── CARD 02: Backend Development ── */}
            <Reveal direction="up" delay={0.15} className="md:col-span-1">
              <div className="relative group rounded-3xl border border-white/80 dark:border-white/10 dark:border-t-blue-500/35 bg-white/60 dark:bg-[#0a0e1a]/65 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_16px_40px_rgba(186,230,253,0.3),inset_0_1px_1.5px_rgba(255,255,255,0.95)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.14)] hover:border-blue-400/60 dark:hover:border-blue-500/60 transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-slate-200/60 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center">
                      <Server className="size-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xs sm:text-[13px] font-bold tracking-tight text-neutral-900 dark:text-white">
                      Backend Development
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-white/40">
                    02
                  </span>
                </div>

                {/* 4 Tech Tiles Row with iPhone Liquid Glassmorphism */}
                <div className="grid grid-cols-4 gap-2">
                  {categories[2]?.techs.map((tech) => (
                    <AppleGlassSkillTile key={tech.name} tech={tech} />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── CARD 05: Other Technologies ── */}
            <Reveal direction="up" delay={0.2} className="md:col-span-1">
              <div className="relative group rounded-3xl border border-white/80 dark:border-white/10 dark:border-t-blue-500/35 bg-white/60 dark:bg-[#0a0e1a]/65 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_16px_40px_rgba(186,230,253,0.3),inset_0_1px_1.5px_rgba(255,255,255,0.95)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.14)] hover:border-blue-400/60 dark:hover:border-blue-500/60 transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-slate-200/60 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center">
                      <Layers className="size-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xs sm:text-[13px] font-bold tracking-tight text-neutral-900 dark:text-white">
                      Other Technologies
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-white/40">
                    05
                  </span>
                </div>

                {/* 4 Tech Tiles Row with iPhone Liquid Glassmorphism */}
                <div className="grid grid-cols-4 gap-2">
                  {categories[3]?.techs.map((tech) => (
                    <AppleGlassSkillTile key={tech.name} tech={tech} />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── CARD 03: Database & Cloud ── */}
            <Reveal direction="up" delay={0.25} className="md:col-span-1">
              <div className="relative group rounded-3xl border border-white/80 dark:border-white/10 dark:border-t-blue-500/35 bg-white/60 dark:bg-[#0a0e1a]/65 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_16px_40px_rgba(186,230,253,0.3),inset_0_1px_1.5px_rgba(255,255,255,0.95)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.14)] hover:border-blue-400/60 dark:hover:border-blue-500/60 transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-slate-200/60 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center">
                      <Database className="size-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xs sm:text-[13px] font-bold tracking-tight text-neutral-900 dark:text-white">
                      Database &amp; Cloud
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-white/40">
                    03
                  </span>
                </div>

                {/* 4 Tech Tiles Row with iPhone Liquid Glassmorphism */}
                <div className="grid grid-cols-4 gap-2">
                  {categories[4]?.techs.map((tech) => (
                    <AppleGlassSkillTile key={tech.name} tech={tech} />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── CARD 06: Philosophical Quote Card (Matching iPhone Glassmorphism) ── */}
            <Reveal direction="up" delay={0.3} className="md:col-span-1">
              <div className="h-full min-h-[125px] flex items-center justify-center rounded-3xl border border-white/80 dark:border-white/10 dark:border-t-blue-500/35 bg-white/60 dark:bg-[#0a0e1a]/65 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_16px_40px_rgba(186,230,253,0.3),inset_0_1px_1.5px_rgba(255,255,255,0.95)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.14)] hover:border-blue-400/60 dark:hover:border-blue-500/60 transition-all duration-300">
                <div className="flex items-center gap-3.5">
                  {/* Glowing Circular Code Emblem */}
                  <div className="size-11 rounded-2xl border border-blue-400/80 dark:border-blue-500/70 bg-gradient-to-b from-blue-300/20 to-blue-500/10 dark:from-blue-600/25 dark:to-blue-600/5 backdrop-blur-md flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 shadow-[0_4px_16px_rgba(37,99,235,0.25),inset_0_1px_1px_rgba(255,255,255,0.8)]">
                    <Code2 className="size-5.5" />
                  </div>

                  {/* Elegant Quote */}
                  <blockquote className="space-y-0.5">
                    <p className="text-[13px] sm:text-sm italic font-medium text-slate-700 dark:text-white/90">
                      &ldquo;Different tools,
                    </p>
                    <p className="text-[13px] sm:text-sm italic font-bold text-blue-600 dark:text-blue-400">
                      one goal &mdash; Great Solutions&rdquo;
                    </p>
                  </blockquote>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ════════════ FAR RIGHT ZONE: GLOWING CODE EMBLEM OVER CRYSTAL STAND (Col 12) ════════════ */}
          <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center relative self-center py-6 select-none">
            {/* Glowing Code Symbol aligned over the 3D Glass Pedestal/Cube from the Background Art */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative size-20 flex items-center justify-center rounded-2xl border border-white/60 dark:border-blue-500/70 bg-white/30 dark:bg-blue-600/15 backdrop-blur-md shadow-[0_8px_30px_rgba(56,189,248,0.3)] dark:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              <span className="font-mono text-2xl font-black text-sky-600 dark:text-blue-400 drop-shadow-md">
                &lt; / &gt;
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StackSection;
