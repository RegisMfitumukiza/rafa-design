"use client";

import type { Route } from "next";

import Link from "next/link";

import { Image } from "@/components/media/Image";
import type { Project } from "@/content/projects";
import { useImageBrightness, getOverlayOpacity } from "@/hooks/use-image-brightness";
import { cn } from "@/lib/cn";

interface FeaturedProjectCardProps {
  project: Project;
}

/**
 * FeaturedProjectCard
 *
 * The cinematic opening card of the project archive — always the first commission.
 * Renders at full viewport width with the title and metadata overlaid directly
 * on the photography, rather than positioned below it.
 *
 * This is intentionally separate from ProjectCard to avoid conditional complexity.
 */
export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  // Analyze image brightness to adjust overlay dynamically
  const imageUrl = project.heroImage?.src;
  const { brightness } = useImageBrightness(imageUrl);
  const overlayClasses = getOverlayOpacity(brightness);

  return (
    <Link
      href={`/projects/${project.slug}` as Route}
      className="group relative block w-full overflow-hidden"
      aria-label={`View featured project: ${project.title}`}
    >
      {/* Photography — fills container, parallax on hover */}
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1]">
        <Image
          asset={project.heroImage}
          fill
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out motion-safe:group-hover:scale-[1.04]"
          sizes="100vw"
          priority={true}
          loading="eager"
          fetchPriority="high"
        />

        {/* Top gradient scrim — guarantees contrast for top metadata on light imagery */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent"
        />

        {/* Gradient — bottom-heavy for title legibility, dynamically adjusted */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-gradient-to-t transition-opacity duration-700 group-hover:opacity-100",
            overlayClasses.gradient,
          )}
        />

        {/* Featured architectural badge — top left */}
        <div className="top-sm left-sm sm:top-md sm:left-md absolute z-10">
          <span className="text-micro inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 font-mono tracking-[0.2em] text-white/90 uppercase backdrop-blur-md [text-shadow:_0_1px_4px_rgba(0,0,0,0.8)]">
            <span className="h-1.5 w-1.5 rounded-full bg-white/90" aria-hidden="true" />
            Featured Commission
          </span>
        </div>

        {/* Title composition — bottom left */}
        <div className="p-sm sm:p-lg md:p-xl absolute right-0 bottom-0 left-0 z-10">
          {/* Additional backdrop for text area - dynamically adjusted */}
          <div
            aria-hidden="true"
            className={cn("absolute inset-0 -z-10 bg-gradient-to-t", overlayClasses.backdrop)}
          />

          {/* Metadata overline */}
          <p className="mb-xs md:mb-sm text-overline font-mono tracking-widest text-white/60 uppercase [text-shadow:_0_1px_12px_rgba(0,0,0,0.9),_0_2px_4px_rgba(0,0,0,1)]">
            {project.year}
            {project.location && ` · ${project.location.city}, ${project.location.country}`}
            {project.typology &&
              Array.isArray(project.typology) &&
              project.typology.length > 0 &&
              ` · ${project.typology.join(", ")}`}
          </p>

          {/* Title with enhanced text shadow and design system display font */}
          <h2 className="font-display max-w-3xl text-2xl leading-[0.95] font-medium tracking-tight text-white [text-shadow:_0_2px_16px_rgba(0,0,0,0.8),_0_4px_32px_rgba(0,0,0,0.6),_0_1px_4px_rgba(0,0,0,0.9)] sm:text-4xl md:text-5xl lg:text-6xl">
            {project.title}
          </h2>

          {/* Subtitle — always clearly visible with editorial elegance, brightens on hover */}
          {project.subtitle && (
            <p className="mt-xs md:mt-sm max-w-lg text-xs leading-relaxed font-light text-white/80 transition-colors duration-300 [text-shadow:_0_1px_8px_rgba(0,0,0,0.8)] group-hover:text-white sm:text-sm md:text-base">
              {project.subtitle}
            </p>
          )}

          {/* Architectural CTA — clean monospace indicator with animated arrow */}
          <div className="mt-xs sm:mt-sm text-overline flex items-center gap-1.5 font-mono tracking-[0.2em] text-white/70 uppercase transition-colors duration-300 [text-shadow:_0_1px_8px_rgba(0,0,0,0.8)] group-hover:text-white">
            <span>View Project</span>
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
