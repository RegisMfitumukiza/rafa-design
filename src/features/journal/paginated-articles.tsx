"use client";

import { useEffect, useState } from "react";

import type { JournalArticle } from "@/content/journal";
import { ui } from "@/content/ui";
import { ArticleListView } from "@/features/journal/article-list-view";
import { JournalCard } from "@/features/journal/journal-card";
import { JournalGrid } from "@/features/journal/journal-grid";
import { ViewToggle, type ViewMode } from "@/features/journal/view-toggle";
import { cn } from "@/lib/cn";

interface PaginatedArticlesProps {
  articles: JournalArticle[];
  initialBatchSize?: number;
  batchSize?: number;
  className?: string;
}

export function PaginatedArticles({
  articles,
  initialBatchSize = 9,
  batchSize = 9,
  className,
}: PaginatedArticlesProps) {
  const [visibleCount, setVisibleCount] = useState(initialBatchSize);
  const [view, setView] = useState<ViewMode>("grid");
  const [mounted, setMounted] = useState(false);

  // Load view preference from localStorage after mount
  useEffect(() => {
    setMounted(true);
    const savedView = localStorage.getItem("journal-view") as ViewMode | null;
    if (savedView === "grid" || savedView === "list") {
      setView(savedView);
    }
  }, []);

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  function loadMore() {
    setVisibleCount((prev) => prev + batchSize);
  }

  function handleViewChange(newView: ViewMode) {
    setView(newView);
    localStorage.setItem("journal-view", newView);
  }

  // Reset visible count when view changes
  useEffect(() => {
    setVisibleCount(initialBatchSize);
  }, [view, initialBatchSize]);

  return (
    <div className={cn("", className)}>
      {/* View Toggle */}
      <div className="mb-xl flex justify-end">
        {mounted && <ViewToggle view={view} onViewChange={handleViewChange} />}
      </div>

      {/* Content */}
      {view === "grid" ? (
        <JournalGrid>
          {visibleArticles.map((article) => (
            <JournalCard key={article.id} article={article} titleAs="h2" />
          ))}
        </JournalGrid>
      ) : (
        <ArticleListView articles={visibleArticles} />
      )}

      {/* Load More */}
      {hasMore && (
        <div className="mt-2xl flex flex-col items-center gap-sm">
          <button
            type="button"
            onClick={loadMore}
            className="group inline-flex items-center gap-xs font-mono text-xs uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors"
            aria-label={`Load ${Math.min(batchSize, articles.length - visibleCount)} more articles`}
          >
            {ui.journal.loadMore}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
          <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
            {ui.journal.showing} {visibleCount} {ui.journal.of} {articles.length}
          </p>
        </div>
      )}
    </div>
  );
}
