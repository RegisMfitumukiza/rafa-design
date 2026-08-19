// ============================================================================
// JOURNAL DOCUMENT
// Main document renderer for editorial content
// ============================================================================

import type { JournalArticle } from "@/content/journal";
import { Section } from "@/components/layout/Section";
import { Image } from "@/components/media/Image";
import { Reveal, ImageReveal, Stagger } from "@/motion";
import { BlockRenderer } from "../blocks";
import { ShareBlock } from "../blocks/share-block";
import { cn } from "@/lib/cn";

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

  const authorName = typeof article.author === "object" 
    ? article.author?.name 
    : article.author;

  return (
    <>
      {/* Metadata + Title */}
      <Section container="narrow">
        <Reveal>
          {/* Breadcrumb integrated with content */}
          <nav aria-label="Breadcrumb" className="mb-md">
            <a 
              href="/journal" 
              className="text-foreground/40 font-mono text-xs tracking-wider hover:text-foreground transition-colors inline-flex items-center gap-xs group"
            >
              <span>{categoryLabel}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </nav>
          
          <h1 className="font-display text-foreground text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-balance">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-foreground/60 text-lg md:text-xl font-medium mt-md">
              {article.subtitle}
            </p>
          )}
          
          <p className="text-foreground/40 font-mono text-xs mt-md">
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
                <figcaption className="container-narrow mx-auto mt-sm text-foreground/60 text-sm">
                  {article.hero.caption && <p className="mb-xs">{article.hero.caption}</p>}
                  {article.hero.credit && (
                    <p className="font-mono text-xs text-foreground/40">
                      {article.hero.credit.role.charAt(0).toUpperCase() + article.hero.credit.role.slice(1)}
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
      {article.sections && article.sections.map((section, sectionIndex) => (
        <Section key={section.id} container="narrow" id={section.id}>
          {section.title && section.id !== "introduction" && (
            <div className="mb-xl">
              {section.number && (
                <p className="text-foreground/40 font-mono text-xs tracking-widest uppercase mb-xs">
                  {section.number}
                </p>
              )}
              <h2 className="font-display text-foreground text-2xl md:text-3xl font-medium tracking-tight">
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
      {!article.sections && article.content && (
        <Section container="narrow">
          <Stagger className="space-y-lg" stagger={0.05}>
            {article.content.split("\n").map((paragraph, i) => (
              <p
                key={i}
                className={cn(
                  "text-foreground/80 leading-relaxed",
                  i === 0 ? "text-lg md:text-xl font-medium" : "",
                )}
              >
                {paragraph}
              </p>
            ))}
          </Stagger>
        </Section>
      )}

      {/* Credits (if not already in content) */}
      {article.credits && article.credits.length > 0 && !article.sections?.some(s => 
        s.blocks.some(b => b.type === "credits")
      ) && (
        <Section container="narrow">
          <div className="border-border border-t pt-2xl mt-3xl">
            <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase mb-lg">
              Specification // Credits
            </p>
            <div className="gap-y-md flex flex-col">
              {article.credits.map((credit, idx) => (
                <div key={idx} className="gap-x-lg grid md:grid-cols-12">
                  <div className="md:col-span-3">
                    <p className="text-foreground/50 font-mono text-xs uppercase tracking-wider">
                      {credit.role.charAt(0).toUpperCase() + credit.role.slice(1)}
                    </p>
                  </div>
                  <div className="md:col-span-9">
                    <p className="text-foreground text-base">{credit.name}</p>
                    {credit.organization && (
                      <p className="text-foreground/60 text-sm mt-xs">{credit.organization}</p>
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
        <ShareBlock
          title={article.title}
          url={`/journal/${article.id}`}
        />
      </Section>
    </>
  );
}
