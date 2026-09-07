import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import {
  Volume2,
  VolumeX,
  Sparkles,
  RefreshCw,
  Trophy,
  Flame,
  Target,
  Award,
  Zap,
  CheckCircle2,
  Crosshair,
  Info,
} from "lucide-react";

interface SkillItem {
  id: string;
  name: string;
  shortName: string;
  category: string;
  level: string;
  percent: number;
  color: string;
  accent: string;
  textColor: string;
  iconType: "laravel" | "mysql" | "react" | "api" | "js" | "tailwind" | "wp" | "docker" | "next" | "git";
  highlights: string;
}

const SKILLS_LIST: SkillItem[] = [
  {
    id: "laravel",
    name: "PHP & Laravel",
    shortName: "LARAVEL",
    category: "Backend Framework",
    level: "95%",
    percent: 95,
    color: "#f43f5e", // Vivid ruby red
    accent: "#fda4af",
    textColor: "#ffffff",
    iconType: "laravel",
    highlights: "Eloquent ORM • MVC • Blade • Robust Auth & Queues",
  },
  {
    id: "mysql",
    name: "MySQL & SQL",
    shortName: "MYSQL",
    category: "Database Architect",
    level: "92%",
    percent: 92,
    color: "#14b8a6", // Deep teal
    accent: "#99f6e4",
    textColor: "#ffffff",
    iconType: "mysql",
    highlights: "Schema Design • Indexing • Stored Procedures • Optimization",
  },
  {
    id: "react",
    name: "React.js 19",
    shortName: "REACT",
    category: "Frontend UI",
    level: "94%",
    percent: 94,
    color: "#0ea5e9", // Electric Sky Blue
    accent: "#7dd3fc",
    textColor: "#ffffff",
    iconType: "react",
    highlights: "Hooks • Server Components • High-Performance UI State",
  },
  {
    id: "rest-api",
    name: "RESTful APIs",
    shortName: "REST API",
    category: "API Architecture",
    level: "93%",
    percent: 93,
    color: "#22c55e", // Emerald green
    accent: "#bbf7d0",
    textColor: "#ffffff",
    iconType: "api",
    highlights: "JSON Endpoints • JWT / OAuth2 • Rate Limiting • Microservices",
  },
  {
    id: "javascript",
    name: "JavaScript ES6+",
    shortName: "JS / TS",
    category: "Core Modern Web",
    level: "95%",
    percent: 95,
    color: "#f59e0b", // Warm amber gold
    accent: "#fde68a",
    textColor: "#ffffff",
    iconType: "js",
    highlights: "TypeScript • Async/Await • Event Loop • Clean Architecture",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    shortName: "TAILWIND",
    category: "Responsive Styling",
    level: "96%",
    percent: 96,
    color: "#06b6d4", // Cyan
    accent: "#a5f3fc",
    textColor: "#ffffff",
    iconType: "tailwind",
    highlights: "Utility-First CSS • Dark Mode • Fluid Layouts • Custom Themes",
  },
  {
    id: "wordpress",
    name: "WordPress & CMS",
    shortName: "WORDPRESS",
    category: "E-Commerce Web",
    level: "88%",
    percent: 88,
    color: "#3b82f6", // Royal blue
    accent: "#bfdbfe",
    textColor: "#ffffff",
    iconType: "wp",
    highlights: "Custom Theme & Plugin Dev • WooCommerce • Speed Optimization",
  },
  {
    id: "docker",
    name: "Docker & CI/CD",
    shortName: "DOCKER",
    category: "DevOps & Cloud",
    level: "86%",
    percent: 86,
    color: "#0284c7", // Marine ocean
    accent: "#bae6fd",
    textColor: "#ffffff",
    iconType: "docker",
    highlights: "Multi-stage Builds • Compose Stacks • Continuous Integration",
  },
  {
    id: "nextjs",
    name: "Next.js & SSR",
    shortName: "NEXT.JS",
    category: "Full-Stack Web",
    level: "90%",
    percent: 90,
    color: "#8b5cf6", // Vivid violet
    accent: "#ddd6fe",
    textColor: "#ffffff",
    iconType: "next",
    highlights: "App Router • Server Actions • Static Site Generation (SSG)",
  },
  {
    id: "git",
    name: "Git & Versioning",
    shortName: "GIT",
    category: "Release Control",
    level: "94%",
    percent: 94,
    color: "#f97316", // Vibrant orange
    accent: "#fed7aa",
    textColor: "#ffffff",
    iconType: "git",
    highlights: "Gitflow • Pull Request Reviews • CI/CD Automated Pipelines",
  },
];

