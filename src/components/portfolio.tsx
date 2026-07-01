"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { SiteNav } from "@/components/layout/site-nav";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";
import { navItems } from "@/lib/portfolio-data";

const smoothScrollTo = (targetY: number, duration: number = 850) => {
  if (typeof window === "undefined") return;
  const startY = window.scrollY || document.documentElement.scrollTop;
  const difference = targetY - startY;
  const startTime = performance.now();

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + difference * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const handleScrollToSection = (sectionId: string) => {
  if (typeof window === "undefined") return;
  if (sectionId === "#") {
    smoothScrollTo(0, 850);
    return;
  }
  const element = document.getElementById(sectionId.replace("#", ""));
  if (element) {
    const offset = 80;
    const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
    smoothScrollTo(targetY, 850);
  }
};

export function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const prefersReducedMotion = useSafeReducedMotion();
  const { scrollY } = useScroll();
  const watermarkOpacity = useTransform(scrollY, [800, 1100], [0, 0.035]);

  useEffect(() => {
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
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.5, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

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
        className="fixed -right-24 -top-16 -z-20 pointer-events-none select-none transform -rotate-12"
        style={{ opacity: watermarkOpacity }}
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

      <SiteNav
        activeSection={activeSection}
        onNavItemClick={handleScrollToSection}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
      >
        <HeroSection onScrollToSection={handleScrollToSection} />

        <AboutSection />

        <ServicesSection />

        <ProjectsSection />

        <ExperienceSection />

        <ContactSection />

        <Footer />
      </motion.div>

      <motion.button
        type="button"
        aria-label="Back to top"
        onClick={() => handleScrollToSection("#")}
        initial={false}
        animate={showBackToTop ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        className="fixed bottom-6 right-6 z-40 flex size-10 items-center justify-center rounded-full border border-border bg-background/85 text-foreground shadow-2xl backdrop-blur transition hover:-translate-y-1 hover:border-foreground/20"
      >
        <ArrowUp className="size-4" />
      </motion.button>
    </main>
  );
}
