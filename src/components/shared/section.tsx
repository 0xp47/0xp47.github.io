"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

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
  eyebrow: string;
  title: string;
  children: ReactNode;
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

export function Section({ id, eyebrow, title, children }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });
  const prefersReducedMotion = useSafeReducedMotion();
  const index = sectionIndexes[id];

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className="mx-auto w-full max-w-[1120px] px-6 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-10 scroll-mt-20"
    >
      {/* Editorial Section Header matching 100% to Picture 2 */}
      <div className="mb-12 md:mb-16">
        {/* Massive Section Number sitting flush directly on the dividing line */}
        <div className="flex items-end justify-between border-b border-border/80 dark:border-white/15">
          <span className="inline-block font-sans text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground leading-[0.78] translate-y-[0.14em] select-none">
            {index}
          </span>
          {eyebrow && (
            <span className="mb-2 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/50 select-none">
              {eyebrow}
            </span>
          )}
        </div>

        {/* Section Title below the line */}
        <div className="pt-4 sm:pt-5 max-w-xs sm:max-w-sm md:max-w-md">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-300 dark:text-neutral-300 tracking-tight leading-snug text-balance">
            {title}
          </h2>
        </div>
      </div>

      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: prefersReducedMotion ? 0 : 0.28 },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
