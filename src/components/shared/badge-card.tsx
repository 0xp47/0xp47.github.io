"use client";

import Image from "next/image";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { certifications } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type BadgeData = (typeof certifications)[number];

interface BadgeCardProps {
  badge: BadgeData;
  index?: number;
  className?: string;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function BadgeCard({ badge, className }: BadgeCardProps) {
  const allSkills = badge.skills || [];
  const primarySkill = allSkills[0];
  const secondarySkill = allSkills[1];

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between select-none p-[1px] transition-colors duration-200 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-800/60 dark:hover:bg-neutral-700 h-full w-full min-w-0",
        className
      )}
      style={{
        clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
      }}
    >
      <div
        className="relative flex flex-col justify-between h-full w-full min-w-0 bg-white p-3.5 sm:p-4 transition-colors duration-200 group-hover:bg-neutral-50 dark:bg-[#040404] dark:group-hover:bg-[#080808]"
        style={{
          clipPath: "polygon(0 0, calc(100% - 13.5px) 0, 100% 13.5px, 100% 100%, 13.5px 100%, 0 calc(100% - 13.5px))",
        }}
      >
        <div className="w-full min-w-0">
          {/* Category & Issue Date */}
          <div className="mb-2.5 flex w-full min-w-0 items-center justify-between gap-2 pr-1">
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-neutral-500 dark:text-neutral-400 truncate min-w-0">
              {badge.issuer} · {badge.category}
            </span>
            <span className="font-mono text-[9px] sm:text-[9.5px] text-neutral-500 tabular-nums shrink-0 ml-1">
              {formatDate(badge.issueDate)}
            </span>
          </div>

          {/* Badge Graphic + Title */}
          <div className="flex items-start gap-2.5 sm:gap-3 w-full min-w-0">
            <div className="relative size-9 sm:size-10 shrink-0 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50 dark:border-neutral-800/60 dark:bg-[#0a0a0a] p-1 flex items-center justify-center">
              <Image
                src={badge.imageUrl}
                alt=""
                width={40}
                height={40}
                unoptimized
                className="size-7 sm:size-8 object-contain grayscale contrast-125 group-hover:grayscale-0 drop-shadow-xs transition-all duration-300 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[13px] sm:text-[14px] font-semibold tracking-tight text-neutral-900 dark:text-white leading-snug line-clamp-2">
                {badge.title}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 font-mono text-[9px] text-neutral-600 dark:text-neutral-400 min-w-0">
                <ShieldCheck className="size-3 text-foreground/80 shrink-0" />
                <span className="truncate">{badge.organization}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Skills Chips + Action Button */}
        <div className="mt-3.5 flex items-center justify-between gap-2 pt-2.5 border-t border-neutral-200 dark:border-neutral-800/40 w-full min-w-0">
          <div className="flex items-center gap-1.5 min-w-0 overflow-hidden flex-1">
            {primarySkill && (
              <span className="font-mono text-[8.5px] px-1.5 sm:px-2 py-0.5 rounded border border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-neutral-800 dark:bg-[#0a0a0a] dark:text-neutral-400 truncate max-w-[100px] sm:max-w-[120px] min-w-0 shrink">
                {primarySkill}
              </span>
            )}
            {secondarySkill && (
              <span className="hidden min-[420px]:inline-block font-mono text-[8.5px] px-1.5 sm:px-2 py-0.5 rounded border border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-neutral-800 dark:bg-[#0a0a0a] dark:text-neutral-400 truncate max-w-[100px] sm:max-w-[120px] min-w-0 shrink">
                {secondarySkill}
              </span>
            )}
            {allSkills.length > 1 && (
              <span className="min-[420px]:hidden font-mono text-[8.5px] px-1 py-0.5 text-neutral-500 shrink-0">
                +{allSkills.length - 1}
              </span>
            )}
            {allSkills.length > 2 && (
              <span className="hidden min-[420px]:inline-block font-mono text-[8.5px] px-1 py-0.5 text-neutral-500 shrink-0">
                +{allSkills.length - 2}
              </span>
            )}
          </div>

          <a
            href={badge.badgeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-1 px-2.5 sm:px-3 py-1 chamfer-btn border border-neutral-300 bg-white font-mono text-[9px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-neutral-700 transition-colors duration-200 hover:border-neutral-400 hover:bg-neutral-100 hover:text-black dark:border-neutral-800 dark:bg-[#0a0a0a] dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-[#121212] dark:hover:text-white shrink-0 ml-auto"
            aria-label={`Verify ${badge.title} credential`}
          >
            <span>Verify</span>
            <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
