import projectsData from "./projects.json";
import githubStats from "./github-stats.json";

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
  { label: "Blog", href: "#blog" },
  { label: "Experience", href: "#experience" },
  { label: "Collab", href: "#contact" },
];

export const heroStats = [
  { value: githubStats.totalProjects, suffix: "+", label: "Projects Built" },
  { value: githubStats.publicRepos, suffix: "+", label: "Open-Source Repos" },
  { value: githubStats.totalStars, suffix: "+", label: "GitHub Stars" },
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

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  description: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-i-build-open-source",
    title: "Why I Build Open Source",
    date: "Jun 12, 2026",
    readingTime: "4 min read",
    description: "A reflection on why contributing to open source has shaped the way I write software and build communities.",
    content: `Open source has always been more than just publishing code for me — it's a philosophy of building in public and learning from the collective intelligence of developers around the world.\n\nWhen I founded GroundZero, my goal was simple: create a space where developers could collaborate on real projects, not just tutorials. The result has been incredible. Contributors from different continents bring unique perspectives, and every pull request teaches me something new.\n\n## The Real Benefits\n\n**1. Better Code Quality** — When your code is public, you naturally write cleaner, more documented code. You think about edge cases because someone else will find them.\n\n**2. Community Building** — Open source attracts people who care. The contributors who join your project are invested in its success, and that energy is contagious.\n\n**3. Career Growth** — My open-source work has led to freelance contracts, speaking opportunities, and connections I never expected.\n\n## What I've Learned\n\nThe biggest lesson? Ship early, iterate often. Your first version doesn't need to be perfect — it needs to exist. The community will help you shape it into something great.\n\nIf you're considering starting an open-source project, my advice is simple: solve a problem you actually have. The best tools come from real needs, not imagined ones.`,
    tags: ["Open Source", "Community", "Developer Life"],
  },
  {
    slug: "my-stack-in-2026",
    title: "My Tech Stack in 2026",
    date: "Jul 5, 2026",
    readingTime: "5 min read",
    description: "A breakdown of the tools, frameworks, and services I use daily as a full-stack developer and entrepreneur.",
    content: `Every year, the JavaScript ecosystem evolves. Here's what I'm using in 2026 and why each tool earned its place in my workflow.\n\n## Frontend\n\n**Next.js** remains my go-to framework. The App Router has matured significantly, and static export works flawlessly for portfolio sites and marketing pages. Paired with **TypeScript** and **Tailwind CSS**, I can prototype ideas in hours instead of days.\n\n**Framer Motion** handles all my animations. The declarative API makes complex choreography feel effortless, and the bundle size is reasonable for what you get.\n\n## Backend\n\n**Node.js + Express** for traditional REST APIs. **Supabase** when I need a quick Postgres backend with authentication baked in. For more complex systems, I reach for raw **PostgreSQL** with Drizzle ORM.\n\n## DevOps & Deployment\n\n**GitHub Actions** for CI/CD — it's free for public repos and integrates seamlessly. **Vercel** for frontend deployments. **Docker** when I need reproducible environments.\n\n## Mobile\n\n**React Native + Expo** is unbeatable for cross-platform mobile development. The Expo ecosystem has improved dramatically, and EAS Build handles the painful parts of app store deployment.\n\n## The Philosophy\n\nI don't chase trends. I pick tools that are stable, well-documented, and have strong communities. Boring technology is reliable technology.`,
    tags: ["Tech Stack", "Web Dev", "Tools"],
  },
  {
    slug: "lessons-from-freelancing",
    title: "5 Lessons from 3 Years of Freelancing",
    date: "Jun 3, 2026",
    readingTime: "6 min read",
    description: "Hard-earned insights from building software for clients across different industries and countries.",
    content: `Freelancing taught me more about software development than any course or bootcamp ever could. Here are five lessons I wish I knew from day one.\n\n## 1. Communication > Code\n\nThe best code in the world means nothing if your client doesn't understand what you built or why. I learned to write clear project updates, create simple demos, and ask the right questions before writing a single line of code.\n\n## 2. Scope Creep is Real\n\nEvery project starts with a clear brief. Then comes \"just one more feature.\" I learned to define deliverables upfront, use milestone-based payments, and say no when a request falls outside the agreed scope.\n\n## 3. Underpromise, Overdeliver\n\nIf I think something will take 3 days, I quote 5. The extra buffer accounts for bugs, revisions, and life happening. Delivering early feels great. Delivering late destroys trust.\n\n## 4. Invest in Your Process\n\nI built reusable templates, component libraries, and deployment scripts that saved me hundreds of hours across projects. The time you invest in tooling pays dividends.\n\n## 5. Choose Clients Carefully\n\nNot every project is worth taking. I learned to evaluate clients based on communication style, budget expectations, and project clarity. A red flag in the discovery call is a red flag in the project.\n\n## Looking Forward\n\nFreelancing gave me the foundation to co-found CodeTriad Solutions. The skills are the same — the scale is bigger.`,
    tags: ["Freelancing", "Career", "Business"],
  },
  {
    slug: "building-scalable-apis",
    title: "Building Scalable APIs: A Practical Guide",
    date: "Jul 1, 2026",
    readingTime: "7 min read",
    description: "Practical patterns and architecture decisions for building APIs that grow with your product.",
    content: `Most APIs start simple — a few endpoints, basic CRUD, maybe some authentication. But as your product grows, the cracks start to show. Here's how I approach API design from day one to avoid painful rewrites later.\n\n## Start with the Schema\n\nBefore writing any endpoint, I design the database schema. Tools like Drizzle ORM or Prisma let you define your schema in code and generate migrations automatically. A well-designed schema prevents 80% of API problems.\n\n## Use Layers\n\nI structure every API with three layers:\n\n- **Routes** — Define endpoints and validate input\n- **Services** — Business logic, completely decoupled from HTTP\n- **Repositories** — Database queries, easily swappable\n\nThis separation means I can test business logic without spinning up a server, and swap databases without touching service code.\n\n## Authentication & Authorization\n\nJWT for stateless auth, refresh tokens for security. I use middleware to verify tokens and attach user context to every request. Role-based access control (RBAC) for authorization — keep it simple until you need something more complex.\n\n## Rate Limiting & Caching\n\nRedis for both. Rate limiting protects your API from abuse. Caching reduces database load. Both are essential for any production API.\n\n## Error Handling\n\nConsistent error responses with proper HTTP status codes. Every error includes a machine-readable code, a human-readable message, and optional details. Your frontend developers will thank you.\n\n## Monitoring\n\nYou can't fix what you can't see. Structured logging, health check endpoints, and request tracing are non-negotiable in production.`,
    tags: ["Backend", "API Design", "Architecture"],
  },
];
