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
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative flex h-full flex-col justify-between rounded-xl border border-neutral-800/80 bg-[#0a0a0a] p-4 sm:p-5 transition-colors duration-200 hover:border-neutral-700 select-none outline-none focus-visible:ring-1 focus-visible:ring-neutral-600",
        className
      )}
    >
      {/* Cover */}
      <div className="relative w-full shrink-0 overflow-hidden rounded-lg border border-neutral-800/60 bg-[#121212]">
        <BlogThumbnail
          slug={post.slug}
          className="aspect-[16/10] w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col pt-3.5">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-neutral-400">
            <Calendar className="size-3 text-neutral-500" />
            {post.dateDisplay}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-neutral-400">
            <Clock className="size-3 text-neutral-500" />
            {post.readingTime}
          </span>
        </div>

        <h3 className="mt-2 text-[15px] font-semibold leading-snug tracking-tight text-white line-clamp-2 group-hover:text-white">
          {post.title}
        </h3>

        <p className="mt-1.5 text-xs leading-relaxed text-neutral-400 line-clamp-2">
          {post.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="truncate font-mono text-[9px] tracking-wider text-neutral-500">
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
