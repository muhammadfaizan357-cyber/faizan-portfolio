import { scrollToTarget } from "@/lib/scroll";
import { useState, useRef, useEffect } from "react";
import {
  Code2,
  Monitor,
  Gauge,
  FolderOpen,
  GraduationCap,
  MapPin,
  Send,
  ArrowRight,
  Download,
  RotateCw,
  ShieldCheck,
  Cpu,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import avatarHd from "@/assets/avatar-hd.png";
import { profile, education, achievements } from "@/data/portfolio";
import { Reveal } from "@/components/site/ScrollReveal";

const featurePills = [
  { label: "Clean MVC & REST Code", icon: Code2 },
  { label: "Responsive Angular & Web UI", icon: Monitor },
  { label: "Normalized SQL Databases", icon: Gauge },
];

const aboutStats = [
  {
    value: "7",
    label: "Full-Stack Projects (3 Live)",
    icon: FolderOpen,
  },
  {
    value: "3rd Sem",
    label: "Aptech HDSE Software Eng.",
    icon: GraduationCap,
  },
  {
    value: "Karachi",
    label: "Pakistan • Remote Ready",
    icon: MapPin,
  },
];

const backCredentials = [
  { label: "Primary Stack", value: "C#, ASP.NET Core Web API, Angular" },
  { label: "PHP Stack", value: "PHP 8, Laravel MVC, Blade, Tailwind" },
  { label: "Databases", value: "SQL Server, MySQL, EF Core, Eloquent" },
  { label: "Recognition", value: "1st Place — Aptech Vision Competition" },
];

export function AboutSection() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const inner3dRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const portraitParallaxRef = useRef<HTMLDivElement>(null);

  const physRef = useRef({
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    flipDeg: 0,
    scale: 1,
    vx: 0,
    vy: 0,
    vrx: 0,
    vry: 0,
    vFlip: 0,
    vScale: 0,
    tx: 0,
    ty: 0,
    trx: 0,
    try: 0,
    tFlip: 0,
    tScale: 1,
    dragging: false,
    startX: 0,
    startY: 0,
    moved: false,
    flipped: false,
    rafId: 0,
  });

  const startSpringLoop = () => {
    const p = physRef.current;
    if (p.rafId) return;

    const step = () => {
      const stiffness = p.dragging ? 0.24 : 0.11;
      const damping = p.dragging ? 0.72 : 0.78;

      p.vx = (p.vx + (p.tx - p.x) * stiffness) * damping;
      p.vy = (p.vy + (p.ty - p.y) * stiffness) * damping;
      p.x += p.vx;
      p.y += p.vy;

      p.vrx = (p.vrx + (p.trx - p.rx) * 0.14) * 0.78;
      p.vry = (p.vry + (p.try - p.ry) * 0.14) * 0.78;
      p.rx += p.vrx;
      p.ry += p.vry;

      p.vFlip = (p.vFlip + (p.tFlip - p.flipDeg) * 0.1) * 0.76;
      p.flipDeg += p.vFlip;

      p.vScale = (p.vScale + (p.tScale - p.scale) * 0.18) * 0.75;
      p.scale += p.vScale;

      if (inner3dRef.current) {
        const totalRy = p.flipDeg + (p.flipped ? -p.ry : p.ry);
        const tiltZ = p.x * 0.08;
        inner3dRef.current.style.transform = `translate3d(${p.x.toFixed(
          2
        )}px, ${p.y.toFixed(2)}px, 0px) rotateX(${p.rx.toFixed(
          2
        )}deg) rotateY(${totalRy.toFixed(2)}deg) rotateZ(${tiltZ.toFixed(
          2
        )}deg) scale(${p.scale.toFixed(3)})`;
      }

      if (portraitParallaxRef.current) {
        portraitParallaxRef.current.style.transform = `translate3d(${(
          p.ry * -0.55
        ).toFixed(2)}px, ${(p.rx * 0.45).toFixed(2)}px, 0px)`;
      }

      const settled =
        !p.dragging &&
        Math.abs(p.tx - p.x) < 0.05 &&
        Math.abs(p.ty - p.y) < 0.05 &&
        Math.abs(p.trx - p.rx) < 0.05 &&
        Math.abs(p.try - p.ry) < 0.05 &&
        Math.abs(p.tFlip - p.flipDeg) < 0.1 &&
        Math.abs(p.vx) < 0.05 &&
        Math.abs(p.vy) < 0.05 &&
        Math.abs(p.vFlip) < 0.08;

      if (settled) {
        p.rafId = 0;
      } else {
        p.rafId = requestAnimationFrame(step);
      }
    };

    p.rafId = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => {
      if (physRef.current.rafId) {
        cancelAnimationFrame(physRef.current.rafId);
      }
    };
  }, []);

  const toggleCardFlip = () => {
    const p = physRef.current;
    p.flipped = !p.flipped;
    p.tFlip = p.flipped ? 180 : 0;
    p.vy -= 4.5;
    setIsFlipped(p.flipped);
    startSpringLoop();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = physRef.current;
    p.dragging = true;
    p.startX = e.clientX - p.x;
    p.startY = e.clientY - p.y;
    p.moved = false;
    p.tScale = 1.03;
    startSpringLoop();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    const p = physRef.current;
    p.try = (nx - 0.5) * 26;
    p.trx = (0.5 - ny) * 24;

    if (glareRef.current) {
      glareRef.current.style.opacity = "0.38";
      glareRef.current.style.background = `radial-gradient(circle at ${Math.round(
        nx * 100
      )}% ${Math.round(
        ny * 100
      )}%, rgba(59, 130, 246, 0.28) 0%, transparent 58%)`;
    }

    if (p.dragging) {
      const rawDx = e.clientX - p.startX;
      const rawDy = e.clientY - p.startY;
      if (Math.hypot(rawDx - p.x, rawDy - p.y) > 7) {
        p.moved = true;
      }
      p.tx = Math.max(-65, Math.min(65, rawDx * 0.55));
      p.ty = Math.max(-50, Math.min(50, rawDy * 0.55));
      p.try += p.tx * 0.25;
      p.trx -= p.ty * 0.2;
    }

    startSpringLoop();
  };

  const handlePointerUp = () => {
    const p = physRef.current;
    const wasClick = p.dragging && !p.moved;
    p.dragging = false;
    p.tx = 0;
    p.ty = 0;
    p.tScale = 1;
    if (wasClick) {
      toggleCardFlip();
    } else {
      startSpringLoop();
    }
  };

  const handlePointerLeave = () => {
    const p = physRef.current;
    p.dragging = false;
    p.tx = 0;
    p.ty = 0;
    p.trx = 0;
    p.try = 0;
    p.tScale = 1;
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
    startSpringLoop();
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTarget("#contact");
  };

  return (
    <section
      id="about"
      className="luxury-about-section relative w-full py-20 sm:py-28 overflow-hidden bg-[#f8fafc] dark:bg-[#080c14] text-neutral-900 dark:text-white border-t border-neutral-200/80 dark:border-white/[0.06] transition-colors duration-300"
    >
      {/* Top-Right Subtle Ambient Blue Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 size-[420px] rounded-full blur-[130px] opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.35) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-20 mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* ── Left Column: Heading + Interactive 3D Physics Chamfered Blue Card (5 cols) ── */}
          <Reveal direction="left" className="lg:col-span-5 flex flex-col items-start space-y-7">
            <div className="space-y-2">
              <div className="flex items-center gap-3.5">
                <span className="w-7 h-[2px] bg-blue-600 dark:bg-blue-400" />
                <span className="text-xs font-bold tracking-[0.24em] text-blue-600 dark:text-blue-400 uppercase">
                  GET TO KNOW ME
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.08] text-neutral-900 dark:text-white pt-1">
                ABOUT{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  ME
                </span>
              </h2>
            </div>

            {/* ── INTERACTIVE 3D SPRING PHYSICS + 180° FLIP CHAMFERED GOLDEN CARD ── */}
            <div className="w-full max-w-[390px] sm:max-w-[405px] mx-auto lg:mx-0">
              <div
                ref={cardRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
                role="button"
                tabIndex={0}
                aria-label="Interactive 3D Portrait Card — Hover or drag to move, click to flip"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCardFlip();
                  }
                }}
                className="relative w-full aspect-[4/4.6] select-none cursor-grab active:cursor-grabbing outline-none touch-none"
                style={{
                  perspective: "1300px",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-4 rounded-3xl blur-2xl opacity-30 dark:opacity-40"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(37,99,235,0.5) 0%, transparent 72%)",
                  }}
                />

                <div
                  ref={inner3dRef}
                  className="relative size-full will-change-transform"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* FRONT FACE */}
                  <div
                    className="absolute inset-0 size-full"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-4 -right-3 z-30 grid grid-cols-4 gap-2"
                    >
                      {Array.from({ length: 12 }).map((_, i) => (
                        <span
                          key={`f-tr-${i}`}
                          className="size-1 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]"
                        />
                      ))}
                    </div>

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-4 -left-3 z-30 grid grid-cols-4 gap-2"
                    >
                      {Array.from({ length: 12 }).map((_, i) => (
                        <span
                          key={`f-bl-${i}`}
                          className="size-1 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]"
                        />
                      ))}
                    </div>

                    <div
                      className="relative size-full overflow-hidden bg-[#0c0e14] flex items-end justify-center"
                      style={{
                        clipPath:
                          "polygon(34px 0, 100% 0, 100% calc(100% - 34px), calc(100% - 34px) 100%, 0 100%, 0 34px)",
                      }}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] dark:hidden" />

                      <div
                        className="pointer-events-none absolute inset-0 dark:hidden"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 46%, rgba(37,99,235,0.2) 0%, rgba(219,234,254,0.6) 38%, rgba(248,250,252,0.98) 78%)",
                        }}
                      />

                      <div
                        className="pointer-events-none absolute inset-0 hidden dark:block"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 48%, rgba(37,99,235,0.35) 0%, rgba(30,58,138,0.2) 44%, rgba(8,12,20,0.98) 76%)",
                        }}
                      />

                      <div
                        ref={glareRef}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-200"
                      />

                      <div
                        ref={portraitParallaxRef}
                        className="relative z-10 w-full h-full flex items-end justify-center pt-5 will-change-transform"
                      >
                        <img
                          src={avatarHd}
                          alt={profile.name}
                          width={1536}
                          height={2048}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          className="w-auto h-[94%] object-contain object-bottom drop-shadow-[0_16px_28px_rgba(15,23,42,0.22)] dark:drop-shadow-[0_18px_36px_rgba(0,0,0,0.8)] select-none pointer-events-none"
                        />
                      </div>
                    </div>

                    <svg
                      aria-hidden="true"
                      viewBox="0 0 400 460"
                      fill="none"
                      className="pointer-events-none absolute inset-0 size-full z-30"
                      preserveAspectRatio="none"
                    >
                      <polygon
                        points="34,2 398,2 398,426 366,458 2,458 2,34"
                        stroke="#3b82f6"
                        strokeWidth="1.8"
                        strokeOpacity="0.92"
                      />
                      <polyline
                        points="2,50 2,28 28,2 52,2"
                        stroke="#3b82f6"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                      <line
                        x1="7"
                        y1="35"
                        x2="35"
                        y2="7"
                        stroke="#3b82f6"
                        strokeWidth="1.6"
                      />
                      <polyline
                        points="346,458 372,458 398,432 398,408"
                        stroke="#3b82f6"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                      <line
                        x1="364"
                        y1="453"
                        x2="393"
                        y2="424"
                        stroke="#3b82f6"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="absolute inset-0 size-full"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-4 -right-3 z-30 grid grid-cols-4 gap-2"
                    >
                      {Array.from({ length: 12 }).map((_, i) => (
                        <span
                          key={`b-tr-${i}`}
                          className="size-1 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]"
                        />
                      ))}
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-4 -left-3 z-30 grid grid-cols-4 gap-2"
                    >
                      {Array.from({ length: 12 }).map((_, i) => (
                        <span
                          key={`b-bl-${i}`}
                          className="size-1 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]"
                        />
                      ))}
                    </div>

                    <div
                      className="relative size-full overflow-hidden bg-[#0c0e14] p-6 flex flex-col justify-between"
                      style={{
                        clipPath:
                          "polygon(34px 0, 100% 0, 100% calc(100% - 34px), calc(100% - 34px) 100%, 0 100%, 0 34px)",
                      }}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#eff6ff] via-[#dbeafe] to-[#bfdbfe] dark:hidden" />

                      <div
                        className="pointer-events-none absolute inset-0 dark:hidden"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 40%, rgba(37,99,235,0.15) 0%, rgba(239,246,255,0.85) 50%, rgba(219,234,254,0.98) 76%)",
                        }}
                      />

                      <div
                        className="pointer-events-none absolute inset-0 hidden dark:block"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 42%, rgba(37,99,235,0.25) 0%, rgba(10,14,24,0.98) 72%)",
                        }}
                      />

                      <div className="relative z-10 space-y-3.5">
                        <div className="flex items-center justify-between border-b border-blue-500/30 dark:border-blue-400/25 pb-3">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="size-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-[10px] font-extrabold tracking-[0.18em] text-blue-600 dark:text-blue-400 uppercase">
                              DEVELOPER PROFILE CARD
                            </span>
                          </div>
                          <span className="font-mono text-[10px] font-bold dark:font-normal text-neutral-500 dark:text-white/50">
                            APTECH HDSE
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h4 className="font-display text-xl font-black text-neutral-900 dark:text-white uppercase tracking-wide">
                              {profile.name}
                            </h4>
                            <p className="text-[11px] font-bold dark:font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mt-0.5">
                              .NET Core, Angular &amp; Laravel Dev
                            </p>
                          </div>

                          <div className="flex size-11 items-center justify-center rounded-xl border border-blue-500/50 bg-blue-500/10 dark:bg-gradient-to-br dark:from-blue-600/30 dark:to-indigo-600/20 text-blue-600 dark:text-blue-400 shadow-[0_2px_12px_rgba(37,99,235,0.2)] dark:shadow-[0_0_20px_rgba(37,99,235,0.25)]">
                            <Cpu className="size-5 stroke-[2]" />
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 grid grid-cols-1 gap-2 my-1">
                        {backCredentials.map((cred) => (
                          <div
                            key={cred.label}
                            className="rounded-xl border border-blue-500/30 dark:border-blue-400/20 bg-white/80 dark:bg-white/[0.03] px-3.5 py-2 backdrop-blur-md shadow-xs dark:shadow-none"
                          >
                            <div className="text-[9.5px] font-bold tracking-[0.14em] text-blue-600 dark:text-blue-400 uppercase">
                              {cred.label}
                            </div>
                            <div className="text-xs font-bold dark:font-semibold text-neutral-900 dark:text-white/90 mt-0.5">
                              {cred.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="relative z-10 pt-2.5 border-t border-neutral-300/80 dark:border-white/10 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-[3px] h-5 opacity-80">
                          {[3, 1.5, 4, 1.5, 2, 4, 1.5, 3, 2, 1.5, 4, 2, 3, 1.5, 2.5].map(
                            (w, idx) => (
                              <span
                                key={idx}
                                className="h-full bg-blue-600 dark:bg-blue-400 rounded-xs"
                                style={{ width: `${w}px` }}
                              />
                            )
                          )}
                        </div>

                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] text-blue-600 dark:text-blue-400 uppercase">
                          <RotateCw className="size-3.5" />
                          <span>FLIP TO PORTRAIT</span>
                        </span>
                      </div>
                    </div>

                    <svg
                      aria-hidden="true"
                      viewBox="0 0 400 460"
                      fill="none"
                      className="pointer-events-none absolute inset-0 size-full z-30"
                      preserveAspectRatio="none"
                    >
                      <polygon
                        points="34,2 398,2 398,426 366,458 2,458 2,34"
                        stroke="#3b82f6"
                        strokeWidth="1.8"
                        strokeOpacity="0.92"
                      />
                      <polyline
                        points="2,50 2,28 28,2 52,2"
                        stroke="#3b82f6"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                      <line
                        x1="7"
                        y1="35"
                        x2="35"
                        y2="7"
                        stroke="#3b82f6"
                        strokeWidth="1.6"
                      />
                      <polyline
                        points="346,458 372,458 398,432 398,408"
                        stroke="#3b82f6"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                      <line
                        x1="364"
                        y1="453"
                        x2="393"
                        y2="424"
                        stroke="#3b82f6"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 flex items-center justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={toggleCardFlip}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-white/80 hover:bg-blue-500/10 dark:bg-white/[0.03] dark:hover:bg-blue-500/15 px-4 py-1.5 text-[11px] font-semibold text-neutral-800 dark:text-white/75 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer shadow-xs dark:shadow-none"
                >
                  <RotateCw
                    className={`size-3.5 text-blue-600 dark:text-blue-400 transition-transform duration-500 ${
                      isFlipped ? "rotate-180" : ""
                    }`}
                  />
                  <span>
                    {isFlipped
                      ? "Click to Flip Back to Portrait"
                      : "Hover / Drag 3D • Click Card to Flip"}
                  </span>
                </button>
              </div>
            </div>
          </Reveal>

          {/* ── Right Column: Bio, Feature Pills, Education/Awards, Stats & CTAs (7 cols) ── */}
          <Reveal direction="right" delay={0.12} className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pl-4">
            <div className="space-y-1">
              <h3 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.15] text-neutral-900 dark:text-white">
                Building clean, practical
                <span className="block text-blue-600 dark:text-blue-400">
                  full-stack web applications
                </span>
              </h3>
            </div>

            <p className="max-w-2xl text-sm sm:text-base leading-[1.8] text-neutral-700 dark:text-white/70">
              I am a Full-Stack Developer based in{" "}
              <strong className="text-neutral-950 dark:text-white font-semibold">
                Karachi, Pakistan
              </strong>
              , currently in my{" "}
              <strong className="text-neutral-950 dark:text-white font-semibold">
                3rd semester of the Higher Diploma in Software Engineering (HDSE) at Aptech
              </strong>
              . I build web applications with{" "}
              <strong className="text-neutral-950 dark:text-white font-semibold">
                C# / ASP.NET Core, Angular, PHP / Laravel, SQL Server, and MySQL
              </strong>{" "}
              — including live deployed platforms like{" "}
              <a
                href="http://cook-smart.runasp.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-bold underline underline-offset-4 hover:opacity-80"
              >
                CookSmart
              </a>
              ,{" "}
              <a
                href="https://fan-hub-plus.runasp.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-bold underline underline-offset-4 hover:opacity-80"
              >
                FanHub Plus
              </a>
              , and{" "}
              <a
                href="https://pixel-perfect-replay-10777.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-bold underline underline-offset-4 hover:opacity-80"
              >
                Meraki
              </a>
              .
            </p>

            {/* Education & Competition Highlights Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="rounded-2xl border border-blue-500/30 bg-white/80 dark:bg-white/[0.03] p-4 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  <GraduationCap className="size-4" />
                  <span>{education[0]?.institution}</span>
                </div>
                <p className="mt-1 text-sm font-bold text-neutral-900 dark:text-white">
                  {education[0]?.degree}
                </p>
                <p className="mt-0.5 text-xs text-neutral-600 dark:text-white/60">
                  {education[0]?.status} ({education[0]?.year})
                </p>
              </div>

              <div className="rounded-2xl border border-blue-500/30 bg-white/80 dark:bg-white/[0.03] p-4 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  <Trophy className="size-4" />
                  <span>{achievements[0]?.badge}</span>
                </div>
                <p className="mt-1 text-sm font-bold text-neutral-900 dark:text-white">
                  {achievements[0]?.title}
                </p>
                <p className="mt-0.5 text-xs text-neutral-600 dark:text-white/60">
                  Selected for External Vision Showcase
                </p>
              </div>
            </div>

            {/* 3 Glassmorphic Outlined Feature Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {featurePills.map((pill) => {
                const Icon = pill.icon;
                return (
                  <div
                    key={pill.label}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-blue-500/40 bg-white/80 hover:bg-blue-500/10 dark:bg-white/[0.03] dark:hover:bg-blue-500/15 dark:hover:border-blue-400 backdrop-blur-xl px-4 py-2 text-xs font-semibold text-neutral-800 dark:text-white/90 transition-all duration-200 shadow-xs cursor-default"
                  >
                    <Icon className="size-3.5 text-blue-600 dark:text-blue-400 stroke-[2]" />
                    <span>{pill.label}</span>
                  </div>
                );
              })}
            </div>

            {/* 3 Architectural Stat Badges */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-1">
              {aboutStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-6 sm:gap-8"
                  >
                    <div className="group flex items-center gap-3.5 cursor-default">
                      <div className="flex size-11 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                        <Icon className="size-5 stroke-[2]" />
                      </div>

                      <div>
                        <div className="text-base sm:text-lg font-extrabold text-neutral-900 dark:text-white leading-tight">
                          {stat.value}
                        </div>
                        <div className="text-xs font-medium text-neutral-600 dark:text-white/55 mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    </div>

                    {idx < aboutStats.length - 1 && (
                      <div className="h-9 w-px bg-neutral-300 dark:bg-white/15 hidden sm:block" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Dual 3D Soft Tactile CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                onClick={scrollToContact}
                className="group inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.1em] text-white transition-all duration-300 cursor-pointer select-none
                  bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600
                  hover:brightness-110
                  border border-blue-400/40
                  shadow-[0_4px_14px_rgba(37,99,235,0.35),0_10px_28px_rgba(37,99,235,0.25),inset_0_1px_1.5px_rgba(255,255,255,0.4)]
                  hover:shadow-[0_8px_24px_rgba(37,99,235,0.5),0_16px_36px_rgba(79,70,229,0.35)]
                  hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]"
              >
                <Send className="size-3.5 stroke-[2.4]" />
                <span>LET&apos;S WORK TOGETHER</span>
                <ArrowRight className="size-4 stroke-[2.4] transition-transform duration-200 group-hover:translate-x-1" />
              </a>

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
                  dark:bg-[#101420]/80 dark:hover:bg-[#151c2e]/90 dark:text-white dark:border-white/15 dark:hover:border-blue-400/80
                  dark:shadow-[0_4px_20px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.18)]
                  dark:hover:shadow-[0_8px_30px_rgba(37,99,235,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)]
                  hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]"
              >
                <Download className="size-3.5 stroke-[2.4] text-blue-600 dark:text-blue-400 transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span>DOWNLOAD CV</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
