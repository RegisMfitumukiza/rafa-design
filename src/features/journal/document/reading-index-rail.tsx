"use client";

import { useEffect, useState } from "react";

import type { JournalArticle } from "@/content/journal";
import type { ExtractedHeading } from "@/features/journal/document/heading-utils";
import { ShareButton } from "@/features/journal/document/share-button";
import { cn } from "@/lib/cn";

interface ReadingIndexRailProps {
  headings: ExtractedHeading[];
  article: JournalArticle;
  categoryLabel: string;
  className?: string;
}

export function ReadingIndexRail({
  headings,
  article,
  categoryLabel,
  className,
}: ReadingIndexRailProps) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id || null);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      },
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const date = new Date(article.publishedAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const authorName = typeof article.author === "object" ? article.author?.name : article.author;
  const authorRole = typeof article.author === "object" ? article.author?.role : undefined;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className={cn("space-y-xl sticky top-28", className)} aria-label="Table of Contents">
      {/* 01 // Index Section */}
      {headings.length > 0 && (
        <div>
          <p className="text-foreground/35 mb-sm font-mono text-[10px] tracking-widest uppercase">
            Index // Sections
          </p>
          <nav>
            <ul className="border-border/30 space-y-2 border-l pl-3">
              {headings.map((heading) => {
                const isActive = activeId === heading.id;
                return (
                  <li key={heading.id}>
                    <button
                      type="button"
                      onClick={() => scrollToHeading(heading.id)}
                      className={cn(
                        "group block w-full text-left text-xs leading-relaxed transition-all duration-200",
                        isActive
                          ? "text-foreground border-foreground -ml-[13px] border-l-2 pl-3 font-medium"
                          : "text-foreground/45 hover:text-foreground/80",
                      )}
                    >
                      {heading.number && (
                        <span className="text-foreground/40 mr-1.5 font-mono text-[10px] tracking-wider">
                          {heading.number}
                        </span>
                      )}
                      <span>{heading.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}

      {/* 02 // Specification Metadata */}
      <div className="border-border/20 pt-md border-t">
        <p className="text-foreground/35 mb-sm font-mono text-[10px] tracking-widest uppercase">
          Specification // Meta
        </p>
        <dl className="space-y-2.5 font-mono text-[10px] tracking-widest uppercase">
          <div>
            <dt className="text-foreground/35">Author</dt>
            <dd className="text-foreground/80 mt-0.5 font-sans text-xs font-medium tracking-normal">
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
            <dd className="text-foreground/80 mt-0.5 font-sans text-xs tracking-normal">
              <time dateTime={article.publishedAt}>{formattedDate}</time>
            </dd>
          </div>

          {article.estimatedReadingTime && (
            <div>
              <dt className="text-foreground/35">Reading Time</dt>
              <dd className="text-foreground/80 mt-0.5 font-sans text-xs tracking-normal">
                {article.estimatedReadingTime} min read
              </dd>
            </div>
          )}

          <div>
            <dt className="text-foreground/35">Discipline</dt>
            <dd className="text-foreground/80 mt-0.5 font-sans text-xs tracking-normal">
              {categoryLabel}
            </dd>
          </div>

          <div className="border-border/15 border-t pt-2">
            <ShareButton title={article.title} />
          </div>
        </dl>
      </div>
    </aside>
  );
}
