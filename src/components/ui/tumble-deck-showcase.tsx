"use client"

import * as React from "react"
import gsap from "gsap"
import { ArrowUpRight, ExternalLink, Layers } from "lucide-react"

export type TumbleCard = {
  src: string
  alt?: string | undefined
  title?: string | undefined
  category?: string | undefined
  year?: string | undefined
  summary?: string | undefined
  tags?: string[] | undefined
  href?: string | undefined
  liveUrl?: string | undefined
  buttonLabel?: string | undefined
}

export type TumbleDeckShowcaseProps = {
  cards: TumbleCard[]
  /** Any CSS length. Default 680px. */
  height?: number | string | undefined
  /** Card width ÷ height. Images are cropped to it from the top. */
  aspect?: number | undefined
  /** Wheel / trackpad travel (px) that tips one card. */
  scrollPerCard?: number | undefined
  /** How many upright cards show behind the front one. */
  depth?: number | undefined
  background?: string | undefined
  className?: string | undefined
  style?: React.CSSProperties | undefined
  ariaLabel?: string | undefined
  /** Optional external command to jump to a specific card index (0..cards.length-1). */
  jumpToIndex?: { index: number; nonce: number } | null | undefined
  /** Callback fired whenever the settled front card changes. */
  onActiveIndexChange?: ((index: number) => void) | undefined
  /** Callback fired when the primary action button on a card is clicked. */
  onCardAction?: ((card: TumbleCard, index: number) => void) | undefined
}

// #region pose
export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

/** Euclidean modulo: card k of an endless deck shows image wrap(k, n). */
export const wrap = (k: number, n: number) => (n ? ((k % n) + n) % n : 0)

/**
 * Hinge angle (deg, CSS rotateX) of a card `t` of the way through its fall.
 * 0 stands upright, -90 lies flat towards the viewer. Gravity eases in, then
 * the card kicks once off the floor and settles.
 */
export function fallAngle(t: number): number {
  const u = clamp01(t)
  const land = 0.78
  if (u <= land) {
    const k = u / land
    return -90 * k * k * k
  }
  const k = (u - land) / (1 - land)
  return -90 + 6 * Math.sin(Math.PI * k) * (1 - k)
}

/** How far the deck has slid forward, in card gaps, at deck position `pos`. */
export function deckAdvance(pos: number): number {
  const i = Math.floor(pos)
  const f = pos - i
  const k = clamp01((f - 0.28) / 0.6)
  return i + k * k * (3 - 2 * k)
}

export type Pose = { angle: number; z: number; lift: number; opacity: number; flat: boolean }

/**
 * Pose of virtual card `k` when the deck is at `pos` (card k is at the front
 * when pos = k). Both may run past the number of images, and below zero.
 */
export function cardPose(k: number, pos: number, depth: number): Pose {
  const t = pos - k
  const lift = (k - Math.floor(pos) + 3) * 0.6
  if (t >= 1) {
    // On the floor. Only the two latest show.
    return { angle: -90, z: 0, lift, opacity: t < 3 ? 1 : 0, flat: true }
  }
  if (t > 0) return { angle: fallAngle(t), z: 0, lift, opacity: 1, flat: false }
  const rel = k - deckAdvance(pos)
  const opacity = clamp01(depth + 1 - rel)
  return { angle: 0, z: -Math.max(rel, 0), lift: 0, opacity, flat: false }
}
// #endregion

