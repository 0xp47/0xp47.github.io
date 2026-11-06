"use client";

import { motion } from "framer-motion";
import { experience, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { cardVariants } from "@/lib/animation-variants";

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow={sectionMeta.experience.eyebrow} title={sectionMeta.experience.title}>
      <div className="relative mt-8 max-w-4xl">
        {/* Vercel Vertical Timeline Line */}
        <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border/80" />

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="space-y-2"
        >
          {experience.map((item) => {
            const isPresent = item.duration.toLowerCase().includes("present");

            return (
              <motion.article
                key={item.company}
                variants={cardVariants}
                className="group relative flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 rounded-xl border border-transparent p-5 pl-10 md:pl-12 transition-all duration-200 hover:border-border dark:hover:border-neutral-800 hover:bg-card dark:hover:bg-[#0a0a0a]"
              >
                {/* Left Column: Company & Timeline Dot */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 min-w-[140px] md:min-w-[180px] shrink-0">
                  {/* Concentric Progress Circle on Timeline */}
                  <div className="absolute left-1 top-[24px] flex size-5 items-center justify-center bg-background z-10">
                    {isPresent ? (
                      <span className="relative flex size-3.5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/30 opacity-75"></span>
                        <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500 border border-background"></span>
                      </span>
                    ) : (
                      <span className="flex size-3 items-center justify-center rounded-full border border-border/80 bg-background group-hover:border-foreground/50 transition-colors duration-200">
                        <span className="size-1 rounded-full bg-muted-foreground/40 group-hover:bg-foreground/60 transition-colors duration-200" />
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-mono text-xs font-semibold text-foreground tracking-tight leading-none uppercase">
                      {item.company}
                    </h4>
                    <span className="mt-1.5 inline-block font-mono text-[10px] text-muted-foreground/70 tabular-nums">
                      {item.duration}
                    </span>
                  </div>
                </div>

                {/* Right Column: Role Details & Tags */}
                <div className="flex-grow max-w-2xl">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-sm font-semibold text-foreground tracking-tight leading-snug">
                      {item.position}
                    </h3>
                    {isPresent && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[8.5px] font-semibold tracking-wider uppercase">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                    {item.description}
                  </p>

                  {/* Skills pills */}
                  {item.tags && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] px-2 py-0.5 rounded border border-border/70 dark:border-neutral-800 bg-neutral-100 dark:bg-[#141416] text-muted-foreground/80 group-hover:border-foreground/30 group-hover:text-foreground transition-colors duration-200"
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
