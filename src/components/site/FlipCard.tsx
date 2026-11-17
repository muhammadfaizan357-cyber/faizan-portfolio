import { useState, type ReactNode } from "react";

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  /** Accessible name for the toggle (e.g. the card title). */
  label: string;
}

/**
 * 3D flip card. Desktop: flips on hover / keyboard focus.
 * Touch + keyboard: tap or press Enter/Space to toggle.
 * Styles live in styles.css (.flip-card).
 */
export function FlipCard({ front, back, className = "", label }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${flipped ? "is-flipped" : ""} ${className}`}
      onMouseLeave={() => setFlipped(false)}
    >
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={`${label} — ${flipped ? "show front" : "show details"}`}
        onClick={() => setFlipped((v) => !v)}
        className="flip-card__button"
      >
        <span className="flip-card__inner">
          <span className="flip-card__face flip-card__front">{front}</span>
          <span className="flip-card__face flip-card__back">{back}</span>
        </span>
      </button>
    </div>
  );
}
