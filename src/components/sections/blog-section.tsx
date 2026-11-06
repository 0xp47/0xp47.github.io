"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogPosts, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { cardVariants } from "@/lib/animation-variants";
import { BlogCard } from "@/components/shared/blog-card";

const INITIAL_COUNT = 4;

export function BlogSection() {
  const visiblePosts = useMemo(() => {
    return [...blogPosts]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, INITIAL_COUNT);
  }, []);

  return (
    <Section id="blog" eyebrow={sectionMeta.blog.eyebrow} title={sectionMeta.blog.title}>
      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-6"
      >
        {visiblePosts.map((post) => (
          <motion.div key={post.slug} variants={cardVariants} className="h-full">
            <BlogCard post={post} />
          </motion.div>
        ))}
      </motion.div>

      {blogPosts.length > INITIAL_COUNT && (
        <div className="flex justify-center mt-12">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-foreground/[0.03] px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground shadow-xs hover:border-foreground/30 hover:bg-foreground/[0.08] transition-all cursor-pointer focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden"
          >
            <span>See All Posts</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}
    </Section>
  );
}