// Helper to draw specialized crisp icon graphics directly onto the canvas texture
function drawSkillIcon(ctx: CanvasRenderingContext2D, type: SkillItem["iconType"], color: string, accent: string) {
  ctx.save();
  ctx.translate(512, 360); // Centered in upper badge area

  ctx.strokeStyle = accent;
  ctx.fillStyle = accent;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (type === "react") {
    // Atom Nucleus
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    // 3 Rotating Orbital Ellipses
    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 3);
      ctx.beginPath();
      ctx.ellipse(0, 0, 48, 16, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  } else if (type === "laravel") {
    // Isometric Layered 3D Chevron Shield
    ctx.beginPath();
    ctx.moveTo(0, -38);
    ctx.lineTo(34, -18);
    ctx.lineTo(34, 18);
    ctx.lineTo(0, 38);
    ctx.lineTo(-34, 18);
    ctx.lineTo(-34, -18);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -38);
    ctx.lineTo(0, 38);
    ctx.moveTo(0, 0);
    ctx.lineTo(34, -18);
    ctx.moveTo(0, 0);
    ctx.lineTo(-34, -18);
    ctx.stroke();
  } else if (type === "mysql") {
    // 3D Database Cylinder Discs
    for (let i = -1; i <= 1; i++) {
      const y = i * 22;
      ctx.beginPath();
      ctx.ellipse(0, y, 38, 12, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(-38, -22);
    ctx.lineTo(-38, 22);
    ctx.moveTo(38, -22);
    ctx.lineTo(38, 22);
    ctx.stroke();
  } else if (type === "api") {
    // Network Nodes Interconnect
    ctx.beginPath();
    ctx.arc(-26, 0, 12, 0, Math.PI * 2);
    ctx.arc(26, -18, 10, 0, Math.PI * 2);
    ctx.arc(26, 18, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-14, 0);
    ctx.lineTo(16, -16);
    ctx.moveTo(-14, 0);
    ctx.lineTo(16, 16);
    ctx.stroke();
  } else if (type === "js") {
    // Curly Braces Code Badge { JS }
    ctx.font = "900 46px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("{ JS }", 0, 2);
  } else if (type === "tailwind") {
    // Flowing Dual Wave Swooshes
    ctx.beginPath();
    ctx.moveTo(-36, 6);
    ctx.bezierCurveTo(-26, -18, -10, -18, 0, 2);
    ctx.bezierCurveTo(10, 22, 26, 22, 36, 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-28, 18);
    ctx.bezierCurveTo(-20, 2, -8, 2, 0, 16);
    ctx.bezierCurveTo(8, 30, 20, 30, 28, 16);
    ctx.stroke();
  } else if (type === "wp") {
    // WordPress 'W' in Outer Circle
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-22, -18);
    ctx.lineTo(-12, 18);
    ctx.lineTo(0, -6);
    ctx.lineTo(12, 18);
    ctx.lineTo(22, -18);
    ctx.stroke();
  } else if (type === "docker") {
    // Cargo Container Stack
    ctx.strokeRect(-26, -6, 16, 14);
    ctx.strokeRect(-6, -6, 16, 14);
    ctx.strokeRect(14, -6, 16, 14);
    ctx.strokeRect(-16, -22, 16, 14);
    ctx.strokeRect(4, -22, 16, 14);

    // Water base
    ctx.beginPath();
    ctx.moveTo(-38, 18);
    ctx.bezierCurveTo(-15, 26, 15, 26, 38, 18);
    ctx.stroke();
  } else if (type === "next") {
    // Bold 'N' with futuristic diagonal slash
    ctx.font = "900 52px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("N", 0, 0);
  } else if (type === "git") {
    // Git Branching Tree Nodes
    ctx.beginPath();
    ctx.arc(-16, 16, 9, 0, Math.PI * 2);
    ctx.arc(-16, -16, 9, 0, Math.PI * 2);
    ctx.arc(16, -6, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-16, 7);
    ctx.lineTo(-16, -7);
    ctx.moveTo(-16, 10);
    ctx.quadraticCurveTo(0, 10, 10, -2);
    ctx.stroke();
  }

  ctx.restore();
}

// Generates high-definition glassmorphic silkscreen texture for the perfectly spherical round orb
function createSphericalGlassTexture(skill: SkillItem): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  // 1. Translucent colored glass base with studio ambient sphere shading
  const bgGrad = ctx.createRadialGradient(440, 360, 50, 512, 512, 520);
  bgGrad.addColorStop(0, skill.accent);
  bgGrad.addColorStop(0.38, skill.color);
  bgGrad.addColorStop(0.82, "#090f1d");
  bgGrad.addColorStop(1.0, "#030611");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. Realistic Studio Softbox Specular Highlight Curve (Top Left Arc)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(390, 260, 140, 60, -Math.PI / 4, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.filter = "blur(12px)";
  ctx.fill();
  ctx.restore();

  // Secondary soft specular rim (Bottom Right)
  ctx.save();
  ctx.beginPath();
  ctx.arc(680, 680, 200, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  ctx.filter = "blur(20px)";
  ctx.fill();
  ctx.restore();

  // 3. Frosted Glassmorphism Front Emblem Disc (Center 512, 512)
  ctx.save();
  ctx.beginPath();
  ctx.arc(512, 512, 235, 0, Math.PI * 2);
  const badgeBg = ctx.createRadialGradient(512, 430, 40, 512, 512, 235);
  badgeBg.addColorStop(0, "rgba(255, 255, 255, 0.28)");
  badgeBg.addColorStop(0.5, "rgba(10, 16, 32, 0.82)");
  badgeBg.addColorStop(1, "rgba(3, 6, 15, 0.95)");
  ctx.fillStyle = badgeBg;
  ctx.fill();

  // Glowing Neon Border Ring
  ctx.strokeStyle = skill.accent;
  ctx.lineWidth = 7;
  ctx.shadowColor = skill.accent;
  ctx.shadowBlur = 24;
  ctx.stroke();
  ctx.restore();

  // 4. Draw Crisp Tech Icon Symbol
  drawSkillIcon(ctx, skill.iconType, skill.color, skill.accent);

  // 5. Category Pill
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
  ctx.beginPath();
  ctx.roundRect(362, 440, 300, 36, 18);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = skill.accent;
  ctx.font = "bold 18px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(skill.category.toUpperCase(), 512, 458);
  ctx.restore();

  // 6. Prominent Skill Short Name (Crisp Bold Typography)
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 64px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 4;
  ctx.fillText(skill.shortName, 512, 530);

  // Proficiency Meter Bar
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  ctx.beginPath();
  ctx.roundRect(392, 580, 240, 16, 8);
  ctx.fill();

  ctx.fillStyle = skill.accent;
  ctx.beginPath();
  ctx.roundRect(392, 580, (240 * skill.percent) / 100, 16, 8);
  ctx.shadowColor = skill.accent;
  ctx.shadowBlur = 10;
  ctx.fill();

  // Percentage Text
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 20px monospace, sans-serif";
  ctx.shadowBlur = 6;
  ctx.fillText(`⚡ ${skill.level} PROFICIENT`, 512, 630);

  // Click to burst hint
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = "bold 15px Inter, system-ui, sans-serif";
  ctx.fillText("TAP TO BURST", 512, 672);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

// Audio Synthesizer for high quality arcade glass/crystal pop sound
class ArcadePopAudio {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private init() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playPop(combo: number = 1) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Crisp Glass Fracture Noise Burst
      const bufSize = Math.floor(this.ctx.sampleRate * 0.06);
      const buffer = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.18));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(2200 + Math.min(combo * 180, 1600), now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.75, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.005, now + 0.055);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);

      // 2. Punchy Air Pressure Release
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(240 + Math.min(combo * 30, 180), now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.15);

      oscGain.gain.setValueAtTime(0.95, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);

      // 3. Sparkling Crystal Resonant Chime
      const chime = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chime.type = "sine";
      chime.frequency.setValueAtTime(880 + combo * 110, now);
      chime.frequency.exponentialRampToValueAtTime(1480 + combo * 90, now + 0.18);

      chimeGain.gain.setValueAtTime(0.22, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      chime.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);
      chime.start(now);
      chime.stop(now + 0.24);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playPipeLaunch() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Pneumatic air piston launch puff
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.2);

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    } catch {
      // Ignore
    }
  }
}

