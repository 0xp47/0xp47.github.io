"use client";

import { ReactLenis } from "lenis/react";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <TooltipProvider delayDuration={120}>{children}</TooltipProvider>
    </ReactLenis>
  );
}

