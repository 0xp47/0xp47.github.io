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
    <div
      className={cn(
        "group relative flex flex-col justify-between w-full min-h-[175px] sm:min-h-[185px] select-none rounded-[22px] p-3.5 sm:p-4 transition-transform duration-300 outline-none",
        className
      )}
    >
      {/* Stepped Folder Shape Background (SVG Chassis matching reference geometry) */}
      <svg
        className="absolute inset-0 size-full pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.65)]"
        viewBox="0 0 100 100"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="
            M 6 0
            H 55
            C 58 0, 60 3.5, 62 8
            C 64 12.5, 66 17, 70 17
            H 94
            C 97.3 17, 100 21.5, 100 27
            V 93
            C 100 96.9, 97.3 100, 94 100
            H 6
            C 2.7 100, 0 96.9, 0 93
            V 7
            C 0 3.1, 2.7 0, 6 0
            Z
          "
          fill="#0a0a0c"
          className="stroke-neutral-800 transition-colors duration-300 group-hover:stroke-neutral-700"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Subtle Tech Grid Watermark Pattern */}
      <div className="pointer-events-none absolute inset-0 rounded-[22px] opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:14px_14px]" />

      {/* Action Pill Button sitting in the Top-Right Stepped Notch */}
      <a
        href={badge.badgeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Verify ${badge.title} credential`}
        className="absolute top-2 right-2 z-20 inline-flex items-center gap-1.5 rounded-full border border-neutral-700/80 bg-[#0e0e12] py-1 pl-1.5 pr-2.5 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-200 shadow-md transition-all duration-200 hover:border-neutral-500 hover:bg-neutral-800 hover:text-white cursor-pointer focus-visible:ring-1 focus-visible:ring-neutral-400"
      >
        <span className="size-3.5 shrink-0 rounded-full bg-white text-black flex items-center justify-center font-bold text-[9px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="size-2.5 stroke-[2.5]" />
        </span>
        <span>Verify</span>
      </a>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top-Left Header: Issuer Logo + Name + Category Badge */}
        <div className="flex items-center gap-2 h-6 max-w-[58%]">
          <div className="relative size-5 shrink-0 rounded overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center">
            <Image
              src={badge.imageUrl}
              alt=""
              width={20}
              height={20}
              unoptimized
              className="size-3.5 object-contain"
            />
          </div>
          <span className="font-mono text-[10.5px] font-black uppercase tracking-wider text-white shrink-0 truncate">
            {badge.issuer}
          </span>
          <span className="text-neutral-600 text-[10px] hidden sm:inline">·</span>
          <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-neutral-800 bg-[#121215] text-neutral-400 truncate hidden sm:inline">
            {badge.category}
          </span>
        </div>

        {/* Center: Title + Organization & Date */}
        <div className="my-auto py-1">
          <h3 className="font-sans text-[13.5px] sm:text-[14px] font-bold uppercase tracking-tight text-white leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-white">
            {badge.title}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 font-mono text-[9px] sm:text-[9.5px] text-neutral-400">
            <ShieldCheck className="size-3 text-emerald-400 shrink-0 stroke-[2.2]" />
            <span className="truncate">{badge.organization}</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-500 tabular-nums shrink-0">{formatDate(badge.issueDate)}</span>
          </div>
        </div>

        {/* Footer: Skills Tags + Holder ID */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60 font-mono text-[8.5px] mt-1">
          <div className="flex items-center gap-1.5 overflow-hidden max-w-[68%]">
            {topSkills.map((skill: string) => (
              <span
                key={skill}
                className="font-mono text-[8px] px-1.5 py-0.5 rounded border border-neutral-800 bg-[#121215] text-neutral-300 truncate"
              >
                {skill}
              </span>
            ))}
            {remaining > 0 && (
              <span className="font-mono text-[8px] text-neutral-500 shrink-0">
                +{remaining}
              </span>
            )}
          </div>
          <span className="text-neutral-500 font-mono text-[8px] uppercase tracking-wider shrink-0">
            ID // 0XP47
          </span>
        </div>
      </div>
    </div>
  );
}
