"use client";

import { useSyncExternalStore } from "react";
import { isSwarmRebuildActive } from "@/lib/swarm-rebuild";

function subscribeSwarmState(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("swarm-rebuild-state", callback);
  return () => {
    window.removeEventListener("swarm-rebuild-state", callback);
  };
}

export function useIsSwarmActive(): boolean {
  return useSyncExternalStore(
    subscribeSwarmState,
    () => isSwarmRebuildActive(),
    () => false
  );
}
