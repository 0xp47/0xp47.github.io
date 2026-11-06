"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, LayoutGrid, List, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import { SiCredly, SiAnthropic, SiCisco } from "react-icons/si";
import { certifications, certificationCategories, sectionMeta, profile } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

const DEFAULT_DISPLAY_COUNT = 9;

export function CertificationsSection() {
  const prefersReducedMotion = useSafeReducedMotion();

  // Filters state
  const [activeIssuer, setActiveIssuer] = useState<"All" | "Anthropic" | "Cisco">("All");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Available domain categories
  const availableCategories = useMemo(() => {
    const existing = new Set(certifications.map((c) => c.category));
    const base = certificationCategories.filter((c) => c === "All" || existing.has(c));
    const additional = Array.from(existing).filter((c) => !certificationCategories.includes(c));
    return [...base, ...additional];
  }, []);

  // Filtered certifications based on issuer, category, and search query
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
        const categoryMatch = cert.category.toLowerCase().includes(q);
        const skillsMatch = cert.skills.some((s) => s.toLowerCase().includes(q));
        return titleMatch || orgMatch || categoryMatch || skillsMatch;
      });
    }

    return [...list].sort((a, b) => b.issueDate.localeCompare(a.issueDate));
  }, [activeIssuer, activeCategory, searchQuery]);

  // Decides whether items should be truncated or fully displayed
  const visibleCertifications = useMemo(() => {
    if (isExpanded || searchQuery.trim() !== "") {
      return filteredCertifications;
    }
    return filteredCertifications.slice(0, DEFAULT_DISPLAY_COUNT);
  }, [filteredCertifications, isExpanded, searchQuery]);

  // Overall metadata calculations
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
      <div className="flex flex-col gap-8">
        {/* Top Header Card & Verification Registries */}
        <div className="flex flex-col gap-6 border-b border-border pb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 text-pretty">
              <span className="font-semibold text-foreground">
                {stats.total} verified credentials
              </span>{" "}
              spanning AI architectures, prompt systems, cybersecurity, and full-stack engineering
              from Anthropic Academy and Cisco Networking Academy — latest issued {stats.latestDate}.
            </p>

            {/* Direct Verification Portals */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="https://anthropic.skilljar.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-[#D97757]/30 bg-[#D97757]/10 px-3 py-1 font-mono text-[11px] font-medium text-[#D97757] transition-all duration-200 hover:border-[#D97757]/50 hover:bg-[#D97757]/20"
                title="View verified credentials on Anthropic Academy"
              >
                <SiAnthropic className="size-3" />
                <span>Anthropic Academy</span>
                <span className="rounded-full bg-[#D97757]/20 px-1.5 py-0.2 font-mono text-[9px] tabular-nums text-[#D97757]">
                  {stats.anthropic}
                </span>
                <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={profile.credly}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 font-mono text-[11px] font-medium text-sky-600 dark:text-sky-400 transition-all duration-200 hover:border-sky-500/50 hover:bg-sky-500/20"
                title="View verified credentials on Credly"
              >
                <SiCredly className="size-3 text-[#ff6b00]" />
                <span>Credly Registry</span>
                <span className="rounded-full bg-sky-500/20 px-1.5 py-0.2 font-mono text-[9px] tabular-nums text-sky-600 dark:text-sky-400">
                  {stats.cisco}
                </span>
                <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Interactive Control Band: Issuer Switcher, Search Input, and View Mode */}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            {/* Primary Issuer Switcher */}
            <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-foreground/[0.02] p-1">
              {(["All", "Anthropic", "Cisco"] as const).map((issuer) => {
                const count =
                  issuer === "All"
                    ? certifications.length
                    : certifications.filter((c) => c.issuer === issuer).length;
                const isActive = activeIssuer === issuer;

                return (
                  <button
                    key={issuer}
                    type="button"
                    onClick={() => {
                      setActiveIssuer(issuer);
                      setIsExpanded(false);
                    }}
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs transition-all duration-200",
                      isActive
                        ? "bg-foreground text-background font-semibold shadow-xs"
                        : "text-muted-foreground/75 hover:bg-foreground/[0.04] hover:text-foreground",
                    )}
                  >
                    {issuer === "Anthropic" && (
                      <SiAnthropic className={cn("size-3", isActive ? "text-[#D97757]" : "text-[#D97757]")} />
                    )}
                    {issuer === "Cisco" && (
                      <SiCisco className={cn("size-3", isActive ? "text-sky-400" : "text-sky-500")} />
                    )}
                    <span>{issuer === "All" ? "All Issuers" : issuer}</span>
                    <span
                      className={cn(
                        "rounded px-1 text-[10px] tabular-nums",
                        isActive ? "bg-background/20 text-background" : "text-muted-foreground/50",
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input & View Mode Switcher */}
            <div className="flex items-center gap-2.5">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search skills, title, topics..."
                  className="w-full rounded-md border border-border/60 bg-foreground/[0.02] py-1.5 pl-8 pr-7 font-mono text-xs text-foreground placeholder:text-muted-foreground/45 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                    title="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* View Mode Toggle: Grid vs Compact List */}
              <div className="flex items-center rounded-md border border-border/60 bg-foreground/[0.02] p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  title="Grid showcase"
                  className={cn(
                    "cursor-pointer rounded p-1.5 transition-colors",
                    viewMode === "grid"
                      ? "bg-foreground text-background shadow-xs"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <LayoutGrid className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  title="Compact list"
                  className={cn(
                    "cursor-pointer rounded p-1.5 transition-colors",
                    viewMode === "list"
                      ? "bg-foreground text-background shadow-xs"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <List className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Domain Sub-categories Tab Bar */}
          <nav
            className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1"
            aria-label="Certification domain filters"
          >
            {availableCategories.map((category) => {
              const isActive = activeCategory === category;
              const count =
                category === "All"
                  ? certifications.filter(
                      (c) => activeIssuer === "All" || c.issuer === activeIssuer,
                    ).length
                  : certifications.filter(
                      (c) =>
                        (activeIssuer === "All" || c.issuer === activeIssuer) &&
                        c.category === category,
                    ).length;

              if (count === 0 && category !== "All") return null;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setIsExpanded(false);
                  }}
                  className={cn(
                    "group relative cursor-pointer font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200",
                    isActive
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground/60 hover:text-foreground",
                  )}
                >
                  {category}
                  <span className="ml-1 text-[9.5px] tabular-nums text-muted-foreground/45">
                    {count}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryCertUnderline"
                      className="absolute -bottom-1 left-0 h-0.5 w-full bg-foreground"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Empty State */}
        {filteredCertifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShieldCheck className="size-10 text-muted-foreground/30" />
            <h4 className="mt-3 text-sm font-semibold text-foreground">No certifications found</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your issuer, domain, or search query filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveIssuer("All");
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 font-mono text-xs text-foreground underline underline-offset-4 hover:text-foreground/80 cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* 1. GRID SHOWCASE VIEW (Modern Card Layout) */}
        {viewMode === "grid" && filteredCertifications.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleCertifications.map((badge, index) => {
                const topSkills = badge.skills.slice(0, 3);
                const remainingSkills = badge.skills.length - topSkills.length;
                const isAnthropic = badge.issuer === "Anthropic";

                return (
                  <motion.article
                    key={badge.id}
                    layout="position"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.3,
                      delay: prefersReducedMotion ? 0 : Math.min(index * 0.02, 0.25),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={cn(
                      "group relative flex flex-col justify-between rounded-xl border p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1",
                      "border-border/70 bg-card/40 dark:bg-neutral-900/40",
                      isAnthropic
                        ? "hover:border-[#D97757]/40 hover:shadow-[0_8px_30px_rgba(217,119,87,0.08)]"
                        : "hover:border-sky-500/40 hover:shadow-[0_8px_30px_rgba(2,132,199,0.08)]",
                    )}
                  >
                    <div>
                      {/* Card Header: Issuer tag + Verified status */}
                      <div className="flex items-center justify-between gap-2">
                        {isAnthropic ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D97757]/30 bg-[#D97757]/10 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-[#D97757]">
                            <SiAnthropic className="size-2.5" />
                            Anthropic
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-sky-600 dark:text-sky-400">
                            <SiCisco className="size-2.5" />
                            Cisco NetAcad
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Verified
                        </span>
                      </div>

                      {/* Main Credential Visual & Title */}
                      <div className="mt-4 flex items-start gap-3.5">
                        <div className="relative size-14 shrink-0 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-110">
                          <Image
                            src={badge.imageUrl}
                            alt={badge.title}
                            width={56}
                            height={56}
                            unoptimized
                            className="size-14 object-contain drop-shadow-sm"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">
                            {badge.category}
                          </span>
                          <h3 className="mt-0.5 text-sm font-semibold tracking-tight text-foreground line-clamp-2">
                            {badge.title}
                          </h3>
                          <p className="mt-1 truncate text-[11px] text-muted-foreground/75">
                            {badge.organization}
                          </p>
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div className="mt-4 pt-3 border-t border-border/40">
                        <div className="flex flex-wrap gap-1">
                          {topSkills.map((skill) => (
                            <span
                              key={skill}
                              className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-border/50 bg-foreground/[0.02] text-muted-foreground/75"
                            >
                              {skill}
                            </span>
                          ))}
                          {remainingSkills > 0 && (
                            <span className="self-center font-mono text-[9px] text-muted-foreground/45 px-1">
                              +{remainingSkills}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Issued Date & Direct Verify Link */}
                    <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                      <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60">
                        {formatDate(badge.issueDate)}
                      </span>
                      <a
                        href={badge.badgeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`Verify ${badge.title}`}
                      >
                        Verify
                        <ArrowUpRight className="size-3 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* 2. COMPACT LIST / LEDGER VIEW (Dense Tabular Layout) */}
        {viewMode === "list" && filteredCertifications.length > 0 && (
          <div className="divide-y divide-border border-y border-border">
            <AnimatePresence mode="popLayout">
              {visibleCertifications.map((badge, index) => {
                const topSkills = badge.skills.slice(0, 3);
                const isAnthropic = badge.issuer === "Anthropic";

                return (
                  <motion.article
                    key={badge.id}
                    layout="position"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.25,
                      delay: prefersReducedMotion ? 0 : Math.min(index * 0.02, 0.2),
                    }}
                    className="group flex flex-col justify-between gap-3 py-3.5 sm:flex-row sm:items-center transition-colors duration-200 hover:bg-foreground/[0.02]"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
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
                              Anthropic
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded border border-sky-500/30 bg-sky-500/10 px-1.5 py-0.2 font-mono text-[8.5px] uppercase tracking-wider text-sky-600 dark:text-sky-400">
                              Cisco
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">
                          {topSkills.join(" · ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pl-13 sm:pl-0">
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
                        className="inline-flex items-center gap-1 rounded border border-border/60 px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wider text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-all duration-200"
                      >
                        Verify
                        <ArrowUpRight className="size-2.5" />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Expand / Show More Action Band — Prevents Long Page Scroll */}
        {filteredCertifications.length > DEFAULT_DISPLAY_COUNT && searchQuery.trim() === "" && (
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
