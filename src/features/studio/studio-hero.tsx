"use client";

import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { Image } from "@/components/media/Image";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { ImageReveal, Reveal } from "@/motion";

interface StudioHeroProps {
  image: ImageAsset;
  overline: string;
  name: string;
  manifesto?: string | undefined;
  introduction?: string | undefined;
  caption?: string | undefined;
  className?: string;
}

/**
 * StudioHero
 *
 * Unified Editorial Monograph Opener for the Studio page (Pattern B).
 *
 * Features:
 * 1. Clean 12-column header: breadcrumb, monumental title on the left;
 *    overline, manifesto, and studio conviction narrative on the right.
 * 2. Uncropped photographic plate: responsive 16:10 to 16:9 preserving
 *    the complete architectural subject (roof, ground, and context).
 * 3. Horizontal caption and monograph credit bar directly beneath the plate.
 */
export function StudioHero({
  image,
  overline,
  name,
  manifesto,
  introduction,
  caption,
  className,
}: StudioHeroProps) {
  const displayCaption = caption || image.caption;

  return (
    <div className={cn("w-full", className)}>
      {/* ── 1. EDITORIAL 12-COLUMN HEADER (Pattern B — 6/6 split) ── */}
      <Section container="wide" className="pt-md pb-md md:pb-lg">
        <Reveal visible>
          <div className="gap-x-xl gap-y-md grid items-start md:grid-cols-12">
            {/* Left 6 cols: Breadcrumb back link + Monumental Studio Title */}
            <div className="md:col-span-6 lg:col-span-6">
              <Link
                href="/"
                className="group text-foreground/40 hover:text-foreground mb-sm inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase transition-colors"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
                <span>Index</span>
                <span className="text-foreground/20">{"//"}</span>
                <span>Studio</span>
              </Link>
              <h1 className="font-display text-foreground mt-xs text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {name}
              </h1>
            </div>

            {/* Right 6 cols: Studio Overline, Manifesto & Introduction */}
            <div className="md:pt-md flex flex-col justify-between md:col-span-6 lg:col-span-6">
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                {overline}
              </p>
              {manifesto && (
                <h2 className="font-display text-foreground/90 mt-xs text-xl leading-snug font-medium tracking-tight text-balance sm:text-2xl lg:text-3xl">
                  &ldquo;{manifesto}&rdquo;
                </h2>
              )}
              {introduction && (
                <p className="text-foreground/65 mt-sm text-sm leading-relaxed text-balance md:text-base">
                  {introduction}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── 2. CINEMATIC UNCLIPPED HERO PHOTOGRAPHIC PLATE ── */}
      <Section container="wide">
        <ImageReveal className="w-full" visible>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm lg:aspect-[16/9]">
            <Image
              asset={image}
              fill
              className="h-full w-full"
              imgClassName="object-cover w-full h-full object-center"
              sizes="100vw"
              priority
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </ImageReveal>

        {/* Clean, horizontal caption and credit bar directly beneath the plate */}
        <Reveal delay={0.1}>
          <div className="mt-sm gap-md flex items-baseline justify-between">
            <p className="text-foreground/50 font-mono text-[10px] tracking-widest uppercase">
              {displayCaption
                ? `01 // ${displayCaption}`
                : "01 // Kigali Studio — Atelier & Archives"}
            </p>
            <p className="text-foreground/35 font-mono text-[10px] tracking-widest uppercase">
              RAFA Design Hub // Studio
            </p>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
