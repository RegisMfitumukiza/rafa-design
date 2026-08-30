"use client";

import { useRouter } from "next/navigation";

import type { JournalCategory } from "@/content/journal";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";

export const CATEGORY_LABELS: Record<JournalCategory, string> = {
  news: "News",
  research: "Research",
  awards: "Awards",
  events: "Events",
  ideas: "Ideas",
  publications: "Publications",
};

interface CategoryFilterProps {
  categories: JournalCategory[];
  active: JournalCategory | null;
  className?: string;
}

/**
 * Standalone category filter nav — used on the journal page.
 * For inline embedding inside a header bar, use CategoryFilterPills directly.
 */
export function CategoryFilter({ categories, active, className }: CategoryFilterProps) {
  return (
    <nav
      className={cn("gap-x-md gap-y-xs flex flex-wrap items-center", className)}
      aria-label="Filter articles by category"
    >
      <CategoryFilterPills categories={categories} active={active} />
    </nav>
  );
}

/**
 * Pure presentational pills — no nav wrapper.
 * Embed inside any container (e.g. JournalIndexHeader).
 */
export function CategoryFilterPills({ categories, active, className }: CategoryFilterProps) {
  const router = useRouter();

  function select(category: JournalCategory | null) {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div
      className={cn("gap-x-md gap-y-xs flex flex-wrap items-center", className)}
      role="group"
      aria-label="Filter articles by category"
    >
      <button
        type="button"
        onClick={() => select(null)}
        className={cn(
          "font-mono text-[10px] tracking-widest uppercase transition-colors",
          active === null
            ? "text-foreground underline decoration-1 underline-offset-4"
            : "text-foreground/40 hover:text-foreground/70",
        )}
        aria-pressed={active === null}
      >
        {ui.filters.all}
      </button>
      {categories.map((cat) => (
        <span key={cat} className="inline-flex items-center gap-2">
          <span className="text-foreground/20 text-[10px]">·</span>
          <button
            type="button"
            onClick={() => select(cat)}
            className={cn(
              "font-mono text-[10px] tracking-widest uppercase transition-colors",
              active === cat
                ? "text-foreground underline decoration-1 underline-offset-4"
                : "text-foreground/40 hover:text-foreground/70",
            )}
            aria-pressed={active === cat}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        </span>
      ))}
    </div>
  );
}
