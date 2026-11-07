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
  const topSkills = badge.skills?.slice(0, 3) || [];
  const remaining = (badge.skills?.length || 0) - topSkills.length;

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between w-full min-h-[255px] sm:min-h-[265px] select-none rounded-[24px] p-4 sm:p-5 transition-transform duration-300 outline-none",
        className
      )}
    >
      {/* Stepped Folder Shape Background (SVG Chassis matching reference geometry) */}
      <svg
        className="absolute inset-0 size-full pointer-events-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.65)]"
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
      <div className="pointer-events-none absolute inset-0 rounded-[24px] opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:14px_14px]" />

      {/* Action Pill Button sitting in the Top-Right Stepped Notch (Reference: + Allocate funds) */}
      <a
        href={badge.badgeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Verify ${badge.title} credential`}
        className="absolute top-2 right-2 z-20 inline-flex items-center gap-1.5 rounded-full border border-neutral-700/80 bg-[#0e0e12] py-1 pl-1.5 pr-3 font-mono text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider text-neutral-200 shadow-md transition-all duration-200 hover:border-neutral-500 hover:bg-neutral-800 hover:text-white cursor-pointer focus-visible:ring-1 focus-visible:ring-neutral-400"
      >
        <span className="size-4 shrink-0 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="size-2.5 stroke-[2.5]" />
        </span>
        <span>Verify</span>
      </a>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top-Left Tab Content (Issuer Logo + Name) */}
        <div className="flex items-center gap-2 h-7 max-w-[58%]">
          <div className="relative size-5 shrink-0 rounded-md overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center">
            <Image
              src={badge.imageUrl}
              alt=""
              width={20}
              height={20}
              unoptimized
              className="size-4 object-contain"
            />
          </div>
          <span className="font-mono text-[11px] font-black uppercase tracking-wider text-white shrink-0">
            {badge.issuer}
          </span>
          <span className="text-neutral-600 text-[10px] hidden sm:inline">·</span>
          <span className="font-mono text-[8.5px] uppercase tracking-wider text-neutral-400 truncate hidden sm:inline">
            {badge.category}
          </span>
        </div>

        {/* Center Card Body (Typography & Org Details) */}
        <div className="my-3 pr-[58px] sm:pr-[66px]">
          <div className="font-mono text-[8.5px] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-1">
            CREDENTIAL // {badge.category}
          </div>
          <h3 className="font-sans text-[15px] sm:text-base font-black uppercase tracking-tight text-white leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-white">
            {badge.title}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 font-mono text-[9.5px] text-neutral-400">
            <ShieldCheck className="size-3 text-emerald-400 shrink-0 stroke-[2.2]" />
            <span className="truncate">{badge.organization}</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-500 tabular-nums">{formatDate(badge.issueDate)}</span>
          </div>
          {badge.description && (
            <p className="mt-2 text-[11px] leading-relaxed text-neutral-400 line-clamp-2 text-pretty">
              {badge.description}
            </p>
          )}
        </div>

        {/* Footer: Skills Chips & Bottom ID Bar */}
        <div className="pr-[58px] sm:pr-[66px] mt-auto pt-2">
          {topSkills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {topSkills.map((skill: string) => (
                <span
                  key={skill}
                  className="font-mono text-[8.5px] px-2 py-0.5 rounded border border-neutral-800 bg-[#121215] text-neutral-300"
                >
                  {skill}
                </span>
              ))}
              {remaining > 0 && (
                <span className="font-mono text-[8.5px] text-neutral-500">
                  +{remaining}
                </span>
              )}
            </div>
          )}
          <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-neutral-500 font-mono text-[8px] sm:text-[8.5px] uppercase tracking-wider">
            <span>HOLDER // 0XP47</span>
            <span>VERIFIED ID</span>
          </div>
        </div>
      </div>

      {/* Vertical Floating Pill Capsule on the Right Edge (Reference: VISA capsule) */}
      <div className="absolute right-3 sm:right-3.5 bottom-3.5 sm:bottom-4 w-[44px] sm:w-[48px] h-[138px] sm:h-[148px] rounded-full border border-neutral-700/80 bg-gradient-to-b from-[#222228] via-[#141418] to-[#0a0a0d] shadow-2xl flex flex-col items-center justify-between py-2.5 sm:py-3 px-1 z-10 transition-all duration-300 group-hover:scale-105 group-hover:border-neutral-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
        {/* Top Dots */}
        <div className="flex items-center gap-0.5">
          <div className="size-1 rounded-full bg-neutral-400" />
          <div className="size-1 rounded-full bg-neutral-400" />
          <div className="size-1 rounded-full bg-neutral-400" />
        </div>

        {/* Center Badge Seal */}
        <div className="relative size-7 sm:size-8 rounded-full overflow-hidden flex items-center justify-center p-0.5 bg-black/50 border border-neutral-700/60 shadow-inner">
          <Image
            src={badge.imageUrl}
            alt=""
            width={32}
            height={32}
            unoptimized
            className="size-full object-contain drop-shadow-sm"
          />
        </div>

        {/* Bottom Vertical Brand */}
        <span className="font-mono text-[8px] sm:text-[8.5px] font-black uppercase tracking-[0.24em] text-neutral-300 [writing-mode:vertical-rl] rotate-180">
          {badge.issuer.slice(0, 10)}
        </span>
      </div>
    </div>
  );
}
