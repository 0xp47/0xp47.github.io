"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { SwarmRebuildListener } from "@/components/shared/swarm-rebuild-listener";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

function LenisBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || typeof window === "undefined") return;
    window.__lenis = lenis;
    return () => {
      if (window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, [lenis]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: prefersReducedMotion ? 1 : 0.085,
        duration: prefersReducedMotion ? 0 : 1.25,
        smoothWheel: !prefersReducedMotion,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        syncTouch: false,
      }}
    >
      <LenisBridge />
      <SwarmRebuildListener />
      {children}
    </ReactLenis>
  );
}
