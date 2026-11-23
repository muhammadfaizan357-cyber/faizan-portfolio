import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Home, FolderOpen } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { FloatingSocialDock } from "@/components/site/FloatingSocialDock";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { ScrollProgressBar } from "@/components/site/ScrollReveal";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080c14] text-white px-6 py-24">
      <div className="max-w-lg text-center rounded-3xl border border-blue-500/30 bg-[#0e1422]/90 p-8 sm:p-12 backdrop-blur-xl shadow-2xl space-y-5">
        <span className="inline-block rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-400">
          Error 404
        </span>
        <h1 className="font-display text-6xl sm:text-7xl font-black tracking-tight text-white">
          404
        </h1>
        <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-blue-400">
          Page Not Found
        </h2>
        <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
          The page or case study you are looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg hover:scale-105 transition-transform"
          >
            <Home className="size-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] hover:border-blue-500/60 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all"
          >
            <FolderOpen className="size-4 text-blue-400" />
            <span>View Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  const err = error instanceof Error ? error : new Error(String(error));
  console.error(err);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(err, { boundary: "tanstack_root_error_component" });
  }, [err]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn&apos;t load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Muhammad Faizan" },
      { name: "theme-color", content: "#0b0d12" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Muhammad Faizan — Full-Stack Portfolio" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Host+Grotesk:wght@400;500;600;700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg?v=2" },
      { rel: "shortcut icon", href: "/favicon.svg?v=2" },
      { rel: "apple-touch-icon", href: "/favicon.svg?v=2" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <ScrollProgressBar />
      <SiteHeader />
      <FloatingSocialDock />
      <div className="flex min-h-screen flex-col font-sans">
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <ScrollToTop />
      <Toaster />
    </QueryClientProvider>
  );
}
