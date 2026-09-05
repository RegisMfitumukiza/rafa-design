/**
 * Journal Document (Sanity Version)
 *
 * Architectural monograph layout:
 * - Breadcrumb + monumental H1 header (title only — no spec metadata)
 * - Full-bleed 16:9 hero photography plate
 * - 3-col sticky marginalia rail (owns ALL metadata: index + spec)
 * - 9-col reading narrative body (portable text, credits, tags)
 *
 * No duplicate metadata between header and rail.
 *
 * @see src/components/journal/portable-text.tsx for content block rendering
 * @see src/features/journal/document/reading-index-rail.tsx for the sticky rail
 */

import Image from "next/image";
import Link from "next/link";

import { ArticleContent } from "@/components/journal/portable-text";
import { Section } from "@/components/layout/Section";
import type { JournalArticle } from "@/content/journal";
import { ArticleSpecRail } from "@/features/journal/document/article-spec-rail";
import { BackToTop } from "@/features/journal/document/back-to-top";
import { extractHeadingsFromContent } from "@/features/journal/document/heading-utils";
import { ReadingIndexRail } from "@/features/journal/document/reading-index-rail";
import { ScrollProgress } from "@/features/journal/document/scroll-progress";
import { ImageReveal, Reveal } from "@/motion";

interface JournalDocumentSanityProps {
  article: JournalArticle;
  categoryLabel: string;
}

export function JournalDocumentSanity({ article, categoryLabel }: JournalDocumentSanityProps) {
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
      {/* 2px hairline reading progress bar */}
      <ScrollProgress />

      {/* ── Editorial Title Header ──────────────────────────────────────────
          Clean, monumental header spanning the full editorial width. */}
      <Section container="wide" className="pt-xl pb-xl">
        <Reveal visible>
          {/* Breadcrumb */}
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

          {/* Monumental Headline */}
          <div className="max-w-5xl">
            <h1 className="font-display text-foreground text-4xl leading-[1.06] font-medium tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-foreground/55 mt-md text-xl leading-snug sm:text-2xl">
                {article.subtitle}
              </p>
            )}
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
                <figcaption className="container-wide text-foreground/45 mt-sm gap-x-lg flex flex-wrap items-baseline justify-between text-xs">
                  {article.hero?.caption && <p>{article.hero.caption}</p>}
                  {heroCreditText && (
                    <p className="text-foreground/30 font-mono text-[10px] tracking-widest uppercase">
                      Photo: {heroCreditText}
                    </p>
                  )}
                </figcaption>
              )}
            </figure>
          </ImageReveal>
        </Section>
      )}

      {/* ── 3-Column Dual-Rail Monograph Reading Grid ───────────────────────
          Left  3 cols: Sticky Section Index Tracker
          Center 6 cols: Narrative Reading Body
          Right 3 cols: Sticky Specification Metadata & Share */}
      <Section container="wide" className="my-2xl">
        <div className="gap-x-xl gap-y-2xl grid lg:grid-cols-12">
          {/* Left 3 Cols: Sticky Section Index Rail */}
          <div className="hidden lg:col-span-3 lg:block">
            <ReadingIndexRail headings={headings} />
          </div>

          {/* Center 6 Cols: Primary Narrative Reading Body */}
          <div className={headings.length > 0 ? "lg:col-span-6" : "lg:col-span-9"}>
            <Reveal>
              {/* Lead Abstract / Standfirst */}
              {article.excerpt && (
                <div className="border-border/30 mb-xl pb-lg border-b">
                  <p className="text-foreground/90 text-xl leading-relaxed font-light tracking-tight sm:text-2xl md:text-[22px]">
                    {article.excerpt}
                  </p>
                </div>
              )}

              <ArticleContent content={rawContent} />
            </Reveal>

            {/* Architectural Credits */}
            {article.credits && article.credits.length > 0 && (
              <Reveal>
                <div className="border-border/25 mt-3xl pt-xl border-t">
                  <p className="text-foreground/35 mb-md font-mono text-[10px] tracking-widest uppercase">
                    Specification {"//"} Credits & Attribution
                  </p>
                  <dl className="gap-md grid font-mono text-xs sm:grid-cols-2">
                    {article.credits.map((credit, index) => (
                      <div key={index} className="border-border/20 pb-sm border-b">
                        <dt className="text-foreground/40 mb-1 text-[10px] tracking-widest capitalize uppercase">
                          {credit.role}
                        </dt>
                        <dd className="text-foreground/85 font-sans text-sm">
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
                <div className="border-border/15 mt-xl pt-md flex flex-wrap items-center gap-2 border-t">
                  <span className="text-foreground/30 mr-2 font-mono text-[10px] tracking-widest uppercase">
                    Keywords:
                  </span>
                  {article.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="border-border/30 bg-foreground/[0.04] text-foreground/60 rounded-xs px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Right 3 Cols: Sticky Specification Meta Rail */}
          <div className="hidden lg:col-span-3 lg:block">
            <ArticleSpecRail article={article} categoryLabel={categoryLabel} />
          </div>
        </div>
      </Section>

      <BackToTop />
    </>
  );
}
