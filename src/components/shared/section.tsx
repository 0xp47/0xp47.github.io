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
  eyebrow?: string;
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

export function Section({ id, title, children }: SectionProps) {
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
        <div className="font-sans text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight text-foreground leading-[0.72] select-none">
          {index}
        </div>

        {/* Full-width razor-sharp horizontal dividing line */}
        <div className="w-full h-px bg-neutral-300 dark:bg-neutral-800 -mt-px" />

        {/* Section Title below the line */}
        <div className="pt-3.5 max-w-xs sm:max-w-sm md:max-w-md">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-700 dark:text-neutral-300 tracking-tight leading-snug">
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
