import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowUpRight, Copy, Check, Send, MapPin, Clock, MessageCircle, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";
import { Frame } from "@/components/site/Frame";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${profile.name}` },
      {
        name: "description",
        content: `Get in touch with ${profile.name} for Laravel, Full-Stack Web Development, and E-Commerce projects.`,
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="pt-24 pb-14 sm:pt-32 sm:pb-20">
      <Frame>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md mb-4 shadow-sm"
          >
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-foreground">Available For Projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-foreground"
          >
            Let's Work Together
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Have a Laravel project in mind, need database or REST API development, or want to discuss an e-commerce build? I will respond promptly.
          </motion.p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="rounded-[2.5rem] border border-border/70 bg-surface/40 p-6 sm:p-8 backdrop-blur-xl space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                  Direct Contact
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                  Feel free to email directly, call during business hours (PKT), or reach out on WhatsApp.
                </p>
              </div>

              {/* Email Pill */}
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Email (Click to copy)
                </p>
                <button
                  onClick={copyEmail}
                  className="w-full flex items-center justify-between gap-3 rounded-2xl border border-border/80 bg-background/80 p-4 transition-all duration-300 hover:border-primary/60 hover:bg-background group cursor-pointer"
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
              </div>

              {/* Phone & WhatsApp */}
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Call / WhatsApp
                </p>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border/80 bg-background/80 p-4 transition-all duration-300 hover:border-emerald-500/60 hover:bg-background group text-foreground"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                      <Phone className="size-4" />
                    </span>
                    <div>
                      <span className="text-xs sm:text-sm font-semibold font-mono block">{profile.phone}</span>
                      <span className="text-[10px] text-emerald-400 font-medium">Available on WhatsApp & Call</span>
                    </div>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-emerald-400 transition-colors" />
                </a>
              </div>

              {/* Location & Timezone */}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/50 p-4 text-foreground text-xs sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <MapPin className="size-4 text-primary shrink-0" />
                  <span className="font-semibold">{profile.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Clock className="size-3.5 text-primary" />
                  <span>PKT (UTC+5)</span>
                </div>
              </div>

              {/* Socials & Repositories */}
              <div className="pt-2 border-t border-border/40">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Profiles & Repositories
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:scale-105"
                  >
                    <Github className="size-3.5" />
                    <span>GitHub</span>
                    <ArrowUpRight className="size-3" />
                  </a>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:scale-105"
                  >
                    <Linkedin className="size-3.5" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="size-3" />
                  </a>

                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 transition-all duration-200 hover:bg-emerald-500/20 hover:scale-105"
                  >
                    <MessageCircle className="size-3.5" />
                    <span>WhatsApp Chat</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
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
                Send a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Your Name
                  </label>
                  <Input name="name" required placeholder="John Doe" className="h-12 rounded-2xl border-border/70 bg-background/80" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Email Address
                  </label>
                  <Input name="email" type="email" required placeholder="john@company.com" className="h-12 rounded-2xl border-border/70 bg-background/80" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Project Type / Requirements
                </label>
                <Input name="subject" placeholder="Laravel Web App / E-Commerce Platform / API Integration" className="h-12 rounded-2xl border-border/70 bg-background/80" />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Message Details
                </label>
                <Textarea name="message" required rows={5} placeholder="Tell me about your project goals, scope, and timeline…" className="rounded-2xl border-border/70 bg-background/80 resize-none" />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-foreground py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-background transition-all duration-300 hover:opacity-90 active:scale-[0.99] mt-2 cursor-pointer"
              >
                {sent ? (
                  <>
                    <Check className="size-4 text-emerald-400" />
                    <span>Message Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </Frame>
    </div>
  );
}
