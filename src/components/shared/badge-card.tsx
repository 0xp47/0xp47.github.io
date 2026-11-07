"use client";

import Image from "next/image";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { type certifications } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export type BadgeData = (typeof certifications)[number];

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
  const topSkills = badge.skills?.slice(0, 3) || [];
  const remaining = (badge.skills?.length || 0) - topSkills.length;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col justify-between rounded-xl border border-neutral-800/80 bg-[#0a0a0a] p-4 sm:p-5 transition-colors duration-200 hover:border-neutral-700 select-none",
        className
      )}
    >
      <div>
        {/* Top Header: Issuer/Category & Issue Date */}
        <div className="mb-3 flex w-full items-center justify-between gap-2">
          <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-neutral-400 truncate">
            {badge.issuer} · {badge.category}
          </span>
          <span className="font-mono text-[10px] text-neutral-500 tabular-nums shrink-0">
            {formatDate(badge.issueDate)}
          </span>
        </div>

        {/* Badge Graphic + Title & Organization */}
        <div className="flex items-start gap-3 w-full">
          <div className="relative size-11 shrink-0 rounded-lg overflow-hidden border border-neutral-800/70 bg-[#121212] p-1 flex items-center justify-center">
            <Image
              src={badge.imageUrl}
              alt=""
              width={44}
              height={44}
              unoptimized
              className="size-9 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[14px] sm:text-[14.5px] font-semibold tracking-tight text-white leading-snug line-clamp-2">
              {badge.title}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-neutral-400">
              <ShieldCheck className="size-3 text-emerald-400 shrink-0 stroke-[2.2]" />
              <span className="truncate">{badge.organization}</span>
            </p>
          </div>
        </div>

        {/* Description */}
        {badge.description && (
          <p className="mt-2.5 text-xs leading-relaxed text-neutral-400 line-clamp-2 text-pretty">
            {badge.description}
          </p>
        )}
      </div>

      {/* Footer: Skills Tags + Verify Action Button */}
      <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t border-neutral-800/60">
        {/* Skills Chips */}
        <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
          {topSkills.map((skill) => (
            <span
              key={skill}
              className="font-mono text-[8.5px] px-2 py-0.5 rounded border border-neutral-800 bg-[#121212] text-neutral-400 truncate"
            >
              {skill}
            </span>
          ))}
          {remaining > 0 && (
            <span className="font-mono text-[8.5px] text-neutral-500 shrink-0">
              +{remaining}
            </span>
          )}
        </div>

        {/* Verify Credential Chamfer Button */}
        <a
          href={badge.badgeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 chamfer-btn border border-neutral-800 bg-[#121212] font-mono text-[9.5px] font-bold uppercase tracking-wider text-neutral-300 transition-colors duration-200 hover:border-neutral-700 hover:bg-[#181818] hover:text-white"
          aria-label={`Verify ${badge.title} credential`}
        >
          Verify
          <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  );
}
