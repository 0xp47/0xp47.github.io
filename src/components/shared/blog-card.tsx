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
        "group relative flex h-full flex-col select-none p-[1px] transition-colors duration-200 bg-neutral-800/90 hover:bg-neutral-600 outline-none focus-visible:ring-1 focus-visible:ring-neutral-600",
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
          {/* Meta Header: Category Badge + Date */}
          <div className="flex items-center justify-between gap-2 w-full pr-1">
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 chamfer-btn border border-neutral-800 bg-[#121212] text-neutral-400 group-hover:border-neutral-700 group-hover:text-white transition-colors duration-200 shrink-0">
              {post.category}
            </span>
            <time className="text-[10.5px] font-mono text-neutral-500 tracking-tight shrink-0">
              {post.dateDisplay}
            </time>
          </div>

          {/* Title */}
          <h3 className="mt-2.5 text-[14px] sm:text-[14.5px] font-semibold leading-snug tracking-tight text-white line-clamp-2 group-hover:text-white transition-colors duration-200">
            {post.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-[11.5px] leading-relaxed text-neutral-400 font-normal line-clamp-2 text-pretty">
            {post.description}
          </p>
        </div>

        {/* Footer: Reading Time + Read Post Action */}
        <div className="mt-3.5 pt-2.5 border-t border-neutral-800/60 flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] text-neutral-500 tracking-tight">
            {post.readingTime}
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-400 group-hover:text-white transition-colors duration-200 shrink-0">
            <span>Read post</span>
            <ArrowRight className="size-3 text-neutral-500 group-hover:text-white transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
