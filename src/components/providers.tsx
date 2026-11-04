"use client";

import { ReactLenis } from "lenis/react";
import { SwarmRebuildListener } from "@/components/shared/swarm-rebuild-listener";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <SwarmRebuildListener />
      {children}
    </ReactLenis>
  );
}
