export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  client?: string;
  services: string[];
  image: string;
  summary: string;
  overview: string;
  featured?: boolean;
}

export const profile = {
  name: "Muhammad Faizan",
  firstName: "Faizan",
  role: "Full Stack Developer",
  subtitle: "PHP / Laravel & Web / E-Commerce Developer",
  titleDisplay: "FULL STACK DEVELOPER",
  city: "Karachi",
  state: "Pakistan",
  status: "Available for freelance & full-time projects",
  avatar: "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png",
  portrait: "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png",
  intro:
    "Full-Stack Web & E-Commerce Developer from Karachi, Pakistan. Specialized in Laravel, PHP, MySQL, REST APIs, and modern responsive frontends for scalable web applications.",
  bio:
    "Motivated and detail-oriented Full-Stack Web Developer with expertise in PHP, Laravel, and modern frontend technologies. Skilled in building responsive, user-friendly web applications and e-commerce platforms. Strong problem-solving abilities with a focus on writing clean, maintainable code and delivering high-quality solutions that meet client needs.",
  email: "muhammadfaizan01234567@gmail.com",
  secondaryEmail: "muhammadfaizan01234567@gmail.com",
  phone: "0302 2679431",
  formattedPhone: "+92 302 2679431",
  whatsapp: "https://wa.me/923022679431",
  location: "Karachi, Pakistan",
  github: "https://github.com/faizan-dev",
  linkedin: "https://linkedin.com/in/muhammad-faizan-jokhio-024a36374",
};

export const heroStats = [
  { value: 15, suffix: "+", label: "Projects Completed" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 3, suffix: "rd", label: "Semester Aptech HDSE" },
];

export const aboutStats = [
  { value: 100, suffix: "%", label: "Clean Code & Quality" },
  { value: 99, suffix: "%", label: "On-Time Delivery" },
  { value: 10, suffix: "+", label: "Core Web Technologies" },
];

