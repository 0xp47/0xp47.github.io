"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { blogPosts, type BlogPost } from "@/lib/portfolio-data";
import { marked } from "marked";

function parseContent(content: string): string {
  try {
    return marked.parse(content, { async: false }) as string;
  } catch {
    return content;
  }
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    // Find all <pre> elements
    const preElements = article.querySelectorAll("pre");
    preElements.forEach((pre) => {
      // Avoid duplicate wrappers if useEffect runs multiple times
      if (pre.parentElement?.classList.contains("code-block-wrapper")) return;

      // Create wrapper element
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper relative group";

      // Insert wrapper before pre, and move pre inside it
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // Create copy button
      const copyButton = document.createElement("button");
      copyButton.className = "absolute right-3 top-3 px-2 py-1 text-[10px] font-mono rounded bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 select-none cursor-pointer";
      copyButton.innerText = "Copy";

      // Add click handler
      copyButton.addEventListener("click", async () => {
        const codeText = pre.querySelector("code")?.innerText || pre.innerText;
        try {
          await navigator.clipboard.writeText(codeText.trim());
          copyButton.innerText = "Copied!";
          copyButton.classList.add("bg-green-500/20", "text-green-400", "border-green-500/30");
          setTimeout(() => {
            copyButton.innerText = "Copy";
            copyButton.classList.remove("bg-green-500/20", "text-green-400", "border-green-500/30");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy text:", err);
          copyButton.innerText = "Error";
          setTimeout(() => {
            copyButton.innerText = "Copy";
          }, 2000);
        }
      });

      wrapper.appendChild(copyButton);
    });
  }, [post]);

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
                  {post.dateDisplay}
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
            <div 
              ref={articleRef}
              className="prose-custom markdown-body"
              dangerouslySetInnerHTML={{ __html: parseContent(post.content) }}
            />

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
                          {otherPost.dateDisplay}
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
                        {otherPost.dateDisplay}
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


