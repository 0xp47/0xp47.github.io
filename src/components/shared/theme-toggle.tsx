"use client";

import { useCallback, useEffect, useRef } from "react";
import { Sun, Moon } from "lucide-react";

const THEME_KEY = "0xp47-theme";

export function ThemeToggle() {
  const releaseTimer = useRef<number | null>(null);

  // Reliably end the instant-switch window even when the tab is backgrounded.
  useEffect(() => () => {
    if (releaseTimer.current !== null) window.clearTimeout(releaseTimer.current);
  }, []);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");

    // Freeze ALL transitions for this frame group: text, cards, buttons,
    // backgrounds, borders — everything flips at once, no fade.
    root.classList.add("theme-switching");
    if (releaseTimer.current !== null) window.clearTimeout(releaseTimer.current);
    releaseTimer.current = window.setTimeout(() => {
      root.classList.remove("theme-switching");
      releaseTimer.current = null;
    }, 140);

    root.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // private mode etc. — theme still applies for the session
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className="group fixed top-4 right-4 sm:top-5 sm:right-5 md:top-auto md:bottom-6 md:left-6 z-[2147483646] flex size-8.5 sm:size-9 cursor-pointer items-center justify-center chamfer-btn border border-neutral-300 bg-white/90 text-neutral-700 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 hover:border-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#040404]/90 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white dark:hover:bg-[#0a0a0a] dark:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
    >
      {/* Sun in dark mode (click to go light) / Moon in light mode — pure CSS swap, no hydration mismatch */}
      <Sun className="size-4 hidden dark:block transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
      <Moon className="size-4 dark:hidden transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
    </button>
  );
}
