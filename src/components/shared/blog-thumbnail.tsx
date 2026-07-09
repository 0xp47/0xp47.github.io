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
    <div className={cn("relative rounded-lg overflow-hidden bg-white border border-neutral-200 flex flex-col items-center justify-center p-2 select-none shrink-0", className)}>
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      
      {/* Inner subtle outline */}
      <div className="absolute inset-1.5 border border-neutral-100 rounded pointer-events-none" />
      
      {/* Outline Icon circle wrapper */}
      <div className="relative z-10 p-1.5 rounded-full bg-neutral-50 border border-neutral-100 mb-1">
        <IconComponent className="size-7 text-neutral-800 stroke-[1.25]" />
      </div>
      
      {/* Typographic Label */}
      <span className="relative z-10 font-mono text-[8px] font-bold text-neutral-500 uppercase tracking-[0.2em] text-center truncate w-full px-1">
        {shortTitle}
      </span>
    </div>
  );
}
