"use client";

import { useState, type ComponentType } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Play, Sparkles } from "lucide-react";
import { triggerSwarmRebuild } from "@/lib/swarm-rebuild";
import { skillGroups } from "@/lib/portfolio-data";
import * as BrandIcons from "@/components/shared/brand-icons";
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(
  () => import("@/components/shared/particles-background").then((mod) => mod.ParticlesBackground),
  { ssr: false }
);

const technologyIcons: Record<string, ComponentType<{ className?: string }>> = {
  "React": BrandIcons.ReactIcon,
  "Next.js": BrandIcons.NextjsIcon,
  "TypeScript": BrandIcons.TypescriptIcon,
  "Tailwind CSS": BrandIcons.TailwindIcon,
  "Node.js": BrandIcons.NodejsIcon,
  "Express": BrandIcons.ExpressIcon,
  "PostgreSQL": BrandIcons.PostgresIcon,
  "MongoDB": BrandIcons.MongodbIcon,
  "Docker": BrandIcons.DockerIcon,
  "AWS": BrandIcons.AwsIcon,
  "Vercel": BrandIcons.VercelIcon,
  "Edge Runtime": BrandIcons.EdgeRuntimeIcon,
  "Git": BrandIcons.GitIcon,
  "GitHub": BrandIcons.GithubIcon,
  "Figma": BrandIcons.FigmaIcon,
  "Linux": BrandIcons.LinuxIcon,
};

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export function HeroSection({ onScrollToSection }: HeroSectionProps) {
  const [sliderPos, setSliderPos] = useState(65);

  return (
    <div className="relative flex flex-col justify-between overflow-hidden pt-2 sm:pt-4">
      {/* Outer Industrial Tablet Bezel Frame (Inspired by high-end avant-garde industrial UI) */}
      <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-8 my-2 sm:my-3 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border-[1.5px] border-neutral-900/80 dark:border-neutral-700/80 bg-[#ECEAE6] dark:bg-[#0D1017] text-neutral-900 dark:text-neutral-100 relative overflow-hidden shadow-2xl transition-colors duration-500">
        
        {/* Subtle background particles & grid inside framed canvas */}
        <ParticlesBackground />
        
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] dark:opacity-[0.06] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"
        />

        {/* 1. TOP BAR INSIDE THE FRAME */}
        <header className="relative z-20 flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8 md:px-12 md:pt-10">
          {/* Brand Mark */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold tracking-widest text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5 select-none">
              <span className="text-sm leading-none font-sans font-light">⋈</span>
              <span>0XP47</span>
            </span>
          </div>

          {/* Quick Section Jump / Minimalist Double-Line Menu Indicator */}
          <button
            type="button"
            onClick={() => onScrollToSection("#about")}
            className="group flex flex-col items-end gap-1.5 p-2 text-neutral-900 dark:text-neutral-100 hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Navigate down to About section"
            title="Scroll to About"
          >
            <span className="h-[2px] w-6 bg-current transition-transform duration-300 group-hover:w-7" />
            <span className="h-[2px] w-4 bg-current transition-transform duration-300 group-hover:w-7" />
          </button>
        </header>

        {/* 2. MAIN EDITORIAL HERO CONTENT */}
        <div className="relative z-10 px-6 pt-6 pb-8 sm:px-10 sm:pb-12 md:px-12 md:pb-14 min-h-[580px] sm:min-h-[660px] md:min-h-[720px] lg:min-h-[780px] flex flex-col justify-between">
          
          {/* Top Half: Index & Bold Editorial Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Column: Index & Big Bold Headline */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                  01/07
                </span>
                <span className="h-px w-8 bg-neutral-400/40 dark:bg-neutral-600/40" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  Full-Stack Architect
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 text-balance text-3xl font-black uppercase leading-[1.04] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] text-neutral-950 dark:text-white"
              >
                Changing<br />
                Your Idea Of<br />
                What Software<br />
                Can Do
              </motion.h1>
            </div>

            {/* Right Column: Two-Column Specifications & Data Links */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-10">
              
              {/* Dual Column Specs */}
              <div className="grid grid-cols-2 gap-6 text-[11px] sm:text-xs font-mono">
                <div className="space-y-1.5">
                  <a
                    href="#about"
                    onClick={(e) => { e.preventDefault(); onScrollToSection("#about"); }}
                    className="block font-semibold underline underline-offset-4 decoration-neutral-400/60 hover:text-neutral-500 transition-colors"
                  >
                    Architecture
                  </a>
                  <a
                    href="#services"
                    onClick={(e) => { e.preventDefault(); onScrollToSection("#services"); }}
                    className="block text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
                  >
                    Full-Stack Systems
                  </a>
                  <a
                    href="#experience"
                    onClick={(e) => { e.preventDefault(); onScrollToSection("#experience"); }}
                    className="block text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
                  >
                    Engineering Lead
                  </a>
                </div>

                <div className="space-y-1.5">
                  <a
                    href="#certifications"
                    onClick={(e) => { e.preventDefault(); onScrollToSection("#certifications"); }}
                    className="block font-semibold text-neutral-900 dark:text-neutral-100 hover:underline transition-colors"
                  >
                    Anthropic AI
                  </a>
                  <a
                    href="#projects"
                    onClick={(e) => { e.preventDefault(); onScrollToSection("#projects"); }}
                    className="block text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
                  >
                    Autonomous Agents
                  </a>
                  <a
                    href="#certifications"
                    onClick={(e) => { e.preventDefault(); onScrollToSection("#certifications"); }}
                    className="block text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
                  >
                    Cloud & Security
                  </a>
                </div>
              </div>

              {/* Interactive N — P Technical Slider / Coordinate Dial */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-neutral-800 dark:text-neutral-200">
                  <span>DEV</span>
                  <div className="relative flex-1 mx-4 flex items-center">
                    <div className="h-[1.5px] w-full bg-neutral-900/60 dark:bg-neutral-100/60" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPos}
                      onChange={(e) => setSliderPos(Number(e.target.value))}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer"
                      aria-label="Development to Architecture Focus Slider"
                    />
                    <motion.div
                      style={{ left: `${sliderPos}%` }}
                      className="absolute size-3 -translate-x-1/2 rounded-full border-2 border-neutral-900 dark:border-neutral-100 bg-white dark:bg-neutral-900 shadow-xs pointer-events-none"
                    />
                  </div>
                  <span>ARCH</span>
                </div>
              </div>

              {/* Technical Bio Editorial Copy */}
              <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300 text-pretty">
                Architecting resilient full-stack platforms, autonomous AI workflows, and cross-platform mobile apps to solve real-world operational bottlenecks with measurable business ROI.
              </p>
            </div>
          </div>

          {/* 3. LAYERED CENTERPIECE: GIANT WATERMARK TYPOGRAPHY + PORTRAIT */}
          <div className="relative my-auto flex items-end justify-center pointer-events-none select-none overflow-hidden h-[360px] sm:h-[440px] md:h-[500px] lg:h-[560px]">
            
            {/* Giant Background Lettering '0XP' (Left) and '47' (Right) */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-between px-2 sm:px-6 md:px-12 pointer-events-none select-none z-0">
              <span className="font-sans font-black text-[9rem] sm:text-[13rem] md:text-[18rem] lg:text-[22rem] leading-none text-white/70 dark:text-white/[0.04] tracking-tighter">
                0XP
              </span>
              <span className="font-sans font-black text-[9rem] sm:text-[13rem] md:text-[18rem] lg:text-[22rem] leading-none text-white/70 dark:text-white/[0.04] tracking-tighter">
                47
              </span>
            </div>

            {/* Central Portrait of Pat (Transparent Cutout positioned in the center between 0XP and 47) */}
            <div className="relative z-10 h-full w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] flex items-end justify-center">
              <div className="relative h-full w-full">
                <Image
                  src="/images/me.png"
                  alt="Jay Patrick Cano (Pat) - Senior Full-Stack Engineer"
                  fill
                  priority
                  unoptimized
                  className="object-contain object-bottom contrast-[1.04] drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>
          </div>

          {/* 4. BOTTOM BAR: INTERACTIVE PREVIEW PILL & VERTICAL SCROLL INDICATOR */}
          <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-4 border-t border-neutral-400/25 dark:border-neutral-700/30">
            
            {/* Bottom-Left Feature Thumbnail Card (Triggers Swarm Rebuild Tour) */}
            <motion.button
              type="button"
              onClick={() => triggerSwarmRebuild()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3.5 rounded-xl border border-neutral-900/15 dark:border-neutral-100/15 bg-white/70 dark:bg-neutral-900/70 p-2 sm:p-2.5 backdrop-blur-md shadow-sm hover:border-neutral-900/40 dark:hover:border-neutral-100/40 transition-all text-left cursor-pointer"
              title="Launch Swarm Rebuild Tour"
            >
              {/* Mini Video / Tour Thumbnail */}
              <div className="relative size-11 sm:size-12 shrink-0 overflow-hidden rounded-lg bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 to-neutral-700 opacity-90" />
                <Play className="relative z-10 size-4 fill-white text-white group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-1 right-1 size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Micro-caption */}
              <div className="max-w-[220px] sm:max-w-[260px]">
                <div className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <Sparkles className="size-2.5 text-amber-500" />
                  <span>Interactive Swarm</span>
                </div>
                <p className="text-[11px] font-semibold leading-snug text-neutral-900 dark:text-neutral-100 line-clamp-2">
                  Launch the Swarm Rebuild HUD &amp; live architecture tour
                </p>
              </div>
            </motion.button>

            {/* Bottom-Right Scroll Down Action & Indicator */}
            <div className="flex items-center gap-4 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => onScrollToSection("#about")}
                className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-neutral-800 dark:text-neutral-200 hover:opacity-75 transition-opacity cursor-pointer"
                aria-label="Scroll to next section"
              >
                <span>Scroll</span>
                <span className="flex size-7 items-center justify-center rounded-full border border-neutral-900/30 dark:border-neutral-100/30 bg-white/40 dark:bg-neutral-900/40">
                  <ArrowDown className="size-3.5 stroke-[2.5]" />
                </span>
              </button>
            </div>
          </div>

          {/* Far Right Rotated Vertical 'scroll' Indicator (Desktop only) */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-2 rotate-90 origin-right">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
              scroll
            </span>
            <span className="h-px w-6 bg-neutral-300 dark:bg-neutral-700" />
          </div>

        </div>
      </div>

      {/* 5. TECH MARQUEE TICKER (Seamlessly anchors Hero to subsequent sections) */}
      <div id="skills" className="relative overflow-hidden border-y border-border bg-background py-4.5 z-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex w-max items-center gap-10 pr-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 32,
            repeat: Infinity,
          }}
        >
          {[...skillGroups, ...skillGroups].flatMap((group, gi) => {
            return group.items.map((item, ii) => {
              const Icon = technologyIcons[item] || BrandIcons.ReactIcon;
              return (
                <span
                  key={`${gi}-${ii}`}
                  className="flex shrink-0 items-center gap-2.5 text-[13px] tracking-wide text-neutral-500 dark:text-neutral-400 transition-colors duration-300 hover:text-foreground"
                >
                  <Icon className="size-4 text-neutral-400 dark:text-neutral-500" />
                  {item}
                  <span aria-hidden="true" className="ml-7 text-foreground/15 select-none">·</span>
                </span>
              );
            });
          })}
        </motion.div>
      </div>
    </div>
  );
}
