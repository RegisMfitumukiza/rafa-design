import type { Route } from "next";

import Link from "next/link";

import type { JournalArticle } from "@/content/journal";
import { cn } from "@/lib/cn";

interface ArticleListViewProps {
  articles: JournalArticle[];
  className?: string;
}

const categoryLabels: Record<string, string> = {
  news: "News",
  research: "Research",
  awards: "Awards",
  events: "Events",
  ideas: "Ideas",
  publications: "Publications",
};

export function ArticleListView({ articles, className }: ArticleListViewProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {articles.map((article, idx) => {
        const date = new Date(article.publishedAt);
        const formattedDate = date.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <Link
            key={article.id}
            href={`/journal/${article.slug}` as Route}
            className={cn(
              "group border-border py-2xl grid gap-lg md:grid-cols-12 border-t transition-all",
              idx === articles.length - 1 ? "border-b" : "",
            )}
          >
            {/* Number */}
            <span className="text-foreground/30 font-mono text-sm font-medium tracking-widest group-hover:text-foreground/50 group-hover:scale-105 transition-all origin-left md:col-span-1">
              {String(idx + 1).padStart(2, "0")}
            </span>

            {/* Title & Excerpt */}
            <div className="md:col-span-7 lg:col-span-8">
              <h3 className="text-foreground/90 group-hover:text-foreground font-display text-xl font-medium leading-tight tracking-tight transition-colors md:text-2xl lg:text-3xl mb-sm">
                {article.title}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
            </div>

            {/* Metadata */}
            <div className="md:col-span-4 lg:col-span-3 md:text-right md:pt-xs">
              <p className="text-foreground/50 text-sm md:text-base">
                {categoryLabels[article.category] || article.category}
              </p>
              <p className="text-foreground/40 font-mono text-xs mt-xs">
                {formattedDate}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
