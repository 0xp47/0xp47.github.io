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
        "group flex h-full flex-col rounded-xl border border-border/80 bg-card/40 p-3.5 backdrop-blur-xs transition-all duration-200 hover:border-foreground/30 hover:bg-card/70 hover:-translate-y-0.5 shadow-xs focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden",
        className
      )}
    >
      {/* Cover Image */}
      <div className="relative w-full shrink-0 overflow-hidden rounded-lg border border-border/50">
        <BlogThumbnail
          slug={post.slug}
          className="aspect-[16/10] w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col pt-3.5">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70">
            <Calendar className="size-3" />
            <span className="tabular-nums">{post.dateDisplay}</span>
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70">
            <Clock className="size-3" />
            <span className="tabular-nums">{post.readingTime}</span>
          </span>
        </div>

        <h3 className="mt-2 text-sm font-semibold leading-snug tracking-tight text-foreground transition-colors line-clamp-2 group-hover:text-primary">
          {post.title}
        </h3>

        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {post.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50 mt-3">
          <span className="truncate font-mono text-[9px] tracking-wider text-muted-foreground/60 uppercase">
            {post.tags.slice(0, 2).join(" · ")}
          </span>
          <span className="flex shrink-0 items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
            Read
            <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
