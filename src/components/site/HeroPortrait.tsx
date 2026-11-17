import avatarHd from "@/assets/avatar-hd.png";
import { profile } from "@/data/portfolio";

interface HeroPortraitProps {
  className?: string;
}

export function HeroPortrait({ className = "" }: HeroPortraitProps) {
  return (
    <div
      className={`relative w-full h-full min-h-[460px] sm:min-h-[540px] lg:min-h-[680px] flex items-end justify-center select-none overflow-visible ${className}`}
    >
      {/* Subtle Studio Architectural Backlight */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* Soft Ambient Studio Glow */}
        <div
          className="absolute top-[20%] left-[50%] -translate-x-1/2 size-[360px] sm:size-[440px] rounded-full blur-[120px] opacity-30 dark:opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.4) 0%, rgba(79,70,229,0.18) 55%, transparent 75%)",
          }}
        />

        {/* Architectural Diagonal Studio Beam */}
        <div
          className="absolute -top-32 right-[16%] sm:right-[20%] w-28 sm:w-36 lg:w-40 h-[145%] rotate-[24deg] origin-center opacity-50 dark:opacity-55"
          style={{
            background:
              "linear-gradient(180deg, rgba(37,99,235,0.5) 0%, rgba(79,70,229,0.45) 50%, rgba(6,182,212,0.25) 85%, transparent 100%)",
          }}
        />
      </div>

      {/* Full-Height Ultra-HD (1536x2048) Natural Color Portrait */}
      <div className="relative z-10 w-full flex items-end justify-center pt-6">
        <img
          src={avatarHd}
          alt={profile.name}
          width={1536}
          height={2048}
          decoding="async"
          fetchPriority="high"
          className="w-auto h-[430px] sm:h-[510px] lg:h-[600px] xl:h-[640px] max-w-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(15,23,42,0.22)] dark:drop-shadow-[0_22px_44px_rgba(0,0,0,0.72)]"
        />
      </div>
    </div>
  );
}

export default HeroPortrait;
