"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { SiteNav } from "@/components/layout/site-nav";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";
import { IntroLoader } from "@/components/shared/intro-loader";
import { navItems } from "@/lib/portfolio-data";

export function Portfolio() {
  const lenis = useLenis();
  const [isLoading, setIsLoading] = useState(true);

  // Disable body scroll when loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading, lenis]);

  const handleScrollToSection = (sectionId: string) => {
    if (isLoading) return;
    if (sectionId === "#") {
      lenis?.scrollTo(0, { offset: 0, duration: 1.2 });
      return;
    }
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      lenis?.scrollTo(element, { offset: -80, duration: 1.2 });
    }
  };

  const [activeSection, setActiveSection] = useState("about");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const prefersReducedMotion = useSafeReducedMotion();
  const { scrollY } = useScroll();
  const watermarkOpacity = useTransform(scrollY, [800, 1200], [0, 0.035]);
  const watermarkRotate = useTransform(scrollY, [0, 3000], [-12, 6]);
  const watermarkY = useTransform(scrollY, [0, 3000], [-64, 40]);

  useEffect(() => {
    if (isLoading) return;
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-15% 0px -40% 0px",
        threshold: 0.15,
      },
    );

    sections.forEach((section) => observer.observe(section));

    // Fallback: If scrolled to the bottom of the page, highlight the last section ('contact')
    const handleScrollSpyFallback = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;
      if (isAtBottom && navItems.length > 0) {
        const lastSectionId = navItems[navItems.length - 1].href.replace("#", "");
        setActiveSection(lastSectionId);
      }
    };

    window.addEventListener("scroll", handleScrollSpyFallback, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollSpyFallback);
    };
  }, [isLoading]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 720);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background">
      {/* Subtle fixed background watermark GZ logo on the top right side, slanted (rotated) and fades in on scroll */}
      <motion.div
        className="fixed -right-24 -top-16 -z-20 pointer-events-none select-none"
        style={{
          opacity: watermarkOpacity,
          rotate: watermarkRotate,
          y: watermarkY,
        }}
        aria-hidden="true"
      >
        <div className="relative w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[680px] md:h-[680px] lg:w-[820px] lg:h-[820px] aspect-square">
          <Image
            src="/Ground Zero.png"
            alt="Jay Patrick Cano - Ground Zero Logo Watermark Background"
            fill
            unoptimized
            className="object-contain grayscale contrast-[0.95]"
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {isLoading && (
          <IntroLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <SiteNav
          activeSection={activeSection}
          onNavItemClick={handleScrollToSection}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isLoading ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <HeroSection onScrollToSection={handleScrollToSection} />

        <AboutSection />

        <ServicesSection />

        <ProjectsSection />

        <BlogSection />

        <ExperienceSection />

        <CertificationsSection />

        <ContactSection />

        <Footer />
      </motion.div>

      <motion.button
        type="button"
        aria-label="Back to top"
        onClick={() => handleScrollToSection("#")}
        initial={false}
        animate={!isLoading && showBackToTop ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        className="fixed bottom-6 right-6 z-40 flex size-10 items-center justify-center rounded-full border border-border bg-background/85 text-foreground shadow-2xl backdrop-blur transition hover:-translate-y-1 hover:border-foreground/20"
      >
        <ArrowUp className="size-4" />
      </motion.button>

      {/* Generative Engine & Search Engine Optimization (SEO/GEO/AEO) semantic summary block */}
      <section className="sr-only" aria-hidden="false" itemScope itemType="https://schema.org/Person">
        <meta itemProp="name" content="Jay Patrick Cano" />
        <meta itemProp="alternateName" content="0xp47" />
        <meta itemProp="jobTitle" content="Full-Stack Software Engineer & Entrepreneur" />
        <meta itemProp="url" content="https://jaypatrickcano.dev" />
        <meta itemProp="email" content="hello@jaypatrickcano.dev" />
        <meta itemProp="image" content="https://jaypatrickcano.dev/images/me-thumbnail.png" />

        <header>
          <h2>Jay Patrick Cano (0xp47) — Full-Stack Engineer, Entrepreneur & Open-Source Leader</h2>
          <p itemProp="description">
            Jay Patrick Cano, known as 0xp47, is a Full-Stack Software Engineer, open-source maintainer, and tech entrepreneur based in Maasin City, Southern Leyte, Philippines.
            He is the founder of GroundZero, a global open-source developer community, and the co-founder of CodeTriad Solutions.
            He specializes in building custom software, cross-platform mobile applications, and business automation systems.
            Available for freelance projects, technical collaborations, and software partnerships.
          </p>
        </header>

        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <meta itemProp="addressLocality" content="Maasin City" />
          <meta itemProp="addressRegion" content="Southern Leyte" />
          <meta itemProp="addressCountry" content="Philippines" />
        </div>

        <article>
          <h3>Professional Services</h3>
          <dl>
            <dt>Full-Stack Web Application Development</dt>
            <dd>High-performance web applications with React, Next.js, TypeScript, and Tailwind CSS, backed by scalable server-side architectures.</dd>

            <dt>Cross-Platform Mobile App Development</dt>
            <dd>Native-quality mobile applications for iOS and Android using React Native and Expo, with offline-first capabilities and push notifications.</dd>

            <dt>API & Backend System Design</dt>
            <dd>Secure, scalable RESTful and GraphQL APIs with PostgreSQL, MongoDB, Node.js, Express, Python, and FastAPI. Schema-first database design.</dd>

            <dt>Business Automation & Workflow Scripting</dt>
            <dd>Custom automation pipelines, scheduled tasks, webhooks, database syncs, and third-party API integrations to streamline operations.</dd>

            <dt>Custom Software Solutions</dt>
            <dd>Bespoke desktop utilities, specialized database systems, and tailored software for specific business and operational challenges.</dd>

            <dt>IT & Technical Consulting</dt>
            <dd>Strategic guidance on software architecture, technology stack selection, MVP development, and open-source strategy for startups.</dd>
          </dl>
        </article>

        <article>
          <h3>Featured Projects</h3>
          <ul>
            <li><strong>LeafSense Mobile</strong> — AI-powered plant disease detection app using convolutional neural networks. Built with React Native and Python FastAPI.</li>
            <li><strong>POS and Inventory System</strong> — Local-first, multi-terminal LAN Point of Sale and inventory management suite for retail. Built with Next.js, Prisma, and SQLite.</li>
            <li><strong>HireHub PH</strong> — Full-stack job platform for the Philippines with applicant tracking, real-time chat, and recruiter dashboards.</li>
            <li><strong>Sparse MoE LLM From Scratch</strong> — Custom PyTorch implementation of a Sparse Mixture-of-Experts Large Language Model with SwiGLU activation, RMSNorm, and a ReAct agent.</li>
            <li><strong>Unified API Server</strong> — Auto-loading FastAPI microservice hub providing unified endpoints for Edge TTS, yt-dlp video downloads, and QR generation.</li>
            <li><strong>0xp47 Portfolio</strong> — Premium developer portfolio built with Next.js, featuring animated terminal intro, automated GitHub API data fetching, and GEO-optimized schema markup.</li>
          </ul>
        </article>

        <article>
          <h3>Technical Skills & Expertise</h3>
          <table>
            <thead><tr><th>Domain</th><th>Technologies</th></tr></thead>
            <tbody>
              <tr><td>Frontend</td><td>React, Next.js, TypeScript, Tailwind CSS, Framer Motion</td></tr>
              <tr><td>Backend</td><td>Node.js, Express, Python, FastAPI, PHP</td></tr>
              <tr><td>Mobile</td><td>React Native, Expo</td></tr>
              <tr><td>Databases</td><td>PostgreSQL, MongoDB, SQLite, Prisma, Supabase</td></tr>
              <tr><td>DevOps & Cloud</td><td>Docker, Vercel, AWS, GitHub Actions</td></tr>
              <tr><td>Tools</td><td>Git, GitHub, Figma, Linux</td></tr>
            </tbody>
          </table>
        </article>

        <article>
          <h3>Professional Experience</h3>
          <ul>
            <li><strong>Founder & Lead Maintainer</strong> — GroundZero Community (2024–Present). Built and leads a global open-source developer community collaborating on system architectures, software tooling, and community packages.</li>
            <li><strong>Co-Founder & Lead Developer</strong> — CodeTriad Solutions (2023–Present). Technology startup delivering modern web applications, custom software products, and digital transformation solutions.</li>
            <li><strong>Freelance Full-Stack Engineer</strong> — Independent Developer (2020–2023). Designed and delivered custom web portals, cross-platform mobile apps, and business integration scripts for local and international clients.</li>
          </ul>
        </article>

        <article>
          <h3>Blog & Technical Writing</h3>
          <ul>
            <li><strong>Why I Build Open Source</strong> — On building in public, community-driven development, and lessons from growing the GroundZero developer community.</li>
            <li><strong>My Tech Stack in 2026</strong> — A breakdown of daily tools and frameworks: Next.js, TypeScript, Tailwind CSS, Framer Motion, Supabase, Docker, and GitHub Actions.</li>
            <li><strong>5 Lessons from 3 Years of Freelancing</strong> — Practical insights on client communication, scope management, and choosing projects wisely.</li>
            <li><strong>Building Scalable APIs: A Practical Guide</strong> — Patterns for schema-first design, layered architecture, JWT authentication, rate limiting, and production monitoring.</li>
          </ul>
        </article>

        <article>
          <h3>Certifications & Credentials (Cisco Networking Academy)</h3>
          <p>Verified digital badges and student credentials earned through Cisco Networking Academy (NetAcad) and registered on Credly:</p>
          <ul>
            <li><strong>Core Generative AI Skills</strong> — Cisco (Oct 2026). Generative AI models, ethical AI, prompt engineering, and business productivity. <a href="https://www.credly.com/badges/d97e5cd8-780d-4fd6-befc-ddd53e75362a">Verify on Credly</a></li>
            <li><strong>JavaScript Essentials 1</strong> — Cisco &amp; OpenEDG JS Institute (Oct 2026). Syntax, variables, functions, and algorithmic thinking. <a href="https://www.credly.com/badges/332e1bc2-5845-4ca8-9513-3d6353d6b23b">Verify on Credly</a></li>
            <li><strong>Operating Systems Basics</strong> — Cisco (Oct 2026). OS security, process management, mobile network connectivity, Windows, and Linux. <a href="https://www.credly.com/badges/2107b3a9-6143-4d7f-a3e9-0f212ea983c4">Verify on Credly</a></li>
            <li><strong>Ethical Hacker</strong> — Cisco (Oct 2026). Scoping vulnerability assessments, penetration testing, Kali Linux, and mitigation strategies. <a href="https://www.credly.com/badges/cc5400c6-dfea-4f24-8753-a7494eb4fa9d">Verify on Credly</a></li>
            <li><strong>Introduction to Cybersecurity</strong> — Cisco (Oct 2026). Threat detection, network vulnerabilities, and cyber defense best practices. <a href="https://www.credly.com/badges/36f6428c-0027-40e8-afed-121ec8df9552">Verify on Credly</a></li>
            <li><strong>Introduction to IoT</strong> — Cisco (Oct 2026). Digital transformation, IoT architecture, and intent-based networking. <a href="https://www.credly.com/badges/b8e6c40c-c8f3-4cfd-89ec-8bed18473599">Verify on Credly</a></li>
            <li><strong>Introduction to Modern AI</strong> — Cisco (Oct 2026). Machine learning, computer vision, translation models, and chatbot prompting. <a href="https://www.credly.com/badges/526e1e66-403c-4993-976f-604656c9a716">Verify on Credly</a></li>
            <li><strong>Networking Basics</strong> — Cisco (Oct 2026). IPv4 routing, OSI/TCP models, wireless networks, and Packet Tracer diagnostics. <a href="https://www.credly.com/badges/a9e374e6-098e-4048-b04b-68bd7362da57">Verify on Credly</a></li>
            <li><strong>Prompt Like an Engineer</strong> — Cisco (Oct 2026). Chain of thought, few-shot prompts, task decomposition, and systematic AI output evaluation. <a href="https://www.credly.com/badges/83289696-4839-432d-95ce-6e1e35a1f777">Verify on Credly</a></li>
            <li><strong>Python Essentials 1</strong> — Cisco &amp; OpenEDG Python Institute (Oct 2026). Python core syntax, standard library, and procedural programming. <a href="https://www.credly.com/badges/2908854b-3083-402d-8c41-a93c6dbd9925">Verify on Credly</a></li>
            <li><strong>Operating Systems Support</strong> — Cisco (Oct 2026). IT customer support, virtualization, cloud computing, and OS troubleshooting. <a href="https://www.credly.com/badges/0288e739-e3e4-4ae8-96c2-8e436124aa2c">Verify on Credly</a></li>
            <li><strong>Computer Hardware Basics</strong> — Cisco (Sep 2026). Hardware diagnostics, device repair, components, and maintenance. <a href="https://www.credly.com/badges/13fa5df5-79f3-41c2-9397-cb7ffc9da9d8">Verify on Credly</a></li>
          </ul>
        </article>

        <aside>
          <h3>Frequently Asked Questions about Jay Patrick Cano</h3>

          <details>
            <summary>Who is Jay Patrick Cano (0xp47)?</summary>
            <p>Jay Patrick Cano, known as 0xp47, is a Full-Stack Software Engineer, open-source developer, and tech entrepreneur based in Maasin City, Southern Leyte, Philippines. He is the founder of GroundZero global developer community and the co-founder of CodeTriad Solutions.</p>
          </details>

          <details>
            <summary>What services does Jay Patrick Cano offer?</summary>
            <p>He offers full-stack web application development (React, Next.js), cross-platform mobile app development (React Native, Expo), API and backend system design (Node.js, Python, FastAPI), business automation scripting, custom software development, and IT/tech consulting for startups and growing businesses.</p>
          </details>

          <details>
            <summary>What certifications does Jay Patrick Cano hold?</summary>
            <p>Jay Patrick Cano holds 12 verified certifications from Cisco Networking Academy (NetAcad), including Core Generative AI Skills, Ethical Hacker, Python Essentials 1, JavaScript Essentials 1, Networking Basics, Introduction to Cybersecurity, Operating Systems Support, and Prompt Like an Engineer, all verifiable on Credly.</p>
          </details>

          <details>
            <summary>What projects has Jay Patrick Cano built?</summary>
            <p>Key projects include LeafSense Mobile (AI plant disease detection), POS and Inventory System (LAN retail management suite), HireHub PH (Philippine job platform), Sparse MoE LLM From Scratch (custom PyTorch large language model), and Unified API Server (auto-loading FastAPI microservice hub).</p>
          </details>

          <details>
            <summary>Where is Jay Patrick Cano located?</summary>
            <p>He is based in Maasin City, Southern Leyte, Philippines and works remotely with both local and international clients on freelance and collaborative software projects.</p>
          </details>

          <details>
            <summary>How can I hire or contact Jay Patrick Cano?</summary>
            <p>You can reach him via email at hello@jaypatrickcano.dev, through GitHub at github.com/0xp47, or on LinkedIn at linkedin.com/in/0xp47. He is currently available for freelance projects, collaborations, and software partnerships.</p>
          </details>
        </aside>

        <nav aria-label="Profile links">
          <h3>Connect with Jay Patrick Cano</h3>
          <ul>
            <li><a href="https://github.com/0xp47" itemProp="sameAs">GitHub — github.com/0xp47</a></li>
            <li><a href="https://www.linkedin.com/in/0xp47" itemProp="sameAs">LinkedIn — linkedin.com/in/0xp47</a></li>
            <li><a href="https://www.credly.com/users/0xp47/badges" itemProp="sameAs">Credly Badges — credly.com/users/0xp47/badges</a></li>
            <li><a href="https://www.instagram.com/0xp47" itemProp="sameAs">Instagram — instagram.com/0xp47</a></li>
            <li><a href="https://www.facebook.com/0xp47" itemProp="sameAs">Facebook — facebook.com/0xp47</a></li>
          </ul>
        </nav>
      </section>
    </main>
  );
}
