"use client";

import { List, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border/15 bg-black/25 p-0.5 w-fit select-none">
      <button
        type="button"
        onClick={() => onViewModeChange("list")}
        className={cn(
          "rounded-md p-1.5 transition-all duration-300 cursor-pointer flex items-center justify-center",
          viewMode === "list"
            ? "bg-neutral-800 text-foreground"
            : "text-muted-foreground/60 hover:text-foreground"
        )}
        aria-label="List View"
      >
        <List className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onViewModeChange("grid")}
        className={cn(
          "rounded-md p-1.5 transition-all duration-300 cursor-pointer flex items-center justify-center",
          viewMode === "grid"
            ? "bg-neutral-800 text-foreground"
            : "text-muted-foreground/60 hover:text-foreground"
        )}
        aria-label="Grid View"
      >
        <LayoutGrid className="size-3.5" />
      </button>
    </div>
  );
}