export default function TumbleDeckShowcase({
  cards,
  height = "660px",
  aspect = 2.08,
  scrollPerCard = 190,
  depth = 4,
  background = "transparent",
  className,
  style,
  ariaLabel = "Website showcase",
  jumpToIndex,
  onActiveIndexChange,
  onCardAction,
}: TumbleDeckShowcaseProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const sceneRef = React.useRef<HTMLDivElement>(null)
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const imgRefs = React.useRef<(HTMLImageElement | null)[]>([])
  const catRefs = React.useRef<(HTMLSpanElement | null)[]>([])
  const topTitleRefs = React.useRef<(HTMLSpanElement | null)[]>([])
  const countRefs = React.useRef<(HTMLSpanElement | null)[]>([])
  const titleRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const summaryRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const tagsContainerRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const liveBtnRefs = React.useRef<(HTMLAnchorElement | null)[]>([])
  const primaryLabelRefs = React.useRef<(HTMLSpanElement | null)[]>([])
  const slotK = React.useRef<number[]>([])
  const state = React.useRef({ pos: 0 })
  const geo = React.useRef({ h: 420, gap: 96 })
  const lastReportedIdx = React.useRef<number>(0)
  const onActiveIndexChangeRef = React.useRef(onActiveIndexChange)
  onActiveIndexChangeRef.current = onActiveIndexChange

  const n = cards.length
  const pool = n ? depth + 5 : 0

  const paint = React.useCallback(() => {
    const { pos } = state.current
    const { gap } = geo.current
    const base = Math.floor(pos) - 2
    const frontK = Math.round(pos)

    cardRefs.current.forEach((el, j) => {
      const img = imgRefs.current[j]
      if (!el || !img || j >= pool) return
      const k = base + wrap(j - base, pool)
      const cardIdx = wrap(k, n)

      if (slotK.current[j] !== k) {
        slotK.current[j] = k
        const c = cards[cardIdx]
        if (c) {
          img.src = c.src
          img.alt = c.alt ?? c.title ?? ""

          const num = String(cardIdx + 1).padStart(2, "0")

          const countEl = countRefs.current[j]
          if (countEl) {
            countEl.textContent = num
          }

          const topTitleEl = topTitleRefs.current[j]
          if (topTitleEl) {
            topTitleEl.textContent = c.title ?? c.alt ?? `Project ${num}`
          }

          const catEl = catRefs.current[j]
          if (catEl) {
            catEl.textContent = c.category ?? "FEATURED PROJECT"
          }

          const titleEl = titleRefs.current[j]
          if (titleEl) {
            titleEl.textContent = c.title ?? c.alt ?? `Project ${num}`
          }

          const summaryEl = summaryRefs.current[j]
          if (summaryEl) {
            summaryEl.textContent = c.summary ?? ""
          }

          const tagsEl = tagsContainerRefs.current[j]
          if (tagsEl) {
            const tags = (c.tags ?? []).slice(0, 3)
            tagsEl.innerHTML = tags
              .map(
                (t) =>
                  `<span style="display:inline-flex;align-items:center;padding:3px 9px;border-radius:9999px;font-size:10px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;background:rgba(37,99,235,0.18);color:#93c5fd;border:1px solid rgba(59,130,246,0.4);white-space:nowrap;">${t}</span>`
              )
              .join("")
          }

          const primaryLabelEl = primaryLabelRefs.current[j]
          if (primaryLabelEl) {
            primaryLabelEl.textContent = c.buttonLabel ?? "Case Study"
          }

          const liveBtn = liveBtnRefs.current[j]
          if (liveBtn) {
            if (c.liveUrl) {
              liveBtn.href = c.liveUrl
              liveBtn.style.display = "inline-flex"
            } else {
              liveBtn.style.display = "none"
            }
          }
        }
      }

      const p = cardPose(k, pos, depth)
      el.style.transform = `translate3d(0, ${-p.lift}px, ${p.z * gap}px) rotateX(${p.angle}deg)`
      el.style.opacity = String(p.opacity)
      el.style.visibility = p.opacity > 0 ? "visible" : "hidden"
      el.style.zIndex = String(1000 - Math.round(Math.abs(k - pos) * 10))
      el.dataset["virtualK"] = String(k)
      el.dataset["cardIdx"] = String(cardIdx)

      const isFront = k === frontK && !p.flat && p.angle > -35
      const isUprightBack = k > frontK && !p.flat && p.angle > -15
      el.dataset["cardRole"] = isFront ? "front" : isUprightBack ? "back" : "floor"

      const shade = p.flat ? 0.18 : (-p.angle / 90) * 0.08 + Math.max(0, -p.z) * 0.03
      el.style.setProperty("--td-shade", String(shade))
    })

    if (n > 0 && onActiveIndexChangeRef.current) {
      const currentIdx = wrap(frontK, n)
      if (lastReportedIdx.current !== currentIdx) {
        lastReportedIdx.current = currentIdx
        onActiveIndexChangeRef.current(currentIdx)
      }
    }
  }, [depth, pool, cards, n])

  React.useLayoutEffect(() => {
    slotK.current = []
    paint()
  }, [cards, paint])

  // Fit card size & 3D perspective:
  // - Card width fills 92%–95% of the container so there is minimal side space
  // - Perspective origin & gap give each stacked back card a clean 40px+ visible header strip at the top!
  React.useLayoutEffect(() => {
    const root = rootRef.current
    const scene = sceneRef.current
    if (!root || !scene) return
    const fit = () => {
      const W0 = root.clientWidth
      const H0 = root.clientHeight
      const targetW = Math.min(W0 * (W0 < 640 ? 0.95 : 0.92), 1180)
      const h = Math.max(240, Math.min(targetW / aspect, H0 * 0.66, 560))
      const w = Math.min(W0 * 0.95, h * aspect)
      // Place front card so the 4 upright back cards fit cleanly above it without top emptiness
      // and the fallen floor card is visible below
      const top = H0 * 0.57 - 0.5 * h
      geo.current = { h, gap: 0.25 * h }
      scene.style.perspective = `${5.4 * h}px`
      scene.style.perspectiveOrigin = `50% ${top - 2.05 * h}px`
      root.style.setProperty("--td-w", `${w}px`)
      root.style.setProperty("--td-h", `${h}px`)
      root.style.setProperty("--td-top", `${top}px`)
      paint()
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(root)
    return () => ro.disconnect()
  }, [aspect, paint])

  const api = React.useRef<{
    step: (dir: 1 | -1) => void
    goToVirtual: (k: number) => void
    goToIndex: (idx: number) => void
  }>({
    step: () => {},
    goToVirtual: () => {},
    goToIndex: () => {},
  })
  const dragged = React.useRef(false)

  React.useEffect(() => {
    const root = rootRef.current
    if (!root || n === 0) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const s = state.current
    let target = s.pos
    let running = false
    let idle: ReturnType<typeof setTimeout> | undefined
    let acc = 0

    const follow = () => {
      const dt = Math.min(0.05, gsap.ticker.deltaRatio(60) / 60)
      s.pos += (target - s.pos) * (1 - Math.exp(-dt * 12))
      if (Math.abs(target - s.pos) < 1.2e-3) {
        s.pos = target
        gsap.ticker.remove(follow)
        running = false
      }
      paint()
    }

    const push = (to: number, maxJump = 6) => {
      target = Math.max(Math.round(s.pos) - maxJump, Math.min(Math.round(s.pos) + maxJump, to))
      if (reduce) {
        s.pos = target
        paint()
      } else if (!running) {
        running = true
        gsap.ticker.add(follow)
      }
    }

    const settle = (bias = 0) =>
      push(
        bias > 0
          ? Math.floor(target + 0.72)
          : bias < 0
            ? Math.ceil(target - 0.72)
            : Math.round(target)
      )

    api.current.step = (dir) => push(Math.round(target) + dir)
    api.current.goToVirtual = (k: number) => {
      push(k, Math.max(pool, n, 12))
    }
    api.current.goToIndex = (idx: number) => {
      if (n === 0) return
      const curFront = Math.round(target)
      const curMod = wrap(curFront, n)
      let diff = wrap(idx - curMod, n)
      if (diff > n / 2) diff -= n
      push(curFront + diff, Math.max(pool, n, 12))
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const scale = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? root.clientHeight : 1
      const d = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * scale
      if (reduce) {
        acc += d
        while (Math.abs(acc) >= scrollPerCard) {
          const dir = Math.sign(acc)
          acc -= dir * scrollPerCard
          push(target + dir)
        }
        return
      }
      const stepDelta = Math.max(-0.85, Math.min(0.85, d / scrollPerCard))
      push(target + stepDelta, 2)
      clearTimeout(idle)
      idle = setTimeout(() => settle(Math.sign(d)), 110)
    }

    let drag: {
      id: number
      startY: number
      startX: number
      lastY: number
      lastX: number
      startPos: number
      travel: number
      lastDir: number
    } | null = null

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      const targetEl = e.target as HTMLElement | null
      if (targetEl?.closest("[data-card-action='true']")) return

      drag = {
        id: e.pointerId,
        startY: e.clientY,
        startX: e.clientX,
        lastY: e.clientY,
        lastX: e.clientX,
        startPos: Math.round(target),
        travel: 0,
        lastDir: 0,
      }
      dragged.current = false
      clearTimeout(idle)
    }

    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      const stepDy = e.clientY - drag.lastY
      const stepDx = e.clientX - drag.lastX
      drag.lastY = e.clientY
      drag.lastX = e.clientX
      drag.travel += Math.abs(stepDy) + Math.abs(stepDx)

      if (drag.travel > 6 && !dragged.current) {
        dragged.current = true
        root.setPointerCapture(e.pointerId)
      }

      if (dragged.current && !reduce) {
        const totalDy = e.clientY - drag.startY
        const totalDx = drag.startX - e.clientX
        const primaryTravel = Math.abs(totalDy) >= Math.abs(totalDx) ? totalDy : totalDx
        const dragPerCard = Math.max(130, geo.current.h * 0.42)

        if (Math.abs(stepDy) >= Math.abs(stepDx)) {
          if (stepDy !== 0) drag.lastDir = Math.sign(stepDy)
        } else {
          if (stepDx !== 0) drag.lastDir = -Math.sign(stepDx)
        }

        const desiredPos = drag.startPos + primaryTravel / dragPerCard
        push(desiredPos, 3)
      }
    }

    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      if (dragged.current) {
        if (reduce) {
          push(drag.startPos + (drag.lastDir || 0), 1)
        } else {
          settle(drag.lastDir)
        }
      }
      drag = null
    }

    root.addEventListener("wheel", onWheel, { passive: false })
    root.addEventListener("pointerdown", onDown)
    root.addEventListener("pointermove", onMove)
    root.addEventListener("pointerup", onUp)
    root.addEventListener("pointercancel", onUp)
    paint()
    return () => {
      clearTimeout(idle)
      gsap.ticker.remove(follow)
      root.removeEventListener("wheel", onWheel)
      root.removeEventListener("pointerdown", onDown)
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerup", onUp)
      root.removeEventListener("pointercancel", onUp)
    }
  }, [n, pool, scrollPerCard, paint])

  React.useEffect(() => {
    if (!jumpToIndex || n === 0) return
    api.current.goToIndex(jumpToIndex.index)
  }, [jumpToIndex, n])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
      e.preventDefault()
      api.current.step(1)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      api.current.step(-1)
    }
  }

  return (
    <div
      ref={rootRef}
      data-lenis-prevent="true"
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKey}
      onClick={(e) => {
        if (dragged.current) return
        const targetEl = e.target as HTMLElement | null
        if (targetEl?.closest("[data-card-action='true']")) return

        const cardEl = targetEl?.closest(".td-card") as HTMLElement | null
        if (cardEl && cardEl.dataset["virtualK"] !== undefined) {
          const clickedK = Number(cardEl.dataset["virtualK"])
          const frontK = Math.round(state.current.pos)
          if (clickedK !== frontK) {
            api.current.goToVirtual(clickedK)
            return
          }
        }
        api.current.step(1)
      }}
      className={[
        "td-root keep-dark relative w-full touch-none overflow-hidden outline-none select-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ height, background, ...style }}
    >
      <style>{`
        .td-scene {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
        }
        .td-card {
          position: absolute;
          left: 50%;
          top: var(--td-top);
          width: var(--td-w);
          height: var(--td-h);
          margin-left: calc(var(--td-w) / -2);
          transform-origin: 50% 100%;
          transform-style: preserve-3d;
          backface-visibility: visible;
          will-change: transform;
          border-radius: 22px;
          overflow: hidden;
          cursor: grab;
          background: #0b0e17;
          box-shadow:
            0 0 0 1.5px rgba(59, 130, 246, 0.45),
            0 -6px 24px rgba(0, 0, 0, 0.35),
            0 20px 50px rgba(0, 0, 0, 0.35);
          transition: box-shadow 0.22s ease;
        }
        .td-card:active {
          cursor: grabbing;
        }
        .td-card[data-card-role="front"] {
          box-shadow:
            0 0 0 2.5px #3b82f6,
            0 28px 75px rgba(37, 99, 235, 0.3),
            0 22px 55px rgba(0, 0, 0, 0.5);
        }
        .td-card[data-card-role="back"]:hover {
          box-shadow:
            0 0 0 2.5px #60a5fa,
            0 -8px 30px rgba(37, 99, 235, 0.45);
        }
        .td-card img {
          display: block;
          width: 100%;
          height: calc(100% - 42px);
          margin-top: 42px;
          max-width: none;
          object-fit: cover;
          object-position: 50% 0%;
          pointer-events: none;
        }
        .td-card::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: #000;
          opacity: var(--td-shade, 0);
        }
        .td-card .td-top-bar,
        .td-card .td-bottom-bar {
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .td-card[data-card-role="floor"] .td-top-bar,
        .td-card[data-card-role="floor"] .td-bottom-bar {
          opacity: 0 !important;
          pointer-events: none !important;
        }
        .td-card[data-card-role="back"] .td-bottom-bar {
          opacity: 0;
          pointer-events: none;
          transform: translateY(8px);
        }
        .td-card[data-card-role="front"] .td-bottom-bar {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
        .td-root:focus-visible {
          box-shadow: inset 0 0 0 2px var(--color-primary);
        }
      `}</style>

      <div ref={sceneRef} className="td-scene">
        {Array.from({ length: pool }, (_, j) => (
          <div
            key={j}
            ref={(el) => {
              cardRefs.current[j] = el
            }}
            className="td-card keep-dark group"
          >
            {/* Dedicated 42px Top Browser Tab Bar — Never overlaps screenshot, 100% crisp in 3D stack */}
            <div
              className="td-top-bar pointer-events-none absolute inset-x-0 top-0 z-20 flex h-[42px] items-center justify-between gap-4 border-b border-white/10 px-4 sm:px-5"
              style={{
                background:
                  "linear-gradient(90deg, #0d111c 0%, #131929 50%, #0d111c 100%)",
              }}
            >
              {/* Left: Window Dots + Number Pill + Full Project Title */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="hidden sm:flex items-center gap-1.5 mr-1 shrink-0">
                  <span className="size-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="size-2.5 rounded-full bg-[#27c93f]" />
                </div>

                <span
                  ref={(el) => {
                    countRefs.current[j] = el
                  }}
                  className="inline-flex items-center justify-center rounded-md px-2 py-0.5 font-mono text-[11px] font-black shrink-0"
                  style={{
                    backgroundColor: "rgba(37, 99, 235, 0.18)",
                    color: "#60a5fa",
                    border: "1px solid rgba(59, 130, 246, 0.4)",
                  }}
                />

                <span
                  ref={(el) => {
                    topTitleRefs.current[j] = el
                  }}
                  className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider truncate"
                  style={{ color: "#ffffff" }}
                />
              </div>

              {/* Right: Clean Category Badge */}
              <div className="flex items-center gap-2 shrink-0">
                <span
                  ref={(el) => {
                    catRefs.current[j] = el
                  }}
                  className="rounded-full px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-widest"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    color: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                  }}
                />
              </div>
            </div>

            {/* Project Screenshot (Starts cleanly below the 42px top header bar) */}
            <img
              ref={(el) => {
                imgRefs.current[j] = el
              }}
              alt=""
              width={1200}
              height={Math.round(1200 / aspect)}
              draggable={false}
              decoding="async"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80"
              }}
            />

            {/* Enhanced Bottom Button & Info Bar on Front Card */}
            <div
              className="td-bottom-bar absolute inset-x-4 sm:inset-x-6 bottom-4 sm:bottom-5 z-20 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-blue-500/35 px-5 sm:px-6 py-4 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(10, 13, 22, 0.94) 0%, rgba(17, 22, 35, 0.92) 100%)",
              }}
            >
              {/* Left Info Column */}
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <div
                    ref={(el) => {
                      titleRefs.current[j] = el
                    }}
                    className="font-display text-base sm:text-lg md:text-xl font-black uppercase tracking-tight truncate"
                    style={{ color: "#ffffff" }}
                  />
                  <div
                    ref={(el) => {
                      tagsContainerRefs.current[j] = el
                    }}
                    className="hidden sm:flex flex-wrap items-center gap-1.5"
                  />
                </div>

                <div
                  ref={(el) => {
                    summaryRefs.current[j] = el
                  }}
                  className="text-xs sm:text-[13px] line-clamp-1 font-normal"
                  style={{ color: "rgba(255, 255, 255, 0.72)" }}
                />
              </div>

              {/* Right Action Buttons */}
              <div
                data-card-action="true"
                className="flex flex-wrap items-center gap-2.5 shrink-0"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    const cardEl = (e.currentTarget as HTMLElement).closest(
                      ".td-card"
                    ) as HTMLElement | null
                    const idx = Number(cardEl?.dataset["cardIdx"] ?? 0)
                    const c = cards[idx]
                    if (!c) return
                    if (onCardAction) {
                      onCardAction(c, idx)
                    } else if (c.href) {
                      window.location.href = c.href
                    } else {
                      api.current.step(1)
                    }
                  }}
                  className="group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.1em] shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:brightness-110 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer text-white"
                  style={{ color: "#ffffff" }}
                >
                  <Layers className="size-3.5 stroke-[2.5]" />
                  <span
                    ref={(el) => {
                      primaryLabelRefs.current[j] = el
                    }}
                  >
                    Case Study
                  </span>
                  <ArrowUpRight className="size-4 stroke-[2.5] transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>

                <a
                  ref={(el) => {
                    liveBtnRefs.current[j] = el
                  }}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] hover:bg-emerald-500/30 hover:-translate-y-0.5 transition-all cursor-pointer"
                  style={{ color: "#6ee7b7", display: "none" }}
                >
                  <ExternalLink className="size-3.5" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only" aria-live="polite">
        {n} pages. Scroll, drag, click or press the arrow keys to flip through them.
      </span>
    </div>
  )
}
