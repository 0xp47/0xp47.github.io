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
      {/* Editorial Section Header matching 100% to Image 1 */}
      <div className="mb-12 md:mb-16">
        {/* Massive Section Number sitting flush on the dividing line */}
        <div className="flex items-end justify-between">
          <span className="font-sans text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground leading-none select-none">
            {index}
          </span>
          {eyebrow && (
            <span className="mb-2 sm:mb-3 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/60 select-none">
              {eyebrow}
            </span>
          )}
        </div>

        {/* Horizontal Divider Line directly under the number */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            ease: "easeOut",
            delay: prefersReducedMotion ? 0 : 0.15,
          }}
          className="h-px w-full origin-left bg-border"
        />

        {/* Section Title below the line */}
        <div className="mt-4 sm:mt-5 max-w-2xl">
          <h2 className="text-lg sm:text-xl md:text-2xl font-light text-muted-foreground/90 tracking-tight leading-snug">
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
