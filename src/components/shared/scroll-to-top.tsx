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
      className="fixed bottom-6 right-6 z-40 flex size-9 items-center justify-center chamfer-btn border border-neutral-800 bg-[#040404]/90 text-neutral-400 shadow-[0_16px_48px_rgba(0,0,0,0.5)] backdrop-blur-xl transition hover:border-neutral-700 hover:text-white hover:bg-[#0a0a0a] cursor-pointer"
    >
      <ArrowUp className="size-4" />
    </motion.button>
  );
}
