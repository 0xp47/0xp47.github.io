"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Search,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp,
  Sparkles,
  X,
  ExternalLink,
  Award,
} from "lucide-react";
import { SiCredly, SiAnthropic, SiCisco } from "react-icons/si";
import {
  certifications,
  certificationCategories,
  sectionMeta,
  profile,
} from "@/lib/portfolio-data";
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

// Top flagship accreditations to spotlight in the featured row
const SPOTLIGHT_IDS = [
  "anthropic-claude-code-in-action",
  "anthropic-model-context-protocol-architecture",
  "ethical-hacker",
  "core-generative-ai-skills",
];

export function CertificationsSection() {
  const prefersReducedMotion = useSafeReducedMotion();

  // Filter States
  const [activeIssuer, setActiveIssuer] = useState<"All" | "Anthropic" | "Cisco">("All");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Available domain categories from dataset
  const availableCategories = useMemo(() => {
    const existing = new Set(certifications.map((c) => c.category));
    const base = certificationCategories.filter((c) => c === "All" || existing.has(c));
    const additional = Array.from(existing).filter((c) => !certificationCategories.includes(c));
    return [...base, ...additional];
  }, []);

  // Filtered dataset
  const filteredCertifications = useMemo(() => {
    let list = certifications;

    if (activeIssuer !== "All") {
      list = list.filter((cert) => cert.issuer === activeIssuer);
    }

    if (activeCategory !== "All") {
      list = list.filter((cert) => cert.category === activeCategory);
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
  }, [activeIssuer, activeCategory, searchQuery]);

  // Paginated or fully visible items
  const visibleCertifications = useMemo(() => {
    if (isExpanded || searchQuery.trim() !== "") {
      return filteredCertifications;
    }
    return filteredCertifications.slice(0, DEFAULT_PAGE_SIZE);
  }, [filteredCertifications, isExpanded, searchQuery]);

  // Spotlight certificates lookup
  const spotlightCerts = useMemo(() => {
    return SPOTLIGHT_IDS.map((id) =>
      certifications.find((c) => c.id === id || c.id.includes(id))
    ).filter(Boolean);
  }, []);

  // Key stats
  const stats = useMemo(() => {
    const anthropicCount = certifications.filter((c) => c.issuer === "Anthropic").length;
    const ciscoCount = certifications.filter((c) => c.issuer === "Cisco").length;
    const dates = certifications.map((c) => c.issueDate).sort();
    return {
      total: certifications.length,
      anthropic: anthropicCount,
      cisco: ciscoCount,
      latestDate: formatDate(dates[dates.length - 1]),
    };
  }, []);

  return (
    <Section
      id="certifications"
      eyebrow={sectionMeta.certifications.eyebrow}
      title={sectionMeta.certifications.title}
    >
      <div className="flex flex-col gap-10">
        {/* 1. TOP METRICS & REGISTRY PASSPORTS */}
        <div className="rounded-2xl border border-border/70 bg-gradient-to-b from-foreground/[0.03] to-transparent p-5 sm:p-6 md:p-8 backdrop-blur-xs">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Description & Verification Badge */}
            <div className="max-w-2xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Cryptographically Verified
                </span>
                <span className="font-mono text-xs text-muted-foreground/60">
                  Updated {stats.latestDate}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-base">
                <strong className="font-semibold text-foreground">
                  {stats.total} verified industry accreditations
                </strong>{" "}
                across modern generative AI systems, agentic engineering, cloud architecture, and cybersecurity. Every credential is permanently verifiable on its authoritative registry.
              </p>
            </div>

            {/* Quick Registry Links */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={profile.anthropic || "https://anthropic.skilljar.com/"}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl border border-[#D97757]/30 bg-[#D97757]/10 px-3.5 py-2 text-xs font-medium text-foreground transition-all duration-300 hover:border-[#D97757]/60 hover:bg-[#D97757]/15"
                title="View verified Anthropic credentials"
              >
                <SiAnthropic className="size-3.5 text-[#D97757]" />
                <span>Anthropic Academy</span>
                <span className="font-mono text-[10px] tabular-nums text-[#D97757]">
                  {stats.anthropic}
                </span>
                <ArrowUpRight className="size-3 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>

              <a
                href={profile.credly}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-3.5 py-2 text-xs font-medium text-foreground transition-all duration-300 hover:border-sky-500/60 hover:bg-sky-500/15"
                title="View verified Cisco NetAcad badges on Credly"
              >
                <SiCredly className="size-3.5 text-[#ff6b00]" />
                <span>Credly Registry</span>
                <span className="font-mono text-[10px] tabular-nums text-sky-600 dark:text-sky-400">
                  {stats.cisco}
                </span>
                <ArrowUpRight className="size-3 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* 2. SPOTLIGHT ACCREDITATIONS (FLAGSHIP HERO BENTO) */}
        {spotlightCerts.length > 0 && searchQuery.trim() === "" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">
                <Sparkles className="size-3.5 text-amber-500" />
                <span>Featured Accreditations</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                Core Competencies
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {spotlightCerts.map((badge) => {
                if (!badge) return null;
                const isAnthropic = badge.issuer === "Anthropic";

                return (
                  <a
                    key={badge.id}
                    href={badge.badgeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-4.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lg hover:shadow-black/10 dark:bg-neutral-900/50"
                  >
                    {/* Top Accent Line */}
                    <div
                      className={cn(
                        "absolute inset-x-0 top-0 h-0.5 transition-opacity duration-300",
                        isAnthropic ? "bg-[#D97757]/80" : "bg-sky-500/80"
                      )}
                    />

                    <div>
                      {/* Badge Icon & Issuer Tag */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="relative size-12 shrink-0 drop-shadow-md transition-transform duration-300 group-hover:scale-105">
                          <Image
                            src={badge.imageUrl}
                            alt=""
                            width={48}
                            height={48}
                            unoptimized
                            className="size-12 object-contain"
                          />
                        </div>

                        {isAnthropic ? (
                          <span className="inline-flex items-center gap-1 rounded-md border border-[#D97757]/30 bg-[#D97757]/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#D97757]">
                            <SiAnthropic className="size-2.5" />
                            Anthropic
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-sky-600 dark:text-sky-400">
                            <SiCisco className="size-2.5" />
                            Cisco
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="mt-3.5 text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary line-clamp-2">
                        {badge.title}
                      </h3>

                      <p className="mt-1 flex items-center gap-1 font-mono text-[10px] text-muted-foreground/75">
                        <ShieldCheck className="size-3 text-emerald-500/80" />
                        <span className="truncate">{badge.organization}</span>
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
                      <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60">
                        {formatDate(badge.issueDate)}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                        Verify
                        <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. INTERACTIVE CONTROL CENTER (SEARCH + ISSUER FILTER + VIEW TOGGLE) */}
        <div className="flex flex-col gap-4 border-b border-border/80 pb-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search credentials by title, skill, or issuer..."
                className="w-full rounded-xl border border-border/80 bg-foreground/[0.02] py-2 pl-9 pr-9 text-xs text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-foreground/30 focus:outline-hidden focus:ring-1 focus:ring-foreground/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground/60 hover:text-foreground cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Issuer Filter Tabs & View Toggle */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Issuer Pills */}
              <div className="flex items-center rounded-xl border border-border/80 bg-foreground/[0.02] p-1">
                <button
                  type="button"
                  onClick={() => setActiveIssuer("All")}
                  className={cn(
                    "rounded-lg px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-wider transition-all duration-200 cursor-pointer",
                    activeIssuer === "All"
                      ? "bg-foreground text-background font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  All ({certifications.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIssuer("Anthropic")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-wider transition-all duration-200 cursor-pointer",
                    activeIssuer === "Anthropic"
                      ? "bg-[#D97757] text-white font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <SiAnthropic className="size-2.5" />
                  Anthropic ({stats.anthropic})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIssuer("Cisco")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-wider transition-all duration-200 cursor-pointer",
                    activeIssuer === "Cisco"
                      ? "bg-sky-600 text-white font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <SiCisco className="size-2.5" />
                  Cisco ({stats.cisco})
                </button>
              </div>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center rounded-xl border border-border/80 bg-foreground/[0.02] p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "rounded-lg p-1.5 transition-colors cursor-pointer",
                    viewMode === "grid"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="Grid view"
                  title="Grid View"
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "rounded-lg p-1.5 transition-colors cursor-pointer",
                    viewMode === "list"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="List view"
                  title="List View"
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Ribbon */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {availableCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "shrink-0 rounded-lg px-3 py-1 font-mono text-[10.5px] uppercase tracking-wider transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-foreground/10 text-foreground font-semibold border border-foreground/20"
                      : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground/60">
            <span>
              Showing {visibleCertifications.length} of {filteredCertifications.length}{" "}
              credential{filteredCertifications.length === 1 ? "" : "s"}
            </span>
            {(searchQuery || activeIssuer !== "All" || activeCategory !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveIssuer("All");
                  setActiveCategory("All");
                }}
                className="text-foreground hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* 4. CREDENTIALS DIRECTORY (GRID OR LIST) */}
        {filteredCertifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Award className="size-10 text-muted-foreground/40 mb-3" />
            <h4 className="text-base font-semibold text-foreground">
              No matching credentials found
            </h4>
            <p className="mt-1 text-xs text-muted-foreground max-w-sm">
              We couldn&apos;t find any certification matching &ldquo;{searchQuery}&rdquo;. Try another keyword or reset the filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveIssuer("All");
                setActiveCategory("All");
              }}
              className="mt-4 rounded-xl border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground hover:bg-foreground/[0.04] cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* GRID VIEW */
          <motion.div
            layout={!prefersReducedMotion}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visibleCertifications.map((badge, idx) => {
                const isAnthropic = badge.issuer === "Anthropic";
                const topSkills = badge.skills.slice(0, 3);
                const remainingSkills = badge.skills.length - topSkills.length;

                return (
                  <motion.article
                    key={badge.id}
                    layout={!prefersReducedMotion}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: Math.min(idx * 0.025, 0.2),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/40 p-5 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lg hover:shadow-black/10 dark:bg-neutral-900/40"
                  >
                    <div>
                      {/* Top Header: Badge Graphic + Issuer Tag + Link */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="relative size-12 shrink-0 drop-shadow-xs transition-transform duration-300 group-hover:scale-108">
                          <Image
                            src={badge.imageUrl}
                            alt=""
                            width={48}
                            height={48}
                            unoptimized
                            className="size-12 object-contain"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          {isAnthropic ? (
                            <span className="inline-flex items-center gap-1 rounded-md border border-[#D97757]/30 bg-[#D97757]/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#D97757]">
                              <SiAnthropic className="size-2.5" />
                              Anthropic
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-sky-600 dark:text-sky-400">
                              <SiCisco className="size-2.5" />
                              Cisco
                            </span>
                          )}

                          <a
                            href={badge.badgeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Verify ${badge.title}`}
                            className="rounded-md border border-border/60 p-1 text-muted-foreground/60 transition-colors hover:border-foreground/30 hover:text-foreground"
                          >
                            <ExternalLink className="size-3" />
                          </a>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mt-3.5 text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary line-clamp-2">
                        {badge.title}
                      </h3>

                      {/* Organization & Date */}
                      <div className="mt-1 flex items-center gap-1.5 font-mono text-[10.5px] text-muted-foreground/70">
                        <ShieldCheck className="size-3 text-emerald-500/80 shrink-0" />
                        <span className="truncate">{badge.organization}</span>
                        <span className="text-border">·</span>
                        <span className="tabular-nums shrink-0">
                          {formatDate(badge.issueDate)}
                        </span>
                      </div>

                      {/* Description Preview */}
                      {badge.description && (
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground/75 line-clamp-2">
                          {badge.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom: Skill Chips & Action */}
                    <div className="mt-4 pt-3.5 border-t border-border/50 flex flex-col gap-2.5">
                      {topSkills.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {topSkills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded border border-border/60 bg-foreground/[0.02] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70"
                            >
                              {skill}
                            </span>
                          ))}
                          {remainingSkills > 0 && (
                            <span className="font-mono text-[9px] text-muted-foreground/50">
                              +{remainingSkills}
                            </span>
                          )}
                        </div>
                      )}

                      <a
                        href={badge.badgeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        <span>{badge.category}</span>
                        <span className="inline-flex items-center gap-1">
                          Verify Credential
                          <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* LIST VIEW */
          <motion.div
            layout={!prefersReducedMotion}
            className="flex flex-col border-t border-border"
          >
            <AnimatePresence mode="popLayout">
              {visibleCertifications.map((badge, idx) => {
                const isAnthropic = badge.issuer === "Anthropic";
                const topSkills = badge.skills.slice(0, 3);

                return (
                  <motion.article
                    key={badge.id}
                    layout={!prefersReducedMotion}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: Math.min(idx * 0.02, 0.15),
                    }}
                    className="border-b border-border py-4 transition-colors hover:bg-foreground/[0.02]"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="size-10 shrink-0">
                          <Image
                            src={badge.imageUrl}
                            alt=""
                            width={40}
                            height={40}
                            unoptimized
                            className="size-10 object-contain drop-shadow-xs"
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold tracking-tight text-foreground truncate">
                              {badge.title}
                            </h3>
                            {isAnthropic ? (
                              <span className="inline-flex items-center gap-1 rounded border border-[#D97757]/30 bg-[#D97757]/10 px-1.5 py-0.2 font-mono text-[8.5px] uppercase tracking-wider text-[#D97757]">
                                <SiAnthropic className="size-2" />
                                Anthropic
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded border border-sky-500/30 bg-sky-500/10 px-1.5 py-0.2 font-mono text-[8.5px] uppercase tracking-wider text-sky-600 dark:text-sky-400">
                                <SiCisco className="size-2" />
                                Cisco
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">
                            {topSkills.join(" · ")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pl-14 sm:pl-0">
                        <div className="text-left sm:text-right">
                          <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground/50">
                            {badge.category}
                          </span>
                          <span className="font-mono text-[10px] tabular-nums text-muted-foreground/70">
                            {formatDate(badge.issueDate)}
                          </span>
                        </div>

                        <a
                          href={badge.badgeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-border/80 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:border-foreground/30 hover:text-foreground"
                        >
                          Verify
                          <ArrowUpRight className="size-3" />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* 5. EXPAND / SHOW MORE ACTION BUTTON */}
        {filteredCertifications.length > DEFAULT_PAGE_SIZE && searchQuery.trim() === "" && (
          <div className="flex flex-col items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/80 bg-foreground/[0.03] px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground shadow-xs transition-all duration-200 hover:border-foreground/30 hover:bg-foreground/[0.08]"
            >
              {isExpanded ? (
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
            <p className="font-mono text-[10px] text-muted-foreground/60">
              Showing {visibleCertifications.length} of {filteredCertifications.length} credentials
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
