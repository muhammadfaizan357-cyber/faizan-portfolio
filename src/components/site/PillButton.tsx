import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

const base =
  "group inline-flex items-center gap-3 rounded-full px-6 py-3 font-display text-sm tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5";

const styles = {
  primary: "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]",
  dark: "bg-secondary text-secondary-foreground shadow-[var(--shadow-ink)]",
  ghost: "border border-hairline bg-surface text-foreground",
} as const;

type Variant = keyof typeof styles;

function Dot({ variant }: { variant: Variant }) {
  return (
    <span
      className={cn(
        "size-2 rounded-full transition-transform duration-300 group-hover:scale-150",
        variant === "dark" ? "bg-primary" : "bg-foreground/70",
      )}
    />
  );
}

export function PillLink({
  children,
  variant = "primary",
  className,
  ...rest
}: { variant?: Variant; children: ReactNode } & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, styles[variant], className)} {...rest}>
      {children}
      <Dot variant={variant} />
    </Link>
  );
}


export function PillAnchor({
  children,
  variant = "primary",
  className,
  ...rest
}: { variant?: Variant; children: ReactNode } & ComponentProps<"a">) {
  return (
    <a className={cn(base, styles[variant], className)} {...rest}>
      {children}
      <Dot variant={variant} />
    </a>
  );
}

export function PillButton({
  children,
  variant = "primary",
  className,
  ...rest
}: { variant?: Variant; children: ReactNode } & ComponentProps<"button">) {
  return (
    <button className={cn(base, styles[variant], className)} {...rest}>
      {children}
      <Dot variant={variant} />
    </button>
  );
}
