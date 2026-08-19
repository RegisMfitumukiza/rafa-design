"use client";

import { useState } from "react";

import { Section } from "@/components/layout/Section";
import { Image } from "@/components/media/Image";
import { Text } from "@/components/typography/Text";
import type { ChapterImage, ProjectChapter } from "@/content/projects";
import { ProjectLightbox } from "@/features/projects/project-lightbox";
import { cn } from "@/lib/cn";
import { ImageReveal, Reveal } from "@/motion";

interface ProjectChapterBlockProps {
  chapter: ProjectChapter;
  index: number;
  className?: string;
}

// Intent label map — concise, editorial
const intentLabels: Record<NonNullable<ChapterImage["intent"]>, string> = {
  "design-intent": "DESIGN INTENT",
  "spatial-experience": "SPATIAL EXPERIENCE",
  materiality: "MATERIALITY",
  "site-relationship": "SITE & CONTEXT",
  environmental: "ENVIRONMENTAL STRATEGY",
  construction: "CONSTRUCTION INSIGHT",
};

export function ProjectChapterBlock({ chapter, index, className = "" }: ProjectChapterBlockProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const image = chapter.image as ChapterImage | undefined;
  const hasFullBleedImage = image?.fullBleed === true;
  const hasContainedImage = image && !hasFullBleedImage;
  const isEven = index % 2 === 0;

  return (
    <div className={cn("py-md md:py-lg", className)}>
      {/* CASE A: Contained Image + Chapter Text — Integrated 2-Column Split Layout */}
      {hasContainedImage && image ? (
        <Section container="standard" noPadding className="py-md">
          <Reveal delay={index * 0.05}>
            <div className="gap-xl grid items-center md:grid-cols-12">
              {/* Image Column (Column 7 on desktop, alternating left/right) */}
              <div
                className={cn(
                  "md:col-span-7",
                  !isEven && "md:order-2",
                )}
              >
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="block w-full cursor-zoom-in group relative text-left"
                  aria-label={`View full screen image: ${image.alt}`}
                >
                  <ImageReveal>
                    <Image
                      asset={image}
                      className="aspect-[4/3] w-full rounded-sm object-cover"
                      sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 60vw, 864px"
                    />
                  </ImageReveal>
                  <div className="absolute inset-0 rounded-sm bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  <span className="absolute bottom-xs right-xs font-mono text-[9px] tracking-widest text-white/0 group-hover:text-white/60 transition-colors duration-300 uppercase">
                    EXPAND ↗
                  </span>
                </button>
                {image.caption && (
                  <p className="text-foreground/35 mt-xs font-mono text-[11px]">{image.caption}</p>
                )}
              </div>

              {/* Text & Narrative Column (Column 5 on desktop) */}
              <div
                className={cn(
                  "md:col-span-5 flex flex-col justify-center",
                  !isEven && "md:order-1",
                )}
              >
                {/* Heading / Intent label */}
                <div className="mb-xs flex flex-wrap items-center gap-xs">
                  {chapter.heading && (
                    <span className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                      {chapter.heading}
                    </span>
                  )}
                  {chapter.heading && image.intent && (
                    <span className="text-foreground/20 font-mono text-[10px]">·</span>
                  )}
                  {image.intent && (
                    <span className="text-accent font-mono text-[10px] tracking-widest uppercase">
                      {intentLabels[image.intent]}
                    </span>
                  )}
                </div>

                {/* Chapter Body */}
                <Text
                  variant="body"
                  className="text-foreground/85 text-base leading-relaxed sm:text-lg"
                >
                  {chapter.body}
                </Text>

                {/* Image narrative note if present */}
                {image.narrative && (
                  <p className="border-border/30 text-foreground/60 mt-md border-l-2 pl-md font-serif text-sm leading-relaxed italic">
                    {image.narrative}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </Section>
      ) : (
        /* CASE B: Text Only or Full-Bleed Image Chapter */
        <>
          {/* Text block */}
          <Section container="narrow" noPadding className="py-md">
            <Reveal delay={index * 0.05}>
              {chapter.heading && (
                <p className="text-foreground/40 mb-xs font-mono text-[10px] tracking-widest uppercase">
                  {chapter.heading}
                </p>
              )}
              <Text
                variant="body"
                className="text-foreground/85 text-base leading-relaxed sm:text-lg md:text-xl"
              >
                {chapter.body}
              </Text>
            </Reveal>
          </Section>

          {/* Full-bleed chapter image */}
          {hasFullBleedImage && image && (
            <Section container="full" noPadding className="my-md">
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="block w-full cursor-zoom-in group relative text-left"
                aria-label={`View full screen image: ${image.alt}`}
              >
                <ImageReveal>
                  <Image asset={image} className="aspect-hero w-full object-cover" sizes="100vw" />
                </ImageReveal>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <span className="absolute bottom-md right-md font-mono text-[10px] tracking-widest text-white/0 group-hover:text-white/60 transition-colors duration-300 uppercase">
                  EXPAND ↗
                </span>
              </button>
              {image.narrative && (
                <Reveal>
                  <div className="container-standard mt-sm flex flex-col md:flex-row md:items-baseline justify-between gap-md border-border/20 border-b pb-md">
                    {image.intent && (
                      <span className="text-accent font-mono text-[10px] tracking-widest uppercase flex-shrink-0">
                        {intentLabels[image.intent]}
                      </span>
                    )}
                    <p className="text-foreground/70 text-sm leading-relaxed italic max-w-3xl">
                      {image.narrative}
                      {image.caption && (
                        <span className="text-foreground/40 ml-xs font-mono text-[11px] not-italic">
                          — {image.caption}
                        </span>
                      )}
                    </p>
                  </div>
                </Reveal>
              )}
            </Section>
          )}
        </>
      )}

      {/* Lightbox modal when user clicks chapter image */}
      {isLightboxOpen && image && (
        <ProjectLightbox
          images={[image]}
          currentIndex={0}
          onClose={() => setIsLightboxOpen(false)}
          onNavigate={() => {}}
        />
      )}
    </div>
  );
}

