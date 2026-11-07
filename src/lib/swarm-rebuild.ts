"use client";

import type { AppOptions, SwarmRebuildInstance } from "./swarm/types";

declare global {
  interface Window {
    __swarmRebuild?: SwarmRebuildInstance;
    __lenis?: {
      scrollTo: (
        target: number | HTMLElement | string,
        options?: { immediate?: boolean; offset?: number; duration?: number }
      ) => void;
    };
  }
}

/**
 * Triggers the Swarm Rebuild animation on the current page.
 * Resets scroll position to the first page (top) so the rebuild starts from the beginning.
 * Dynamically imports the TypeScript swarm module and executes it.
 */
export async function triggerSwarmRebuild(opts?: AppOptions): Promise<void> {
  if (typeof window === "undefined") return;

  // Always reset scroll to the first page (top of page: 0, 0)
  try {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  } catch {
    // ignore
  }
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  if (window.location.hash) {
    try {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    } catch {
      // ignore
    }
  }

  const { toggleSwarmRebuild } = await import("./swarm");
  toggleSwarmRebuild(opts);
}

export {
  startSwarmRebuild,
  stopSwarmRebuild,
  restartSwarmRebuild,
  toggleSwarmRebuild,
} from "./swarm";
