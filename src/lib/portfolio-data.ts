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
  dateDisplay: string;
  readingTime: string;
  description: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-i-build-open-source",
    title: "Why I Build Open Source",
    date: "2026-06-12",
    dateDisplay: "Jun 12, 2026",
    readingTime: "4 min read",
    description: "A reflection on why contributing to open source has shaped the way I write software and build communities.",
    content: `Open source has always been more than just publishing code for me — it's a philosophy of building in public and learning from the collective intelligence of developers around the world.\n\nWhen I founded GroundZero, my goal was simple: create a space where developers could collaborate on real projects, not just tutorials. The result has been incredible. Contributors from different continents bring unique perspectives, and every pull request teaches me something new.\n\n## The Real Benefits\n\n**1. Better Code Quality** — When your code is public, you naturally write cleaner, more documented code. You think about edge cases because someone else will find them.\n\n**2. Community Building** — Open source attracts people who care. The contributors who join your project are invested in its success, and that energy is contagious.\n\n**3. Career Growth** — My open-source work has led to freelance contracts, speaking opportunities, and connections I never expected.\n\n## What I've Learned\n\nThe biggest lesson? Ship early, iterate often. Your first version doesn't need to be perfect — it needs to exist. The community will help you shape it into something great.\n\nIf you're considering starting an open-source project, my advice is simple: solve a problem you actually have. The best tools come from real needs, not imagined ones.`,
    tags: ["Open Source", "Community", "Developer Life"],
  },
  {
    slug: "my-stack-in-2026",
    title: "My Tech Stack in 2026",
    date: "2026-07-05",
    dateDisplay: "Jul 5, 2026",
    readingTime: "5 min read",
    description: "A breakdown of the tools, frameworks, and services I use daily as a full-stack developer and entrepreneur.",
    content: `Every year, the JavaScript ecosystem evolves. Here's what I'm using in 2026 and why each tool earned its place in my workflow.\n\n## Frontend\n\n**Next.js** remains my go-to framework. The App Router has matured significantly, and static export works flawlessly for portfolio sites and marketing pages. Paired with **TypeScript** and **Tailwind CSS**, I can prototype ideas in hours instead of days.\n\n**Framer Motion** handles all my animations. The declarative API makes complex choreography feel effortless, and the bundle size is reasonable for what you get.\n\n## Backend\n\n**Node.js + Express** for traditional REST APIs. **Supabase** when I need a quick Postgres backend with authentication baked in. For more complex systems, I reach for raw **PostgreSQL** with Drizzle ORM.\n\n## DevOps & Deployment\n\n**GitHub Actions** for CI/CD — it's free for public repos and integrates seamlessly. **Vercel** for frontend deployments. **Docker** when I need reproducible environments.\n\n## Mobile\n\n**React Native + Expo** is unbeatable for cross-platform mobile development. The Expo ecosystem has improved dramatically, and EAS Build handles the painful parts of app store deployment.\n\n## The Philosophy\n\nI don't chase trends. I pick tools that are stable, well-documented, and have strong communities. Boring technology is reliable technology.`,
    tags: ["Tech Stack", "Web Dev", "Tools"],
  },
  {
    slug: "lessons-from-freelancing",
    title: "5 Lessons from 3 Years of Freelancing",
    date: "2026-06-03",
    dateDisplay: "Jun 3, 2026",
    readingTime: "6 min read",
    description: "Hard-earned insights from building software for clients across different industries and countries.",
    content: `Freelancing taught me more about software development than any course or bootcamp ever could. Here are five lessons I wish I knew from day one.\n\n## 1. Communication > Code\n\nThe best code in the world means nothing if your client doesn't understand what you built or why. I learned to write clear project updates, create simple demos, and ask the right questions before writing a single line of code.\n\n## 2. Scope Creep is Real\n\nEvery project starts with a clear brief. Then comes \"just one more feature.\" I learned to define deliverables upfront, use milestone-based payments, and say no when a request falls outside the agreed scope.\n\n## 3. Underpromise, Overdeliver\n\nIf I think something will take 3 days, I quote 5. The extra buffer accounts for bugs, revisions, and life happening. Delivering early feels great. Delivering late destroys trust.\n\n## 4. Invest in Your Process\n\nI built reusable templates, component libraries, and deployment scripts that saved me hundreds of hours across projects. The time you invest in tooling pays dividends.\n\n## 5. Choose Clients Carefully\n\nNot every project is worth taking. I learned to evaluate clients based on communication style, budget expectations, and project clarity. A red flag in the discovery call is a red flag in the project.\n\n## Looking Forward\n\nFreelancing gave me the foundation to co-found CodeTriad Solutions. The skills are the same — the scale is bigger.`,
    tags: ["Freelancing", "Career", "Business"],
  },
  {
    slug: "building-scalable-apis",
    title: "Building Scalable APIs: A Practical Guide",
    date: "2026-07-01",
    dateDisplay: "Jul 1, 2026",
    readingTime: "7 min read",
    description: "Practical patterns and architecture decisions for building APIs that grow with your product.",
    content: `Most APIs start simple — a few endpoints, basic CRUD, maybe some authentication. But as your product grows, the cracks start to show. Here's how I approach API design from day one to avoid painful rewrites later.\n\n## Start with the Schema\n\nBefore writing any endpoint, I design the database schema. Tools like Drizzle ORM or Prisma let you define your schema in code and generate migrations automatically. A well-designed schema prevents 80% of API problems.\n\n## Use Layers\n\nI structure every API with three layers:\n\n- **Routes** — Define endpoints and validate input\n- **Services** — Business logic, completely decoupled from HTTP\n- **Repositories** — Database queries, easily swappable\n\nThis separation means I can test business logic without spinning up a server, and swap databases without touching service code.\n\n## Authentication & Authorization\n\nJWT for stateless auth, refresh tokens for security. I use middleware to verify tokens and attach user context to every request. Role-based access control (RBAC) for authorization — keep it simple until you need something more complex.\n\n## Rate Limiting & Caching\n\nRedis for both. Rate limiting protects your API from abuse. Caching reduces database load. Both are essential for any production API.\n\n## Error Handling\n\nConsistent error responses with proper HTTP status codes. Every error includes a machine-readable code, a human-readable message, and optional details. Your frontend developers will thank you.\n\n## Monitoring\n\nYou can't fix what you can't see. Structured logging, health check endpoints, and request tracing are non-negotiable in production.`,
    tags: ["Backend", "API Design", "Architecture"],
  },
  {
    slug: "learning-how-to-learn",
    title: "Learning How to Learn: The Ultimate Developer Skill",
    date: "2026-07-06",
    dateDisplay: "Jul 6, 2026",
    readingTime: "5 min read",
    description: "My approach to continuous learning, managing information overload, and staying relevant in a rapidly changing software ecosystem.",
    content: `In the software industry, your current knowledge has a half-life of just a few years. New frameworks, languages, and paradigms emerge constantly. Survival as a developer doesn't depend on what you currently know — it depends on how fast you can learn what you don't.\n\nHere are the core principles that have shaped how I learn new technical skills and stay adaptive without burning out.\n\n## 1. Avoid the "Tutorial Hell"\n\nIt is easy to get caught in the loop of reading documentation, watching courses, and copying code step-by-step. This feels like learning, but it is passive. You only truly begin to learn when you close the tutorial and start building from scratch.\n\nMy rule is the **1:2 Ratio**: for every 1 hour of theoretical learning, spend 2 hours writing raw code, making errors, and debugging them yourself.\n\n## 2. Learn Just-in-Time, Not Just-in-Case\n\nAttempting to learn every new framework that trends on GitHub is a recipe for mental exhaustion. I focus on **Just-In-Time (JIT) Learning** — picking up tools, libraries, or architectures only when a specific project or problem demands them.\n\nThis keeps your learning highly context-driven, meaning you retain information much better because you are applying it to solve a concrete task.\n\n## 3. Master the Fundamentals First\n\nFrameworks change, but the underlying computer science fundamentals remain the same. If you understand how the DOM works, React or Next.js is easy to pick up. If you understand databases, query optimization, and REST/gRPC protocols, swapping from Express to FastAPI or Go is straightforward.\n\nPrioritize mastering concepts over syntactic sugar: HTTP protocols, design patterns, data structures, and system architectures.\n\n## 4. Embrace the "Fail Fast" Mentality\n\nWhen learning a new technology, write small, throwaway scripts. Break the code purposefully to see what error messages look like. Understanding how a system behaves when it fails is often more valuable than seeing it run smoothly.\n\n## 5. Share What You Learn\n\nThe highest level of learning is teaching. Writing a blog post, explaining a concept to a peer, or contributing to open source forces you to structure your thoughts and exposes gaps in your own understanding. If you can't explain it simply, you don't understand it well enough.`,
    tags: ["Learning", "Developer Life", "Productivity"],
  },
  {
    slug: "ai-assisted-coding",
    title: "AI-Assisted Coding: How to Pair Program with AI in 2026",
    date: "2026-07-06",
    dateDisplay: "Jul 6, 2026",
    readingTime: "6 min read",
    description: "My guidelines and best practices for leveraging AI coding assistants as force multipliers without losing critical problem-solving skills.",
    content: `AI-powered coding assistants have transformed how software is written. Today, they are no longer just advanced autocomplete tools — they act as collaborative pair programmers that can draft components, write tests, and debug errors in seconds.\n\nHowever, using AI effectively requires a strategy. If you rely on it blindly, you risk introducing subtle bugs, security vulnerabilities, or building codebases you no longer understand. Here is how I collaborate with AI to maximize speed while maintaining high quality.\n\n## 1. Treat AI as a Junior Developer, Not an Oracle\n\nAI is excellent at generating boilerplates, translating code between languages, and writing unit tests. But it lacks context about your business logic, system constraints, and architecture decisions.\n\nNever merge AI-generated code without a thorough line-by-line review. If you don't understand what a block of code does, don't ship it. Ask the AI to explain it, or rewrite it until you do.\n\n## 2. Master the Art of Prompting with Context\n\nThe quality of the AI's output is directly proportional to the context you provide. Instead of asking generic questions like "how do I fetch data in Next.js?", provide:\n- The specific version of the library you are using (e.g. Next.js App Router)\n- Your current code snippet\n- The expected input/output contract\n- Your styling rules (e.g., custom Tailwind theme)\n\nThis forces the assistant to generate drop-in code that fits seamlessly into your codebase.\n\n## 3. Use AI for Debugging and Refactoring\n\nOne of the most powerful use cases for AI is error resolution. When a build fails or a test throws an obscure stack trace, pasting the error alongside the relevant code block often yields the root cause and a working fix in seconds.\n\nSimilarly, when you finish a complex function, ask the AI to refactor it for performance, readability, or edge-case safety. Treat it as an instant code reviewer.\n\n## 4. Don't Let Your Problem-Solving Skills Atrophy\n\nThe greatest danger of AI assistants is the temptation to stop thinking. If you let the AI solve every challenge, you will lose the ability to debug complex systems, design solid architectures, and solve algorithmic puzzles on your own.\n\nWhen faced with a hard problem, try to solve it yourself first. Write down the logic, draw diagrams, and outline the algorithm. Only use AI once you have a clear plan and want to accelerate the typing phase.\n\n## 5. Automate the Boring Parts\n\nUse AI to handle tasks that don't require high-level logical design: generating mock data, writing boilerplate SQL migrations, setting up TS configurations, or writing simple shell scripts. This frees up your cognitive bandwidth to focus on what matters most — system design and product feature logic.`,
    tags: ["AI", "Productivity", "Developer Tools"],
  },
  {
    slug: "github-education-student-pack",
    title: "Leveraging GitHub Education: How It Launched My Student Developer Journey",
    date: "2026-07-07",
    dateDisplay: "Jul 7, 2026",
    readingTime: "7 min read",
    description: "My personal journey of leveraging the GitHub Student Developer Pack's free domains, VPS hosting, testing infrastructure, and premium IDEs to master full-stack engineering.",
    content: `Starting out as a student developer can be daunting. Between web hosting fees, domain registrations, premium API charges, and the learning curve of industrial-grade tooling, the financial barrier to entry for building real-world projects is high. When I was beginning my coding journey, **GitHub Education** acted as a massive catalyst.\n\nThe suite of free resources, cloud credits, and developer tools it provides was the single most valuable program during my studies. Here is how I leveraged the Student Developer Pack to learn, test, and develop my own projects.\n\n## Custom Domains: Launching Real Brands\n\nWhen I was building my first projects, deploying to a generic third-party subdomain (like \`.vercel.app\` or \`.github.io\`) was fine for staging, but I wanted my portfolio and live projects to feel like professional brands. The Student Pack helped me secure free domains from leading registrars:\n- **Namecheap**: Provided me with a free **.me** domain name for a year along with free SSL certificates.\n- **Name.com & .TECH**: Allowed me to secure free domain names with tech-focused extensions like **.tech** and **.dev**.\n\nSetting up custom domains for my personal experiments taught me how to configure DNS zone files, set up record mappings (A, CNAME, TXT), and understand how SSL certificates secure traffic in production.\n\n## VPS & Cloud Hosting: Learning Server Architecture\n\nInstead of simple static page hosting, the Student Pack offers significant cloud credits to deploy virtual private servers (VPS) and custom backend architectures:\n- **DigitalOcean**: Provides up to **$200 in platform credits**. I used this credit to spin up Linux Droplets (VPS) to host my Node.js/Python backend servers, configure PostgreSQL databases, and manage reverse proxies for my database-driven inventory applications.\n- **Microsoft Azure**: Provides **$100 in credits** along with free developer services. This was perfect for learning enterprise cloud concepts, object storage, and serverless compute functions for my server experiments.\n- **Heroku**: Offered credits that allowed me to deploy and scale backend APIs easily, removing the initial operational complexity of managing raw virtual machines.\n\nDeploying on real VPS nodes taught me the basics of SSH authentication, server terminal commands, and resource monitoring under real load.\n\n## Curated List of Essential Pack Benefits\n\nWhile the full catalog contains dozens of partners, here is a breakdown of the most valuable benefits you can claim directly on the official [GitHub Student Developer Pack Page](https://education.github.com/pack):\n\n### 1. Cloud & VPS Hosting Credits\n- **DigitalOcean**: Up to **$200 in platform credits** (valid for 1 year) for new users. This lets you spin up Linux Droplets (VPS) to host custom backend services, reverse proxies, and database instances.\n- **Microsoft Azure**: **$100 in cloud credits** plus access to free developer services (app hosting, storage, AI models) with no credit card required.\n- **Heroku**: **$13 per month in hosting credits** for up to 12 months to deploy and scale managed web applications.\n\n### 2. Free Domain Registrations\n- **Namecheap**: One free **.me** domain name registration for 1 year, complete with a free SSL certificate.\n- **Name.com**: One free domain registration for 1 year with options for premium extensions like **.dev**, **.app**, **.live**, **.studio**, and **.software**.\n\n### 3. Professional IDEs & Environments\n- **JetBrains**: A free renewable 1-year subscription to the entire JetBrains suite of professional IDEs (including WebStorm, PyCharm, IntelliJ IDEA, and Rider).\n- **GitHub Codespaces**: Up to **60 hours of free cloud development time per month**, allowing you to code in containerized environments from any browser.\n- **GitHub Copilot**: Free access to the AI pair programming companion while you are verified.\n\n### 4. Testing, APIs, & Services\n- **BrowserStack**: Free access to 1 parallel session of Automate/App Automate and 30 minutes of Live manual testing per month on real devices.\n- **Termius**: Free access to the Termius Pro SSH client for secure command-line server management.\n- **MongoDB Atlas**: **$50 in cloud database credits** plus free basic cluster access.\n- **Stripe**: Waived transaction fees on the first **$1,000 in card payments** processed through your applications.\n\n## How I Applied & Got Verified within 3 Days\n\nGetting verified is straightforward, even if your school doesn't provide a school-issued \`.edu\` email address. Here is the exact process I used:\n\n1. Logged into my school portal dashboard showing my active student enrollment details.\n2. Took a clear **screenshot of my school student portal** dashboard (making sure the school name, my name, and the current academic term were fully visible).\n3. Submitted a registration request on the [GitHub Education Portal](https://education.github.com) and uploaded the screenshot as official proof of enrollment.\n\nTo my surprise, the approval process was incredibly fast — **GitHub verified and accepted my application within just 3 days**, upgrading my account to GitHub Pro and unlocking access to all the partner benefits.\n\n## Final Thoughts\n\nThe GitHub Student Developer Pack was not just a collection of free software for me; it was the bridge between academic classroom theory and real-world software engineering. By taking advantage of cloud credits, custom domains, professional testing tools, and JetBrains IDEs, I gained the hands-on experience that defined my portfolio and launched my full-stack engineering career.`,
    tags: ["GitHub", "Education", "Developer Tools", "Community"],
  },
  {
    slug: "mobile-only-developer-journey",
    title: "No Laptop? No Problem: How I Learned to Code on My Phone",
    date: "2026-07-07",
    dateDisplay: "Jul 7, 2026",
    readingTime: "8 min read",
    description: "The story of how I started my programming journey using only my Android smartphone, configuring Linux tools, local servers, and databases on the go.",
    content: `When I first decided to learn programming, I faced a major roadblock: I didn't own a laptop or a desktop computer. For many, this would have been a dealbreaker. But I was determined to code, so I turned to the only computer I had in my pocket — my Android smartphone.\n\nLearning to code on a mobile device has its challenges (typing syntax on a touch keyboard is a test of patience), but it is entirely possible if you have the right tools. By combining a terminal emulator, a mobile-optimized code editor, and a local web server suite, I turned my phone into a portable development environment. Here are the three apps that made it happen.\n\n## 1. The Terminal: Termux (via F-Droid)\n\nTo write real applications, you need a terminal environment to run runtime environments, install packages, and manage files. [Termux](https://f-droid.org/packages/com.termux/) is an open-source terminal emulator and Linux environment for Android that requires no root access.\n\nInstead of a sandbox, Termux provides a package manager (\`pkg\` or \`apt\`) that lets you install real developer packages. Through Termux, I installed:\n- **Git**: To clone repositories, manage code branches, and push my projects to GitHub.\n- **Node.js & Python**: To run scripts, build local servers, and execute code command-line programs.\n- **SSH Client**: To connect to remote virtual machines and manage web instances.\n\nHaving a full Linux command line in my hand taught me directories, file structures, shell scripting, and core command line tools before I ever touched a physical computer keyboard.\n\n### Running a Full Linux OS: Ubuntu on Mobile\n\nSometimes, standard Android/Termux environments lack specific library binaries or node modules that require native compilation on a standard Linux layout. To resolve this, I set up a complete **Ubuntu Linux distribution** inside Termux without rooting my phone using the **PRoot** virtualization tool.\n\nHere is the exact setup process I used to get an active Ubuntu environment running:\n\n1. **Install proot-distro** in Termux to manage guest distributions:\n   \`\`\`bash\n   pkg update && pkg install proot-distro -y\n   \`\`\`\n2. **Download and install Ubuntu**:\n   \`\`\`bash\n   proot-distro install ubuntu\n   \`\`\`\n3. **Log into the Ubuntu guest filesystem**:\n   \`\`\`bash\n   proot-distro login ubuntu\n   \`\`\`\n\nOnce inside the Ubuntu container, my shell was upgraded to a standard server-like environment. I could run standard Debian commands, configure users, and install software using the standard \`apt\` manager (e.g. \`apt install build-essential sudo git curl -y\`) to test server configurations exactly as they would run on a production VPS instance in the cloud.\n\n## 2. The Text Editor: Acode (via F-Droid)\n\nWhile you can use terminal editors like nano or vim, writing code on a touch screen requires a visual editor designed for mobile formatting. [Acode](https://f-droid.org/en/packages/com.foxdebug.acode/) is a powerful, lightweight, open-source IDE and code editor for Android.\n\nAcode provides a full file tree explorer, multiple tabs, and supports syntax highlighting for over 100 languages. It features:\n- **Auto-completion**: Helpful when typing long parameters on virtual keyboards.\n- **Custom themes & configurations**: Allowing me to design a comfortable dark-mode IDE setup.\n- **HTML/Markdown preview**: Letting me view visual layouts directly in the app before hosting them.\n\nUsing Acode, I was able to manage my workspace folders and write CSS, Javascript, and PHP files comfortably.\n\n## 3. The Web Server: KSWEB (via Google Play)\n\nTo build database-driven applications and run server-side scripting, you need an actual web server environment. [KSWEB](https://play.google.com/store/apps/details?id=ru.kslabs.ksweb) is a complete suite for running a web server on Android.\n\nKSWEB packages together:\n- **Apache and Nginx**: Web servers to host local directories.\n- **PHP**: To run server-side scripts and dynamically construct HTML.\n- **MySQL/MariaDB**: A relational database to store credentials, user records, and product assets.\n- **phpMyAdmin**: A web portal interface to design tables, check data types, and run SQL queries locally.\n\nWhile you can manually install and configure Apache/Nginx, PHP, and MySQL inside Termux (which is a tedious, command-line-heavy process involving manual configuration edits, port mappings, and manual phpMyAdmin source installations), **using a dedicated GUI tool like KSWEB is infinitely easier.** It gives you a fully functional stack and a working phpMyAdmin dashboard in one single click, handling all the background configurations automatically. This allowed me to build full-stack web applications locally on my phone. I could run a database, write PHP API endpoints, query records, and test user login systems directly in Android's Chrome browser pointing to \`localhost:8080\`.\n\n## Other Highly Useful Developer Apps\n\nBeyond the core editor, shell, and server, here are a few other free Android apps that made my mobile coding workflow much more powerful:\n\n- **GitHub Mobile**: The official [GitHub App](https://play.google.com/store/apps/details?id=com.github.android) is essential for checking repository updates, managing issue tracking, responding to notifications, and reviewing codebase pull requests on the go.\n- **PingTools**: A robust [network diagnostic suite](https://play.google.com/store/apps/details?id=ua.com.streamsoft.pingtools) containing ping, port scanner, DNS lookups, traceroute, and subnet scanner tools. This is incredibly useful for troubleshooting local server connection ports and checking DNS mapping setups.\n- **ConnectBot & Termius**: Excellent SSH clients for Android to manage remote servers and VPS cloud instances. While developers previously used legacy clients like JuiceSSH (which is now unmaintained and removed), modern open-source clients like [ConnectBot](https://play.google.com/store/apps/details?id=org.connectbot) or feature-rich options like [Termius](https://play.google.com/store/apps/details?id=com.server.auditor.ssh.client) are the current standard, offering robust, actively updated terminal connections with custom key mapping.\n\n## The Modern Edge: AI Companions (ChatGPT, Claude, & Gemini)\n\nLearning to code today on a smartphone is faster than ever thanks to native AI assistant apps. Having tools like **ChatGPT**, **Claude**, or **Gemini** in your pocket is like having a senior software engineer mentoring you 24/7:\n\n- **Instant Debugging**: When your PHP backend or Termux compiler throws an obscure stack trace error, you can copy the error, paste it into the AI app, and receive an instant explanation of what went wrong and how to fix it.\n- **Interactive Coding Tutor**: If you don't understand how a specific concept works (like nested loops or database foreign keys), you can ask the AI to explain it with simple diagrams and mobile-friendly code snippets.\n- **Rapid UI Prototyping**: You can write code snippets in **Acode**, paste them into the AI app, and ask it to refactor them for better performance, add form validations, or structure responsive CSS layouts.\n- **AI Sandboxes**: Using modern web platforms like **v0.dev** (which is specialized in generating React and Next.js component layouts) or **Claude Artifacts** directly in your mobile browser lets you generate complete frontend code visually from raw text descriptions, which you can copy and integrate into your web projects.\n\n## My Mobile Workflow\n\nMy development loop on Android was simple but highly effective:\n1. **Design**: Open **Acode** to write my HTML, CSS, Javascript, or PHP scripts.\n2. **Database**: Open **KSWEB's** phpMyAdmin in the browser to structure my MySQL tables.\n3. **Host**: Run the local server in **KSWEB** to serve my workspace directory.\n4. **Version Control**: Open **Termux** to run git commands, commit changes, and push the repository to GitHub.\n5. **Preview**: Open Google Chrome on my phone, go to \`http://localhost:8080\`, and interact with the application.\n\n## Lessons Learned\n\nLearning to code on a mobile phone taught me resourcefulness. When you don't have a double-monitor setup or a mechanical keyboard, you focus on what really matters: writing clean logic, understanding system architecture, and optimization.\n\nIf you don't have a computer yet, don't wait. The phone in your hand is a fully capable computing platform. Downloading Termux, Acode, and a local server suite is all it takes to start building the future.`,
    tags: ["Mobile Coding", "Developer Journey", "Termux", "Web Dev"],
  },
];
