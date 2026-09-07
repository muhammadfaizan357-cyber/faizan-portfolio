import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.49-8.418z" />
    </svg>
  );
}

export function WhatsAppButton({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "compact" | "pill";
  className?: string;
}) {
  if (variant === "compact") {
    return (
      <a
        href={profile.whatsapp}
        target="_blank"
        rel="noreferrer"
        title="Chat on WhatsApp: 0302 2679431"
        aria-label="WhatsApp Chat"
        className={`inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 backdrop-blur-md transition-all duration-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:scale-105 shadow-md shadow-emerald-500/10 ${className}`}
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        <WhatsAppIcon className="size-4" />
        <span>WhatsApp</span>
      </a>
    );
  }

  return (
    <motion.a
      href={profile.whatsapp}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-3.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:shadow-emerald-500/40 ${className}`}
    >
      {/* Active green pulsing dot */}
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-80" />
        <span className="relative inline-flex size-2.5 rounded-full bg-white" />
      </span>

      <WhatsAppIcon className="size-5 transition-transform duration-300 group-hover:scale-110" />
      
      <span className="font-semibold tracking-wide">WhatsApp Chat</span>
    </motion.a>
  );
}

export default WhatsAppButton;
