"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogPosts, sectionMeta } from "@/lib/portfolio-data";
import { Section } from "@/components/shared/section";
import { cardVariants, fadeUpVariants } from "@/lib/animation-variants";
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
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {visiblePosts.map((post) => (
          <motion.div key={post.slug} variants={cardVariants} className="h-full">
            <BlogCard post={post} />
          </motion.div>
        ))}
      </motion.div>

      {blogPosts.length > INITIAL_COUNT && (
        <motion.div
          variants={fadeUpVariants}
          className="flex justify-center mt-8 sm:mt-10"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 chamfer-btn-lg border border-neutral-300 bg-white px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:border-neutral-400 hover:text-black hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#0a0a0a] dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_10px_24px_rgba(0,0,0,0.45)] cursor-pointer focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden"
          >
            <span>See All Posts</span>
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      )}
    </Section>
  );
}
