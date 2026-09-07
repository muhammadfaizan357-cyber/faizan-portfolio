import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PlusMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-20 flex size-4 items-center justify-center text-muted-foreground/70",
        className,
      )}
    >
      <svg viewBox="0 0 16 16" className="size-full">
        <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    </span>
  );
}

/**
 * The framed content column used across the whole site: thin hairlines on the
 * left and right edges with small plus marks at the top and bottom corners.
 */
export function Frame({
  children,
  id,
  className,
  marks = true,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  marks?: boolean;
}) {
  return (
    <section id={id} className="relative border-b border-hairline">
      <div className="mx-auto max-w-[1400px] px-0">
        <div
          className={cn(
            "relative border-hairline px-5 py-20 sm:border-x sm:px-10 lg:px-16",
            className,
          )}
        >
          {marks ? (
            <>
              <PlusMark className="-top-2 -left-2" />
              <PlusMark className="-top-2 -right-2" />
              <PlusMark className="-bottom-2 -left-2" />
              <PlusMark className="-bottom-2 -right-2" />
            </>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
