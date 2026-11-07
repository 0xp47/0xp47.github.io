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
          "size-7 chamfer-btn transition duration-200 cursor-pointer flex items-center justify-center border",
          viewMode === "list"
            ? "border-white bg-white text-black font-semibold"
            : "border-neutral-800 bg-[#040404] text-neutral-400 hover:border-neutral-700 hover:text-white hover:bg-[#0a0a0a]"
        )}
        aria-label="List View"
      >
        <List className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onViewModeChange("grid")}
        className={cn(
          "size-7 chamfer-btn transition duration-200 cursor-pointer flex items-center justify-center border",
          viewMode === "grid"
            ? "border-white bg-white text-black font-semibold"
            : "border-neutral-800 bg-[#040404] text-neutral-400 hover:border-neutral-700 hover:text-white hover:bg-[#0a0a0a]"
        )}
        aria-label="Grid View"
      >
        <LayoutGrid className="size-3.5" />
      </button>
    </div>
  );
}
