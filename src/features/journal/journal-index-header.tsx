/**
 * Journal Index Header
 *
 * Single row: H1 title + description (left) / category filter pills (right).
 * On mobile the filters wrap below the title.
 * Separated from article content by a thin border.
 */

import type { JournalCategory } from "@/content/journal";
import { pageContent } from "@/content/pages";
import { CategoryFilterPills } from "@/features/journal/category-filter";
import { Reveal } from "@/motion";

interface JournalIndexHeaderProps {
  categories: JournalCategory[];
  active: JournalCategory | null;
}

export function JournalIndexHeader({ categories, active }: JournalIndexHeaderProps) {
  return (
    <Reveal>
      <header className="mb-2xl pb-xl border-border/20 border-b">
        <div className="gap-x-xl gap-y-md grid items-end md:grid-cols-12">
          {/* Left: Title + description */}
          <div className="md:col-span-7 lg:col-span-6">
            <p className="text-foreground/40 mb-sm font-mono text-[10px] tracking-widest uppercase">
              {pageContent.journal.overline}
            </p>
            <h1 className="font-display text-foreground text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
              {pageContent.journal.title}
            </h1>
            <p className="text-foreground/50 mt-md max-w-prose text-base leading-relaxed">
              {pageContent.journal.description}
            </p>
          </div>

          {/* Right: Category filter pills — bottom-aligned */}
          <nav
            className="md:col-span-5 md:flex md:justify-end md:pb-1 lg:col-span-6"
            aria-label="Filter articles by category"
          >
            <CategoryFilterPills categories={categories} active={active} />
          </nav>
        </div>
      </header>
    </Reveal>
  );
}
