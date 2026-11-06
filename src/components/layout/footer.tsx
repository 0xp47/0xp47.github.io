"use client";

import { useLenis } from "lenis/react";
import { profile, navItems } from "@/lib/portfolio-data";

export function Footer() {
  const lenis = useLenis();

  const scrollToSection = (href: string) => (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (href === "#") {
      lenis?.scrollTo(0, { offset: 0, duration: 0.8 });
      return;
    }
    const element = document.getElementById(href.replace("#", ""));
    if (element) lenis?.scrollTo(element, { offset: -80, duration: 0.8 });
  };

  return (
    <footer className="mx-auto w-full max-w-[1120px] px-6 pb-24 sm:px-8 md:pb-12 lg:px-10">
      <div className="h-px bg-border/80" />

      <div className="flex flex-col gap-8 pt-10 sm:flex-row sm:items-start sm:justify-between">
        {/* Identity & Vercel Brand Indicator */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-sm bg-foreground text-[10px] font-bold text-background select-none">
              ▲
            </span>
            <p className="font-mono text-xs font-bold tracking-[0.2em] text-foreground uppercase">
              {profile.name}
            </p>
          </div>
          <p className="text-xs text-muted-foreground/75 max-w-xs leading-relaxed">
            Full-Stack Engineer &amp; Entrepreneur building resilient web apps, mobile solutions, and autonomous systems.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="inline-block font-mono text-[11px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            {profile.email}
          </a>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
            Navigation
          </span>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={scrollToSection(item.href)}
                className="font-mono text-[11px] text-muted-foreground/70 transition-colors duration-200 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Operational Status Pill */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-foreground/[0.02] px-3 py-1 font-mono text-[10px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
              <span className="text-border">·</span>
              <span className="text-emerald-500 font-semibold">100% Uptime</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-2 border-t border-border/40 pt-6 text-[10px] font-mono text-muted-foreground/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          <span>Engineered on</span>
          <span className="font-semibold text-foreground">Next.js &amp; Vercel</span>
          <span>· Open source on GitHub</span>
        </p>
      </div>
    </footer>
  );
}
