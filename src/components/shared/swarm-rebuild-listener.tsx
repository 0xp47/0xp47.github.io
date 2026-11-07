"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { triggerSwarmRebuild } from "@/lib/swarm-rebuild";

export function SwarmRebuildListener() {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis && typeof window !== "undefined") {
      window.__lenis = lenis;
    }
  }, [lenis]);

  useEffect(() => {
    // 1. Listen for Alt+Shift+S (matching the original extension shortcut)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && (e.key === "S" || e.key === "s" || e.code === "KeyS")) {
        e.preventDefault();
        triggerSwarmRebuild();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // 2. Check for URL parameter ?rebuild=true or ?rebuild=1
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("rebuild") === "true" || params.get("rebuild") === "1") {
        // Remove parameter from URL without reloading
        const url = new URL(window.location.href);
        url.searchParams.delete("rebuild");
        window.history.replaceState({}, "", url.pathname + (url.search ? url.search : "") + url.hash);

        // Small delay to ensure initial paint is ready
        const timer = setTimeout(() => {
          triggerSwarmRebuild();
        }, 300);
        return () => {
          clearTimeout(timer);
          window.removeEventListener("keydown", handleKeyDown);
        };
      }
    } catch {
      // ignore
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
