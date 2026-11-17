import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Calculator,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Layers,
  ArrowRight,
  ShieldCheck,
  Server,
  Database,
  ShoppingCart,
  Gauge,
  Check,
} from "lucide-react";

interface ProjectType {
  id: string;
  name: string;
  baseWeeks: number;
  basePrice: string;
  icon: typeof Server;
  description: string;
}

interface Addon {
  id: string;
  name: string;
  extraWeeks: number;
  desc: string;
}

const PROJECT_TYPES: ProjectType[] = [
  {
    id: "laravel-app",
    name: "Custom Laravel Web App",
    baseWeeks: 3,
    basePrice: "$1,200 – $2,500",
    icon: Server,
    description: "Robust MVC architecture, tailored business workflows, clean OOP principles.",
  },
  {
    id: "rest-api",
    name: "Scalable RESTful API",
    baseWeeks: 2,
    basePrice: "$800 – $1,800",
    icon: Database,
    description: "Versioned JSON APIs, token/sanctum auth, rate limiting, documented endpoints.",
  },
  {
    id: "ecommerce",
    name: "Custom E-Commerce Store",
    baseWeeks: 3.5,
    basePrice: "$1,500 – $3,000",
    icon: ShoppingCart,
    description: "Custom cart, checkout, payment gateway integration, order tracking.",
  },
  {
    id: "optimization",
    name: "Database & Performance Tuning",
    baseWeeks: 1.5,
    basePrice: "$500 – $1,200",
    icon: Gauge,
    description: "Slow query profiling, index strategies, Redis caching, asset optimization.",
  },
];

const ADDONS: Addon[] = [
  {
    id: "rbac",
    name: "RBAC & Role Permissions",
    extraWeeks: 0.5,
    desc: "Granular user roles, permissions & security middleware",
  },
  {
    id: "payment",
    name: "Multi-Gateway Payments",
    extraWeeks: 0.5,
    desc: "Stripe, PayPal, webhook validation & invoice PDF generation",
  },
  {
    id: "websockets",
    name: "Real-Time WebSockets",
    extraWeeks: 0.5,
    desc: "Live notifications, push alerts & real-time chat/updates",
  },
  {
    id: "admin",
    name: "Custom Admin CMS Panel",
    extraWeeks: 1,
    desc: "Filament / custom CRUD data analytics & export dashboards",
  },
];

export function ScopeEstimator() {
  const [selectedType, setSelectedType] = useState<string>("laravel-app");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["rbac", "payment"]);
  const [urgency, setUrgency] = useState<"standard" | "rush">("standard");

  const currentType = (PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0])!;

  const totalWeeks = Math.ceil(
    (currentType.baseWeeks +
      selectedAddons.reduce((acc, id) => {
        const item = ADDONS.find((a) => a.id === id);
        return acc + (item ? item.extraWeeks : 0);
      }, 0)) *
      (urgency === "rush" ? 0.75 : 1)
  );

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scopeQuery = encodeURIComponent(
    `Hi Muhammad, I configured a scope for ${currentType.name} with: ${selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ")} (${urgency === "rush" ? "Rush Delivery" : "Standard Timeline"}). Estimated timeline: ~${totalWeeks} weeks.`
  );

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-gradient-to-b from-surface/80 via-surface/40 to-background/90 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl mt-16">
      {/* Background glowing orb */}
      <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-2 shadow-sm">
              <Calculator className="size-3.5" />
              <span>Interactive Project Calculator</span>
              <Sparkles className="size-3 text-primary animate-pulse" />
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-foreground">
              Scope & Timeline Estimator
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm">
            Select your architectural requirements to calculate a live estimated delivery timeline and investment range.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Config Options (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Project Type */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                1. Select Core Service Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/10 scale-[1.02]"
                          : "border-border/60 bg-surface/40 hover:border-border hover:bg-surface/80"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span
                          className={`flex size-7 items-center justify-center rounded-xl transition-colors ${
                            isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                          }`}
                        >
                          <Icon className="size-3.5" />
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-foreground">
                          {type.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                        {type.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Addon Capabilities */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                2. Select Key Modules & Features
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isChecked
                          ? "border-primary/60 bg-primary/5 text-foreground shadow-sm"
                          : "border-border/50 bg-surface/30 text-muted-foreground hover:border-border"
                      }`}
                    >
                      <span
                        className={`flex size-4.5 shrink-0 items-center justify-center rounded-md border mt-0.5 transition-colors ${
                          isChecked
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border/80 bg-background"
                        }`}
                      >
                        {isChecked && <Check className="size-3 stroke-[3]" />}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-foreground block">
                          {addon.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground block mt-0.5">
                          {addon.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Sprint Delivery Mode */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                3. Delivery Sprint Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setUrgency("standard")}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    urgency === "standard"
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-sm"
                      : "border-border/60 bg-surface/40 text-muted-foreground hover:border-border"
                  }`}
                >
                  <span className="text-xs block font-bold">Standard Sprint</span>
                  <span className="text-[10px] block opacity-80 mt-0.5">Thorough QA & Polish</span>
                </button>
                <button
                  onClick={() => setUrgency("rush")}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    urgency === "rush"
                      ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold shadow-sm"
                      : "border-border/60 bg-surface/40 text-muted-foreground hover:border-border"
                  }`}
                >
                  <span className="text-xs block font-bold flex items-center justify-center gap-1">
                    <Zap className="size-3" /> Accelerated Sprint
                  </span>
                  <span className="text-[10px] block opacity-80 mt-0.5">Dedicated Priority Window</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Live Scope Output Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl border border-primary/40 bg-slate-950/90 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl text-foreground">
              <div className="flex items-center justify-between pb-4 border-b border-border/40">
                <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-primary animate-ping" />
                  Live Estimated Scope
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {urgency === "rush" ? "Accelerated" : "Standard"}
                </span>
              </div>

              <div className="my-5 space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                    Selected Architecture
                  </span>
                  <h4 className="text-lg font-black uppercase tracking-tight text-white mt-0.5">
                    {currentType.name}
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-surface/40 border border-border/50">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block flex items-center gap-1">
                      <Clock className="size-3 text-cyan-400" /> Timeline
                    </span>
                    <span className="text-xl font-mono font-black text-white">
                      ~{totalWeeks} {totalWeeks === 1 ? "Week" : "Weeks"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block flex items-center gap-1">
                      <Layers className="size-3 text-emerald-400" /> Est. Range
                    </span>
                    <span className="text-base font-mono font-black text-emerald-400">
                      {currentType.basePrice}
                    </span>
                  </div>
                </div>

                {/* Included Deliverables */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-2">
                    Included with this scope:
                  </span>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                      <span>Strict Laravel MVC code with documentation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                      <span>Normalized MySQL schema & indexing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                      <span>{selectedAddons.length} Custom modules integrated</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                      <span>Deployment support & warranty check</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Call to action button */}
              <Link
                to="/contact"
                search={{ scope: scopeQuery }}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-400 text-slate-950 py-3.5 px-5 font-black uppercase tracking-wider text-xs shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Book This Scope</span>
                <ArrowRight className="size-4" />
              </Link>

              <div className="mt-3.5 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                <ShieldCheck className="size-3.5 text-emerald-400" />
                <span>Zero obligation discovery conversation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScopeEstimator;
