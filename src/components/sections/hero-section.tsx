"use client";

import { type ComponentType } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { triggerSwarmRebuild } from "@/lib/swarm-rebuild";
import {
  profile,
  skillGroups,
  heroDescription,
  heroAboutSegment,
  heroWorkSegment,
} from "@/lib/portfolio-data";
import * as BrandIcons from "@/components/shared/brand-icons";
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(
  () =>
    import("@/components/shared/particles-background").then(
      (mod) => mod.ParticlesBackground
    ),
  { ssr: false }
);

const technologyIcons: Record<string, ComponentType<{ className?: string }>> = {
  React: BrandIcons.ReactIcon,
  "Next.js": BrandIcons.NextjsIcon,
  TypeScript: BrandIcons.TypescriptIcon,
  "Tailwind CSS": BrandIcons.TailwindIcon,
  "Node.js": BrandIcons.NodejsIcon,
  Express: BrandIcons.ExpressIcon,
  PostgreSQL: BrandIcons.PostgresIcon,
  MongoDB: BrandIcons.MongodbIcon,
  Docker: BrandIcons.DockerIcon,
  AWS: BrandIcons.AwsIcon,
  Vercel: BrandIcons.VercelIcon,
  "Edge Runtime": BrandIcons.EdgeRuntimeIcon,
  Git: BrandIcons.GitIcon,
  GitHub: BrandIcons.GithubIcon,
  Figma: BrandIcons.FigmaIcon,
  Linux: BrandIcons.LinuxIcon,
};

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export function HeroSection({ onScrollToSection }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between pt-4 sm:pt-8 md:pt-16 overflow-hidden">
      <ParticlesBackground />

      {/* Subtle Vercel tech background grids covering entire viewport */}
      <div
        aria-hidden="true"
        className="bg-grid mask-fade-bottom absolute inset-0 -z-10 h-full opacity-10 dark:opacity-15 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--foreground)_3%,transparent),transparent_60%)] pointer-events-none"
      />

      {/* Large Centered Portrait Cutout (positioned absolutely in background, sitting flush on top of marquee) */}
      <div className="absolute inset-x-0 bottom-16 top-0 z-0 hidden md:flex items-end justify-center pointer-events-none">
        <div className="relative h-[80%] md:h-[84%] lg:h-[88%] w-full max-w-[400px] md:max-w-[460px] lg:max-w-[520px] origin-bottom [mask-image:linear-gradient(to_bottom,black_88%,transparent)]">
          <Image
            src="/images/me.png"
            alt="Jay Patrick Cano (Pat) - Senior Full-Stack Engineer Portrait Cutout"
            fill
            priority
            unoptimized
            className="object-contain object-bottom contrast-[1.03] transition duration-500"
          />
        </div>
      </div>

      <section className="flex-1 flex items-end pb-4 relative z-10">
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-10 pb-4 sm:pb-8 md:pb-12 lg:pb-14">
          <div className="relative z-10 grid gap-8 md:grid-cols-[1.25fr_1.1fr_0.9fr] md:items-end">
            {/* Left Column: Vercel Status Badge, Headline, and Rebuild trigger */}
            <div className="pb-8 md:pb-16 lg:pb-24 order-2 md:order-1">
              {/* Vercel Operational Availability Pill */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/80 dark:border-neutral-800 bg-neutral-100 dark:bg-[#141416] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-foreground">Available For Work</span>
                <span className="text-border">·</span>
                <span>Full-Stack &amp; AI</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="h-0.5 w-12 bg-foreground origin-left"
              />

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-5 text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
              >
                {"I'm Pat, a"}
                <br />
                <span className="text-foreground block whitespace-nowrap">
                  Full{"\u2011"}Stack Engineer
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-4 max-w-sm text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm sm:leading-6"
              >
                {heroDescription}
              </motion.p>

              {/* Action Buttons: Vercel Rebuild HUD & Quick Connect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-8 flex items-center gap-3 md:mt-10"
              >
                <button
                  type="button"
                  onClick={() => triggerSwarmRebuild()}
                  className="group relative flex size-12 items-center justify-center rounded-full bg-foreground text-background shadow-md shadow-black/15 transition-all duration-200 hover:scale-105 hover:bg-foreground/90 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-hidden"
                  aria-label="Trigger Swarm Rebuild HUD (Alt+Shift+S)"
                  title="Trigger Swarm Rebuild HUD (Alt+Shift+S)"
                >
                  <ArrowDown className="size-5 stroke-[2.5] transition-transform duration-200 group-hover:translate-y-0.5" />
                </button>

                <div className="flex flex-col">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                    Swarm HUD
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground/60">
                    Press Alt+Shift+S to simulate
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Center Column: Mobile Portrait cutout on mobile */}
            <div className="relative flex justify-center md:block order-1 md:order-2">
              <div className="relative aspect-[3.2/4] w-full max-w-[340px] sm:max-w-[420px] md:hidden">
                <Image
                  src="/images/me.png"
                  alt="Jay Patrick Cano (Pat) - Senior Full-Stack Engineer Portrait Mobile View"
                  fill
                  priority
                  unoptimized
                  className="object-contain object-bottom contrast-[1.03]"
                />
              </div>
            </div>

            {/* Right Column: About, Work and Follow segments in clean Vercel layout (unboxed, no cards) */}
            <div className="hidden md:flex pb-8 md:pb-16 lg:pb-24 flex-col gap-8 order-3">
              {/* About Me Segment */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.2em] text-foreground uppercase">
                  <Sparkles className="size-3 text-amber-500" />
                  <span>About Me</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
                  {heroAboutSegment}
                </p>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToSection("#about");
                  }}
                  className="inline-flex items-center gap-1 font-mono text-[10px] font-bold tracking-widest text-foreground hover:underline pt-0.5"
                >
                  LEARN MORE &rarr;
                </a>
              </motion.div>

              {/* My Work Segment */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="space-y-2"
              >
                <h3 className="font-mono text-[10px] font-bold tracking-[0.2em] text-foreground uppercase">
                  My Work
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
                  {heroWorkSegment}
                </p>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToSection("#projects");
                  }}
                  className="inline-flex items-center gap-1 font-mono text-[10px] font-bold tracking-widest text-foreground hover:underline pt-0.5"
                >
                  BROWSE PORTFOLIO &rarr;
                </a>
              </motion.div>

              {/* Follow Me Segment */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pt-1"
              >
                <h3 className="font-mono text-[10px] font-bold tracking-[0.2em] text-muted-foreground/60 uppercase mb-3">
                  Connect
                </h3>
                <div className="flex items-center gap-4">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <svg className="size-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <svg className="size-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href={profile.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    aria-label="Facebook"
                    title="Facebook"
                  >
                    <svg className="size-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a
                    href={profile.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <svg className="size-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Marquee Ticker */}
      <div id="skills" className="relative overflow-hidden border-y border-border/80 bg-background py-4.5 z-10">
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
                  className="flex shrink-0 items-center gap-2.5 text-[12.5px] font-medium tracking-wide text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  <Icon className="size-3.5 text-muted-foreground/70" />
                  {item}
                  <span aria-hidden="true" className="ml-7 text-foreground/15 select-none">
                    ·
                  </span>
                </span>
              );
            });
          })}
        </motion.div>
      </div>
    </div>
  );
}
