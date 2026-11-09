"use client";

import { List, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1.5 w-fit select-none">
      <button
        type="button"
        onClick={() => onViewModeChange("list")}
        className={cn(
          "size-7 chamfer-btn transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center border",
          viewMode === "list"
            ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black font-semibold"
            : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-400 hover:text-black hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#040404] dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white dark:hover:bg-[#0a0a0a]"
        )}
        aria-label="List View"
      >
        <List className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onViewModeChange("grid")}
        className={cn(
          "size-7 chamfer-btn transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center border",
          viewMode === "grid"
            ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black font-semibold"
            : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-400 hover:text-black hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#040404] dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white dark:hover:bg-[#0a0a0a]"
        )}
        aria-label="Grid View"
      >
        <LayoutGrid className="size-3.5" />
      </button>
    </div>
  );
}
