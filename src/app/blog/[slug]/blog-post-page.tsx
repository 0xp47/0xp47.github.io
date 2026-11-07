"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Copy, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { marked } from "marked";

import { blogPosts, type BlogPost } from "@/lib/portfolio-data";
import { BlogHeader } from "@/components/blog/blog-header";
import { EditorialCard } from "@/components/blog/editorial-card";
import { BlogThumbnail } from "@/components/shared/blog-thumbnail";

function parseContent(content: string): string {
  try {
    return marked.parse(content, { async: false }) as string;
  } catch {
    return content;
  }
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Related posts (exclude current, take 3)
  const relatedPosts = useMemo(() => {
    return blogPosts
      .filter((p) => p.slug !== post.slug)
      .slice(0, 3);
  }, [post.slug]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    // Enhance pre elements with copy button
    const preElements = article.querySelectorAll("pre");
    preElements.forEach((pre) => {
      if (pre.parentElement?.classList.contains("code-block-wrapper")) return;

      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper relative group my-6 rounded-sm border border-neutral-200 overflow-hidden bg-neutral-900";

      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      pre.className = "p-4 text-xs font-mono leading-relaxed overflow-x-auto text-neutral-100 bg-neutral-900";

      const copyButton = document.createElement("button");
      copyButton.className = "absolute right-3 top-3 px-2 py-1 text-[10px] font-mono rounded-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 opacity-80 group-hover:opacity-100 transition duration-150 select-none cursor-pointer";
      copyButton.innerText = "Copy";

      copyButton.addEventListener("click", async () => {
        const codeText = pre.querySelector("code")?.innerText || pre.innerText;
        try {
          await navigator.clipboard.writeText(codeText.trim());
          copyButton.innerText = "Copied!";
          copyButton.classList.add("bg-neutral-700", "text-white");
          setTimeout(() => {
            copyButton.innerText = "Copy";
            copyButton.classList.remove("bg-neutral-700", "text-white");
          }, 2000);
        } catch {
          copyButton.innerText = "Error";
          setTimeout(() => {
            copyButton.innerText = "Copy";
          }, 2000);
        }
      });

      wrapper.appendChild(copyButton);
    });
  }, [post]);

  const coverSrc = post.coverImage || `/images/blog/${post.slug}.png`;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-950 selection:text-white">
      {/* Sticky Reading Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-neutral-950 z-50 origin-left"
      />

      {/* Blog Navigation Header */}
      <BlogHeader showSearch={false} />

      {/* Main Article Container */}
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-neutral-500 hover:text-neutral-950 transition-colors mb-8 select-none"
        >
          <ArrowLeft className="size-3" />
          <span>All Articles</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4">
          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-xs border border-neutral-200 bg-neutral-50 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-700">
              {post.category || "ENGINEERING"}
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wider text-neutral-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 leading-[1.12]">
            {post.title}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal text-pretty">
            {post.description}
          </p>

          {/* Author and Publication Information Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 my-6 border-t border-b border-neutral-200 font-mono text-xs text-neutral-500">
            <div className="flex items-center gap-3">
              <div className="flex size-7 items-center justify-center rounded-full bg-neutral-900 text-white font-mono text-[10px] font-bold">
                0x
              </div>
              <div>
                <p className="font-semibold text-neutral-950">Jay Patrick Cano</p>
                <p className="text-[10px] text-neutral-400">Software Engineer</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3 text-neutral-400" />
                {post.dateDisplay}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3 text-neutral-400" />
                {post.readingTime}
              </span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
                title="Copy link to clipboard"
              >
                {copied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                <span>{copied ? "Copied" : "Share"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-neutral-200 bg-neutral-100 my-8">
          {!imageError ? (
            <Image
              src={coverSrc}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <BlogThumbnail slug={post.slug} className="size-full object-cover" />
          )}
        </div>

        {/* Article Body Content */}
        <div
          ref={articleRef}
          className="article-body"
          dangerouslySetInnerHTML={{ __html: parseContent(post.content) }}
        />

        {/* Article Footer Author Bio */}
        <div className="mt-14 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-neutral-950">Written by Jay Patrick Cano (0xp47)</h4>
            <p className="text-xs text-neutral-600 max-w-md leading-relaxed">
              Full-stack engineer, open-source maintainer, and founder building software in Maasin City, Philippines.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-sm bg-neutral-950 px-4 py-2 font-mono text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            Connect
          </Link>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                Related Articles
              </h3>
              <Link
                href="/blog"
                className="font-mono text-xs font-medium text-neutral-500 hover:text-neutral-950 transition-colors"
              >
                View all articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.slug} className="h-full">
                  <EditorialCard post={relatedPost} />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Minimalist Editorial Footer */}
      <footer className="border-t border-neutral-200 bg-white py-12 mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
            >
              <ArrowLeft className="size-3" />
              <span>Back to Blog</span>
            </Link>
            <span className="text-neutral-300">|</span>
            <Link
              href="/"
              className="font-mono text-xs text-neutral-500 hover:text-neutral-950 transition-colors"
            >
              Portfolio
            </Link>
          </div>

          <div className="font-mono text-[11px] text-neutral-400">
            <span>© {new Date().getFullYear()} Jay Patrick Cano. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
