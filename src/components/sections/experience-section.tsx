"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Experience" title="A history of building products and platforms.">
      <div className="relative">
        <div className="absolute left-3 top-2 hidden h-[calc(100%-1rem)] w-px bg-border md:block" />
        <motion.div 
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid gap-5"
        >
          {experience.map((item) => (
            <motion.article
              key={item.company}
              variants={cardVariants}
              className="relative grid gap-3 md:grid-cols-[160px_1fr] md:gap-8 md:pl-10"
            >
              <span className="absolute left-0 top-2 hidden size-6 rounded-full border border-border bg-background md:block" />
              <div className="font-mono text-sm text-muted-foreground">{item.duration}</div>
              <div className="border-b border-border pb-5">
                <h3 className="text-lg font-semibold text-foreground">{item.position}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.company}</p>
                <p className="mt-3 max-w-2xl text-pretty text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
