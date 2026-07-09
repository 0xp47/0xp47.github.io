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
      className="fixed bottom-6 right-6 z-40 flex size-10 items-center justify-center rounded-full border border-border bg-background/85 text-foreground shadow-2xl backdrop-blur transition hover:-translate-y-1 hover:border-foreground/20"
    >
      <ArrowUp className="size-4" />
    </motion.button>
  );
}
