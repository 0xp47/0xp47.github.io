"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Check,
  Copy,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { blogPosts, type BlogPost } from "@/lib/portfolio-data";
import { marked } from "marked";
import { BlogCard } from "@/components/shared/blog-card";
import { ScrollToTop } from "@/components/shared/scroll-to-top";

function parseContent(content: string): string {
  try {
    return marked.parse(content, { async: false }) as string;
  } catch {
    return content;
  }
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const lenis = useLenis();
  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate sorted posts, previous/next, and related posts
  const sortedPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  }, []);

  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  // 2 related posts (prefer matching category or different from current)
  const relatedPosts = useMemo(() => {
    const sameCategory = sortedPosts.filter(
      (p) => p.slug !== post.slug && p.category === post.category
    );
    const otherCategory = sortedPosts.filter(
      (p) => p.slug !== post.slug && p.category !== post.category
    );
    return [...sameCategory, ...otherCategory].slice(0, 3);
  }, [sortedPosts, post]);

  // Code block copy buttons enhancement
  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const preElements = article.querySelectorAll("pre");
    preElements.forEach((pre) => {
      if (pre.parentElement?.classList.contains("code-block-wrapper")) return;

      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper relative group my-6";

      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const copyButton = document.createElement("button");
      copyButton.className =
        "absolute right-3 top-3 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 opacity-0 group-hover:opacity-100 focus:opacity-100 transition duration-200 select-none cursor-pointer flex items-center gap-1.5 shadow-sm";
      copyButton.innerHTML = "<span>Copy</span>";

      copyButton.addEventListener("click", async () => {
        const codeText = pre.querySelector("code")?.innerText || pre.innerText;
        try {
          await navigator.clipboard.writeText(codeText.trim());
          copyButton.innerHTML = "<span class='text-emerald-400 font-bold'>Copied!</span>";
          copyButton.classList.add("border-emerald-500/40");
          setTimeout(() => {
            copyButton.innerHTML = "<span>Copy</span>";
            copyButton.classList.remove("border-emerald-500/40");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy code:", err);
        }
      });

      wrapper.appendChild(copyButton);
    });
  }, [post]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleScrollToTop = () => {
    lenis?.scrollTo(0, { offset: 0, duration: 1.2 });
  };

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative isolate min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-50 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        style={{ scaleX }}
      />

      {/* Background Ambience: Subtle technical grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:32px_32px]"
        aria-hidden="true"
      />

      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">
              0xp47
            </Link>
            <span className="text-neutral-600">/</span>
            <Link href="/blog/" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-300 font-medium truncate max-w-[120px] sm:max-w-none">
              {post.category}
            </span>
          </nav>

          {/* Actions: Share & Back to Blog */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 chamfer-btn border border-neutral-800 bg-[#0a0a0a] px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors duration-200 cursor-pointer"
              title="Copy article link"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="size-3" />
                  <span>Share</span>
                </>
              )}
            </button>

            <Link
              href="/blog/"
              className="inline-flex items-center gap-1.5 chamfer-btn border border-neutral-800 bg-[#0a0a0a] px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-neutral-300 hover:border-neutral-600 hover:bg-[#141416] hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="size-3.5" />
              <span className="hidden sm:inline">All Articles</span>
              <span className="sm:hidden">Articles</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Article Content Container */}
      <div className="mx-auto max-w-[820px] w-full px-4 sm:px-6 py-10 sm:py-16 flex-grow">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Area */}
          <header className="mb-10 sm:mb-12">
            {/* Category Pill */}
            <div className="flex items-center gap-2 mb-4 font-mono">
              <span className="inline-flex items-center px-2.5 py-1 chamfer-btn border border-neutral-800 bg-[#121212] text-[9.5px] font-bold uppercase tracking-wider text-neutral-300">
                {post.category}
              </span>
            </div>

            {/* Article Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.14] text-balance mb-4">
              {post.title}
            </h1>

            {/* Subtitle / Excerpt */}
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed text-pretty font-light mb-8">
              {post.description}
            </p>

            {/* Author and Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-neutral-800/80">
              {/* Author Info */}
              <Link
                href="/"
                className="group flex items-center gap-3 select-none"
              >
                <div className="relative size-10 rounded-full overflow-hidden border border-neutral-700 bg-neutral-900 shrink-0">
                  <Image
                    src="/images/me-thumbnail.png"
                    alt="Jay Patrick Cano"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-neutral-200 transition-colors">
                    Jay Patrick Cano
                  </div>
                  <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                    Full-Stack Engineer // 0xp47
                  </div>
                </div>
              </Link>

              {/* Publication Meta: Date & Read Time */}
              <div className="flex items-center gap-4 font-mono text-[10.5px] text-neutral-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-neutral-500" />
                  {post.dateDisplay}
                </span>
                <span className="text-neutral-700">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-neutral-500" />
                  {post.readingTime}
                </span>
              </div>
            </div>

            {/* Hero Cover Image */}
            {post.coverImage && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-neutral-800/90 bg-[#0e0e10] mt-8 shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 820px) 100vw, 820px"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            )}
          </header>

          {/* Article Body Content */}
          <div
            ref={articleRef}
            className="article-body max-w-none"
            dangerouslySetInnerHTML={{ __html: parseContent(post.content) }}
          />

          {/* Article Footer: Tags & Share */}
          <div className="mt-14 pt-8 border-t border-neutral-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500 mr-1">
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 chamfer-btn border border-neutral-800 bg-[#101012] font-mono text-[9px] uppercase tracking-wider text-neutral-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 chamfer-btn border border-neutral-800 bg-[#121212] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="size-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied URL</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Previous / Next Article Navigation Cards */}
          {(prevPost || nextPost) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-neutral-800/80">
              {/* Previous Post */}
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-neutral-800/80 bg-[#0a0a0a] hover:border-neutral-600 transition-colors"
                >
                  <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
                    <ChevronLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
                    <span>Previous Article</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-neutral-200 transition-colors line-clamp-2">
                    {prevPost.title}
                  </h4>
                  <div className="mt-3 font-mono text-[9px] text-neutral-500">
                    {prevPost.dateDisplay} · {prevPost.readingTime}
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {/* Next Post */}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-neutral-800/80 bg-[#0a0a0a] hover:border-neutral-600 transition-colors text-right sm:text-right"
                >
                  <div className="flex items-center justify-end gap-1.5 font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
                    <span>Next Article</span>
                    <ChevronRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-neutral-200 transition-colors line-clamp-2">
                    {nextPost.title}
                  </h4>
                  <div className="mt-3 font-mono text-[9px] text-neutral-500">
                    {nextPost.dateDisplay} · {nextPost.readingTime}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-10 border-t border-neutral-800/80">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  <Sparkles className="size-3 text-neutral-400" />
                  <span>Recommended Reading</span>
                </div>
                <Link
                  href="/blog/"
                  className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                >
                  View All ({blogPosts.length}) →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </section>
          )}
        </motion.article>

        {/* Footer Area with Back Link */}
        <footer className="mt-20 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to all articles
          </Link>
          <span className="text-[10px] font-mono text-neutral-600">
            © {new Date().getFullYear()} Jay Patrick Cano (0xp47).
          </span>
        </footer>
      </div>

      {/* Back to Top button */}
      <ScrollToTop show={showBackToTop} onClick={handleScrollToTop} />
    </main>
  );
}
