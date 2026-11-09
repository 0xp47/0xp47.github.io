"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { cn } from "@/lib/utils";
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
import { navItems, certifications } from "@/lib/portfolio-data";

const smoothScrollEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function Portfolio() {
  const lenis = useLenis();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const activeSectionRef = useRef("");
  const showBackToTopRef = useRef(false);
  const metricsRef = useRef<{
    innerHeight: number;
    scrollHeight: number;
    sections: { id: string; top: number }[];
  }>({
    innerHeight: 0,
    scrollHeight: 0,
    sections: [],
  });
  const prefersReducedMotion = useSafeReducedMotion();

  const setActiveSectionSafe = useCallback((next: string) => {
    if (activeSectionRef.current !== next) {
      activeSectionRef.current = next;
      setActiveSection(next);
    }
  }, []);

  const setShowBackToTopSafe = useCallback((next: boolean) => {
    if (showBackToTopRef.current !== next) {
      showBackToTopRef.current = next;
      setShowBackToTop(next);
    }
  }, []);

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

  const handleScrollToSection = useCallback(
    (sectionId: string) => {
      if (isLoading) return;
      if (sectionId === "#") {
        if (lenis) {
          lenis.scrollTo(0, {
            offset: 0,
            duration: prefersReducedMotion ? 0 : 1.5,
            easing: smoothScrollEasing,
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth",
          });
        }
        setActiveSectionSafe("");
        return;
      }
      const cleanId = sectionId.replace("#", "");
      const element = document.getElementById(cleanId);
      if (element) {
        if (lenis) {
          lenis.scrollTo(element, {
            offset: -64,
            duration: prefersReducedMotion ? 0 : 1.5,
            easing: smoothScrollEasing,
          });
        } else {
          element.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
          });
        }
        setActiveSectionSafe(cleanId);
      }
    },
    [isLoading, lenis, prefersReducedMotion, setActiveSectionSafe]
  );

  // Support deep links (hash navigation) once the intro loader finishes
  useEffect(() => {
    if (isLoading || typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const timer = window.setTimeout(() => {
        handleScrollToSection(hash);
      }, 120);
      return () => window.clearTimeout(timer);
    }
  }, [isLoading, handleScrollToSection]);

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 110,
    damping: 28,
    mass: 0.2,
    restDelta: 0.5,
  });
  const watermarkOpacity = useTransform(smoothScrollY, [800, 1200], [0, 0.035]);
  const watermarkRotate = useTransform(smoothScrollY, [0, 3000], [-12, 6]);
  const watermarkY = useTransform(smoothScrollY, [0, 3000], [-64, 40]);

  useEffect(() => {
    if (isLoading) return;

    const measureSections = () => {
      const sections: { id: string; top: number }[] = [];
      for (const item of navItems) {
        const id = item.href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          sections.push({ id, top: el.offsetTop });
        }
      }
      metricsRef.current = {
        innerHeight: window.innerHeight,
        scrollHeight: document.documentElement.scrollHeight,
        sections,
      };
    };

    const onScroll = () => {
      const y = window.scrollY;
      setShowBackToTopSafe(y > 720);

      // When near top, activate Home
      if (y < 180) {
        setActiveSectionSafe("");
        return;
      }

      const { innerHeight, scrollHeight, sections } = metricsRef.current;

      // When near page bottom, activate last section (Contact)
      if (scrollHeight > 0 && innerHeight + y >= scrollHeight - 100 && sections.length > 0) {
        setActiveSectionSafe(sections[sections.length - 1].id);
        return;
      }

      // Check cached section offsets in document order (zero DOM reflows during scroll)
      const probeY = y + Math.min(innerHeight * 0.35, 280);
      let current = "";

      for (let i = 0; i < sections.length; i++) {
        if (sections[i].top <= probeY) {
          current = sections[i].id;
        } else {
          break;
        }
      }

      if (current) {
        setActiveSectionSafe(current);
      }
    };

    measureSections();
    onScroll();

    const handleResize = () => {
      measureSections();
      onScroll();
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        measureSections();
      });
      resizeObserver.observe(document.body);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, [isLoading, setActiveSectionSafe, setShowBackToTopSafe]);

  return (
    <>
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

      <motion.button
        type="button"
        aria-label="Back to top"
        onClick={() => handleScrollToSection("#")}
        initial={false}
        animate={!isLoading && showBackToTop ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "group fixed bottom-6 right-6 z-30 hidden md:flex size-9 items-center justify-center chamfer-btn border border-neutral-300 bg-white/90 text-neutral-700 hover:border-neutral-400 hover:text-black hover:bg-neutral-100 shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-[#0a0a0a]/90 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:bg-[#121212] dark:hover:text-white dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 active:scale-95 focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden cursor-pointer will-change-transform transform-gpu",
          (!showBackToTop || isLoading) && "pointer-events-none"
        )}
      >
        <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </motion.button>

      <main className="relative isolate min-h-screen overflow-hidden bg-background">
        {/* Subtle fixed background watermark GZ logo on the top right side, slanted (rotated) and fades in on scroll */}
        <motion.div
          className="fixed -right-24 -top-16 -z-20 pointer-events-none select-none will-change-transform transform-gpu"
          style={{
            opacity: watermarkOpacity,
            rotate: watermarkRotate,
            y: watermarkY,
          }}
          aria-hidden="true"
        >
          <div className="relative w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[680px] md:h-[680px] lg:w-[820px] lg:h-[820px] aspect-square">
            <Image
              src="/Ground Zero-ink.png"
              alt="Jay Patrick Cano - Ground Zero Logo Watermark Background"
              fill
              unoptimized
              /* Ink is white: invert to near-black in light mode so it stays a subtle watermark on white. */
              className="object-contain grayscale invert dark:invert-0"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoading ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.22, 0.88, 0.26, 1] }}
        >
          <HeroSection
            onScrollToSection={handleScrollToSection}
            isReady={!isLoading}
          />

          <AboutSection />

          <ServicesSection />

          <ProjectsSection />

          <BlogSection />

          <ExperienceSection />

          <CertificationsSection />

          <ContactSection />

          <Footer />
        </motion.div>

      {/* Generative Engine & Search Engine Optimization (SEO/GEO/AEO) semantic summary block */}
      <section className="sr-only" aria-hidden="false" itemScope itemType="https://schema.org/Person">
        <meta itemProp="name" content="Jay Patrick Cano" />
        <meta itemProp="alternateName" content="0xp47" />
        <meta itemProp="jobTitle" content="Full-Stack Software Engineer & Entrepreneur" />
        <meta itemProp="url" content="https://jaypatrickcano.dev" />
        <meta itemProp="email" content="hello@jaypatrickcano.dev" />
        <meta itemProp="image" content="https://jaypatrickcano.dev/images/og-hero.png" />

        <header>
          <h2>Jay Patrick Cano (0xp47) — Aspiring Full-Stack Engineer & Open-Source Builder</h2>
          <p itemProp="description">
            Jay Patrick Cano, known as 0xp47, is an aspiring Full-Stack Software Engineer and tech learner based in Maasin City, Southern Leyte, Philippines.
            He is the founder of GroundZero Community, an early-stage open-source group, and co-founder of CodeTriad Solutions.
            He builds custom software, cross-platform mobile applications, and automated workflows while studying business and entrepreneurship.
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
            <li><strong>Founder & Maintainer</strong> — GroundZero Community (2024–Present). Started an early-stage open-source developer initiative where builders connect, share knowledge, and collaborate on software tools together.</li>
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
          <h3>Certifications & Credentials (Anthropic & Cisco)</h3>
          <p>Verified credentials earned through Anthropic Education and Cisco Networking Academy (NetAcad), registered on official verification registries:</p>
          <ul>
            {certifications.map((c) => (
              <li key={c.id}>
                <strong>{c.title}</strong> — {c.issuer} ({new Date(c.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}). {c.category}. <a href={c.badgeUrl}>Verify credential</a>
              </li>
            ))}
          </ul>
        </article>

        <aside>
          <h3>Frequently Asked Questions about Jay Patrick Cano</h3>

          <details>
            <summary>Who is Jay Patrick Cano (0xp47)?</summary>
            <p>Jay Patrick Cano, known as 0xp47, is an aspiring Full-Stack Software Engineer and tech learner based in Maasin City, Southern Leyte, Philippines. He is the founder of GroundZero Community and co-founder of CodeTriad Solutions, continuously learning software engineering and business fundamentals.</p>
          </details>

          <details>
            <summary>What services does Jay Patrick Cano offer?</summary>
            <p>He offers full-stack web application development (React, Next.js), cross-platform mobile app development (React Native, Expo), API and backend system design (Node.js, Python, FastAPI), business automation scripting, custom software development, and IT/tech consulting for startups and growing businesses.</p>
          </details>

          <details>
            <summary>What certifications does Jay Patrick Cano hold?</summary>
            <p>Jay Patrick Cano holds {certifications.length} verified industry credentials across Anthropic Academy (including Claude Code 101, Model Context Protocol, Claude Platform 101, and Building with Claude API) and Cisco Networking Academy (including Core Generative AI Skills, Ethical Hacker, Python Essentials 1 &amp; 2, JavaScript Essentials 1, and Introduction to Cybersecurity).</p>
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
  </>
  );
}
