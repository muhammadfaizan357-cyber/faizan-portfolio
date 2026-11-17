import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";

const SIZE = 68;
const SECTION_IDS = ["home", "about", "stack", "projects", "services", "process", "contact"];

const MESSAGES = [
  "Welcome to Muhammad Faizan's portfolio 👋",
  "Specialized in C# / ASP.NET Core, Angular & Laravel 💻",
  "Check out the live deployed apps & case studies 🚀",
  "Available for full-stack roles & freelance projects ✨",
  "You can drag me anywhere on the screen! ✋",
];

const SECTION_MESSAGES: Record<string, string> = {
  about: "Background & Education 🎓",
  stack: "Core Tech Stack & Tools 💻",
  projects: "Featured Projects & Case Studies 🚀",
  services: "Services & Capabilities ⚡",
  process: "Development Workflow 🛠️",
  contact: "Get in Touch ✉️",
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/** Draggable assistant mascot with professional English tooltips. */
export function CuteSticker() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const [section, setSection] = useState("home");
  const [bubble, setBubble] = useState<string | null>(null);
  const [flying, setFlying] = useState<"up" | "down" | null>(null);
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [look, setLook] = useState({ x: 0, y: 0 });

  const rootRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const msgIndex = useRef(0);
  const prevSection = useRef("home");
  const bubbleTimer = useRef<number | undefined>(undefined);
  const flyTimer = useRef<number | undefined>(undefined);
  const placed = useRef(false);

  const move = (tx: number, ty: number, duration = 1.1) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const nx = clamp(tx, 12, w - SIZE - 12);
    const ny = clamp(ty, 12, h - SIZE - 12);
    const opts = { type: "spring", stiffness: 70, damping: 14, mass: 0.8, duration } as const;
    animate(x, nx, opts);
    animate(y, ny, opts);
  };

  const say = (text: string, ms = 2800) => {
    setBubble(text);
    window.clearTimeout(bubbleTimer.current);
    bubbleTimer.current = window.setTimeout(() => setBubble(null), ms);
  };

  // Initial placement on hero heading + intro message
  useEffect(() => {
    setMounted(true);
    const t = window.setTimeout(() => {
      const h1 = document.querySelector("#home h1");
      const r = h1?.getBoundingClientRect();
      x.set(r ? r.right + 16 : 120);
      y.set(r ? r.top - 24 : 160);
      placed.current = true;
      say("Welcome to Faizan's Portfolio 👋");
    }, 1200);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(bubbleTimer.current);
      window.clearTimeout(flyTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track active section while scrolling
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.4;
      let current = "home";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setSection((s) => (s === current ? s : current));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fly beside the section heading when section changes
  useEffect(() => {
    if (!placed.current || section === prevSection.current) return;
    const dir = SECTION_IDS.indexOf(section) > SECTION_IDS.indexOf(prevSection.current) ? "down" : "up";
    prevSection.current = section;
    setFlying(dir);
    window.clearTimeout(flyTimer.current);
    flyTimer.current = window.setTimeout(() => {
      const el = document.getElementById(section);
      const heading = el?.querySelector("h1, h2") as HTMLElement | null;
      const r = heading?.getBoundingClientRect();
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (r && r.top > 0 && r.top < h - SIZE) {
        move(Math.min(r.right + 20, w - SIZE - 24), Math.max(80, r.top - 16));
      } else {
        move(w - SIZE - 32, h * 0.25);
      }
      setFlying(null);
      const msg = SECTION_MESSAGES[section];
      if (msg) say(msg);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  // Pupils follow the cursor
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const r = rootRef.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 200) * 2.2;
      setLook({ x: (dx / d) * k, y: (dy / d) * k });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const onTap = () => {
    msgIndex.current = (msgIndex.current + 1) % MESSAGES.length;
    say(MESSAGES[msgIndex.current] ?? "Welcome!", 3200);
  };

  if (!mounted) return null;

  return (
    <motion.div
      ref={rootRef}
      drag
      dragMomentum={false}
      onDragStart={() => {
        dragging.current = true;
        animate(x, x.get(), { duration: 0 });
        animate(y, y.get(), { duration: 0 });
      }}
      onDragEnd={() => {
        dragging.current = false;
      }}
      onHoverStart={() => {
        setHovered(true);
        say("Click me for quick portfolio highlights ✨", 2200);
      }}
      onHoverEnd={() => setHovered(false)}
      onTap={onTap}
      whileDrag={{ scale: 1.12, rotate: -6, cursor: "grabbing" }}
      style={{ x, y, width: SIZE, height: SIZE, touchAction: "none" }}
      className="fixed left-0 top-0 z-[60] cursor-grab select-none"
      aria-label="Interactive portfolio assistant — click or drag"
    >
      <AnimatePresence>
        {bubble && (
          <motion.div
            key={bubble}
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            className="pointer-events-none absolute bottom-full left-1/2 mb-3 w-max max-w-[240px] -translate-x-1/2 rounded-2xl border border-blue-500/50 bg-white/95 dark:bg-[#0c1220]/95 px-3.5 py-2 text-center text-xs font-semibold text-neutral-900 dark:text-white shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-md"
          >
            {bubble}
            <span className="absolute left-1/2 top-full -mt-[5px] size-2.5 -translate-x-1/2 rotate-45 border-b border-r border-blue-500/50 bg-white dark:bg-[#0c1220]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot buddy */}
      <motion.div
        animate={
          flying
            ? { y: flying === "down" ? [0, 8, 0] : [0, -8, 0], rotate: flying === "down" ? 8 : -8 }
            : hovered
              ? { y: [0, -10, 0], rotate: [0, -4, 4, 0] }
              : { y: [0, -6, 0], rotate: [-1.5, 1.5, -1.5] }
        }
        transition={{ duration: hovered ? 0.6 : flying ? 0.45 : 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative size-full"
      >
        <svg viewBox="0 0 100 110" className="pointer-events-none size-full overflow-visible">
          <defs>
            <linearGradient id="rb-body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#dfe6f2" />
            </linearGradient>
            <linearGradient id="rb-blue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <radialGradient id="rb-flame" cx="50%" cy="0%" r="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="60%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ground shadow */}
          <ellipse cx="50" cy="106" rx="24" ry="3.2" fill="#000" opacity="0.18" />

          {/* jet flame while flying */}
          {flying && (
            <motion.path
              d="M40 96Q50 126 60 96Z"
              fill="url(#rb-flame)"
              animate={{ scaleY: [0.7, 1.3, 0.7] }}
              style={{ originX: "50px", originY: "96px" }}
              transition={{ duration: 0.18, repeat: Infinity }}
            />
          )}

          {/* legs */}
          <motion.rect
            x="36"
            y="88"
            width="9"
            height="12"
            rx="4.5"
            fill="#1f2937"
            animate={{ y: flying ? 0 : [0, -3, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <motion.rect
            x="55"
            y="88"
            width="9"
            height="12"
            rx="4.5"
            fill="#1f2937"
            animate={{ y: flying ? 0 : [-3, 0, -3] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />

          {/* arms */}
          <motion.g
            animate={{ rotate: hovered ? [0, -40, 0] : [0, 6, 0] }}
            style={{ originX: "20px", originY: "66px" }}
            transition={{ duration: hovered ? 0.4 : 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="9" y="62" width="11" height="24" rx="5.5" fill="url(#rb-blue)" stroke="#fff" strokeWidth="2" />
          </motion.g>
          <motion.g
            animate={{ rotate: hovered ? [0, 40, 0] : [0, -6, 0] }}
            style={{ originX: "80px", originY: "66px" }}
            transition={{ duration: hovered ? 0.4 : 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            <rect x="80" y="62" width="11" height="24" rx="5.5" fill="url(#rb-blue)" stroke="#fff" strokeWidth="2" />
          </motion.g>

          {/* body */}
          <rect x="24" y="58" width="52" height="38" rx="16" fill="url(#rb-blue)" stroke="#fff" strokeWidth="3" />
          <rect x="38" y="68" width="24" height="16" rx="6" fill="#0b0d12" />
          <text x="50" y="80" textAnchor="middle" fontSize="11" fontWeight="800" fill="#60a5fa" fontFamily="monospace">
            {"</>"}
          </text>

          {/* antenna */}
          <motion.g
            animate={{ rotate: [-10, 10, -10] }}
            style={{ originX: "50px", originY: "20px" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="50" y1="20" x2="50" y2="6" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
            <motion.circle
              cx="50"
              cy="5"
              r="4.5"
              fill="#3b82f6"
              stroke="#fff"
              strokeWidth="1.5"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.g>

          {/* head */}
          <rect x="14" y="18" width="72" height="50" rx="24" fill="url(#rb-body)" stroke="#fff" strokeWidth="3" />
          <rect x="14" y="18" width="72" height="50" rx="24" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          {/* ear pods */}
          <rect x="8" y="36" width="8" height="14" rx="4" fill="#3b82f6" />
          <rect x="84" y="36" width="8" height="14" rx="4" fill="#3b82f6" />
          {/* face screen */}
          <rect x="21" y="26" width="58" height="34" rx="16" fill="#0b0d12" />

          {/* eyes */}
          {hovered ? (
            <g stroke="#f5d97a" strokeWidth="3.4" strokeLinecap="round" fill="none">
              <path d="M31 44Q36 36 41 44" />
              <path d="M59 44Q64 36 69 44" />
            </g>
          ) : (
            <g fill="#7dd3fc">
              <ellipse cx={36 + look.x} cy={40 + look.y} rx="5" ry="6.5">
                <animate attributeName="ry" values="6.5;6.5;6.5;0.8;6.5" keyTimes="0;0.9;0.94;0.97;1" dur="4s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx={64 + look.x} cy={40 + look.y} rx="5" ry="6.5">
                <animate attributeName="ry" values="6.5;6.5;6.5;0.8;6.5" keyTimes="0;0.9;0.94;0.97;1" dur="4s" repeatCount="indefinite" />
              </ellipse>
            </g>
          )}

          {/* cheeks */}
          <circle cx="27" cy="51" r={hovered ? 4.5 : 3} fill="#fb7185" opacity="0.7" />
          <circle cx="73" cy="51" r={hovered ? 4.5 : 3} fill="#fb7185" opacity="0.7" />

          {/* mouth */}
          {hovered ? (
            <path d="M42 48Q50 60 58 48Z" fill="#fb7185" />
          ) : (
            <path d="M44 49Q50 55 56 49" stroke="#7dd3fc" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          )}
        </svg>
      </motion.div>
    </motion.div>
  );
}
