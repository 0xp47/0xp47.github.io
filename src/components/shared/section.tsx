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

export function Section({ id, eyebrow, title, children }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: prefersReducedMotion ? 0 : 1.4, ease: [0.16, 1, 0.3, 1] as const }}
      className="mx-auto w-full max-w-[1120px] px-6 py-12 sm:px-8 sm:py-14 md:py-20 lg:px-10"
    >
      <div className="mb-8 grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
        <div className="flex items-center gap-3 md:items-start">
          <span className="mt-2 hidden h-px w-10 bg-border md:block" />
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
        </div>
        <div>
          <h2 className="max-w-3xl text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.85, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.15 }}
            className="mt-5 h-px origin-left bg-gradient-to-r from-foreground/25 via-border to-transparent"
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
