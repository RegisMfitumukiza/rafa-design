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
    <div className={cn("relative h-svh w-full overflow-hidden", className)}>
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

      {/* Dark gradient — bottom heavy for title legibility, light at top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/35"
      />

      {/* Content container — vertical space distribution */}
      <div className="absolute inset-0 z-10 flex flex-col px-[var(--container-gutter)]">
        {/* Top breadcrumb */}
        <div className="pt-md pb-sm">
          <div className="gap-xs flex items-center font-mono text-[10px] tracking-widest text-white/50">
            <Link
              href="/projects"
              className="underline-offset-4 transition-colors hover:text-white/80 hover:underline"
            >
              Projects
            </Link>
            <span className="text-white/30">→</span>
            <span className="text-white/70">{title}</span>
          </div>
        </div>

        {/* Spacer - pushes content to bottom */}
        <div className="flex-1" />

        {/* Bottom title composition */}
        <div className="pb-lg md:pb-2xl">
          {/* Overline metadata */}
          <p className="mb-xs md:mb-sm font-mono text-[10px] tracking-widest text-white/55 uppercase">
            {year}
            {locationCity && ` · ${locationCity}, ${locationCountry}`}
            {typology &&
              Array.isArray(typology) &&
              typology.length > 0 &&
              ` · ${typology.join(", ")}`}
          </p>

          {/* Monumental title */}
          <h1 className="max-w-4xl text-4xl leading-[0.92] font-medium tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-xs md:mt-sm max-w-xl text-base leading-relaxed font-light text-white/65 md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Photographer credit — bottom right */}
      {photographerCredit && (
        <p className="pb-md md:pb-lg absolute right-[var(--container-gutter)] bottom-0 z-10 font-mono text-[10px] tracking-widest text-white/35">
          Photography: {photographerCredit}
        </p>
      )}
    </div>
  );
}
