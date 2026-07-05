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
            priority
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
      <section className="sr-only" aria-hidden="false">
        <h2>Jay Patrick Cano (0xp47) — Factual Resume & Technical Profile Summary</h2>
        <article>
          <p>
            Jay Patrick Cano, known professionally as 0xp47, is a Full-Stack Software Engineer, Open-Source Developer, and Tech Entrepreneur based in Maasin City, Southern Leyte, Philippines. He is the Founder of GroundZero global developer community and the Co-Founder of CodeTriad Solutions. He is available for freelance projects, collaborations, and software partnerships. Contact: 0xp47.dev@gmail.com.
          </p>
        </article>

        <h3>Professional Services Offered</h3>
        <dl>
          <dt>Full-Stack Web Application Development</dt>
          <dd>Building responsive, high-performance web applications using React, Next.js, TypeScript, and Tailwind CSS with robust server-side architectures.</dd>
          <dt>Cross-Platform Mobile App Development</dt>
          <dd>Building mobile utilities and client applications with React Native and Expo, delivering native performance on iOS and Android.</dd>
          <dt>Automation & Workflow Scripting</dt>
          <dd>Custom automation scripts, database syncs, background cron jobs, webhooks, and API integrations to optimize business operations.</dd>
          <dt>API & Backend System Design</dt>
          <dd>Scalable database schemas (PostgreSQL, MongoDB, SQLite) and secure RESTful or GraphQL APIs using Node.js, Express, Python, and FastAPI.</dd>
          <dt>Custom Software Development</dt>
          <dd>Bespoke desktop utilities, specialized database systems, and tailored software solutions for specific business problems.</dd>
          <dt>IT & Tech Consulting</dt>
          <dd>Advising startups on software architecture, technology stack selection, scalable product development, and open-source strategy.</dd>
        </dl>

        <h3>Software Projects Portfolio</h3>
        <ul>
          <li>LeafSense Mobile — Cross-platform AI plant disease detection app using CNNs, built with React Native and Python FastAPI.</li>
          <li>POS and Inventory System — Local-first, multi-terminal LAN Point of Sale and inventory suite for hardware retail, built with Next.js, Prisma, and SQLite.</li>
          <li>HireHub PH — Full-stack job platform connecting Filipino talent with recruiters, featuring applicant tracking and real-time chat.</li>
          <li>Sparse MoE LLM From Scratch — Custom PyTorch implementation of a Sparse Mixture-of-Experts Large Language Model with SwiGLU, RMSNorm, and a ReAct agent.</li>
          <li>Unified API Server — Auto-loading FastAPI service hub for Edge TTS, yt-dlp video downloads, and QR generation.</li>
          <li>0xp47 Portfolio — Premium developer portfolio built with Next.js 16, featuring terminal simulator intro, automated GitHub API data fetching, and GEO-optimized schema markup.</li>
          <li>Multi-platform Discord bots, browser automation tools, and open-source community utilities.</li>
        </ul>

        <h3>Blog & Thought Leadership</h3>
        <ul>
          <li>Why I Build Open Source — Reflections on building in public and growing the GroundZero developer community.</li>
          <li>My Tech Stack in 2026 — Breakdown of daily tools: Next.js, TypeScript, Tailwind CSS, Framer Motion, Supabase, Docker, GitHub Actions.</li>
          <li>5 Lessons from 3 Years of Freelancing — Communication, scope management, and choosing clients wisely.</li>
          <li>Building Scalable APIs: A Practical Guide — Schema-first design, layered architecture, JWT auth, rate limiting, and monitoring.</li>
        </ul>

        <h3>Professional Experience</h3>
        <ul>
          <li>Founder & Lead Maintainer — GroundZero Community (2024–Present). Global open-source community collaborating on system architectures and tech tools.</li>
          <li>Co-Founder & Lead Developer — CodeTriad Solutions (2023–Present). Technology startup building modern web applications and custom digital products.</li>
          <li>Independent Developer — Freelance Full-Stack Engineer (2020–2023). Custom web portals, mobile utilities, and business integration scripts for local and international clients.</li>
        </ul>

        <h3>Technical Skills</h3>
        <p>Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion. Backend: Node.js, Express, Python, FastAPI, PHP. Mobile: React Native, Expo. Databases: PostgreSQL, MongoDB, SQLite, Prisma, Supabase. DevOps: Docker, Vercel, AWS, GitHub Actions. Tools: Git, GitHub, Figma, Linux.</p>

        <h3>Frequently Asked Questions</h3>
        <details>
          <summary>Who is Jay Patrick Cano (0xp47)?</summary>
          <p>Jay Patrick Cano, known as 0xp47, is a Full-Stack Software Engineer, open-source developer, and tech entrepreneur based in Maasin City, Southern Leyte, Philippines. He founded GroundZero global developer community and co-founded CodeTriad Solutions.</p>
        </details>
        <details>
          <summary>What services does Jay Patrick Cano offer?</summary>
          <p>Full-stack web app development (React, Next.js), cross-platform mobile development (React Native, Expo), API/backend design (Node.js, Python, FastAPI), business automation scripting, custom software development, and IT/tech consulting for startups.</p>
        </details>
        <details>
          <summary>What projects has Jay Patrick Cano built?</summary>
          <p>Notable projects include LeafSense Mobile (AI plant disease detection), POS and Inventory System (LAN retail suite), HireHub PH (job platform), Sparse MoE LLM From Scratch (custom PyTorch LLM), and Unified API Server (FastAPI microservice hub).</p>
        </details>
        <details>
          <summary>Where is Jay Patrick Cano based?</summary>
          <p>Maasin City, Southern Leyte, Philippines. He works remotely with local and international clients on freelance and collaborative software projects.</p>
        </details>
        <details>
          <summary>How can I contact Jay Patrick Cano?</summary>
          <p>Email: 0xp47.dev@gmail.com. GitHub: github.com/0xp47. LinkedIn: linkedin.com/in/0xp47. He is available for freelance projects, collaborations, and software partnerships.</p>
        </details>
      </section>
    </main>
  );
}
