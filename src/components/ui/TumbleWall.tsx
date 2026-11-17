import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { SlidersHorizontal } from "lucide-react";

export interface TumbleSkillItem {
  id: string;
  name: string;
  shortName?: string | undefined;
  category: "frontend" | "backend" | "database" | "devops";
  tier: string;
  experience: string;
  glowColor: string;
  badgeColor: string;
  textColor: string;
  accentBg: string;
  glassGradient?: string | undefined;
  radius?: number | undefined;
  description: string;
  renderIcon: () => React.ReactNode;
}

interface TumbleWallProps {
  skills: TumbleSkillItem[];
  activeSkillId?: string | null | undefined;
  onSelectSkill?: ((skill: TumbleSkillItem) => void) | undefined;
  className?: string | undefined;
}

export function TumbleWall({
  skills,
  activeSkillId,
  onSelectSkill,
  className = "",
}: TumbleWallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesMapRef = useRef<Map<string, Matter.Body>>(new Map());
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isInteracting, setIsInteracting] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<TumbleSkillItem | null>(null);

  // Filter skills based on category
  const filteredSkills = skills.filter((s) =>
    selectedCategory === "all" ? true : s.category === selectedCategory
  );

  // Initialize and run Matter.js physics
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 1100;
    const height = container.clientHeight || 420;
    const isMobile = width < 640;

    // Create Matter Engine
    const engine = Matter.Engine.create({
      gravity: {
        x: 0,
        y: 0.95,
        scale: 0.001,
      },
      timing: {
        timeScale: 1,
      },
    });
    engineRef.current = engine;

    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    // Boundary walls
    const wallOptions: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      restitution: 0.82,
      friction: 0.08,
      render: { visible: false },
    };

    const ground = Matter.Bodies.rectangle(
      width / 2,
      height + 30,
      width * 2,
      60,
      wallOptions
    );
    const leftWall = Matter.Bodies.rectangle(
      -30,
      height / 2,
      60,
      height * 3,
      wallOptions
    );
    const rightWall = Matter.Bodies.rectangle(
      width + 30,
      height / 2,
      60,
      height * 3,
      wallOptions
    );
    const ceiling = Matter.Bodies.rectangle(
      width / 2,
      -250,
      width * 2,
      60,
      wallOptions
    );

    Matter.Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // Create Physics Spheres
    bodiesMapRef.current.clear();
    const newBodies: Matter.Body[] = [];

    const baseRadius = isMobile ? 38 : 46;

    filteredSkills.forEach((skill, index) => {
      const radius = skill.radius
        ? (isMobile ? skill.radius * 0.78 : skill.radius * 0.9)
        : baseRadius;

      const cols = Math.max(3, Math.floor(width / (radius * 2.2)));
      const col = index % cols;
      const row = Math.floor(index / cols);

      const spawnX =
        (col + 0.5) * (width / cols) + (Math.random() - 0.5) * 24;
      const spawnY = -50 - row * (radius * 2.1) - Math.random() * 60;

      const body = Matter.Bodies.circle(spawnX, spawnY, radius, {
        restitution: 0.76,
        friction: 0.04,
        frictionAir: 0.012,
        density: 0.0012,
        label: skill.id,
      });

      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2,
        y: Math.random() * 2 + 1,
      });

      bodiesMapRef.current.set(skill.id, body);
      newBodies.push(body);
    });

    Matter.Composite.add(engine.world, newBodies);

    // Mouse & Touch Drag Controls
    const mouse = Matter.Mouse.create(container);
    mouse.pixelRatio = window.devicePixelRatio || 1;

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.28,
        damping: 0.1,
        render: { visible: false },
      },
    });

    mouseConstraintRef.current = mouseConstraint;
    Matter.Composite.add(engine.world, mouseConstraint);

    let startPos = { x: 0, y: 0 };
    let hasMoved = false;

    Matter.Events.on(mouseConstraint, "startdrag", (event) => {
      setIsInteracting(true);
      const mouseEvent = event as unknown as {
        mouse: { position: { x: number; y: number } };
      };
      startPos = {
        x: mouseEvent.mouse.position.x,
        y: mouseEvent.mouse.position.y,
      };
      hasMoved = false;
    });

    Matter.Events.on(mouseConstraint, "mousemove", (event) => {
      const mouseEvent = event as unknown as {
        mouse: { position: { x: number; y: number } };
      };
      const dx = mouseEvent.mouse.position.x - startPos.x;
      const dy = mouseEvent.mouse.position.y - startPos.y;
      if (Math.hypot(dx, dy) > 8) {
        hasMoved = true;
      }

      const hovered = Matter.Query.point(newBodies, mouseEvent.mouse.position)[0];
      if (hovered && hovered.label) {
        const found = skills.find((s) => s.id === hovered.label);
        setHoveredSkill(found || null);
      } else {
        setHoveredSkill(null);
      }
    });

    Matter.Events.on(mouseConstraint, "enddrag", (event) => {
      setIsInteracting(false);
      const mouseEvent = event as unknown as { body: Matter.Body };
      if (!hasMoved && mouseEvent.body && mouseEvent.body.label) {
        const clickedSkill = skills.find((s) => s.id === mouseEvent.body.label);
        if (clickedSkill && onSelectSkill) {
          onSelectSkill(clickedSkill);
        }
      }
    });

    Matter.Runner.run(runner, engine);

    let animFrame: number;
    const updateLoop = () => {
      bodiesMapRef.current.forEach((body, skillId) => {
        const domEl = elementsRef.current.get(skillId);
        if (domEl) {
          const { x, y } = body.position;
          const angle = body.angle;
          domEl.style.transform = `translate3d(${x}px, ${y}px, 0px) translate(-50%, -50%) rotate(${angle}rad)`;
        }
      });
      animFrame = requestAnimationFrame(updateLoop);
    };
    animFrame = requestAnimationFrame(updateLoop);

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;

      Matter.Body.setPosition(ground, { x: newW / 2, y: newH + 30 });
      Matter.Body.setPosition(leftWall, { x: -30, y: newH / 2 });
      Matter.Body.setPosition(rightWall, { x: newW + 30, y: newH / 2 });
      Matter.Body.setPosition(ceiling, { x: newW / 2, y: -250 });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animFrame);
      resizeObserver.disconnect();
      Matter.Runner.stop(runner);
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [skills, filteredSkills.length, selectedCategory]);

  return (
    <div
      className={`relative w-full select-none overflow-hidden rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0c0f17]/90 backdrop-blur-2xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_24px_70px_-15px_rgba(0,0,0,0.85)] transition-colors duration-300 ${className}`}
    >
      {/* ── Soft Clean Lighting Sheen in Arena ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 size-80 rounded-full blur-[100px] opacity-10 dark:opacity-20 bg-blue-600"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 size-80 rounded-full blur-[100px] opacity-10 dark:opacity-20 bg-[#38bdf8]"
      />

      {/* Subtle Clean Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Top Clean Filter Bar (Harmonized for Light & Dark Mode) ── */}
      <div className="relative z-30 flex items-center justify-between gap-3 px-5 py-3 border-b border-neutral-200/70 dark:border-white/[0.08] bg-white/60 dark:bg-black/30 backdrop-blur-xl">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none w-full sm:w-auto">
          <span className="text-[11px] font-bold tracking-widest text-neutral-500 dark:text-white/50 uppercase mr-1 hidden sm:inline-flex items-center gap-1.5">
            <SlidersHorizontal className="size-3.5 text-blue-600 dark:text-blue-400" />
            STACK:
          </span>
          {[
            { id: "all", label: "All Skills" },
            { id: "backend", label: "Backend & PHP" },
            { id: "frontend", label: "Frontend & UI" },
            { id: "database", label: "Databases" },
            { id: "devops", label: "DevOps & Cloud" },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs font-extrabold"
                    : "bg-white/80 dark:bg-white/[0.06] text-neutral-700 dark:text-white/75 hover:bg-neutral-100 dark:hover:bg-white/[0.12] border border-neutral-200/80 dark:border-white/[0.08]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Real-time Status Display */}
        {hoveredSkill && (
          <div className="hidden md:flex items-center gap-2 rounded-full border border-neutral-200/80 dark:border-white/10 bg-white/90 dark:bg-white/[0.08] backdrop-blur-md px-3.5 py-1 text-xs text-neutral-800 dark:text-white/90 animate-in fade-in duration-200 shadow-xs">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: hoveredSkill.badgeColor }}
            />
            <span className="font-extrabold text-neutral-900 dark:text-white">
              {hoveredSkill.name}
            </span>
            <span className="text-neutral-400 dark:text-white/40">•</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-[11px]">
              {hoveredSkill.tier}
            </span>
          </div>
        )}
      </div>

      {/* ── Wide Full-Screen Interactive Physics Arena (Height ~400px) ── */}
      <div
        ref={containerRef}
        style={{ touchAction: "none" }}
        className={`relative w-full h-[360px] sm:h-[400px] lg:h-[420px] overflow-hidden cursor-${
          isInteracting ? "grabbing" : "grab"
        }`}
      >
        {/* ── Pure Clean Glassmorphism Spheres (No Blinding Neon Bloom, Sharp Centered Logos) ── */}
        {filteredSkills.map((skill) => {
          const isSelected = activeSkillId === skill.id;
          const isHovered = hoveredSkill?.id === skill.id;
          const isHighlighted = isSelected || isHovered;

          const radius = skill.radius
            ? skill.radius * 0.9
            : 46;
          const diameter = radius * 2;

          return (
            <div
              key={skill.id}
              ref={(el) => {
                if (el) {
                  elementsRef.current.set(skill.id, el);
                } else {
                  elementsRef.current.delete(skill.id);
                }
              }}
              style={{
                width: `${diameter}px`,
                height: `${diameter}px`,
                position: "absolute",
                top: 0,
                left: 0,
                willChange: "transform",
                pointerEvents: "none",
              }}
              className="select-none"
            >
              {/* Clean Optical Frosted Glass Orb (No Overpowering Neon Light Haze) */}
              <div
                className={`relative size-full rounded-full flex items-center justify-center transition-all duration-200 ${
                  isHighlighted
                    ? "ring-2 ring-blue-500 shadow-[0_4px_20px_rgba(37,99,235,0.45)] scale-105"
                    : "shadow-[0_6px_18px_-2px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_22px_rgba(0,0,0,0.5)]"
                }`}
                style={{
                  // Authentic Frosted Crystal Glass — Clean & Translucent
                  background:
                    "radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.65) 45%, rgba(245, 248, 255, 0.45) 75%, rgba(255, 255, 255, 0.75) 100%)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: isHighlighted
                    ? "2px solid #3b82f6"
                    : "1.5px solid rgba(255, 255, 255, 0.9)",
                  boxShadow: isHighlighted
                    ? "inset 0 2px 4px rgba(255, 255, 255, 1), inset 0 -3px 5px rgba(0, 0, 0, 0.08), 0 0 16px rgba(37, 99, 235, 0.5)"
                    : "inset 0 2px 4px rgba(255, 255, 255, 1), inset 0 -2.5px 5px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.06)",
                }}
              >
                {/* 3D Curved Specular Glare (Top-Left Gloss Sheen) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1 left-1.5 w-7/12 h-2/5 rounded-full bg-gradient-to-b from-white/95 via-white/40 to-transparent rotate-[-25deg] blur-[0.3px]"
                />

                {/* Subtle Clean Inner Tint (Soft, Not Overpowering) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 rounded-full opacity-15"
                  style={{ backgroundColor: skill.badgeColor }}
                />

                {/* Centered Sharp Brand SVG Logo (Pure Showcase, Zero Clutter) */}
                <div className="relative z-10 size-8 sm:size-9 shrink-0 flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                  {skill.renderIcon()}
                </div>

                {/* Bottom Specular Rim Reflection */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-1 right-2.5 w-1/2 h-1/4 rounded-full bg-gradient-to-t from-white/70 to-transparent blur-[0.8px]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TumbleWall;
