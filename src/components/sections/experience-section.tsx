"use client";

import { motion } from "framer-motion";
import { experience, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { cardVariants } from "@/lib/animation-variants";

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow={sectionMeta.experience.eyebrow} title={sectionMeta.experience.title}>
      <div className="relative mt-8 max-w-[780px]">
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
                className="group relative flex flex-col justify-between rounded-xl border border-neutral-800/80 bg-[#0a0a0a] p-4 sm:p-5 transition-colors duration-200 hover:border-neutral-700 select-none"
              >
                {/* Header row: Position + Active Pill + Duration */}
                <div>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-[15px] font-semibold text-white tracking-tight leading-snug">
                        {item.position}
                      </h3>
                      {isPresent && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[9px] font-semibold tracking-wider uppercase">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                          </span>
                          Active
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-neutral-400 tabular-nums">
                      {item.duration}
                    </span>
                  </div>

                  {/* Company */}
                  <h4 className="mt-1 text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                    {item.company}
                  </h4>

                  {/* Description */}
                  <p className="mt-3 text-xs leading-relaxed text-neutral-400">
                    {item.description}
                  </p>
                </div>

                {/* Skills Chips */}
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] px-2 py-0.5 rounded border border-neutral-800 bg-[#121212] text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
