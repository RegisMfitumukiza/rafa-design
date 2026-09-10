/**
 * Journal Editorial Grid
 *
 * Asymmetric editorial layout — no view toggle, no uniform grid.
 *
 * Row 1 (first 3 articles):
 *   [Lead — 7 col, 4:3 image]  |  [Stack: article[1] + article[2] — 5 col, 16:9]
 *
 * Row 2+ (remaining articles):
 *   4-column uniform grid, standard 3:2 cards
 *
 * Graceful degradation:
 *   - 0 articles: empty state
 *   - 1 article: lead card full-width
 *   - 2 articles: lead + single secondary (5-col)
 *   - 3+ articles: full asymmetric row + grid
 */

"use client";

import { useState } from "react";

import type { JournalArticle } from "@/content/journal";
import { ui } from "@/content/ui";
import { JournalCard } from "@/features/journal/journal-card";
import { cn } from "@/lib/cn";
import { Stagger } from "@/motion";

interface JournalEditorialGridProps {
  articles: JournalArticle[];
  initialBatchSize?: number | undefined;
  batchSize?: number | undefined;
  className?: string | undefined;
}

export function JournalEditorialGrid({
  articles,
  initialBatchSize = 12,
  batchSize = 8,
  className,
}: JournalEditorialGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialBatchSize);

  const visible = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  // Split into editorial row (first 3) and uniform grid (rest)
  const editorialRow = visible.slice(0, 3);
  const gridArticles = visible.slice(3);

  const [lead, ...secondaryPair] = editorialRow;

  return (
    <div className={cn("", className)}>
      {articles.length === 0 ? (
        <p className="text-foreground/40 py-2xl font-mono text-xs tracking-widest uppercase">
          No articles published yet.
        </p>
      ) : (
        <>
          {/* ── Editorial Row 1: Asymmetric ─────────────────────────── */}
          {lead && (
            <div className="gap-x-2xl gap-y-xl mb-2xl grid md:grid-cols-12">
              {/* Lead card — 7 columns */}
              <div className={cn(secondaryPair.length > 0 ? "md:col-span-7" : "md:col-span-12")}>
                <JournalCard article={lead} size="lead" titleAs="h2" />
              </div>

              {/* Secondary stack — 5 columns */}
              {secondaryPair.length > 0 && (
                <div className="gap-y-xl flex flex-col md:col-span-5">
                  {secondaryPair.map((article) => (
                    <JournalCard key={article.id} article={article} size="secondary" titleAs="h2" />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Separator between rows */}
          {gridArticles.length > 0 && <div className="border-border/15 mb-2xl border-t" />}

          {/* ── Uniform Grid: 4-col standard cards ──────────────────── */}
          {gridArticles.length > 0 && (
            <Stagger className="gap-x-lg gap-y-2xl grid sm:grid-cols-2 lg:grid-cols-4">
              {gridArticles.map((article) => (
                <JournalCard key={article.id} article={article} size="standard" titleAs="h2" />
              ))}
            </Stagger>
          )}
        </>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="mt-2xl gap-sm flex flex-col items-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + batchSize)}
            className="group gap-xs text-foreground/60 hover:text-foreground text-overline inline-flex items-center font-mono tracking-widest uppercase transition-colors"
            aria-label={`Load ${Math.min(batchSize, articles.length - visibleCount)} more articles`}
          >
            {ui.journal.loadMore}
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
          <p className="text-foreground/30 text-overline font-mono tracking-widest uppercase">
            {ui.journal.showing} {Math.min(visibleCount, articles.length)} {ui.journal.of}{" "}
            {articles.length}
          </p>
        </div>
      )}
    </div>
  );
}
