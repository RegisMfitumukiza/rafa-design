import type { Route } from "next";

import Link from "next/link";

import { Image } from "@/components/media/Image";
import type { Project } from "@/content/projects";

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
  return (
    <Link
      href={`/projects/${project.slug}` as Route}
      className="group relative block w-full overflow-hidden"
      aria-label={`View featured project: ${project.title}`}
    >
      {/* Photography — fills container, parallax on hover */}
      <div className="relative aspect-[16/9] overflow-hidden md:aspect-[21/9] lg:aspect-[3/1]">
        <Image
          asset={project.heroImage}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out motion-safe:group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1440px"
          priority
        />

        {/* Gradient — bottom-heavy for title legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/0 transition-opacity duration-700 group-hover:opacity-90"
        />

        {/* Featured overline — top left */}
        <div className="top-md left-md absolute z-10">
          <p className="font-mono text-[9px] tracking-[0.2em] text-white/50 uppercase">
            Featured Commission
          </p>
        </div>

        {/* Title composition — bottom left */}
        <div className="p-md md:p-xl absolute right-0 bottom-0 left-0 z-10">
          {/* Metadata overline */}
          <p className="mb-xs md:mb-sm font-mono text-[10px] tracking-widest text-white/50 uppercase">
            {project.year}
            {project.location && ` · ${project.location.city}, ${project.location.country}`}
            {project.typology && ` · ${project.typology}`}
          </p>

          {/* Title */}
          <h2 className="max-w-3xl text-3xl leading-[0.95] font-medium tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {project.title}
          </h2>

          {/* Subtitle — reveals only on hover via opacity */}
          {project.subtitle && (
            <p className="mt-xs md:mt-sm max-w-lg translate-y-2 text-sm leading-relaxed font-light text-white/0 transition-all duration-700 group-hover:translate-y-0 group-hover:text-white/60">
              {project.subtitle}
            </p>
          )}

          {/* Architectural CTA */}
          <p className="mt-sm font-mono text-[10px] tracking-[0.2em] text-white/0 uppercase transition-all duration-500 group-hover:text-white/50">
            View Project →
          </p>
        </div>
      </div>
    </Link>
  );
}
