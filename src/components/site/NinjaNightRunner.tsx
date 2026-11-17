// @ts-nocheck
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Swords,
  ChevronUp,
  Trophy,
  Heart,
  Gamepad2,
  Zap,
} from "lucide-react";

// ── Web Audio Sound Synthesizer ──
class SoundFX {
  ctx: AudioContext | null = null;
  enabled: boolean = true;

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  jump() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.14);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    } catch {}
  }

  doubleJump() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(1150, now + 0.16);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch {}
  }

  springBounce() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(1350, now + 0.25);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  slash() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(380, now + 0.12);
      filter.Q.value = 3.5;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch {}
  }

  coin() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(988, now);
      osc.frequency.setValueAtTime(1320, now + 0.07);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  }

  powerup() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [440, 554, 659, 880].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.18, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.18);
      });
    } catch {}
  }

  hit() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.22);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  }
}

const sfx = new SoundFX();

// ── Types ──
export type BlockType =
  | "mainRooftop"
  | "bambooLedge"
  | "toriiShrine"
  | "springDrum";

export interface LevelBlock {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: BlockType;
  isMainGround: boolean;
  hasSpring?: boolean;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "spike" | "shuriken" | "crow";
  rotation: number;
  slashed?: boolean;
  baseY?: number;
}

interface Coin {
  x: number;
  y: number;
  collected: boolean;
  value: number;
}

interface PowerScroll {
  x: number;
  y: number;
  collected: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface Sakura {
  x: number;
  y: number;
  speed: number;
  swaySpeed: number;
  size: number;
  rotation: number;
}

let blockIdCounter = 1;

export function NinjaNightRunner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [muted, setMuted] = useState(false);
  const [slashes, setSlashes] = useState(0);
  const [frenzyActive, setFrenzyActive] = useState(false);
  const [jumpCountState, setJumpCountState] = useState(0);

