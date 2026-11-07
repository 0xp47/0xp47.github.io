"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { type BlogPost } from "@/lib/portfolio-data";
import { BlogThumbnail } from "@/components/shared/blog-thumbnail";
import { cn } from "@/lib/utils";

interface EditorialCardProps {
  post: BlogPost;
  className?: string;
}

export function EditorialCard({ post, className }: EditorialCardProps) {
  const [imageError, setImageError] = useState(false);
  const coverSrc = post.coverImage || `/images/blog/${post.slug}.png`;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex h-full flex-col justify-between rounded-sm border border-neutral-200/90 bg-white p-4 transition-all duration-200 hover:border-neutral-900 hover:shadow-xs select-none",
        className
      )}
    >
      <div>
        {/* Cover Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xs border border-neutral-200/70 bg-neutral-100">
          {!imageError ? (
            <Image
              src={coverSrc}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <BlogThumbnail slug={post.slug} className="size-full object-cover" />
          )}

          {/* Micro Category Overlay Badge */}
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-block rounded-xs border border-neutral-200/80 bg-white/95 backdrop-blur-xs px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-neutral-800">
              {post.category || post.tags[0] || "ARTICLE"}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="pt-4 space-y-2">
          {/* Category Eyebrow */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
              {post.shortTitle || post.category}
            </span>
            <ArrowUpRight className="size-3.5 text-neutral-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-950" />
          </div>

          {/* Title */}
          <h3 className="text-[15px] sm:text-[16px] font-bold tracking-tight text-neutral-950 leading-snug line-clamp-2 group-hover:text-neutral-700 transition-colors">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed text-pretty">
            {post.description}
          </p>
        </div>
      </div>

      {/* Metadata Footer: Date + Reading Time */}
      <div className="mt-5 pt-3.5 flex items-center justify-between border-t border-neutral-100 font-mono text-[10.5px] text-neutral-400">
        <span className="flex items-center gap-1.5">
          <Calendar className="size-3 text-neutral-400" />
          {post.dateDisplay}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-3 text-neutral-400" />
          {post.readingTime}
        </span>
      </div>
    </Link>
  );
}
