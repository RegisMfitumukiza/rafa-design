"use client";

import { cn } from "@/lib/cn";

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
  className?: string;
}

export function ViewToggle({ view, onViewChange, className }: ViewToggleProps) {
  return (
    <div
      className={cn("gap-x-md flex items-center", className)}
      role="group"
      aria-label="View mode toggle"
    >
      <button
        type="button"
        onClick={() => onViewChange("grid")}
        className={cn(
          "font-mono text-xs tracking-wider uppercase transition-colors",
          view === "grid"
            ? "text-foreground underline decoration-1 underline-offset-4"
            : "text-foreground/40 hover:text-foreground/70",
        )}
        aria-pressed={view === "grid"}
        aria-label="Grid view"
      >
        Grid
      </button>
      <span className="text-foreground/30 text-xs">·</span>
      <button
        type="button"
        onClick={() => onViewChange("list")}
        className={cn(
          "font-mono text-xs tracking-wider uppercase transition-colors",
          view === "list"
            ? "text-foreground underline decoration-1 underline-offset-4"
            : "text-foreground/40 hover:text-foreground/70",
        )}
        aria-pressed={view === "list"}
        aria-label="List view"
      >
        List
      </button>
    </div>
  );
}
