"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogPosts, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";

const INITIAL_COUNT = 4;

import { cardVariants } from "@/lib/animation-variants";
import { BlogCard } from "@/components/shared/blog-card";

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
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 mt-8"
      >
        {visiblePosts.map((post) => (
          <motion.div key={post.slug} variants={cardVariants} className="h-full">
            <BlogCard post={post} />
          </motion.div>
        ))}
      </motion.div>

      {blogPosts.length > INITIAL_COUNT && (
        <div className="flex justify-center mt-16">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <span className="decoration-border underline-offset-4 group-hover:underline">
              See All Posts
            </span>
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}
    </Section>
  );
}
