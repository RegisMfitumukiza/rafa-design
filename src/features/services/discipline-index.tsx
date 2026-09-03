"use client";

import type { Route } from "next";

import Link from "next/link";
import { useState } from "react";

import { Image } from "@/components/media/Image";
import { type Service } from "@/content/services";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { Reveal } from "@/motion";

interface DisciplineIndexProps {
  services: Service[];
  defaultImage?: ImageAsset | undefined;
  className?: string | undefined;
  /**
   * Optional map of service slug → preview ImageAsset.
   * Passed from the server page where related project hero images
   * are already available from the Sanity GROQ query (relatedProjects[]->).
   * Priority: previewImages[slug] → service.coverImage → defaultImage → fallback
   */
  previewImages?: Record<string, ImageAsset>;
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
 * - Hover: cross-fades to the service's cover image or lead project photography.
 *
 * Image priority: previewImages[slug] → service.coverImage → defaultImage → fallback
 */
export function DisciplineIndex({
  services,
  defaultImage,
  previewImages,
  className,
}: DisciplineIndexProps) {
  const [active, setActive] = useState<number | null>(null);

  const activeService = active !== null ? services[active] : undefined;
  // Use the CMS order field if available, otherwise fall back to position in the array
  const activeIndex = activeService
    ? String(activeService.order ?? (active ?? 0) + 1).padStart(2, "0")
    : "";

  // Priority: explicitly passed previewImages map → service.coverImage → default
  const activePreviewImage: ImageAsset | null = activeService
    ? (previewImages?.[activeService.slug] ?? activeService.coverImage ?? null)
    : null;

  // Smart default asset: first service with an image from CMS, or fallback studio asset
  const firstAvailableService = services.find((s) => s.coverImage);
  const defaultAsset = defaultImage ?? firstAvailableService?.coverImage ?? fallbackStudioAsset;
  const displayImage: ImageAsset = activePreviewImage ?? defaultAsset;

  const defaultCaption = firstAvailableService
    ? `${String(firstAvailableService.order ?? 1).padStart(2, "0")} — ${firstAvailableService.title}`
    : "RAFA Design Hub // Practice Atelier";

  const caption = activeService ? `${activeIndex} — ${activeService.title}` : defaultCaption;

  return (
    <div className={cn("gap-xl grid lg:grid-cols-12", className ?? "")}>
      {/* Ruled discipline rows */}
      <ul className="border-border/40 divide-border/40 divide-y border-y lg:col-span-8">
        {services.map((service, index) => {
          const projectCount = service.relatedProjects.length;
          // Use CMS order value if present, otherwise fall back to array position
          const serviceIndex = String(service.order ?? index + 1).padStart(2, "0");
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
                  {/* Discipline index number — from CMS order field */}
                  <span className="text-foreground/40 font-mono text-[10px] tracking-wider uppercase md:col-span-1">
                    {serviceIndex}
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
