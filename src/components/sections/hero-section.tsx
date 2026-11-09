"use client";

import { type ComponentType, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLenis } from "lenis/react";
import { isSwarmRebuildActive, triggerSwarmRebuild } from "@/lib/swarm-rebuild";
import { profile, skillGroups, heroDescription, heroAboutSegment, heroWorkSegment } from "@/lib/portfolio-data";
import { EASE_OUT_EXPO } from "@/lib/animation-variants";
import * as BrandIcons from "@/components/shared/brand-icons";
import dynamic from "next/dynamic";
import { BitmapChevron } from "@/components/shared/bitmap-chevron";
import { AnimatedNoise } from "@/components/shared/animated-noise";

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

function subscribeSwarmState(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("swarm-rebuild-state", callback);
  return () => {
    window.removeEventListener("swarm-rebuild-state", callback);
  };
}

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
  isReady?: boolean;
}

export function HeroSection({ onScrollToSection, isReady = true }: HeroSectionProps) {
  const lenis = useLenis();
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.12 });
  const isSwarmActive = useSyncExternalStore(
    subscribeSwarmState,
    () => isSwarmRebuildActive(),
    () => false
  );

  const showHero = isReady && isHeroInView;
  const animateState = showHero ? "visible" : "hidden";

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between pt-6 sm:pt-10 md:pt-20 overflow-hidden"
    >
      <ParticlesBackground />
      <AnimatedNoise opacity={0.03} />

      {/* Subtle tech background grids covering entire viewport */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={showHero ? { opacity: 0.15 } : { opacity: 0 }}
        transition={{ duration: 1.4, delay: 0.15, ease: EASE_OUT_EXPO }}
        className="bg-grid mask-fade-bottom absolute inset-0 -z-10 h-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--foreground)_2%,transparent),transparent_50%)]"
      />

      {/* Large Centered Portrait Cutout (positioned absolutely in background, sitting flush on top of marquee) */}
      <div className="absolute inset-x-0 bottom-16 top-0 z-0 hidden md:flex items-end justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 36 }}
          animate={
            showHero
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.92, y: 36 }
          }
          transition={{
            duration: 1.35,
            delay: 0.3,
            ease: EASE_OUT_EXPO,
          }}
          className="relative h-[80%] md:h-[84%] lg:h-[88%] w-full max-w-[400px] md:max-w-[460px] lg:max-w-[520px] origin-bottom [mask-image:linear-gradient(to_bottom,black_88%,transparent)] will-change-transform"
        >
          <Image
            src="/images/me.png"
            alt="Jay Patrick Cano (Pat) - Senior Full-Stack Engineer Portrait Cutout"
            fill
            priority
            unoptimized
            className="object-contain object-bottom grayscale contrast-[1.12] transition duration-500"
          />
        </motion.div>
      </div>

      <section className="flex-1 flex items-end pb-4 relative z-10">
        <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-10 pb-4 sm:pb-8 md:pb-12 lg:pb-14">
          <div className="relative z-10 grid gap-8 md:grid-cols-[1.2fr_1.1fr_0.9fr] md:items-end">
            
            {/* Left Column: Headline and scroll down indicator */}
            <div className="pb-8 md:pb-16 lg:pb-24 order-2 md:order-1">
              <motion.div
                initial="hidden"
                animate={animateState}
                variants={{
                  hidden: { opacity: 0, y: -16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1.05,
                      delay: 0.18,
                      ease: EASE_OUT_EXPO,
                    },
                  },
                }}
                className="mb-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground select-none will-change-transform"
              >
                <span className="size-1.5 bg-foreground" />
                <span>SYS.SPEC // 2026</span>
                <span className="opacity-40">|</span>
                <span>MAASIN_PH // 10.1335°N 124.8724°E</span>
              </motion.div>
              <motion.div
                initial="hidden"
                animate={animateState}
                variants={{
                  hidden: { opacity: 0, scaleX: 0 },
                  visible: {
                    opacity: 1,
                    scaleX: 1,
                    transition: {
                      duration: 1.15,
                      delay: 0.24,
                      ease: EASE_OUT_EXPO,
                    },
                  },
                }}
                className="h-0.5 w-16 bg-foreground origin-left will-change-transform"
              />

              <motion.h1
                initial="hidden"
                animate={animateState}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.14,
                      delayChildren: 0.3,
                    },
                  },
                }}
                className="mt-6 text-3xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
              >
                <span className="block overflow-hidden pb-0.5">
                  <motion.span
                    variants={{
                      hidden: { y: "110%", opacity: 0 },
                      visible: {
                        y: "0%",
                        opacity: 1,
                        transition: {
                          duration: 1.2,
                          ease: EASE_OUT_EXPO,
                        },
                      },
                    }}
                    className="block will-change-transform"
                  >
                    {"I'm Pat, a"}
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    variants={{
                      hidden: { y: "110%", opacity: 0 },
                      visible: {
                        y: "0%",
                        opacity: 1,
                        transition: {
                          duration: 1.25,
                          ease: EASE_OUT_EXPO,
                        },
                      },
                    }}
                    className="text-foreground block sm:whitespace-nowrap will-change-transform"
                  >
                    Full-Stack Engineer
                  </motion.span>
                </span>
              </motion.h1>

              <motion.p
                initial="hidden"
                animate={animateState}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1.15,
                      delay: 0.48,
                      ease: EASE_OUT_EXPO,
                    },
                  },
                }}
                className="mt-5 max-w-sm text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm sm:leading-6 will-change-transform"
              >
                {heroDescription}
              </motion.p>

              {/* Swarm Rebuild button + Right-side supporting animation description */}
              <motion.div
                initial="hidden"
                animate={animateState}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1.15,
                      delay: 0.6,
                      ease: EASE_OUT_EXPO,
                    },
                  },
                }}
                className="mt-8 flex flex-wrap items-center gap-3.5 will-change-transform"
              >
                {/* Swarm Rebuild / Explore Button */}
                <button
                  type="button"
                  onClick={() => {
                    lenis?.scrollTo(0, { immediate: true });
                    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                    triggerSwarmRebuild();
                  }}
                  className="group relative select-none p-[1px] transition-colors duration-200 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-800/60 dark:hover:bg-neutral-700 cursor-pointer"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                  }}
                  aria-label="Rebuild page with swarm (Alt+Shift+S)"
                  title="Rebuild page with swarm (Alt+Shift+S)"
                >
                  <div
                    className="flex size-11 items-center justify-center bg-white transition-colors duration-200 group-hover:bg-neutral-50 dark:bg-[#040404] dark:group-hover:bg-[#080808]"
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 9.5px) 0, 100% 9.5px, 100% 100%, 9.5px 100%, 0 calc(100% - 9.5px))",
                    }}
                  >
                    <ArrowDown className="size-4.5 text-neutral-700 group-hover:text-black dark:text-neutral-300 dark:group-hover:text-white transition-transform duration-200 group-hover:translate-y-0.5" />
                  </div>
                </button>

                {/* Supporting animation description on the right side of the Swarm Rebuild button */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={showHero ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.72,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="pointer-events-none select-none min-w-0 flex items-center gap-3 will-change-transform"
                >
                  <span
                    aria-hidden="true"
                    className="h-6 w-px shrink-0 bg-neutral-300/80 dark:bg-neutral-800/90"
                  />
                  <AnimatePresence mode="wait" initial={false}>
                    {isSwarmActive ? (
                      <motion.div
                        key="swarm-active"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                        className="flex flex-col justify-center gap-1 font-mono"
                      >
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground leading-none">
                          <span className="relative flex size-1.5 shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/60 opacity-75" />
                            <span className="relative inline-flex size-1.5 rounded-full bg-foreground" />
                          </span>
                          <span>Reconstructing UI</span>
                        </span>
                        <span className="text-[9.5px] tracking-[0.06em] text-muted-foreground/75 leading-none">
                          Visual sequence active
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="swarm-idle"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                        className="flex flex-col justify-center gap-1 font-mono"
                      >
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/85 leading-none">
                          Deconstruct UI
                        </span>
                        <span className="text-[9.5px] tracking-[0.06em] text-muted-foreground/65 leading-none">
                          Trigger visual sequence
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </div>

            {/* Center Column: Spacer on desktop, Mobile Portrait cutout on mobile */}
            <div className="relative flex justify-center md:block order-1 md:order-2">
              {/* Mobile Portrait cutout (visible only on mobile) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 24 }}
                animate={
                  showHero
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.93, y: 24 }
                }
                transition={{
                  duration: 1.25,
                  delay: 0.24,
                  ease: EASE_OUT_EXPO,
                }}
                className="relative aspect-[3.2/4] w-full max-w-[340px] sm:max-w-[420px] md:hidden will-change-transform"
              >
                <Image
                  src="/images/me.png"
                  alt="Jay Patrick Cano (Pat) - Senior Full-Stack Engineer Portrait Mobile View"
                  fill
                  priority
                  unoptimized
                  className="object-contain object-bottom grayscale contrast-[1.12]"
                />
              </motion.div>
            </div>

            {/* Right Column: About, Work and Follow segments (hidden on mobile to prevent viewport overflow) */}
            <div className="hidden md:flex pb-8 md:pb-16 lg:pb-24 flex-col gap-8 order-3">
              
              {/* About Me Segment */}
              <motion.div
                initial="hidden"
                animate={animateState}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1.15,
                      delay: 0.42,
                      ease: EASE_OUT_EXPO,
                    },
                  },
                }}
                className="will-change-transform"
              >
                <h3 className="font-mono text-[11px] font-bold tracking-[0.22em] text-foreground uppercase">
                  ABOUT ME
                </h3>
                <p className="mt-2.5 text-[13px] md:text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {heroAboutSegment}
                </p>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToSection("#about");
                  }}
                  className="group relative inline-flex items-center select-none p-[1px] transition-all duration-300 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-800/60 dark:hover:bg-neutral-700 hover:-translate-y-0.5 active:scale-[0.98] mt-3"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  }}
                >
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white transition-colors duration-200 group-hover:bg-neutral-50 dark:bg-[#040404] dark:group-hover:bg-[#080808] font-mono text-[9.5px] font-bold tracking-widest text-neutral-800 group-hover:text-black dark:text-neutral-300 dark:group-hover:text-white"
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 7.5px) 0, 100% 7.5px, 100% 100%, 7.5px 100%, 0 calc(100% - 7.5px))",
                    }}
                  >
                    <span>LEARN MORE</span>
                    <BitmapChevron className="transition-transform duration-300 ease-in-out group-hover:rotate-45 group-hover:translate-x-0.5 size-2.5 text-neutral-500 group-hover:text-black dark:text-neutral-400 dark:group-hover:text-white" />
                  </span>
                </a>
              </motion.div>

              {/* My Work Segment */}
              <motion.div
                initial="hidden"
                animate={animateState}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1.15,
                      delay: 0.56,
                      ease: EASE_OUT_EXPO,
                    },
                  },
                }}
                className="will-change-transform"
              >
                <h3 className="font-mono text-[11px] font-bold tracking-[0.22em] text-foreground uppercase">
                  MY WORK
                </h3>
                <p className="mt-2.5 text-[13px] md:text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {heroWorkSegment}
                </p>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToSection("#projects");
                  }}
                  className="group relative inline-flex items-center select-none p-[1px] transition-all duration-300 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-800/60 dark:hover:bg-neutral-700 hover:-translate-y-0.5 active:scale-[0.98] mt-3"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  }}
                >
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white transition-colors duration-200 group-hover:bg-neutral-50 dark:bg-[#040404] dark:group-hover:bg-[#080808] font-mono text-[9.5px] font-bold tracking-widest text-neutral-800 group-hover:text-black dark:text-neutral-300 dark:group-hover:text-white"
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 7.5px) 0, 100% 7.5px, 100% 100%, 7.5px 100%, 0 calc(100% - 7.5px))",
                    }}
                  >
                    <span>VIEW PROJECTS</span>
                    <BitmapChevron className="transition-transform duration-300 ease-in-out group-hover:rotate-45 group-hover:translate-x-0.5 size-2.5 text-neutral-500 group-hover:text-black dark:text-neutral-400 dark:group-hover:text-white" />
                  </span>
                </a>
              </motion.div>

              {/* Follow Me Segment */}
              <motion.div
                initial="hidden"
                animate={animateState}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1.15,
                      delay: 0.7,
                      ease: EASE_OUT_EXPO,
                    },
                  },
                }}
                className="will-change-transform"
              >
                <h3 className="font-mono text-[11px] font-bold tracking-[0.22em] text-foreground uppercase mb-3.5">
                  FOLLOW ME
                </h3>
                <div className="flex items-center gap-2">
                  {[
                    {
                      label: "Facebook",
                      href: profile.facebook,
                      icon: (
                        <svg className="size-3.5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                        </svg>
                      ),
                    },
                    {
                      label: "Instagram",
                      href: profile.instagram,
                      icon: (
                        <svg className="size-3.5 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                      ),
                    },
                    {
                      label: "GitHub",
                      href: profile.github,
                      icon: (
                        <svg className="size-3.5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      ),
                    },
                    {
                      label: "LinkedIn",
                      href: profile.linkedin,
                      icon: (
                        <svg className="size-3.5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      title={item.label}
                      className="group relative select-none p-[1px] transition-all duration-300 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-800/60 dark:hover:bg-neutral-700 hover:-translate-y-0.5 active:scale-95"
                      style={{
                        clipPath: "polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))",
                      }}
                    >
                      <div
                        className="flex size-8 items-center justify-center bg-white transition-colors duration-200 group-hover:bg-neutral-50 dark:bg-[#040404] dark:group-hover:bg-[#080808] text-neutral-700 group-hover:text-black dark:text-neutral-400 dark:group-hover:text-white"
                        style={{
                          clipPath: "polygon(0 0, calc(100% - 6.5px) 0, 100% 6.5px, 100% 100%, 6.5px 100%, 0 calc(100% - 6.5px))",
                        }}
                      >
                        {item.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <motion.div
        id="skills"
        initial={{ opacity: 0, y: 18 }}
        animate={showHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{
          duration: 1.15,
          delay: 0.65,
          ease: EASE_OUT_EXPO,
        }}
        className="relative overflow-hidden border-y border-border bg-background py-5 z-10 will-change-transform"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex w-max items-center gap-10 pr-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 34,
            repeat: Infinity,
          }}
        >
          {[...skillGroups, ...skillGroups].flatMap((group, gi) => {
            return group.items.map((item, ii) => {
              const Icon = technologyIcons[item] || BrandIcons.ReactIcon;
              return (
                <span
                  key={`${gi}-${ii}`}
                  className="group/skill flex shrink-0 items-center gap-2.5 text-[13px] tracking-wide text-neutral-500 dark:text-neutral-400 transition-colors duration-300 hover:text-foreground"
                >
                  <Icon className="size-4 text-neutral-400 dark:text-neutral-500 transition-transform duration-300 group-hover/skill:scale-110 group-hover/skill:text-foreground" />
                  {item}
                  <span aria-hidden="true" className="ml-7 text-foreground/15 select-none">·</span>
                </span>
              );
            });
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
