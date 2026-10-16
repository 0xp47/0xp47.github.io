"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { SiCredly } from "react-icons/si";
import { certifications, certificationCategories, sectionMeta, profile } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { cardVariants } from "@/lib/animation-variants";
import { cn } from "@/lib/utils";

export function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCertifications = useMemo(() => {
    if (activeCategory === "All") return certifications;
    return certifications.filter((cert) => cert.category === activeCategory);
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: certifications.length };
    for (const cert of certifications) {
      counts[cert.category] = (counts[cert.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <Section
      id="certifications"
      eyebrow={sectionMeta.certifications.eyebrow}
      title={sectionMeta.certifications.title}
    >
      <div className="flex flex-col gap-6 mt-8">
        
        {/* Top Control Bar: Category filters and Credly Verification Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/10 pb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {certificationCategories.map((category) => {
              const isActive = activeCategory === category;
              const count = categoryCounts[category] || 0;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-xs font-mono transition-all duration-300 cursor-pointer flex items-center gap-1.5",
                    isActive
                      ? "bg-foreground text-background font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5 border border-border/15"
                  )}
                >
                  <span>{category}</span>
                  <span
                    className={cn(
                      "text-[10px] rounded-full px-1.5 py-0.2",
                      isActive
                        ? "bg-background/20 text-background"
                        : "bg-foreground/5 text-muted-foreground"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Credly Profile Quick Link */}
          <a
            href={profile.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-border/20 bg-foreground/[0.02] hover:bg-foreground/[0.06] hover:border-foreground/30 px-3.5 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-all duration-300"
            title="View verified credentials on Credly"
          >
            <SiCredly className="size-3.5 text-[#ff6b00]" />
            <span className="font-medium">Verify on Credly</span>
            <ArrowUpRight className="size-3 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Credentials Grid */}
        <motion.div
          layout
          className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredCertifications.map((badge) => {
              const formattedDate = new Date(badge.issueDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              });

              return (
                <motion.article
                  key={badge.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  variants={cardVariants}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border/15 bg-card/25 p-5 backdrop-blur-sm hover:border-foreground/30 hover:bg-card/40 transition-all duration-300 shadow-sm"
                >
                  <div>
                    {/* Top Header: Badge Image + Metadata */}
                    <div className="flex items-start gap-4">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border/20 bg-black/20 p-1.5 flex items-center justify-center group-hover:border-foreground/30 transition-colors">
                        <Image
                          src={badge.imageUrl}
                          alt={`${badge.title} badge`}
                          width={60}
                          height={60}
                          unoptimized
                          className="size-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="inline-block rounded-full bg-foreground/[0.05] border border-border/15 px-2 py-0.5 text-[9.5px] font-mono text-muted-foreground uppercase tracking-wider">
                            {badge.category}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground/60">
                            {formattedDate}
                          </span>
                        </div>

                        <h3 className="mt-1 text-sm font-bold text-foreground leading-snug group-hover:text-foreground transition-colors line-clamp-2">
                          {badge.title}
                        </h3>

                        <div className="flex items-center gap-1 mt-1 text-[11px] text-muted-foreground">
                          <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{badge.organization}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-3.5 text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
                      {badge.description}
                    </p>

                    {/* Skills Tags */}
                    {badge.skills && badge.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3.5">
                        {badge.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="font-mono text-[9px] text-muted-foreground/60 border border-border/10 bg-foreground/[0.02] rounded px-2 py-0.5"
                          >
                            {skill}
                          </span>
                        ))}
                        {badge.skills.length > 3 && (
                          <span className="font-mono text-[9px] text-muted-foreground/40 self-center">
                            +{badge.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Verify Link */}
                  <div className="mt-5 pt-3.5 border-t border-border/10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground/60">
                      <CheckCircle2 className="size-3 text-emerald-500" />
                      Verified Credential
                    </span>

                    <a
                      href={badge.badgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-foreground hover:underline transition-all"
                      aria-label={`Verify ${badge.title} badge on Credly`}
                    >
                      Verify
                      <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Footer Subtext */}
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground/70">
            All 12 credentials earned through{" "}
            <span className="text-foreground font-semibold">Cisco Networking Academy (NetAcad)</span>{" "}
            and verifiable on the Credly digital badge registry.
          </p>
        </div>

      </div>
    </Section>
  );
}
