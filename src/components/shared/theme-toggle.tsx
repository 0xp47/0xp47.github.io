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
      // private mode fallback
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className="fixed top-4 right-4 sm:top-5 sm:right-5 md:top-auto md:bottom-6 md:left-6 z-40 flex size-9 sm:size-10 cursor-pointer items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-md ring-1 ring-border/80 backdrop-blur-xl transition-all duration-200 hover:bg-foreground hover:text-background focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-hidden"
    >
      {/* Sun in dark mode / Moon in light mode */}
      <Sun className="size-4 hidden dark:block" />
      <Moon className="size-4 dark:hidden" />
    </button>
  );
}
