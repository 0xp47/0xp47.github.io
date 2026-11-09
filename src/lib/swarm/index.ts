import { App } from "./app";
import { captureModel } from "./capture";
import { KEY } from "./constants";
import { detectEnv } from "./env";
import type { AppOptions, SwarmRebuildInstance } from "./types";

declare global {
  interface Window {
    __swarmRebuild?: SwarmRebuildInstance;
  }
}

let appInstance: App | null = null;

function notifySwarmState(active: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(
      new CustomEvent("swarm-rebuild-state", { detail: { active } })
    );
  } catch {
    // ignore
  }
}

export function isSwarmRebuildActive(): boolean {
  return appInstance !== null;
}

export function startSwarmRebuild(opts: AppOptions = {}): void {
  if (typeof window === "undefined") return;
  if (appInstance) return;

  if (!opts.preserveScroll) {
    try {
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    } catch {}
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  const app = new App(opts);
  app.onStop = (reveal) => stopSwarmRebuild(reveal);
  app.onRestart = (nextOpts) => restartSwarmRebuild(nextOpts);
  appInstance = app;
  notifySwarmState(true);

  app.run().catch((err) => console.error("[swarm-rebuild]", err));
}

export function stopSwarmRebuild(reveal?: boolean): void {
  if (!appInstance) return;
  const a = appInstance;
  appInstance = null;
  notifySwarmState(false);
  a.destroy(reveal);
}

export function restartSwarmRebuild(opts: AppOptions = {}): void {
  if (appInstance) {
    const a = appInstance;
    const keepMusic = opts.musicPlaying ?? a.musicPlaying;
    if (!keepMusic) {
      try {
        a.sendYt("stopVideo");
      } catch {}
    }
    appInstance = null;
    a.dead = true;
    cancelAnimationFrame(a.raf);
    for (const u of a.unbinds) u();
    a.view.host.remove();
    if (!opts.preserveScroll) {
      try {
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
      } catch {}
      a.env.scrollTo(0, 0);
    }
  }
  startSwarmRebuild(opts);
}

export function toggleSwarmRebuild(opts: AppOptions = {}): void {
  if (appInstance) {
    stopSwarmRebuild(false);
  } else {
    startSwarmRebuild(opts);
  }
}

export function triggerSwarmRebuild(opts: AppOptions = {}): void {
  toggleSwarmRebuild(opts);
}

// Bind to window for backwards compatibility and console debugging
if (typeof window !== "undefined") {
  const instance: SwarmRebuildInstance = {
    toggle: toggleSwarmRebuild,
    start: startSwarmRebuild,
    stop: stopSwarmRebuild,
    restart: restartSwarmRebuild,
    get app() {
      return appInstance;
    },
    debug: { captureModel, detectEnv },
  };
  window[KEY] = instance;
  window.__swarmRebuild = instance;
}

export * from "./types";
export { App } from "./app";
export { Engine } from "./engine";
export { View } from "./view";
export { captureModel } from "./capture";
export { detectEnv } from "./env";
