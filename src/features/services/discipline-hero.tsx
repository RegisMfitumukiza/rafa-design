"use client";

import type { Route } from "next";

import Link from "next/link";

import { Image } from "@/components/media/Image";
import type { Project } from "@/content/projects";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";
import { ImageReveal, Reveal } from "@/motion";

interface DisciplineHeroProps {
  service: Service;
  /** First related project — provides the lead image and credit */
  leadProject: Project | undefined;
  className?: string | undefined;
}

/**
 * DisciplineHero
 *
 * Cinematic full-width lead image anchoring the discipline monograph.
 * Placed immediately after the editorial 12-column header.
 *
 * - 16:9 aspect ratio — publication quality, not a card
 * - ImageReveal clip-path animation on scroll entry
 * - Photographer credit + project reference in faint monospace caption
 * - Graceful bg-muted fallback when no project image exists
 */
export function DisciplineHero({ service, leadProject, className }: DisciplineHeroProps) {
  // Use CMS order field if available, else fallback label
  const index = service.order ? String(service.order).padStart(2, "0") : service.slug;
  // Use the service's coverImage (already resolved from Sanity: explicit or first project heroImage)
  // or the leadProject heroImage, whichever is available
  const image = service.coverImage ?? leadProject?.heroImage;
  const customCaption = service.coverImage?.caption;
  const credit = service.coverImage?.credit ?? leadProject?.photographerCredit;
  const projectSlug = leadProject?.slug;
  const projectTitle = leadProject?.title;
  const projectLocation = leadProject
    ? `${leadProject.location.city}, ${leadProject.location.country}`
    : null;
  const projectYear = leadProject?.year;

  return (
    <div className={cn("w-full", className)}>
      {/* Cinematic lead image */}
      <ImageReveal className="w-full" visible>
        {image ? (
          <Image
            asset={image}
            fill
            sizes="100vw"
            priority
            className="aspect-[16/9] w-full md:aspect-[21/9]"
            imgClassName="object-cover"
          />
        ) : (
          <div
            className="bg-muted aspect-[16/9] w-full md:aspect-[21/9]"
            role="img"
            aria-label={`${service.title} practice — image unavailable`}
          />
        )}
      </ImageReveal>

      {/* Caption row */}
      <Reveal delay={0.15} className="w-full min-w-0">
        <div className="mt-sm gap-x-md gap-y-xs flex w-full min-w-0 flex-wrap items-baseline justify-between">
          {/* Left: custom caption OR project reference link */}
          {customCaption ? (
            <span className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
              {index} {"//"} {service.title} — {customCaption}
            </span>
          ) : leadProject && projectSlug ? (
            <Link
              href={`/projects/${projectSlug}` as Route}
              className="group text-foreground/40 hover:text-foreground/70 gap-xs text-overline inline-flex items-center font-mono tracking-widest uppercase transition-colors"
            >
              <span>
                {index} {"//"} {service.title}
                {projectTitle && ` — ${projectTitle}`}
                {projectLocation && ` — ${projectLocation}`}
                {projectYear && ` · ${projectYear}`}
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                ↗
              </span>
            </Link>
          ) : (
            <span className="text-foreground/30 text-overline font-mono tracking-widest uppercase">
              {index} {"//"} {service.title}
            </span>
          )}

          {/* Right: credit */}
          {credit && (
            <span className="text-foreground/30 text-overline shrink-0 font-mono tracking-widest uppercase">
              {credit.toLowerCase().includes("photo") ||
              credit.toLowerCase().includes("render") ||
              credit.toLowerCase().includes("visual") ||
              credit.toLowerCase().includes("cgi")
                ? credit
                : `Photography // ${credit}`}
            </span>
          )}
        </div>
      </Reveal>
    </div>
  );
}
