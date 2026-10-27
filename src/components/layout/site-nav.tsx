"use client";

import { motion } from "framer-motion";
import {
  Home,
  User,
  Layers,
  FolderCode,
  BookOpen,
  Briefcase,
  Award,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/portfolio-data";

interface SiteNavProps {
  activeSection: string;
  onNavItemClick: (href: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  "#about": User,
  "#services": Layers,
  "#projects": FolderCode,
  "#blog": BookOpen,
  "#experience": Briefcase,
  "#certifications": Award,
  "#contact": Mail,
};

export function SiteNav({ activeSection, onNavItemClick }: SiteNavProps) {
  const isTopActive = activeSection === "" || activeSection === "top" || activeSection === "hero";

  return (
    <aside
      aria-label="Site navigation"
      className="fixed z-40 bottom-4 left-1/2 -translate-x-1/2 md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 flex items-center justify-center pointer-events-none"
    >
      <motion.nav
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        aria-label="Main navigation"
        className="pointer-events-auto flex flex-row md:flex-col items-center gap-1 sm:gap-1.5 rounded-full bg-background/80 p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.3)] ring-1 ring-border backdrop-blur-xl max-w-[calc(100vw-2rem)]"
      >
        {/* Home / Top Icon */}
        <div className="relative group">
          {isTopActive && (
            <motion.div
              layoutId="activeNavPill"
              className="absolute inset-0 rounded-full bg-foreground shadow-sm"
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            />
          )}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavItemClick("#");
            }}
            aria-label="Home / Back to top"
            aria-current={isTopActive ? "page" : undefined}
            className={cn(
              "relative z-10 flex size-8 sm:size-8.5 items-center justify-center rounded-full transition-colors duration-200",
              isTopActive
                ? "text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/10"
            )}
          >
            <Home className="size-4" strokeWidth={1.8} />
          </a>

          {/* Desktop Tooltip */}
          <span
            role="tooltip"
            className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden md:flex items-center rounded-md bg-background/90 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-foreground shadow-[0_8px_24px_rgba(0,0,0,0.2)] ring-1 ring-border backdrop-blur-xl opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 z-50 whitespace-nowrap"
          >
            Home
          </span>
        </div>

        {/* Subtle divider: vertical on mobile horizontal bar, horizontal on desktop vertical bar */}
        <span
          className="h-4 w-px md:h-px md:w-4 bg-border/40 my-0 mx-1 md:my-0.5 md:mx-0 shrink-0"
          aria-hidden="true"
        />

        {/* Section Icons */}
        {navItems.map((item) => {
          const sectionId = item.href.replace("#", "");
          const isActive = activeSection === sectionId;
          const Icon = iconMap[item.href] || User;

          return (
            <div key={item.href} className="relative group">
              {isActive && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 rounded-full bg-foreground shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <a
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                onClick={(e) => {
                  e.preventDefault();
                  onNavItemClick(item.href);
                }}
                className={cn(
                  "relative z-10 flex size-8 sm:size-8.5 items-center justify-center rounded-full transition-colors duration-200",
                  isActive
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/10"
                )}
              >
                <Icon className="size-4" strokeWidth={1.8} />
              </a>

              {/* Desktop Tooltip */}
              <span
                role="tooltip"
                className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden md:flex items-center rounded-md bg-background/90 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-foreground shadow-[0_8px_24px_rgba(0,0,0,0.2)] ring-1 ring-border backdrop-blur-xl opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 z-50 whitespace-nowrap"
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </motion.nav>
    </aside>
  );
}
