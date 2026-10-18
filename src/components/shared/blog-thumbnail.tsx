"use client";

import { cn } from "@/lib/utils";
import { blogPosts } from "@/lib/portfolio-data";

import {
  GitBranch,
  Layers,
  Coffee,
  Database,
  BookOpen,
  Terminal,
  GraduationCap,
  Smartphone,
  Sparkles
} from "lucide-react";

interface BlogThumbnailProps {
  slug: string;
  className?: string;
}

const iconMap = {
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

export function BlogThumbnail({ slug, className }: BlogThumbnailProps) {
  const post = blogPosts.find((p) => p.slug === slug);
  const IconComponent = post?.icon ? (iconMap[post.icon as keyof typeof iconMap] || Sparkles) : Sparkles;
  const shortTitle = post?.shortTitle || "Article";

  return (
    <div
      className={cn(
        "relative flex shrink-0 select-none flex-col items-center justify-center overflow-hidden rounded-lg bg-card ring-1 ring-black/[0.1] dark:ring-white/[0.06] p-2",
        className,
      )}
      aria-hidden="true"
    >
      {/* Faint grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* Soft radial glow behind the icon */}
      <div className="pointer-events-none absolute -bottom-8 h-24 w-32 rounded-full bg-black/[0.04] blur-2xl" />

      <IconComponent
        className="relative z-10 mb-1 size-7 text-neutral-800 transition-transform duration-500 group-hover:scale-105"
        strokeWidth={1.25}
      />

      <span className="relative z-10 w-full truncate px-1 text-center font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
        {shortTitle}
      </span>
    </div>
  );
}
