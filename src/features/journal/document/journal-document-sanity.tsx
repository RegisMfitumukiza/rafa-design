/**
 * Journal Document (Sanity Version)
 *
 * Renders journal articles from Sanity CMS as an architectural monograph:
 * - Fixed 2px hairline scroll progress bar
 * - 12-column asymmetric split header
 * - Monumental hero image plate with architectural attribution
 * - 12-column asymmetric reading grid (Left 4 cols: Sticky Marginalia Rail | Right 8 cols: Narrative Body)
 * - Structured credits matrix & taxonomy tags
 * - Smooth "Back to top ↑" trigger
 *
 * @see src/components/journal/portable-text.tsx for content block rendering
 */

import Image from "next/image";
import Link from "next/link";

import { ArticleContent } from "@/components/journal/portable-text";
import { Section } from "@/components/layout/Section";
import type { JournalArticle } from "@/content/journal";
import { BackToTop } from "@/features/journal/document/back-to-top";
import { extractHeadingsFromContent } from "@/features/journal/document/heading-utils";
import { ReadingIndexRail } from "@/features/journal/document/reading-index-rail";
import { ScrollProgress } from "@/features/journal/document/scroll-progress";
import { ShareButton } from "@/features/journal/document/share-button";
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

  const rawContent = Array.isArray(article.content) ? article.content : [];
  const headings = extractHeadingsFromContent(rawContent);

  return (
    <>
      {/* Hairline reading progress indicator */}
      <ScrollProgress />

      {/* ── 12-Column Monograph Header ─────────────────────────────────── */}
      <Section container="wide" className="pt-xl pb-2xl">
        <Reveal>
          {/* Breadcrumb overline */}
          <nav aria-label="Breadcrumb" className="mb-lg">
            <Link
              href="/journal"
              className="text-foreground/40 hover:text-foreground inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors"
            >
              <span>← Journal</span>
              <span className="text-foreground/20">{"//"}</span>
              <span>{categoryLabel}</span>
            </Link>
          </nav>

          <div className="gap-x-2xl gap-y-xl grid items-start md:grid-cols-12">
            {/* Left 8 Cols: Monumental Title + Subtitle + Lead Excerpt */}
            <div className="md:col-span-8">
              <h1 className="font-display text-foreground text-4xl leading-[1.06] font-medium tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
                {article.title}
              </h1>

              {article.subtitle && (
                <p className="text-foreground/60 mt-md text-xl leading-snug font-medium sm:text-2xl">
                  {article.subtitle}
                </p>
              )}

              {article.excerpt && (
                <p className="text-foreground/75 mt-xl max-w-prose text-xl leading-relaxed sm:text-2xl">
                  {article.excerpt}
                </p>
              )}
            </div>

            {/* Right 4 Cols: Architectural Spec Matrix (Top summary on mobile/tablet) */}
            <div className="border-border/30 pt-md md:pl-md border-t md:col-span-4 md:border-t-0">
              <dl className="divide-border/20 divide-y font-mono text-[10px] tracking-widest uppercase">
                {/* 01 // Author */}
                <div className="py-sm">
                  <dt className="text-foreground/35 mb-0.5">01 // Author</dt>
                  <dd className="text-foreground/80 font-sans text-xs font-medium tracking-normal">
                    {authorName || "RAFA Design Hub"}
                    {authorRole && (
                      <span className="text-foreground/40 mt-0.5 block font-mono text-[10px] tracking-widest uppercase">
                        {authorRole}
                      </span>
                    )}
                  </dd>
                </div>

                {/* 02 // Published */}
                <div className="py-sm">
                  <dt className="text-foreground/35 mb-0.5">02 // Published</dt>
                  <dd className="text-foreground/80 font-sans text-xs tracking-normal">
                    <time dateTime={article.publishedAt}>{formattedDate}</time>
                  </dd>
                </div>

                {/* 03 // Reading Time */}
                {article.estimatedReadingTime && (
                  <div className="py-sm">
                    <dt className="text-foreground/35 mb-0.5">03 // Reading Time</dt>
                    <dd className="text-foreground/80 font-sans text-xs tracking-normal">
                      {article.estimatedReadingTime} min read
                    </dd>
                  </div>
                )}

                {/* 04 // Discipline */}
                <div className="py-sm">
                  <dt className="text-foreground/35 mb-0.5">04 // Discipline</dt>
                  <dd className="text-foreground/80 font-sans text-xs tracking-normal">
                    {categoryLabel}
                  </dd>
                </div>

                {/* 05 // Share */}
                <div className="py-sm">
                  <dt className="text-foreground/35 mb-0.5">05 // Share</dt>
                  <dd className="pt-0.5">
                    <ShareButton title={article.title} />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Monumental Hero Photography ─────────────────────────────────── */}
      {heroImageUrl && (
        <Section container="full" noPadding className="mb-2xl">
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
                <figcaption className="container-wide text-foreground/50 mt-sm gap-x-md flex flex-wrap items-baseline justify-between text-xs">
                  {article.hero?.caption && <p>{article.hero.caption}</p>}
                  {heroCreditText && (
                    <p className="text-foreground/35 font-mono text-[10px] tracking-widest uppercase">
                      Photo: {heroCreditText}
                    </p>
                  )}
                </figcaption>
              )}
            </figure>
          </ImageReveal>
        </Section>
      )}

      {/* ── 12-Column Asymmetric Monograph Grid ────────────────────────── */}
      <Section container="wide" className="my-2xl">
        <div className="gap-x-2xl gap-y-2xl grid items-start lg:grid-cols-12">
          {/* Left 4 Cols: Sticky Marginalia Rail */}
          <div className="hidden lg:col-span-4 lg:block">
            <ReadingIndexRail headings={headings} article={article} categoryLabel={categoryLabel} />
          </div>

          {/* Right 8 Cols: Primary Reading & Narrative Body */}
          <div className="lg:col-span-8">
            <div className="max-w-2xl">
              <Reveal>
                <ArticleContent content={rawContent} />
              </Reveal>

              {/* Architectural Credits Block */}
              {article.credits && article.credits.length > 0 && (
                <Reveal>
                  <div className="border-border/30 mt-3xl pt-xl border-t">
                    <p className="text-foreground/35 mb-md font-mono text-[10px] tracking-widest uppercase">
                      Specification // Credits & Attribution
                    </p>
                    <dl className="gap-md grid font-mono text-xs sm:grid-cols-2">
                      {article.credits.map((credit, index) => (
                        <div key={index} className="border-border/20 pb-sm border-b">
                          <dt className="text-foreground/40 mb-1 text-[10px] tracking-widest capitalize uppercase">
                            {credit.role}
                          </dt>
                          <dd className="text-foreground/90 font-sans text-sm">
                            {credit.url ? (
                              <a
                                href={credit.url}
                                className="hover:text-foreground decoration-foreground/30 hover:decoration-foreground underline underline-offset-4 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {credit.name}
                                {credit.organization && ` (${credit.organization})`} ↗
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
              )}

              {/* Taxonomy Tags */}
              {article.keywords && article.keywords.length > 0 && (
                <Reveal>
                  <div className="border-border/20 mt-xl pt-md flex flex-wrap items-center gap-2 border-t">
                    <span className="text-foreground/35 mr-2 font-mono text-[10px] tracking-widest uppercase">
                      Keywords:
                    </span>
                    {article.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="border-border/40 bg-foreground/5 text-foreground/70 rounded-xs px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase"
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Floating Back To Top */}
      <BackToTop />
    </>
  );
}
