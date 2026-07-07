"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";

const INITIAL_COUNT = 4;

import { cardVariants } from "@/lib/animation-variants";

export function BlogSection() {
  const [showAll, setShowAll] = useState(false);
  const visiblePosts = showAll ? blogPosts : blogPosts.slice(0, INITIAL_COUNT);

  return (
    <Section id="blog" eyebrow="Blog" title="Thoughts, lessons, and things I've learned along the way.">
      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="grid gap-6 sm:grid-cols-2 mt-8"
      >
        {visiblePosts.map((post) => (
          <motion.div key={post.slug} variants={cardVariants}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col border-t border-border/10 pt-5 hover:border-foreground/35 transition-colors duration-500"
            >
              {/* Date and Reading Time */}
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/60">
                  <Calendar className="size-3" />
                  {post.dateDisplay}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/60">
                  <Clock className="size-3" />
                  {post.readingTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-foreground tracking-tight group-hover:text-foreground transition-colors duration-300">
                {post.title}
              </h3>

              {/* Description */}
              <p className="text-xs leading-relaxed text-neutral-400 mt-2 line-clamp-2 group-hover:text-neutral-200 transition-colors duration-500">
                {post.description}
              </p>

              {/* Footer: Tags + Read More */}
              <div className="flex items-end justify-between mt-4">
                <div className="font-mono text-[8.5px] text-muted-foreground/50 tracking-wider group-hover:text-foreground/50 transition-colors duration-500">
                  {post.tags.join("  •  ")}
                </div>
                <span className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground/40 group-hover:text-foreground/80 transition-colors duration-300 shrink-0 ml-4">
                  Read
                  <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* See More / See Less */}
      {blogPosts.length > INITIAL_COUNT && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="font-mono text-xs tracking-wider text-muted-foreground/60 hover:text-foreground border border-border/20 hover:border-foreground/40 rounded-full px-6 py-2.5 transition-all duration-300 cursor-pointer"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </Section>
  );
}
