import projectsData from "./projects.json";
import githubStats from "./github-stats.json";

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
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Experience", href: "#experience" },
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
  contact: {
    eyebrow: "Collab",
    title: "Let's build something together.",
  },
};

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

export const projects = projectsData;

export const projectFilters = ["All", "Web", "Mobile", "Tool", "AI/ML"];

export const experience = [
  {
    company: "GroundZero Community",
    position: "Founder & Lead Maintainer",
    duration: "2024 - Present",
    description:
      "Founded and lead GroundZero, a global open-source community of developers collaborating on software projects, system architecture, and tech tools.",
    tags: ["Open Source", "Community", "Architecture"],
  },
  {
    company: "CodeTriad Solutions",
    position: "Co-Founder & Lead Developer",
    duration: "2023 - Present",
    description:
      "Co-founded a technology startup, leading the design and development of modern web applications, custom software products, and high-performance digital solutions.",
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

export * from "./blog-posts";
