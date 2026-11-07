"use client";

import { motion, LayoutGroup } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo, useRef } from "react";
import { useLenis } from "lenis/react";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { blogPosts, sectionMeta } from "@/lib/portfolio-data";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { ViewToggle } from "@/components/shared/view-toggle";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { BlogCard } from "@/components/shared/blog-card";
import { cn } from "@/lib/utils";

export function BlogPageClient() {
  const lenis = useLenis();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const prefersReducedMotion = useSafeReducedMotion();

  // Search and view states
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 8;

  const handleScrollToTop = () => {
    lenis?.scrollTo(0, { offset: 0, duration: 1.2 });
  };

  // Filter logic
  const filteredPosts = useMemo(() => {
    let result = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [searchQuery]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  }, [filteredPosts]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Reset page when search changes (during render)
  const [prevSearch, setPrevSearch] = useState(searchQuery);

  if (prevSearch !== searchQuery) {
    setPrevSearch(searchQuery);
    setCurrentPage(1);
  }

  // Scroll to top when page changes (skip initial render)
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    lenis?.scrollTo(0, { offset: 0, duration: 800 });
  }, [currentPage, lenis]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background">
      {/* Main Content Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[1120px] px-6 py-12 sm:px-8 sm:py-14 md:py-20 lg:px-10"
      >
        {/* Navigation Header */}
        <PageHeader backHref="/" backLabel="Back to portfolio" rightLabel="Blog Hub" />

        {/* Section Header */}
        <SectionHeader eyebrow={sectionMeta.blog.eyebrow} title={sectionMeta.blog.title} />

        {/* Controls Row (Search and Grid/List Switcher) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Search bar */}
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-500 z-10" />
            <input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-neutral-800 bg-[#0a0a0a] py-2.5 pl-10 pr-10 text-xs text-white placeholder:text-neutral-500 focus:border-neutral-700 focus:outline-none transition-colors duration-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-500 hover:text-white cursor-pointer z-10"
              >
                <X className="size-3" />
              </button>
            )}
          </div>

          {/* Grid/List View Toggle */}
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        {/* Dynamic Layout Listing (Toggles columns layout dynamically) */}
        <LayoutGroup>
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              "grid gap-6 mt-8",
              viewMode === "grid" ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 max-w-3xl mx-auto"
            )}
          >
            {paginatedPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: "easeOut" }}
              >
                {viewMode === "grid" ? (
                  /* Grid Card View (Vertical) */
                  <BlogCard post={post} />
                ) : (
                  /* List Row View (Horizontal) */
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-neutral-800/80 bg-[#0a0a0a] p-4 sm:p-5 text-left w-full transition-all duration-200 hover:border-neutral-700 hover:bg-[#0d0d10] select-none"
                  >
                    <div className="flex-1 min-w-0 space-y-1.5">
                      {/* Category, Date and Reading Time */}
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-neutral-800 bg-[#121212] text-neutral-400 group-hover:border-neutral-700 group-hover:text-white transition-colors duration-200">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-[9.5px] font-mono text-neutral-400">
                          <Calendar className="size-3 text-neutral-500" />
                          {post.dateDisplay}
                        </span>
                        <span className="text-neutral-600 font-mono text-[9.5px]">·</span>
                        <span className="flex items-center gap-1.5 text-[9.5px] font-mono text-neutral-500">
                          <Clock className="size-3 text-neutral-500" />
                          {post.readingTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-[15px] font-semibold text-white tracking-tight line-clamp-1 group-hover:text-neutral-200 transition-colors">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs leading-relaxed text-neutral-400 line-clamp-2 sm:line-clamp-1">
                        {post.description}
                      </p>

                      {/* Tags */}
                      <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-500 truncate pt-1">
                        {post.tags.join("  ·  ")}
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors shrink-0 pl-4 border-l border-neutral-800/60">
                      <span>Read</span>
                      <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-neutral-800/80 font-mono">
            {/* Previous Button */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="flex size-8 items-center justify-center chamfer-btn border border-neutral-800 bg-[#0a0a0a] hover:border-neutral-700 disabled:opacity-30 disabled:pointer-events-none text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
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
                    "flex size-8 items-center justify-center chamfer-btn border text-[10px] font-bold transition-colors duration-200 cursor-pointer",
                    isActive
                      ? "border-white bg-white text-black font-semibold"
                      : "border-neutral-800 bg-[#0a0a0a] text-neutral-400 hover:border-neutral-700 hover:text-white"
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
              className="flex size-8 items-center justify-center chamfer-btn border border-neutral-800 bg-[#0a0a0a] hover:border-neutral-700 disabled:opacity-30 disabled:pointer-events-none text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <Search className="size-6 text-neutral-500 mb-3" />
            <h3 className="text-sm font-semibold text-white">No articles found</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-xs leading-relaxed">
              We couldn&apos;t find any blog posts matching your search query.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 chamfer-btn border border-neutral-800 bg-[#0a0a0a] px-5 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Clear search
            </button>
          </motion.div>
        )}

        {/* Footer Area with Back Link */}
        <footer className="mt-24 pt-8 border-t border-neutral-800/80 flex items-center justify-between w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to portfolio
          </Link>
          <span className="text-[10px] font-mono text-neutral-600">
            © {new Date().getFullYear()} Jay Patrick Cano
          </span>
        </footer>
      </motion.div>

      {/* Back to Top button */}
      <ScrollToTop show={showBackToTop} onClick={handleScrollToTop} />
    </main>
  );
}
