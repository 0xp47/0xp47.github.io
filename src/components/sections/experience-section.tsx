"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Experience" title="A history of building products and platforms.">
      <div className="relative mt-12 max-w-4xl">
        {/* Sleek Vertical Progress Line */}
        <div className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-foreground/20 via-border/10 to-transparent" />

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="space-y-4"
        >
          {experience.map((item) => {
            const isPresent = item.duration.toLowerCase().includes("present");

            return (
              <motion.article
                key={item.company}
                variants={cardVariants}
                className="group relative flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 border-b border-border/10 py-6 hover:border-foreground/20 transition-all duration-300 pl-10 md:pl-12"
              >
                {/* Left Column: Company & Timeline Dot */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 min-w-[140px] md:min-w-[180px] shrink-0">
                  {/* Elegant Concentric Progress Circle on Timeline */}
                  <div className="absolute left-0 top-[22px] flex size-6 items-center justify-center bg-background z-10">
                    {isPresent ? (
                      <span className="relative flex size-4 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/20 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-foreground border-2 border-background"></span>
                      </span>
                    ) : (
                      <span className="flex size-3.5 items-center justify-center rounded-full border border-border/50 bg-background group-hover:border-foreground/45 transition-colors duration-300">
                        <span className="size-1.5 rounded-full bg-muted-foreground/30 group-hover:bg-foreground/50 transition-colors duration-300" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground tracking-tight leading-none uppercase">
                      {item.company}
                    </h4>
                    <span className="mt-1.5 inline-block font-mono text-[10px] text-muted-foreground/60">
                      {item.duration}
                    </span>
                  </div>
                </div>

                {/* Right Column: Role Details & Tags */}
                <div className="flex-grow max-w-2xl">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-sm font-bold text-foreground tracking-tight leading-snug">
                      {item.position}
                    </h3>
                    {isPresent && (
                      <span className="flex items-center gap-1.5 rounded-full bg-foreground/[0.04] px-2 py-0.5 border border-foreground/10">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/30 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-foreground/80"></span>
                        </span>
                        <span className="font-mono text-[8px] tracking-wider uppercase text-foreground/60 font-semibold">
                          Active
                        </span>
                      </span>
                    )}
                  </div>

                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground/80 group-hover:text-neutral-200 transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* Skills/Tags */}
                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[8.5px] tracking-wider uppercase text-muted-foreground/50 border border-border/10 bg-foreground/[0.01] rounded-full px-2.5 py-0.5 group-hover:border-foreground/20 group-hover:text-foreground/70 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}

