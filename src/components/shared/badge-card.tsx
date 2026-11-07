"use client";

import Image from "next/image";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { certifications } from "@/lib/portfolio-data";
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
  const topSkills = badge.skills?.slice(0, 2) || [];
  const remaining = (badge.skills?.length || 0) - topSkills.length;

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between select-none p-[1px] transition-colors duration-200 bg-neutral-800/90 hover:bg-neutral-600 h-full",
        className
      )}
      style={{
        clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
      }}
    >
      <div
        className="relative flex flex-col justify-between h-full bg-[#0a0a0a] p-3.5 sm:p-4 transition-colors duration-200 group-hover:bg-[#0d0d10]"
        style={{
          clipPath: "polygon(0 0, calc(100% - 13.5px) 0, 100% 13.5px, 100% 100%, 13.5px 100%, 0 calc(100% - 13.5px))",
        }}
      >
        <div>
          {/* Category & Issue Date */}
          <div className="mb-2.5 flex w-full items-center justify-between gap-3 pr-1">
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-400 truncate">
              {badge.issuer} · {badge.category}
            </span>
            <span className="font-mono text-[9.5px] text-neutral-500 tabular-nums shrink-0">
              {formatDate(badge.issueDate)}
            </span>
          </div>

          {/* Badge Graphic + Title */}
          <div className="flex items-start gap-3 w-full">
            <div className="relative size-10 shrink-0 rounded-lg overflow-hidden border border-neutral-800/60 bg-[#121212] p-1 flex items-center justify-center">
              <Image
                src={badge.imageUrl}
                alt=""
                width={40}
                height={40}
                unoptimized
                className="size-8 object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[13.5px] sm:text-[14px] font-semibold tracking-tight text-white leading-snug line-clamp-2">
                {badge.title}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 font-mono text-[9px] text-neutral-400">
                <ShieldCheck className="size-3 text-emerald-400 shrink-0" />
                <span className="truncate">{badge.organization}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Skills Chips + Action Button */}
        <div className="mt-3.5 flex items-center justify-between gap-2.5 pt-2.5 border-t border-neutral-800/60">
          <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
            {topSkills.map((skill) => (
              <span
                key={skill}
                className="font-mono text-[8.5px] px-2 py-0.5 rounded border border-neutral-800 bg-[#121212] text-neutral-400 truncate max-w-[120px]"
              >
                {skill}
              </span>
            ))}
            {remaining > 0 && (
              <span className="font-mono text-[8.5px] px-1 py-0.5 text-neutral-500 shrink-0">
                +{remaining}
              </span>
            )}
          </div>

          <a
            href={badge.badgeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-1.5 px-3 py-1 chamfer-btn border border-neutral-800 bg-[#121212] font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-neutral-300 transition-colors duration-200 hover:border-neutral-700 hover:bg-[#181818] hover:text-white shrink-0 ml-auto"
            aria-label={`Verify ${badge.title} credential`}
          >
            Verify
            <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
