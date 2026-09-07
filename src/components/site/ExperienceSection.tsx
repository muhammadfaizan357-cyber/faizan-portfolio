import { experience, education, achievements, profile, aboutStats } from "@/data/portfolio";
import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, Trophy, Code2, Globe, ExternalLink } from "lucide-react";
import { useRevealSection } from "@/hooks/useReveal";

export function ExperienceSection() {
  const sectionRef = useRevealSection();
  return (
    <section id="about" ref={sectionRef as React.RefObject<HTMLElement>} className="py-14 sm:py-20 border-t border-border/40 relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[400px] bg-primary/5 blur-[150px] rounded-full" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16 relative">
        {/* Section Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-4 shadow-sm">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Background & Credentials
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-foreground leading-[0.9]">
              Experience<br />& Education
            </h2>
          </div>
          <p className="max-w-sm text-sm sm:text-base text-muted-foreground leading-relaxed sm:text-right">
            Full-stack engineering journey, academic milestones at Aptech, and proven competition achievements.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Profile Card + Achievements */}
          <div className="lg:col-span-5 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group rounded-[2.5rem] border border-border/70 bg-surface/40 p-6 sm:p-8 backdrop-blur-xl space-y-6 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Video / Portrait */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-muted border border-border/50 shadow-inner">
                <video
                  src="https://framerusercontent.com/assets/oTOIH1FK4PBfTPisuj5hfDQldE.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <img
                  src={profile.portrait || profile.avatar}
                  alt={profile.name}
                  className="size-full object-cover absolute inset-0 opacity-0 pointer-events-none"
                  onError={(e) => {
                    (e.target as HTMLElement).style.opacity = "1";
                  }}
                />
                {/* Available badge */}
                <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-background/90 px-3.5 py-1.5 text-xs font-bold backdrop-blur-md border border-emerald-500/30 text-emerald-400 shadow-lg">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  Available for Hire
                </div>
                {/* Bottom overlay gradient */}
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-background/60 to-transparent" />
              </div>

              {/* Name & Role */}
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
                  {profile.name}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-primary uppercase tracking-widest mt-1">
                  {profile.role}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2.5">
                  <MapPin className="size-3.5 text-primary" />
                  <span>{profile.location}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-5">
                {profile.bio}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                {aboutStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3 rounded-2xl bg-background/60 border border-border/50 text-center group/stat hover:border-primary/40 hover:bg-surface/60 transition-all duration-300"
                  >
                    <div className="font-display text-xl sm:text-2xl font-black text-foreground">
                      {stat.value}
                      <span className="text-primary">{stat.suffix}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider font-semibold leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Languages & Core Focus */}
              <div className="border-t border-border/40 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Globe className="size-3.5 text-primary" />
                  <span>English, Urdu, Sindhi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Code2 className="size-3.5 text-primary" />
                  <span>Laravel & MySQL Specialist</span>
                </div>
              </div>
            </motion.div>

            {/* Achievements Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-[2.5rem] border border-border/70 bg-surface/40 p-6 sm:p-8 backdrop-blur-xl space-y-5 hover:border-primary/40 transition-all duration-500"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/20 text-amber-400">
                  <Trophy className="size-5" />
                </div>
                <h4 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
                  Key Achievements
                </h4>
              </div>

              <div className="space-y-3">
                {achievements.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group/ach p-4 rounded-2xl bg-background/60 border border-border/50 space-y-1 hover:border-primary/40 hover:bg-surface/60 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Work Experience & Education Timelines */}
          <div className="lg:col-span-7 space-y-7">
            {/* Work Experience */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                  <Briefcase className="size-5" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
                  Work Experience
                </h3>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent hidden sm:block" />

                <div className="space-y-4">
                  {experience.map((item, index) => (
                    <motion.div
                      key={item.title + item.company}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: index * 0.12 }}
                      className="group relative sm:pl-14"
                    >
                      {/* Timeline dot */}
                      <div className="hidden sm:flex absolute left-[14px] top-7 size-3 rounded-full bg-primary border-2 border-background group-hover:scale-150 transition-transform duration-300 shadow-md shadow-primary/40" />

                      <div className="rounded-3xl border border-border/70 bg-surface/40 p-5 sm:p-7 backdrop-blur-xl transition-all duration-400 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:bg-surface/60">
                        {/* Header row */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                          <div>
                            <h4 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                              {item.title}
                            </h4>
                            <div className="text-xs sm:text-sm font-semibold text-primary/90 mt-0.5">
                              {item.company}
                            </div>
                          </div>
                          <span className="inline-flex items-center self-start rounded-full border border-border/80 bg-background/80 px-3 py-1 text-[11px] font-mono font-medium text-muted-foreground shrink-0">
                            {item.year}
                          </span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                          <MapPin className="size-3 text-primary/70" />
                          <span>{item.location}</span>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <GraduationCap className="size-5" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
                  Education
                </h3>
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/60 via-emerald-500/20 to-transparent hidden sm:block" />

                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.degree}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: index * 0.12 }}
                      className="group relative sm:pl-14"
                    >
                      {/* Timeline dot */}
                      <div className="hidden sm:flex absolute left-[14px] top-7 size-3 rounded-full bg-emerald-500 border-2 border-background group-hover:scale-150 transition-transform duration-300 shadow-md shadow-emerald-500/40" />

                      <div className="rounded-3xl border border-border/70 bg-surface/40 p-5 sm:p-7 backdrop-blur-xl transition-all duration-400 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5 hover:bg-surface/60">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                          <div>
                            <h4 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-foreground">
                              {edu.degree}
                            </h4>
                            <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">
                              {edu.institution}
                            </div>
                          </div>
                          <span className="inline-flex items-center self-start rounded-full border border-border/80 bg-background/80 px-3 py-1 text-[11px] font-mono font-medium text-muted-foreground shrink-0">
                            {edu.year}
                          </span>
                        </div>

                        <div className="text-[11px] font-bold text-emerald-400 mb-2.5 flex items-center gap-1.5">
                          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {edu.status}
                        </div>

                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
