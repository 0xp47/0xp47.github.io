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
      duration: 1.2,
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
        {/* Left Column: Bio and Vercel Bento Stats Grid */}
        <motion.div variants={cardVariants} className="flex flex-col gap-6">
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            {aboutDescription}
          </p>

          {/* Vercel Metrics Bento Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
            {heroStats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-xl border border-border bg-card dark:bg-[#0a0a0a] p-4 transition-all duration-200 hover:border-foreground/40 dark:hover:border-neutral-700 shadow-xs"
              >
                <span className="tabular-nums text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-1 font-mono text-[9px] font-medium uppercase tracking-wider text-muted-foreground leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Vercel Highlight Cards */}
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
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
                className="group flex gap-4 items-start rounded-xl border border-border bg-card dark:bg-[#0a0a0a] p-4.5 transition-all duration-200 hover:border-foreground/40 dark:hover:border-neutral-700"
              >
                {/* Framed icon container */}
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/80 dark:border-neutral-800 bg-neutral-100 dark:bg-[#141416] text-foreground transition-all duration-200 group-hover:scale-105 group-hover:border-foreground/40">
                  <IconComponent className="size-4" strokeWidth={1.8} />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-semibold text-foreground tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-muted-foreground text-pretty transition-colors duration-200 group-hover:text-foreground">
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
