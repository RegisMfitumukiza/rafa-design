"use client";

import type { Route } from "next";

import Link from "next/link";
import { useState } from "react";

import { Image } from "@/components/media/Image";
import { getProjectBySlug } from "@/content/projects";
import { getServiceIndex, type Service } from "@/content/services";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { Reveal } from "@/motion";

interface DisciplineIndexProps {
  services: Service[];
  defaultImage?: ImageAsset | undefined;
  className?: string | undefined;
}

const fallbackStudioAsset: ImageAsset = {
  src: "/images/studio/studio-atelier.jpg",
  alt: "RAFA Design Hub Practice Studio",
  caption: "RAFA Design Hub // Practice Atelier",
};

/**
 * DisciplineIndex
 *
 * Editorial ruled index of the studio's disciplines.
 *
 * Each row carries:
 * - Padded discipline index ("01", "02" ... auto-computed, scalable to 20+)
 * - Discipline title with hover translate + emphasis
 * - Short discipline description
 * - Project count — shown ONLY when the discipline has real built evidence.
 *   Hidden entirely when count is 0 (e.g. Urban Design, Consulting).
 *   Architectural/industrial format: "03" in faint monospace — no badges, no pills.
 * - Arrow →
 *
 * Right column: sticky image preview (desktop only).
 * - Default: studio atelier photograph or owner-configured image.
 * - Hover: cross-fades to lead project photography for the active discipline.
 */
export function DisciplineIndex({ services, defaultImage, className }: DisciplineIndexProps) {
  const [active, setActive] = useState<number | null>(null);

  const activeService = active !== null ? services[active] : undefined;
  const activeIndex = activeService ? getServiceIndex(activeService.slug) : "";
  const previewProject = activeService?.relatedProjects[0]
    ? getProjectBySlug(activeService.relatedProjects[0])
    : undefined;

  const defaultAsset = defaultImage ?? fallbackStudioAsset;
  const displayImage: ImageAsset = previewProject?.heroImage ?? defaultAsset;

  const caption = previewProject
    ? `${activeIndex} — ${activeService?.title} / ${previewProject.title}`
    : activeIndex
      ? `${activeIndex} — ${activeService?.title}`
      : "RAFA Design Hub // Practice Atelier";

  return (
    <div className={cn("gap-xl grid lg:grid-cols-12", className ?? "")}>
      {/* Ruled discipline rows */}
      <ul className="border-border/40 divide-border/40 divide-y border-y lg:col-span-8">
        {services.map((service, index) => {
          const projectCount = service.relatedProjects.length;
          return (
            <li
              key={service.id}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
            >
              <Reveal delay={index * 0.05}>
                <Link
                  href={`/services/${service.slug}` as Route}
                  className="group gap-y-sm py-md hover:bg-foreground/[0.02] md:gap-x-md md:py-lg relative grid transition-colors md:grid-cols-12 md:items-baseline"
                >
                  {/* Discipline index number */}
                  <span className="text-foreground/40 font-mono text-[10px] tracking-wider uppercase md:col-span-1">
                    {getServiceIndex(service.slug)}
                  </span>

                  {/* Discipline title */}
                  <h2 className="font-display text-foreground/90 group-hover:text-foreground text-3xl font-medium tracking-tight transition-all group-hover:translate-x-2 md:col-span-5 md:text-4xl">
                    {service.title}
                  </h2>

                  {/* Short description */}
                  <p className="text-foreground/60 text-sm leading-relaxed md:col-span-4">
                    {service.shortDescription}
                  </p>

                  {/* Project count — only rendered when discipline has built evidence */}
                  <div className="hidden md:col-span-1 md:flex md:flex-col md:items-end md:justify-center md:gap-1">
                    {projectCount > 0 && (
                      <span className="text-foreground/30 group-hover:text-foreground/60 font-mono text-[10px] tracking-widest uppercase transition-colors">
                        {String(projectCount).padStart(2, "0")}
                      </span>
                    )}
                    <span className="text-foreground/40 group-hover:text-foreground font-mono text-xs transition-all group-hover:translate-x-1">
                      →
                    </span>
                  </div>

                  {/* Accent hairline on hover */}
                  <span
                    aria-hidden="true"
                    className="bg-foreground/40 absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  />
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {/* Sticky image preview — desktop only */}
      <aside className="hidden lg:col-span-4 lg:block">
        <div className="lg:sticky lg:top-(--header-height)">
          <div className="border-border/40 aspect-standard bg-muted relative overflow-hidden rounded-sm border">
            <Image
              key={displayImage.src}
              asset={displayImage}
              className="size-full transition-opacity duration-500"
              sizes="(max-width: 64rem) 0vw, 24vw"
            />
          </div>
          <p className="text-foreground/50 mt-sm font-mono text-[10px] tracking-wider uppercase transition-colors duration-300">
            {caption}
          </p>
        </div>
      </aside>
    </div>
  );
}
