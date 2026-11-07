"use client";

import Link from "next/link";
import { Calendar, ArrowUpRight } from "lucide-react";
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
        "group relative flex h-full flex-col justify-between rounded-xl border border-neutral-800/80 bg-[#0a0a0a] p-4 sm:p-5 transition-all duration-200 hover:border-neutral-700 hover:bg-[#0d0d10] select-none outline-none focus-visible:ring-1 focus-visible:ring-neutral-600",
        className
      )}
    >
      <div>
        {/* Top Header: Date · Reading Time + Arrow */}
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-1.5 font-mono text-[9.5px] text-neutral-400 whitespace-nowrap">
            <Calendar className="size-2.5 text-neutral-500 shrink-0" />
            <span>{post.dateDisplay}</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-500">{post.readingTime}</span>
          </div>
          <ArrowUpRight className="size-3.5 text-neutral-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white shrink-0" />
        </div>

        {/* Title */}
        <h3 className="mt-2.5 text-[14.5px] sm:text-[15px] font-semibold leading-snug tracking-tight text-white line-clamp-2 group-hover:text-neutral-200 transition-colors duration-200">
          {post.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-neutral-400 line-clamp-2 text-pretty">
          {post.description}
        </p>
      </div>

      {/* Footer: Category Pill + Primary Tag */}
      <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between gap-2 font-mono text-[9px]">
        <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-neutral-800 bg-[#121212] text-neutral-400 group-hover:border-neutral-700 group-hover:text-white transition-colors duration-200 shrink-0">
          {post.category}
        </span>
        <span className="truncate uppercase tracking-wider text-neutral-500 max-w-[55%] text-right">
          {post.tags[0]}
        </span>
      </div>
    </Link>
  );
}

