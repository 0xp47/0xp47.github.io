"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

const sectionVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  headerAction?: ReactNode;
  headerMarginBottom?: string;
}

/** Maps an `id` to a stable editorial index (01, 02, ...) for the section headers. */
const sectionIndexes: Record<string, string> = {
  about: "01",
  services: "02",
  projects: "03",
  blog: "04",
  experience: "05",
  certifications: "06",
  contact: "07",
};

/** Editorial metadata badges on the left of each node (matching the design roadmap badges) */
const sectionBadges: Record<string, { tag: string; range: string }> = {
  about: { tag: "SECT", range: "01 — BIO" },
  services: { tag: "SECT", range: "02 — SERV" },
  projects: { tag: "SECT", range: "03 — WORK" },
  blog: { tag: "SECT", range: "04 — POST" },
  experience: { tag: "SECT", range: "05 — HIST" },
  certifications: { tag: "SECT", range: "06 — CERT" },
  contact: { tag: "SECT", range: "07 — SYNC" },
};

export function Section({ id, title, children, headerAction, headerMarginBottom }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });
  const prefersReducedMotion = useSafeReducedMotion();
  const index = sectionIndexes[id];
  const badge = sectionBadges[id];
  const isFirst = id === "about";
  const isLast = id === "contact";

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className="relative mx-auto w-full max-w-[1160px] px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-12 md:py-14 pb-24 sm:pb-12 md:pb-14 scroll-mt-20"
    >
      {/* Continuous Vertical Spine Line connecting all section numbers (tablet & desktop only) */}
      <div
        aria-hidden="true"
        className={cn(
          "hidden sm:block absolute w-px bg-foreground/20 dark:bg-white/20 pointer-events-none z-0",
          "sm:left-[120px] md:left-[144px] lg:left-[168px]",
          isFirst && "sm:top-[91px] md:top-[103px] lg:top-[110px] bottom-0",
          !isFirst && !isLast && "top-0 bottom-0",
          isLast && "top-0 sm:h-[174px] md:h-[194px] lg:h-[208px]"
        )}
      />

      {/* Terminal Target and Arrow on the last section (tablet & desktop only) */}
      {isLast && (
        <div
          aria-hidden="true"
          className="hidden sm:flex absolute z-10 -translate-x-1/2 sm:left-[120px] md:left-[144px] lg:left-[168px] sm:top-[174px] md:top-[194px] lg:top-[208px] items-center justify-center text-foreground/70"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {/* Corner bracket ticks [ ] */}
            <path d="M4 8V4H8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
            <path d="M16 4H20V8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
            <path d="M4 16V20H8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
            <path d="M16 20H20V16" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
            {/* Downward chevron arrow */}
            <path d="M7 9L12 14L17 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* Content wrapper: Full width on mobile (<sm), cleanly indented on tablet & desktop (sm+) */}
      <div className="relative z-10 pl-0 sm:pl-[96px] md:pl-[112px] lg:pl-[128px]">
        {/* Editorial Section Header with Badge + Node + Number + Dividing Line */}
        <div className={headerMarginBottom ?? "mb-5 sm:mb-6"}>
          
          <div className="relative w-full">
            {/* Desktop Left bracket badge (matching the design roadmap bracket badge) */}
            {badge && (
              <div
                aria-hidden="true"
                className="hidden sm:flex absolute right-full mr-7 sm:mr-8 top-1/2 -translate-y-1/2 items-center gap-1.5 select-none"
              >
                <svg width="5" height="26" viewBox="0 0 5 26" fill="none" className="text-neutral-500/80 shrink-0">
                  <path d="M4 1H1V25H4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
                </svg>
                <div className="flex flex-col font-mono text-[9px] uppercase tracking-wider leading-none shrink-0 whitespace-nowrap">
                  <span className="text-neutral-500 font-medium tracking-widest text-[7.5px] mb-0.5">{badge.tag}</span>
                  <span className="text-neutral-300 font-semibold">{badge.range}</span>
                </div>
              </div>
            )}

            {/* Desktop Target Reticle Circle Node centered directly on the spine */}
            <div
              aria-hidden="true"
              className="hidden sm:flex absolute left-0 -translate-x-1/2 size-8 sm:size-9 items-center justify-center z-10 text-foreground top-1/2 -translate-y-1/2"
            >
              <svg
                viewBox="0 0 36 36"
                fill="none"
                className="size-8 sm:size-9 text-neutral-300"
              >
                {/* 4 Crosshair Ticks */}
                <line x1="18" y1="1" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
                <line x1="18" y1="29" x2="18" y2="35" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
                <line x1="1" y1="18" x2="7" y2="18" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
                <line x1="29" y1="18" x2="35" y2="18" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />

                {/* Outer Ring */}
                <circle cx="18" cy="18" r="10.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />

                {/* Inner Solid Target Dot */}
                <circle cx="18" cy="18" r="4.5" fill="currentColor" />
              </svg>
            </div>

            {/* Massive Section Number container: clean border-b cutoff */}
            <div className="relative w-full overflow-hidden border-b border-neutral-300 dark:border-neutral-800 h-[64px] sm:h-[86px] md:h-[94px] lg:h-[108px] pl-0 sm:pl-7 md:pl-8">
              <div className="font-sans text-7xl sm:text-9xl md:text-[130px] lg:text-[150px] font-bold tracking-tight text-foreground leading-none select-none">
                {index}
              </div>
            </div>
          </div>

          {/* Section Title below the line */}
          <div className="pt-3 sm:pt-4 pl-0 sm:pl-7 md:pl-8 flex flex-row items-end justify-between gap-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-700 dark:text-neutral-300 tracking-tight leading-snug max-w-sm sm:max-w-sm md:max-w-md">
              {title}
            </h2>
            {headerAction && (
              <div className="shrink-0 flex items-center gap-2">
                {headerAction}
              </div>
            )}
          </div>
        </div>

        {/* Children content area */}
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: prefersReducedMotion ? 0 : 0.28 },
            },
          }}
          className="pl-0 sm:pl-7 md:pl-8"
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}
