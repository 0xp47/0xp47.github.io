"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Lock, X, GitBranch } from "lucide-react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { marked } from "marked";
import { projects, projectFilters, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { cn } from "@/lib/utils";

import { cardVariants } from "@/lib/animation-variants";
import { ProjectCard } from "@/components/shared/project-card";

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

export function ProjectsSection() {
  const lenis = useLenis();
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    <Section id="projects" eyebrow={sectionMeta.projects.eyebrow} title={sectionMeta.projects.title}>
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
          <motion.div
            key={project.name}
            variants={cardVariants}
            className="h-full"
          >
            <ProjectCard project={project} onViewDetails={setSelectedProject} />
          </motion.div>
        ))}
      </motion.div>

      {filteredProjects.length > 6 && (
        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="group rounded-full border border-border/40 bg-black/10 hover:bg-foreground hover:text-background px-6 py-2.5 text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground transition-all duration-500 shadow-sm cursor-pointer inline-flex items-center justify-center gap-1.5"
          >
            See All Projects
            <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform duration-300" />
          </Link>
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
              ref={drawerRef}
              data-lenis-prevent
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject?.name ? `${selectedProject.name} details` : 'Project details'}
              className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-border/10 bg-background/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-8 sm:py-4"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >

              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/10 pb-2 mb-3">
                <div>
                  <span className="font-mono text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest block mb-0.5">
                    {selectedProject.category} Case Study
                  </span>
                  <h2 className="text-lg font-bold tracking-tight text-foreground">
                    {formatRepoName(selectedProject.name)}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="flex size-7 items-center justify-center rounded-full border border-border/30 hover:border-foreground/30 hover:bg-foreground hover:text-background transition-all duration-300 text-muted-foreground cursor-pointer"
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
              <div className="flex items-center justify-end gap-3 pt-2.5 border-t border-border/10 mt-3 font-mono text-[9px]">
                {selectedProject.isPrivate ? (
                  <span className="inline-flex items-center gap-1.5 border border-border/30 rounded-full px-4 py-1.5 text-muted-foreground/60">
                    <Lock className="size-3" />
                    Private Repository
                  </span>
                ) : (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 border border-border/30 hover:border-foreground/30 hover:bg-foreground hover:text-background rounded-full px-4 py-1.5 font-bold uppercase tracking-wider text-muted-foreground transition-all duration-300"
                  >
                    <GitBranch className="size-3" />
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
