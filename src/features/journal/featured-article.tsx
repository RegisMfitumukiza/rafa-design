/**
 * Featured Article
 *
 * Cinematic editorial hero — the most dominant element on the journal page.
 * 8-col image (3:2 aspect) + 4-col large title block.
 * Only shown when no category filter is active.
 */

import type { Route } from "next";

import Link from "next/link";

import { Image } from "@/components/media/Image";
import { Text } from "@/components/typography/Text";
import type { JournalArticle } from "@/content/journal";
import type { ImageAsset } from "@/content/types";
import { ui } from "@/content/ui";
import { CATEGORY_LABELS } from "@/features/journal/category-filter";
import { cn } from "@/lib/cn";
import { ImageReveal, Reveal } from "@/motion";

interface FeaturedArticleProps {
  article: JournalArticle;
  className?: string;
}

export function FeaturedArticle({ article, className }: FeaturedArticleProps) {
  const date = new Date(article.publishedAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const coverImage = article.hero || (article as { coverImage?: ImageAsset }).coverImage;
  const authorName = typeof article.author === "object" ? article.author?.name : article.author;
  const categoryLabel = article.category
    ? (CATEGORY_LABELS[article.category] ?? article.category)
    : null;

  return (
    <section className={cn("mb-2xl", className)}>
      {/* Section label */}
      <p className="text-foreground/30 mb-lg font-mono text-[10px] tracking-widest uppercase">
        {ui.sections.featuredArticle}
      </p>

      <Link href={`/journal/${article.slug}` as Route} className="group block">
        <div className="gap-x-2xl gap-y-xl grid items-start md:grid-cols-12">
          {/* Image — 8 columns, editorial 3:2 aspect */}
          <div className="md:col-span-8">
            <ImageReveal>
              {coverImage ? (
                <Image
                  asset={{ src: coverImage.src, alt: coverImage.alt }}
                  className="aspect-[3/2] w-full"
                  imgClassName="transition-micro motion-safe:group-hover:scale-(--micro-scale)"
                  sizes="(max-width: 48rem) 100vw, 70vw"
                />
              ) : (
                <div className="bg-foreground/5 aspect-[3/2] w-full" />
              )}
            </ImageReveal>
          </div>

          {/* Content — 4 columns, bottom-aligned to image */}
          <div className="md:col-span-4 md:flex md:flex-col md:justify-end md:self-end md:pb-2">
            <Reveal delay={0.1}>
              {categoryLabel && (
                <p className="text-foreground/40 mb-md font-mono text-[10px] tracking-widest uppercase">
                  {categoryLabel}
                </p>
              )}
              <h2 className="font-display text-foreground group-hover:text-foreground/70 mb-lg text-3xl leading-tight font-medium tracking-tight transition-colors sm:text-4xl lg:text-5xl">
                {article.title}
              </h2>
              {article.excerpt && (
                <Text
                  variant="body"
                  className="text-foreground/50 mb-lg hidden leading-relaxed lg:block"
                >
                  {article.excerpt}
                </Text>
              )}
              <p className="text-foreground/35 font-mono text-[10px] tracking-widest uppercase">
                {authorName && `${authorName} · `}
                {formattedDate}
                {article.estimatedReadingTime && ` · ${article.estimatedReadingTime} min read`}
              </p>
            </Reveal>
          </div>
        </div>
      </Link>

      {/* Separator */}
      <div className="border-border/15 mt-2xl border-b" />
    </section>
  );
}
