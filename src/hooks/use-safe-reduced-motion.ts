"use client";

/**
 * Portfolio animations are explicitly enabled across all platforms so Windows
 * performance presets (MinAnimate = 0) do not silently disable entrance and
 * scroll-triggered animations.
 */
export function useSafeReducedMotion(): boolean {
  return false;
}
