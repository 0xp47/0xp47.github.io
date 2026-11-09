"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Terminal, GitMerge, Briefcase, type LucideIcon } from "lucide-react";
import { aboutHighlights, aboutDescription, heroStats, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { cardVariants, fadeUpVariants, EASE_OUT_EXPO } from "@/lib/animation-variants";

const iconMap: Record<string, LucideIcon> = {
  Terminal,
  GitMerge,
  Briefcase,
};

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, {
      duration: 1.5,
      ease: EASE_OUT_EXPO,
      onComplete: () => {
        if (ref.current) {
          ref.current.textContent = `${value}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [value, isInView, motionValue, suffix]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${latest}${suffix}`;
      }
    });
  }, [rounded, suffix]);

  return <span ref={ref}>{value}{suffix}</span>;
}

export function AboutSection() {
  return (
    <Section id="about" eyebrow={sectionMeta.about.eyebrow} title={sectionMeta.about.title}>
      <motion.div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_1.2fr] items-start">
        
        {/* Left Column: Bio and Stats Grid */}
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="flex flex-col gap-6"
        >
          <div className="space-y-3.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 text-pretty">
            {aboutDescription.split("\n\n").map((paragraph, idx) => (
              <motion.p key={idx} variants={fadeUpVariants}>
                {paragraph}
              </motion.p>
            ))}
          </div>
          
          {/* Stats Highlights */}
          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.09 },
              },
            }}
            className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-2"
          >
            {heroStats.map((stat, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="group relative select-none p-[1px] transition-all duration-300 ease-out bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-800/60 dark:hover:bg-neutral-600/80 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                <div
                  className="relative flex flex-col p-2.5 sm:p-3.5 bg-white transition-colors duration-300 group-hover:bg-neutral-50 dark:bg-[#040404] dark:group-hover:bg-[#080808] h-full overflow-hidden"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 9.5px) 0, 100% 9.5px, 100% 100%, 9.5px 100%, 0 calc(100% - 9.5px))",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="tabular-nums text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-[8.5px] sm:text-[9px] font-mono font-bold tracking-wider text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300 uppercase mt-1 leading-tight sm:leading-snug truncate">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Highlights Cards */}
        <motion.div 
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.11 },
            },
          }}
          className="flex flex-col gap-4"
        >
          {aboutHighlights.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Terminal;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative select-none p-[1px] transition-all duration-300 ease-out bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-800/60 dark:hover:bg-neutral-600/80 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_14px_32px_rgba(0,0,0,0.5)]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                }}
              >
                <div
                  className="relative flex gap-4 items-start p-3.5 sm:p-4 bg-white transition-colors duration-300 group-hover:bg-neutral-50 dark:bg-[#040404] dark:group-hover:bg-[#080808] h-full overflow-hidden"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 13.5px) 0, 100% 13.5px, 100% 100%, 13.5px 100%, 0 calc(100% - 13.5px))",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  {/* Framed icon container */}
                  <div className="flex size-9 shrink-0 items-center justify-center chamfer-btn border border-neutral-200 bg-neutral-100 text-neutral-600 transition-all duration-300 group-hover:border-neutral-300 group-hover:text-neutral-900 group-hover:scale-105 dark:border-neutral-800 dark:bg-[#0a0a0a] dark:text-neutral-400 dark:group-hover:border-neutral-700 dark:group-hover:text-white">
                    <IconComponent className="size-4 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0 pr-1">
                    <h4 className="text-[14px] sm:text-[14.5px] font-semibold text-neutral-900 dark:text-white tracking-tight transition-colors duration-200">
                      {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 text-pretty">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </motion.div>
    </Section>
  );
}
