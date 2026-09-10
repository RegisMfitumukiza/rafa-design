"use client";

import { useState } from "react";

import { Section } from "@/components/layout/Section";
import { Image } from "@/components/media/Image";
import type { ChapterImage } from "@/content/projects";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { ImageReveal, Reveal } from "@/motion";

import { ProjectLightbox } from "./project-lightbox";

// Intent label map
const intentLabels: Record<NonNullable<ChapterImage["intent"]>, string> = {
  "design-intent": "DESIGN INTENT",
  "spatial-experience": "SPATIAL EXPERIENCE",
  materiality: "MATERIALITY",
  "site-relationship": "SITE & CONTEXT",
  environmental: "ENVIRONMENTAL STRATEGY",
  construction: "CONSTRUCTION INSIGHT",
};

interface ProjectGalleryProps {
  images: ImageAsset[];
  className?: string;
}

export function ProjectGallery({ images, className }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Use divide styling instead of space-y to avoid extra top margin on first image */}
      <div className={cn("gap-2xl flex flex-col", className)}>
        {images.map((image, i) => {
          const img = image as ChapterImage;
          const isFullBleed = img.fullBleed === true;

          if (isFullBleed) {
            return (
              <div key={i}>
                <Section container="full" noPadding>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="group relative block w-full cursor-zoom-in"
                    aria-label={`View full screen: ${img.alt}`}
                  >
                    <ImageReveal>
                      <Image
                        asset={img}
                        className="aspect-hero w-full object-cover"
                        sizes="100vw"
                      />
                    </ImageReveal>
                    {/* Hover cue */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                    <span className="bottom-md right-md text-overline absolute font-mono tracking-widest text-white/0 uppercase transition-colors duration-300 group-hover:text-white/60">
                      EXPAND ↗
                    </span>
                  </button>
                </Section>
                {(img.narrative || img.caption) && (
                  <Reveal>
                    <div className="mt-md px-md mx-auto max-w-2xl">
                      {img.intent && (
                        <p className="text-foreground/40 mb-xs text-overline font-mono tracking-widest uppercase">
                          {intentLabels[img.intent]}
                        </p>
                      )}
                      {img.narrative && (
                        <p className="text-foreground/60 text-sm leading-relaxed italic">
                          {img.narrative}
                        </p>
                      )}
                      {img.caption && (
                        <p className="text-foreground/35 mt-xs text-label font-mono">
                          {img.caption}
                        </p>
                      )}
                    </div>
                  </Reveal>
                )}
              </div>
            );
          }

          // Contained image — with or without narrative side-note
          const hasNarrative = Boolean(img.narrative);

          return (
            <div key={i}>
              <Reveal>
                <div
                  className={cn(
                    "gap-lg items-start",
                    hasNarrative ? "md:grid md:grid-cols-12" : "",
                  )}
                >
                  {/* Image */}
                  <div className={hasNarrative ? "md:col-span-8" : ""}>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className="group relative block w-full cursor-zoom-in"
                      aria-label={`View full screen: ${img.alt}`}
                    >
                      <ImageReveal>
                        <Image
                          asset={img}
                          className="aspect-landscape w-full rounded-sm object-cover"
                          sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 70vw, 960px"
                          loading="lazy"
                        />
                      </ImageReveal>
                      <div className="absolute inset-0 rounded-sm bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                      <span className="bottom-xs right-xs text-micro absolute font-mono tracking-widest text-white/0 uppercase transition-colors duration-300 group-hover:text-white/60">
                        EXPAND ↗
                      </span>
                    </button>
                    {img.caption && !img.narrative && (
                      <p className="text-foreground/35 mt-xs text-label font-mono">{img.caption}</p>
                    )}
                  </div>

                  {/* Narrative side-note */}
                  {hasNarrative && (
                    <div className="mt-md md:col-span-3 md:col-start-10 md:mt-0 md:flex md:flex-col md:justify-center">
                      {img.intent && (
                        <p className="text-foreground/40 mb-xs text-overline font-mono tracking-widest uppercase">
                          {intentLabels[img.intent]}
                        </p>
                      )}
                      <p className="text-foreground/60 text-sm leading-relaxed italic">
                        {img.narrative}
                      </p>
                      {img.caption && (
                        <p className="text-foreground/35 mt-xs text-label font-mono">
                          {img.caption}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>

      {/* Lightbox portal */}
      {lightboxIndex !== null && (
        <ProjectLightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
