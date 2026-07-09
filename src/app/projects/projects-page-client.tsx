"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowLeft, Lock, X, Search, RotateCcw, GitBranch, Folder, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo, useRef } from "react";
import { useLenis } from "lenis/react";
import { marked } from "marked";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { projects, projectFilters, sectionMeta } from "@/lib/portfolio-data";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { ViewToggle } from "@/components/shared/view-toggle";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { ProjectCard } from "@/components/shared/project-card";
import { cn } from "@/lib/utils";

interface Project {
  name: string;
  description: string;
  category: string;
  stack: string[];
  live?: string;
  github?: string;
  readme?: string;
  isPrivate?: boolean;
  createdAt?: string;
  updatedAt?: string;
  stars?: number;
}

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

export function ProjectsPageClient() {
  const lenis = useLenis();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const prefersReducedMotion = useSafeReducedMotion();

  // Filters and search state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"default" | "name-asc" | "name-desc" | "updated" | "created" | "stars">("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const drawerRef = useRef<HTMLDivElement>(null);

  const handleScrollToTop = () => {
    lenis?.scrollTo(0, { offset: 0, duration: 1.2 });
  };

  // Compile all unique technologies with counts
  const { techCounts, topTechs } = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p) => {
      p.stack.forEach((tech) => {
        counts[tech] = (counts[tech] || 0) + 1;
      });
    });
    const techs = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([tech]) => tech);
    return { techCounts: counts, topTechs: techs };
  }, []);

  // Filtering and sorting logic
  const filteredProjects = useMemo(() => {
    let result = projects;

    if (activeFilter !== "All") {
      result = result.filter((p) => p.category === activeFilter);
    }

    if (selectedTech) {
      result = result.filter((p) => p.stack.includes(selectedTech));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.stack.some((tech) => tech.toLowerCase().includes(query))
      );
    }

    if (sortBy === "name-asc") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "updated") {
      result = [...result].sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortBy === "created") {
      result = [...result].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortBy === "stars") {
      result = [...result].sort((a, b) => (b.stars || 0) - (a.stars || 0));
    }

    return result;
  }, [activeFilter, selectedTech, searchQuery, sortBy]);

  // Disable scroll when drawer is open
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

  // Drawer accessibility & key bindings
  useEffect(() => {
    if (!selectedProject) return;

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
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
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

  // Code block copy click handler inside markdown drawer
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

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const caseStudy = selectedProject ? CASE_STUDIES[selectedProject.name] : null;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background">
      {/* Main Content Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[1120px] px-6 py-12 sm:px-8 sm:py-14 md:py-20 lg:px-10"
      >
        {/* Navigation Header */}
        <PageHeader backHref="/" backLabel="Back to portfolio" rightLabel="Projects Explorer" />

        {/* Section Header */}
        <SectionHeader eyebrow={sectionMeta.projects.eyebrow} title={sectionMeta.projects.title} />

        {/* 2-Column Dashboard Layout */}
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* LEFT SIDEBAR: Controls Center */}
          <aside className="lg:sticky lg:top-24 h-fit space-y-8 lg:border-r lg:border-border/10 lg:pr-8">

            {/* Search Input */}
            <div className="space-y-2">
              <label className="font-mono text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest block">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/75 z-10" />
                <input
                  type="text"
                  placeholder="Filter by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-border/40 bg-black/20 py-2.5 pl-10 pr-8 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/30 focus:outline-none backdrop-blur-sm transition-all duration-300 font-mono"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors cursor-pointer z-10"
                  >
                    <X className="size-2.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label className="font-mono text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest block">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "default" | "name-asc" | "name-desc" | "updated" | "created" | "stars")}
                  className="w-full rounded-full border border-border/40 bg-black/20 pl-4 pr-10 py-2 text-[10px] font-mono font-bold tracking-wide text-muted-foreground hover:text-foreground focus:border-foreground/30 focus:outline-none backdrop-blur-sm cursor-pointer transition-all duration-300 appearance-none uppercase"
                >
                  <option value="default" className="bg-[#121214] text-foreground">DEFAULT ORDER</option>
                  <option value="name-asc" className="bg-[#121214] text-foreground">NAME (A-Z)</option>
                  <option value="name-desc" className="bg-[#121214] text-foreground">NAME (Z-A)</option>
                  <option value="updated" className="bg-[#121214] text-foreground">LAST UPDATED</option>
                  <option value="created" className="bg-[#121214] text-foreground">DATE CREATED</option>
                  <option value="stars" className="bg-[#121214] text-foreground">STARS & POPULARITY</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/60 z-10" />
              </div>
            </div>

            {/* Directory Categories list */}
            <div className="space-y-2">
              <label className="font-mono text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest block">
                Categories
              </label>
              <nav className="flex flex-col gap-1 font-mono text-[11px]" aria-label="Category filters">
                {projectFilters.map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all duration-300 cursor-pointer hover:bg-white/[0.03]",
                        isActive
                          ? "bg-foreground text-background font-bold"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Folder className={cn("size-3.5", isActive ? "fill-current" : "")} />
                      {filter}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Technology tags stack selection */}
            <div className="space-y-2.5">
              <label className="font-mono text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest block">
                Technologies
              </label>
              <div 
                data-lenis-prevent
                className="flex flex-wrap gap-1.5 max-h-[280px] overflow-y-auto pr-2 py-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent"
              >
                {topTechs.map((tech) => {
                  const isSelected = selectedTech === tech;
                  return (
                    <button
                      key={tech}
                      onClick={() => setSelectedTech(isSelected ? null : tech)}
                      className={cn(
                        "rounded border px-2 py-0.5 font-mono text-[8px] tracking-wide transition-all duration-300 cursor-pointer shrink-0",
                        isSelected
                          ? "border-foreground bg-foreground text-background font-bold"
                          : "border-border/30 bg-black/10 text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                      )}
                    >
                      {tech} <span className="opacity-50 text-[7px]">({techCounts[tech]})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Filters button */}
            {(searchQuery || activeFilter !== "All" || selectedTech) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All");
                  setSelectedTech(null);
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border/30 hover:border-foreground/30 px-4 py-2 font-mono text-[9px] font-bold text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer uppercase tracking-wider"
              >
                <RotateCcw className="size-3" />
                Reset Filters
              </button>
            )}
          </aside>

          {/* RIGHT COLUMN: Projects Explorer List */}
          <div className="space-y-6">
            {/* Stats and Layout switcher row */}
            <div className="flex items-center justify-between border-b border-border/10 pb-3">
              <span className="font-mono text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                Showing {filteredProjects.length} of {projects.length} files
              </span>

              {/* Grid/List Toggle Switcher */}
              <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>

            {/* Dynamic View rendering: Toggles columns rather than hiding descriptions */}
            <LayoutGroup>
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className={cn(
                  "grid gap-6 mt-8 items-stretch",
                  viewMode === "grid" ? "sm:grid-cols-2" : "grid-cols-1"
                )}
              >
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04, ease: "easeOut" }}
                    className="h-full"
                  >
                    <ProjectCard project={project} onViewDetails={setSelectedProject} />
                  </motion.div>
                ))}
              </motion.div>
            </LayoutGroup>

            {/* Empty state */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/10 rounded-xl"
              >
                <div className="rounded-full bg-neutral-900 border border-border/10 p-4 mb-4">
                  <Search className="size-6 text-muted-foreground/50" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">No projects found</h3>
                <p className="text-xs text-muted-foreground/80 mt-1 max-w-xs leading-relaxed">
                  No files matched your active filters or search queries.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("All");
                    setSelectedTech(null);
                  }}
                  className="mt-4 rounded-full border border-border/30 bg-black/10 px-5 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-border/10 flex items-center justify-between w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to portfolio
          </Link>
          <span className="text-[10px] font-mono text-muted-foreground/30">
            © {new Date().getFullYear()} Jay Patrick Cano
          </span>
        </footer>
      </motion.div>

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

              {/* Drawer Body Content */}
              <div 
                data-lenis-prevent
                className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar font-sans text-xs leading-relaxed text-muted-foreground/90"
              >
                {/* Tech Stack Chips */}
                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-border/30 bg-foreground/[0.02] px-2 py-0.5 font-mono text-[9px] tracking-wide text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Case Study Details or Readme */}
                {caseStudy && (
                  <div className="space-y-4 border-t border-border/10 pt-4">
                    <div className="space-y-1.5">
                      <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                        Architecture Design
                      </h4>
                      <p>{caseStudy.architecture}</p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                        Core Challenges & Solutions
                      </h4>
                      <p>{caseStudy.challenge}</p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground font-semibold">
                        Key Features
                      </h4>
                      <ul className="list-disc pl-4 space-y-1">
                        {caseStudy.features.map((feat) => (
                          <li key={feat}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Readme details */}
                {selectedProject.readme && (
                  <div className="border-t border-border/10 pt-4 space-y-2">
                    <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground mb-2">
                      README.md
                    </h4>
                    <div 
                      className="markdown-body text-xs prose-custom"
                      dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(selectedProject.readme) }}
                    />
                  </div>
                )}

                {/* Private vs Public Info */}
                <div className="border-t border-border/10 pt-4 space-y-2.5 pb-4">
                  {selectedProject.isPrivate ? (
                    <div className="flex items-center gap-2 rounded-lg border border-border/15 bg-neutral-900/50 p-3 text-[11px] text-muted-foreground leading-relaxed">
                      <Lock className="size-3.5 text-muted-foreground shrink-0" />
                      <span>This project represents proprietary production software. Source code access is restricted under code safety protocols.</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 rounded border border-border/40 hover:border-foreground/35 bg-black/20 hover:bg-foreground hover:text-background py-1.5 text-center font-mono text-[9px] font-bold uppercase tracking-widest text-foreground transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <GitBranch className="size-3" />
                          View Source Code
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Back to Top */}
      <ScrollToTop show={showBackToTop} onClick={handleScrollToTop} />
    </main>
  );
}
