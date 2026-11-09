"use client";

import { useState, useMemo, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Lock, X, GitBranch, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { marked } from "marked";
import { projects, projectFilters, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { cn } from "@/lib/utils";

import { cardVariants, fadeUpVariants } from "@/lib/animation-variants";
import { ProjectCard, VERCEL_METADATA_MAP, type Project } from "@/components/shared/project-card";

const FEATURED_PROJECT_ORDER = [
  "tdrive",
  "axiom-lms",
  "pos-and-inventory-system",
  "lumora",
  "ccs-assistant",
  "room-209",
  "philnits-ip-exam",
  "ccsas-dashboard",
];

const CASE_STUDIES: Record<string, { architecture: string; challenge: string; features: string[] }> = {
  "LeafSense Mobile": {
    architecture: "Cross-platform React Native client with a Python FastAPI backend. The mobile app leverages Expo APIs for local photo capture and uploads images asynchronously to the backend REST API.",
    challenge: "Optimizing machine learning inference speeds on mobile and handling low-network conditions for rural farmers.",
    features: [
      "Real-time diagnostic classification utilizing convolutional neural networks (CNNs)",
      "Offline caching of diagnostic histories using SQLite local storage",
      "Dynamic treatment and mitigation suggestions based on plant pathology databases"
    ]
  },
  "POS and Inventory System": {
    architecture: "Enterprise system designed to handle real-time inventory adjustments, invoice generations, and point-of-sale checkouts.",
    challenge: "Handling concurrent transaction locks and maintaining absolute database consistency during inventory checkout rushes.",
    features: [
      "Automated stock level threshold warnings via email/SMS alerts",
      "Real-time transaction history ledger logs and printable receipt generation",
      "Granular user access management controls (Admin, Cashier, Manager)"
    ]
  },
  "HireHub PH": {
    architecture: "Full-stack job platform connecting local talent with recruiters in the Philippines.",
    challenge: "Designing a fast resume parser and matching candidate skills with vacancy keywords efficiently.",
    features: [
      "Applicant tracking system with status stages (Applied, Interviewing, Hired)",
      "Real-time chat socket communication between applicants and employers",
      "Geographic job search filtering to locate nearby opportunities"
    ]
  },
  "0xp47.github.io": {
    architecture: "Premium portfolio site built with Next.js 16 (App Router) using a custom terminal simulator, smooth scroll templates, and automated repo data generation.",
    challenge: "Maintaining complete static compiling (Next.js export) while keeping stats dynamically updated on push.",
    features: [
      "Custom terminal simulation intro loader with synchronized page reveal",
      "Automated GitHub API fetch cron updating star counts, followers, and repositories on push",
      "Generative Engine Optimized (GEO) schema markup structure"
    ]
  }
};

// Set up custom renderer to append copy button to code blocks
const customRenderer = {
  code({ text, lang }: { text: string; lang?: string; escaped: boolean }) {
    const language = lang || "code";
    const escapedCode = String(text).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<div class="relative group/code my-4">
      <pre data-lang="${language}" class="font-mono rounded-lg p-4 text-[10.5px] leading-relaxed overflow-x-auto max-h-[350px]"><code>${escapedCode}</code></pre>
      <button 
        type="button" 
        class="absolute top-2.5 right-3 opacity-0 group-hover/code:opacity-100 transition-opacity bg-foreground/[0.04] hover:bg-foreground/[0.08] border border-border/15 rounded px-2.5 py-1 text-[8.5px] font-mono text-muted-foreground hover:text-foreground cursor-pointer copy-code-btn"
      >
        Copy
      </button>
    </div>`;
  }
};

marked.use({ renderer: customRenderer as Partial<import('marked').Renderer> });

function sanitizeHtml(html: string): string {
  // Remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*(["']).*?\1/gi, '')
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, '')
    .replace(/javascript\s*:/gi, 'void:');
}

function parseMarkdownToHtml(markdown: string): string {
  if (!markdown) return "";
  try {
    const raw = marked.parse(markdown, { async: false }) as string;
    return sanitizeHtml(raw);
  } catch (e) {
    console.error("Failed to parse markdown with marked:", e);
    return markdown;
  }
}

function formatRepoName(name: string): string {
  if (!name) return "";
  if (name.toLowerCase() === "0xp47") return "0xp47 (Profile)";
  if (name.toLowerCase() === "0xp47.github.io") return "0xp47 Portfolio";
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const emptySubscribe = () => () => {};

export function ProjectsSection() {
  const lenis = useLenis();
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const drawerRef = useRef<HTMLDivElement>(null);

  // Disable body scroll and pause Lenis when drawer is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [selectedProject, lenis]);

  // Close drawer on Escape key and handle focus trap (Accessibility)
  useEffect(() => {
    if (!selectedProject) return;

    // Focus the first element (close button) when drawer opens
    const timer = setTimeout(() => {
      if (drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  // Code block copy click handler
  useEffect(() => {
    if (!selectedProject) return;

    const handleCopyClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.classList.contains("copy-code-btn")) {
        const pre = target.previousElementSibling as HTMLElement;
        const codeElement = pre?.querySelector("code");
        if (codeElement) {
          const textToCopy = codeElement.innerText;
          try {
            await navigator.clipboard.writeText(textToCopy);
            target.textContent = "Copied!";
            target.classList.add("text-foreground font-bold");
            setTimeout(() => {
              target.textContent = "Copy";
              target.classList.remove("text-foreground font-bold");
            }, 2000);
          } catch (err) {
            console.error("Failed to copy code: ", err);
          }
        }
      }
    };

    document.addEventListener("click", handleCopyClick);
    return () => {
      document.removeEventListener("click", handleCopyClick);
    };
  }, [selectedProject]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return [...projects].sort((a, b) => {
        const aSlug = a.name.toLowerCase();
        const bSlug = b.name.toLowerCase();
        const aIndex = FEATURED_PROJECT_ORDER.indexOf(aSlug);
        const bIndex = FEATURED_PROJECT_ORDER.indexOf(bSlug);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return 0;
      });
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const displayedProjects = useMemo(() => {
    if (showAll) {
      return filteredProjects;
    }
    return filteredProjects.slice(0, 8);
  }, [filteredProjects, showAll]);

  const caseStudy = selectedProject ? CASE_STUDIES[selectedProject.name] : null;
  const projectMeta = selectedProject ? VERCEL_METADATA_MAP[selectedProject.name.toLowerCase()] : null;
  const effectiveLive = projectMeta?.liveUrl || (selectedProject?.live && !selectedProject.live.includes("github.com") ? selectedProject.live : null);

  return (
    <Section id="projects" eyebrow={sectionMeta.projects.eyebrow} title={sectionMeta.projects.title}>
      {/* Vercel Project Filter Tabs — individual chamfered buttons */}
      <motion.div
        variants={fadeUpVariants}
        className="mb-4 sm:mb-5 w-fit max-w-full overflow-x-auto scrollbar-none"
      >
        <nav className="flex items-center gap-2 py-0.5" aria-label="Project filters">
          {projectFilters.map((filter) => {
            const isActive = activeFilter === filter;
            const count = filter === "All" ? projects.length : projects.filter((p) => p.category === filter).length;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setActiveFilter(filter);
                  setShowAll(false);
                }}
                className={cn(
                  "inline-flex items-center gap-2 chamfer-btn py-1.5 px-3.5 font-mono text-[11px] uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer select-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden",
                  isActive
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                    : "border border-neutral-300 bg-white text-neutral-600 hover:border-neutral-400 hover:text-black hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#0a0a0a] dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white"
                )}
              >
                <span>{filter}</span>
                <span className="text-[10px] tabular-nums opacity-60">({count})</span>
              </button>
            );
          })}
        </nav>
      </motion.div>

      <motion.div
        key={activeFilter}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08 },
          },
        }}
        initial="hidden"
        animate="visible"
        className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 max-w-[780px] items-stretch"
      >
        {displayedProjects.map((project) => (
          <motion.div
            key={project.name}
            variants={cardVariants}
            className="h-full"
          >
            <ProjectCard project={project} onViewDetails={setSelectedProject} />
          </motion.div>
        ))}
      </motion.div>

      {filteredProjects.length > 8 && (
        <motion.div
          variants={fadeUpVariants}
          className="mt-8 sm:mt-10 flex justify-center"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 chamfer-btn-lg border border-neutral-300 bg-white px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:border-neutral-400 hover:text-black hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#0a0a0a] dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_10px_24px_rgba(0,0,0,0.45)] cursor-pointer focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden"
          >
            <span>See All Projects</span>
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      )}

      {/* Case Study Drawer */}
      {isMounted && typeof document !== "undefined" ? createPortal(
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[2147483648] bg-black/60 backdrop-blur-sm cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Slide-over Drawer */}
            <motion.div
              ref={drawerRef}
              data-lenis-prevent
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject?.name ? `${selectedProject.name} details` : 'Project details'}
              className="fixed inset-y-0 right-0 z-[2147483648] flex h-full w-full max-w-lg flex-col border-l border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a] px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-8 sm:py-4"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >

              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-3">
                <div>
                  <span className="font-mono text-[9px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-0.5">
                    {selectedProject.category} Case Study
                  </span>
                  <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                    {formatRepoName(selectedProject.name)}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="flex size-7 items-center justify-center chamfer-btn border border-neutral-300 bg-neutral-100 hover:border-neutral-400 hover:text-black hover:bg-neutral-200 dark:border-neutral-800 dark:bg-[#121212] dark:hover:border-neutral-700 dark:hover:text-white transition-all duration-200 active:scale-95 text-neutral-600 dark:text-neutral-400 cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              {/* Body Content */}
              <div 
                data-lenis-prevent
                className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar font-sans text-xs leading-relaxed text-muted-foreground/90"
              >
                {/* Tech Stack Chips */}
                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                    Technologies Used
                  </h4>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] leading-relaxed text-muted-foreground/70">
                    {selectedProject.stack.join("  ·  ")}
                  </p>
                </div>

                {selectedProject.readme ? (
                  /* Render Markdown README */
                  <div className="space-y-3 pt-3 border-t border-border/5 text-xs leading-relaxed text-muted-foreground/80">
                    <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground mb-1.5">
                      Repository README
                    </h4>
                    <div 
                       className="markdown-body pr-1"
                      dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(selectedProject.readme) }} 
                    />
                  </div>
                ) : (
                  /* Fallback details */
                  <>
                    {/* Overview */}
                    <div className="space-y-2 pt-3 border-t border-border/5">
                      <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                        Overview
                      </h4>
                      <p>{selectedProject.description}</p>
                    </div>

                    {/* System Architecture */}
                    {caseStudy && (
                      <div className="space-y-2 pt-2 border-t border-border/5">
                        <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                          System Architecture
                        </h4>
                        <p>{caseStudy.architecture}</p>
                      </div>
                    )}

                    {/* Challenge & Mitigation */}
                    {caseStudy && (
                      <div className="space-y-2 pt-2 border-t border-border/5">
                        <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                          Core Challenge
                        </h4>
                        <p>{caseStudy.challenge}</p>
                      </div>
                    )}

                    {/* Features List */}
                    {caseStudy && (
                      <div className="space-y-2 pt-2 border-t border-border/5">
                        <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                          Key Highlights
                        </h4>
                        <ul className="list-disc pl-4 space-y-1.5">
                          {caseStudy.features.map((feat, i) => (
                            <li key={i}>{feat}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-start flex-wrap gap-3 pt-2.5 border-t border-border/10 mt-3 font-mono text-[9px]">
                {effectiveLive && (
                  <a
                    href={effectiveLive}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 chamfer-btn border border-neutral-900 bg-neutral-900 text-white dark:border-neutral-700 dark:bg-white dark:text-black px-4 py-1.5 font-bold uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  >
                    <ExternalLink className="size-3" />
                    Visit Live App
                  </a>
                )}
                {selectedProject.isPrivate ? (
                  <span className="inline-flex items-center gap-1.5 border border-border/30 chamfer-btn px-4 py-1.5 text-muted-foreground/60">
                    <Lock className="size-3" />
                    Private Repository
                  </span>
                ) : (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 border border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 hover:text-black hover:bg-neutral-100 dark:border-border/30 dark:bg-transparent dark:text-muted-foreground dark:hover:border-foreground/30 dark:hover:bg-foreground dark:hover:text-background chamfer-btn px-4 py-1.5 font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                  >
                    <GitBranch className="size-3" />
                    View Source
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body) : null}
    </Section>
  );
}
