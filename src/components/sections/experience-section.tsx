"use client";

import { motion } from "framer-motion";
import { experience, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";

import { cardVariants } from "@/lib/animation-variants";

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow={sectionMeta.experience.eyebrow} title={sectionMeta.experience.title}>
      <div className="relative mt-12 max-w-4xl">
        {/* Sleek Vertical Progress Line */}
        <div className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-foreground/30 via-border/40 to-transparent" />

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
                className="group relative flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 border-b border-border/40 py-6 hover:border-foreground/30 hover:pl-11 md:hover:pl-13 transition-all duration-300 pl-10 md:pl-12"
              >
                {/* Left Column: Company & Timeline Dot */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 min-w-[140px] md:min-w-[180px] shrink-0">
                  {/* Elegant Concentric Progress Circle on Timeline */}
                  <div className="absolute left-0 top-[22px] flex size-6 items-center justify-center bg-background z-10">
                    {isPresent ? (
                      <span className="relative flex size-4 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/25 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-background"></span>
                      </span>
                    ) : (
                      <span className="flex size-3.5 items-center justify-center rounded-full border border-border/60 bg-background group-hover:border-foreground/45 transition-colors duration-300">
                        <span className="size-1.5 rounded-full bg-muted-foreground/35 group-hover:bg-foreground/50 transition-colors duration-300" />
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
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[8.5px] font-semibold tracking-wider uppercase">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        Active
                      </span>
                    )}
                  </div>

                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground/80 group-hover:text-foreground transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* Skills as sleek pills */}
                  {item.tags && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] px-2 py-0.5 rounded-md border border-border/40 bg-foreground/[0.02] text-muted-foreground/75 group-hover:border-foreground/20 group-hover:text-foreground transition-colors duration-300"
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

