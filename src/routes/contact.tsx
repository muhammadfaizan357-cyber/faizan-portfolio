import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  Phone,
  ArrowUpRight,
  ArrowLeft,
  Copy,
  Check,
  Send,
  MapPin,
  Github,
  Linkedin,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";
import {
  WhatsAppIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/site/BrandIcons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${profile.name}` },
      {
        name: "description",
        content: `Get in touch with ${profile.name} for C# / ASP.NET Core, Angular, PHP, Laravel, and E-Commerce projects.`,
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState("");

  const quickTags = [
    "C# / ASP.NET Core & Angular App",
    "PHP & Laravel Platform",
    "Custom E-Commerce / Shopify",
    "RESTful API & Database Tuning",
  ];

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080c14] text-neutral-900 dark:text-white pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-28 relative overflow-hidden transition-colors duration-300">
      <div className="relative z-10 mx-auto max-w-[1340px] px-5 sm:px-8 lg:px-12">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/[0.04] hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white/85 transition-all shadow-xs"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Home Portfolio</span>
          </Link>
        </div>

        <div className="mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/35 dark:border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            <Mail className="size-3.5 text-blue-600 dark:text-blue-400" />
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
            LET&apos;S WORK <span className="text-blue-600 dark:text-blue-400">TOGETHER</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#0c101a]/95 p-6 sm:p-8 backdrop-blur-xl shadow-[0_12px_35px_-12px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_55px_rgba(0,0,0,0.6)] space-y-5">
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-wide text-neutral-900 dark:text-white">
                Direct Contact Channels
              </h3>

              <button
                type="button"
                onClick={copyEmail}
                className="w-full flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-white/[0.03] hover:border-blue-500/60 p-4 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/35">
                    <Mail className="size-5" />
                  </span>
                  <div className="text-left min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Official Email (Click to Copy)
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white truncate block">
                      {profile.email}
                    </span>
                  </div>
                </div>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-neutral-300 dark:border-white/15 bg-white dark:bg-black/30 text-neutral-700 dark:text-white/75 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </span>
              </button>

              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-white/[0.03] hover:border-emerald-500/60 p-4 transition-all text-neutral-900 dark:text-white group"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-[#25D366] dark:text-emerald-400 border border-emerald-500/30">
                    <WhatsAppIcon className="size-5" />
                  </span>
                  <div>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">
                      WhatsApp / Direct Chat
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-white block">
                      {profile.formattedPhone}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-neutral-500 dark:text-white/60 group-hover:text-emerald-500" />
              </a>

              <div className="flex items-center gap-3.5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-white/[0.03] p-4 text-neutral-900 dark:text-white">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/35">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-white/50 block">
                    Location
                  </span>
                  <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                    {profile.location}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200/80 dark:border-white/10 flex flex-wrap gap-2.5">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-500/10 hover:bg-[#0A66C2] hover:text-white px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 transition-all"
                >
                  <LinkedInIcon className="size-4" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="size-3.5" />
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/[0.04] hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white transition-all"
                >
                  <GitHubIcon className="size-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="size-3.5" />
                </a>

                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-[#25D366] hover:text-white px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 transition-all"
                >
                  <WhatsAppIcon className="size-4" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="size-3.5" />
                </a>

                <a
                  href="/Muhammad-Faizan-CV.pdf"
                  download="Muhammad-Faizan-CV.pdf"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/[0.04] hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white transition-all"
                >
                  <Download className="size-4 text-blue-600 dark:text-blue-400" />
                  <span>CV PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formEl = e.currentTarget;
                const fd = new FormData(formEl);
                const name = String(fd.get("name") || "").trim();
                const email = String(fd.get("email") || "").trim();
                const message = String(fd.get("message") || "").trim();
                if (!name || !email || !message) {
                  toast.error("Please fill in your name, email and message.");
                  return;
                }
                const subj = subject.trim() || `Portfolio Inquiry from ${name}`;
                try {
                  const res = await fetch(
                    `https://formsubmit.co/ajax/${profile.email}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      body: JSON.stringify({
                        name,
                        email,
                        _subject: subj,
                        message,
                      }),
                    }
                  );
                  if (res.ok) {
                    setSent(true);
                    formEl.reset();
                    setSubject("");
                    toast.success("Thank you! Your message has been sent directly.");
                    setTimeout(() => setSent(false), 5000);
                  } else {
                    throw new Error("Fallback");
                  }
                } catch {
                  const body = `${message}\n\n— ${name} (${email})`;
                  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
                    subj
                  )}&body=${encodeURIComponent(body)}`;
                  setSent(true);
                  toast.success("Opening your email app with the message ready.");
                }
              }}
              className="rounded-3xl border border-blue-500/30 dark:border-blue-500/25 bg-white dark:bg-[#0c101a]/95 p-6 sm:p-8 backdrop-blur-xl shadow-[0_12px_35px_-12px_rgba(37,99,235,0.12)] dark:shadow-[0_20px_55px_rgba(0,0,0,0.6)] space-y-5"
            >
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-wide text-neutral-900 dark:text-white">
                Send a Direct Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-white/75 block">
                    Your Name
                  </label>
                  <Input
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="h-12 rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-50 dark:bg-black/35 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/40 focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black/40 px-4 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-white/75 block">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="h-12 rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-50 dark:bg-black/35 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/40 focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black/40 px-4 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-white/75 block">
                  Project Type
                </label>
                <Input
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder=".NET & Angular App / Laravel Platform / E-Commerce"
                  className="h-12 rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-50 dark:bg-black/35 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/40 focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black/40 px-4 transition-all"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {quickTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSubject(tag)}
                      className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                        subject === tag
                          ? "bg-blue-600 text-white font-extrabold shadow-xs"
                          : "border border-neutral-200 dark:border-white/12 bg-neutral-100 dark:bg-white/[0.04] text-neutral-700 dark:text-white/70 hover:border-blue-500 hover:text-blue-600 dark:hover:text-white"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-white/75 block">
                  Message Details
                </label>
                <Textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project goals, timeline, and requirements…"
                  className="rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-50 dark:bg-black/35 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/40 focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black/40 p-4 resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 rounded-full py-4 text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] text-white transition-all duration-300 cursor-pointer select-none
                  bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600
                  hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500
                  border border-blue-400/40
                  shadow-[0_4px_16px_rgba(37,99,235,0.4),0_10px_28px_rgba(79,70,229,0.3),inset_0_1px_1.5px_rgba(255,255,255,0.4)]
                  hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.99]"
              >
                {sent ? (
                  <>
                    <Check className="size-4 stroke-[2.5]" />
                    <span>Message Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="size-4 stroke-[2.3]" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
