import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/data/portfolio";
import { ServicesSection } from "@/components/site/ServicesSection";
import { ProcessSection } from "@/components/site/ProcessSection";
import { FaqSection } from "@/components/site/FaqSection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Services & Capabilities — ${profile.name}` },
      {
        name: "description",
        content: `Enterprise .NET & Angular, PHP/Laravel, and E-Commerce development services by ${profile.name}.`,
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080c14] text-neutral-900 dark:text-white pt-24 sm:pt-28 md:pt-32 transition-colors duration-300">
      <div className="mx-auto max-w-[1340px] px-5 sm:px-8 lg:px-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/[0.04] hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white/85 transition-all shadow-xs"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Home Portfolio</span>
        </Link>
      </div>
      <ServicesSection />
      <ProcessSection />
      <FaqSection />
    </div>
  );
}