interface BalloonEntity {
  skill: SkillItem;
  group: THREE.Group;
  mesh: THREE.Mesh;
  glowLight: THREE.PointLight;
  stringPositions: THREE.BufferAttribute;
  vx: number;
  vy: number;
  vz: number;
  targetScale: number;
  currentScale: number;
  radius: number;
  isEmergingFromPipe: boolean;
  pipeProgress: number;
  wobblePhase: number;
  wobbleSpeed: number;
  preferredX: number;
}

interface ShardParticle {
  mesh: THREE.Mesh;
  vx: number;
  vy: number;
  vz: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  life: number;
  maxLife: number;
}

interface ScorePopupItem {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  combo: number;
}

export function SkillsBalloonChamber() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<ArcadePopAudio>(new ArcadePopAudio());

  // Game State
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [comboTimeLeft, setComboTimeLeft] = useState(0);
  const [poppedSkills, setPoppedSkills] = useState<Set<string>>(new Set());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeNotice, setActiveNotice] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);
  const [scorePopups, setScorePopups] = useState<ScorePopupItem[]>([]);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; visible: boolean }>({
    x: -100,
    y: -100,
    visible: false,
  });

  // Load High Score
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dean_balloon_high_score");
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    } catch {
      // Ignore
    }
  }, []);

  // Update sound engine toggle
  useEffect(() => {
    audioRef.current.enabled = soundEnabled;
  }, [soundEnabled]);

  // Combo timer countdown
  useEffect(() => {
    if (comboTimeLeft <= 0) {
      if (combo > 1) setCombo(1);
      return;
    }
    const timer = setInterval(() => {
      setComboTimeLeft((prev) => Math.max(0, prev - 0.1));
    }, 100);
    return () => clearInterval(timer);
  }, [comboTimeLeft, combo]);

  // Developer Rank Calculation
  const rankInfo = useMemo(() => {
    if (score < 400) return { title: "Junior Coder", color: "text-blue-400" };
    if (score < 900) return { title: "Mid Full-Stack", color: "text-emerald-400" };
    if (score < 1600) return { title: "Senior Architect", color: "text-cyan-400" };
    if (score < 2600) return { title: "Laravel Sensei 🔥", color: "text-purple-400" };
    return { title: "Tech God 👑", color: "text-amber-400" };
  }, [score]);

  // Trigger manual launch of extra balloons
  const triggerPipeLaunchRef = useRef<() => void>(() => {});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let destroyed = false;

    // --- Canvas Dimensions & Aspect ---
    const width = container.clientWidth || 920;
    const height = container.clientHeight || 640;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 14.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- High-End Studio Environment Map for Realistic Glass & Chrome Reflections ---
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envCanvas = document.createElement("canvas");
    envCanvas.width = 512;
    envCanvas.height = 256;
    const envCtx = envCanvas.getContext("2d")!;

    const envGrad = envCtx.createLinearGradient(0, 0, 0, 256);
    envGrad.addColorStop(0, "#1e293b");
    envGrad.addColorStop(0.35, "#0f172a");
    envGrad.addColorStop(0.75, "#020617");
    envGrad.addColorStop(1, "#020617");
    envCtx.fillStyle = envGrad;
    envCtx.fillRect(0, 0, 512, 256);

    // Overhead diffuse softbox
    envCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
    envCtx.filter = "blur(14px)";
    envCtx.fillRect(170, 25, 170, 50);

    // Electric Cyan Left Fill
    envCtx.fillStyle = "rgba(6, 182, 212, 0.7)";
    envCtx.fillRect(35, 95, 75, 90);

    // Purple / Magenta Right Accent
    envCtx.fillStyle = "rgba(168, 85, 247, 0.65)";
    envCtx.fillRect(400, 95, 75, 90);

    const envTex = new THREE.CanvasTexture(envCanvas);
    envTex.mapping = THREE.EquirectangularReflectionMapping;
    const studioEnvMap = pmremGenerator.fromEquirectangular(envTex).texture;
    scene.environment = studioEnvMap;

    // --- Studio Lighting Rig ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Light from upper right
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(7, 12, 11);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Cyan Fill light from left
    const cyanFill = new THREE.DirectionalLight(0x06b6d4, 2.2);
    cyanFill.position.set(-8, 3, 8);
    scene.add(cyanFill);

    // Purple Rim light from back
    const purpleRim = new THREE.DirectionalLight(0xa855f7, 2.5);
    purpleRim.position.set(6, 6, -9);
    scene.add(purpleRim);

    // ─────────────────────────────────────────────────────────────────────────────
    // COMPACT CORNER PNEUMATIC LAUNCHER ("Kone me chota & enhanced pipe")
    // ─────────────────────────────────────────────────────────────────────────────
    const pipeGroup = new THREE.Group();
    const CORNER_PIPE_ORIGIN = new THREE.Vector3(-6.6, -3.2, 0);
    const PIPE_TILT_ANGLE = 0.64; // ~37 degrees pointing diagonally into the chamber

    pipeGroup.position.copy(CORNER_PIPE_ORIGIN);
    pipeGroup.rotation.z = PIPE_TILT_ANGLE;

    const pipeLength = 1.8;
    const pipeRadius = 0.42; // Compact, sleek & proportional
    const mouthX = pipeLength / 2; // +0.9

    // 1. Sleek Aerospace Titanium Cylinder Barrel
    const barrelGeo = new THREE.CylinderGeometry(pipeRadius, pipeRadius, pipeLength, 48, 1, true);
    barrelGeo.rotateZ(Math.PI / 2);
    const barrelMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.18,
      envMap: studioEnvMap,
    });
    const barrelMesh = new THREE.Mesh(barrelGeo, barrelMat);
    pipeGroup.add(barrelMesh);

    // 2. Beveled Chrome Mirror Mouth Ring
    const lipGeo = new THREE.TorusGeometry(pipeRadius, 0.08, 24, 64);
    lipGeo.rotateY(Math.PI / 2);
    const lipMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.98,
      roughness: 0.06,
      envMap: studioEnvMap,
    });
    const lipMesh = new THREE.Mesh(lipGeo, lipMat);
    lipMesh.position.x = mouthX;
    pipeGroup.add(lipMesh);

    // 3. Glowing Cyber Cyan Plasma Collar
    const collarGeo = new THREE.TorusGeometry(pipeRadius + 0.04, 0.03, 16, 48);
    collarGeo.rotateY(Math.PI / 2);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.9,
      metalness: 0.8,
      roughness: 0.2,
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.x = mouthX - 0.1;
    pipeGroup.add(collarMesh);

    // 4. Compact Mounting Flange Base
    const baseFlangeGeo = new THREE.CylinderGeometry(pipeRadius * 1.35, pipeRadius * 1.35, 0.25, 32);
    baseFlangeGeo.rotateZ(Math.PI / 2);
    const baseFlangeMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.92,
      roughness: 0.25,
    });
    const baseFlangeMesh = new THREE.Mesh(baseFlangeGeo, baseFlangeMat);
    baseFlangeMesh.position.x = -mouthX;
    pipeGroup.add(baseFlangeMesh);

    // 5. LED Status Indicator Pips
    const ledCount = 4;
    const ledGeo = new THREE.SphereGeometry(0.028, 16, 16);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    for (let i = 0; i < ledCount; i++) {
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(-mouthX * 0.4 + i * 0.28, pipeRadius + 0.02, 0);
      pipeGroup.add(led);
    }

    // 6. Deep Cavity Interior
    const cavityGeo = new THREE.CylinderGeometry(
      pipeRadius - 0.02,
      pipeRadius - 0.02,
      pipeLength - 0.05,
      36,
      1,
      true
    );
    cavityGeo.rotateZ(Math.PI / 2);
    const cavityMat = new THREE.MeshBasicMaterial({
      color: 0x020408,
      side: THREE.BackSide,
    });
    const cavityMesh = new THREE.Mesh(cavityGeo, cavityMat);
    pipeGroup.add(cavityMesh);

    // 7. Pipe Mouth Interior LED Glow
    const pipePointLight = new THREE.PointLight(0x06b6d4, 3.5, 6);
    pipePointLight.position.set(mouthX + 0.2, 0, 0);
    pipeGroup.add(pipePointLight);

    // 8. Fine Pneumatic Particle Mist at Mouth
    const steamCount = 35;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamData: { x: number; y: number; z: number; speed: number }[] = [];

    for (let i = 0; i < steamCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const rad = Math.random() * (pipeRadius * 0.6);
      const x = mouthX + Math.random() * 0.7;
      const y = Math.sin(angle) * rad;
      const z = Math.cos(angle) * rad;
      steamData.push({ x, y, z, speed: 0.015 + Math.random() * 0.025 });

      steamPositions[i * 3] = x;
      steamPositions[i * 3 + 1] = y;
      steamPositions[i * 3 + 2] = z;
    }

    steamGeo.setAttribute("position", new THREE.BufferAttribute(steamPositions, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.045,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const steamPoints = new THREE.Points(steamGeo, steamMat);
    pipeGroup.add(steamPoints);

    scene.add(pipeGroup);

    // Launch vector in world space
    const launchDir = new THREE.Vector3(Math.cos(PIPE_TILT_ANGLE), Math.sin(PIPE_TILT_ANGLE), 0).normalize();
    const pipeMouthWorldPos = CORNER_PIPE_ORIGIN.clone().add(launchDir.clone().multiplyScalar(mouthX));

    // ─────────────────────────────────────────────────────────────────────────────
    // SMALLER & PERFECTLY ROUND GLASS ORB BALLOONS ("Chhota Gol Balloon")
    // ─────────────────────────────────────────────────────────────────────────────
    // Sphere radius = 0.72 (compact, perfectly round crystal glass orb)
    const ORB_RADIUS = 0.72;
    const balloonGeo = new THREE.SphereGeometry(ORB_RADIUS, 64, 64);

    const knotRingGeo = new THREE.TorusGeometry(0.08, 0.024, 16, 32);
    knotRingGeo.rotateX(Math.PI / 2);

    const balloons: BalloonEntity[] = [];
    const burstShards: ShardParticle[] = [];
    const respawnQueue: { skill: SkillItem; triggerTime: number }[] = [];

    // Wide Spacious Floating Arena Boundaries
    const BOUNDS = {
      minX: -6.0,
      maxX: 6.0,
      minY: -3.2,
      maxY: 3.5,
      minZ: -2.2,
      maxZ: 2.2,
    };

    // Shard geometries for burst explosion
    const shardGeos = [
      new THREE.BoxGeometry(0.1, 0.1, 0.02),
      new THREE.TetrahedronGeometry(0.1),
      new THREE.PlaneGeometry(0.12, 0.06),
    ];

    function spawnBalloon(skill: SkillItem, delayFrames: number = 0) {
      const group = new THREE.Group();

      // High-Gloss Glassmorphic Material with crisp silkscreen badge
      const texture = createSphericalGlassTexture(skill);
      const balloonMat = new THREE.MeshPhysicalMaterial({
        map: texture,
        roughness: 0.09,
        metalness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
        transmission: 0.38, // High-clarity frosted glass transmission
        transparent: true,
        opacity: 0.96,
        ior: 1.48,
        thickness: 1.2,
        reflectivity: 0.94,
        sheen: 0.8,
        sheenColor: new THREE.Color(skill.accent),
        envMap: studioEnvMap,
      });

      const balloonMesh = new THREE.Mesh(balloonGeo, balloonMat);
      balloonMesh.castShadow = true;
      group.add(balloonMesh);

      // Inner Accent Glow Point Light
      const glowLight = new THREE.PointLight(new THREE.Color(skill.accent), 1.5, 3.2);
      glowLight.position.set(0, 0, 0);
      group.add(glowLight);

      // Sleek Glass Tether Knot at the bottom pole
      const knotMat = new THREE.MeshStandardMaterial({
        color: skill.color,
        roughness: 0.2,
        metalness: 0.6,
      });
      const knotMesh = new THREE.Mesh(knotRingGeo, knotMat);
      knotMesh.position.y = -ORB_RADIUS - 0.03;
      group.add(knotMesh);

      // Silky Ribbon String
      const stringSegments = 10;
      const stringPoints: THREE.Vector3[] = [];
      for (let s = 0; s <= stringSegments; s++) {
        stringPoints.push(new THREE.Vector3(0, -ORB_RADIUS - 0.08 - s * 0.14, 0));
      }
      const stringGeo = new THREE.BufferGeometry().setFromPoints(stringPoints);
      const stringMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.45,
      });
      const stringLine = new THREE.Line(stringGeo, stringMat);
      group.add(stringLine);

      // Initial Position: Deep inside corner pipe
      const spawnOffset = -1.4;
      const initialPos = CORNER_PIPE_ORIGIN.clone().add(launchDir.clone().multiplyScalar(spawnOffset));
      group.position.copy(initialPos);
      group.scale.set(0.28, 0.28, 0.28);
      group.userData = { skillId: skill.id };

      scene.add(group);

      const stringPositions = stringLine.geometry.attributes["position"] as THREE.BufferAttribute;

      // Assign a preferred horizontal resting position so balloons spread across the whole arena
      const skillIdx = SKILLS_LIST.findIndex((s) => s.id === skill.id);
      const preferredX = -4.6 + ((skillIdx >= 0 ? skillIdx : Math.random() * 10) * 0.98);

      const entity: BalloonEntity = {
        skill,
        group,
        mesh: balloonMesh,
        glowLight,
        stringPositions,
        vx: launchDir.x * (0.05 + Math.random() * 0.03),
        vy: launchDir.y * (0.05 + Math.random() * 0.03),
        vz: (Math.random() - 0.5) * 0.015,
        targetScale: 1.0,
        currentScale: 0.28,
        radius: ORB_RADIUS,
        isEmergingFromPipe: true,
        pipeProgress: -delayFrames,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.7 + Math.random() * 0.35,
        preferredX,
      };

      balloons.push(entity);
    }

    // Sequentially spawn all skills with staggered emergence
    SKILLS_LIST.forEach((skill, index) => {
      spawnBalloon(skill, index * 24);
    });

    // Manual Launch Trigger
    triggerPipeLaunchRef.current = () => {
      audioRef.current.playPipeLaunch();
      pipePointLight.intensity = 8.0;
      setTimeout(() => {
        if (!destroyed) pipePointLight.intensity = 3.5;
      }, 400);

      const random1 = SKILLS_LIST[Math.floor(Math.random() * SKILLS_LIST.length)]!;
      const random2 = SKILLS_LIST[Math.floor(Math.random() * SKILLS_LIST.length)]!;
      spawnBalloon(random1, 0);
      spawnBalloon(random2, 14);
    };

    // ─────────────────────────────────────────────────────────────────────────────
    // SATISFYING GLASS CRYSTAL SHATTER BURST
    // ─────────────────────────────────────────────────────────────────────────────
    function triggerPop(entity: BalloonEntity, screenX: number, screenY: number) {
      const pos = entity.group.position;

      // Audio: crisp crystal shatter
      audioRef.current.playPop(combo);

      // Score Calculation
      const basePts = 100;
      const ptsEarned = basePts * combo;

      setScore((prev) => {
        const next = prev + ptsEarned;
        setHighScore((currHigh) => {
          if (next > currHigh) {
            try {
              localStorage.setItem("dean_balloon_high_score", next.toString());
            } catch {
              // Ignore
            }
            return next;
          }
          return currHigh;
        });
        return next;
      });

      // Increment Combo (Max 5X)
      setCombo((prev) => Math.min(5, prev + 1));
      setComboTimeLeft(3.0);

      // Mark Skill as Discovered in tray
      setPoppedSkills((prev) => {
        const next = new Set(prev);
        next.add(entity.skill.id);
        return next;
      });

      // HUD Toast Notice
      setActiveNotice(
        combo > 2
          ? `🔥 ${combo}X STREAK! ${entity.skill.shortName} (+${ptsEarned} PTS)`
          : `✨ ${entity.skill.shortName} (+${ptsEarned} PTS)`
      );
      setTimeout(() => setActiveNotice(null), 1800);

      // Floating Score Popup
      const popupId = Date.now() + Math.random();
      setScorePopups((prev) => [
        ...prev,
        {
          id: popupId,
          x: screenX,
          y: screenY,
          text: combo > 1 ? `+${ptsEarned} (${combo}X)` : `+${ptsEarned}`,
          color: entity.skill.color,
          combo,
        },
      ]);
      setTimeout(() => {
        setScorePopups((prev) => prev.filter((p) => p.id !== popupId));
      }, 900);

      // Flash pipe LED momentarily
      pipePointLight.intensity = 7.0;
      setTimeout(() => {
        if (!destroyed) pipePointLight.intensity = 3.5;
      }, 300);

      // 36+ Sparkling Glass Shards Bursting Outward
      const shardCount = 38;
      for (let i = 0; i < shardCount; i++) {
        const geo = shardGeos[i % shardGeos.length]!;
        const mat = new THREE.MeshPhysicalMaterial({
          color: Math.random() > 0.4 ? entity.skill.color : entity.skill.accent,
          roughness: 0.1,
          metalness: 0.1,
          transmission: 0.7,
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide,
        });

        const pMesh = new THREE.Mesh(geo, mat);
        pMesh.position.copy(pos);

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const speed = 0.07 + Math.random() * 0.15;

        const vx = Math.sin(phi) * Math.cos(theta) * speed;
        const vy = Math.sin(phi) * Math.sin(theta) * speed + 0.025;
        const vz = Math.cos(phi) * speed;

        scene.add(pMesh);

        burstShards.push({
          mesh: pMesh,
          vx,
          vy,
          vz,
          rotX: (Math.random() - 0.5) * 0.35,
          rotY: (Math.random() - 0.5) * 0.35,
          rotZ: (Math.random() - 0.5) * 0.35,
          life: 0,
          maxLife: 35 + Math.random() * 22,
        });
      }

      // Shockwave Ring Explosion
      const ringGeo = new THREE.RingGeometry(0.12, 0.32, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: entity.skill.accent,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(camera.position);
      scene.add(ringMesh);

      const expandShockwave = () => {
        if (destroyed || !ringMesh) return;
        ringMesh.scale.multiplyScalar(1.15);
        ringMat.opacity -= 0.06;
        if (ringMat.opacity > 0.05) {
          requestAnimationFrame(expandShockwave);
        } else {
          scene.remove(ringMesh);
          ringGeo.dispose();
          ringMat.dispose();
        }
      };
      expandShockwave();

      // Remove balloon from scene and memory
      scene.remove(entity.group);
      entity.group.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });

      const idx = balloons.indexOf(entity);
      if (idx !== -1) balloons.splice(idx, 1);

      // Respawn queue: emerges smoothly from the corner pipe in 1.8s
      respawnQueue.push({
        skill: entity.skill,
        triggerTime: Date.now() + 1800,
      });
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // POINTER INTERACTIONS & RAYCASTING
    // ─────────────────────────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2(-999, -999);
    const mouseWorld = new THREE.Vector3(0, 0, 0);

    function onPointerDown(e: MouseEvent | TouchEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        const touch = e.touches[0];
        if (!touch) return;
        clientX = touch.clientX;
        clientY = touch.clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      mouseNorm.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseNorm.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseNorm, camera);

      const targets = balloons.map((b) => b.mesh);
      const hits = raycaster.intersectObjects(targets, false);

      if (hits.length > 0) {
        const hit = hits[0];
        if (!hit) return;
        const targetEntity = balloons.find((b) => b.mesh === hit.object);
        if (targetEntity && !targetEntity.isEmergingFromPipe) {
          triggerPop(targetEntity, clientX - rect.left, clientY - rect.top);
        }
      }
    }

    function onPointerMove(e: MouseEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      setMousePos({
        x: relX,
        y: relY,
        visible: relX >= 0 && relX <= rect.width && relY >= 0 && relY <= rect.height,
      });

      mouseNorm.x = (relX / rect.width) * 2 - 1;
      mouseNorm.y = -(relY / rect.height) * 2 + 1;

      const vec = new THREE.Vector3(mouseNorm.x, mouseNorm.y, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mouseWorld.copy(camera.position).add(dir.multiplyScalar(distance));

      // Raycast for hover tooltip inspector
      raycaster.setFromCamera(mouseNorm, camera);
      const targets = balloons.map((b) => b.mesh);
      const hits = raycaster.intersectObjects(targets, false);
      if (hits.length > 0 && hits[0]) {
        const found = balloons.find((b) => b.mesh === hits[0]!.object);
        setHoveredSkill(found && !found.isEmergingFromPipe ? found.skill : null);
      } else {
        setHoveredSkill(null);
      }
    }

    function onPointerLeave() {
      setMousePos((prev) => ({ ...prev, visible: false }));
      mouseNorm.set(-999, -999);
      setHoveredSkill(null);
    }

    const domElem = renderer.domElement;
    domElem.addEventListener("click", onPointerDown);
    domElem.addEventListener("mousemove", onPointerMove);
    domElem.addEventListener("mouseleave", onPointerLeave);

    // ─────────────────────────────────────────────────────────────────────────────
    // 60FPS SMOOTH PHYSICS & ANIMATION ENGINE
    // ─────────────────────────────────────────────────────────────────────────────
    let rafId = 0;
    let clock = 0;

    function animate() {
      if (destroyed) return;
      rafId = requestAnimationFrame(animate);
      clock += 0.016;

      // 1. Animate Steam Vent Particles at Corner Pipe Mouth
      const steamAttr = steamGeo.getAttribute("position") as THREE.BufferAttribute;
      if (steamAttr) {
        for (let i = 0; i < steamCount; i++) {
          const d = steamData[i];
          if (!d) continue;
          d.x += d.speed;
          if (d.x > mouthX + 1.2) {
            d.x = mouthX;
          }
          steamAttr.setXYZ(i, d.x, d.y, d.z);
        }
        steamAttr.needsUpdate = true;
      }

      // 2. Process Respawn Queue
      const now = Date.now();
      for (let i = respawnQueue.length - 1; i >= 0; i--) {
        const q = respawnQueue[i];
        if (!q) continue;
        if (now >= q.triggerTime) {
          respawnQueue.splice(i, 1);
          audioRef.current.playPipeLaunch();
          spawnBalloon(q.skill, 0);
        }
      }

      // 3. Update Balloons
      balloons.forEach((b, i) => {
        // Handle Pipe Emergence (Glides diagonally out of corner launcher)
        if (b.isEmergingFromPipe) {
          b.pipeProgress += 1;
          if (b.pipeProgress < 0) return;

          // Slide forward along the launch angle
          b.group.position.addScaledVector(launchDir, 0.055);

          // Smoothly inflate scale as it emerges
          const distFromMouth = b.group.position.distanceTo(pipeMouthWorldPos);
          const isPastMouth = b.group.position.x > pipeMouthWorldPos.x;

          if (!isPastMouth) {
            b.currentScale = Math.min(0.65, 0.28 + (1.4 - distFromMouth) * 0.35);
          } else {
            b.currentScale = Math.min(1.0, 0.65 + distFromMouth * 0.35);
          }
          b.group.scale.set(b.currentScale, b.currentScale, b.currentScale);

          // Once it has completely exited the mouth and entered the arena
          if (isPastMouth && distFromMouth > 1.1) {
            b.isEmergingFromPipe = false;
            b.currentScale = 1.0;
            b.group.scale.set(1.0, 1.0, 1.0);
            b.vx = 0.02 + (b.preferredX - b.group.position.x) * 0.008;
            b.vy = 0.015 + Math.random() * 0.015;
            b.vz = (Math.random() - 0.5) * 0.015;
          }
          return;
        }

        // Natural Helium Buoyancy (Gentle lift)
        b.vy += 0.00045;

        // Smooth Air Draft Wobble
        const wobble = Math.sin(clock * b.wobbleSpeed + b.wobblePhase);
        b.vx += Math.cos(clock * 0.55 + b.wobblePhase) * 0.00028;
        b.vz += Math.sin(clock * 0.45 + b.wobblePhase) * 0.00028;

        // Gentle horizontal dispersion drift so balloons inhabit the entire arena
        b.vx += (b.preferredX - b.group.position.x) * 0.00018;

        // Air drag damping
        b.vx *= 0.988;
        b.vy *= 0.988;
        b.vz *= 0.988;

        // Position update
        b.group.position.x += b.vx;
        b.group.position.y += b.vy;
        b.group.position.z += b.vz;

        // Realistic balloon tilt and banking
        b.group.rotation.z = -b.vx * 2.2 + wobble * 0.04;
        b.group.rotation.x = b.vz * 1.8 + Math.sin(clock * 0.38 + b.wobblePhase) * 0.035;

        // Gently face front emblem toward camera with slight organic oscillation
        const targetRotY = Math.sin(clock * 0.32 + b.wobblePhase) * 0.16;
        b.group.rotation.y += (targetRotY - b.group.rotation.y) * 0.05;

        // Organic ribbon string physics
        if (b.stringPositions) {
          for (let s = 1; s <= 10; s++) {
            const drag = s * 0.03;
            const wave = Math.sin(clock * 2.4 + s * 0.38) * 0.022;
            const strX = -b.vx * drag * 6.5 + wave;
            const strZ = -b.vz * drag * 6.5;
            b.stringPositions.setXYZ(s, strX, -ORB_RADIUS - 0.08 - s * 0.14, strZ);
          }
          b.stringPositions.needsUpdate = true;
        }

        // Mouse Wind & Gentle Hover Repulsion
        const dx = b.group.position.x - mouseWorld.x;
        const dy = b.group.position.y - mouseWorld.y;
        const distSq = dx * dx + dy * dy;

        // Hover scale feedback
        if (distSq < 1.8) {
          b.targetScale = 1.12;
          b.glowLight.intensity = 3.2;
        } else {
          b.targetScale = 1.0;
          b.glowLight.intensity = 1.5;
        }
        b.currentScale += (b.targetScale - b.currentScale) * 0.12;
        b.group.scale.set(b.currentScale, b.currentScale, b.currentScale);

        // Gentle interactive mouse air ripple
        if (distSq < 3.5 && distSq > 0.01) {
          const force = (3.5 - distSq) * 0.0045;
          b.vx += (dx / Math.sqrt(distSq)) * force;
          b.vy += (dy / Math.sqrt(distSq)) * force;
        }

        // Soft Arena Boundary Cushioning
        const p = b.group.position;
        const r = b.radius;

        if (p.x - r < BOUNDS.minX) {
          p.x = BOUNDS.minX + r;
          b.vx = Math.abs(b.vx) * 0.72 + 0.01;
        } else if (p.x + r > BOUNDS.maxX) {
          p.x = BOUNDS.maxX - r;
          b.vx = -Math.abs(b.vx) * 0.72 - 0.01;
        }

        if (p.y + r > BOUNDS.maxY) {
          p.y = BOUNDS.maxY - r;
          b.vy = -Math.abs(b.vy) * 0.72 - 0.01;
        } else if (p.y - r < BOUNDS.minY) {
          p.y = BOUNDS.minY + r;
          b.vy = Math.abs(b.vy) * 0.72 + 0.01;
        }

        if (p.z - r < BOUNDS.minZ) {
          p.z = BOUNDS.minZ + r;
          b.vz = Math.abs(b.vz) * 0.72 + 0.01;
        } else if (p.z + r > BOUNDS.maxZ) {
          p.z = BOUNDS.maxZ - r;
          b.vz = -Math.abs(b.vz) * 0.72 - 0.01;
        }

        // Inter-Balloon Smooth Elastic Bouncing
        for (let j = i + 1; j < balloons.length; j++) {
          const b2 = balloons[j];
          if (!b2 || b2.isEmergingFromPipe) continue;

          const cdx = b2.group.position.x - p.x;
          const cdy = b2.group.position.y - p.y;
          const cdz = b2.group.position.z - p.z;
          const dist = Math.sqrt(cdx * cdx + cdy * cdy + cdz * cdz);
          const minDist = b.radius + b2.radius;

          if (dist < minDist && dist > 0.001) {
            const overlap = (minDist - dist) * 0.5;
            const nx = cdx / dist;
            const ny = cdy / dist;
            const nz = cdz / dist;

            p.x -= nx * overlap;
            p.y -= ny * overlap;
            p.z -= nz * overlap;

            b2.group.position.x += nx * overlap;
            b2.group.position.y += ny * overlap;
            b2.group.position.z += nz * overlap;

            const repulse = 0.0055;
            b.vx -= nx * repulse;
            b.vy -= ny * repulse;
            b.vz -= nz * repulse;

            b2.vx += nx * repulse;
            b2.vy += ny * repulse;
            b2.vz += nz * repulse;
          }
        }
      });

      // 4. Update Burst Shards
      for (let i = burstShards.length - 1; i >= 0; i--) {
        const s = burstShards[i];
        if (!s) continue;
        s.life += 1;

        s.vy -= 0.0028; // Gravity
        s.mesh.position.x += s.vx;
        s.mesh.position.y += s.vy;
        s.mesh.position.z += s.vz;

        s.mesh.rotation.x += s.rotX;
        s.mesh.rotation.y += s.rotY;
        s.mesh.rotation.z += s.rotZ;

        const scale = 1 - s.life / s.maxLife;
        s.mesh.scale.set(scale, scale, scale);

        if (s.life >= s.maxLife) {
          scene.remove(s.mesh);
          s.mesh.geometry.dispose();
          if (s.mesh.material instanceof THREE.Material) {
            s.mesh.material.dispose();
          }
          burstShards.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    }

    rafId = requestAnimationFrame(animate);

    // --- Resize Observer ---
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight || 640;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      domElem.removeEventListener("click", onPointerDown);
      domElem.removeEventListener("mousemove", onPointerMove);
      domElem.removeEventListener("mouseleave", onPointerLeave);

      if (container.contains(domElem)) {
        container.removeChild(domElem);
      }

      renderer.dispose();
      pmremGenerator.dispose();
      studioEnvMap.dispose();
    };
  }, []);

  const handleResetGame = () => {
    setScore(0);
    setCombo(1);
    setComboTimeLeft(0);
    setPoppedSkills(new Set());
    setActiveNotice("Game Reset! Pop skills to build combo!");
    setTimeout(() => setActiveNotice(null), 2000);
  };

  return (
    <section className="mt-10 sm:mt-16 pt-12 pb-24 border-t border-border/40 relative overflow-hidden bg-background">
      {/* Background Soft Studio Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 size-[650px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-10 right-10 size-[600px] rounded-full bg-purple-500/10 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <span className="size-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Interactive Skill Arena • 3D Glass Orbs</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-foreground leading-[0.9]">
              Skills <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-purple-400">
                Balloon Arena
              </span>
            </h2>
          </div>

          {/* Game Stats & Controls Header Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Player Developer Rank */}
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl border border-border/80 bg-surface/60 backdrop-blur-xl">
              <Award className="size-4 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                  Developer Rank
                </span>
                <span className={`text-xs font-black font-mono ${rankInfo.color}`}>
                  {rankInfo.title}
                </span>
              </div>
            </div>

            {/* Score & Combo HUD */}
            <div className="flex items-center gap-4 px-4 py-2 rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <div className="flex items-center gap-2">
                <Trophy className="size-4 text-yellow-400" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Score</span>
                  <span className="text-sm font-black font-mono text-foreground">{score} PTS</span>
                </div>
              </div>

              <div className="h-6 w-px bg-border/60" />

              {/* Combo Multiplier */}
              <div className="flex items-center gap-1.5">
                <Flame className={`size-4 ${combo > 1 ? "text-orange-400 animate-bounce" : "text-muted-foreground"}`} />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Combo</span>
                  <span
                    className={`text-sm font-black font-mono ${
                      combo > 2 ? "text-orange-400" : combo > 1 ? "text-cyan-400" : "text-muted-foreground"
                    }`}
                  >
                    {combo}X
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Sound, Launch, Reset */}
            <div className="flex items-center gap-2 rounded-2xl border border-border/80 bg-surface/60 p-1.5 backdrop-blur-xl">
              <button
                onClick={() => setSoundEnabled((v) => !v)}
                title={soundEnabled ? "Mute Game Sound" : "Enable Sound"}
                className="flex size-9 items-center justify-center rounded-xl border border-border/60 bg-background/80 text-foreground transition-all hover:border-cyan-400 hover:text-cyan-400 active:scale-95 cursor-pointer"
              >
                {soundEnabled ? (
                  <Volume2 className="size-4 text-cyan-400" />
                ) : (
                  <VolumeX className="size-4 text-muted-foreground" />
                )}
              </button>

              <button
                onClick={() => triggerPipeLaunchRef.current()}
                title="Launch Extra Balloons from the Corner Launcher"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-primary/40 bg-primary/20 text-xs font-bold text-primary transition-all hover:bg-primary/30 active:scale-95 cursor-pointer"
              >
                <Zap className="size-3.5 text-cyan-400" />
                <span>Launch Orb!</span>
              </button>

              <button
                onClick={handleResetGame}
                title="Reset Score"
                className="flex size-9 items-center justify-center rounded-xl border border-border/60 bg-background/80 text-muted-foreground transition-all hover:border-red-400 hover:text-red-400 active:scale-95 cursor-pointer"
              >
                <RefreshCw className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Arena Chamber Frame */}
        <div className="relative rounded-[2.5rem] border border-border/80 bg-neutral-950/90 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] overflow-hidden backdrop-blur-2xl select-none">
          {/* Subtle Chamber Ambient Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(6,182,212,0.08)_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

          {/* Top Status Badges */}
          <div className="absolute top-4 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 rounded-full border border-cyan-500/40 bg-background/80 px-3.5 py-1 text-[11px] font-bold text-cyan-400 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <span className="size-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Corner Pneumatic Launcher (Active)</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3.5 py-1 text-[11px] font-semibold text-muted-foreground backdrop-blur-md">
              <Sparkles className="size-3 text-amber-400" />
              <span>
                High Score: <strong className="text-foreground">{highScore} PTS</strong>
              </span>
            </div>
          </div>

          {/* Interactive Floating Skill Definition Inspector Card on Hover */}
          {hoveredSkill && (
            <div className="absolute top-16 right-6 z-30 pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-top-2">
              <div
                style={{
                  borderColor: `${hoveredSkill.accent}66`,
                  boxShadow: `0 10px 30px -5px ${hoveredSkill.color}40`,
                }}
                className="rounded-2xl border bg-neutral-900/90 p-4 backdrop-blur-2xl max-w-[280px] flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-3 rounded-full"
                      style={{ backgroundColor: hoveredSkill.color }}
                    />
                    <span className="text-xs font-black uppercase text-foreground">
                      {hoveredSkill.name}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: `${hoveredSkill.color}25`, color: hoveredSkill.accent }}
                  >
                    {hoveredSkill.level}
                  </span>
                </div>

                <div className="text-[11px] font-medium text-cyan-300/90 font-mono">
                  {hoveredSkill.category}
                </div>

                <p className="text-[11px] text-muted-foreground leading-snug">
                  {hoveredSkill.highlights}
                </p>

                <div className="mt-1 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-muted-foreground font-semibold">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Info className="size-3" /> Click to pop & collect
                  </span>
                  <span className="font-mono text-amber-400">+100 PTS</span>
                </div>
              </div>
            </div>
          )}

          {/* Floating Action Banner Notification */}
          {activeNotice && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-all duration-300 animate-in fade-in zoom-in">
              <div className="rounded-full border border-cyan-500/50 bg-background/95 px-6 py-2 shadow-2xl backdrop-blur-2xl text-xs sm:text-sm font-black text-cyan-400 flex items-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                <span>{activeNotice}</span>
              </div>
            </div>
          )}

          {/* Floating Score Popups */}
          {scorePopups.map((p) => (
            <div
              key={p.id}
              style={{ left: p.x, top: p.y }}
              className="absolute pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2 animate-out fade-out slide-out-to-top-8 duration-700"
            >
              <div
                className="font-black font-mono text-xl sm:text-3xl drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]"
                style={{ color: p.color }}
              >
                {p.text}
              </div>
            </div>
          ))}

          {/* Corner Pneumatic Launcher Badge */}
          <div className="absolute bottom-5 left-5 z-20 pointer-events-none flex flex-col items-start gap-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/70 px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Corner Pneumatic Launcher ⚙️</span>
            </div>
            <span className="text-[10px] text-muted-foreground pl-1">
              Glass skill orbs emerge smoothly from the corner tube
            </span>
          </div>

          {/* Custom Crosshair Cursor */}
          {mousePos.visible && (
            <div
              style={{
                left: mousePos.x,
                top: mousePos.y,
                transform: "translate(-50%, -50%)",
              }}
              className="pointer-events-none absolute z-30 transition-transform duration-75 ease-out"
            >
              <div className="relative size-10 flex items-center justify-center">
                <Crosshair className="size-8 text-cyan-400/80 animate-spin-slow" />
                <div className="absolute size-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
              </div>
            </div>
          )}

          {/* WebGL Canvas */}
          <div
            ref={containerRef}
            className="w-full h-[540px] sm:h-[640px] cursor-none relative"
          />
        </div>

        {/* Bottom Skills Discovered Collection Drawer */}
        <div className="mt-8 rounded-2xl border border-border/80 bg-surface/40 p-4 sm:p-6 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Target className="size-4 text-cyan-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Skills Discovered & Popped ({poppedSkills.size}/{SKILLS_LIST.length})
              </h3>
            </div>
            <span className="text-xs text-muted-foreground">
              Click any floating glass skill orb in the arena to burst it and collect the stack badge
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {SKILLS_LIST.map((skill) => {
              const isPopped = poppedSkills.has(skill.id);
              return (
                <div
                  key={skill.id}
                  style={{
                    borderColor: isPopped ? skill.color : undefined,
                    boxShadow: isPopped ? `0 0 16px ${skill.color}55` : undefined,
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all duration-300 ${
                    isPopped
                      ? "bg-surface/90 text-foreground scale-[1.02]"
                      : "border-border/60 bg-background/50 text-muted-foreground opacity-60"
                  }`}
                >
                  <div
                    className="size-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: skill.color }}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate text-foreground">{skill.name}</span>
                    <span className="text-[10px] text-muted-foreground truncate">{skill.category}</span>
                  </div>
                  {isPopped && (
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 ml-auto" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