export const projects: Project[] = [
  {
    slug: "orbexa-solar",
    title: "Orbexa Solar",
    category: "Energy Management Platform",
    year: "2025",
    role: "Full Stack Architecture (Laravel & MySQL)",
    client: "Orbexa CleanTech",
    services: ["Laravel", "MySQL", "REST APIs", "Live Analytics", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80",
    summary: "Full-stack solar energy management platform with real-time monitoring and smart reporting.",
    overview:
      "A comprehensive full-stack solar energy management platform built using Laravel, MySQL, and modern responsive frontend design. Features include live photovoltaic system monitoring, performance analytics, fault detection, and automated smart reporting for energy managers.",
    featured: true,
  },
  {
    slug: "the-elite-attorney",
    title: "The Elite Attorney",
    category: "Legal Practice & Case Tracking",
    year: "2025",
    role: "Full Stack Web Application",
    client: "Elite Legal Associates",
    services: ["PHP / Laravel", "MySQL", "Authentication", "Case Management", "CRUD Workflows"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80",
    summary: "Law firm web management system featuring case tracking, client portals, and online consultations.",
    overview:
      "A tailored web application designed for law firm practice management. Features client onboarding, case milestone tracking, appointment scheduling, document records, and secure consultation request processing with role-based access control.",
    featured: true,
  },
  {
    slug: "quick-snack",
    title: "Quick Snack",
    category: "E-Commerce & Food Ordering",
    year: "2024",
    role: "E-Commerce Web Application",
    client: "Quick Snack Foods",
    services: ["Laravel / PHP", "JavaScript ES6", "Cart & Checkout", "Order Management", "Responsive UI"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&auto=format&fit=crop&q=80",
    summary: "Interactive food ordering platform with fast checkout and real-time backend order lifecycle.",
    overview:
      "An interactive e-commerce food ordering web application with responsive UI, dynamic menu categorization, shopping cart state management, and an end-to-end secure backend order processing and dispatch pipeline.",
    featured: true,
  },
  {
    slug: "apex-ecommerce",
    title: "Apex E-Commerce Store",
    category: "Web & E-Commerce Store",
    year: "2024",
    role: "Full Stack & Storefront Development",
    client: "Apex Retail Co.",
    services: ["WordPress", "Shopify", "Laravel API", "Payment Gateway", "MySQL"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    summary: "Modern e-commerce platform with catalog filters, custom checkout flows, and admin dashboard.",
    overview:
      "A fast, high-converting digital storefront built with attention to UI clarity, product filtering, inventory synchronization, secure checkout, and full responsive mobile optimization.",
    featured: true,
  },
];

export const marqueeGallery = [
  {
    id: "g1",
    title: "Orbexa Solar Platform",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80",
    category: "Laravel SaaS",
  },
  {
    id: "g2",
    title: "The Elite Attorney",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
    category: "Web Portal",
  },
  {
    id: "g3",
    title: "Quick Snack E-Commerce",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
    category: "Food Ordering",
  },
  {
    id: "g4",
    title: "Apex Retail Store",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    category: "E-Commerce",
  },
  {
    id: "g5",
    title: "RESTful API Engine",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    category: "Backend API",
  },
  {
    id: "g6",
    title: "Database Architecture",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
    category: "MySQL & SQL",
  },
  {
    id: "g7",
    title: "Modern Responsive UI",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    category: "Frontend Web",
  },
  {
    id: "g8",
    title: "WordPress / Shopify",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    category: "CMS Solutions",
  },
];

export const stack = [
  {
    name: "PHP & Laravel",
    role: "Backend & MVC",
    initials: "Lv",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/laravel/laravel.png",
    color: "#ff2d20",
    description: "Robust MVC architecture, Eloquent ORM, Blade templating, authentication, and REST APIs.",
  },
  {
    name: "MySQL & SQL",
    role: "Database Systems",
    initials: "Db",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mysql/mysql.png",
    color: "#00758f",
    description: "Normalized relational database design, query optimization, indexing, and CRUD operations.",
  },
  {
    name: "JavaScript & ES6+",
    role: "Frontend Dynamics",
    initials: "Js",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png",
    color: "#f7df1e",
    description: "Modern asynchronous JS, DOM manipulation, interactive state, and API integrations.",
  },
  {
    name: "React & Angular",
    role: "Frontend Frameworks",
    initials: "Re",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png",
    color: "#61dafb",
    description: "Component-based architecture, reactive UI, clean props management, and single-page applications.",
  },
  {
    name: "Tailwind & Bootstrap",
    role: "Styling & Responsive UI",
    initials: "Tw",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/tailwind/tailwind.png",
    color: "#38bdf8",
    description: "Mobile-first responsive layouts, utility design systems, CSS3 animations, and sleek dark modes.",
  },
  {
    name: "WordPress & Shopify",
    role: "CMS & E-Commerce",
    initials: "Wp",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/wordpress/wordpress.png",
    color: "#21759b",
    description: "Theme customization, store setup, payment gateway integrations, and client management.",
  },
  {
    name: "Git & GitHub",
    role: "Version Control",
    initials: "Git",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png",
    color: "#f05032",
    description: "Branching strategies, collaborative workflows, version tracking, and deployment pipelines.",
  },
  {
    name: "REST APIs & Postman",
    role: "API Engineering",
    initials: "Api",
    icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png",
    color: "#10b981",
    description: "Building, documenting, and testing secure JSON RESTful endpoints with authentication.",
  },
];

export const experience = [
  {
    title: "Freelance Full Stack Developer",
    company: "Independent Freelance",
    year: "2024 - Present",
    location: "Karachi, Pakistan (Remote / Hybrid)",
    description:
      "Designed, developed, and deployed full-stack web applications and e-commerce platforms. Built and integrated RESTful APIs, custom database features, and secure authentication systems. Delivered end-to-end scalable solutions with a focus on performance and client satisfaction.",
  },
  {
    title: "Web & E-Commerce Developer",
    company: "Client Solutions & Projects",
    year: "2024 - 2025",
    location: "Karachi, Pakistan",
    description:
      "Created high-converting e-commerce web applications, custom business portals, and CMS storefronts with responsive UI, real-time cart handling, and secure checkout workflows.",
  },
];

export const education = [
  {
    degree: "Higher Diploma in Software Engineering (HDSE)",
    institution: "Aptech Computer Education",
    year: "2025 - Present",
    status: "Completed 2nd Semester | Currently in 3rd Semester",
    description: "Deep dive into Full-Stack Software Engineering, Object-Oriented Programming, Database Design, and Enterprise Web Development.",
  },
  {
    degree: "Matriculation (Science)",
    institution: "Board of Secondary Education, Karachi",
    year: "2022",
    status: "Completed",
    description: "Solid foundation in Mathematics, Computer Science, and Analytical Sciences.",
  },
];

export const achievements = [
  {
    title: "Winner – Internal Vision Competition",
    organization: "Aptech Computer Education",
    badge: "1st Place Award",
    description: "Awarded top position for outstanding web project development and creative software architecture.",
  },
  {
    title: "Selected – External Vision Competition",
    organization: "Inter-Institute Competition",
    badge: "Institute Representative",
    description: "Project selected to represent the institute in prestigious external showcase competitions.",
  },
  {
    title: "Code Quality & Innovation Recognition",
    organization: "Academic & Freelance Projects",
    badge: "Honors",
    description: "Recognized for strong problem-solving skills, clean MVC architecture, and continuous innovation in web platforms.",
  },
];

export const services = [
  {
    number: "01",
    title: "Full-Stack Web Development",
    tagline: "Custom Laravel & PHP Solutions",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    description:
      "Custom web applications built with Laravel and PHP featuring solid MVC structure, secure authentication, role permissions, and scalable database schemas.",
    includes: [
      "Custom Laravel Web Applications",
      "RESTful API Development & Integration",
      "MySQL Database Design & Optimization",
      "Secure Auth & Role-Based Permissions",
    ],
  },
  {
    number: "02",
    title: "E-Commerce Development",
    tagline: "Stores That Drive Sales",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    description:
      "End-to-end e-commerce solutions from custom Laravel web stores to WordPress and Shopify setups with fluid checkout, cart state, and order tracking.",
    includes: [
      "Custom Laravel E-Commerce Systems",
      "WordPress & WooCommerce Customization",
      "Shopify Storefront Setup",
      "Payment Gateways & Order Management",
    ],
  },
  {
    number: "03",
    title: "Frontend & Responsive UI",
    tagline: "Fast, Pixel-Perfect Experiences",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    description:
      "Clean, modern, and high-performance interfaces built with HTML5, CSS3, JavaScript (ES6+), React, Tailwind CSS, and Bootstrap that adapt seamlessly to all screen sizes.",
    includes: [
      "Mobile-First Responsive Layouts",
      "Tailwind CSS & Modern Utility Design",
      "React & Component Architecture",
      "Smooth Micro-Animations & Interactivity",
    ],
  },
  {
    number: "04",
    title: "API & Database Engineering",
    tagline: "Reliable & Scalable Backends",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
    description:
      "Scalable REST API endpoints and normalized database structures tailored for high throughput, data integrity, and third-party integrations.",
    includes: [
      "RESTful API Endpoints & Postman Specs",
      "MySQL Schema Design & Indexing",
      "CRUD Operations & Data Validation",
      "Third-Party Service Integration",
    ],
  },
];

export const process = [
  {
    number: "01",
    title: "Requirement & Architecture",
    body: "We discuss your project goals, workflows, and database needs to architect a clean, scalable full-stack roadmap.",
  },
  {
    number: "02",
    title: "Develop & Integrate",
    body: "I build the backend logic, REST APIs, and modern responsive UI with clean code, secure authentication, and rigorous testing.",
  },
  {
    number: "03",
    title: "Deploy & Support",
    body: "I deploy your application to production servers, ensure database optimization, and provide ongoing support and feature updates.",
  },
];

export const faqs = [
  {
    q: "What technologies do you specialize in?",
    a: "I specialize in Full-Stack Web Development using PHP, Laravel, MySQL, RESTful APIs, JavaScript (ES6), React, Tailwind CSS, Bootstrap, as well as WordPress and Shopify e-commerce platforms.",
  },
  {
    q: "Can you build custom e-commerce web applications?",
    a: "Yes! I build custom full-stack e-commerce platforms (with product catalogs, shopping carts, order pipelines, and payment integrations) as well as WordPress and Shopify stores.",
  },
  {
    q: "Are your web applications mobile responsive and fast?",
    a: "Absolutely. Every project is built mobile-first with clean semantic HTML, optimized database queries, fast load times, and fluid responsive design.",
  },
  {
    q: "How can we start working together?",
    a: "You can reach out via the contact form, send an email to muhammadfaizan01234567@gmail.com, or call/WhatsApp me directly at 0302 2679431. I will respond promptly.",
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "Faizan delivered our web platform with exceptional attention to detail and rock-solid backend functionality. His Laravel and database skills are outstanding!",
    name: "Orbexa CleanTech Team",
    title: "Project Stakeholder",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Super responsive and wrote very clean, maintainable code. The legal management system was delivered ahead of schedule with zero hassle.",
    name: "Elite Legal Associates",
    title: "Managing Partner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "The food ordering app is fast, responsive, and handles orders effortlessly. Great problem-solving skills and communication throughout.",
    name: "Quick Snack Foods",
    title: "Operations Lead",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

export const testimonial = testimonials[0];

export const socials = [
  { name: "GitHub", href: "https://github.com/faizan-dev", handle: "faizan-dev" },
  { name: "LinkedIn", href: "https://linkedin.com/in/muhammad-faizan-jokhio-024a36374", handle: "muhammad-faizan-jokhio" },
  { name: "Email", href: "mailto:muhammadfaizan01234567@gmail.com", handle: "muhammadfaizan01234567@gmail.com" },
  { name: "Phone / WhatsApp", href: "https://wa.me/923022679431", handle: "+92 302 2679431" },
];
