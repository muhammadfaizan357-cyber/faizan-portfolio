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
  color: string;   // Precomputed CSS color
  size: number;    // Dot size
  startX: number;  // Initial fly-in X
  startY: number;  // Initial fly-in Y
  delay: number;   // Stagger delay
  duration: number;// Fly-in duration
  active: boolean; // Scattering state
}

export function ParticleHero({
  src,
  width = 460,
  height = 580,
  className = "",
}: ParticleHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999, radius: 90, isHovering: false });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let destroyed = false;
    let isVisible = true;
    let isLoopRunning = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (destroyed) return;

      // Handle Device Pixel Ratio for Crisp Displays
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Preserve image aspect ratio and center on canvas
      const scale = Math.min((width * 0.92) / img.naturalWidth, (height * 0.96) / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (width - dw) / 2;
      const dy = height - dh;

      // Sample pixels on an offscreen canvas
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const oCtx = offscreen.getContext("2d", { willReadFrequently: true })!;
      oCtx.drawImage(img, dx, dy, dw, dh);
      const { data } = oCtx.getImageData(0, 0, width, height);

      // Optimized sampling for high visual fidelity with 80% fewer particles
      const GAP = 4.2;
      const particles: Particle[] = [];

      for (let y = 0; y < height; y += GAP) {
        for (let x = 0; x < width; x += GAP) {
          const pixelX = Math.floor(x);
          const pixelY = Math.floor(y);
          const idx = (pixelY * width + pixelX) * 4;
          const r = data[idx] ?? 0;
          const g = data[idx + 1] ?? 0;
          const b = data[idx + 2] ?? 0;
          const a = data[idx + 3] ?? 0;

          // Skip transparent background pixels
          if (a < 35) continue;

          // Organic scattered entry coordinates
          const angle = Math.random() * Math.PI * 2;
          const dist = 240 + Math.random() * 320;
          const startX = x + Math.cos(angle) * dist;
          const startY = y + Math.sin(angle) * dist;

          const size = 3.0 + Math.random() * 0.6;
          const alpha = (a / 255).toFixed(2);
          const color = `rgba(${r},${g},${b},${alpha})`;

          particles.push({
            ox: x,
            oy: y,
            x: startX,
            y: startY,
            vx: 0,
            vy: 0,
            color,
            size,
            startX,
            startY,
            delay: Math.random() * 0.4,
            duration: 1.1 + Math.random() * 0.35,
            active: false,
          });
        }
      }

      setIsLoaded(true);

      const startTime = performance.now();
      const ASSEMBLE_TIME = 1500; // Snappy 1.5s assemble

      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

      const drawStaticPhoto = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, dx, dy, dw, dh);
      };

      const startLoop = () => {
        if (isLoopRunning || destroyed || !isVisible) return;
        isLoopRunning = true;
        rafRef.current = requestAnimationFrame(render);
      };

      const stopLoop = () => {
        if (!isLoopRunning) return;
        isLoopRunning = false;
        cancelAnimationFrame(rafRef.current);
      };

      const render = (now: number) => {
        if (destroyed || !isVisible) {
          isLoopRunning = false;
          return;
        }

        const elapsed = now - startTime;
        const assembleProgress = Math.min(elapsed / ASSEMBLE_TIME, 1);
        const isIntro = assembleProgress < 1;

        ctx.clearRect(0, 0, width, height);

        const mouse = mouseRef.current;
        const mx = mouse.x;
        const my = mouse.y;
        const mRadius = mouse.radius;
        const mRadiusSq = mRadius * mRadius;
        const isHover = mouse.isHovering && mx >= -40 && my >= -40;

        const particleCount = particles.length;

        if (isIntro) {
          // ── PHASE 1: PARTICLES FLYING IN TO ASSEMBLE IMAGE ──
          for (let i = 0; i < particleCount; i++) {
            const p = particles[i];
            if (!p) continue;
            const elapsedSec = elapsed / 1000;
            const progress = Math.max(0, Math.min((elapsedSec - p.delay) / p.duration, 1));
            const eased = easeOutQuart(progress);

            p.x = p.startX + (p.ox - p.startX) * eased;
            p.y = p.startY + (p.oy - p.startY) * eased;

            ctx.fillStyle = p.color;
            ctx.fillRect(p.x - p.size * 0.5, p.y - p.size * 0.5, p.size, p.size);
          }

          if (assembleProgress > 0.6) {
            const photoAlpha = (assembleProgress - 0.6) / 0.4;
            ctx.save();
            ctx.globalAlpha = photoAlpha;
            ctx.drawImage(img, dx, dy, dw, dh);
            ctx.restore();
          }

          rafRef.current = requestAnimationFrame(render);
        } else {
          // ── PHASE 2: RAZOR-SHARP HD PHOTO + INTERACTIVE HOVER SCATTER ──

          // 1. Scatter particles near cursor
          if (isHover) {
            for (let i = 0; i < particleCount; i++) {
              const p = particles[i];
              if (!p) continue;
              const dxM = p.x - mx;
              const dyM = p.y - my;
              const distSq = dxM * dxM + dyM * dyM;

              if (distSq < mRadiusSq && distSq > 0) {
                const dist = Math.sqrt(distSq);
                const force = (1 - dist / mRadius) * 14;
                const angle = Math.atan2(dyM, dxM) + (Math.random() - 0.5) * 0.35;

                p.vx += Math.cos(angle) * force;
                p.vy += Math.sin(angle) * force;
                p.active = true;
              }
            }
          }

          // 2. Physics update for active scattering particles
          const springK = 0.09;
          const friction = 0.82;
          let activeCount = 0;

          for (let i = 0; i < particleCount; i++) {
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

            // When returned home, settle and deactivate
            if (
              Math.abs(homeDx) < 0.3 &&
              Math.abs(homeDy) < 0.3 &&
              Math.abs(p.vx) < 0.08 &&
              Math.abs(p.vy) < 0.08
            ) {
              p.x = p.ox;
              p.y = p.oy;
              p.vx = 0;
              p.vy = 0;
              p.active = false;
            }
          }

          // 3. Draw crystal clear, sharp HD photo
          ctx.drawImage(img, dx, dy, dw, dh);

          // 4. If hovering or particles are scattered, dissolve the photo under the cursor
          if (isHover || activeCount > 0) {
            ctx.save();
            ctx.globalCompositeOperation = "destination-out";

            if (isHover) {
              const grad = ctx.createRadialGradient(mx, my, 0, mx, my, mRadius);
              grad.addColorStop(0, "rgba(0, 0, 0, 1)");
              grad.addColorStop(0.65, "rgba(0, 0, 0, 0.85)");
              grad.addColorStop(1, "rgba(0, 0, 0, 0)");

              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(mx, my, mRadius, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();

            // 5. Draw the actively scattering & returning dots
            for (let i = 0; i < particleCount; i++) {
              const p = particles[i];
              if (!p || !p.active) continue;

              ctx.fillStyle = p.color;
              ctx.fillRect(
                p.x - p.size * 0.5,
                p.y - p.size * 0.5,
                p.size,
                p.size
              );
            }

            rafRef.current = requestAnimationFrame(render);
          } else {
            // Nothing is moving and mouse is not hovering: STOP RAF loop to save 100% CPU/GPU!
            drawStaticPhoto();
            isLoopRunning = false;
          }
        }
      };

      // Start initial intro assembly
      startLoop();

      // ── LOCAL MOUSE & TOUCH TRACKING (Attached to canvas only) ──
      const updateLocalPointer = (clientX: number, clientY: number) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = width / rect.width;
        const scaleY = height / rect.height;
        mouseRef.current = {
          x: (clientX - rect.left) * scaleX,
          y: (clientY - rect.top) * scaleY,
          radius: 95,
          isHovering: true,
        };
        startLoop();
      };

      const handleCanvasMouseMove = (e: MouseEvent) => {
        updateLocalPointer(e.clientX, e.clientY);
      };

      const handleCanvasMouseLeave = () => {
        mouseRef.current.isHovering = false;
        mouseRef.current.x = -9999;
        mouseRef.current.y = -9999;
        startLoop(); // let active particles return home then sleep
      };

      const handleCanvasTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          if (touch) updateLocalPointer(touch.clientX, touch.clientY);
        }
      };

      canvas.addEventListener("mousemove", handleCanvasMouseMove, { passive: true });
      canvas.addEventListener("mouseleave", handleCanvasMouseLeave);
      canvas.addEventListener("touchmove", handleCanvasTouchMove, { passive: true });
      canvas.addEventListener("touchend", handleCanvasMouseLeave);

      // Viewport IntersectionObserver: pause when offscreen
      const obs = new IntersectionObserver(
        ([entry]) => {
          isVisible = !!entry?.isIntersecting;
          if (isVisible) {
            startLoop();
          } else {
            stopLoop();
          }
        },
        { threshold: 0.05 }
      );
      obs.observe(container);

      // Save teardown handler
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
      cancelAnimationFrame(rafRef.current);
      if (cleanupListeners) cleanupListeners();
    };
  }, [src, width, height]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* Ambient background glow behind portrait */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div
          className="size-[320px] sm:size-[400px] rounded-full bg-gradient-to-tr from-primary/30 via-cyan-500/20 to-primary/10 blur-[90px] animate-pulse"
          style={{ animationDuration: "6s" }}
        />
        <div className="absolute size-[260px] sm:size-[320px] rounded-full bg-emerald-500/15 blur-[80px] translate-y-12" />
      </div>

      {/* Canvas Particle & HD Portrait System */}
      <canvas
        ref={canvasRef}
        className="w-full max-w-[460px] h-auto object-contain cursor-crosshair drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_20px_45px_rgba(8,185,212,0.25)]"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.6s ease-out",
        }}
      />

      {/* Smooth grounding fade at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
    </div>
  );
}

export default ParticleHero;
