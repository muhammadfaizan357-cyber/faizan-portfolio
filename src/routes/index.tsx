import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  MapPin,
  Github,
  Linkedin,
  Sparkles,
  Layers,
  Code2,
  Database,
  Server,
  Zap,
  CheckCircle2,
  MessageCircle,
  Terminal,
} from "lucide-react";
import { toast } from "sonner";

import { SkillsBalloonChamber } from "@/components/site/SkillsBalloonChamber";
import TextType from "@/components/ui/TextType";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { FaqSection } from "@/components/site/FaqSection";
import { FeaturedProjectsSlider } from "@/components/site/FeaturedProjectsSlider";
import { ParticleHero } from "@/components/site/ParticleHero";
import { Magnet } from "@/components/site/Magnet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { heroStats, profile } from "@/data/portfolio";
import avatarImg from "@/assets/avatar.png";

const title = `${profile.name} — ${profile.role} (PHP & Laravel)`;
const description = `${profile.name} is a Full-Stack Web & E-Commerce Developer based in ${profile.location}. Specializing in Laravel, PHP, MySQL, REST APIs, and high-performance web applications.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

// ─── CYCLING WORDS ───────────────────────────────────────────────────────────
const cyclingWords = [
  "Developer",
  "Laravel Dev",
  "Web Architect",
  "Backend Dev",
];

function CyclingWord() {
  const [index, setIndex] = useState(0);
  const [animClass, setAnimClass] = useState("word-enter");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimClass("word-exit");
      setTimeout(() => {
        setIndex((i) => (i + 1) % cyclingWords.length);
        setAnimClass("word-enter");
      }, 350);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="relative inline-block overflow-hidden text-primary"
      style={{ minWidth: "13ch" }}
    >
      <span key={index} className={animClass}>
        {cyclingWords[index]}
      </span>
    </span>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setEmailCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setEmailCopied(false), 2500);
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-16 lg:py-0"
    >
      {/* Dynamic Ambient Glow Backdrops */}
      <div className="hero-glow absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 size-[500px] lg:size-[700px] rounded-full bg-primary/20 blur-[140px] pointer-events-none" />
      <div
        className="hero-glow absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 size-[400px] lg:size-[600px] rounded-full bg-emerald-500/15 blur-[130px] pointer-events-none"
        style={{ animationDelay: "2.5s" }}
      />

      {/* Grid Pattern subtle overlay for high-tech aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(8,185,212,0.15)_1px,transparent_1px)] [background-size:32px_32px] opacity-40 dark:opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[80vh] py-12 lg:py-0">

          {/* ── Left Column: Clean, Uncluttered, High-Impact Content (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 text-left">
            
            {/* Status Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-md mb-6 shadow-sm"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for Projects</span>
              <span className="text-emerald-500/50">•</span>
              <span className="text-muted-foreground font-medium">{profile.location}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-sm sm:text-base font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                <span className="h-px w-6 bg-primary" />
                Hi, I'm <span className="text-foreground font-bold">{profile.name}</span>
              </p>
              <h1 className="font-display font-black uppercase tracking-tight text-foreground text-6xl sm:text-7xl lg:text-[84px] xl:text-[96px] leading-[0.88] mb-6">
                Full Stack <br />
                <TextType
                  text={["Developer", "Laravel Pro", "Web Architect", "Backend Dev"]}
                  typingSpeed={70}
                  deletingSpeed={35}
                  pauseDuration={1800}
                  showCursor={true}
                  cursorCharacter="|"
                  cursorClassName="text-primary font-normal animate-pulse ml-1"
                  className="text-primary inline-block"
                />
              </h1>
            </motion.div>

            {/* Concise Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed mb-9 font-normal"
            >
              I architect high-performance <strong className="text-foreground font-semibold">Laravel & PHP</strong> backends, optimized <strong className="text-foreground font-semibold">MySQL</strong> databases, and modern <strong className="text-foreground font-semibold">React</strong> interfaces for scalable web products.
            </motion.p>

            {/* Two High-Converting, Highly Animated Magnetic Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              {/* Primary Button with Animated Shimmer Light Sweep & Glow */}
              <Magnet strength={5} padding={80}>
                <Link
                  to="/projects"
                  className="relative group inline-flex items-center justify-center gap-3 rounded-full bg-foreground px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-background overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] dark:shadow-[0_10px_30px_-10px_rgba(8,185,212,0.4)]"
                >
                  {/* Shimmer Light Reflection Sweep on Hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />
                  
                  <Layers className="size-4 text-primary transition-transform duration-300 group-hover:rotate-12" />
                  <span>Explore Projects</span>
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                </Link>
              </Magnet>

              {/* Secondary Button with Glassmorphic Border Glow */}
              <Magnet strength={5} padding={80}>
                <Link
                  to="/contact"
                  className="relative group inline-flex items-center justify-center gap-2.5 rounded-full border border-border/80 bg-surface/70 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground backdrop-blur-xl transition-all duration-300 hover:border-primary hover:bg-surface hover:scale-105 hover:shadow-[0_0_25px_rgba(8,185,212,0.3)] active:scale-95"
                >
                  <Sparkles className="size-4 text-primary transition-transform duration-300 group-hover:rotate-45 group-hover:scale-125" />
                  <span>Let's Talk</span>
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Magnet>
            </motion.div>

            {/* Clean Social Proof & Quick Connect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center justify-between gap-6 pt-7 border-t border-border/60 max-w-lg"
            >
              {/* Stats */}
              <div className="flex items-center gap-6">
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-black text-foreground tabular-nums leading-none">
                    15<span className="text-primary">+</span>
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                    Projects Done
                  </div>
                </div>

                <div className="h-7 w-px bg-border/60" />

                <div>
                  <div className="font-display text-2xl sm:text-3xl font-black text-foreground tabular-nums leading-none">
                    100<span className="text-primary">%</span>
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                    Client Satisfaction
                  </div>
                </div>
              </div>

              {/* Social Quick Links */}
              <div className="flex items-center gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub Profile"
                  className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-surface/50 text-muted-foreground hover:text-foreground hover:border-primary hover:scale-110 transition-all duration-300"
                >
                  <Github className="size-4" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn Profile"
                  className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-surface/50 text-muted-foreground hover:text-foreground hover:border-primary hover:scale-110 transition-all duration-300"
                >
                  <Linkedin className="size-4" />
                </a>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  title="WhatsApp Chat"
                  className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-surface/50 text-muted-foreground hover:text-emerald-400 hover:border-emerald-500 hover:scale-110 transition-all duration-300"
                >
                  <MessageCircle className="size-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Interactive Particle Canvas (5 cols) ── */}
          <div className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[480px] flex items-center justify-center">
              
              {/* Floating Badge 1: Role & Tech (Top-Right) */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="absolute -top-3 right-1 sm:right-4 z-20 pointer-events-none"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center gap-3 rounded-2xl border border-border/80 bg-background/85 px-4 py-2.5 shadow-xl backdrop-blur-xl"
                >
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
                    <Terminal className="size-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                      Full-Stack Dev
                    </div>
                    <div className="text-[10px] font-medium text-muted-foreground">
                      Laravel • PHP • React
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* The Interactive Particle Canvas Component */}
              <ParticleHero
                src={avatarImg}
                width={460}
                height={580}
                className="w-full"
              />

              {/* Floating Badge 2: Stats & Quality (Bottom-Left) */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 15 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="absolute bottom-12 -left-1 sm:-left-4 z-20 pointer-events-none"
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="flex items-center gap-3 rounded-2xl border border-border/80 bg-background/85 px-4 py-3 shadow-2xl backdrop-blur-xl"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
                    <Sparkles className="size-5" />
                  </div>
                  <div>
                    <div className="font-display text-lg font-black text-foreground tabular-nums leading-none">
                      15<span className="text-primary">+</span> Projects
                    </div>
                    <div className="text-[10px] font-semibold text-muted-foreground mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="size-3 text-emerald-500" />
                      100% Satisfaction
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Badge 3: Active Status (Bottom-Center) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
              >
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-background/90 px-3.5 py-1.5 text-[11px] font-bold text-emerald-400 backdrop-blur-md shadow-lg">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  <span>Available for Work</span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────
function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="pt-8 sm:pt-10 pb-12 sm:pb-16 border-t border-border/40">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              <span className="size-1.5 rounded-full bg-primary animate-ping" />
              Get In Touch
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-foreground">
              Let's Build Together
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
            Have a Laravel project, custom web application, or e-commerce requirement? Send a message or reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-[2.5rem] border border-border/70 bg-surface/40 p-6 sm:p-8 backdrop-blur-xl space-y-5">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                Contact Details
              </h3>

              {/* Email */}
              <button
                onClick={copyEmail}
                className="w-full flex items-center justify-between gap-3 rounded-2xl border border-border/80 bg-background/80 p-4 transition-all duration-300 hover:border-primary/60 group cursor-pointer"
              >
                <div className="flex items-center gap-3 truncate">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="size-4" />
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-foreground truncate font-mono">
                    {profile.email}
                  </span>
                </div>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                  {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                </span>
              </button>

              {/* Phone / WhatsApp */}
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/50 p-4 transition-all hover:border-emerald-500/60 text-foreground group"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Phone className="size-4" />
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold font-mono block">{profile.phone}</span>
                    <span className="text-[10px] text-emerald-400 font-medium">WhatsApp / Call</span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-emerald-400 transition-colors" />
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/50 p-4 text-foreground">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="size-4" />
                </span>
                <span className="text-sm font-semibold">{profile.location}</span>
              </div>

              {/* Socials */}
              <div className="pt-3 border-t border-border/40">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Profiles & Repositories
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href={profile.github} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:scale-105">
                    <Github className="size-3.5" /><span>GitHub</span><ArrowUpRight className="size-3" />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:scale-105">
                    <Linkedin className="size-3.5" /><span>LinkedIn</span><ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                if (!fd.get("name") || !fd.get("email") || !fd.get("message")) {
                  toast.error("Please fill in your name, email and message.");
                  return;
                }
                setSent(true);
                toast.success("Thank you! Your message has been sent.");
                e.currentTarget.reset();
              }}
              className="rounded-[2.5rem] border border-border/70 bg-surface/40 p-6 sm:p-10 backdrop-blur-xl space-y-4"
            >
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground mb-2">
                Send a Direct Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Your Name</label>
                  <Input name="name" required placeholder="John Doe" className="h-12 rounded-2xl border-border/70 bg-background/80" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Email Address</label>
                  <Input name="email" type="email" required placeholder="john@company.com" className="h-12 rounded-2xl border-border/70 bg-background/80" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Project Type / Service</label>
                <Input name="subject" placeholder="Laravel Web App / E-Commerce / API Integration" className="h-12 rounded-2xl border-border/70 bg-background/80" />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Message & Scope</label>
                <Textarea name="message" required rows={4} placeholder="Describe your project, timeline, and goals…" className="rounded-2xl border-border/70 bg-background/80 resize-none" />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-foreground py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-background transition-all duration-300 hover:opacity-90 active:scale-[0.99] mt-2 cursor-pointer"
              >
                {sent ? (
                  <><Check className="size-4 text-emerald-400" /><span>Message Sent!</span></>
                ) : (
                  <><Send className="size-4" /><span>Send Message</span></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
function Index() {
  return (
    <>
      {/* 1. Hero — split layout, 100vh */}
      <Hero />

      {/* 2. Featured Projects — tabbed showcase */}
      <FeaturedProjectsSlider />

      {/* 3. Interactive 3D Skills Balloon Pit with Spawning Hole */}
      <SkillsBalloonChamber />

      {/* 4. Testimonials */}
      <TestimonialsSection />

      {/* 9. FAQ */}
      <FaqSection />

      {/* 10. Contact */}
      <ContactSection />
    </>
  );
}
