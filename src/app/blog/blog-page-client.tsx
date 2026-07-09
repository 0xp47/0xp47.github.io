"use client";

import { motion, LayoutGroup } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { useLenis } from "lenis/react";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { blogPosts, sectionMeta } from "@/lib/portfolio-data";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { ViewToggle } from "@/components/shared/view-toggle";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { BlogCard } from "@/components/shared/blog-card";
import { BlogThumbnail } from "@/components/shared/blog-thumbnail";
import { cn } from "@/lib/utils";

export function BlogPageClient() {
  const lenis = useLenis();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const prefersReducedMotion = useSafeReducedMotion();

  // Search and view states
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/75 z-10" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-border/40 bg-black/20 py-2.5 pl-10 pr-10 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/30 focus:outline-none backdrop-blur-sm transition-all duration-300"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground cursor-pointer z-10"
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
            {filteredPosts.map((post, i) => (
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
                    className="group flex flex-col sm:flex-row gap-5 border border-border/10 bg-transparent rounded-xl overflow-hidden hover:border-foreground/20 transition-all duration-500 p-4 items-start sm:items-center justify-between text-left w-full h-full"
                  >
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Date and Reading Time */}
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground/60 uppercase">
                          <Calendar className="size-3" />
                          {post.dateDisplay}
                        </span>
                        <span className="flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground/60 uppercase">
                          <Clock className="size-3" />
                          {post.readingTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-bold text-foreground tracking-tight group-hover:text-foreground/95 transition-colors line-clamp-1">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs leading-relaxed text-neutral-400 line-clamp-2">
                        {post.description}
                      </p>

                      {/* Footer: Tags + Read More */}
                      <div className="flex items-center justify-between border-t border-border/5 pt-3 mt-1.5">
                        <div className="font-mono text-[8px] text-muted-foreground/50 tracking-wider truncate max-w-[70%]">
                          {post.tags.join("  •  ")}
                        </div>
                        <span className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground/65 group-hover:text-foreground transition-colors shrink-0">
                          read
                          <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                        </span>
                      </div>
                    </div>

                    {/* Right Thumbnail Cover */}
                    <div className="size-20 sm:size-24 bg-white border border-border/10 rounded-lg overflow-hidden shrink-0 self-start sm:self-center relative">
                      <BlogThumbnail slug={post.slug} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <Search className="size-6 text-muted-foreground/50 mb-3" />
            <h3 className="text-sm font-semibold text-foreground">No articles found</h3>
            <p className="text-xs text-muted-foreground/80 mt-1 max-w-xs leading-relaxed">
              We couldn&apos;t find any blog posts matching your search query.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 rounded-full border border-border/30 bg-black/10 px-5 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer"
            >
              Clear search
            </button>
          </motion.div>
        )}

        {/* Footer Area with Back Link */}
        <footer className="mt-24 pt-8 border-t border-border/10 flex items-center justify-between w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors duration-300 group"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform duration-300" />
            Back to portfolio
          </Link>
          <span className="text-[10px] font-mono text-muted-foreground/30">
            © {new Date().getFullYear()} Jay Patrick Cano
          </span>
        </footer>
      </motion.div>

      {/* Back to Top button */}
      <ScrollToTop show={showBackToTop} onClick={handleScrollToTop} />
    </main>
  );
}
