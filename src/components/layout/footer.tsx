"use client";

import { useLenis } from "lenis/react";
import { profile, navItems } from "@/lib/portfolio-data";

export function Footer() {
  const lenis = useLenis();

  const scrollToSection = (href: string) => (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (href === "#") {
      lenis?.scrollTo(0, { offset: 0, duration: 1.2 });
      return;
    }
    const element = document.getElementById(href.replace("#", ""));
    if (element) lenis?.scrollTo(element, { offset: -80, duration: 1.2 });
  };

  return (
    <footer className="mx-auto w-full max-w-[1120px] px-6 pb-24 md:pb-12 sm:px-8 lg:px-10">
      <div className="h-px bg-border" />

      <div className="flex flex-col gap-8 pt-8 sm:flex-row sm:items-start sm:justify-between">
        {/* Identity */}
        <div className="space-y-2">
          <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-foreground">
            {profile.name}
          </p>
          <p className="text-[11px] text-muted-foreground/60">
            Full-Stack Engineer &amp; Entrepreneur — Maasin City, PH
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="inline-block text-[11px] text-muted-foreground/60 transition-colors duration-300 hover:text-foreground"
          >
            {profile.email}
          </a>
        </div>

        {/* Quick links (plain text, no boxes) */}
        <nav aria-label="Footer navigation" className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={scrollToSection(item.href)}
              className="text-[11px] text-muted-foreground/55 transition-colors duration-300 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-10 flex flex-col gap-2 text-[10px] font-mono text-muted-foreground/35 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Built with Next.js — open source on GitHub</p>
      </div>
    </footer>
  );
}
