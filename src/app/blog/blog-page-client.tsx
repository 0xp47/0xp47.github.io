"use client";

import { motion, LayoutGroup } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from "react";
import { useLenis } from "lenis/react";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { blogPosts, type BlogPost } from "@/lib/portfolio-data";
import { ViewToggle } from "@/components/shared/view-toggle";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { BlogCard } from "@/components/shared/blog-card";
import { BlogThumbnail } from "@/components/shared/blog-thumbnail";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 9;

export function BlogPageClient() {
  const lenis = useLenis();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const prefersReducedMotion = useSafeReducedMotion();

  // Search and view states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Derive unique categories and article counts dynamically
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { All: blogPosts.length };
    blogPosts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });

    const categoryList = Object.keys(counts).filter((cat) => cat !== "All").sort();
    return ["All", ...categoryList].map((cat) => ({
      name: cat,
      count: counts[cat],
    }));
  }, []);

  // Sorted list of all posts (newest first)
  const sortedPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  }, []);

  // Top featured post for editorial showcase
  const featuredPost: BlogPost = sortedPosts[0];

  // Filter logic
  const filteredPosts = useMemo(() => {
    let result = sortedPosts;

    if (selectedCategory !== "All") {
      result = result.filter((post) => post.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [sortedPosts, selectedCategory, searchQuery]);

  // Determine if featured banner should be shown:
  // Only show when there is no search query and category is "All", and page is 1
  const showFeaturedHero = !searchQuery.trim() && selectedCategory === "All" && currentPage === 1;

  // List of posts to paginate (if hero is displayed, we can either include or exclude the featured post, or show all)
  const postsForGrid = filteredPosts;

  const totalPages = Math.ceil(postsForGrid.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return postsForGrid.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [postsForGrid, currentPage]);

  const handleScrollToTop = () => {
    lenis?.scrollTo(0, { offset: 0, duration: 1.2 });
  };

  // Reset page when search or category changes during render
  const [prevFilter, setPrevFilter] = useState({ query: searchQuery, category: selectedCategory });
  if (prevFilter.query !== searchQuery || prevFilter.category !== selectedCategory) {
    setPrevFilter({ query: searchQuery, category: selectedCategory });
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
    <main className="relative isolate min-h-screen bg-background text-foreground">
      {/* Background Ambience: Subtle technical grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:32px_32px]"
        aria-hidden="true"
      />

      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand mark */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
          >
            <div className="flex size-6 items-center justify-center chamfer-btn border border-neutral-800 bg-[#121212] font-mono text-[10px] font-bold text-white group-hover:border-neutral-600">
              P
            </div>
            <span className="font-semibold text-white">0xp47</span>
            <span className="text-neutral-600">{"//"}</span>
            <span className="text-neutral-400 font-normal">Journal</span>
          </Link>

          {/* Right Action: Back to portfolio */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 chamfer-btn border border-neutral-800 bg-[#0a0a0a] px-3 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-neutral-300 hover:border-neutral-600 hover:bg-[#141416] hover:text-white transition-all duration-200"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">Back to Portfolio</span>
              <span className="sm:hidden">Portfolio</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Editorial Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-12 sm:mb-16 border-b border-neutral-800/80 pb-10 sm:pb-12"
        >
          {/* Eyebrow Label with Reticle */}
          <div className="flex items-center gap-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
            <span className="flex size-4 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-[8px] text-neutral-300">
              ◈
            </span>
            <span>[ SECT 04 — EDITORIAL LOGS ]</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-500 font-normal">ARCHIVES & ARTICLES</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance max-w-4xl">
            Systems, Architecture & Developer Craft
          </h1>

          {/* Subtitle Description */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl text-pretty font-light">
            Technical deep-dives, architectural postmortems, and lessons learned building software, mobile apps, and open-source communities.
          </p>

          {/* Live Metrics Row */}
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
            <span className="inline-flex items-center gap-1.5 chamfer-btn border border-neutral-800 bg-[#0e0e10] px-2.5 py-1 text-neutral-300">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {blogPosts.length} Articles
            </span>
            <span className="inline-flex items-center gap-1.5 chamfer-btn border border-neutral-800 bg-[#0e0e10] px-2.5 py-1 text-neutral-400">
              {categoriesWithCounts.length - 1} Domains
            </span>
            <span className="inline-flex items-center gap-1.5 chamfer-btn border border-neutral-800 bg-[#0e0e10] px-2.5 py-1 text-neutral-400">
              Author: Jay Patrick Cano
            </span>
          </div>
        </motion.div>

        {/* Featured Post Editorial Hero Card (When on All & No Search) */}
        {showFeaturedHero && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            <div className="flex items-center gap-2 mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              <Sparkles className="size-3 text-amber-400" />
              <span>Spotlight Feature</span>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-xl border border-neutral-800/90 bg-[#0a0a0a] transition-all duration-300 hover:border-neutral-600 hover:shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
            >
              {/* Left Column: Visual Cover */}
              <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[360px] overflow-hidden bg-[#101012] border-b lg:border-b-0 lg:border-r border-neutral-800/80">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/60" />

                <div className="absolute left-4 top-4 z-10">
                  <span className="inline-flex items-center px-2.5 py-1 chamfer-btn border border-neutral-800 bg-[#0a0a0acc] backdrop-blur-md font-mono text-[9.5px] font-bold uppercase tracking-wider text-white shadow-md">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              {/* Right Column: Editorial Copy */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3 text-neutral-500" />
                      {featuredPost.dateDisplay}
                    </span>
                    <span className="text-neutral-700">·</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3 text-neutral-500" />
                      {featuredPost.readingTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white tracking-tight leading-snug group-hover:text-neutral-200 transition-colors text-balance">
                    {featuredPost.title}
                  </h2>

                  <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed text-pretty">
                    {featuredPost.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-800/60 flex items-center justify-between">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 truncate max-w-[65%]">
                    {featuredPost.tags.slice(0, 3).join("  ·  ")}
                  </div>
                  <span className="inline-flex items-center gap-2 chamfer-btn border border-neutral-700 bg-white px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-black transition-colors group-hover:bg-neutral-200">
                    <span>Read Article</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Filter Controls Row (Category Pills + Search + View Switcher) */}
        <div className="mb-8 space-y-4">
          {/* Category Tabs (Horizontally scrollable with smooth styling) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categoriesWithCounts.map((category) => {
              const isSelected = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setSelectedCategory(category.name)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 chamfer-btn border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none",
                    isSelected
                      ? "border-white bg-white text-black shadow-sm"
                      : "border-neutral-800 bg-[#0a0a0a] text-neutral-400 hover:border-neutral-700 hover:text-white"
                  )}
                >
                  <span>{category.name}</span>
                  <span
                    className={cn(
                      "text-[9px] opacity-70",
                      isSelected ? "text-neutral-700 font-bold" : "text-neutral-500"
                    )}
                  >
                    ({category.count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar & Grid/List View Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            {/* Search Input */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles by title, keywords, or tags…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-[#0a0a0a] py-2 pl-10 pr-10 font-mono text-xs text-white placeholder:text-neutral-500 focus:border-neutral-600 focus:outline-none transition-colors duration-200"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-500 hover:text-white cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>

            {/* Results Counter & View Switcher */}
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                Showing {filteredPosts.length} of {blogPosts.length}
              </span>
              <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
          </div>
        </div>

        {/* Dynamic Articles Listing */}
        <LayoutGroup>
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              "mt-6",
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4 max-w-4xl mx-auto"
            )}
          >
            {paginatedPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: "easeOut" }}
                className="h-full"
              >
                {viewMode === "grid" ? (
                  /* 3-Column Grid Card View */
                  <BlogCard post={post} priority={i < 3} />
                ) : (
                  /* List View Row (Refined Editorial Strip) */
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-xl border border-neutral-800/80 bg-[#0a0a0a] p-4 sm:p-5 items-start sm:items-center justify-between text-left w-full transition-all duration-200 hover:border-neutral-600 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] select-none"
                  >
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-2 py-0.5 chamfer-btn border border-neutral-800 bg-[#121212] font-mono text-[8.5px] font-bold uppercase tracking-wider text-neutral-300">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-[9.5px] font-mono text-neutral-400 uppercase tracking-wider">
                          <Calendar className="size-3 text-neutral-500" />
                          {post.dateDisplay}
                        </span>
                        <span className="text-neutral-700">·</span>
                        <span className="flex items-center gap-1.5 text-[9.5px] font-mono text-neutral-400 uppercase tracking-wider">
                          <Clock className="size-3 text-neutral-500" />
                          {post.readingTime}
                        </span>
                      </div>

                      <h3 className="text-[16px] font-semibold text-white tracking-tight line-clamp-1 group-hover:text-neutral-200 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-xs leading-relaxed text-neutral-400 line-clamp-2">
                        {post.description}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 truncate max-w-[70%]">
                          {post.tags.slice(0, 3).join("  ·  ")}
                        </div>
                        <span className="flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors shrink-0">
                          Read
                          <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </span>
                      </div>
                    </div>

                    {/* Right Thumbnail Cover */}
                    <div className="w-full sm:w-36 h-28 shrink-0 rounded-lg overflow-hidden border border-neutral-800/80 bg-[#121212]">
                      <BlogThumbnail
                        slug={post.slug}
                        aspectRatio="aspect-auto h-full w-full"
                        className="size-full object-cover rounded-none border-none"
                      />
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed border-neutral-800/80 bg-[#0a0a0a]/50 p-8 my-8"
          >
            <div className="flex size-12 items-center justify-center rounded-full border border-neutral-800 bg-[#121212] mb-3">
              <Search className="size-5 text-neutral-400" />
            </div>
            <h3 className="text-sm font-semibold text-white">No articles found</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm leading-relaxed">
              We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo; in {selectedCategory}.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-5 chamfer-btn border border-neutral-800 bg-[#121212] px-5 py-2 text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Reset all filters
            </button>
          </motion.div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14 pt-8 border-t border-neutral-800/80 font-mono">
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

        {/* Footer Area with Back Link */}
        <footer className="mt-20 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to portfolio
          </Link>
          <span className="text-[10px] font-mono text-neutral-600">
            © {new Date().getFullYear()} Jay Patrick Cano (0xp47). All rights reserved.
          </span>
        </footer>
      </div>

      {/* Back to Top button */}
      <ScrollToTop show={showBackToTop} onClick={handleScrollToTop} />
    </main>
  );
}
