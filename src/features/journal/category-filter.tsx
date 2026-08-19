"use client";

import { useRouter } from "next/navigation";

import type { JournalCategory } from "@/content/journal";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";

interface CategoryFilterProps {
  categories: JournalCategory[];
  active: JournalCategory | null;
  className?: string;
}

const categoryLabels: Record<JournalCategory, string> = {
  news: "News",
  research: "Research",
  awards: "Awards",
  events: "Events",
  ideas: "Ideas",
  publications: "Publications",
};

export function CategoryFilter({ categories, active, className }: CategoryFilterProps) {
  const router = useRouter();

  function select(category: JournalCategory | null) {
    const params = new URLSearchParams();
    if (category) {
      params.set("category", category);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <nav
      className={cn("gap-x-md gap-y-xs flex flex-wrap items-center", className)}
      aria-label="Filter articles by category"
    >
      <button
        type="button"
        onClick={() => select(null)}
        className={cn(
          "font-mono text-xs tracking-wider uppercase transition-colors",
          active === null
            ? "text-foreground underline decoration-1 underline-offset-4"
            : "text-foreground/40 hover:text-foreground/70",
        )}
        aria-pressed={active === null}
        aria-current={active === null ? "page" : undefined}
      >
        {ui.filters.all}
      </button>
      {categories.map((cat) => (
        <span key={cat} className="gap-x-md inline-flex items-center">
          <span className="text-foreground/30 text-xs">·</span>
          <button
            type="button"
            onClick={() => select(cat)}
            className={cn(
              "font-mono text-xs tracking-wider uppercase transition-colors",
              active === cat
                ? "text-foreground underline decoration-1 underline-offset-4"
                : "text-foreground/40 hover:text-foreground/70",
            )}
            aria-pressed={active === cat}
            aria-current={active === cat ? "page" : undefined}
          >
            {categoryLabels[cat]}
          </button>
        </span>
      ))}
    </nav>
  );
}
