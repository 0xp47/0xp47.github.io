"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { frame, cancelFrame } from "framer-motion";
import { SwarmRebuildListener } from "@/components/shared/swarm-rebuild-listener";

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
  const lenisRef = useRef<LenisRef>(null);

  // Drive Lenis directly from Framer Motion's unified frame loop so scroll
  // interpolation and scroll-linked transforms execute in the exact same frame.
  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={false}
      options={{
        // Pure exponential damping (lerp without duration) ensures silky-smooth
        // velocity blending and instant, natural reversal when scrolling down & up.
        lerp: 0.06,
        smoothWheel: true,
        wheelMultiplier: 0.88,
        touchMultiplier: 1.15,
        syncTouch: false,
        overscroll: true,
        respectReducedMotion: false,
      }}
    >
      <LenisBridge />
      <SwarmRebuildListener />
      {children}
    </ReactLenis>
  );
}
