export const profile = {
  name: "Jay Patrick Cano",
  title: "Full-Stack Engineer & Open-Source Developer",
  roles: ["Full-Stack Engineer", "Software Developer", "Open-Source Maintainer"],
  availability: "Available for Freelance & Collaborations",
  location: "Maasin City, Southern Leyte, Philippines",
  email: "0xp47.dev@gmail.com",
  github: "https://github.com/0xp47",
  linkedin: "https://www.linkedin.com/in/0xp47",
  instagram: "https://www.instagram.com/0xp47",
  facebook: "https://www.facebook.com/0xp47",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const heroStats = [
  { value: 50, suffix: "+", label: "Public Repositories" },
  { value: 60, suffix: "+", label: "GitHub Stars" },
  { value: 95, suffix: "%+", label: "Lighthouse Score" },
];

export const aboutHighlights = [
  {
    title: "Software & System Design",
    description: "I don't just build websites; I design and develop cross-platform mobile apps, custom business software, and automated backend systems.",
    icon: "Terminal",
  },
  {
    title: "Open-Source Leadership",
    description: "I am the founder of GroundZero, a global open-source developer community connecting contributors worldwide to build utilities and packages.",
    icon: "GitMerge",
  },
  {
    title: "Tech Entrepreneurship",
    description: "As an entrepreneur, I co-founded CodeTriad Solutions and have spearheaded various software ventures, building scalable web platforms and custom digital products.",
    icon: "Briefcase",
  },
];

export const projects = [
  {
    name: "LeafSense Mobile",
    category: "Mobile",
    description:
      "A mobile application for plant disease and pest detection using camera scans and image analysis. Features speech recognition, offline storage, location services, and push notifications.",
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "React Query"],
    image: "/projects/leafsense.png",
    github: "https://github.com/0xp47/LeafSense-Mobile",
    live: "https://github.com/0xp47/LeafSense-Mobile",
    isPrivate: true,
  },
  {
    name: "POS and Inventory System",
    category: "Web",
    description:
      "A modern, lightweight point-of-sale and inventory system with features for dynamic store branding, printed barcode labels, and purchase order generation.",
    stack: ["Next.js", "TypeScript", "Prisma", "SQLite", "Tailwind CSS", "Zustand"],
    image: "/projects/jc-pos.png",
    github: "https://github.com/0xp47/jc-pos-system",
    live: "https://github.com/0xp47/jc-pos-system",
    isPrivate: true,
  },
  {
    name: "COVID-19 Contact Tracing",
    category: "Web",
    description:
      "A web application designed for establishment visitor logging in the Philippines, featuring printable QR card generation, scanner integration, and admin reporting.",
    stack: ["PHP", "MySQL", "JavaScript", "HTML", "SCSS"],
    image: "/projects/covid-tracing.png",
    github: "https://github.com/0xp47/Covid-19-Contact-Tracing-System-Web-App-with-QR-Code-Scanning-using-PHP",
    live: "https://github.com/0xp47/Covid-19-Contact-Tracing-System-Web-App-with-QR-Code-Scanning-using-PHP",
  },
  {
    name: "HireHub PH",
    category: "Web",
    description:
      "A job portal platform catering to job providers and job seekers with role-based dashboard features and application workflows.",
    stack: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
    image: "/projects/hirehub.png",
    github: "https://github.com/0xp47/HireHub-PH",
    live: "https://Hire-Hub.000webhostapp.com",
  },
];

export const projectFilters = ["All", "Web", "Mobile"];

export const experience = [
  {
    company: "GroundZero Community",
    position: "Founder & Lead Maintainer",
    duration: "2024 - Present",
    description:
      "Founded and lead GroundZero, a global open-source community of developers collaborating on software projects, system architecture, and tech tools.",
  },
  {
    company: "CodeTriad Solutions",
    position: "Co-Founder & Lead Developer",
    duration: "2023 - Present",
    description:
      "Co-founded a technology startup, leading the design and development of modern web applications, custom software products, and high-performance digital solutions.",
  },
  {
    company: "Freelance Full‑Stack Engineer",
    position: "Independent Developer",
    duration: "2020 - 2023",
    description:
      "Built custom web portals, cross-platform mobile utilities, and business integration scripts for local and international clients.",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Cloud",
    items: ["Docker", "AWS", "Vercel", "Edge Runtime"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Figma", "Linux"],
  },
];

export const heroDescription = "I am a developer and entrepreneur building custom software, cross-platform mobile apps, and business automations to solve real-world operational problems.";
export const heroAboutSegment = "I focus on clean architecture and solid features, helping businesses digitize their workflows with tailored software.";
export const heroWorkSegment = "A selection of projects showing how I approach web, mobile, and custom system development.";

export const aboutDescription = "I build custom software, mobile applications, and automated workflows. Beyond writing code, I am an entrepreneur and open-source creator focused on building useful business products and leading global developer collaborations.";

export const contactDescription = "I am open to freelance projects, custom business automations, full-stack collaborations, and software partnerships.";

export const services = [
  {
    title: "Full-Stack Web Apps",
    description: "Developing responsive, high-performance web applications using modern frameworks like React and Next.js, backed by robust server-side architectures.",
    icon: "Globe",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "SPA/SSR"],
  },
  {
    title: "Mobile App Development",
    description: "Building cross-platform mobile utilities and client applications with React Native and Expo, delivering native performance and clean user interfaces.",
    icon: "Smartphone",
    tags: ["React Native", "Expo", "iOS & Android", "Offline Sync", "Push Alerts"],
  },
  {
    title: "Automation & Workflows",
    description: "Creating custom automation scripts, automated database syncs, background cron jobs, and API integrations to optimize business operations.",
    icon: "Cpu",
    tags: ["API Integrations", "Cron Jobs", "Webhooks", "Scripting", "Node.js"],
  },
  {
    title: "API & Backend Systems",
    description: "Designing scalable database schemas (PostgreSQL, MongoDB) and secure, optimized RESTful or GraphQL APIs to power client applications.",
    icon: "Server",
    tags: ["PostgreSQL", "MongoDB", "Express", "Supabase", "DB Schema Design"],
  },
];
