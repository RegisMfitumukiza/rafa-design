"use client";

import { cn } from "@/lib/cn";

interface TagsProps {
  tags: readonly string[];
  activeTag?: string;
  onTagClick?: (tag: string) => void;
  className?: string;
}

export function Tags({ tags, activeTag, onTagClick, className }: TagsProps) {
  return (
    <div className={cn("gap-sm flex flex-wrap", className)}>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onTagClick?.(tag)}
          className={cn(
            "px-sm py-xs motion-safe:duration-base rounded-full text-xs font-medium tracking-wide uppercase transition-colors",
            tag === activeTag
              ? "bg-accent text-background"
              : "bg-muted text-foreground hover:bg-muted/80",
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
