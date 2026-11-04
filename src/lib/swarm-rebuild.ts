"use client";

export interface SwarmRebuildInstance {
  toggle: () => void;
  start: () => void;
  stop: (reveal?: boolean) => void;
  app: unknown;
}

declare global {
  interface Window {
    __swarmRebuild?: SwarmRebuildInstance;
  }
}

/**
 * Triggers the Swarm Rebuild animation on the current page.
 * If already loaded, toggles it. If not yet loaded, dynamically injects
 * the script and starts the rebuild immediately.
 */
export function triggerSwarmRebuild() {
  if (typeof window === "undefined") return;

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

/**
 * Stops an active Swarm Rebuild animation.
 * @param reveal Whether to smoothly fade out and reveal the live page (default: true).
 */
export function stopSwarmRebuild(reveal = true) {
  if (typeof window !== "undefined" && window.__swarmRebuild) {
    window.__swarmRebuild.stop(reveal);
  }
}

/**
 * Returns true if the Swarm Rebuild is currently actively running on the page.
 */
export function isSwarmRebuildActive(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.__swarmRebuild && window.__swarmRebuild.app);
}
