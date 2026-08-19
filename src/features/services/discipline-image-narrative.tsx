"use client";

import { Image } from "@/components/media/Image";
import type { ChapterImage } from "@/content/projects";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { ImageReveal, Reveal } from "@/motion";

interface NarrativeImage {
  image: ChapterImage | ImageAsset;
  caption?: string | undefined;
  narrative?: string | undefined;
}

interface DisciplineImageNarrativeProps {
  /** Up to 5 discipline-filtered gallery images with caption + narrative */
  images: NarrativeImage[];
  className?: string | undefined;
}

/**
 * DisciplineImageNarrative
 *
 * An editorial image story using asymmetric monograph compositions.
 * Images are pre-filtered by discipline intent before being passed in,
 * so Interior Design only receives spatial/material images, Landscape
 * only receives site/environmental images, etc.
 *
 * Five compositional patterns (used in order, skipped if no image):
 *
 *   01 — Full-width cinematic opener        (16:9 / 21:9)
 *   02 — 7/5 split: image left, text right  (4:3)
 *   03 — 5/7 reverse: text left, image right (4:3)
 *   04 — Full-width second moment           (16:9 / 21:9)
 *   05 — Centered narrow detail             (col-span-8 col-start-3, 4:3)
 */
export function DisciplineImageNarrative({ images, className }: DisciplineImageNarrativeProps) {
  if (images.length === 0) return null;

  const [first, second, third, fourth, fifth] = images;

  return (
    <div className={cn("w-full space-y-2xl", className)}>

      {/* ── 01: Full-width cinematic opener ── */}
      {first && (
        <div>
          <ImageReveal className="w-full">
            <Image
              asset={first.image}
              sizes="100vw"
              className="aspect-[16/9] w-full md:aspect-[21/9]"
              imgClassName="object-cover"
            />
          </ImageReveal>
          {(first.caption || first.narrative) && (
            <Reveal delay={0.1}>
              <div className="mt-sm gap-md grid md:grid-cols-12">
                <p className="text-foreground/30 font-mono text-[10px] tracking-widest uppercase md:col-span-1">
                  01
                </p>
                <div className="md:col-span-7">
                  {first.caption && (
                    <p className="text-foreground/50 font-mono text-[10px] tracking-widest uppercase">
                      {first.caption}
                    </p>
                  )}
                  {first.narrative && (
                    <p className="text-foreground/60 mt-xs text-sm leading-relaxed">
                      {first.narrative}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      )}

      {/* ── 02: 7/5 split — image left, caption right ── */}
      {second && (
        <div className="gap-md grid items-end md:grid-cols-12">
          <div className="md:col-span-7">
            <ImageReveal>
              <Image
                asset={second.image}
                sizes="(max-width: 48rem) 100vw, 58vw"
                className="aspect-[4/3] w-full"
                imgClassName="object-cover"
              />
            </ImageReveal>
          </div>
          {(second.caption || second.narrative) && (
            <Reveal delay={0.1} className="md:col-span-5 md:pb-sm">
              <p className="text-foreground/30 font-mono text-[10px] tracking-widest uppercase">
                02
              </p>
              {second.caption && (
                <p className="text-foreground/50 mt-xs font-mono text-[10px] tracking-widest uppercase">
                  {second.caption}
                </p>
              )}
              {second.narrative && (
                <p className="text-foreground/60 mt-sm text-sm leading-relaxed">
                  {second.narrative}
                </p>
              )}
            </Reveal>
          )}
        </div>
      )}

      {/* ── 03: 5/7 reverse — caption left, image right ── */}
      {third && (
        <div className="gap-md grid items-end md:grid-cols-12">
          {(third.caption || third.narrative) && (
            <Reveal delay={0.1} className="md:col-span-4 md:pb-sm">
              <p className="text-foreground/30 font-mono text-[10px] tracking-widest uppercase">
                03
              </p>
              {third.caption && (
                <p className="text-foreground/50 mt-xs font-mono text-[10px] tracking-widest uppercase">
                  {third.caption}
                </p>
              )}
              {third.narrative && (
                <p className="text-foreground/60 mt-sm text-sm leading-relaxed">
                  {third.narrative}
                </p>
              )}
            </Reveal>
          )}
          <div className={cn(third.caption || third.narrative ? "md:col-span-8" : "md:col-span-12")}>
            <ImageReveal>
              <Image
                asset={third.image}
                sizes="(max-width: 48rem) 100vw, 66vw"
                className="aspect-[4/3] w-full"
                imgClassName="object-cover"
              />
            </ImageReveal>
          </div>
        </div>
      )}

      {/* ── 04: Second full-width cinematic moment ── */}
      {fourth && (
        <div>
          <ImageReveal className="w-full">
            <Image
              asset={fourth.image}
              sizes="100vw"
              className="aspect-[16/9] w-full md:aspect-[21/9]"
              imgClassName="object-cover"
            />
          </ImageReveal>
          {(fourth.caption || fourth.narrative) && (
            <Reveal delay={0.1}>
              <div className="mt-sm gap-md grid md:grid-cols-12">
                <p className="text-foreground/30 font-mono text-[10px] tracking-widest uppercase md:col-span-1">
                  04
                </p>
                <div className="md:col-span-7">
                  {fourth.caption && (
                    <p className="text-foreground/50 font-mono text-[10px] tracking-widest uppercase">
                      {fourth.caption}
                    </p>
                  )}
                  {fourth.narrative && (
                    <p className="text-foreground/60 mt-xs text-sm leading-relaxed">
                      {fourth.narrative}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      )}

      {/* ── 05: Centered narrow detail — intimate close-up ── */}
      {fifth && (
        <div className="gap-md grid md:grid-cols-12">
          <div className="md:col-span-8 md:col-start-3">
            <ImageReveal>
              <Image
                asset={fifth.image}
                sizes="(max-width: 48rem) 100vw, 66vw"
                className="aspect-[4/3] w-full"
                imgClassName="object-cover"
              />
            </ImageReveal>
            {(fifth.caption || fifth.narrative) && (
              <Reveal delay={0.1}>
                <div className="mt-sm">
                  <p className="text-foreground/30 font-mono text-[10px] tracking-widest uppercase">
                    05
                  </p>
                  {fifth.caption && (
                    <p className="text-foreground/50 mt-xs font-mono text-[10px] tracking-widest uppercase">
                      {fifth.caption}
                    </p>
                  )}
                  {fifth.narrative && (
                    <p className="text-foreground/60 mt-xs text-sm leading-relaxed">
                      {fifth.narrative}
                    </p>
                  )}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
