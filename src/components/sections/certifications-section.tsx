"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { SiCredly, SiAnthropic } from "react-icons/si";
import { certifications, sectionMeta, profile } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

const INITIAL_DISPLAY_COUNT = 6;

const CERT_FILTERS = [
  "All",
  "Anthropic",
  "Cisco",
  "AI & ML",
  "Security",
  "Development",
  "Systems & Networks",
  "Business",
];

export function CertificationsSection() {
  const prefersReducedMotion = useSafeReducedMotion();
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredCertifications = useMemo(() => {
    let list = certifications;

    if (activeFilter === "Anthropic") {
      list = list.filter((c) => c.issuer === "Anthropic");
    } else if (activeFilter === "Cisco") {
      list = list.filter((c) => c.issuer === "Cisco");
    } else if (activeFilter === "AI & ML") {
      list = list.filter((c) => c.category === "AI" || c.category === "AI & ML");
    } else if (activeFilter !== "All") {
      list = list.filter((c) => c.category === activeFilter);
    }

    return [...list].sort((a, b) => b.issueDate.localeCompare(a.issueDate));
  }, [activeFilter]);

  const displayedCertifications = useMemo(() => {
    if (showAll) {
      return filteredCertifications;
    }
    return filteredCertifications.slice(0, INITIAL_DISPLAY_COUNT);
  }, [filteredCertifications, showAll]);

  const lastIssued = useMemo(() => {
    const dates = certifications.map((c) => c.issueDate).sort();
    return formatDate(dates[dates.length - 1]);
  }, []);

  const getFilterCount = (filter: string) => {
    if (filter === "All") return certifications.length;
    if (filter === "Anthropic") return certifications.filter((c) => c.issuer === "Anthropic").length;
    if (filter === "Cisco") return certifications.filter((c) => c.issuer === "Cisco").length;
    if (filter === "AI & ML") return certifications.filter((c) => c.category === "AI" || c.category === "AI & ML").length;
    return certifications.filter((c) => c.category === filter).length;
  };

  return (
    <Section
      id="certifications"
      eyebrow={sectionMeta.certifications.eyebrow}
      title={sectionMeta.certifications.title}
    >
      <div className="flex flex-col">
        {/* Header Summary & Registry Links */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            <span className="font-semibold text-foreground">
              {certifications.length} verified credentials
            </span>{" "}
            earned through Anthropic Education and Cisco Networking Academy,
            registered on official credential registries — latest issued {lastIssued}.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-[11px] self-start md:self-auto">
            <a
              href={profile.anthropic || "https://anthropic.skilljar.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-mono tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground"
              title="View verified credentials on Anthropic Academy"
            >
              <SiAnthropic className="size-3 text-[#D97757]" />
              <span>Anthropic Academy</span>
              <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <span className="text-border select-none" aria-hidden="true">
              ·
            </span>

            <a
              href={profile.credly}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-mono tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground"
              title="View verified credentials on Credly"
            >
              <SiCredly className="size-3 text-[#ff6b00]" />
              <span>Credly Registry</span>
              <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Filter Tabs — matching the Projects section filter bar */}
        <div className="mb-6 w-fit max-w-full overflow-x-auto rounded-full border border-border/80 bg-foreground/[0.02] p-1 shadow-xs scrollbar-none">
          <nav className="flex items-center gap-1" aria-label="Certification filters">
            {CERT_FILTERS.map((filter) => {
              const count = getFilterCount(filter);
              if (count === 0) return null;
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filter);
                    setShowAll(false);
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full py-1.5 px-3.5 font-mono text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer select-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden",
                    isActive
                      ? "bg-foreground text-background font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                  )}
                >
                  <span>{filter}</span>
                  <span className="text-[10px] tabular-nums opacity-60">({count})</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Grid of Credentials — matching the ProjectCard layout */}
        <motion.div
          layout={!prefersReducedMotion}
          className="mt-2 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {displayedCertifications.map((badge, index) => {
              const topSkills = badge.skills.slice(0, 3);
              const remaining = badge.skills.length - topSkills.length;

              return (
                <motion.article
                  key={badge.id}
                  layout={!prefersReducedMotion}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: prefersReducedMotion ? 0 : Math.min(index * 0.04, 0.24),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative flex h-full flex-col items-start border-t border-border py-6 transition-all duration-300 hover:border-foreground/60 hover:-translate-y-0.5"
                >
                  {/* Category & Issue Date */}
                  <div className="mb-3 flex w-full items-center justify-between gap-3">
                    <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                      {badge.issuer} · {badge.category}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground/60 tabular-nums">
                      {formatDate(badge.issueDate)}
                    </span>
                  </div>

                  {/* Badge Graphic + Title */}
                  <div className="flex items-start gap-3.5 w-full">
                    <div className="relative size-12 shrink-0">
                      <Image
                        src={badge.imageUrl}
                        alt=""
                        width={48}
                        height={48}
                        unoptimized
                        className="size-12 object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors duration-300">
                        {badge.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/70">
                        <ShieldCheck className="size-3 text-emerald-500/80 shrink-0" />
                        <span className="truncate">{badge.organization}</span>
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  {badge.description && (
                    <p className="mt-3 text-xs leading-relaxed text-neutral-500 transition-colors duration-300 group-hover:text-foreground dark:text-neutral-400 line-clamp-2">
                      {badge.description}
                    </p>
                  )}

                  {/* Skills Chips + Action Button */}
                  <div className="mt-auto w-full pt-5">
                    {topSkills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {topSkills.map((skill) => (
                          <span
                            key={skill}
                            className="font-mono text-[9px] px-2 py-0.5 rounded border border-border/50 bg-foreground/[0.02] text-muted-foreground/75 transition-colors duration-300 group-hover:border-foreground/20 group-hover:text-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                        {remaining > 0 && (
                          <span className="font-mono text-[9px] px-1 py-0.5 text-muted-foreground/50">
                            +{remaining}
                          </span>
                        )}
                      </div>
                    )}

                    <a
                      href={badge.badgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3.5 inline-flex cursor-pointer items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                      aria-label={`Verify ${badge.title} credential`}
                    >
                      Verify Credential
                      <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* See All Button — matching the Projects section button */}
        {filteredCertifications.length > INITIAL_DISPLAY_COUNT && (
          <div className="mt-14 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-foreground/[0.03] px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground shadow-xs hover:border-foreground/30 hover:bg-foreground/[0.08] transition-all cursor-pointer focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden"
            >
              <span>
                {showAll
                  ? "Show Fewer"
                  : `See All ${filteredCertifications.length} Credentials`}
              </span>
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
