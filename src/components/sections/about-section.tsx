"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Terminal, GitMerge, Briefcase, type LucideIcon } from "lucide-react";
import { aboutHighlights, aboutDescription, heroStats, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";

const iconMap: Record<string, LucideIcon> = {
  Terminal,
  GitMerge,
  Briefcase,
};

import { cardVariants } from "@/lib/animation-variants";

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
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            {aboutDescription}
          </p>
          
          {/* Sleek Stats Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/10 mt-2">
            {heroStats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-[9px] font-mono font-bold tracking-wider text-muted-foreground uppercase mt-1 leading-snug">
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
          className="flex flex-col gap-6"
        >
          {aboutHighlights.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Terminal;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group flex gap-4 items-start pb-6 border-b border-border/10 last:border-0 last:pb-0"
              >
                {/* Minimal transparent icon container */}
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-foreground/5 text-foreground/75 group-hover:bg-foreground/10 group-hover:text-foreground transition-all duration-300 mt-1">
                  <IconComponent className="size-[18px]" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm leading-relaxed text-neutral-300 text-pretty group-hover:text-foreground transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </motion.div>
    </Section>
  );
}
