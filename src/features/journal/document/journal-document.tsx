// ============================================================================
// JOURNAL DOCUMENT
// Main document renderer for editorial content
// ============================================================================

import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { Image } from "@/components/media/Image";
import type { JournalArticle } from "@/content/journal";
import { cn } from "@/lib/cn";
import { Reveal, ImageReveal, Stagger } from "@/motion";

import { BlockRenderer } from "../blocks";
import { ShareBlock } from "../blocks/share-block";

interface JournalDocumentProps {
  article: JournalArticle;
  categoryLabel: string;
}

export function JournalDocument({ article, categoryLabel }: JournalDocumentProps) {
  const date = new Date(article.publishedAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const authorName = typeof article.author === "object" ? article.author?.name : article.author;

  return (
    <>
      {/* Metadata + Title */}
      <Section container="narrow">
        <Reveal visible>
          {/* Breadcrumb integrated with content */}
          <nav aria-label="Breadcrumb" className="mb-md">
            <Link
              href="/journal"
              className="text-foreground/40 hover:text-foreground gap-xs group inline-flex items-center font-mono text-xs tracking-wider transition-colors"
            >
              <span>{categoryLabel}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </nav>

          <h1 className="font-display text-foreground text-4xl leading-tight font-medium tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-foreground/60 mt-md text-lg font-medium md:text-xl">
              {article.subtitle}
            </p>
          )}

          <p className="text-foreground/40 mt-md font-mono text-xs">
            {authorName && `${authorName} · `}
            {formattedDate}
            {article.estimatedReadingTime && ` · ${article.estimatedReadingTime} min read`}
          </p>
        </Reveal>
      </Section>

      {/* Hero Image */}
      {article.hero && (
        <Section container="full" noPadding>
          <ImageReveal>
            <figure>
              <Image
                asset={{
                  src: article.hero.src,
                  alt: article.hero.alt,
                }}
                className="aspect-hero w-full"
                sizes="100vw"
                priority
              />
              {(article.hero.caption || article.hero.credit) && (
                <figcaption className="container-narrow mt-sm text-foreground/60 mx-auto text-sm">
                  {article.hero.caption && <p className="mb-xs">{article.hero.caption}</p>}
                  {article.hero.credit && (
                    <p className="text-foreground/40 font-mono text-xs">
                      {article.hero.credit.role.charAt(0).toUpperCase() +
                        article.hero.credit.role.slice(1)}
                      : {article.hero.credit.name}
                    </p>
                  )}
                </figcaption>
              )}
            </figure>
          </ImageReveal>
        </Section>
      )}

      {/* Sections */}
      {article.sections &&
        article.sections.map((section) => (
          <Section key={section.id} container="narrow" id={section.id}>
            {section.title && section.id !== "introduction" && (
              <div className="mb-xl">
                {section.number && (
                  <p className="text-foreground/40 mb-xs font-mono text-xs tracking-widest uppercase">
                    {section.number}
                  </p>
                )}
                <h2 className="font-display text-foreground text-2xl font-medium tracking-tight md:text-3xl">
                  {section.title}
                </h2>
              </div>
            )}

            <Stagger className="space-y-md" stagger={0.05}>
              {section.blocks.map((block, blockIndex) => (
                <BlockRenderer
                  key={`${section.id}-block-${blockIndex}`}
                  block={block}
                  index={blockIndex}
                  isFirstInSection={blockIndex === 0}
                  {...(section.number !== undefined && { sectionNumber: section.number })}
                />
              ))}
            </Stagger>
          </Section>
        ))}

      {/* Fallback: Legacy content rendering */}
      {!article.sections && typeof article.content === "string" && (
        <Section container="narrow">
          <Stagger className="space-y-lg" stagger={0.05}>
            {article.content.split("\n").map((paragraph: string, i: number) => (
              <p
                key={i}
                className={cn(
                  "text-foreground/80 leading-relaxed",
                  i === 0 ? "text-lg font-medium md:text-xl" : "",
                )}
              >
                {paragraph}
              </p>
            ))}
          </Stagger>
        </Section>
      )}

      {/* Credits (if not already in content) */}
      {article.credits &&
        article.credits.length > 0 &&
        !article.sections?.some((s) => s.blocks.some((b) => b.type === "credits")) && (
          <Section container="narrow">
            <div className="border-border pt-2xl mt-3xl border-t">
              <p className="text-foreground/40 mb-lg text-overline font-mono tracking-widest uppercase">
                Specification // Credits
              </p>
              <div className="gap-y-md flex flex-col">
                {article.credits.map((credit, idx) => (
                  <div key={idx} className="gap-x-lg grid md:grid-cols-12">
                    <div className="md:col-span-3">
                      <p className="text-foreground/50 font-mono text-xs tracking-wider uppercase">
                        {credit.role.charAt(0).toUpperCase() + credit.role.slice(1)}
                      </p>
                    </div>
                    <div className="md:col-span-9">
                      <p className="text-foreground text-base">{credit.name}</p>
                      {credit.organization && (
                        <p className="text-foreground/60 mt-xs text-sm">{credit.organization}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

      {/* Share Block */}
      <Section container="narrow">
        <ShareBlock title={article.title} url={`/journal/${article.id}`} />
      </Section>
    </>
  );
}
