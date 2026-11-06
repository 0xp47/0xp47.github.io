"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, GitBranch, Layers, Coffee, Database, BookOpen, Terminal, GraduationCap, Smartphone } from "lucide-react";
import { type BlogPost } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  className?: string;
}

const iconMap: Record<string, typeof Sparkles> = {
  "git-branch": GitBranch,
  "layers": Layers,
  "coffee": Coffee,
  "database": Database,
  "book-open": BookOpen,
  "terminal": Terminal,
  "graduation-cap": GraduationCap,
  "smartphone": Smartphone,
  "sparkles": Sparkles,
};

export function BlogCard({ post, index = 0, className }: BlogCardProps) {
  const IconComponent = post.icon && iconMap[post.icon] ? iconMap[post.icon] : Sparkles;
  const year = post.date ? new Date(post.date).getFullYear() : 2026;
  const readMin = post.readingTime ? post.readingTime.replace(/[^0-9]/g, "") : "5";
  const numIndex = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative flex flex-col sm:flex-row h-full rounded-[26px] sm:rounded-[30px] border border-neutral-800 bg-[#000000] p-2.5 sm:p-3.5 transition-all duration-300 hover:border-neutral-700 select-none overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-neutral-600 shadow-2xl hover:shadow-[0_0_35px_rgba(255,255,255,0.03)]",
        className
      )}
    >
      {/* Left Tech Strip (vertical text + attributes inspired by reference image) */}
      <div className="hidden sm:flex flex-row items-stretch justify-between w-[76px] md:w-[86px] shrink-0 py-3.5 px-2 select-none border-r border-neutral-800/60 mr-2">
        {/* Rotated Vertical Title */}
        <span className="font-mono text-[10px] md:text-[10.5px] font-black uppercase tracking-[0.32em] text-neutral-400 [writing-mode:vertical-rl] rotate-180 flex items-center justify-center transition-colors duration-200 group-hover:text-neutral-200">
          0XP47 // ARCHIVE
        </span>

        {/* Vertical Attributes Column */}
        <div className="flex flex-col justify-between items-start font-mono text-[7.5px] md:text-[8px] font-bold tracking-wider text-neutral-500 uppercase">
          <span className="text-neutral-400">01 {post.tags[0]?.slice(0, 7) || "TECH"}</span>
          <span>02 {post.tags[1]?.slice(0, 7) || "DEV"}</span>
          <span>03 {post.tags[2]?.slice(0, 7) || "CORE"}</span>
          <span>04 {readMin}MIN</span>
          <span>05 ARCH</span>
          <span className="text-neutral-400">06 {year}</span>
        </div>
      </div>

      {/* Main Console Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Chassis Row with Outer Pill Button */}
        <div className="flex items-center justify-between pb-2.5 px-1">
          <span className="sm:hidden font-mono text-[9px] font-black uppercase tracking-[0.25em] text-neutral-400">
            0XP47 // {numIndex}
          </span>
          <div className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-[#0a0a0a] px-3.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-300 transition-all duration-200 group-hover:border-neutral-600 group-hover:bg-neutral-900 group-hover:text-white">
            <span>Read Article</span>
            <ArrowRight className="size-2.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Inner Console Screen Panel */}
        <div className="relative flex-1 flex flex-col justify-between rounded-[20px] sm:rounded-[24px] border border-neutral-800/90 bg-gradient-to-br from-[#1c1c1f] via-[#121214] to-[#0a0a0c] p-4 sm:p-5 md:p-6 shadow-2xl overflow-hidden min-h-[300px]">
          {/* Subtle Grid Texture */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />

          {/* Top Edge Inner Glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Top Nav Tabs inside Inner Panel (Reference: Home / About / Solutions / Services) */}
          <div className="relative z-10 flex flex-wrap items-center gap-2 sm:gap-2.5 font-mono text-[9px] uppercase tracking-wider text-neutral-400">
            <span className="rounded-full bg-white px-3 py-0.5 font-black text-black shadow-sm">
              {post.shortTitle || "ARTICLE"}
            </span>
            <span className="rounded-full bg-neutral-900/80 border border-neutral-800 px-2.5 py-0.5 text-neutral-300 font-medium">
              {post.readingTime}
            </span>
            <span className="rounded-full bg-neutral-900/80 border border-neutral-800 px-2.5 py-0.5 text-neutral-400 font-medium hidden sm:inline">
              {post.dateDisplay}
            </span>
            <span className="rounded-full bg-neutral-900/80 border border-neutral-800 px-2.5 py-0.5 text-neutral-400 font-medium hidden md:inline">
              {post.tags[0]}
            </span>
          </div>

          {/* Center Split: Bold Display Headline on Left, 3D Stacked Deck on Right */}
          <div className="relative z-10 my-4 flex items-center justify-between gap-4 sm:gap-6">
            <div className="flex-1 min-w-0 pr-1">
              <h3 className="font-sans text-[15px] sm:text-base md:text-lg font-black uppercase tracking-tight text-white leading-snug line-clamp-3 group-hover:text-white transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400 line-clamp-2 text-pretty">
                {post.description}
              </p>
            </div>

            {/* 3D Stacked Card Deck Visual (Matching Reference Image Fanning Depth on sm+ screens) */}
            <div className="hidden sm:block relative size-20 sm:size-24 md:size-28 shrink-0 select-none mr-2">
              {/* Back Layer 3 */}
              <div className="absolute inset-0 rounded-2xl border border-neutral-600/50 bg-neutral-800/40 translate-x-3.5 -translate-y-2.5 scale-[0.84] shadow-md transition-transform duration-300 group-hover:translate-x-4.5 group-hover:-translate-y-3.5" />
              {/* Mid Layer 2 */}
              <div className="absolute inset-0 rounded-2xl border border-neutral-500/70 bg-neutral-800/70 translate-x-2 -translate-y-1.5 scale-[0.92] shadow-lg transition-transform duration-300 group-hover:translate-x-2.5 group-hover:-translate-y-2" />
              {/* Front Layer 1 */}
              <div className="relative inset-0 size-full rounded-2xl border border-neutral-500 bg-gradient-to-br from-[#27272b] via-[#1a1a1d] to-[#0f0f12] p-2.5 flex flex-col items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105 group-hover:border-neutral-400">
                <IconComponent className="size-6 sm:size-7 md:size-8 text-white mb-1.5 stroke-[1.6]" />
                <span className="font-mono text-[8px] sm:text-[8.5px] font-bold uppercase tracking-widest text-neutral-300 truncate max-w-full text-center">
                  {post.shortTitle || "TECH"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Action Console Bar (Reference: Capsule Pill with Arrow Button + Socials) */}
          <div className="relative z-10 pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 rounded-full border border-neutral-700/80 bg-[#0a0a0c] py-1 pl-3.5 pr-1 max-w-full min-w-0 shadow-inner transition-colors group-hover:border-neutral-600">
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-300 truncate max-w-[150px] sm:max-w-[220px]">
                0xp47.dev/blog/{post.slug}
              </span>
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 group-hover:translate-x-0.5 shadow-sm">
                <ArrowRight className="size-3 stroke-[2.5]" />
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-neutral-500 font-semibold">
              <span className="text-neutral-400">LOG // {numIndex}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">{post.tags.slice(0, 2).join(" · ")}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
