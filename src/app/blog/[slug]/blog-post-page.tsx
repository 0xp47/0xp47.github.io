"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { blogPosts, type BlogPost } from "@/lib/portfolio-data";

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-foreground font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function renderMarkdown(content: string) {
  return content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="text-lg font-bold text-foreground mt-10 mb-4 tracking-tight">
          {block.replace("## ", "")}
        </h2>
      );
    }

    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="space-y-2.5 my-5">
          {items.map((item, j) => (
            <li
              key={j}
              className="text-sm leading-relaxed text-neutral-300 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-foreground/25"
            >
              {renderInlineMarkdown(item.replace("- ", ""))}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className="text-sm leading-[1.85] text-neutral-300 my-4">
        {renderInlineMarkdown(block)}
      </p>
    );
  });
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug);

  return (
    <main className="min-h-screen bg-background flex flex-col justify-between">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-5xl w-full px-6 py-16 sm:px-8 sm:py-24 flex-grow"
      >
        {/* Two-Column Layout: Article + Sidebar */}
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-16">
          {/* Article Column */}
          <article>
            {/* Header */}
            <header className="mb-10">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground/60 border border-border/20 rounded-full px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl font-bold text-foreground tracking-tight leading-tight sm:text-3xl">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 mt-5">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                  <Calendar className="size-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                  <Clock className="size-3.5" />
                  {post.readingTime}
                </span>
              </div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="mt-8 h-px origin-left bg-gradient-to-r from-foreground/25 via-border to-transparent"
              />
            </header>

            {/* Article Body */}
            <div className="prose-custom">
              {renderMarkdown(post.content)}
            </div>

            {/* Footer Divider */}
            <div className="mt-16 h-px bg-gradient-to-r from-foreground/15 via-border to-transparent" />

            {/* Mobile: More Posts (visible only on smaller screens) */}
            <section className="mt-12 lg:hidden">
              <h2 className="text-sm font-bold text-foreground tracking-tight mb-6">
                More Posts
              </h2>
              <div className="space-y-0">
                {otherPosts.map((otherPost) => (
                  <Link
                    key={otherPost.slug}
                    href={`/blog/${otherPost.slug}`}
                    className="group flex items-center justify-between gap-4 border-t border-border/10 py-4 hover:border-foreground/30 transition-colors duration-500"
                  >
                    <div className="min-w-0">
                      <h3 className="text-xs font-semibold text-foreground/80 group-hover:text-foreground transition-colors duration-300 truncate">
                        {otherPost.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] font-mono text-muted-foreground/50">
                          {otherPost.date}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground/50">
                          {otherPost.readingTime}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="size-3.5 text-muted-foreground/30 group-hover:text-foreground/70 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                  </Link>
                ))}
              </div>
            </section>
          </article>

          {/* Desktop Sidebar: More Posts (sticky, visible only on lg+) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h2 className="text-xs font-bold text-foreground tracking-tight mb-5 uppercase">
                More Posts
              </h2>
              <div className="space-y-0">
                {otherPosts.map((otherPost) => (
                  <Link
                    key={otherPost.slug}
                    href={`/blog/${otherPost.slug}`}
                    className="group flex flex-col border-t border-border/10 py-4 hover:border-foreground/30 transition-colors duration-500"
                  >
                    <h3 className="text-xs font-semibold text-foreground/70 group-hover:text-foreground transition-colors duration-300 leading-snug">
                      {otherPost.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[9px] font-mono text-muted-foreground/40">
                        {otherPost.date}
                      </span>
                      <span className="text-[9px] font-mono text-muted-foreground/40">
                        •
                      </span>
                      <span className="text-[9px] font-mono text-muted-foreground/40">
                        {otherPost.readingTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Footer Area with Back Link */}
        <footer className="mt-20 pt-8 border-t border-border/10 flex items-center justify-between w-full">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground/50 hover:text-foreground transition-colors duration-300 group"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to portfolio
          </Link>
          <span className="text-[10px] font-mono text-muted-foreground/30">
            © {new Date().getFullYear()} Jay Patrick Cano
          </span>
        </footer>
      </motion.div>
    </main>
  );
}


