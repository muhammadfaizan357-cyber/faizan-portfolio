import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  RotateCw,
  Copy,
  Check,
  Lock,
  Github,
  Globe,
  FolderGit2,
  GitBranch,
  Star,
  GitFork,
  FileCode,
  FileText,
  Terminal,
  Image as ImageIcon,
  Play,
} from "lucide-react";
import { toast } from "sonner";
import type { Project } from "@/data/portfolio";

interface DevicePreviewPanelProps {
  project: Project;
  className?: string;
}

type DeviceMode = "desktop" | "tablet" | "mobile";
type TabMode = "app" | "github";

export function DevicePreviewPanel({
  project,
  className = "",
}: DevicePreviewPanelProps) {
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [tab, setTab] = useState<TabMode>("app");
  const [copied, setCopied] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showScreenshotFallback, setShowScreenshotFallback] = useState(false);

  const hasLiveUrl = Boolean(project.liveUrl);

  useEffect(() => {
    setIframeLoaded(false);
    setShowScreenshotFallback(false);
  }, [project.slug, device, refreshKey]);

  const activeUrl =
    tab === "app"
      ? project.liveUrl ??
        `https://muhammadfaizan01-dev.com/projects/${project.slug}`
      : project.githubUrl ??
        `https://github.com/muhammadfaizan01-DEV/${project.slug}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopied(true);
    toast.success("URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2200);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setIframeLoaded(false);
    setRefreshKey((k) => k + 1);
    toast.info("Reloading live viewport…");
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const renderViewportContent = (viewportLabel: string) => {
    if (hasLiveUrl && !showScreenshotFallback) {
      return (
        <div className="relative size-full bg-white dark:bg-[#0b0e17]">
          {/* Loading state while live iframe connects */}
          {!iframeLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-neutral-900/90 backdrop-blur-sm text-white p-6 text-center">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 size-full object-cover object-top opacity-25 pointer-events-none"
              />
              <div className="relative z-10 flex flex-col items-center gap-2.5">
                <div className="size-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                <p className="text-xs font-bold tracking-wide uppercase text-blue-400">
                  Loading Live Interactive App ({viewportLabel})…
                </p>
                <p className="text-[11px] text-white/65 font-mono truncate max-w-xs">
                  {project.liveUrl}
                </p>
              </div>
            </div>
          )}

          <iframe
            key={`${project.slug}-${device}-${refreshKey}`}
            src={project.liveUrl}
            title={`${project.title} — ${viewportLabel} Live Preview`}
            onLoad={() => setIframeLoaded(true)}
            className="relative z-20 w-full h-full border-0 bg-white"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          />
        </div>
      );
    }

    return (
      <div className="relative size-full overflow-hidden bg-neutral-900">
        <img
          src={project.image}
          alt={`${project.title} ${viewportLabel} Preview`}
          className="size-full object-cover object-top"
        />
      </div>
    );
  };

  return (
    <div
      className={`rounded-3xl border border-neutral-200/90 dark:border-blue-500/35 bg-white dark:bg-[#0c101a]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* ── TOP BROWSER & DEVICE CONTROLS HEADER ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-neutral-200/80 dark:border-white/10 bg-neutral-50/95 dark:bg-[#080c14]/90">
        {/* Left: Traffic Lights & Tab Switcher (Live App vs GitHub) */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 mr-2">
            <span className="size-3 rounded-full bg-[#ff5f56] inline-block shadow-xs" />
            <span className="size-3 rounded-full bg-[#ffbd2e] inline-block shadow-xs" />
            <span className="size-3 rounded-full bg-[#27c93f] inline-block shadow-xs" />
          </div>

          {/* Mode Tabs: App Preview vs GitHub Repo */}
          <div className="flex items-center p-1 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.04] shadow-xs">
            <button
              type="button"
              onClick={() => setTab("app")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                tab === "app"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                  : "text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <Globe className="size-3.5" />
              <span>Live App</span>
            </button>

            <button
              type="button"
              onClick={() => setTab("github")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                tab === "github"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                  : "text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <Github className="size-3.5" />
              <span>GitHub Repo</span>
            </button>
          </div>
        </div>

        {/* Center: Device Switcher (Desktop • Tablet • Mobile) */}
        <div className="flex items-center p-1 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.04] shadow-xs">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            title="Desktop View (Full Width)"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              device === "desktop"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Monitor className="size-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>

          <button
            type="button"
            onClick={() => setDevice("tablet")}
            title="Tablet View (768px)"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              device === "tablet"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Tablet className="size-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>

          <button
            type="button"
            onClick={() => setDevice("mobile")}
            title="Mobile View (375px)"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              device === "mobile"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Smartphone className="size-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Live vs Screenshot Toggle + External Link & Refresh */}
        <div className="flex items-center gap-2">
          {tab === "app" && hasLiveUrl && (
            <button
              type="button"
              onClick={() => setShowScreenshotFallback((v) => !v)}
              title={
                showScreenshotFallback
                  ? "Switch to Live Interactive Website"
                  : "Switch to Static Screenshot"
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-bold text-neutral-700 dark:text-white/80 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
            >
              {showScreenshotFallback ? (
                <>
                  <Play className="size-3 text-emerald-500 fill-emerald-500" />
                  <span className="hidden sm:inline">Live Interactive</span>
                </>
              ) : (
                <>
                  <ImageIcon className="size-3.5 text-blue-500" />
                  <span className="hidden sm:inline">Screenshot</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={handleRefresh}
            title="Reload View"
            className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-neutral-600 dark:text-white/70 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 transition-all cursor-pointer"
          >
            <RotateCw
              className={`size-3.5 ${
                isRefreshing ? "animate-spin text-blue-600" : ""
              }`}
            />
          </button>

          <a
            href={activeUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Link in New Tab"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600 border border-blue-500/35 hover:border-blue-600 px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-white transition-all shadow-xs"
          >
            <span>Launch</span>
            <ExternalLink className="size-3.5 stroke-[2.2]" />
          </a>
        </div>
      </div>

      {/* ── BROWSER ADDRESS BAR ── */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-2 border-b border-neutral-200/80 dark:border-white/10 bg-white/75 dark:bg-[#0b0e17]/85 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Lock className="size-3" />
          </span>
          <span className="font-mono text-neutral-600 dark:text-white/75 truncate select-all">
            {activeUrl}
          </span>
          {tab === "app" && hasLiveUrl && !showScreenshotFallback && (
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Interactive Live Preview
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopyUrl}
          className="shrink-0 flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold border border-neutral-200 dark:border-white/10 bg-neutral-100/80 dark:bg-white/[0.04] text-neutral-700 dark:text-white/80 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
        >
          {copied ? (
            <Check className="size-3 text-emerald-500" />
          ) : (
            <Copy className="size-3" />
          )}
          <span>{copied ? "Copied" : "Copy URL"}</span>
        </button>
      </div>

      {/* ── RESPONSIVE VIEWPORT STAGE ── */}
      <div className="relative min-h-[480px] sm:min-h-[580px] lg:min-h-[660px] bg-neutral-100 dark:bg-[#070a10] p-3 sm:p-6 flex items-center justify-center overflow-x-hidden transition-colors duration-300">
        <AnimatePresence mode="wait">
          {tab === "app" ? (
            /* ══════════════════════════════════════════════════════════════
               LIVE APP VIEWPORT (DESKTOP • TABLET • MOBILE)
               ══════════════════════════════════════════════════════════════ */
            <motion.div
              key={`app-${device}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="w-full flex items-center justify-center"
            >
              {device === "desktop" && (
                <div className="w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c101a] shadow-2xl">
                  {/* Top Window Bar */}
                  <div className="flex items-center justify-between px-4 py-2 bg-neutral-100 dark:bg-[#111624] border-b border-neutral-200 dark:border-white/10">
                    <span className="text-[11px] font-mono text-neutral-500 dark:text-white/50">
                      Desktop Viewport • 1440 × 900
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {project.title}
                    </span>
                  </div>

                  <div className="relative h-[520px] sm:h-[600px] lg:h-[640px] w-full overflow-hidden bg-neutral-900">
                    {renderViewportContent("Desktop")}
                  </div>
                </div>
              )}

              {device === "tablet" && (
                <div className="w-full max-w-[780px] rounded-[32px] p-3.5 sm:p-4 bg-neutral-800 dark:bg-[#141a28] border-4 border-neutral-300 dark:border-neutral-700 shadow-2xl">
                  {/* Tablet Bezel & Camera */}
                  <div className="flex items-center justify-between px-2 mb-2.5">
                    <span className="text-[10px] font-mono text-white/60">
                      Tablet • 768 × 1024
                    </span>
                    <span className="size-2.5 rounded-full bg-black/60 dark:bg-white/20" />
                    <span className="text-[10px] font-mono text-emerald-400">
                      {hasLiveUrl ? "Live" : "Preview"}
                    </span>
                  </div>

                  <div className="rounded-2xl overflow-hidden h-[520px] sm:h-[600px] w-full bg-neutral-900 relative">
                    {renderViewportContent("Tablet")}
                  </div>

                  <div className="flex justify-center mt-3">
                    <span className="w-16 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                  </div>
                </div>
              )}

              {device === "mobile" && (
                <div className="w-[350px] sm:w-[385px] rounded-[44px] p-3.5 bg-neutral-900 border-4 border-neutral-700 dark:border-neutral-600 shadow-2xl">
                  {/* Dynamic Island / Notch */}
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-24 h-4 rounded-full bg-black flex items-center justify-end px-2">
                      <span className="size-2 rounded-full bg-blue-500/80" />
                    </div>
                  </div>

                  <div className="rounded-[32px] overflow-hidden h-[620px] sm:h-[660px] w-full bg-neutral-900 relative">
                    {renderViewportContent("Mobile")}
                  </div>

                  {/* Home Indicator */}
                  <div className="flex justify-center mt-2.5">
                    <span className="w-28 h-1 rounded-full bg-white/40" />
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            /* ══════════════════════════════════════════════════════════════
               GITHUB REPO VIEWPORT (DESKTOP • TABLET • MOBILE)
               ══════════════════════════════════════════════════════════════ */
            <motion.div
              key={`gh-${device}-${refreshKey}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className={`w-full ${
                device === "mobile"
                  ? "max-w-[380px]"
                  : device === "tablet"
                  ? "max-w-[760px]"
                  : "max-w-full"
              }`}
            >
              <div className="rounded-2xl border border-neutral-200 dark:border-white/15 bg-white dark:bg-[#0d1117] text-neutral-900 dark:text-[#c9d1d9] shadow-2xl overflow-hidden font-sans">
                {/* GitHub Repo Header */}
                <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#161b22]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="size-4.5 text-blue-600 dark:text-blue-400" />
                      <a
                        href="https://github.com/muhammadfaizan01-DEV"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-[#58a6ff] hover:underline"
                      >
                        muhammadfaizan01-DEV
                      </a>
                      <span className="text-neutral-400 dark:text-[#8b949e]">
                        /
                      </span>
                      <span className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white">
                        {project.title.replace(/\s+/g, "-")}
                      </span>
                      <span className="rounded-full border border-neutral-300 dark:border-[#30363d] px-2 py-0.5 text-[10px] font-medium text-neutral-600 dark:text-[#8b949e]">
                        Public
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200 dark:border-[#30363d] bg-white dark:bg-[#21262d] px-2.5 py-1 text-neutral-700 dark:text-[#c9d1d9]">
                        <Star className="size-3.5 text-amber-500" />
                        <span>Star</span>
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200 dark:border-[#30363d] bg-white dark:bg-[#21262d] px-2.5 py-1 text-neutral-700 dark:text-[#c9d1d9]">
                        <GitFork className="size-3.5 text-blue-500" />
                        <span>Fork</span>
                      </span>
                    </div>
                  </div>

                  <p className="mt-2.5 text-xs sm:text-sm text-neutral-600 dark:text-[#8b949e] line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Clone Command Bar */}
                  <div className="mt-4 flex items-center justify-between gap-2 p-2 rounded-lg border border-neutral-200 dark:border-[#30363d] bg-neutral-100 dark:bg-[#0d1117] font-mono text-[11px]">
                    <div className="flex items-center gap-2 text-neutral-700 dark:text-[#c9d1d9] truncate">
                      <Terminal className="size-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="truncate">
                        git clone{" "}
                        {project.githubUrl ??
                          "https://github.com/muhammadfaizan01-DEV/portfolio"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `git clone ${
                            project.githubUrl ??
                            "https://github.com/muhammadfaizan01-DEV/portfolio"
                          }`
                        );
                        toast.success("Git clone command copied!");
                      }}
                      className="px-2 py-1 rounded bg-blue-600 text-white font-bold hover:bg-blue-500 shrink-0 cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* GitHub File Tree Simulation */}
                <div className="p-4 sm:p-5 space-y-4">
                  <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-[#8b949e] pb-2 border-b border-neutral-200 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <GitBranch className="size-3.5 text-emerald-500" />
                      <span className="font-bold text-neutral-900 dark:text-white">
                        main
                      </span>
                      <span>• 1 Branch</span>
                    </div>
                    <span>Latest commit by Faizan</span>
                  </div>

                  <div className="rounded-xl border border-neutral-200 dark:border-[#30363d] divide-y divide-neutral-200 dark:divide-[#30363d] text-xs">
                    <div className="p-2.5 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <FileCode className="size-4 text-blue-500" />
                        <span className="font-mono font-medium">
                          Controllers / Endpoints
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-500 dark:text-[#8b949e]">
                        RESTful API architecture &amp; routes
                      </span>
                    </div>

                    <div className="p-2.5 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <FileCode className="size-4 text-indigo-500" />
                        <span className="font-mono font-medium">
                          Models &amp; Migrations
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-500 dark:text-[#8b949e]">
                        Normalized database schema
                      </span>
                    </div>

                    <div className="p-2.5 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <FileCode className="size-4 text-cyan-500" />
                        <span className="font-mono font-medium">
                          ClientApp / Frontend
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-500 dark:text-[#8b949e]">
                        Responsive UI components &amp; state
                      </span>
                    </div>

                    <div className="p-2.5 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <FileText className="size-4 text-emerald-500" />
                        <span className="font-mono font-medium">README.md</span>
                      </div>
                      <span className="text-[11px] text-neutral-500 dark:text-[#8b949e]">
                        Setup guide &amp; architecture spec
                      </span>
                    </div>
                  </div>

                  {/* README Preview Card */}
                  <div className="rounded-xl border border-neutral-200 dark:border-[#30363d] bg-neutral-50/70 dark:bg-[#161b22] p-4 sm:p-5 space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-700 dark:text-white">
                      <FileText className="size-4 text-blue-500" />
                      <span>README.md</span>
                    </div>

                    <div className="space-y-2 text-xs text-neutral-700 dark:text-[#c9d1d9] leading-relaxed">
                      <h4 className="text-base font-black uppercase text-neutral-900 dark:text-white">
                        # {project.title}
                      </h4>
                      <p>{project.overview}</p>

                      <div className="pt-2">
                        <p className="font-bold text-neutral-900 dark:text-white mb-1.5">
                          Tech Stack:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.services.map((s) => (
                            <span
                              key={s}
                              className="rounded-md border border-neutral-300 dark:border-[#30363d] bg-white dark:bg-[#21262d] px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-[#58a6ff]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Direct GitHub Link Button */}
                  <div className="flex justify-end pt-2">
                    <a
                      href={
                        project.githubUrl ??
                        "https://github.com/muhammadfaizan01-DEV"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all shadow-md"
                    >
                      <Github className="size-4" />
                      <span>View on GitHub (@muhammadfaizan01-DEV)</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DevicePreviewPanel;
