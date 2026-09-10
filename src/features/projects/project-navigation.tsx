import type { Route } from "next";

import Link from "next/link";

import { Image } from "@/components/media/Image";
import { Heading } from "@/components/typography/Heading";
import type { Project } from "@/content/projects";
import { Reveal } from "@/motion";

interface ProjectNavigationProps {
  prev: Project | undefined;
  next: Project | undefined;
  className?: string;
}

export function ProjectNavigation({ prev, next, className = "" }: ProjectNavigationProps) {
  if (!prev && !next) return null;

  return (
    <div className={className}>
      {/* Cinematic NEXT project — full-width panel */}
      {next && (
        <Reveal>
          <Link
            href={`/projects/${next.slug}` as Route}
            className="group relative block w-full overflow-hidden"
            aria-label={`Next project: ${next.title}`}
          >
            {/* Background hero image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[21/9]">
              <Image
                asset={next.heroImage}
                sizes="100vw"
                fill
                className="h-full w-full"
                imgClassName="object-cover transition-transform duration-1000 ease-out motion-safe:group-hover:scale-[1.02]"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/55 transition-colors duration-700 group-hover:bg-black/45" />

              {/* Text content - anchored to bottom-left */}
              <div className="p-md sm:px-lg sm:pb-xl md:px-xl md:pb-2xl lg:px-3xl lg:pb-3xl absolute right-0 bottom-0 left-0">
                <p className="mb-xs md:mb-sm font-mono text-[10px] tracking-widest text-white/50 uppercase">
                  Continue Reading — Next Project
                </p>
                <Heading
                  as="h2"
                  variant="h1"
                  className="font-display max-w-3xl text-2xl leading-[0.95] tracking-tight text-white transition-transform duration-700 motion-safe:group-hover:-translate-y-1 sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  {next.title}
                </Heading>
                {next.subtitle && (
                  <p className="mt-xs md:mt-sm max-w-xl text-xs font-light text-white/70 sm:text-sm md:text-base">
                    {next.subtitle}
                  </p>
                )}
                <div className="mt-xs sm:mt-sm md:mt-md gap-xs flex flex-wrap items-center font-mono text-[10px] tracking-widest text-white/40 uppercase md:text-[11px]">
                  <span>
                    {next.location.city}, {next.location.country}
                  </span>
                  <span className="text-white/20">·</span>
                  <span>{next.year}</span>
                  {next.typology && Array.isArray(next.typology) && next.typology.length > 0 && (
                    <>
                      <span className="text-white/20">·</span>
                      <span>{next.typology.join(", ")}</span>
                    </>
                  )}
                </div>

                {/* Arrow CTA */}
                <div className="mt-md md:mt-lg">
                  <span className="inline-block font-mono text-xs text-white/60 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white md:text-sm">
                    View Project →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      )}

      {/* Previous project — always shown as a quiet strip when it exists */}
      {prev && (
        <Reveal>
          <div className="border-border/20 py-md flex items-center justify-between border-t px-[var(--container-gutter)]">
            <Link
              href={`/projects/${prev.slug}` as Route}
              className="group gap-sm inline-flex items-center transition-opacity hover:opacity-100"
              aria-label={`Previous project: ${prev.title}`}
            >
              <span className="text-foreground/40 group-hover:text-foreground font-mono text-[10px] tracking-widest uppercase transition-colors">
                ← Previous
              </span>
              <span className="text-foreground/60 group-hover:text-foreground font-mono text-xs transition-colors">
                {prev.title}
              </span>
            </Link>
            {/* Year + location metadata */}
            <span className="text-foreground/30 hidden font-mono text-[10px] tracking-widest uppercase sm:block">
              {prev.year} · {prev.location.city}
            </span>
          </div>
        </Reveal>
      )}
    </div>
  );
}
