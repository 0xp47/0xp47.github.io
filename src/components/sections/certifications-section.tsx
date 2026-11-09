"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiCredly, SiAnthropic } from "react-icons/si";
import { certifications, sectionMeta, profile } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { EASE_OUT_EXPO, fadeUpVariants } from "@/lib/animation-variants";
import { cn } from "@/lib/utils";
import { BadgeCard } from "@/components/shared/badge-card";

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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3, margin: "0px 0px -10% 0px" }}
          variants={fadeUpVariants}
          className="mb-4 sm:mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between will-change-transform"
        >
          <p className="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            <span className="font-semibold text-neutral-900 dark:text-white">
              {certifications.length} verified credentials
            </span>{" "}
            earned through Anthropic Education and Cisco Networking Academy,
            registered on official credential registries — latest issued {lastIssued}.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] self-start md:self-auto">
            <a
              href={profile.anthropic || "https://anthropic.skilljar.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-mono tracking-wide text-neutral-600 transition-all duration-200 hover:text-black hover:-translate-y-0.5 dark:text-neutral-400 dark:hover:text-white"
              title="View verified credentials on Anthropic Academy"
            >
              <SiAnthropic className="size-3 text-foreground/80 group-hover:text-foreground transition-transform duration-200 group-hover:scale-110" />
              <span>Anthropic Academy</span>
              <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <span className="text-neutral-700 select-none" aria-hidden="true">
              ·
            </span>

            <a
              href={profile.credly}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-mono tracking-wide text-neutral-600 transition-all duration-200 hover:text-black hover:-translate-y-0.5 dark:text-neutral-400 dark:hover:text-white"
              title="View verified credentials on Credly"
            >
              <SiCredly className="size-3 text-foreground/80 group-hover:text-foreground transition-transform duration-200 group-hover:scale-110" />
              <span>Credly Registry</span>
              <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Filter Tabs — individual chamfered buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3, margin: "0px 0px -10% 0px" }}
          variants={fadeUpVariants}
          className="mb-4 sm:mb-5 w-full max-w-full overflow-x-auto scrollbar-none pb-1 will-change-transform"
        >
          <nav className="flex items-center gap-2 py-0.5" aria-label="Certification filters">
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
                    "inline-flex items-center gap-2 chamfer-btn py-1.5 px-3.5 font-mono text-[11px] uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer select-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden whitespace-nowrap shrink-0",
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

        {/* Grid of Credentials — matching the ProjectCard layout */}
        <div className="mt-2 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch w-full">
          {displayedCertifications.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 36, scale: 0.975 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.18, margin: "0px 0px -8% 0px" }}
              transition={{
                duration: 1.15,
                delay: (index % 3) * 0.13,
                ease: EASE_OUT_EXPO,
              }}
              className="h-full w-full min-w-0 will-change-transform"
            >
              <BadgeCard badge={badge} index={index} />
            </motion.div>
          ))}
        </div>

        {/* See All Button — matching the Projects section button */}
        {filteredCertifications.length > INITIAL_DISPLAY_COUNT && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3, margin: "0px 0px -8% 0px" }}
            variants={fadeUpVariants}
            className="mt-8 sm:mt-10 flex justify-center will-change-transform"
          >
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2 chamfer-btn-lg border border-neutral-300 bg-white px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:border-neutral-400 hover:text-black hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#0a0a0a] dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_10px_24px_rgba(0,0,0,0.45)] cursor-pointer focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden"
            >
              <span>
                {showAll
                  ? "Show Fewer"
                  : `See All ${filteredCertifications.length} Credentials`}
              </span>
            </button>
          </motion.div>
        )}
      </div>
    </Section>
  );
}
