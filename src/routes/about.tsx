import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/data/portfolio";
import { AboutSection } from "@/components/site/AboutSection";
import { SkillsSection } from "@/components/site/SkillsSection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${profile.name} | ${profile.role}` },
      {
        name: "description",
        content: `Learn more about ${profile.name}, a Full-Stack .NET, Angular & Laravel Developer based in ${profile.location}.`,
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080c14] text-neutral-900 dark:text-white pt-24 sm:pt-28 md:pt-32 transition-colors duration-300">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-14">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/[0.04] hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white/85 transition-all shadow-xs"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Home Portfolio</span>
        </Link>
      </div>
      <AboutSection />
      <SkillsSection />
    </div>
  );
}
