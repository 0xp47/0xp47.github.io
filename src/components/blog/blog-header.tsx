"use client";

import Link from "next/link";
import { ArrowLeft, Search, X, Menu } from "lucide-react";
import { useState } from "react";

interface BlogHeaderProps {
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  showSearch?: boolean;
}

export function BlogHeader({
  searchQuery = "",
  setSearchQuery,
  showSearch = true,
}: BlogHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/90 bg-white/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Brand & Navigation */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-neutral-900 transition-colors"
            title="Return to main portfolio"
          >
            <span className="flex size-6 items-center justify-center rounded-sm border border-neutral-300 bg-neutral-50 text-neutral-600 transition-all group-hover:border-neutral-900 group-hover:bg-black group-hover:text-white">
              <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-bold tracking-tight text-neutral-950 text-sm sm:text-base">
                0XP47
              </span>
              <span className="text-neutral-300">/</span>
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                BLOG
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 pl-2 border-l border-neutral-200 text-xs font-medium text-neutral-600">
            <Link
              href="/blog#articles"
              className="hover:text-neutral-950 transition-colors"
            >
              Articles
            </Link>
            <Link
              href="/blog#topics"
              className="hover:text-neutral-950 transition-colors"
            >
              Topics
            </Link>
            <Link
              href="/#projects"
              className="hover:text-neutral-950 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/#about"
              className="hover:text-neutral-950 transition-colors"
            >
              About
            </Link>
          </nav>
        </div>

        {/* Right: Search Bar & Actions */}
        <div className="flex items-center gap-3">
          {showSearch && setSearchQuery && (
            <div className="relative w-44 sm:w-64">
              <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-sm border border-neutral-200 bg-neutral-50/70 py-1.5 pl-9 pr-8 text-xs text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-neutral-900 focus:bg-white focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-950 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
          )}

          {/* Portfolio Back Button on Slug pages or compact mode */}
          {!showSearch && (
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-sm border border-neutral-200 bg-neutral-50 px-3 py-1.5 font-mono text-xs font-medium text-neutral-700 hover:border-neutral-900 hover:bg-black hover:text-white transition-colors"
            >
              <ArrowLeft className="size-3" />
              All Articles
            </Link>
          )}

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex size-8 items-center justify-center rounded-sm border border-neutral-200 bg-neutral-50 text-neutral-700 hover:text-neutral-950 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-3 space-y-2 text-xs font-medium text-neutral-700">
          <Link
            href="/blog#articles"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-neutral-950"
          >
            Articles
          </Link>
          <Link
            href="/blog#topics"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-neutral-950"
          >
            Topics
          </Link>
          <Link
            href="/#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-neutral-950"
          >
            Projects
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-neutral-950"
          >
            About
          </Link>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 font-semibold text-neutral-950 border-t border-neutral-100 pt-2"
          >
            ← Main Portfolio
          </Link>
        </div>
      )}
    </header>
  );
}
