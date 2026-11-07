"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { type BlogPost } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  className?: string;
}

export function BlogCard({ post, index, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-neutral-800/80 bg-[#0a0a0a] overflow-hidden transition-all duration-200 hover:border-neutral-700 hover:shadow-lg hover:shadow-black/40 select-none outline-none focus-visible:ring-1 focus-visible:ring-neutral-600",
        className
      )}
    >
      {/* Cover Artwork Header */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#121212] border-b border-neutral-800/60">
        <Image
          src={post.coverImage}
          alt={post.title}
          width={640}
          height={400}
          priority={index !== undefined && index < 3}
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Floating Category Pill */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0a0a0a]/85 backdrop-blur-md border border-neutral-800/80 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-neutral-300 z-10">
          {post.category}
        </span>

        {/* Floating Read Time Pill */}
        <span className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#0a0a0a]/85 backdrop-blur-md border border-neutral-800/80 font-mono text-[9px] text-neutral-400 z-10">
          <Clock className="size-2.5 text-neutral-400" />
          {post.readingTime}
        </span>

        {/* Subtle Bottom Vignette Gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Date Row */}
        <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-neutral-500">
          <Calendar className="size-3 text-neutral-500" />
          <span>{post.dateDisplay}</span>
        </div>

        {/* Title */}
        <h3 className="mt-2 text-[15.5px] sm:text-[16.5px] font-semibold leading-snug tracking-tight text-white line-clamp-2 group-hover:text-neutral-200 transition-colors">
          {post.title}
        </h3>

        {/* Excerpt / Description */}
        <p className="mt-2 text-xs sm:text-[12.5px] leading-relaxed text-neutral-400 line-clamp-2 text-pretty">
          {post.description}
        </p>

        {/* Footer: Tags + Chamfer Read Button */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-800/60">
          <span className="truncate font-mono text-[9px] uppercase tracking-wider text-neutral-500 max-w-[65%]">
            {post.tags.slice(0, 3).join("  ·  ")}
          </span>
          <span className="flex shrink-0 items-center gap-1.5 px-2.5 py-1 chamfer-btn border border-neutral-800 bg-[#121212] font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-300 transition-colors duration-200 group-hover:border-neutral-700 group-hover:bg-[#181818] group-hover:text-white">
            Read
            <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
