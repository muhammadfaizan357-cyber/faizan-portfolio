import type { ReactNode } from "react";

export function SectionLabel({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6">
      <h2 className="display-xl text-5xl sm:text-6xl md:text-8xl">{title}</h2>
      {action}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-xs tracking-[0.3em] text-muted-foreground uppercase">
      {children}
    </p>
  );
}
