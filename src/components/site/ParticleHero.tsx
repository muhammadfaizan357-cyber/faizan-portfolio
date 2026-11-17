import { useEffect, useRef, useState } from "react";

interface ParticleHeroProps {
  src: string;
  width?: number;
  height?: number;
  className?: string;
}

interface Particle {
  ox: number;      // Home X
  oy: number;      // Home Y
  x: number;       // Current X
  y: number;       // Current Y
  vx: number;      // Velocity X
  vy: number;      // Velocity Y
  r: number;
  g: number;
  b: number;
  a: number;
  size: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
  active: boolean; // Dispersed state
}

/**
 * Ultra-Clear Hybrid Particle Hero:
 * 1. Intro: Particles fly in and assemble organically.
 * 2. On Completion: Crossfades into the 100% crystal-clear, razor-sharp HD Photo (NO PIXELATION / NO BLUR).
 * 3. On Hover: Disperses into clean, sharp particles that fly away from the cursor and spring back home.
 * 4. Zero ghost images, zero blur, instant fast load, 60+ FPS.
 */
export function ParticleHero({
  src,
  width = 460,
  height = 580,
  className = "",
}: ParticleHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, isHovering: false });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let destroyed = false;
    let isVisible = true;
    let rafId = 0;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (destroyed) return;

      // Handle Device Pixel Ratio for Ultra-Sharp HD Displays
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Preserve aspect ratio and center on canvas
      const scale = Math.min((width * 0.94) / img.naturalWidth, (height * 0.96) / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (width - dw) / 2;
      const dy = height - dh;

      // Offscreen sampling canvas
      const offscreen = document.createElement("canvas");
      offscreen.width = Math.round(width);
      offscreen.height = Math.round(height);
      const oCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!oCtx) return;

      oCtx.drawImage(img, dx, dy, dw, dh);
      const imgData = oCtx.getImageData(0, 0, Math.round(width), Math.round(height)).data;

      // Optimized step size for clean particle density
      const STEP = 4.0;
      const particles: Particle[] = [];
      const wInt = Math.round(width);

      for (let y = 0; y < height; y += STEP) {
        for (let x = 0; x < width; x += STEP) {
          const px = Math.floor(x);
          const py = Math.floor(y);
          const idx = (py * wInt + px) * 4;
          const a = imgData[idx + 3] ?? 0;

          if (a < 35) continue; // Skip transparent background

          const r = imgData[idx] ?? 0;
          const g = imgData[idx + 1] ?? 0;
          const b = imgData[idx + 2] ?? 0;

          // Scattered entry coordinates
          const angle = Math.random() * Math.PI * 2;
          const dist = 160 + Math.random() * 240;
          const startX = x + Math.cos(angle) * dist;
          const startY = y + Math.sin(angle) * dist;

          particles.push({
            ox: x,
            oy: y,
            x: startX,
            y: startY,
            vx: 0,
            vy: 0,
            r,
            g,
            b,
            a: a / 255,
            size: STEP * 0.95,
            startX,
            startY,
            delay: Math.random() * 0.3,
            duration: 0.9 + Math.random() * 0.3,
            active: false,
          });
        }
      }

      setIsLoaded(true);

      const startTime = performance.now();
      const ASSEMBLE_TIME = 1200; // 1.2s assemble
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

      const render = (now: number) => {
        if (destroyed || !isVisible) return;

        ctx.clearRect(0, 0, width, height);

        const elapsed = now - startTime;
        const introProgress = Math.min(elapsed / ASSEMBLE_TIME, 1);
        const isIntro = introProgress < 1;

        const mouse = mouseRef.current;
        const mx = mouse.x;
        const my = mouse.y;
        const isHover = mouse.isHovering && mx >= 0 && my >= 0;
        const M_RADIUS = 95;
        const M_RADIUS_SQ = M_RADIUS * M_RADIUS;

        const count = particles.length;

        if (isIntro) {
          // ── PHASE 1: PARTICLES FLYING IN TO ASSEMBLE THE IMAGE ──
          for (let i = 0; i < count; i++) {
            const p = particles[i];
            if (!p) continue;

            const t = Math.max(0, Math.min((elapsed / 1000 - p.delay) / p.duration, 1));
            const eased = easeOutQuart(t);

            p.x = p.startX + (p.ox - p.startX) * eased;
            p.y = p.startY + (p.oy - p.startY) * eased;

            ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a * eased})`;
            ctx.fillRect(p.x - p.size * 0.5, p.y - p.size * 0.5, p.size, p.size);
          }

          // Near completion, smoothly blend in the crystal-clear photo
          if (introProgress > 0.6) {
            const blendAlpha = (introProgress - 0.6) / 0.4;
            ctx.save();
            ctx.globalAlpha = blendAlpha;
            ctx.drawImage(img, dx, dy, dw, dh);
            ctx.restore();
          }
        } else {
          // ── PHASE 2: 100% RAZOR-SHARP HD PHOTO + HOVER PARTICLE DISPERSAL ──
          const springK = 0.085;
          const friction = 0.82;
          let activeCount = 0;

          // 1. Hover dispersal triggers particles near cursor
          if (isHover) {
            for (let i = 0; i < count; i++) {
              const p = particles[i];
              if (!p) continue;

              const dxM = p.x - mx;
              const dyM = p.y - my;
              const distSq = dxM * dxM + dyM * dyM;

              if (distSq < M_RADIUS_SQ && distSq > 0) {
                const dist = Math.sqrt(distSq);
                const force = (1 - dist / M_RADIUS) * 16;
                const angle = Math.atan2(dyM, dxM) + (Math.random() - 0.5) * 0.35;

                p.vx += Math.cos(angle) * force;
                p.vy += Math.sin(angle) * force;
                p.active = true;
              }
            }
          }

          // 2. Physics update for moving particles
          for (let i = 0; i < count; i++) {
            const p = particles[i];
            if (!p || !p.active) continue;

            activeCount++;
            const homeDx = p.ox - p.x;
            const homeDy = p.oy - p.y;

            p.vx += homeDx * springK;
            p.vy += homeDy * springK;
            p.vx *= friction;
            p.vy *= friction;

            p.x += p.vx;
            p.y += p.vy;

            // Settle home
            if (
              Math.abs(homeDx) < 0.25 &&
              Math.abs(homeDy) < 0.25 &&
              Math.abs(p.vx) < 0.06 &&
              Math.abs(p.vy) < 0.06
            ) {
              p.x = p.ox;
              p.y = p.oy;
              p.vx = 0;
              p.vy = 0;
              p.active = false;
            }
          }

          // 3. Draw 100% CRYSTAL-CLEAR, CRISP ORIGINAL HD PHOTO
          ctx.drawImage(img, dx, dy, dw, dh);

          // 4. When hovering, mask out ONLY the area directly under cursor where particles fly
          if (isHover || activeCount > 0) {
            ctx.save();
            ctx.globalCompositeOperation = "destination-out";

            if (isHover) {
              const grad = ctx.createRadialGradient(mx, my, 0, mx, my, M_RADIUS);
              grad.addColorStop(0, "rgba(0, 0, 0, 1)");
              grad.addColorStop(0.7, "rgba(0, 0, 0, 0.9)");
              grad.addColorStop(1, "rgba(0, 0, 0, 0)");
              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(mx, my, M_RADIUS, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();

            // 5. Draw the particles that are flying/returning in the active area
            for (let i = 0; i < count; i++) {
              const p = particles[i];
              if (!p || !p.active) continue;

              ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a})`;
              ctx.fillRect(p.x - p.size * 0.5, p.y - p.size * 0.5, p.size, p.size);
            }
          }
        }

        rafId = requestAnimationFrame(render);
      };

      rafId = requestAnimationFrame(render);

      // Mouse & Touch tracking relative to canvas
      const updatePointer = (clientX: number, clientY: number) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = width / rect.width;
        const scaleY = height / rect.height;
        mouseRef.current = {
          x: (clientX - rect.left) * scaleX,
          y: (clientY - rect.top) * scaleY,
          isHovering: true,
        };
      };

      const handleCanvasMouseMove = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
      const handleCanvasMouseLeave = () => {
        mouseRef.current.isHovering = false;
        mouseRef.current.x = -9999;
        mouseRef.current.y = -9999;
      };

      const handleCanvasTouchMove = (e: TouchEvent) => {
        if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      };

      canvas.addEventListener("mousemove", handleCanvasMouseMove, { passive: true });
      canvas.addEventListener("mouseleave", handleCanvasMouseLeave);
      canvas.addEventListener("touchmove", handleCanvasTouchMove, { passive: true });
      canvas.addEventListener("touchend", handleCanvasMouseLeave);

      const obs = new IntersectionObserver(
        ([entry]) => {
          isVisible = !!entry?.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(render);
          }
        },
        { threshold: 0.05 }
      );
      obs.observe(container);

      cleanupListeners = () => {
        canvas.removeEventListener("mousemove", handleCanvasMouseMove);
        canvas.removeEventListener("mouseleave", handleCanvasMouseLeave);
        canvas.removeEventListener("touchmove", handleCanvasTouchMove);
        canvas.removeEventListener("touchend", handleCanvasMouseLeave);
        obs.disconnect();
      };
    };

    let cleanupListeners: (() => void) | null = null;

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      if (cleanupListeners) cleanupListeners();
    };
  }, [src, width, height]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div
          className="size-[320px] sm:size-[400px] rounded-full bg-gradient-to-tr from-primary/30 via-cyan-500/20 to-primary/10 blur-[90px]"
        />
        <div className="absolute size-[260px] sm:size-[320px] rounded-full bg-emerald-500/15 blur-[80px] translate-y-12" />
      </div>

      {/* Crystal Clear HD Canvas Particle Portrait */}
      <canvas
        ref={canvasRef}
        className="w-full max-w-[460px] h-auto object-contain cursor-crosshair drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_20px_45px_rgba(8,185,212,0.25)]"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.4s ease-out",
        }}
      />

      {/* Grounding fade at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
    </div>
  );
}

export default ParticleHero;
