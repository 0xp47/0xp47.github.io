import projectsData from "./projects.json";
import githubStats from "./github-stats.json";
import certificationsData from "./certifications.json";

export const profile = {
  name: "Jay Patrick Cano",
  title: "Full-Stack Engineer & Open-Source Developer",
  roles: ["Full-Stack Engineer", "Software Developer", "Open-Source Maintainer"],
  availability: "Available for Freelance & Collaborations",
  location: "Maasin City, Southern Leyte, Philippines",
  email: "hello@jaypatrickcano.dev",
  github: "https://github.com/0xp47",
  linkedin: "https://www.linkedin.com/in/0xp47",
  instagram: "https://www.instagram.com/0xp47",
  facebook: "https://www.facebook.com/0xp47",
  credly: "https://www.credly.com/users/0xp47/badges",
  anthropic: "https://anthropic.skilljar.com/",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Experience", href: "#experience" },
  { label: "Certs", href: "#certifications" },
  { label: "Collab", href: "#contact" },
];

export const heroStats = [
  { value: githubStats.totalProjects, suffix: "+", label: "Projects Built" },
  { value: githubStats.publicRepos, suffix: "+", label: "Open-Source Repos" },
  { value: githubStats.totalStars, suffix: "+", label: "GitHub Stars" },
];

export const sectionMeta = {
  projects: {
    eyebrow: "Projects",
    title: "Everything I've built — from apps to automation tools.",
  },
  blog: {
    eyebrow: "Blog",
    title: "Thoughts, lessons, and things I've learned along the way.",
  },
  about: {
    eyebrow: "About",
    title: "A little about me and what I work on.",
  },
  services: {
    eyebrow: "Services",
    title: "What I offer to help your business grow.",
  },
  experience: {
    eyebrow: "Experience",
    title: "A history of building products and platforms.",
  },
  certifications: {
    eyebrow: "Certifications",
    title: "Verified credentials from Anthropic and Cisco Networking Academy.",
  },
  contact: {
    eyebrow: "Collab",
    title: "Let's build something together.",
  },
};

export const aboutHighlights = [
  {
    title: "Full-Stack Engineering",
    description: "Building responsive web applications, cross-platform mobile apps, and robust backend systems with modern tools.",
    icon: "Terminal",
  },
  {
    title: "GroundZero Community",
    description: "An open-source initiative where developers connect, collaborate on projects, and build useful software together.",
    icon: "GitMerge",
  },
  {
    title: "Business & Entrepreneurship",
    description: "Studying business and entrepreneurship to learn how to design software that delivers real practical value.",
    icon: "Briefcase",
  },
];

export const projects = projectsData;

export const projectFilters = ["All", "Web", "Mobile", "Tool", "AI/ML"];

export const experience = [
  {
    company: "GroundZero Community",
    position: "Founder & Maintainer",
    duration: "2024 - Present",
    description:
      "Started an early-stage open-source developer initiative where builders connect, share knowledge, and collaborate on software tools together.",
    tags: ["Open Source", "Community", "Architecture"],
  },
  {
    company: "CodeTriad Solutions",
    position: "Co-Founder & Developer",
    duration: "2023 - Present",
    description:
      "Co-founded a development initiative focusing on building modern web applications, custom software utilities, and exploring client-focused digital solutions.",
    tags: ["SaaS", "Next.js", "Product Design"],
  },
  {
    company: "Freelance Full‑Stack Engineer",
    position: "Independent Developer",
    duration: "2020 - 2023",
    description:
      "Built custom web portals, cross-platform mobile utilities, and business integration scripts for local and international clients.",
    tags: ["Full‑Stack", "API Integration", "Mobile Apps"],
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

export const heroDescription = "Aspiring full-stack engineer building custom software, mobile applications, and automated workflows while learning business and entrepreneurship.";
export const heroAboutSegment = "I focus on clean architecture, practical features, and continuously learning as an aspiring full-stack developer.";
export const heroWorkSegment = "A selection of projects showing how I approach web, mobile, and custom system development.";

export const aboutDescription = "I am an aspiring full-stack engineer focused on building practical software, cross-platform mobile applications, and automated workflows. My priority is continuous learning—deepening my skills in clean architecture, resilient APIs, and intuitive user interfaces through hands-on projects.\n\nAlongside software development, I am learning business and entrepreneurship to understand how technology can solve real-world problems. I also founded GroundZero Community, an open-source initiative where developers collaborate, share knowledge, and build tools together.";

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
  {
    title: "Custom Software Development",
    description: "Designing and building custom desktop utilities, specialized database systems, and bespoke software solutions tailored to solve specific business problems.",
    icon: "Terminal",
    tags: ["Desktop Utilities", "Bespoke Software", "Systems Integration", "Database Design"],
  },
  {
    title: "IT & Tech Consulting",
    description: "Advising startups on software architecture, technology stack selection, scalable product development, and open-source strategy.",
    icon: "Briefcase",
    tags: ["Tech Architecture", "Tech Stack Audit", "MVP Development", "Open-Source"],
  },
];

export const certifications = certificationsData;

export * from "./blog-posts";
