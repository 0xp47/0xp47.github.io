"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type BlogPost } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-neutral-800/80 bg-[#0a0a0a] p-4 sm:p-5 transition-all duration-300 hover:border-neutral-700 hover:bg-[#0d0d10] select-none outline-none focus-visible:ring-1 focus-visible:ring-neutral-600",
        className
      )}
    >
      {/* Top Specular Edge Highlight (Vercel Signature) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-600/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Subtle Top-Down Radial Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Meta Header: Category Badge + Date */}
        <div className="flex items-center justify-between gap-2 w-full">
          <span className="font-mono text-[9.5px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#121212] border border-neutral-800 text-neutral-400 group-hover:border-neutral-700 group-hover:text-white transition-colors duration-200 shrink-0">
            {post.category}
          </span>
          <time className="text-[11px] font-mono text-neutral-500 tracking-tight shrink-0">
            {post.dateDisplay}
          </time>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-[15px] sm:text-[15.5px] font-semibold leading-snug tracking-tight text-white line-clamp-2 group-hover:text-white transition-colors duration-200">
          {post.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-neutral-400 font-normal line-clamp-2 text-pretty">
          {post.description}
        </p>
      </div>

      {/* Footer: Reading Time + Read Post Action */}
      <div className="relative z-10 mt-4 pt-3.5 border-t border-neutral-800/60 flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] text-neutral-500 tracking-tight">
          {post.readingTime}
        </span>

        {/* Vercel Read Link with animated arrow */}
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-400 group-hover:text-white transition-colors duration-200 shrink-0">
          <span>Read post</span>
          <ArrowRight className="size-3 text-neutral-500 group-hover:text-white transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