  // Load saved highscore on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ninja_runner_hs");
      if (saved) setHighScore(parseInt(saved, 10));
    } catch (_) {}
  }, []);

  // Simulation State Ref
  const stateRef = useRef({
    isPlaying: false,
    isGameOver: false,
    score: 0,
    lives: 3,
    distance: 0,
    baseSpeed: 7.2,
    speed: 7.2,
    ninja: {
      x: 130,
      y: 0,
      baseY: 0,
      vy: 0,
      isGrounded: true,
      jumpCount: 0,
      runCycle: 0,
      isSlashing: false,
      slashTime: 0,
      spinAngle: 0,
      invulnerable: 0,
      frenzyTimer: 0,
      currentBlock: null as LevelBlock | null,
    },
    blocks: [] as LevelBlock[],
    obstacles: [] as Obstacle[],
    coins: [] as Coin[],
    scrolls: [] as PowerScroll[],
    particles: [] as Particle[],
    sakura: [] as Sakura[],
    stars: [] as { x: number; y: number; s: number; a: number }[],
    clouds: [] as { x: number; y: number; w: number; speed: number }[],
    lastObstacleX: 500,
    cameraShake: 0,
  });

  const toggleSound = () => {
    sfx.enabled = !sfx.enabled;
    setMuted(!sfx.enabled);
  };

  // Jump Action
  const doJump = useCallback(() => {
    sfx.init();
    const st = stateRef.current;
    if (st.isGameOver) {
      startGame();
      return;
    }
    if (!st.isPlaying) {
      startGame();
      return;
    }
    const n = st.ninja;
    if (n.jumpCount < 2) {
      if (n.jumpCount === 0) {
        n.vy = -13.2;
        n.isGrounded = false;
        n.currentBlock = null;
        n.jumpCount = 1;
        setJumpCountState(1);
        sfx.jump();
      } else if (n.jumpCount === 1) {
        n.vy = -12.4;
        n.jumpCount = 2;
        n.spinAngle = 0;
        setJumpCountState(2);
        sfx.doubleJump();

        for (let i = 0; i < 10; i++) {
          st.particles.push({
            x: n.x,
            y: n.y + 12,
            vx: (Math.random() - 0.5) * 5,
            vy: Math.random() * 2 + 1,
            size: Math.random() * 2.5 + 1.5,
            color: "#38bdf8",
            alpha: 1,
            life: 0,
            maxLife: 18,
          });
        }
      }
    }
  }, []);

  // Slash Action
  const doSlash = useCallback(() => {
    sfx.init();
    const st = stateRef.current;
    if (st.isGameOver) {
      startGame();
      return;
    }
    if (!st.isPlaying) {
      startGame();
      return;
    }
    const n = st.ninja;
    if (!n.isSlashing) {
      n.isSlashing = true;
      n.slashTime = 14;
      sfx.slash();

      const slashRange = 110;
      st.obstacles.forEach((obs) => {
        if (!obs.slashed && obs.x > n.x - 10 && obs.x < n.x + slashRange && Math.abs(obs.y - n.y) < 70) {
          obs.slashed = true;
          st.score += 150;
          setScore(st.score);
          setSlashes((s) => s + 1);

          for (let i = 0; i < 16; i++) {
            const angle = (Math.PI * 2 * i) / 16;
            const spd = Math.random() * 6 + 2;
            st.particles.push({
              x: obs.x + obs.width / 2,
              y: obs.y + obs.height / 2,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              size: Math.random() * 3 + 2,
              color: i % 2 === 0 ? "#38bdf8" : "#f43f5e",
              alpha: 1,
              life: 0,
              maxLife: 20,
            });
          }
        }
      });
    }
  }, []);

  // Start / Restart Game cleanly
  const startGame = useCallback(() => {
    sfx.init();
    const st = stateRef.current;
    const canvas = canvasRef.current;
    const height = canvas?.height || 380;
    const groundY = height - 70;

    st.isPlaying = true;
    st.isGameOver = false;
    st.score = 0;
    st.lives = 3;
    st.distance = 0;
    st.baseSpeed = 7.2;
    st.speed = 7.2;
    st.obstacles = [];
    st.coins = [];
    st.scrolls = [];
    st.particles = [];
    st.lastObstacleX = 450;
    st.cameraShake = 0;

    // Reset with initial clean rooftops across full viewport
    const initialBlocks: LevelBlock[] = [
      {
        id: blockIdCounter++,
        x: -40,
        y: groundY,
        width: 750,
        height: 36,
        type: "mainRooftop",
        isMainGround: true,
      },
      {
        id: blockIdCounter++,
        x: 780,
        y: groundY,
        width: 850,
        height: 36,
        type: "mainRooftop",
        isMainGround: true,
      },
      {
        id: blockIdCounter++,
        x: 1700,
        y: groundY,
        width: 850,
        height: 36,
        type: "mainRooftop",
        isMainGround: true,
      },
    ];

    st.blocks = initialBlocks;
    st.ninja.x = 130;
    st.ninja.y = groundY;
    st.ninja.baseY = groundY;
    st.ninja.vy = 0;
    st.ninja.isGrounded = true;
    st.ninja.jumpCount = 0;
    st.ninja.isSlashing = false;
    st.ninja.slashTime = 0;
    st.ninja.spinAngle = 0;
    st.ninja.invulnerable = 0;
    st.ninja.frenzyTimer = 0;
    st.ninja.currentBlock = initialBlocks[0];

    // Seed coins on first roof
    for (let c = 0; c < 5; c++) {
      st.coins.push({
        x: 220 + c * 38,
        y: groundY - 32,
        collected: false,
        value: 20,
      });
    }

    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setLives(3);
    setSlashes(0);
    setFrenzyActive(false);
    setJumpCountState(0);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        doJump();
      } else if (
        e.code === "KeyD" ||
        e.code === "KeyS" ||
        e.code === "ArrowDown" ||
        e.code === "Enter"
      ) {
        e.preventDefault();
        doSlash();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [doJump, doSlash]);

  // Main Canvas Setup & Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight && canvas.parentElement.clientHeight > 100 ? canvas.parentElement.clientHeight : 400);
    const groundY = height - 70;

    stateRef.current.ninja.baseY = groundY;

    // Initial blocks setup if empty
    if (stateRef.current.blocks.length === 0) {
      stateRef.current.blocks = [
        {
          id: blockIdCounter++,
          x: -40,
          y: groundY,
          width: 750,
          height: 36,
          type: "mainRooftop",
          isMainGround: true,
        },
        {
          id: blockIdCounter++,
          x: 780,
          y: groundY,
          width: 850,
          height: 36,
          type: "mainRooftop",
          isMainGround: true,
        },
        {
          id: blockIdCounter++,
          x: 1700,
          y: groundY,
          width: 850,
          height: 36,
          type: "mainRooftop",
          isMainGround: true,
        },
      ];
      stateRef.current.ninja.y = groundY;
      stateRef.current.ninja.currentBlock = stateRef.current.blocks[0];
    }

    // Initialize Stars
    if (stateRef.current.stars.length === 0) {
      for (let i = 0; i < 70; i++) {
        stateRef.current.stars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.65),
          s: Math.random() * 1.8 + 0.8,
          a: Math.random() * 0.7 + 0.3,
        });
      }
    }

    // Initialize Clouds
    if (stateRef.current.clouds.length === 0) {
      stateRef.current.clouds = [
        { x: 80, y: 50, w: 140, speed: 0.3 },
        { x: 380, y: 95, w: 180, speed: 0.45 },
        { x: 680, y: 40, w: 130, speed: 0.35 },
        { x: 1080, y: 65, w: 160, speed: 0.4 },
      ];
    }

    // Initialize Sakura Petals
    if (stateRef.current.sakura.length === 0) {
      for (let i = 0; i < 35; i++) {
        stateRef.current.sakura.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speed: Math.random() * 1.2 + 0.8,
          swaySpeed: Math.random() * 0.03 + 0.015,
          size: Math.random() * 4 + 3,
          rotation: Math.random() * Math.PI * 2,
        });
      }
    }

    const resizeHandler = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight && canvas.parentElement.clientHeight > 100 ? canvas.parentElement.clientHeight : 400;
      const newGround = height - 70;
      stateRef.current.ninja.baseY = newGround;
      stateRef.current.blocks.forEach((b) => {
        if (b.isMainGround) b.y = newGround;
      });
    };
    window.addEventListener("resize", resizeHandler);

    let frameCount = 0;

    // Simulation Loop
    const loop = () => {
      frameCount++;
      const st = stateRef.current;
      const n = st.ninja;
      const currentGround = height - 70;
      n.baseY = currentGround;

      // ── CRITICAL STOP CONDITION ──
      // When Game Over: world movement stops completely!
      // When Not Playing: world is still (idle state)!
      const scrollSpeed = st.isPlaying && !st.isGameOver ? st.speed : 0;

      if (st.isPlaying && !st.isGameOver) {
        st.distance += scrollSpeed;

        // Progressive Difficulty: speed ramps up briskly as score increases!
        st.speed = st.baseSpeed + Math.min((st.score / 150) * 0.6, 5.5);

        // Ninja Running Cycle
        n.runCycle += 0.22;

        // Frenzy Timer
        if (n.frenzyTimer > 0) {
          n.frenzyTimer--;
          if (n.frenzyTimer <= 0) {
            setFrenzyActive(false);
          }
          if (frameCount % 3 === 0) {
            st.particles.push({
              x: n.x - 10 + (Math.random() - 0.5) * 12,
              y: n.y - 18 + (Math.random() - 0.5) * 18,
              vx: -Math.random() * 4 - 2,
              vy: (Math.random() - 0.5) * 2,
              size: Math.random() * 4 + 2,
              color: Math.random() > 0.5 ? "#f59e0b" : "#ef4444",
              alpha: 0.9,
              life: 0,
              maxLife: 18,
            });
          }
        }

        // Move Blocks
        st.blocks.forEach((blk) => {
          blk.x -= scrollSpeed;
        });

        // Remove off-screen blocks
        if (st.blocks.length > 0 && st.blocks[0].x + st.blocks[0].width < -120) {
          st.blocks.shift();
        }

        // Spawn New Blocks with varied gaps
        const mainGroundBlocks = st.blocks.filter((b) => b.isMainGround);
        const lastMain = mainGroundBlocks[mainGroundBlocks.length - 1];

        if (lastMain && lastMain.x + lastMain.width < width + 500) {
          // Dynamic challenging gaps: 85px to 160px (requires quick reactions and double flips)
          const gapRoll = Math.random();
          const gap = gapRoll < 0.35 
            ? Math.random() * 20 + 85 
            : gapRoll < 0.75 
            ? Math.random() * 25 + 115 
            : Math.random() * 30 + 155;
          const nextGroundX = lastMain.x + lastMain.width + gap;
          const groundW = Math.random() * 220 + 300; // 300px - 520px roof lengths

          st.blocks.push({
            id: blockIdCounter++,
            x: nextGroundX,
            y: currentGround,
            width: groundW,
            height: 36,
            type: "mainRooftop",
            isMainGround: true,
          });

          // Add coins on roof
          for (let c = 0; c < 4; c++) {
            st.coins.push({
              x: nextGroundX + 80 + c * 36,
              y: currentGround - 32,
              collected: false,
              value: 20,
            });
          }

          // Spawn High Platforms
          const randHigh = Math.random();
          if (randHigh < 0.35) {
            st.blocks.push({
              id: blockIdCounter++,
              x: nextGroundX + 180,
              y: currentGround - 62,
              width: 180,
              height: 24,
              type: "bambooLedge",
              isMainGround: false,
            });
          } else if (randHigh < 0.65) {
            st.blocks.push({
              id: blockIdCounter++,
              x: nextGroundX + 220,
              y: currentGround - 90,
              width: 190,
              height: 26,
              type: "toriiShrine",
              isMainGround: false,
            });
            st.scrolls.push({
              x: nextGroundX + 310,
              y: currentGround - 125,
              collected: false,
            });
          } else if (randHigh < 0.85) {
            st.blocks.push({
              id: blockIdCounter++,
              x: nextGroundX + 260,
              y: currentGround - 36,
              width: 120,
              height: 24,
              type: "springDrum",
              isMainGround: false,
              hasSpring: true,
            });
          }
        }

        // Ninja & Block Collision
        let landedBlock: LevelBlock | null = null;
        for (const blk of st.blocks) {
          if (n.x >= blk.x - 8 && n.x <= blk.x + blk.width + 8) {
            if (n.vy >= 0 && n.y >= blk.y - 8 && n.y <= blk.y + 14) {
              landedBlock = blk;
              break;
            }
          }
        }

        if (landedBlock) {
          n.y = landedBlock.y;
          n.vy = 0;
          n.isGrounded = true;
          n.jumpCount = 0;
          n.spinAngle = 0;
          n.currentBlock = landedBlock;
          setJumpCountState(0);

          if (landedBlock.hasSpring) {
            n.vy = -17.5;
            n.isGrounded = false;
            n.currentBlock = null;
            n.jumpCount = 1;
            setJumpCountState(1);
            sfx.springBounce();
          }
        } else {
          if (n.isGrounded) {
            n.isGrounded = false;
            n.currentBlock = null;
            n.vy = 1.0;
          }

          n.y += n.vy;
          n.vy += 0.68; // Gravity

          if (n.jumpCount === 2) {
            n.spinAngle += 0.22;
          }

          // Fall into chasm
          if (n.y > height + 25) {
            sfx.hit();
            st.cameraShake = 9;
            st.lives--;
            setLives(st.lives);

            if (st.lives <= 0) {
              // ── GAME OVER ──
              st.isPlaying = false;
              st.isGameOver = true;
              setIsPlaying(false);
              setIsGameOver(true);

              if (st.score > highScore) {
                setHighScore(st.score);
                if (typeof window !== "undefined") {
                  localStorage.setItem("ninja_runner_hs", st.score.toString());
                }
              }
            } else {
              // Respawn on forward roof
              const safeBlk = st.blocks.find((b) => b.isMainGround && b.x > 30) || st.blocks[0];
              if (safeBlk) {
                n.x = safeBlk.x + 40;
                n.y = safeBlk.y;
                n.vy = 0;
                n.invulnerable = 60;
              }
            }
          }
        }

        // Score tick
        if (frameCount % 6 === 0) {
          st.score += 1;
          setScore(st.score);
        }

        // Spawn Obstacles (Tighter, challenging frequency: 150px - 250px)
        const spawnDistance = Math.random() * 100 + 150;
        if (width - st.lastObstacleX > spawnDistance) {
          st.lastObstacleX = width;
          const targetBlk = st.blocks.find((b) => b.isMainGround && b.x > width - 180);
          const obsRand = Math.random();

          if (obsRand < 0.42 && targetBlk) {
            // Ground Spike (occasionally double spike for tougher jump timing)
            const isDouble = Math.random() < 0.38;
            st.obstacles.push({
              x: targetBlk.x + targetBlk.width * 0.45,
              y: targetBlk.y - 22,
              width: isDouble ? 44 : 26,
              height: 22,
              type: "spike",
              rotation: 0,
            });
          } else if (obsRand < 0.72) {
            // Shadow Crow (Swooping aggressive flying demon)
            const crowY = currentGround - (Math.random() * 40 + 50);
            st.obstacles.push({
              x: width + 30,
              y: crowY,
              width: 32,
              height: 24,
              type: "crow",
              rotation: 0,
              baseY: crowY,
            });
          } else {
            // Spinning Shuriken (high-speed projectile at ground or mid-air)
            const shurikenY = Math.random() < 0.5 ? currentGround - 24 : currentGround - 58;
            st.obstacles.push({
              x: width + 30,
              y: shurikenY,
              width: 26,
              height: 26,
              type: "shuriken",
              rotation: 0,
            });
          }
        }

        // Update Obstacles (Projectiles fly swiftly toward the ninja)
        for (let i = st.obstacles.length - 1; i >= 0; i--) {
          const obs = st.obstacles[i];
          const obsExtraSpeed = obs.type === "shuriken" ? 2.5 : obs.type === "crow" ? 1.3 : 0;
          obs.x -= (scrollSpeed + obsExtraSpeed);
          obs.rotation += 0.22;

          if (obs.type === "crow" && obs.baseY) {
            obs.y = obs.baseY + Math.sin(frameCount * 0.16 + obs.x * 0.025) * 20;
          }

          // Auto-slash during Frenzy
          if (n.frenzyTimer > 0 && !obs.slashed && obs.x < n.x + 80 && obs.x > n.x - 20) {
            obs.slashed = true;
            st.score += 200;
            setScore(st.score);
            setSlashes((s) => s + 1);
            sfx.slash();
          }

          // Hit detection
          if (!obs.slashed && n.invulnerable <= 0 && n.frenzyTimer <= 0) {
            const ninjaBox = { x: n.x - 10, y: n.y - 38, w: 26, h: 42 };
            const obsBox = { x: obs.x, y: obs.y, w: obs.width, h: obs.height };

            if (
              ninjaBox.x < obsBox.x + obsBox.w &&
              ninjaBox.x + ninjaBox.w > obsBox.x &&
              ninjaBox.y < obsBox.y + obsBox.h &&
              ninjaBox.y + ninjaBox.h > obsBox.y
            ) {
              sfx.hit();
              st.cameraShake = 10;
              n.invulnerable = 55;
              st.lives--;
              setLives(st.lives);

              for (let p = 0; p < 12; p++) {
                st.particles.push({
                  x: n.x,
                  y: n.y - 18,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  size: Math.random() * 3 + 2,
                  color: "#ef4444",
                  alpha: 1,
                  life: 0,
                  maxLife: 18,
                });
              }

              if (st.lives <= 0) {
                // ── GAME OVER ──
                st.isPlaying = false;
                st.isGameOver = true;
                setIsPlaying(false);
                setIsGameOver(true);

                if (st.score > highScore) {
                  setHighScore(st.score);
                  if (typeof window !== "undefined") {
                    localStorage.setItem("ninja_runner_hs", st.score.toString());
                  }
                }
              }
            }
          }

          if (obs.x < -50) {
            st.obstacles.splice(i, 1);
          }
        }

        // Update Coins
        for (let i = st.coins.length - 1; i >= 0; i--) {
          const coin = st.coins[i];
          coin.x -= scrollSpeed;

          if (!coin.collected) {
            const dist = Math.hypot(n.x - coin.x, n.y - 18 - coin.y);
            if (dist < 32) {
              coin.collected = true;
              sfx.coin();
              st.score += coin.value;
              setScore(st.score);
            }
          }

          if (coin.x < -30 || coin.collected) {
            st.coins.splice(i, 1);
          }
        }

        // Update Scrolls
        for (let i = st.scrolls.length - 1; i >= 0; i--) {
          const sc = st.scrolls[i];
          sc.x -= scrollSpeed;

          if (!sc.collected) {
            const dist = Math.hypot(n.x - sc.x, n.y - 18 - sc.y);
            if (dist < 36) {
              sc.collected = true;
              sfx.powerup();
              n.frenzyTimer = 300;
              setFrenzyActive(true);
              st.score += 250;
              setScore(st.score);
            }
          }

          if (sc.x < -30 || sc.collected) {
            st.scrolls.splice(i, 1);
          }
        }
      } // End isPlaying && !isGameOver block

      // Slash Cooldown
      if (n.isSlashing) {
        n.slashTime--;
        if (n.slashTime <= 0) {
          n.isSlashing = false;
        }
      }

      if (n.invulnerable > 0) {
        n.invulnerable--;
      }

      // Camera Shake decay
      if (st.cameraShake > 0) {
        st.cameraShake *= 0.85;
        if (st.cameraShake < 0.2) st.cameraShake = 0;
      }

      // Clouds movement
      st.clouds.forEach((c) => {
        c.x -= c.speed;
        if (c.x < -c.w - 30) c.x = width + 30;
      });

      // Sakura Petals
      st.sakura.forEach((s) => {
        s.y += s.speed;
        s.x -= (scrollSpeed * 0.5 || 0.8) + Math.sin(frameCount * s.swaySpeed) * 1.2;
        s.rotation += 0.02;
        if (s.y > height + 20) {
          s.y = -20;
          s.x = Math.random() * (width + 60);
        }
        if (s.x < -20) s.x = width + 20;
      });

      // Update Particles
      for (let i = st.particles.length - 1; i >= 0; i--) {
        const p = st.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;
        if (p.life >= p.maxLife) {
          st.particles.splice(i, 1);
        }
      }

      // ── RENDERING ──
      ctx.save();

      if (st.cameraShake > 0) {
        ctx.translate(
          (Math.random() - 0.5) * st.cameraShake,
          (Math.random() - 0.5) * st.cameraShake
        );
      }

      // 1. Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, "#030612");
      skyGrad.addColorStop(0.5, "#081024");
      skyGrad.addColorStop(1, "#0d1b38");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Stars
      ctx.fillStyle = "#ffffff";
      st.stars.forEach((star) => {
        ctx.globalAlpha = star.a * (0.65 + Math.sin(frameCount * 0.04 + star.x) * 0.35);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.s, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 3. Moon
      const moonX = width * 0.8;
      const moonY = 80;
      const moonRadius = 55;

      const moonOuterGlow = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.3, moonX, moonY, moonRadius * 2.8);
      moonOuterGlow.addColorStop(0, "rgba(56, 189, 248, 0.2)");
      moonOuterGlow.addColorStop(0.6, "rgba(99, 102, 241, 0.08)");
      moonOuterGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = moonOuterGlow;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 2.8, 0, Math.PI * 2);
      ctx.fill();

      const moonDisc = ctx.createRadialGradient(moonX - 15, moonY - 15, 8, moonX, moonY, moonRadius);
      moonDisc.addColorStop(0, "#ffffff");
      moonDisc.addColorStop(0.6, "#f1f5f9");
      moonDisc.addColorStop(1, "#cbd5e1");
      ctx.fillStyle = moonDisc;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Clouds
      ctx.fillStyle = "rgba(10, 16, 36, 0.6)";
      st.clouds.forEach((cloud) => {
        ctx.beginPath();
        ctx.roundRect(cloud.x, cloud.y, cloud.w, 12, 6);
        ctx.fill();
      });

      // 4. Distant Mountains
      ctx.fillStyle = "#070e20";
      ctx.beginPath();
      ctx.moveTo(0, currentGround + 40);
      const mOffset = (st.distance * 0.08) % width;
      for (let x = -width; x < width * 2; x += 90) {
        const peakY = currentGround - 95 - Math.sin((x + mOffset) * 0.007) * 40;
        ctx.lineTo(x, peakY);
      }
      ctx.lineTo(width * 2, currentGround + 40);
      ctx.closePath();
      ctx.fill();

      // 5. Parallax Midground Torii
      ctx.fillStyle = "#0a1329";
      const bgOffset = (st.distance * 0.2) % 320;
      for (let x = -bgOffset; x < width + 320; x += 320) {
        ctx.fillRect(x + 110, currentGround - 75, 7, 75);
        ctx.fillRect(x + 155, currentGround - 75, 7, 75);
        ctx.fillRect(x + 95, currentGround - 73, 80, 8);
        ctx.fillRect(x + 102, currentGround - 63, 68, 5);
      }

      // 6. Chasm Mist
      const chasmGrad = ctx.createLinearGradient(0, height - 60, 0, height);
      chasmGrad.addColorStop(0, "rgba(2, 6, 23, 0)");
      chasmGrad.addColorStop(1, "#020617");
      ctx.fillStyle = chasmGrad;
      ctx.fillRect(0, height - 60, width, 60);

      // 7. Blocks & Rooftops
      st.blocks.forEach((blk) => {
        ctx.save();
        ctx.translate(blk.x, blk.y);

        if (blk.type === "mainRooftop") {
          const pGrad = ctx.createLinearGradient(0, 0, 0, blk.height);
          pGrad.addColorStop(0, "#1e293b");
          pGrad.addColorStop(1, "#090d16");
          ctx.fillStyle = pGrad;
          ctx.beginPath();
          ctx.roundRect(0, 0, blk.width, blk.height, [6, 6, 2, 2]);
          ctx.fill();

          // Curved eaves
          ctx.fillStyle = "#08b9d4";
          ctx.beginPath();
          ctx.moveTo(-5, -2);
          ctx.lineTo(6, 0);
          ctx.lineTo(0, 6);
          ctx.closePath();
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(blk.width + 5, -2);
          ctx.lineTo(blk.width - 6, 0);
          ctx.lineTo(blk.width, 6);
          ctx.closePath();
          ctx.fill();

          // Roof edge
          ctx.strokeStyle = "#08b9d4";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(blk.width, 0);
          ctx.stroke();

          // Roof tile lines
          ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
          ctx.lineWidth = 1.5;
          for (let tx = 14; tx < blk.width - 10; tx += 22) {
            ctx.beginPath();
            ctx.moveTo(tx, 0);
            ctx.lineTo(tx - 6, blk.height);
            ctx.stroke();
          }
        } else if (blk.type === "bambooLedge") {
          const bGrad = ctx.createLinearGradient(0, 0, 0, blk.height);
          bGrad.addColorStop(0, "#4d7c0f");
          bGrad.addColorStop(1, "#14532d");
          ctx.fillStyle = bGrad;
          ctx.beginPath();
          ctx.roundRect(0, 0, blk.width, blk.height, [4, 4, 3, 3]);
          ctx.fill();

          ctx.strokeStyle = "#84cc16";
          ctx.lineWidth = 2;
          ctx.stroke();
        } else if (blk.type === "toriiShrine") {
          ctx.fillStyle = "#991b1b";
          ctx.fillRect(0, 0, blk.width, blk.height);
          ctx.strokeStyle = "#ef4444";
          ctx.lineWidth = 2;
          ctx.strokeRect(0, 0, blk.width, blk.height);
        } else if (blk.type === "springDrum") {
          ctx.fillStyle = "#0284c7";
          ctx.beginPath();
          ctx.roundRect(0, 0, blk.width, blk.height, [6, 6, 3, 3]);
          ctx.fill();
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.restore();
      });

      // 8. Power Scrolls
      st.scrolls.forEach((sc) => {
        if (sc.collected) return;
        ctx.save();
        ctx.translate(sc.x, sc.y);
        ctx.fillStyle = "#f59e0b";
        ctx.fillRect(-12, -8, 24, 16);
        ctx.fillStyle = "#fef3c7";
        ctx.fillRect(-9, -6, 18, 12);
        ctx.restore();
      });

      // 9. Obstacles
      st.obstacles.forEach((obs) => {
        if (obs.slashed) return;
        ctx.save();
        ctx.translate(obs.x + obs.width / 2, obs.y + obs.height / 2);

        if (obs.type === "spike") {
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          if (obs.width > 30) {
            const half = obs.width / 2;
            ctx.moveTo(-half, obs.height / 2);
            ctx.lineTo(-half / 2, -obs.height / 2);
            ctx.lineTo(0, obs.height / 2);
            ctx.lineTo(half / 2, -obs.height / 2);
            ctx.lineTo(half, obs.height / 2);
          } else {
            ctx.moveTo(-obs.width / 2, obs.height / 2);
            ctx.lineTo(0, -obs.height / 2);
            ctx.lineTo(obs.width / 2, obs.height / 2);
          }
          ctx.closePath();
          ctx.fill();
        } else if (obs.type === "shuriken") {
          ctx.rotate(obs.rotation);
          ctx.fillStyle = "#94a3b8";
          ctx.fillRect(-obs.width / 2, -3, obs.width, 6);
          ctx.fillRect(-3, -obs.height / 2, 6, obs.height);
          ctx.fillStyle = "#f43f5e";
          ctx.beginPath();
          ctx.arc(0, 0, 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (obs.type === "crow") {
          const wingFlap = Math.sin(frameCount * 0.3) * 6;
          ctx.fillStyle = "#1e1b4b";
          ctx.beginPath();
          ctx.moveTo(-10, 0);
          ctx.lineTo(0, -12 - wingFlap);
          ctx.lineTo(10, 0);
          ctx.lineTo(0, 6);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = "#f43f5e";
          ctx.beginPath();
          ctx.arc(-4, -1, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // 10. Coins
      st.coins.forEach((coin) => {
        if (coin.collected) return;
        ctx.save();
        ctx.translate(coin.x, coin.y);
        const spin = Math.sin(frameCount * 0.12);
        ctx.scale(spin, 1);
        ctx.fillStyle = "#eab308";
        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fef08a";
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 11. DRAW THE NINJA
      ctx.save();
      ctx.translate(n.x, n.y);

      if (n.frenzyTimer > 0) {
        ctx.strokeStyle = "rgba(245, 158, 11, 0.8)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, -20, 32, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (n.invulnerable > 0 && Math.floor(n.invulnerable / 4) % 2 === 0) {
        ctx.globalAlpha = 0.35;
      }

      if (!n.isGrounded && n.jumpCount === 2) {
        ctx.rotate(n.spinAngle);
      }

      // Idle pose when not playing, run pose when playing
      const isRunning = st.isPlaying && !st.isGameOver;
      const cycle = isRunning ? n.runCycle : 0;
      const leg1Angle = isRunning ? Math.sin(cycle) * 0.75 : -0.15;
      const leg2Angle = isRunning ? Math.sin(cycle + Math.PI) * 0.75 : 0.15;
      const bobY = isRunning ? Math.abs(Math.sin(cycle * 2)) * 3 : Math.sin(frameCount * 0.05) * 1.5;

      // Back Leg
      ctx.save();
      ctx.translate(0, -12 - bobY);
      ctx.rotate(leg2Angle);
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(-3, 0, 5, 13);
      ctx.translate(0, 13);
      ctx.fillStyle = "#020617";
      ctx.fillRect(-3, 0, 5, 11);
      ctx.restore();

      // Scarf
      ctx.save();
      ctx.translate(-4, -26 - bobY);
      ctx.strokeStyle = "#e11d48";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let s = 1; s <= 4; s++) {
        const sx = -s * 8;
        const sy = isRunning
          ? Math.sin(cycle * 2 - s * 0.8) * (s * 2.2) + (s * 1.2)
          : Math.sin(frameCount * 0.08 - s * 0.6) * 3 + s * 1.2;
        ctx.lineTo(sx, sy);
      }
      ctx.stroke();
      ctx.restore();

      // Torso
      ctx.save();
      ctx.translate(0, -18 - bobY);
      ctx.rotate(isRunning ? 0.22 : 0.05);

      ctx.fillStyle = "#020617";
      ctx.beginPath();
      ctx.roundRect(-7, -13, 15, 23, [4, 4, 3, 3]);
      ctx.fill();

      // Front Leg
      ctx.save();
      ctx.translate(0, 9);
      ctx.rotate(leg1Angle);
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(-3, 0, 5, 13);
      ctx.translate(0, 13);
      ctx.fillStyle = "#08b9d4";
      ctx.fillRect(-3, 0, 7, 3);
      ctx.restore();

      // Head & Mask
      ctx.fillStyle = "#090d16";
      ctx.beginPath();
      ctx.arc(4, -18, 10, 0, Math.PI * 2);
      ctx.fill();

      // Eye slit
      ctx.fillStyle = "#08b9d4";
      ctx.fillRect(5, -19, 7, 3);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(8, -19, 3, 2.5);

      // Katana / Slash Blade
      ctx.save();
      ctx.translate(5, -6);
      if (n.isSlashing) {
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 4.5;
        ctx.beginPath();
        ctx.arc(0, 0, 42, -Math.PI * 0.5, Math.PI * 0.35);
        ctx.stroke();
      } else {
        ctx.rotate(0.35 + (isRunning ? Math.sin(cycle) * 0.15 : 0));
        ctx.fillStyle = "#f1f5f9";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(34, -2);
        ctx.lineTo(38, 0);
        ctx.lineTo(34, 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore(); // Katana
      ctx.restore(); // Torso
      ctx.restore(); // Ninja

      // 12. Particles
      st.particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 13. Sakura Petals
      st.sakura.forEach((s) => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.fillStyle = "rgba(244, 114, 182, 0.7)";
        ctx.beginPath();
        ctx.ellipse(0, 0, s.size, s.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [highScore]);

  return (
    <section className="relative w-full py-8 sm:py-12 bg-background border-t border-border/50 select-none overflow-x-hidden">
      {/* Header - Edge aligned typography */}
      <div className="w-full px-4 sm:px-8 lg:px-12 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 mb-1.5">
              <Gamepad2 className="size-3 text-cyan-400" />
              <span>Mini Arcade Game &bull; Hardcore Mode</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
              Shinobi Night Runner
            </h2>
          </div>
          <p className="max-w-md text-xs text-muted-foreground leading-relaxed">
            Fast rooftop sprints, tricky chasms &amp; high-speed shurikens. Jump roofs, dodge spikes, and slash demons with your katana!
          </p>
        </div>
      </div>

      {/* ── ARCADE CABINET CONTAINER - FULL BLEED EDGE-TO-EDGE (Zero space left & right) ── */}
      <div className="w-full border-y border-border/80 bg-slate-950 overflow-hidden shadow-2xl relative">
        
        {/* Top Bar - Clean, balanced score & lives */}
        <div className="flex items-center justify-between px-4 sm:px-8 lg:px-12 py-2.5 border-b border-border/50 bg-slate-900/80 backdrop-blur-sm">
          {/* Lives & Frenzy Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-background/50 border border-border/60 px-2.5 py-1 rounded-md">
              {[1, 2, 3].map((heartIndex) => (
                <Heart
                  key={heartIndex}
                  className={`size-3.5 transition-all duration-200 ${
                    heartIndex <= lives
                      ? "text-rose-500 fill-rose-500 scale-100"
                      : "text-muted-foreground/30 scale-75"
                  }`}
                />
              ))}
            </div>

            {frenzyActive && (
              <div className="inline-flex items-center gap-1 rounded-md border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-[11px] font-bold text-amber-400 animate-pulse">
                <Zap className="size-3" />
                <span>Frenzy</span>
              </div>
            )}

            {slashes > 0 && !frenzyActive && (
              <div className="hidden sm:inline-flex items-center gap-1 rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[11px] font-mono text-rose-400">
                <Swords className="size-3" />
                <span>{slashes} Slashes</span>
              </div>
            )}
          </div>

          {/* Score & High Score - Clean & aligned */}
          <div className="flex items-center gap-4 font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground uppercase font-sans font-semibold">
                Score:
              </span>
              <span className="font-bold text-foreground tabular-nums text-sm">
                {score}
              </span>
            </div>

            <div className="flex items-center gap-1.5 pl-3 border-l border-border/50">
              <span className="text-[10px] text-amber-400 uppercase font-sans font-semibold flex items-center gap-0.5">
                <Trophy className="size-3" /> Best:
              </span>
              <span className="font-bold text-amber-400 tabular-nums text-sm">
                {highScore}
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="flex size-7 items-center justify-center rounded-md border border-border/70 bg-surface/50 text-muted-foreground hover:text-foreground transition-colors ml-1 cursor-pointer"
              title={muted ? "Unmute Sound" : "Mute Sound"}
            >
              {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5 text-cyan-400" />}
            </button>
          </div>
        </div>

        {/* Canvas Viewport - Edge-to-Edge Jammed */}
        <div className="relative w-full h-[360px] sm:h-[420px]">
          <canvas
            ref={canvasRef}
            className="w-full h-full block cursor-pointer"
            onClick={() => (!isPlaying || isGameOver ? startGame() : doJump())}
          />

          {/* Overlay: Start Sprint */}
          <AnimatePresence>
            {!isPlaying && !isGameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-xs p-5 text-center"
              >
                <div className="max-w-xs p-5 rounded-2xl border border-cyan-500/30 bg-slate-900/95 shadow-xl text-center">
                  <div className="inline-flex size-11 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 mb-3">
                    <Swords className="size-5" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-foreground mb-1">
                    Start Shinobi Sprint
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    Press Space to jump / double flip. Press D or Enter to katana-slash obstacles!
                  </p>

                  <button
                    onClick={startGame}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-2.5 px-4 font-bold uppercase text-xs transition-transform active:scale-98 shadow-md cursor-pointer"
                  >
                    <Play className="size-3.5 fill-slate-950" />
                    <span>Start Game (Space)</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overlay: Game Over / Mission Ended */}
          <AnimatePresence>
            {isGameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xs p-5 text-center"
              >
                <div className="max-w-xs p-5 sm:p-6 rounded-2xl border border-rose-500/40 bg-slate-900/95 shadow-xl text-center">
                  <h3 className="font-display text-xl font-black uppercase text-foreground mb-1">
                    Game Over
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Nice run! Ready to beat your record?
                  </p>

                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-surface/50 border border-border/70 mb-4 font-mono text-center">
                    <div>
                      <span className="text-[10px] text-muted-foreground block uppercase font-sans">
                        Score
                      </span>
                      <span className="text-lg font-black text-foreground">{score}</span>
                    </div>
                    <div className="border-l border-border/60">
                      <span className="text-[10px] text-amber-400 block uppercase font-sans">
                        Best
                      </span>
                      <span className="text-lg font-black text-amber-400">{highScore}</span>
                    </div>
                  </div>

                  <button
                    onClick={startGame}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white py-2.5 px-4 font-bold uppercase text-xs transition-transform active:scale-98 shadow-md cursor-pointer"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Play Again (Space)</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Controls Bar - Sleek & Full-Width */}
        <div className="flex items-center justify-between px-4 sm:px-8 lg:px-12 py-2.5 border-t border-border/50 bg-slate-900/80 backdrop-blur-sm">
          {/* Keyboard Shortcuts Hint */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-mono bg-background/80 border border-border/80 px-2 py-0.5 rounded text-[11px] font-bold text-foreground">
              SPACE
            </span>
            <span className="hidden sm:inline">Jump</span>
            <span className="text-border">•</span>
            <span className="font-mono bg-background/80 border border-border/80 px-2 py-0.5 rounded text-[11px] font-bold text-foreground">
              D / ENTER
            </span>
            <span className="hidden sm:inline">Slash</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={doJump}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-sky-500/40 bg-sky-500/20 px-3.5 py-1.5 text-xs font-bold text-sky-300 hover:bg-sky-500/30 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronUp className="size-3.5 stroke-[3]" />
              <span>{jumpCountState === 1 ? "Flip" : "Jump"}</span>
            </button>

            <button
              onClick={doSlash}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-500/20 px-3.5 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/30 active:scale-95 transition-all cursor-pointer"
            >
              <Swords className="size-3.5" />
              <span>Slash</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default NinjaNightRunner;
