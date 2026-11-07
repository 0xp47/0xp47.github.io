"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowLeft, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import { useLenis } from "lenis/react";

import { blogPosts } from "@/lib/portfolio-data";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogAbstractVisual } from "@/components/blog/blog-abstract-visual";
import { EditorialCard } from "@/components/blog/editorial-card";
import { TopicsSidebar, BLOG_TOPICS } from "@/components/blog/topics-sidebar";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { cn } from "@/lib/utils";

export function BlogPageClient() {
  const lenis = useLenis();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const POSTS_PER_PAGE = 6;

  const articlesSectionRef = useRef<HTMLDivElement>(null);

  const scrollToArticles = () => {
    if (articlesSectionRef.current) {
      const top = articlesSectionRef.current.offsetTop - 70;
      lenis?.scrollTo(top, { duration: 0.8 });
    }
  };

  const handleScrollToTop = () => {
    lenis?.scrollTo(0, { offset: 0, duration: 0.8 });
  };

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Filter logic
  const filteredPosts = useMemo(() => {
    let result = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

    // Filter by topic
    const topicConfig = BLOG_TOPICS.find((t) => t.id === selectedTopic);
    if (topicConfig && topicConfig.id !== "all") {
      result = result.filter(topicConfig.matches);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          post.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, selectedTopic]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  }, [filteredPosts]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Reset page when search or topic changes
  const [prevFilterState, setPrevFilterState] = useState(`${searchQuery}-${selectedTopic}`);
  const currentFilterState = `${searchQuery}-${selectedTopic}`;
  if (prevFilterState !== currentFilterState) {
    setPrevFilterState(currentFilterState);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }

  const isFilterActive = searchQuery.trim() !== "" || selectedTopic !== "all";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedTopic("all");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-950 selection:text-white">
      {/* 1. Blog Header */}
      <BlogHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearch={true}
      />

      {/* 2. Hero Section */}
      <section className="relative border-b border-neutral-200/90 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            {/* Left Column: Editorial Headline & Copy */}
            <div className="space-y-6">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 rounded-xs border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                <span className="size-1.5 rounded-full bg-neutral-950" />
                <span>The 0xp47 Publication</span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.05]">
                Build. Learn. Grow.
              </h1>

              {/* Short Description */}
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl text-pretty font-normal">
                Engineering notes, system architecture breakdowns, and honest reflections on software craftsmanship, open-source maintainership, and developer growth.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={scrollToArticles}
                  className="inline-flex items-center gap-2 rounded-sm bg-neutral-950 px-5 py-2.5 font-mono text-xs font-semibold text-white transition-colors duration-200 hover:bg-neutral-800 cursor-pointer shadow-xs select-none"
                >
                  <span>Explore Articles</span>
                  <ArrowDown className="size-3.5" />
                </button>

                <Link
                  href="/#about"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors py-2.5 px-3 select-none"
                >
                  <span>About 0xp47</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Minimalist Abstract Visual */}
            <div className="w-full">
              <BlogAbstractVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 3 & 4. Main Section: Latest Articles & Topics Sidebar */}
      <section
        id="articles"
        ref={articlesSectionRef}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16"
      >
        {/* Mobile Topics Filter Bar */}
        <div id="topics" className="lg:hidden mb-8 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-neutral-400">
              Filter Topics
            </span>
            {isFilterActive && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="font-mono text-[10px] text-neutral-500 hover:text-neutral-950 underline cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {BLOG_TOPICS.map((topic) => {
              const isSelected = selectedTopic === topic.id;
              const count = blogPosts.filter(topic.matches).length;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopic(topic.id)}
                  className={cn(
                    "flex items-center gap-1.5 shrink-0 rounded-xs px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer select-none",
                    isSelected
                      ? "bg-neutral-950 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-950"
                  )}
                >
                  <span>{topic.name}</span>
                  <span
                    className={cn(
                      "font-mono text-[9px] px-1 rounded-xs",
                      isSelected ? "bg-neutral-800 text-neutral-300" : "bg-neutral-200/60 text-neutral-500"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Grid Layout: Sidebar + 3-Column Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 xl:gap-14 items-start">
          {/* Topics Sidebar (Desktop Sticky) */}
          <div className="hidden lg:block sticky top-24">
            <TopicsSidebar
              posts={blogPosts}
              selectedTopic={selectedTopic}
              onSelectTopic={setSelectedTopic}
            />

            {/* Quick Author Card in Sidebar */}
            <div className="mt-8 pt-6 border-t border-neutral-200 space-y-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                AUTHOR
              </span>
              <div className="text-xs text-neutral-600 leading-relaxed">
                <p className="font-semibold text-neutral-950">Jay Patrick Cano</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Full-Stack Engineer & Open-Source Maintainer</p>
              </div>
              <Link
                href="/#contact"
                className="inline-block text-[11px] font-mono font-medium text-neutral-900 hover:underline"
              >
                Get in touch →
              </Link>
            </div>
          </div>

          {/* Main Articles Listing */}
          <div className="space-y-8">
            {/* Articles Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                  Latest Articles
                </h2>
                <span className="rounded-xs border border-neutral-200 bg-neutral-50 px-2 py-0.5 font-mono text-[10.5px] font-semibold text-neutral-600">
                  {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
                </span>
              </div>

              {isFilterActive && (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-neutral-500">
                    Active filters:
                  </span>
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-1 rounded-xs border border-neutral-200 bg-neutral-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 cursor-pointer"
                  >
                    <span>Reset</span>
                    <X className="size-2.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Clean 3-Column Articles Grid */}
            {paginatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
                {paginatedPosts.map((post) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <EditorialCard post={post} />
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Empty Search / Filter State */
              <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-neutral-200 rounded-sm p-8">
                <Search className="size-8 text-neutral-400 mb-3" />
                <h3 className="text-base font-semibold text-neutral-950">No articles found</h3>
                <p className="text-xs text-neutral-500 max-w-sm mt-1 leading-relaxed">
                  We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo;. Try another keyword or clear your filters.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-5 rounded-sm bg-neutral-950 px-4 py-2 font-mono text-xs font-semibold text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8 border-t border-neutral-200 font-mono">
                {/* Previous Button */}
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="flex size-8 items-center justify-center rounded-sm border border-neutral-200 bg-white hover:border-neutral-950 hover:bg-neutral-50 disabled:opacity-30 disabled:pointer-events-none text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="size-4" />
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const isActive = currentPage === page;
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "flex size-8 items-center justify-center rounded-sm border text-xs font-semibold transition-colors cursor-pointer",
                        isActive
                          ? "border-neutral-950 bg-neutral-950 text-white font-bold"
                          : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400 hover:text-neutral-950"
                      )}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="flex size-8 items-center justify-center rounded-sm border border-neutral-200 bg-white hover:border-neutral-950 hover:bg-neutral-50 disabled:opacity-30 disabled:pointer-events-none text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Minimalist Editorial Footer */}
      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
            >
              <ArrowLeft className="size-3" />
              <span>Back to Portfolio</span>
            </Link>
            <span className="text-neutral-300">|</span>
            <Link
              href="/sitemap.xml"
              className="font-mono text-xs text-neutral-400 hover:text-neutral-950 transition-colors"
            >
              Sitemap
            </Link>
          </div>

          <div className="text-center sm:text-right font-mono text-[11px] text-neutral-400">
            <span>© {new Date().getFullYear()} Jay Patrick Cano (0xp47). Built with Next.js.</span>
          </div>
        </div>
      </footer>

      {/* Back to Top Floating Button */}
      <ScrollToTop show={showBackToTop} onClick={handleScrollToTop} />
    </div>
  );
}
