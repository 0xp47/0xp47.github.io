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
      className={cn("group flex h-full flex-col outline-none", className)}
    >
      {/* Cover */}
      <div className="relative w-full shrink-0 overflow-hidden rounded-lg">
        <BlogThumbnail
          slug={post.slug}
          className="aspect-[16/10] w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      {/* Body — bare typography */}
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
            <Calendar className="size-3" />
            {post.dateDisplay}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
            <Clock className="size-3" />
            {post.readingTime}
          </span>
        </div>

        <h3 className="mt-2 text-sm font-semibold leading-snug tracking-tight text-foreground decoration-border underline-offset-4 transition-colors line-clamp-2 group-hover:underline">
          {post.title}
        </h3>

        <p className="mt-1.5 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 line-clamp-2">
          {post.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="truncate font-mono text-[9px] tracking-wider text-muted-foreground/45">
            {post.tags.slice(0, 3).join("  ·  ")}
          </span>
          <span className="flex shrink-0 items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70 transition-colors duration-300 group-hover:text-foreground">
            Read
            <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
