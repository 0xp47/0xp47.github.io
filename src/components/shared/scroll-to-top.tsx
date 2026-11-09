"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/animation-variants";

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
      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
      className={cn(
        "group fixed bottom-6 right-6 z-[2147483647] flex size-9 items-center justify-center chamfer-btn border border-neutral-300 bg-white/90 text-neutral-700 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 active:scale-95 hover:border-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#040404]/90 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white dark:hover:bg-[#0a0a0a] dark:shadow-[0_16px_48px_rgba(0,0,0,0.5)] cursor-pointer",
        !show && "pointer-events-none"
      )}
    >
      <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </motion.button>
  );
}
