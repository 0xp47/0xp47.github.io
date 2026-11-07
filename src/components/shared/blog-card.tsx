"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogThumbnail } from "@/components/shared/blog-thumbnail";
import { type BlogPost } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  className?: string;
  priority?: boolean;
}

export function BlogCard({ post, className, priority = false }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-neutral-800/80 bg-[#0a0a0a] transition-all duration-300 hover:border-neutral-600 hover:shadow-[0_12px_36px_rgba(0,0,0,0.65)] select-none outline-none focus-visible:ring-1 focus-visible:ring-neutral-400",
        className
      )}
    >
      {/* Top Cover with Category Tag Overlay */}
      <div className="relative w-full shrink-0 overflow-hidden bg-[#101012]">
        <BlogThumbnail
          slug={post.slug}
          priority={priority}
          aspectRatio="aspect-[16/10]"
          className="w-full rounded-none border-b border-neutral-800/80 border-t-0 border-x-0"
        />

        {/* Floating Category Badge */}
        <div className="absolute left-3 top-3 z-10">
          <span className="inline-flex items-center px-2 py-0.5 chamfer-btn border border-neutral-800/90 bg-[#0a0a0acc] backdrop-blur-md font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-300 shadow-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Meta: Date and Reading Time */}
        <div className="flex items-center gap-3 text-neutral-400">
          <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider">
            <Calendar className="size-3 text-neutral-500" />
            {post.dateDisplay}
          </span>
          <span className="text-neutral-700">·</span>
          <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider">
            <Clock className="size-3 text-neutral-500" />
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-2.5 text-[15.5px] font-semibold leading-snug tracking-tight text-white line-clamp-2 transition-colors duration-200 group-hover:text-neutral-200 text-balance">
          {post.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-neutral-400 line-clamp-2 text-pretty">
          {post.description}
        </p>

        {/* Footer: Tags and Read CTA Button */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-800/60">
          <span className="truncate font-mono text-[8.5px] uppercase tracking-wider text-neutral-500 max-w-[65%]">
            {post.tags.slice(0, 3).join("  ·  ")}
          </span>
          <span className="flex shrink-0 items-center gap-1 px-2.5 py-1 chamfer-btn border border-neutral-800 bg-[#121212] font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-300 transition-colors duration-200 group-hover:border-neutral-600 group-hover:bg-[#181818] group-hover:text-white">
            <span>Read</span>
            <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
