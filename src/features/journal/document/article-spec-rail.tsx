"use client";

import type { JournalArticle } from "@/content/journal";
import { ShareButton } from "@/features/journal/document/share-button";
import { cn } from "@/lib/cn";

interface ArticleSpecRailProps {
  article: JournalArticle;
  categoryLabel: string;
  className?: string;
}

export function ArticleSpecRail({ article, categoryLabel, className }: ArticleSpecRailProps) {
  const date = new Date(article.publishedAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const authorName = typeof article.author === "object" ? article.author?.name : article.author;
  const authorRole = typeof article.author === "object" ? article.author?.role : undefined;

  return (
    <aside
      className={cn("space-y-lg sticky top-28", className)}
      aria-label="Article Specifications"
    >
      <div className="border-border/20 pt-sm border-t">
        <p className="text-foreground/35 mb-md font-mono text-[10px] tracking-widest uppercase">
          Specification {"//"} Meta
        </p>

        <dl className="space-y-3 font-mono text-[10px] tracking-widest uppercase">
          <div>
            <dt className="text-foreground/35">Author</dt>
            <dd className="text-foreground/85 mt-0.5 font-sans text-xs font-medium tracking-normal">
              {authorName || "RAFA Design Hub"}
              {authorRole && (
                <span className="text-foreground/40 block font-mono text-[10px] tracking-widest uppercase">
                  {authorRole}
                </span>
              )}
            </dd>
          </div>

          <div>
            <dt className="text-foreground/35">Published</dt>
            <dd className="text-foreground/85 mt-0.5 font-sans text-xs tracking-normal">
              <time dateTime={article.publishedAt}>{formattedDate}</time>
            </dd>
          </div>

          {article.estimatedReadingTime && (
            <div>
              <dt className="text-foreground/35">Reading Time</dt>
              <dd className="text-foreground/85 mt-0.5 font-sans text-xs tracking-normal">
                {article.estimatedReadingTime} min read
              </dd>
            </div>
          )}

          <div>
            <dt className="text-foreground/35">Format</dt>
            <dd className="text-foreground/85 mt-0.5 font-sans text-xs tracking-normal capitalize">
              {article.type ? article.type.replace(/-/g, " ") : "Essay"}
            </dd>
          </div>

          <div>
            <dt className="text-foreground/35">Discipline</dt>
            <dd className="text-foreground/85 mt-0.5 font-sans text-xs tracking-normal">
              {categoryLabel}
            </dd>
          </div>

          <div className="border-border/15 border-t pt-2.5">
            <ShareButton title={article.title} />
          </div>
        </dl>
      </div>
    </aside>
  );
}
