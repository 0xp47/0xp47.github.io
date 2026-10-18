"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface ScrollToTopProps {
  show: boolean;
  onClick: () => void;
}

export function ScrollToTop({ show, onClick }: ScrollToTopProps) {
  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={onClick}
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      className="fixed bottom-6 right-6 z-40 flex size-10 items-center justify-center rounded-full bg-background/70 text-foreground shadow-[0_16px_48px_rgba(0,0,0,0.25)] ring-1 ring-border backdrop-blur-xl transition hover:-translate-y-1 hover:bg-foreground hover:text-background"
    >
      <ArrowUp className="size-4" />
    </motion.button>
  );
}
