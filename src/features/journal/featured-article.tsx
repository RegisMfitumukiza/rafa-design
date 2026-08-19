import type { Route } from "next";

import Link from "next/link";

import { Image } from "@/components/media/Image";
import { Text } from "@/components/typography/Text";
import type { JournalArticle } from "@/content/journal";
import type { ImageAsset } from "@/content/types";
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

  // Handle both new and legacy formats
  const coverImage = article.hero || (article as { coverImage?: ImageAsset }).coverImage;
  const authorName = typeof article.author === "object" ? article.author?.name : article.author;

  return (
    <article className={cn("", className ?? "")}>
      <Link href={`/journal/${article.slug}` as Route} className="group block">
        <div className="gap-x-2xl gap-y-xl grid items-start md:grid-cols-12">
          {/* Left: Image — 7 columns */}
          <div className="md:col-span-7">
            <ImageReveal>
              {coverImage && (
                <Image
                  asset={{
                    src: coverImage.src,
                    alt: coverImage.alt,
                  }}
                  className="aspect-[16/9] w-full"
                  imgClassName="transition-micro motion-safe:group-hover:scale-(--micro-scale)"
                  sizes="(max-width: 48rem) 100vw, 66vw"
                />
              )}
            </ImageReveal>
          </div>

          {/* Right: Content — 5 columns */}
          <div className="md:pt-sm md:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-foreground/40 mb-sm font-mono text-[10px] tracking-widest uppercase">
                Specification // {article.category}
              </p>
              <h2 className="font-display text-foreground group-hover:text-foreground/70 mb-md text-3xl leading-tight font-medium tracking-tight transition-colors sm:text-4xl lg:text-5xl">
                {article.title}
              </h2>
              {article.excerpt && (
                <Text variant="body" className="text-foreground/60 mb-sm leading-relaxed">
                  {article.excerpt}
                </Text>
              )}
              <p className="text-foreground/40 font-mono text-xs">
                {authorName && `${authorName} · `}
                {formattedDate}
              </p>
            </Reveal>
          </div>
        </div>
      </Link>
    </article>
  );
}
