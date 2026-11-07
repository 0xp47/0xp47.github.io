"use client";

import { useState } from "react";
import Image from "next/image";
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
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface BlogThumbnailProps {
  slug: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  "git-branch": GitBranch,
  layers: Layers,
  coffee: Coffee,
  database: Database,
  "book-open": BookOpen,
  terminal: Terminal,
  "graduation-cap": GraduationCap,
  smartphone: Smartphone,
  sparkles: Sparkles,
};

export function BlogThumbnail({
  slug,
  className,
  aspectRatio = "aspect-[16/10]",
  priority = false,
}: BlogThumbnailProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const post = blogPosts.find((p) => p.slug === slug);
  const IconComponent = post?.icon ? iconMap[post.icon] || Sparkles : Sparkles;
  const shortTitle = post?.shortTitle || "Article";

  const hasImage = Boolean(post?.coverImage) && !imageFailed;

  return (
    <div
      className={cn(
        "relative flex shrink-0 select-none items-center justify-center overflow-hidden rounded-lg border border-neutral-800/80 bg-[#0c0c0e] text-neutral-300",
        aspectRatio,
        className
      )}
      aria-hidden="true"
    >
      {/* Background Engineering Grid (subtle technical pattern) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:16px_16px]"
      />

      {hasImage && post?.coverImage ? (
        <>
          <Image
            src={post.coverImage}
            alt={post.title || shortTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            onError={() => setImageFailed(true)}
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          {/* Subtle bottom gradient to blend image smoothly into dark card body */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </>
      ) : (
        /* Stylized Tech Fallback */
        <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
          <div className="relative mb-2 flex size-12 items-center justify-center rounded-full border border-neutral-800 bg-[#141416]">
            <IconComponent className="size-6 text-neutral-300 transition-transform duration-300 group-hover:scale-110" />
            <div className="pointer-events-none absolute -inset-1 rounded-full bg-white/5 blur-sm" />
          </div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            {shortTitle}
          </span>
        </div>
      )}

      {/* Tech Corner Crosshairs */}
      <div className="pointer-events-none absolute left-2 top-2 font-mono text-[9px] text-neutral-600 select-none">
        +
      </div>
      <div className="pointer-events-none absolute right-2 top-2 font-mono text-[9px] text-neutral-600 select-none">
        +
      </div>
    </div>
  );
}
