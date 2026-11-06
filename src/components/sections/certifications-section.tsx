"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Award,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { SiCredly, SiAnthropic, SiCisco } from "react-icons/si";
import { certifications, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

const DEFAULT_PAGE_SIZE = 9;

interface Certification {
  id: string;
  title: string;
  issuer: string;
  organization: string;
  issueDate: string;
  badgeUrl: string;
  imageUrl: string;
  remoteImageUrl?: string;
  activityUrl?: string;
  category: string;
  skills: string[];
  description: string;
}

export function CertificationsSection() {
  const prefersReducedMotion = useSafeReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Filter States
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter categories
  const filterOptions = [
    { label: "All", count: certifications.length },
    { label: "Anthropic", count: certifications.filter((c) => c.issuer === "Anthropic").length },
    { label: "Cisco", count: certifications.filter((c) => c.issuer === "Cisco").length },
    { label: "AI", count: certifications.filter((c) => c.category === "AI").length },
    { label: "Security", count: certifications.filter((c) => c.category === "Security").length },
    { label: "Development", count: certifications.filter((c) => c.category === "Development").length },
    { label: "Systems & Networks", count: certifications.filter((c) => c.category === "Systems & Networks").length },
    { label: "Business", count: certifications.filter((c) => c.category === "Business").length },
  ];

  // Filter dataset
  const filteredCertifications = useMemo(() => {
    let list = certifications as Certification[];

    if (activeFilter === "Anthropic") {
      list = list.filter((c) => c.issuer === "Anthropic");
    } else if (activeFilter === "Cisco") {
      list = list.filter((c) => c.issuer === "Cisco");
    } else if (activeFilter !== "All") {
      list = list.filter((c) => c.category === activeFilter);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((cert) => {
        const titleMatch = cert.title.toLowerCase().includes(q);
        const orgMatch = cert.organization.toLowerCase().includes(q);
        const catMatch = cert.category.toLowerCase().includes(q);
        const skillsMatch = cert.skills.some((s) => s.toLowerCase().includes(q));
        return titleMatch || orgMatch || catMatch || skillsMatch;
      });
    }

    return [...list].sort((a, b) => b.issueDate.localeCompare(a.issueDate));
  }, [activeFilter, searchQuery]);

  // Displayed items
  const displayedCertifications = useMemo(() => {
    if (showAll || searchQuery.trim() !== "") {
      return filteredCertifications;
    }
    return filteredCertifications.slice(0, DEFAULT_PAGE_SIZE);
  }, [filteredCertifications, showAll, searchQuery]);

  return (
    <Section
      id="certifications"
      eyebrow={sectionMeta.certifications.eyebrow}
      title={sectionMeta.certifications.title}
    >
      <div className="flex flex-col gap-6">
        {/* Unified Vercel Filter & Search Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Scrollable Filter Pills (Matches Projects Section Exactly) */}
          <div className="w-fit max-w-full overflow-x-auto rounded-full border border-border/80 bg-foreground/[0.02] p-1 shadow-xs scrollbar-none">
            <nav className="flex items-center gap-1" aria-label="Certification filters">
              {filterOptions.map((f) => {
                const isActive = activeFilter === f.label;
                if (f.count === 0) return null;

                return (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => {
                      setActiveFilter(f.label);
                      setShowAll(false);
                    }}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full py-1.5 px-3 font-mono text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer select-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden",
                      isActive
                        ? "bg-foreground text-background font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                    )}
                  >
                    <span>{f.label}</span>
                    <span className="text-[10px] tabular-nums opacity-60">({f.count})</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Minimalist Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 40 credentials..."
              className="w-full rounded-full border border-border/80 bg-foreground/[0.02] py-1.5 pl-8 pr-7 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-foreground/40 focus:outline-hidden focus:ring-1 focus:ring-foreground/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground/60 hover:text-foreground cursor-pointer"
                aria-label="Clear search"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground/70 px-1">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Showing {displayedCertifications.length} of {filteredCertifications.length} verified credentials
          </span>
          {(searchQuery || activeFilter !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="text-foreground hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Credentials Grid (Identical Card Structure to Projects) */}
        {filteredCertifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card dark:bg-[#0a0a0a] py-16 text-center">
            <Award className="size-8 text-muted-foreground/40 mb-2" />
            <h4 className="text-sm font-semibold text-foreground">
              No matching credentials found
            </h4>
            <p className="mt-1 text-xs text-muted-foreground max-w-xs">
              No results for &ldquo;{searchQuery}&rdquo;. Try another skill or reset the filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="mt-4 rounded-full border border-border/80 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-foreground hover:bg-foreground/[0.04] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout={!prefersReducedMotion}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {displayedCertifications.map((badge, idx) => {
                const isAnthropic = badge.issuer === "Anthropic";
                const topSkills = badge.skills.slice(0, 3);

                return (
                  <motion.article
                    key={badge.id}
                    layout={!prefersReducedMotion}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: Math.min(idx * 0.02, 0.15),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative flex h-full flex-col justify-between rounded-xl border border-border bg-card dark:bg-[#0a0a0a] p-5 transition-all duration-200 hover:border-foreground/40 dark:hover:border-neutral-700 hover:-translate-y-0.5 shadow-xs"
                  >
                    <div>
                      {/* Top Row: Badge Pedestal + Issuer Pill + Direct Verify Link */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="relative size-12 shrink-0 rounded-lg border border-border/80 dark:border-neutral-800 bg-neutral-100 dark:bg-[#141416] p-1 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                          <Image
                            src={badge.imageUrl}
                            alt=""
                            width={42}
                            height={42}
                            unoptimized
                            className="size-10 object-contain drop-shadow-xs"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border border-border/70 dark:border-neutral-800 bg-neutral-100 dark:bg-[#141416] text-muted-foreground">
                            {isAnthropic ? (
                              <SiAnthropic className="size-2.5" />
                            ) : (
                              <SiCisco className="size-2.5" />
                            )}
                            {badge.issuer}
                          </span>

                          <a
                            href={badge.badgeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Verify ${badge.title} on registry`}
                            title="Verify on official registry"
                            className="rounded p-1 text-muted-foreground/60 transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden"
                          >
                            <ExternalLink className="size-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mt-3.5 text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary line-clamp-2">
                        {badge.title}
                      </h3>

                      {/* Organization & Date */}
                      <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/70">
                        <ShieldCheck className="size-3 text-emerald-500 shrink-0" />
                        <span className="truncate">{badge.organization}</span>
                        <span className="text-border">·</span>
                        <span className="tabular-nums shrink-0">{formatDate(badge.issueDate)}</span>
                      </div>

                      {/* Description */}
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {badge.description}
                      </p>
                    </div>

                    {/* Bottom: Skills & Actions (Matches ProjectCard Layout) */}
                    <div className="mt-5 w-full pt-4 border-t border-border/50">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {topSkills.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[9px] px-2 py-0.5 rounded border border-border/70 dark:border-neutral-800 bg-neutral-100 dark:bg-[#141416] text-muted-foreground/80 transition-colors duration-200 group-hover:border-foreground/30 group-hover:text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setSelectedCert(badge)}
                          className="inline-flex cursor-pointer items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden"
                        >
                          Details
                          <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>

                        <a
                          href={badge.badgeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground/60 transition-colors duration-200 hover:text-foreground"
                        >
                          Verify Registry ↗
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Expand / Show More Action (Exact same as Projects Section) */}
        {filteredCertifications.length > DEFAULT_PAGE_SIZE && searchQuery.trim() === "" && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2 rounded-full border border-border/80 dark:border-neutral-800 bg-neutral-100 dark:bg-[#141416] px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground shadow-xs hover:border-foreground/40 dark:hover:border-neutral-700 hover:bg-foreground hover:text-background transition-all cursor-pointer focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden"
            >
              {showAll ? (
                <>
                  <span>Show Fewer Credentials</span>
                  <ChevronUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                </>
              ) : (
                <>
                  <span>Show All {filteredCertifications.length} Credentials</span>
                  <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Direct Registry Links at Section Footnote */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-4 font-mono text-[10.5px] text-muted-foreground/60">
          <span>Authoritative verification portals:</span>
          <div className="flex items-center gap-4">
            <a
              href="https://anthropic.skilljar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <SiAnthropic className="size-3" />
              Anthropic Academy
              <ArrowUpRight className="size-2.5" />
            </a>
            <span className="text-border">·</span>
            <a
              href="https://www.credly.com/users/0xp47/badges"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <SiCredly className="size-3 text-[#ff6b00]" />
              Credly Registry
              <ArrowUpRight className="size-2.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Slide-over Certification Details Drawer (Matching Project Case Study Drawer) */}
      <AnimatePresence>
        {selectedCert && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
            />

            {/* Slide-over Drawer */}
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label={selectedCert.title}
              className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border dark:border-[#222222] bg-background dark:bg-[#0a0a0a] p-6 shadow-2xl overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-border/80 pb-4">
                <div>
                  <span className="font-mono text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest block mb-0.5">
                    {selectedCert.issuer} Credential
                  </span>
                  <h2 className="text-base font-semibold tracking-tight text-foreground">
                    Credential Verification
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="flex size-8 items-center justify-center rounded-full border border-border/80 text-muted-foreground hover:bg-foreground hover:text-background transition-colors duration-200 cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex flex-col gap-6 py-6">
                {/* Badge Graphic Hero */}
                <div className="flex flex-col items-center justify-center rounded-xl border border-border/80 dark:border-neutral-800 bg-neutral-100 dark:bg-[#121214] p-6 text-center">
                  <div className="relative size-24 shrink-0 drop-shadow-md mb-4">
                    <Image
                      src={selectedCert.imageUrl}
                      alt={selectedCert.title}
                      width={96}
                      height={96}
                      unoptimized
                      className="size-24 object-contain"
                    />
                  </div>
                  <h3 className="text-base font-bold tracking-tight text-foreground">
                    {selectedCert.title}
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-3 text-emerald-500" />
                    Verified On Official Registry
                  </div>
                </div>

                {/* Metadata Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border/70 dark:border-neutral-800 bg-neutral-100 dark:bg-[#121214] p-3">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
                      Issuing Body
                    </span>
                    <span className="font-mono text-xs font-semibold text-foreground mt-0.5 block truncate">
                      {selectedCert.organization}
                    </span>
                  </div>
                  <div className="rounded-xl border border-border/70 dark:border-neutral-800 bg-neutral-100 dark:bg-[#121214] p-3">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
                      Issue Date
                    </span>
                    <span className="font-mono text-xs font-semibold text-foreground mt-0.5 block tabular-nums">
                      {formatDate(selectedCert.issueDate)}
                    </span>
                  </div>
                  <div className="rounded-xl border border-border/70 dark:border-neutral-800 bg-neutral-100 dark:bg-[#121214] p-3">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
                      Category
                    </span>
                    <span className="font-mono text-xs font-semibold text-foreground mt-0.5 block">
                      {selectedCert.category}
                    </span>
                  </div>
                  <div className="rounded-xl border border-border/70 dark:border-neutral-800 bg-neutral-100 dark:bg-[#121214] p-3">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
                      Credential Status
                    </span>
                    <span className="font-mono text-xs font-semibold text-emerald-500 mt-0.5 block">
                      Active (Lifetime)
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-1.5">
                    Competency Summary
                  </h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {selectedCert.description}
                  </p>
                </div>

                {/* Skills Mastered */}
                <div>
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-2">
                    Verified Competencies &amp; Skills ({selectedCert.skills.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[9.5px] px-2.5 py-1 rounded-md border border-border/70 dark:border-neutral-800 bg-neutral-100 dark:bg-[#121214] text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2">
                  <a
                    href={selectedCert.badgeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-2.5 text-xs font-bold text-background transition-all duration-200 hover:bg-foreground/90 shadow-md cursor-pointer"
                  >
                    <span>Verify on Authoritative Registry</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Section>
  );
}
