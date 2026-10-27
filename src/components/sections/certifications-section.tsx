"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { SiCredly } from "react-icons/si";
import { certifications, certificationCategories, sectionMeta, profile } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const availableCategories = useMemo(() => {
    const existing = new Set(certifications.map((c) => c.category));
    const base = certificationCategories.filter((c) => c === "All" || existing.has(c));
    const additional = Array.from(existing).filter((c) => !certificationCategories.includes(c));
    return [...base, ...additional];
  }, []);

  const filteredCertifications = useMemo(() => {
    const list =
      activeCategory === "All"
        ? certifications
        : certifications.filter((cert) => cert.category === activeCategory);
    return [...list].sort((a, b) => b.issueDate.localeCompare(a.issueDate));
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: certifications.length };
    for (const cert of certifications) {
      counts[cert.category] = (counts[cert.category] || 0) + 1;
    }
    return counts;
  }, []);

  const lastIssued = useMemo(() => {
    const dates = certifications.map((c) => c.issueDate).sort();
    return formatDate(dates[dates.length - 1]);
  }, []);

  return (
    <Section
      id="certifications"
      eyebrow={sectionMeta.certifications.eyebrow}
      title={sectionMeta.certifications.title}
    >
      <div className="flex flex-col">
        {/* Summary + controls band */}
        <div className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-5">
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-xl">
              <span className="font-semibold text-foreground">
                {certifications.length} verified credentials
              </span>{" "}
              earned through Cisco Networking Academy and registered on the Credly
              digital badge registry — latest issued {lastIssued}.
            </p>

            {/* Category tabs — plain text, animated underline */}
            <nav
              className="flex flex-wrap items-center gap-x-5 gap-y-2"
              aria-label="Certification categories"
            >
              {availableCategories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "group relative cursor-pointer font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground/55 hover:text-foreground",
                    )}
                  >
                    {category}
                    <span className="ml-1.5 text-[9px] tabular-nums text-muted-foreground/40">
                      {categoryCounts[category] || 0}
                    </span>
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px w-full origin-left bg-foreground transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Credly profile link */}
          <a
            href={profile.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start text-[11px] tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground md:self-auto"
            title="View verified credentials on Credly"
          >
            <SiCredly className="size-3.5 text-[#ff6b00]" />
            <span>Complete profile on Credly</span>
            <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Credential directory — ledger rows */}
        <motion.div layout className="border-t border-border">
          <AnimatePresence mode="popLayout">
            {filteredCertifications.map((badge, index) => {
              const topSkills = badge.skills.slice(0, 3);
              const remaining = badge.skills.length - topSkills.length;

              return (
                <motion.article
                  key={badge.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(index * 0.03, 0.3),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b border-border"
                >
                  <a
                    href={badge.badgeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 transition-all duration-300 hover:pl-2"
                    aria-label={`${badge.title} — verify on Credly`}
                  >
                    {/* Badge image */}
                    <div className="hidden w-11 shrink-0 py-5 sm:block">
                      <Image
                        src={badge.imageUrl}
                        alt=""
                        width={56}
                        height={56}
                        unoptimized
                        className="size-11 object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Core info */}
                    <div className="min-w-0 py-5">
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">
                        {badge.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground/75">
                        <ShieldCheck className="size-3 shrink-0 text-emerald-500/80" />
                        <span className="truncate">{badge.organization}</span>
                      </p>
                      <p className="mt-2 truncate font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground/45">
                        {topSkills.join(" · ")}
                        {remaining > 0 && (
                          <span className="text-muted-foreground/35"> +{remaining}</span>
                        )}
                      </p>
                    </div>

                    {/* Right meta column */}
                    <div className="flex flex-col items-end gap-0.5 py-5 text-right">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/45">
                        {badge.category}
                      </span>
                      <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60">
                        {formatDate(badge.issueDate)}
                      </span>
                      <span className="mt-2 inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/40 transition-colors duration-300 group-hover:text-foreground">
                        Verify
                        <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </a>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
}
