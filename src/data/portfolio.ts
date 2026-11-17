import fanhubImg from "@/assets/project-fanhub.png";
import cooksmartImg from "@/assets/project-cooksmart.png";
import merakiImg from "@/assets/project-meraki.jpg";
import hamdanImg from "@/assets/project-hamdan.jpg";

export interface Project {
  slug: string;
  title: string;
  category: string;
  filterGroup?: ".NET & Angular" | "Laravel & PHP" | "E-Commerce & CMS";
  year: string;
  role: string;
  client?: string;
  services: string[];
  image: string;
  summary: string;
  overview: string;
  /** Case study: What problem this project solves */
  problem?: string;
  /** Case study: Specific engineering modules built (Auth, API, DB, UI) */
  whatIBuilt?: string[];
  /** Case study: Technical challenges encountered and how they were solved */
  challenges?: { challenge: string; solution: string }[];
  /** Optional gallery screenshots for the case study page */
  screenshots?: { src: string; caption: string }[];
  highlights?: string[];
  metrics?: { label: string; value: string }[];
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

export const profile = {
  name: "Muhammad Faizan",
  firstName: "Faizan",
  role: "Full Stack Developer",
  subtitle: "C# / ASP.NET Core • Angular • PHP / Laravel Developer",
  valueProposition:
    "I build full-stack business web applications with C# / ASP.NET Core, Angular, and PHP / Laravel.",
  titleDisplay: "FULL STACK DEVELOPER",
  city: "Karachi",
  state: "Pakistan",
  status: "Available for freelance & full-time roles",
  avatar: "",
  portrait: "",
  intro:
    "Full-Stack Web Developer from Karachi, Pakistan, building business web apps and REST APIs with C#, ASP.NET Core, Angular, PHP, Laravel, SQL Server, and MySQL.",
  bio:
    "Full-Stack Developer currently in the 3rd semester of Aptech HDSE in Karachi. I focus on clean MVC/REST architecture, relational database design, and responsive Angular & Laravel web applications.",
  email: "muhammadfaizan01234567@gmail.com",
  phone: "0302 2679431",
  formattedPhone: "+92 302 2679431",
  whatsapp: "https://wa.me/923022679431",
  location: "Karachi, Pakistan",
  github: "https://github.com/muhammadfaizan01-DEV",
  linkedin: "https://www.linkedin.com/in/muhammad-faizan-jokhio-024a36374/",
};

export const projects: Project[] = [
  {
    slug: "cook-smart",
    title: "CookSmart",
    category: "ASP.NET Core & Angular Recipe Platform",
    filterGroup: ".NET & Angular",
    year: "2025",
    role: "Full-Stack .NET & Angular Developer",
    client: "Live Deployed Web Application",
    services: ["ASP.NET Core", "C#", "Angular", "SQL Server", "RESTful APIs"],
    image: cooksmartImg,
    summary:
      "Full-stack recipe discovery and weekly meal planning web app built with an ASP.NET Core REST API backend, SQL Server, and an Angular SPA.",
    overview:
      "CookSmart is a deployed full-stack recipe and meal-planning application. Users browse categorized recipes, filter by ingredients or prep time, get recipe suggestions, and organize their week with an interactive meal planner and saved favourites.",
    problem:
      "Home cooks often juggle scattered recipe bookmarks and notes without a structured way to plan weekly meals or filter recipes by what they already have in the kitchen.",
    whatIBuilt: [
      "ASP.NET Core Web API controllers for recipes, categories, cooking tips, and user authentication",
      "Normalized SQL Server relational schema for recipes, ingredient lists, categories, and user favourites",
      "Angular single-page frontend with reactive category filtering, search, and route guards",
      "Client-persisted weekly meal planner (Monday–Sunday slots) synced with user favourites",
    ],
    challenges: [
      {
        challenge: "Keeping recipe category filtering and search instant without redundant API calls.",
        solution:
          "Structured the ASP.NET Core endpoints with clean query parameters and cached category lookups in an Angular service using RxJS state streams.",
      },
      {
        challenge: "Making the weekly meal planner work smoothly across page reloads.",
        solution:
          "Combined structured local storage state with authenticated user profile sync so planned meals persist reliably.",
      },
    ],
    screenshots: [
      { src: cooksmartImg, caption: "CookSmart — Recipe discovery, categories & weekly meal planner UI" },
    ],
    highlights: [
      "Category-based recipe browsing, search, and saved user favourites",
      "Interactive weekly meal planner with cooking tips and prep times",
      "ASP.NET Core RESTful API consumed by a modular Angular SPA",
    ],
    metrics: [
      { label: "Backend", value: "ASP.NET Core" },
      { label: "Frontend", value: "Angular SPA" },
      { label: "Status", value: "Live on RunASP" },
    ],
    featured: true,
    liveUrl: "http://cook-smart.runasp.net/",
    githubUrl: "https://github.com/muhammadfaizan01-DEV/CookSmart",
  },
  {
    slug: "fan-hub-plus",
    title: "FanHub Plus",
    category: "ASP.NET Core & Angular 3D Web App",
    filterGroup: ".NET & Angular",
    year: "2025",
    role: "Full-Stack .NET & Angular Developer",
    client: "Live Deployed Web Application",
    services: ["ASP.NET Core", "C#", "Angular", "Three.js", "SQL Server", "RESTful APIs"],
    image: fanhubImg,
    summary:
      "Interactive fandom hub for anime, games, and movies powered by an ASP.NET Core backend, Angular SPA frontend, and Three.js 3D visuals.",
    overview:
      "FanHub Plus brings together fandom realms, character encyclopedias, media galleries, community articles, events, and merchandise in a single web platform. Built with C# / ASP.NET Core on the server and Angular + Three.js on the client.",
    problem:
      "Fan communities usually split their time between separate wikis, event boards, and merch stores with dated, static layouts that lack interactive visual appeal.",
    whatIBuilt: [
      "ASP.NET Core REST API serving structured endpoints for Realms, Characters, Media, Articles, Events, and Merchandise",
      "SQL Server database tables linking characters and articles to their respective fandom realms",
      "Angular SPA with dedicated views, authentication (login/sign-up), and modular component routing",
      "Three.js 3D canvas integration inside Angular lifecycle hooks with proper disposal on route change",
    ],
    challenges: [
      {
        challenge: "Preventing Three.js WebGL memory leaks when navigating between Angular routes.",
        solution:
          "Implemented Angular ngOnDestroy cleanup to cancel animation frames and dispose geometries, materials, and renderers when leaving 3D views.",
      },
      {
        challenge: "Organizing six distinct content modules (Realms, Media, Characters, Articles, Events, Merch) cleanly.",
        solution:
          "Designed consistent DTOs in ASP.NET Core and reusable card/filter components in Angular.",
      },
    ],
    screenshots: [
      { src: fanhubImg, caption: "FanHub Plus — Interactive 3D hero and multi-realm fandom explorer" },
    ],
    highlights: [
      "Six integrated modules: Realms, Media, Characters, Articles, Events & Merch",
      "ASP.NET Core backend API with SQL Server persistence and user auth",
      "Three.js 3D interactive visuals embedded cleanly inside Angular components",
    ],
    metrics: [
      { label: "Backend", value: "ASP.NET Core" },
      { label: "Frontend", value: "Angular + 3D" },
      { label: "Status", value: "Live on RunASP" },
    ],
    featured: true,
    liveUrl: "https://fan-hub-plus.runasp.net/",
    githubUrl: "https://github.com/muhammadfaizan01-DEV/FanHub-Plus",
  },
  {
    slug: "meraki-curated-essentials",
    title: "Meraki — Curated Essentials",
    category: "Luxury E-Commerce & Lifestyle Storefront",
    filterGroup: "E-Commerce & CMS",
    year: "2026",
    role: "Full-Stack E-Commerce Developer",
    client: "Live Deployed Web Application",
    services: [
      "React & TypeScript",
      "Tailwind CSS",
      "E-Commerce Storefront",
      "Cart & Checkout Flow",
      "Responsive Editorial UI",
    ],
    image: merakiImg,
    summary:
      "Editorial luxury fashion, accessories, and home essentials e-commerce storefront featuring curated collections, dynamic product filtering, and an interactive shopping bag.",
    overview:
      "Meraki (Curated Essentials — Autumn Edit 2026) is a live deployed modern e-commerce web application crafted with an editorial aesthetic. Shoppers can browse Fashion, Accessories, and Home collections, search products instantaneously, inspect detailed product views, and manage their shopping bag with a seamless responsive interface.",
    problem:
      "Many online fashion and lifestyle stores feel cluttered and slow on mobile, losing the refined editorial presentation needed for premium apparel and home goods.",
    whatIBuilt: [
      "Editorial hero showcase and promotional announcement bar with smooth collection navigation (Shop All, Fashion, Accessories, Home)",
      "Category-filtered product catalog with instant search and responsive grid layouts across desktop, tablet, and mobile",
      "Interactive slide-over shopping bag with real-time quantity updates, subtotal calculation, and checkout flow",
      "Pixel-perfect typography and warm neutral design system optimized for fast Core Web Vitals",
    ],
    challenges: [
      {
        challenge:
          "Preserving high-resolution editorial imagery without slowing down initial page load on mobile devices.",
        solution:
          "Used optimized image sizing, lazy-loaded collection grids below the fold, and fluid CSS aspect-ratio containers to prevent layout shift.",
      },
      {
        challenge:
          "Keeping category switching (Fashion, Accessories, Home) and cart drawer interactions instant.",
        solution:
          "Structured client state cleanly so filtering, product quick-views, and cart mutations update with zero page reloads.",
      },
    ],
    screenshots: [
      {
        src: merakiImg,
        caption:
          "Meraki — Autumn Edit 2026 luxury editorial hero & navigation experience",
      },
    ],
    highlights: [
      "Curated Fashion, Accessories & Home collections with instant filtering",
      "Interactive shopping bag drawer and seamless product discovery",
      "Live deployed responsive editorial storefront",
    ],
    metrics: [
      { label: "Category", value: "E-Commerce" },
      { label: "Frontend", value: "React + TS" },
      { label: "Status", value: "Live Deployed" },
    ],
    featured: true,
    liveUrl: "https://pixel-perfect-replay-10777.lovable.app/",
    githubUrl: "https://github.com/muhammadfaizan01-DEV",
  },
  {
    slug: "hamdan-fastfood",
    title: "Hamdan Fastfood",
    category: "Restaurant Ordering & Catering Web App",
    filterGroup: "E-Commerce & CMS",
    year: "2026",
    role: "Full-Stack Web Developer",
    client: "Live Deployed Web Application",
    services: [
      "React & TypeScript",
      "TanStack Start",
      "Tailwind CSS",
      "WhatsApp Order Flow",
      "Responsive Restaurant UI",
    ],
    image: hamdanImg,
    summary:
      "Modern desi & fast-food restaurant web application featuring an interactive menu showcase, event catering inquiry flow, and direct WhatsApp ordering.",
    overview:
      "Hamdan Fastfood is a live deployed restaurant storefront built for fast mobile browsing and frictionless ordering. Customers explore freshly prepared Pakistani biryani, crispy broast, sizzling BBQ, and catering packages, then place orders or catering inquiries directly via WhatsApp in one tap.",
    problem:
      "Local restaurants often rely on slow PDF menus or third-party delivery apps with high commissions, making it hard for customers to browse dishes and order directly.",
    whatIBuilt: [
      "Full-bleed editorial restaurant hero with instant jump-to-menu and direct WhatsApp ordering CTAs",
      "Categorized menu browsing (Biryani, Broast, BBQ & Everyday Favourites) optimized for mobile and desktop viewports",
      "Dedicated Event Catering section for weddings, birthdays, and family gatherings with pre-filled WhatsApp inquiry links",
      "Fast SSR delivery with preloaded hero imagery and responsive sticky header navigation",
    ],
    challenges: [
      {
        challenge:
          "Making ordering effortless for local customers without forcing them through a lengthy account registration.",
        solution:
          "Integrated structured `wa.me` deep links with pre-filled order messages directly from the header, hero, and catering CTAs.",
      },
      {
        challenge:
          "Keeping high-resolution food photography crisp without hurting First Contentful Paint on mobile.",
        solution:
          "Used `fetchPriority='high'` preloading on the hero photograph alongside lightweight CSS overlays and clean typographic hierarchy.",
      },
    ],
    screenshots: [
      {
        src: hamdanImg,
        caption: "Hamdan Fastfood — Desi & Fast Food showcase with direct WhatsApp ordering",
      },
    ],
    highlights: [
      "Interactive restaurant menu & catering showcase live on Vercel",
      "One-tap WhatsApp direct ordering & catering inquiry flow",
      "Mobile-first responsive layout with fast SSR loading",
    ],
    metrics: [
      { label: "Category", value: "Food & Orders" },
      { label: "Stack", value: "React + SSR" },
      { label: "Status", value: "Live on Vercel" },
    ],
    featured: true,
    liveUrl: "https://hamdan-flavors-unfold.vercel.app/",
    githubUrl: "https://github.com/muhammadfaizan01-DEV",
  },
  {
    slug: "nexacore-enterprise-erp",
    title: "NexaCore Operations Portal",
    category: "ASP.NET Core & Angular Web App",
    filterGroup: ".NET & Angular",
    year: "2025",
    role: "Full-Stack .NET & Angular Developer",
    client: "Enterprise Architecture Project",
    services: ["C#", "ASP.NET Core", "Angular", "SQL Server", "Entity Framework", "JWT Auth"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    summary:
      "Role-based business workflow and inventory tracking portal built with C# ASP.NET Core Web API, Entity Framework Core, SQL Server, and Angular.",
    overview:
      "NexaCore is a modular business operations portal combining employee task workflows, department inventory tracking, and approval logs. Built with an ASP.NET Core Web API backend and an Angular SPA frontend.",
    problem:
      "Growing teams need a unified internal portal where staff can submit inventory or purchase requests and managers can approve them with an audit trail.",
    whatIBuilt: [
      "C# ASP.NET Core Web API structured with Controllers, Services, and EF Core Repositories",
      "JWT Bearer authentication and role claims (`Admin`, `Manager`, `Staff`) enforced on both API and Angular routes",
      "SQL Server schema managed via Entity Framework Core code-first migrations",
      "Angular dashboard with reactive forms, status filters, and approval history logs",
    ],
    challenges: [
      {
        challenge: "Handling expired JWT tokens gracefully without kicking the user out mid-form.",
        solution:
          "Built an Angular `HttpInterceptor` that attaches the Bearer token and cleanly redirects to login with return-URL state when a 401 occurs.",
      },
      {
        challenge: "Keeping controller actions thin and testable.",
        solution:
          "Separated business rules into injectable C# service classes using ASP.NET Core Dependency Injection.",
      },
    ],
    highlights: [
      "C# ASP.NET Core Web API with Dependency Injection and EF Core migrations",
      "JWT authentication and Angular `CanActivate` route guards",
      "Department inventory requests, manager approvals, and audit logs",
    ],
    metrics: [
      { label: "Backend", value: ".NET Web API" },
      { label: "ORM", value: "EF Core + SQL" },
      { label: "Security", value: "JWT + Guards" },
    ],
    featured: true,
    githubUrl: "https://github.com/muhammadfaizan01-DEV/NexaCore-Operations-Portal",
  },
  {
    slug: "the-elite-attorney",
    title: "The Elite Attorney",
    category: "Legal Case & Appointment Portal",
    filterGroup: "Laravel & PHP",
    year: "2025",
    role: "Full-Stack PHP & Laravel Developer",
    client: "Aptech Vision Showcase Project",
    services: ["PHP / Laravel", "MySQL", "RBAC Auth", "Appointment Booking", "Bootstrap / Tailwind"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80",
    summary:
      "Law firm appointment booking and case milestone portal built with PHP/Laravel and MySQL, connecting clients with legal associates.",
    overview:
      "Developed as a full-stack legal practice portal where clients can search lawyers by specialization, request consultation slots, and track case hearing dates, while lawyers manage their schedules and case notes.",
    problem:
      "Manual phone-based legal consultation booking leads to scheduling conflicts and leaves clients without visibility into upcoming case milestones.",
    whatIBuilt: [
      "Multi-role authentication for Clients, Lawyers, and Firm Administrators",
      "Lawyer directory filterable by practice area (Corporate, Family, Civil, Criminal) and city",
      "Consultation booking system with time-slot conflict checks in MySQL",
      "Case milestone timeline where lawyers post hearing updates for their clients",
    ],
    challenges: [
      {
        challenge: "Preventing double-booking of the same lawyer for overlapping consultation slots.",
        solution:
          "Added server-side availability validation in Laravel before confirming a booking record and constrained `(lawyer_id, slot_datetime)` in MySQL.",
      },
      {
        challenge: "Designing separate dashboards for lawyers and clients without duplicating layout code.",
        solution:
          "Created shared Blade/Tailwind layout components with role-aware navigation partials.",
      },
    ],
    highlights: [
      "Separate portals for Legal Clients, Associates, and Admins",
      "Conflict-checked consultation booking and hearing timeline logs",
      "Filterable lawyer directory by legal specialization",
    ],
    metrics: [
      { label: "Stack", value: "PHP & Laravel" },
      { label: "Database", value: "MySQL" },
      { label: "Feature", value: "Slot Booking" },
    ],
    featured: true,
    githubUrl: "https://github.com/muhammadfaizan01-DEV/The-Elite-Attorney-Portal",
  },
  {
    slug: "quick-snack",
    title: "Quick Snack Commerce",
    category: "E-Commerce & Food Ordering App",
    filterGroup: "E-Commerce & CMS",
    year: "2024",
    role: "Full-Stack Web Developer",
    client: "E-Commerce Project",
    services: ["Laravel / PHP", "JavaScript ES6+", "MySQL", "AJAX Cart", "Order Tracking"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&auto=format&fit=crop&q=80",
    summary:
      "Online food ordering and cart management web application built with PHP/Laravel, JavaScript, and MySQL with live order status updates.",
    overview:
      "Quick Snack Commerce is a responsive food-ordering storefront where customers browse categorized menus, customize quantities in an asynchronous cart, apply promo codes, and place orders that flow directly into an admin kitchen queue.",
    problem:
      "Full page reloads on every 'Add to Cart' action hurt mobile usability on food ordering sites.",
    whatIBuilt: [
      "Asynchronous JavaScript Fetch/AJAX cart endpoints in Laravel so item quantities update without page reloads",
      "MySQL relational tables for `categories`, `menu_items`, `orders`, `order_items`, and `coupons`",
      "Checkout workflow with address validation and order summary calculation",
      "Admin order queue to update order status (`Pending` → `Preparing` → `Out for Delivery` → `Completed`)",
    ],
    challenges: [
      {
        challenge: "Keeping cart totals accurate when users rapidly increment/decrement quantities or apply discount codes.",
        solution:
          "Recalculated subtotals and coupon discounts server-side in Laravel on every cart mutation and returned the canonical JSON state to the UI.",
      },
    ],
    highlights: [
      "No-reload AJAX shopping cart and server-validated promo codes",
      "Admin kitchen queue for managing live order statuses",
      "Mobile-first menu filtering and 3-step checkout flow",
    ],
    metrics: [
      { label: "Backend", value: "Laravel + MySQL" },
      { label: "Cart UX", value: "Async Fetch" },
      { label: "Flow", value: "Menu → Checkout" },
    ],
    featured: true,
    githubUrl: "https://github.com/muhammadfaizan01-DEV/QuickSnack-Commerce",
  },
];

export const experience = [
  {
    title: "Freelance Full-Stack Web Developer",
    company: "Independent / Client & Academic Projects",
    year: "2024 - Present",
    location: "Karachi, Pakistan (Remote / Hybrid)",
    description:
      "Building and deploying full-stack web applications using C#, ASP.NET Core, Angular, PHP, Laravel, SQL Server, and MySQL. Shipped live applications including CookSmart and FanHub Plus on RunASP with RESTful APIs, relational databases, and responsive frontends.",
  },
  {
    title: "Software Engineering Student (HDSE)",
    company: "Aptech Computer Education",
    year: "2025 - Present",
    location: "Karachi, Pakistan",
    description:
      "Winner of the Aptech Internal Vision Competition (1st Place) and selected institute representative for the External Vision Competition. Hands-on coursework and capstone projects in OOP, C#/.NET, Angular, PHP/Laravel, and database design.",
  },
];

export const education = [
  {
    degree: "Higher Diploma in Software Engineering (HDSE)",
    institution: "Aptech Computer Education",
    year: "2025 - Present",
    status: "Currently in 3rd Semester",
    description:
      "Focused on Full-Stack Software Engineering, C# & ASP.NET Core, Angular, PHP & Laravel, Relational Database Design (SQL Server / MySQL), and RESTful API Architecture.",
  },
  {
    degree: "Matriculation (Science)",
    institution: "Board of Secondary Education, Karachi",
    year: "2022",
    status: "Completed",
    description:
      "Foundation in Mathematics, Computer Science, and Analytical Problem Solving.",
  },
];

export const achievements = [
  {
    title: "Winner – Internal Vision Competition",
    organization: "Aptech Computer Education",
    badge: "1st Place Award",
    description:
      "Awarded 1st place for full-stack project execution, database design, and software architecture.",
  },
  {
    title: "Selected – External Vision Competition",
    organization: "Inter-Institute Competition",
    badge: "Institute Representative",
    description:
      "Project selected to represent Aptech in inter-institute software showcase competitions.",
  },
];

export const services = [
  {
    number: "01",
    title: "ASP.NET Core & Angular Web Apps",
    tagline: "C#, .NET Web API & Angular SPAs",
    description:
      "Full-stack business web applications built with C# ASP.NET Core REST APIs, Entity Framework Core, SQL Server, and modular Angular single-page frontends.",
    includes: [
      "C# & ASP.NET Core Web APIs",
      "Angular Single-Page Applications",
      "Entity Framework & SQL Server",
      "JWT Authentication & Route Guards",
    ],
  },
  {
    number: "02",
    title: "Laravel & PHP Web Systems",
    tagline: "Custom MVC Portals & Dashboards",
    description:
      "Custom web portals, booking systems, and admin dashboards built with PHP 8 and Laravel using clean MVC architecture, Eloquent ORM, and MySQL.",
    includes: [
      "Laravel MVC Web Applications",
      "RESTful APIs & Blade / Tailwind UI",
      "MySQL Schema Design & Indexing",
      "Role-Based Access Control (RBAC)",
    ],
  },
  {
    number: "03",
    title: "E-Commerce & CMS Storefronts",
    tagline: "Custom Stores, Shopify & WordPress",
    description:
      "Responsive online stores built with custom Laravel cart engines, Shopify, or WordPress WooCommerce with clean product filtering and checkout flows.",
    includes: [
      "Custom Laravel E-Commerce Stores",
      "Shopify Store Setup & Theme Edits",
      "WordPress & WooCommerce Sites",
      "Cart, Coupon & Order Management",
    ],
  },
  {
    number: "04",
    title: "REST APIs & Database Design",
    tagline: "SQL Server & MySQL Architecture",
    description:
      "Normalized relational databases, stored procedures, and documented REST endpoints built for reliability, clean data integrity, and easy frontend integration.",
    includes: [
      "REST API Design & Postman Testing",
      "SQL Server & MySQL Normalization",
      "CRUD Pipelines & Filtering Queries",
      "Third-Party API Integrations",
    ],
  },
];

export const process = [
  {
    number: "01",
    title: "Requirements & Schema Design",
    body: "We define the core user flows, roles, and relational database tables (SQL Server or MySQL) before writing application code.",
  },
  {
    number: "02",
    title: "Full-Stack Implementation",
    body: "I build the backend REST APIs (ASP.NET Core or Laravel), connect the database, and craft the responsive frontend (Angular, React, or Tailwind).",
  },
  {
    number: "03",
    title: "Testing, Deployment & Handover",
    body: "Endpoints and UI flows are tested across desktop and mobile, deployed to hosting (e.g., RunASP / cloud), and handed over with clean documentation.",
  },
];

export const faqs = [
  {
    q: "What tech stack do you work with most?",
    a: "My primary stack is C# / ASP.NET Core with Angular and SQL Server (used in my live projects CookSmart and FanHub Plus), alongside PHP 8 / Laravel with MySQL, JavaScript/TypeScript, React, Tailwind CSS, WordPress, and Shopify.",
  },
  {
    q: "Can I see your live deployed projects?",
    a: "Yes! You can try CookSmart (http://cook-smart.runasp.net/), FanHub Plus (https://fan-hub-plus.runasp.net/), Meraki Storefront (https://pixel-perfect-replay-10777.lovable.app/), and Hamdan Fastfood (https://hamdan-flavors-unfold.vercel.app/) live in your browser, or inspect them directly in the interactive Device Preview panel.",
  },
  {
    q: "Are you available for internships, junior/mid full-stack roles, or freelance work?",
    a: "Yes. I am currently in my 3rd semester of Aptech HDSE in Karachi and available for full-time/part-time developer roles as well as freelance web application projects.",
  },
  {
    q: "How can we get in touch?",
    a: "Use the contact form below to send a message directly, email muhammadfaizan01234567@gmail.com, connect on LinkedIn, or message me on WhatsApp at +92 302 2679431.",
  },
];

export const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-faizan-jokhio-024a36374/",
    handle: "muhammad-faizan-jokhio",
  },
  {
    name: "GitHub",
    href: "https://github.com/muhammadfaizan01-DEV",
    handle: "muhammadfaizan01-DEV",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/923022679431",
    handle: "+92 302 2679431",
  },
  {
    name: "Email",
    href: "mailto:muhammadfaizan01234567@gmail.com",
    handle: "muhammadfaizan01234567@gmail.com",
  },
];
