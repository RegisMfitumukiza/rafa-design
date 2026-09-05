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
  caption?: string | undefined;
  className?: string;
}

/**
 * StudioHero
 *
 * Editorial Monograph Layout for the Studio page (Pattern B).
 *
 * Features:
 * 1. Clean 12-column header: breadcrumb, monumental title, and overline.
 * 2. Uncropped photographic plate: 16:9 (mobile) to 21:9 (desktop) with full
 *    architectural clarity — no dark gradient scrims covering the building.
 * 3. Horizontal caption bar underneath the plate with studio index and archive note.
 */
export function StudioHero({ image, overline, name, caption, className }: StudioHeroProps) {
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

            {/* Right 6 cols: Studio Overline & Positioning */}
            <div className="md:pt-md flex flex-col justify-between md:col-span-6 lg:col-span-6">
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                {overline}
              </p>
              <p className="text-foreground/70 mt-xs w-full text-xl leading-relaxed md:text-2xl">
                Kigali practice atelier — architecture that is quiet, considered, and rooted in its
                place.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── 2. CINEMATIC UNCLIPPED HERO PHOTOGRAPHIC PLATE ── */}
      <Section container="wide">
        <ImageReveal className="w-full" visible>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm md:aspect-[21/9]">
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
