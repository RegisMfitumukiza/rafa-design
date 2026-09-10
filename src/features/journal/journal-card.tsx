/**
 * Journal Card
 *
 * Supports three editorial sizes:
 * - lead      — 4:3 image, large title (text-2xl), shows excerpt. Used for first article in grid row.
 * - secondary — 16:9 image, medium title (text-xl). Used for stacked secondary slots.
 * - standard  — 3:2 image, compact title (text-lg). Used for uniform grid rows.
 */

import type { Route } from "next";

import Link from "next/link";

import { Image } from "@/components/media/Image";
import type { HeadingTag } from "@/components/typography/Heading";
import type { JournalArticle } from "@/content/journal";
import type { ImageAsset } from "@/content/types";
import { CATEGORY_LABELS } from "@/features/journal/category-filter";
import { cn } from "@/lib/cn";

export type CardSize = "lead" | "secondary" | "standard";

interface JournalCardProps {
  article: JournalArticle;
  size?: CardSize;
  titleAs?: HeadingTag;
  className?: string;
}

const aspectBySize: Record<CardSize, string> = {
  lead: "aspect-[4/3]",
  secondary: "aspect-[16/9]",
  standard: "aspect-[3/2]",
};

const titleClassBySize: Record<CardSize, string> = {
  lead: "text-2xl sm:text-3xl",
  secondary: "text-xl",
  standard: "text-lg",
};

export function JournalCard({
  article,
  size = "standard",
  titleAs = "h3",
  className,
}: JournalCardProps) {
  const date = new Date(article.publishedAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const Title = titleAs;

  const coverImage = article.hero || (article as { coverImage?: ImageAsset }).coverImage;
  const authorName = typeof article.author === "object" ? article.author?.name : article.author;
  const categoryLabel = article.category
    ? (CATEGORY_LABELS[article.category] ?? article.category)
    : null;

  return (
    <article className={cn("group", className ?? "")}>
      <Link href={`/journal/${article.slug}` as Route} className="block">
        {/* Image */}
        {coverImage ? (
          <Image
            asset={{ src: coverImage.src, alt: coverImage.alt }}
            className={cn("mb-md w-full", aspectBySize[size])}
            imgClassName="transition-micro motion-safe:group-hover:scale-(--micro-scale)"
            sizes={
              size === "lead"
                ? "(max-width: 48rem) 100vw, (max-width: 64rem) 60vw, 50vw"
                : "(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 33vw"
            }
          />
        ) : (
          <div className={cn("bg-foreground/5 mb-md w-full", aspectBySize[size])} />
        )}

        {/* Category overline */}
        {categoryLabel && (
          <p className="text-foreground/40 mb-xs text-overline font-mono tracking-widest uppercase">
            {categoryLabel}
          </p>
        )}

        {/* Title */}
        <Title
          className={cn(
            "font-display text-foreground group-hover:text-foreground/70 mb-sm leading-tight font-medium tracking-tight transition-colors",
            titleClassBySize[size],
          )}
        >
          {article.title}
        </Title>

        {/* Excerpt — only for lead size */}
        {size === "lead" && article.excerpt && (
          <p className="text-foreground/50 mb-sm line-clamp-2 text-sm leading-relaxed">
            {article.excerpt}
          </p>
        )}

        {/* Meta */}
        <p className="text-foreground/35 text-overline font-mono tracking-widest uppercase">
          {authorName && `${authorName} · `}
          {formattedDate}
          {article.estimatedReadingTime && ` · ${article.estimatedReadingTime} min`}
        </p>
      </Link>
    </article>
  );
}
