"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogThumbnail } from "@/components/shared/blog-thumbnail";
import { type BlogPost } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col border border-border/10 bg-transparent rounded-xl overflow-hidden hover:border-foreground/20 transition-all duration-500 h-full text-left",
        className
      )}
    >
      {/* Top Thumbnail cover */}
      <div className="w-full aspect-[16/10] bg-white border-b border-border/10 overflow-hidden relative shrink-0">
        <BlogThumbnail
          slug={post.slug}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Body Content */}
      <div className="p-4 flex flex-col justify-between flex-grow gap-3">
        <div className="space-y-2.5">
          {/* Date & Reading time */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground/60 uppercase">
              <Calendar className="size-3" />
              {post.dateDisplay}
            </span>
            <span className="flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground/60 uppercase">
              <Clock className="size-3" />
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-foreground tracking-tight group-hover:text-foreground/95 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs leading-relaxed text-neutral-400 line-clamp-2">
            {post.description}
          </p>
        </div>

        {/* Footer tags */}
        <div className="flex items-center justify-between border-t border-border/5 pt-3 mt-1.5">
          <div className="font-mono text-[8px] text-muted-foreground/50 tracking-wider truncate max-w-[70%]">
            {post.tags.join("  •  ")}
          </div>
          <span className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground/65 group-hover:text-foreground transition-colors shrink-0">
            read
            <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </Link>
  );
}
