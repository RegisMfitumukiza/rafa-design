/**
 * Journal Document (Sanity Version)
 *
 * Renders journal articles from Sanity CMS with portable text content.
 * This replaces the sections-based approach with portable text rendering.
 *
 * @see src/components/journal/portable-text.tsx for content rendering
 */

import Image from "next/image";
import Link from "next/link";

import { ArticleContent } from "@/components/journal/portable-text";
import { Section } from "@/components/layout/Section";
import type { JournalArticle } from "@/content/journal";
import { Reveal, ImageReveal } from "@/motion";

interface JournalDocumentSanityProps {
  article: JournalArticle;
  categoryLabel: string;
}

export function JournalDocumentSanity({ article, categoryLabel }: JournalDocumentSanityProps) {
  const date = new Date(article.publishedAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const authorName = typeof article.author === "object" ? article.author?.name : article.author;
  const authorRole = typeof article.author === "object" ? article.author?.role : undefined;

  const heroImageUrl = article.hero
    ? typeof article.hero === "string"
      ? article.hero
      : article.hero.src
    : null;
  const heroCreditText = article.hero?.credit
    ? typeof article.hero.credit === "object"
      ? article.hero.credit.name
      : article.hero.credit
    : null;

  return (
    <>
      {/* Metadata + Title */}
      <Section container="narrow">
        <Reveal>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-md">
            <Link
              href="/journal"
              className="text-foreground/40 hover:text-foreground gap-xs group inline-flex items-center font-mono text-xs tracking-wider transition-colors"
            >
              <span>{categoryLabel}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </nav>

          {/* Title */}
          <h1 className="font-display text-foreground text-4xl leading-tight font-medium tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            {article.title}
          </h1>

          {/* Subtitle */}
          {article.subtitle && (
            <p className="text-foreground/60 mt-md text-lg font-medium md:text-xl">
              {article.subtitle}
            </p>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-foreground/70 mt-lg text-xl leading-relaxed md:text-2xl">
              {article.excerpt}
            </p>
          )}

          {/* Metadata */}
          <div className="text-foreground/40 mt-md font-mono text-xs">
            {authorName && (
              <span>
                {authorName}
                {authorRole && ` · ${authorRole}`}
              </span>
            )}
            {authorName && <span className="mx-xs">·</span>}
            <time dateTime={article.publishedAt}>{formattedDate}</time>
            {article.estimatedReadingTime && (
              <>
                <span className="mx-xs">·</span>
                <span>{article.estimatedReadingTime} min read</span>
              </>
            )}
          </div>
        </Reveal>
      </Section>

      {/* Hero Image */}
      {heroImageUrl && (
        <Section container="full" noPadding>
          <ImageReveal>
            <figure>
              <div className="aspect-hero bg-surface relative w-full overflow-hidden">
                <Image
                  src={heroImageUrl}
                  alt={article.hero?.alt || article.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
              {(article.hero?.caption || heroCreditText) && (
                <figcaption className="container-narrow text-foreground/60 mt-sm mx-auto text-sm">
                  {article.hero?.caption && <p className="mb-xs">{article.hero.caption}</p>}
                  {heroCreditText && (
                    <p className="text-foreground/40 font-mono text-xs">{heroCreditText}</p>
                  )}
                </figcaption>
              )}
            </figure>
          </ImageReveal>
        </Section>
      )}

      {/* Portable Text Content */}
      <Section container="narrow" className="mt-2xl">
        <Reveal>
          <ArticleContent content={Array.isArray(article.content) ? article.content : []} />
        </Reveal>
      </Section>

      {/* Credits */}
      {article.credits && article.credits.length > 0 && (
        <Section container="narrow" className="mt-2xl">
          <Reveal>
            <div className="border-t-border pt-lg border-t">
              <h2 className="text-foreground/40 mb-sm font-mono text-xs tracking-wider uppercase">
                Credits
              </h2>
              <dl className="space-y-xs">
                {article.credits.map((credit, index) => (
                  <div key={index} className="text-foreground/70 text-sm">
                    <dt className="inline font-medium capitalize">{credit.role}: </dt>
                    <dd className="inline">
                      {credit.url ? (
                        <a
                          href={credit.url}
                          className="hover:text-foreground underline underline-offset-2 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {credit.name}
                          {credit.organization && ` (${credit.organization})`}
                        </a>
                      ) : (
                        <>
                          {credit.name}
                          {credit.organization && ` (${credit.organization})`}
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </Section>
      )}

      {/* Keywords */}
      {article.keywords && article.keywords.length > 0 && (
        <Section container="narrow" className="mt-lg">
          <Reveal>
            <div className="gap-xs flex flex-wrap">
              <span className="text-foreground/40 font-mono text-xs">Tags:</span>
              {article.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="bg-surface text-foreground/60 px-sm py-xs rounded-full font-mono text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </Reveal>
        </Section>
      )}
    </>
  );
}
