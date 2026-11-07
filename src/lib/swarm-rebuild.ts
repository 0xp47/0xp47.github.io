"use client";

interface SwarmRebuildInstance {
  toggle: () => void;
  start: () => void;
  stop: (reveal?: boolean) => void;
  app: unknown;
}

declare global {
  interface Window {
    __swarmRebuild?: SwarmRebuildInstance;
    __lenis?: {
      scrollTo: (target: number | HTMLElement | string, options?: { immediate?: boolean; offset?: number; duration?: number }) => void;
    };
  }
}

/**
 * Triggers the Swarm Rebuild animation on the current page.
 * Resets scroll position to the first page (top) so the rebuild starts from the beginning.
 * If already loaded, toggles it. If not yet loaded, dynamically injects
 * the script and starts the rebuild immediately.
 */
export function triggerSwarmRebuild() {
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
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    } catch {
      // ignore
    }
  }

  const instance = window.__swarmRebuild;
  if (instance) {
    instance.toggle();
    return;
  }

  const existing = document.querySelector<HTMLScriptElement>('script[data-swarm-script="true"]');
  if (existing) {
    const existingInstance = window.__swarmRebuild;
    if (existingInstance) {
      existingInstance.start();
    }
    return;
  }

  const script = document.createElement("script");
  script.src = "/scripts/swarm-rebuild.js";
  script.setAttribute("data-swarm-script", "true");
  script.async = true;
  document.body.appendChild(script);
}
