"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Lock, X, GitBranch } from "lucide-react";
import { useLenis } from "lenis/react";
import { marked } from "marked";
import { projects, projectFilters } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { cn } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

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

interface Project {
  name: string;
  description: string;
  category: string;
  stack: string[];
  live?: string;
  github?: string;
  readme?: string;
  isPrivate?: boolean;
}

// Set up custom renderer to append copy button to code blocks
const customRenderer = {
  code({ text, lang }: { text: string; lang?: string; escaped: boolean }) {
    const language = lang || "code";
    const escapedCode = String(text).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<div class="relative group/code my-4">
      <pre data-lang="${language}" class="font-mono bg-black/50 border border-border/10 rounded-lg p-4 text-[10.5px] leading-relaxed text-neutral-200 overflow-x-auto shadow-inner max-h-[350px]"><code>${escapedCode}</code></pre>
      <button 
        type="button" 
        class="absolute top-2.5 right-3 opacity-0 group-hover/code:opacity-100 transition-opacity bg-foreground/[0.04] hover:bg-foreground/[0.08] border border-border/15 rounded px-2.5 py-1 text-[8.5px] font-mono text-muted-foreground hover:text-foreground cursor-pointer copy-code-btn"
      >
        Copy
      </button>
    </div>`;
  }
};

marked.use({ renderer: customRenderer as unknown as object });

function parseMarkdownToHtml(markdown: string): string {
  if (!markdown) return "";
  try {
    return marked.parse(markdown, { async: false }) as string;
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

export function ProjectsSection() {
  const lenis = useLenis();
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
            target.classList.add("text-emerald-400");
            setTimeout(() => {
              target.textContent = "Copy";
              target.classList.remove("text-emerald-400");
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
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const displayedProjects = useMemo(() => {
    if (showAll) {
      return filteredProjects;
    }
    return filteredProjects.slice(0, 6);
  }, [filteredProjects, showAll]);

  const caseStudy = selectedProject ? CASE_STUDIES[selectedProject.name] : null;

  return (
    <Section id="projects" eyebrow="Projects" title="Everything I've built — from apps to automation tools.">
      <div className="mb-8 inline-flex rounded-full border border-border/20 bg-black/20 p-1 backdrop-blur-sm">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => {
              setActiveFilter(filter);
              setShowAll(false); // Reset see more state when changing filter
            }}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300",
              activeFilter === filter
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div 
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12 }
          }
        }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8 items-stretch"
      >
        {displayedProjects.map((project) => (
          <motion.article
            key={project.name}
            variants={cardVariants}
            className="group relative flex flex-col justify-between h-full gap-3"
          >
            {/* Project metadata and text details underneath */}
            <div className="flex flex-col gap-1 px-0.5 h-full justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold tracking-tight text-foreground">
                    {project.isPrivate ? (
                      <span className="flex items-center gap-1">
                        {project.name}
                      </span>
                    ) : (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        {project.name}
                        <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px" />
                      </a>
                    )}
                  </h3>
                  <span className="font-mono text-[8.5px] font-bold tracking-[0.12em] text-foreground/40 uppercase flex items-center gap-1.5 shrink-0">
                    {project.category}
                    {project.isPrivate && (
                      <span className="text-muted-foreground/80 font-semibold tracking-wider text-[8px] bg-foreground/5 px-1.5 py-0.5 rounded border border-border/25 normal-case">
                        Private
                      </span>
                    )}
                  </span>
                </div>
                
                <p className="text-xs leading-relaxed text-neutral-300 line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-1.5 border-t border-border/5">
                {/* Dot-separated tech stack list */}
                <div className="font-mono text-[9px] text-muted-foreground tracking-wide">
                  {project.stack.slice(0, 3).join("  •  ")}
                </div>
                
                {/* Actions */}
                <div className="flex items-center font-mono text-[9px]">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="text-muted-foreground hover:text-foreground hover:underline transition-colors cursor-pointer font-bold flex items-center gap-1"
                  >
                    <ArrowUpRight className="size-3" />
                    details
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {filteredProjects.length > 6 && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="rounded-full border border-border/40 bg-background/80 px-6 py-2 text-[10px] font-mono font-bold tracking-widest uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-300 shadow-sm cursor-pointer"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}

      {/* Case Study Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Slide-over Drawer */}
            <motion.div
              data-lenis-prevent
              className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-border/10 bg-background/95 p-8 shadow-2xl backdrop-blur-xl sm:p-12"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/10 pb-6 mb-6">
                <div>
                  <span className="font-mono text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest block mb-1">
                    {selectedProject.category} Case Study
                  </span>
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    {formatRepoName(selectedProject.name)}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="flex size-8 items-center justify-center rounded-full border border-border/30 hover:border-foreground/30 hover:bg-foreground hover:text-background transition-all duration-300 text-muted-foreground cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Body Content */}
              <div 
                data-lenis-prevent
                className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-none font-sans text-xs leading-relaxed text-muted-foreground/90"
              >
                {/* Tech Stack Chips */}
                <div className="space-y-3">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech: string) => (
                      <span
                        key={tech}
                        className="font-mono text-[9px] text-foreground bg-foreground/[0.04] border border-border/20 px-2.5 py-1 rounded-full uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.readme ? (
                  /* Render Markdown README */
                  <div className="space-y-4 pt-4 border-t border-border/5 text-xs leading-relaxed text-muted-foreground/80">
                    <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground mb-2">
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
                    <div className="space-y-2 pt-4 border-t border-border/5">
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
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/10 mt-6 font-mono text-[10px]">
                {selectedProject.isPrivate ? (
                  <span className="inline-flex items-center gap-1.5 border border-border/30 rounded-full px-5 py-2.5 text-muted-foreground/60">
                    <Lock className="size-3.5" />
                    Private Repository
                  </span>
                ) : (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 border border-border/30 hover:border-foreground/30 hover:bg-foreground hover:text-background rounded-full px-5 py-2.5 font-bold uppercase tracking-wider text-muted-foreground transition-all duration-300"
                  >
                    <GitBranch className="size-3.5" />
                    View Source
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Section>
  );
}
