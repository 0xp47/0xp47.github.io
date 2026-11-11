"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLenis } from "lenis/react";
import { profile, navItems } from "@/lib/portfolio-data";
import { EASE_OUT_EXPO } from "@/lib/animation-variants";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { useIsSwarmActive } from "@/hooks/use-swarm-active";

const smoothScrollEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function Footer() {
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "80px 0px -20px 0px" });
  const isSwarmActive = useIsSwarmActive();
  const showFooter = isSwarmActive || isInView;
  const prefersReducedMotion = useSafeReducedMotion();

  const scrollToSection = (href: string) => (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (href === "#") {
      if (lenis) {
        lenis.scrollTo(0, {
          offset: 0,
          duration: prefersReducedMotion ? 0 : 1.25,
          easing: smoothScrollEasing,
        });
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
      return;
    }
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, {
          offset: -64,
          duration: prefersReducedMotion ? 0 : 1.25,
          easing: smoothScrollEasing,
        });
      } else {
        element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    }
  };

  return (
    <motion.footer
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={showFooter ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: prefersReducedMotion ? 0 : 1.15, ease: EASE_OUT_EXPO }}
      className="mx-auto w-full max-w-[1120px] px-6 pb-24 md:pb-12 sm:px-8 lg:px-10 will-change-transform"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { scaleX: 0 }}
        animate={showFooter ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.3, ease: EASE_OUT_EXPO }}
        className="h-px bg-border origin-left will-change-transform"
      />

      <div className="flex flex-col gap-8 pt-8 sm:flex-row sm:items-start sm:justify-between">
        {/* Identity */}
        <div className="space-y-2">
          <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-foreground">
            {profile.name}
          </p>
          <p className="text-[11px] text-muted-foreground/60">
            Full-Stack Engineer &amp; Entrepreneur — Maasin City, PH
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="inline-block text-[11px] text-muted-foreground/60 transition-all duration-300 hover:text-foreground hover:translate-x-0.5"
          >
            {profile.email}
          </a>
        </div>

        {/* Quick links (plain text, no boxes) */}
        <nav aria-label="Footer navigation" className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={scrollToSection(item.href)}
              className="text-[11px] text-muted-foreground/55 transition-all duration-300 hover:text-foreground hover:-translate-y-0.5"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-10 flex flex-col gap-2 text-[10px] font-mono text-muted-foreground/35 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Built with Next.js — open source on GitHub</p>
      </div>
    </motion.footer>
  );
}
