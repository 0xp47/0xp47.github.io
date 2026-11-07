"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Terminal, GitMerge, Briefcase, type LucideIcon } from "lucide-react";
import { aboutHighlights, aboutDescription, heroStats, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { cardVariants } from "@/lib/animation-variants";

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
      ease: [0.16, 1, 0.3, 1],
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
      <motion.div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
        
        {/* Left Column: Bio and Stats Grid */}
        <motion.div 
          variants={cardVariants}
          className="flex flex-col gap-6"
        >
          <p className="text-sm leading-relaxed text-neutral-400 text-pretty">
            {aboutDescription}
          </p>
          
          {/* Stats Highlights */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
            {heroStats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col p-3.5 sm:p-4 rounded-xl border border-neutral-800/80 bg-[#0a0a0a] hover:border-neutral-700 transition-colors duration-200 select-none"
              >
                <span className="tabular-nums text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-[9px] font-mono font-bold tracking-wider text-neutral-400 uppercase mt-1 leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Highlights Cards */}
        <motion.div 
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 }
            }
          }}
          className="flex flex-col gap-4"
        >
          {aboutHighlights.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Terminal;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative select-none p-[1px] transition-colors duration-200 bg-neutral-800/90 hover:bg-neutral-600"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                }}
              >
                <div
                  className="relative flex gap-4 items-start p-3.5 sm:p-4 bg-[#0a0a0a] transition-colors duration-200 group-hover:bg-[#0d0d10] h-full"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 13.5px) 0, 100% 13.5px, 100% 100%, 13.5px 100%, 0 calc(100% - 13.5px))",
                  }}
                >
                  {/* Framed icon container */}
                  <div className="flex size-9 shrink-0 items-center justify-center chamfer-btn border border-neutral-800 bg-[#121212] text-neutral-400 transition-colors duration-200 group-hover:border-neutral-700 group-hover:text-white">
                    <IconComponent className="size-4" strokeWidth={1.75} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0 pr-1">
                    <h4 className="text-[14px] sm:text-[14.5px] font-semibold text-white tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-neutral-400 text-pretty">
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
