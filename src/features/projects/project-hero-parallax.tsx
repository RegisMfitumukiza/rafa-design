"use client";

import Link from "next/link";

import { Image } from "@/components/media/Image";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { Parallax } from "@/motion";

interface ProjectHeroParallaxProps {
  heroImage: ImageAsset;
  title: string;
  subtitle?: string | undefined;
  year: number;
  locationCity: string;
  locationCountry: string;
  typology?: string[] | undefined;
  photographerCredit?: string | undefined;
  className?: string | undefined;
}

/**
 * ProjectHeroParallax
 *
 * A full-viewport cinematic opening composition for the project detail page.
 * Merges the project title + hero photography into one monumental opening frame.
 *
 * The hero image scrolls at a reduced speed via the Parallax motion component,
 * creating physical depth and cinematic weight. The title is anchored to the
 * bottom-left of the viewport with a gradient underlay for legibility.
 */
export function ProjectHeroParallax({
  heroImage,
  title,
  subtitle,
  year,
  locationCity,
  locationCountry,
  typology,
  photographerCredit,
  className,
}: ProjectHeroParallaxProps) {
  return (
    <div
      className={cn(
        "relative h-[calc(100svh-var(--header-height))] min-h-[520px] w-full overflow-hidden",
        className,
      )}
    >
      {/* Parallax image layer — scales up and scrolls slower to create depth */}
      <Parallax className="absolute inset-0 h-full w-full" speed={0.15}>
        <Image
          asset={heroImage}
          fill
          className="h-full w-full object-cover"
          imgClassName="object-cover w-full h-full"
          sizes="100vw"
          priority
          loading="eager"
          fetchPriority="high"
        />
      </Parallax>

      {/* Top gradient scrim — guarantees contrast for breadcrumb & top bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent"
      />

      {/* Dark gradient — bottom heavy for title legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
      />

      {/* Content container — vertical space distribution */}
      <div className="absolute inset-0 z-10 flex flex-col px-[var(--container-gutter)]">
        {/* Top breadcrumb — frosted architectural pill */}
        <div className="pt-sm sm:pt-md pb-xs">
          <div className="text-overline inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono tracking-widest text-white/70 uppercase backdrop-blur-md">
            <Link
              href="/projects"
              className="underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Projects
            </Link>
            <span className="text-white/30" aria-hidden="true">
              →
            </span>
            <span className="max-w-[180px] truncate font-medium text-white/95 sm:max-w-none">
              {title}
            </span>
          </div>
        </div>

        {/* Spacer - pushes content to bottom */}
        <div className="flex-1" />

        {/* Bottom title composition */}
        <div className="pb-md sm:pb-lg md:pb-xl">
          {/* Overline metadata */}
          <p className="mb-xs md:mb-sm text-overline font-mono tracking-widest text-white/60 uppercase [text-shadow:_0_1px_12px_rgba(0,0,0,0.9)]">
            {year}
            {locationCity && ` · ${locationCity}, ${locationCountry}`}
            {typology &&
              Array.isArray(typology) &&
              typology.length > 0 &&
              ` · ${typology.join(", ")}`}
          </p>

          {/* Monumental title with design system display font */}
          <h1 className="font-display max-w-4xl text-3xl leading-[0.95] font-medium tracking-tight text-white [text-shadow:_0_2px_16px_rgba(0,0,0,0.8),_0_4px_32px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-xs md:mt-sm max-w-2xl text-sm leading-relaxed font-light text-white/80 [text-shadow:_0_1px_8px_rgba(0,0,0,0.8)] sm:text-base md:text-lg">
              {subtitle}
            </p>
          )}

          {/* Photographer credit — inline on mobile */}
          {photographerCredit && (
            <p className="mt-xs text-micro font-mono tracking-widest text-white/45 uppercase md:hidden">
              Photography: {photographerCredit}
            </p>
          )}
        </div>
      </div>

      {/* Photographer credit — bottom right on desktop */}
      {photographerCredit && (
        <p className="bottom-md text-overline absolute right-[var(--container-gutter)] z-10 hidden font-mono tracking-widest text-white/40 uppercase md:block">
          Photography: {photographerCredit}
        </p>
      )}
    </div>
  );
}
