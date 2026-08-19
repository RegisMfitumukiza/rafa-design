"use client";

import { useRef, useState } from "react";

import type { JournalArticle } from "@/content/journal";
import { JournalCard } from "@/features/journal/journal-card";
import { cn } from "@/lib/cn";
import { Reveal } from "@/motion";

interface RelatedArticlesCarouselProps {
  articles: JournalArticle[];
  className?: string;
}

/**
 * RelatedArticlesCarousel
 *
 * Horizontal scrollable carousel displaying up to 5 smart-sorted related articles.
 * Features:
 *   - Snap-x horizontal scrolling with hidden scrollbar
 *   - Architectural prev/next controls ([ PREV ← ], [ NEXT → ])
 *   - Live index counter (01 / 05)
 */
export function RelatedArticlesCarousel({ articles, className }: RelatedArticlesCarouselProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!articles || articles.length === 0) return null;

  const total = articles.length;

  const scrollTo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const targetIndex = Math.max(0, Math.min(index, total - 1));
    const child = container.children[targetIndex] as HTMLElement;
    if (!child) return;

    child.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setCurrent(targetIndex);
  };

  const next = () => scrollTo((current + 1) % total);
  const prev = () => scrollTo((current - 1 + total) % total);

  return (
    <div className={cn("space-y-lg", className)}>
      {/* Header controls & counter */}
      <Reveal>
        <div className="gap-md border-border/40 pb-sm flex items-baseline justify-between border-b">
          <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
            Related Stories // {String(current + 1).padStart(2, "0")} —{" "}
            {String(total).padStart(2, "0")}
          </p>

          {/* Prev / Next controls */}
          {total > 1 && (
            <div className="gap-xs flex items-center font-mono text-[10px] tracking-widest uppercase">
              <button
                type="button"
                onClick={prev}
                className="border-border/50 text-foreground/70 hover:border-foreground hover:bg-foreground hover:text-background rounded-xs border px-2 py-1 transition-all duration-300"
                aria-label="Previous story"
              >
                ← PREV
              </button>
              <button
                type="button"
                onClick={next}
                className="border-border/50 text-foreground/70 hover:border-foreground hover:bg-foreground hover:text-background rounded-xs border px-2 py-1 transition-all duration-300"
                aria-label="Next story"
              >
                NEXT →
              </button>
            </div>
          )}
        </div>
      </Reveal>

      {/* Horizontal Snap Scroll Container */}
      <div
        ref={containerRef}
        className="gap-lg scrollbar-hide pb-sm flex snap-x snap-mandatory overflow-x-auto"
        onScroll={(e) => {
          const container = e.currentTarget;
          if (container.scrollWidth <= container.clientWidth) return;
          const scrollFraction =
            container.scrollLeft / (container.scrollWidth - container.clientWidth);
          const index = Math.round(scrollFraction * (total - 1));
          setCurrent(Math.max(0, Math.min(index, total - 1)));
        }}
      >
        {articles.map((article) => (
          <div
            key={article.id}
            className="w-[85vw] shrink-0 snap-start sm:w-[50vw] md:w-[32vw] lg:w-[28vw]"
          >
            <JournalCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}
