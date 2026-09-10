/**
 * Journal Index Header
 *
 * Single row: H1 title + description (left) / category filter pills (right).
 * On mobile the filters wrap below the title.
 * Separated from article content by a thin border.
 */

import type { JournalCategory } from "@/content/journal";
import type { PageIntro } from "@/content/pages";
import { CategoryFilterPills } from "@/features/journal/category-filter";
import { Reveal } from "@/motion";

interface JournalIndexHeaderProps {
  categories: JournalCategory[];
  active: JournalCategory | null;
  intro?: PageIntro | undefined;
}

export function JournalIndexHeader({ categories, active, intro }: JournalIndexHeaderProps) {
  const overline = intro?.overline ?? `Specification // Journal`;
  const title = intro?.title ?? `Journal`;
  const description =
    intro?.description ??
    `Essays, research, and observations on architecture, craft, material culture, and the ideas behind the work.`;

  return (
    <Reveal visible>
      <header className="mb-2xl pb-xl border-border/20 border-b">
        <div className="gap-x-xl gap-y-md grid items-end md:grid-cols-12">
          {/* Left: Title + description */}
          <div className="md:col-span-7 lg:col-span-6">
            <p className="text-foreground/40 mb-sm text-overline font-mono tracking-widest uppercase">
              {overline}
            </p>
            <h1 className="font-display text-foreground text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="text-foreground/50 mt-md max-w-prose text-base leading-relaxed">
              {description}
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
