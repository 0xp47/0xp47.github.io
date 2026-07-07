"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/portfolio-data";

interface SiteNavProps {
  activeSection: string;
  onNavItemClick: (href: string) => void;
}

export function SiteNav({ activeSection, onNavItemClick }: SiteNavProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-40 flex justify-center"
    >
      <div className="flex h-11 items-center gap-2 sm:gap-4 rounded-full border border-border/40 bg-background/80 px-2 sm:pl-2 sm:pr-4 shadow-[0_12px_40px_rgba(0,0,0,0.3)] backdrop-blur-md">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavItemClick("#");
          }}
          className="hidden sm:flex size-7 items-center justify-center rounded-full border border-border bg-card font-mono text-[10px] font-bold text-foreground transition-all duration-300 hover:border-foreground/30"
          aria-label="Scroll to top"
        >
          0x
        </a>
        
        <span className="hidden sm:block h-4 w-px bg-border/40" aria-hidden="true" />

        <nav className="flex items-center gap-0.5 min-[380px]:gap-1 sm:gap-1.5" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onNavItemClick(item.href);
                }}
                className={cn(
                  "group relative rounded-full px-1.5 min-[380px]:px-2 sm:px-2.5 py-1 text-[10px] min-[380px]:text-[11px] sm:text-xs text-muted-foreground transition duration-300 hover:text-foreground",
                  isActive && "text-foreground",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-1.5 min-[380px]:inset-x-2 sm:inset-x-2.5 bottom-0 h-px origin-left scale-x-0 bg-foreground transition-transform duration-300 group-hover:scale-x-100",
                    isActive && "scale-x-100",
                  )}
                />
              </a>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
