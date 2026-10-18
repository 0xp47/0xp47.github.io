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
      transition={{ duration: prefersReducedMotion ? 0 : 1.4, ease: [0.16, 1, 0.3, 1] as const }}
      className="mx-auto w-full max-w-[1120px] px-6 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-10 scroll-mt-20"
    >
      <div className="mb-10 grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
        <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-2">
          <span className="font-mono text-[11px] font-semibold text-muted-foreground/50 tabular-nums">
            {index}
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80">
            {eyebrow}
          </p>
        </div>
        <div>
          <h2 className="max-w-3xl text-balance text-[1.65rem] font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.85, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.15 }}
            className="mt-6 h-px origin-left bg-border"
          />
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
