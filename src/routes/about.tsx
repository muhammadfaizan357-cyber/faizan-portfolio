import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, GraduationCap, Trophy, Briefcase, Globe, Code2, Sparkles, Terminal } from "lucide-react";
import { profile, aboutStats, experience, education, achievements } from "@/data/portfolio";
import { Frame } from "@/components/site/Frame";
import { StackSection } from "@/components/site/StackSection";
import { HoverAnimatedText, HoverParagraph } from "@/components/site/HoverAnimatedText";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${profile.name} | ${profile.role}` },
      {
        name: "description",
        content: `Learn more about ${profile.name}, a Full-Stack Web & E-Commerce Developer based in ${profile.location}.`,
      },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    title: "Clean MVC Architecture",
    description: "Writing maintainable, modular Laravel code with strict separation of concerns, service layers, and reusable traits.",
  },
  {
    title: "Performance & Scalability",
    description: "Database indexing, optimized Eloquent queries, caching, and lightweight asset bundles that load in milliseconds.",
  },
  {
    title: "High-Converting UI/UX",
    description: "Responsive, mobile-first design systems with intuitive checkout funnels, cart state, and frictionless user flows.",
  },
  {
    title: "Secure & Tested Endpoints",
    description: "Role-based authentication, CSRF/XSS protection, rate limiting, and documented RESTful JSON APIs.",
  },
];

function AboutPage() {
  return (
    <div className="pt-24 pb-14 sm:pt-32 sm:pb-20">
      {/* Header Banner with Interactive Hover Animation */}
      <Frame>
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md mb-5 shadow-sm"
          >
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-foreground">About Muhammad Faizan</span>
          </motion.div>

          {/* Interactive Character-by-Character Hover Physics Title */}
          <div className="my-3">
            <HoverAnimatedText
              text="Full-Stack Engineer & Builder"
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-foreground justify-center text-center"
            />
          </div>

          <div className="mt-6 max-w-2xl mx-auto">
            <HoverParagraph
              text="Based in Karachi, Pakistan, I specialize in architecting scalable Laravel web applications, secure REST APIs, and high-converting e-commerce platforms."
              className="text-base sm:text-lg justify-center text-center"
            />
          </div>
        </div>
      </Frame>

      {/* Interactive Hover Manifesto Card */}
      <Frame className="mt-12">
        <div className="rounded-[2.5rem] border border-border/80 bg-gradient-to-b from-surface/60 to-surface/20 p-8 sm:p-12 backdrop-blur-xl shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <Terminal className="size-5" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Engineering Ethos (Hover on each line)
            </span>
          </div>

          <div className="space-y-4">
            <div className="text-2xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-foreground leading-[1.15]">
              <HoverAnimatedText text="Architecting clean backends with Laravel." />
            </div>
            <div className="text-2xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-foreground leading-[1.15]">
              <HoverAnimatedText text="Designing fast, responsive user interfaces." />
            </div>
            <div className="text-2xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-foreground leading-[1.15]">
              <HoverAnimatedText text="Engineering secure APIs and databases." />
            </div>
            <div className="text-2xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-foreground leading-[1.15]">
              <HoverAnimatedText text="Delivering scalable web solutions for clients." />
            </div>
          </div>
        </div>
      </Frame>

      {/* Profile Bio & Key Stats */}
      <Frame className="mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Portrait & Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 rounded-[2.5rem] border border-border/70 bg-surface/40 p-6 sm:p-8 backdrop-blur-xl space-y-5"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-muted border border-border/50 shadow-inner">
              <video
                src="https://framerusercontent.com/assets/oTOIH1FK4PBfTPisuj5hfDQldE.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="size-full object-cover"
              />
              <img
                src={profile.portrait || profile.avatar}
                alt={profile.name}
                className="size-full object-cover absolute inset-0 opacity-0 pointer-events-none"
                onError={(e) => {
                  (e.target as HTMLElement).style.opacity = "1";
                }}
              />
              <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-md border border-border/40 text-emerald-500">
                <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                Available for Projects
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
                {profile.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mt-1">
                {profile.role}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <MapPin className="size-3.5 text-primary" />
                <span>{profile.location}</span>
              </div>
            </div>

            <HoverParagraph text={profile.bio} className="text-xs sm:text-sm" />

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/40 text-center">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="p-2.5 rounded-2xl bg-background/50 border border-border/40">
                  <div className="font-display text-xl sm:text-2xl font-black text-foreground">
                    {stat.value}
                    <span className="text-primary">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border/40 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Globe className="size-3.5 text-primary" />
                <span>Languages: English, Urdu, Sindhi</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="size-3.5 text-primary" />
                <span>Specialization: PHP, Laravel, MySQL, REST APIs</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Principles, Experience, Education & Achievements */}
          <div className="lg:col-span-7 space-y-8">
            {/* Core Development Principles */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground font-display text-xl sm:text-2xl font-bold uppercase tracking-tight">
                <Sparkles className="size-5 text-primary" />
                <span>Core Engineering Standards</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {principles.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="p-5 rounded-3xl bg-surface/40 border border-border/70 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:bg-surface/70 space-y-1.5"
                  >
                    <h5 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary" />
                      {item.title}
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-foreground font-display text-xl sm:text-2xl font-bold uppercase tracking-tight">
                <Briefcase className="size-5 text-primary" />
                <span>Work Experience</span>
              </div>

              {experience.map((item, index) => (
                <motion.div
                  key={item.title + item.company}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative rounded-3xl border border-border/70 bg-surface/40 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground mt-1">
                        <span className="text-primary font-semibold">{item.company}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <span className="self-start sm:self-center inline-flex rounded-full border border-border/60 bg-background/80 px-3.5 py-1 text-xs font-mono font-medium text-muted-foreground">
                      {item.year}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-4">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Academic Education */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-foreground font-display text-xl sm:text-2xl font-bold uppercase tracking-tight">
                <GraduationCap className="size-5 text-primary" />
                <span>Academic Education</span>
              </div>

              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-3xl border border-border/70 bg-surface/40 p-6 sm:p-7 backdrop-blur-xl space-y-2 transition-all duration-300 hover:border-primary/40"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground">
                        {edu.degree}
                      </h4>
                      <div className="text-xs sm:text-sm font-semibold text-primary">
                        {edu.institution}
                      </div>
                    </div>
                    <span className="inline-flex items-center self-start sm:self-auto rounded-full border border-border/80 bg-background/80 px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                      {edu.year}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-emerald-400">
                    {edu.status}
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-foreground font-display text-xl sm:text-2xl font-bold uppercase tracking-tight">
                <Trophy className="size-5 text-primary" />
                <span>Honors & Competitions</span>
              </div>

              <div className="space-y-3.5">
                {achievements.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-3xl bg-surface/40 border border-border/70 backdrop-blur-xl space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-foreground">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Frame>

      {/* Tools & Stack */}
      <StackSection />

      {/* CTA Bottom Banner */}
      <Frame className="mt-14">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0c0c0e] dark:bg-[#121214] px-6 py-16 text-center text-white sm:px-12 sm:py-20 shadow-2xl border border-white/10">
          <video
            src="https://framerusercontent.com/assets/YPFx7qAc2UGdUn03CPT6hmYY.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 size-full object-cover opacity-35 pointer-events-none"
          />
          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              Want to collaborate?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base text-white/80">
              Have a web application, API, or e-commerce store to build? Let's discuss your roadmap.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-2xl hover:scale-105 transition-transform"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );
}
