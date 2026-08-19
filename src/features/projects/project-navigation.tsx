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
            className="group relative block overflow-hidden"
            aria-label={`Next project: ${next.title}`}
          >
            {/* Background hero image */}
            <div className="relative aspect-[21/9] w-full">
              <Image
                asset={next.heroImage}
                sizes="100vw"
                className="h-full w-full transition-transform duration-1000 ease-out motion-safe:group-hover:scale-[1.02]"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/55 transition-colors duration-700 group-hover:bg-black/45" />

              {/* Text content */}
              <div className="p-lg md:p-2xl absolute inset-0 flex flex-col justify-end">
                <p className="mb-sm font-mono text-[10px] tracking-widest text-white/50 uppercase">
                  Continue Reading — Next Project
                </p>
                <Heading
                  as="h2"
                  variant="h1"
                  className="max-w-2xl tracking-tight text-white transition-transform duration-700 motion-safe:group-hover:-translate-y-1"
                >
                  {next.title}
                </Heading>
                {next.subtitle && (
                  <p className="mt-xs text-base font-light text-white/60">{next.subtitle}</p>
                )}
                <div className="mt-md gap-xs flex items-center font-mono text-[11px] tracking-widest text-white/40 uppercase">
                  <span>
                    {next.location.city}, {next.location.country}
                  </span>
                  <span className="text-white/20">·</span>
                  <span>{next.year}</span>
                  {next.typology && (
                    <>
                      <span className="text-white/20">·</span>
                      <span>{next.typology}</span>
                    </>
                  )}
                </div>

                {/* Arrow */}
                <div className="mt-lg">
                  <span className="inline-block font-mono text-sm text-white/60 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white">
                    View Project →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      )}

      {/* Previous project — minimal quiet link, only if no next */}
      {prev && !next && (
        <Reveal>
          <div className="border-border py-xl border-t">
            <Link
              href={`/projects/${prev.slug}` as Route}
              className="group gap-sm inline-flex items-center"
            >
              <span className="text-foreground/40 group-hover:text-foreground font-mono text-sm transition-colors">
                ← {prev.title}
              </span>
            </Link>
          </div>
        </Reveal>
      )}
    </div>
  );
}
