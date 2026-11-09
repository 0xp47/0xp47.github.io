"use client";

import { ReactLenis } from "lenis/react";
import { SwarmRebuildListener } from "@/components/shared/swarm-rebuild-listener";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      <SwarmRebuildListener />
      {children}
    </ReactLenis>
  );
}
