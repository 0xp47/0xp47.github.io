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
      className="fixed bottom-6 left-6 z-40 flex size-10 cursor-pointer items-center justify-center rounded-full bg-background/70 text-muted-foreground shadow-[0_16px_48px_rgba(0,0,0,0.25)] ring-1 ring-border backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background"
    >
      {/* Sun in dark mode (click to go light) / Moon in light mode — pure CSS swap, no hydration mismatch */}
      <Sun className="size-4 hidden dark:block" />
      <Moon className="size-4 dark:hidden" />
    </button>
  );
}

