import fanhubImg from "@/assets/project-fanhub.png";
import cooksmartImg from "@/assets/project-cooksmart.png";
import merakiImg from "@/assets/project-meraki.jpg";
import hamdanImg from "@/assets/project-hamdan.jpg";
import hamdanPosImg from "@/assets/project-hamdan-pos.jpg";

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
    "Full-stack web developer based in Karachi, Pakistan. I build web apps and REST APIs using C#, ASP.NET Core, Angular, PHP, Laravel, SQL Server, and MySQL.",
  bio:
    "I am in the 3rd semester of my HDSE diploma at Aptech in Karachi. Most of my work focuses on clean MVC and REST structure, relational SQL databases, and responsive frontends in Angular, React, and Laravel.",
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
      "I built this recipe and weekly meal planner app using an ASP.NET Core Web API, SQL Server, and an Angular frontend.",
    overview:
      "CookSmart lets home cooks browse recipes by category, search by ingredient or prep time, save their favourites, and plan out meals for the week in one place.",
    problem:
      "Most people keep recipes scattered across screenshots and bookmarks, which makes it hard to figure out what to cook with what is already in the kitchen.",
    whatIBuilt: [
      "ASP.NET Core API controllers for recipes, categories, cooking tips, and user login",
      "Normalized SQL Server tables for recipes, ingredients, categories, and saved favourites",
      "Angular frontend with category filters, search, and protected user routes",
      "Monday-to-Sunday weekly meal planner that saves planned dishes alongside favourites",
    ],
    challenges: [
      {
        challenge:
          "Switching categories and typing in search was firing too many API calls.",
        solution:
          "I added query filtering on the ASP.NET Core endpoints and cached category lists inside an Angular service using RxJS.",
      },
      {
        challenge:
          "Planned meals disappeared whenever a user refreshed the page.",
        solution:
          "I synced the planner state between local storage and the user's saved account records.",
      },
    ],
    screenshots: [
      {
        src: cooksmartImg,
        caption: "CookSmart recipe list, category filters, and weekly meal planner",
      },
    ],
    highlights: [
      "Category filters, ingredient search, and saved user favourites",
      "Weekly meal planner with prep times and cooking tips",
      "ASP.NET Core REST API connected to a modular Angular frontend",
    ],
    metrics: [
      { label: "Backend", value: "ASP.NET Core" },
      { label: "Frontend", value: "Angular SPA" },
      { label: "Status", value: "Live on RunASP" },
    ],
    featured: true,
    liveUrl: "http://cook-smart.runasp.net/",
    githubUrl: "https://github.com/muhammadfaizan01-DEV/Cook-Smart",
  },
  {
    slug: "fan-hub-plus",
    title: "FanHub Plus",
    category: "ASP.NET Core & Angular 3D Web App",
    filterGroup: ".NET & Angular",
    year: "2025",
    role: "Full-Stack .NET & Angular Developer",
    client: "Live Deployed Web Application",
    services: [
      "ASP.NET Core",
      "C#",
      "Angular",
      "Three.js",
      "SQL Server",
      "RESTful APIs",
    ],
    image: fanhubImg,
    summary:
      "I built a multi-fandom web app for anime, games, and movies with an ASP.NET Core backend, Angular frontend, and Three.js visuals.",
    overview:
      "FanHub Plus puts fandom realms, character profiles, media galleries, articles, events, and merchandise inside one site. It runs on a C# / ASP.NET Core API with SQL Server and an Angular + Three.js frontend.",
    problem:
      "Fans usually have to jump between wikis, event pages, and merch stores across different sites just to follow one series.",
    whatIBuilt: [
      "ASP.NET Core REST endpoints for Realms, Characters, Media, Articles, Events, and Merchandise",
      "SQL Server tables linking characters, media items, and articles to each fandom realm",
      "Angular views with login/sign-up forms and reusable card filters",
      "Three.js 3D scene hooked into Angular lifecycle methods so it cleans up when changing routes",
    ],
    challenges: [
      {
        challenge:
          "Navigating away from the 3D scene left WebGL contexts running and slowed down the browser.",
        solution:
          "I added cleanup inside Angular ngOnDestroy to stop animation frames and dispose geometries, materials, and renderers.",
      },
      {
        challenge:
          "Six separate sections (Realms, Media, Characters, Articles, Events, Merch) started duplicating component logic.",
        solution:
          "I matched consistent DTO shapes in ASP.NET Core with shared Angular card and filter components.",
      },
    ],
    screenshots: [
      {
        src: fanhubImg,
        caption: "FanHub Plus home hero with Three.js visuals and fandom realm navigation",
      },
    ],
    highlights: [
      "Six connected sections: Realms, Media, Characters, Articles, Events, and Merch",
      "ASP.NET Core backend with SQL Server storage and user accounts",
      "Three.js 3D canvas managed cleanly inside Angular component hooks",
    ],
    metrics: [
      { label: "Backend", value: "ASP.NET Core" },
      { label: "Frontend", value: "Angular + 3D" },
      { label: "Status", value: "Live on RunASP" },
    ],
    featured: true,
    liveUrl: "https://fan-hub-plus.runasp.net/",
    githubUrl: "https://github.com/muhammadfaizan01-DEV",
  },
  {
    slug: "meraki-curated-essentials",
    title: "Meraki — Curated Essentials",
    category: "Online Fashion & Home Storefront",
    filterGroup: "E-Commerce & CMS",
    year: "2026",
    role: "Full-Stack E-Commerce Developer",
    client: "Live Deployed Web Application",
    services: [
      "React & TypeScript",
      "Tailwind CSS",
      "E-Commerce Storefront",
      "Cart & Checkout Flow",
      "Responsive Store UI",
    ],
    image: merakiImg,
    summary:
      "I built an online store for clothing, accessories, and home items with category filters, product search, and a slide-out shopping bag.",
    overview:
      "Meraki (Autumn Edit 2026) is a live clothing and lifestyle storefront. Shoppers can browse Fashion, Accessories, and Home collections, filter products, open product details, and adjust items in a slide-over cart drawer.",
    problem:
      "Many small online clothing shops look crowded on phones and force users through full page reloads just to check a category or update their bag.",
    whatIBuilt: [
      "Storefront landing page and announcement bar with links to Shop All, Fashion, Accessories, and Home",
      "Category filtering, search bar, and responsive product cards tested across mobile and desktop screens",
      "Slide-out shopping bag drawer with quantity controls, live subtotals, and checkout steps",
      "Warm neutral colour scheme and typography tuned for clean product photos",
    ],
    challenges: [
      {
        challenge:
          "Large product and hero photos were making mobile scrolling feel heavy on slower connections.",
        solution:
          "I sized images cleanly, lazy-loaded lower product grids, and kept fixed aspect ratios on cards to stop layout jumping.",
      },
      {
        challenge:
          "Keeping category switches and cart quantity updates quick without reloading the page.",
        solution:
          "I kept product filters and cart state in client memory so changes update the bag and list right away.",
      },
    ],
    screenshots: [
      {
        src: merakiImg,
        caption: "Meraki storefront hero and collection navigation (Autumn Edit 2026)",
      },
    ],
    highlights: [
      "Fashion, Accessories, and Home collections with quick category filters",
      "Slide-over shopping bag with live quantity and subtotal updates",
      "Responsive layout tested on mobile, tablet, and desktop",
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
    category: "Restaurant Menu & WhatsApp Ordering Site",
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
      "I built a fast-loading menu and catering website for a local restaurant where customers can browse dishes and send orders straight to WhatsApp.",
    overview:
      "Hamdan Fastfood is a live website built for mobile ordering. Visitors check Pakistani biryani, broast, BBQ, and event catering options, then tap once to message the restaurant on WhatsApp with their order ready.",
    problem:
      "Local food spots often send customers heavy PDF menus or lose money to delivery app fees because people have no simple web page to view prices and order directly.",
    whatIBuilt: [
      "Restaurant landing section with direct buttons to jump to the menu or message on WhatsApp",
      "Dish sections for Biryani, Broast, BBQ, and everyday meals laid out cleanly for phones",
      "Catering section for weddings and family events with pre-filled WhatsApp inquiry links",
      "Server-rendered pages with preloaded hero photography and a sticky top bar",
    ],
    challenges: [
      {
        challenge:
          "Letting local customers place an order quickly without making them sign up or fill long checkout forms.",
        solution:
          "I wired header, hero, and catering buttons to wa.me links with pre-written order text so WhatsApp opens ready to send.",
      },
      {
        challenge:
          "Keeping the large food banner sharp without slowing down initial phone loads.",
        solution:
          "I added fetchPriority='high' preloading on the hero photo and kept overlays in lightweight CSS.",
      },
    ],
    screenshots: [
      {
        src: hamdanImg,
        caption: "Hamdan Fastfood storefront hero with menu jump and WhatsApp ordering",
      },
    ],
    highlights: [
      "Live menu and event catering site hosted on Vercel",
      "One-tap WhatsApp links for direct orders and catering inquiries",
      "Mobile-first layout with fast server-rendered loading",
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
    slug: "hamdan-pos-system",
    title: "Hamdan Fast Food POS",
    category: "Desktop Point of Sale & Kitchen Portal",
    filterGroup: "E-Commerce & CMS",
    year: "2026",
    role: "Full-Stack Developer",
    client: "Hamdan Fast Food (Client Project)",
    services: [
      "React 19 & TypeScript",
      "Node.js & Express",
      "Tailwind CSS",
      "JSON File Persistence",
      "Local Desktop App",
    ],
    image: hamdanPosImg,
    summary:
      "I built an offline-ready counter POS and kitchen order app for a local fast-food shop to handle walk-in, takeaway, delivery, and WhatsApp bills in one screen.",
    overview:
      "This desktop POS runs directly on the shop's counter PC using a local Node/Express backend and a React frontend. Staff can manage multiple open bills, apply combo deals, track orders in the kitchen queue, and check daily sales without paying monthly SaaS fees.",
    problem:
      "During busy evening hours, writing walk-in, phone, and WhatsApp orders on paper slips led to missed items, slow billing, and no proper daily sales count.",
    whatIBuilt: [
      "Multi-tab POS screen supporting parallel open bills, held bills, takeaway, dine-in, and delivery channels",
      "Fast item search ('/' keyboard shortcut), category tabs, and combo deal bundles with automatic discount math",
      "Live kitchen orders list, menu & deals manager, and daily sales summary view",
      "Express API saving orders, held drafts, and catalog changes straight to JSON files on disk",
    ],
    challenges: [
      {
        challenge:
          "Keeping billing quick when counter staff jump back and forth between three or four active customer tabs.",
        solution:
          "I kept active and held bills in synced state with debounced Express API writes so tab switching never lags.",
      },
      {
        challenge:
          "Letting the shop owner open the POS every morning without running terminal commands or setting up a heavy database server.",
        solution:
          "I bundled the app with a one-click launcher script and local file storage that initializes automatically on startup.",
      },
    ],
    screenshots: [
      {
        src: hamdanPosImg,
        caption: "Hamdan Fast Food POS counter terminal with active bill tabs and combo deals",
      },
    ],
    highlights: [
      "Parallel bill tabs for Walk-in, WhatsApp, Phone, and Web orders",
      "Combo deals, held bills, kitchen queue, and daily sales dashboard",
      "Runs locally on the shop PC with zero monthly subscription costs",
    ],
    metrics: [
      { label: "Type", value: "Desktop POS" },
      { label: "Stack", value: "React + Express" },
      { label: "Client", value: "Hamdan Food" },
    ],
    featured: true,
    githubUrl: "https://github.com/muhammadfaizan01-DEV/Hamdan_POS",
  },
  {
    slug: "the-elite-attorney",
    title: "The Elite Attorney",
    category: "Legal Consultation & Booking Portal",
    filterGroup: "Laravel & PHP",
    year: "2025",
    role: "Full-Stack PHP & MySQL Developer",
    client: "Aptech Vision Showcase Project",
    services: ["PHP", "MySQL", "HTML/CSS", "JavaScript", "Sessions & Roles"],
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80",
    summary:
      "I built a law firm consultation booking and directory website in Core PHP and MySQL with separate dashboards for customers, lawyers, and admins.",
    overview:
      "Developed for the Aptech Vision showcase, The Elite Attorney lets visitors search lawyers by specialization, book consultation slots, and send inquiries, while lawyers manage their appointments and admins oversee lawyers, customers, services, and messages.",
    problem:
      "Booking legal consultations over phone calls made it easy to double-book lawyers and gave clients no way to check open slots or track their booking status.",
    whatIBuilt: [
      "Session-based login and registration with separate role checks for Admins, Lawyers, and Customers (`includes/config.php`)",
      "MySQL (`mysqli`) database storing users, lawyer profiles, practice services, appointment bookings, and contact messages",
      "Dedicated `admin/`, `lawyer/`, and customer `pages/` panels to approve bookings and update lawyer details",
      "Lawyer profile directory with photo uploads and practice-area filtering",
    ],
    challenges: [
      {
        challenge:
          "Keeping admins, lawyers, and customers strictly separated across different folders without breaking shared navigation.",
        solution:
          "I added `isAdmin()`, `isLawyer()`, and `isCustomer()` session helper guards in `includes/config.php` and reused shared header/footer includes.",
      },
      {
        challenge:
          "Handling user-submitted forms safely in plain PHP without framework ORM helpers.",
        solution:
          "I created a centralized `clean($conn, $data)` sanitization helper and escaped query inputs before saving appointments and messages to MySQL.",
      },
    ],
    highlights: [
      "Separate portals for Customers, Lawyers, and Firm Admins in Core PHP",
      "MySQL-backed lawyer directory, consultation booking, and admin message inbox",
      "1st Place project showcase at Aptech Internal Vision Competition",
    ],
    metrics: [
      { label: "Stack", value: "PHP & MySQL" },
      { label: "Auth", value: "3 User Roles" },
      { label: "Feature", value: "Slot Booking" },
    ],
    featured: true,
    githubUrl: "https://github.com/muhammadfaizan01-DEV/The_Elite_Attorney",
  },
  {
    slug: "quick-snack",
    title: "Quick Snack Commerce",
    category: "E-Commerce & Food Ordering App",
    filterGroup: "E-Commerce & CMS",
    year: "2024",
    role: "Full-Stack Web Developer",
    client: "E-Commerce Project",
    services: [
      "Laravel / PHP",
      "JavaScript ES6+",
      "MySQL",
      "AJAX Cart",
      "Order Tracking",
    ],
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&auto=format&fit=crop&q=80",
    summary:
      "I built an online snack ordering storefront with PHP/Laravel, JavaScript, and MySQL featuring a no-reload cart and admin order queue.",
    overview:
      "Quick Snack Commerce lets customers browse categorized snacks, adjust cart quantities without refreshing the page, apply discount coupons, and submit orders to an admin kitchen screen.",
    problem:
      "Reloading the whole page every time a user adds an item to their cart makes mobile food ordering slow and frustrating.",
    whatIBuilt: [
      "JavaScript Fetch/AJAX cart requests connected to Laravel endpoints so cart counts update without page reloads",
      "MySQL tables for `categories`, `menu_items`, `orders`, `order_items`, and `coupons`",
      "Three-step checkout flow with address validation and order total calculation",
      "Admin order screen to move tickets through `Pending`, `Preparing`, `Out for Delivery`, and `Completed`",
    ],
    challenges: [
      {
        challenge:
          "Keeping cart subtotals accurate when users tap +/- quickly or apply promo codes.",
        solution:
          "I recalculated item totals and coupon discounts on the PHP server during every cart call and returned the updated JSON back to the browser.",
      },
    ],
    highlights: [
      "No-reload Fetch/AJAX shopping cart and server-checked promo codes",
      "Admin kitchen queue for updating live order status",
      "Mobile-friendly menu filters and simple checkout steps",
    ],
    metrics: [
      { label: "Backend", value: "Laravel + MySQL" },
      { label: "Cart UX", value: "Async Fetch" },
      { label: "Flow", value: "Menu → Checkout" },
    ],
    featured: true,
    githubUrl: "https://github.com/muhammadfaizan01-DEV",
  },
];

export const experience = [
  {
    title: "Freelance Full-Stack Web Developer",
    company: "Independent / Client & Academic Projects",
    year: "2024 - Present",
    location: "Karachi, Pakistan (Remote / Hybrid)",
    description:
      "Building web apps and client systems with C#, ASP.NET Core, Angular, PHP, Laravel, SQL Server, and MySQL. Shipped live apps including CookSmart, FanHub Plus, Meraki, Hamdan Fastfood, and a counter POS for Hamdan Fast Food.",
  },
  {
    title: "Software Engineering Student (HDSE)",
    company: "Aptech Computer Education",
    year: "2025 - Present",
    location: "Karachi, Pakistan",
    description:
      "Won 1st Place in the Aptech Internal Vision Competition and was selected to represent the institute in the External Vision Competition. Completing project work in OOP, C#/.NET, Angular, PHP/Laravel, and SQL database design.",
  },
];

export const education = [
  {
    degree: "Higher Diploma in Software Engineering (HDSE)",
    institution: "Aptech Computer Education",
    year: "2025 - Present",
    status: "Currently in 3rd Semester",
    description:
      "Coursework in Full-Stack Software Engineering, C# & ASP.NET Core, Angular, PHP & Laravel, SQL Server, MySQL, and REST APIs.",
  },
  {
    degree: "Matriculation (Science)",
    institution: "Board of Secondary Education, Karachi",
    year: "2022",
    status: "Completed",
    description:
      "Secondary schooling with a focus on Mathematics and Computer Science.",
  },
];

export const achievements = [
  {
    title: "Winner – Internal Vision Competition",
    organization: "Aptech Computer Education",
    badge: "1st Place Award",
    description:
      "Won 1st place for building and presenting a working full-stack web application and database schema.",
  },
  {
    title: "Selected – External Vision Competition",
    organization: "Inter-Institute Competition",
    badge: "Institute Representative",
    description:
      "Selected to represent Aptech in the inter-institute student software competition.",
  },
];

export const services = [
  {
    number: "01",
    title: "ASP.NET Core & Angular Web Apps",
    tagline: "C#, .NET Web API & Angular SPAs",
    description:
      "Business web apps built with C# ASP.NET Core APIs, Entity Framework Core, SQL Server, and modular Angular frontends.",
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
      "Portals, booking systems, and admin panels written in PHP 8 and Laravel using MVC structure, Eloquent ORM, and MySQL.",
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
      "Online stores built with custom Laravel or React carts, Shopify, or WordPress WooCommerce with clear product filtering and checkout.",
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
    tagline: "SQL Server & MySQL Structure",
    description:
      "Normalized SQL Server and MySQL databases alongside documented REST endpoints tested for reliable frontend integration.",
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
    body: "First I map out the user roles, main screens, and SQL Server or MySQL database tables before writing code.",
  },
  {
    number: "02",
    title: "Full-Stack Implementation",
    body: "Next I build the backend APIs (ASP.NET Core, Laravel, or Express), hook up the database, and build the frontend UI.",
  },
  {
    number: "03",
    title: "Testing, Deployment & Handover",
    body: "Finally I test endpoints and forms across desktop and mobile, deploy the site online, and hand over the source code.",
  },
];

export const faqs = [
  {
    q: "What tech stack do you work with most?",
    a: "My main stack is C# / ASP.NET Core with Angular and SQL Server (used in CookSmart and FanHub Plus), alongside PHP 8 / Laravel with MySQL, React, TypeScript, Tailwind CSS, WordPress, and Shopify.",
  },
  {
    q: "Can I see your live deployed projects?",
    a: "Yes. You can open CookSmart (http://cook-smart.runasp.net/), FanHub Plus (https://fan-hub-plus.runasp.net/), Meraki (https://pixel-perfect-replay-10777.lovable.app/), and Hamdan Fastfood (https://hamdan-flavors-unfold.vercel.app/) right in your browser, or test them inside the Device Preview panel.",
  },
  {
    q: "Are you available for internships, junior/mid full-stack roles, or freelance work?",
    a: "Yes. I am currently in my 3rd semester of Aptech HDSE in Karachi and available for internships, junior full-stack roles, and freelance web or POS projects.",
  },
  {
    q: "How can we get in touch?",
    a: "Use the contact form below to send an email straight to my inbox, write to muhammadfaizan01234567@gmail.com, connect on LinkedIn, or message me on WhatsApp at +92 302 2679431.",
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
