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
  typology?: string | undefined;
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
    <div className={cn("relative h-svh overflow-hidden", className)}>
      {/* Parallax image layer — scales up and scrolls slower to create depth */}
      <Parallax className="absolute inset-0 h-full w-full" speed={0.15}>
        <Image
          asset={heroImage}
          className="h-full w-full object-cover scale-110"
          sizes="100vw"
          priority
        />
      </Parallax>

      {/* Dark gradient — bottom heavy for title legibility, light at top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/35 pointer-events-none"
      />

      {/* Top breadcrumb — fades into the image */}
      <div className="absolute top-md left-0 right-0 z-10 px-[var(--container-gutter)]">
        <div className="flex items-center gap-xs font-mono text-[10px] tracking-widest text-white/50">
          <Link
            href="/projects"
            className="hover:text-white/80 transition-colors underline-offset-4 hover:underline"
          >
            Projects
          </Link>
          <span className="text-white/30">→</span>
          <span className="text-white/70">{title}</span>
        </div>
      </div>

      {/* Bottom-left title composition */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-[var(--container-gutter)] pb-xl">
        {/* Overline metadata */}
        <p className="text-white/55 font-mono text-[10px] tracking-widest uppercase mb-sm">
          {year}
          {locationCity && ` · ${locationCity}, ${locationCountry}`}
          {typology && ` · ${typology}`}
        </p>

        {/* Monumental title */}
        <h1 className="text-white text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.92] max-w-4xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-white/65 text-lg font-light mt-md max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Photographer credit — bottom right */}
      {photographerCredit && (
        <p className="absolute bottom-md right-[var(--container-gutter)] z-10 font-mono text-[10px] tracking-widest text-white/35">
          Photography: {photographerCredit}
        </p>
      )}
    </div>
  );
}
