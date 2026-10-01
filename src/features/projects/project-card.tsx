"use client";

import type { Route } from "next";

import Link from "next/link";
import { useRef, useState } from "react";

import { Image } from "@/components/media/Image";
import { Heading } from "@/components/typography/Heading";
import type { HeadingTag } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  project: Project;
  titleAs?: HeadingTag;
  variant?: "default" | "elevated" | "bordered" | "flat";
  aspectClassName?: string;
  contentClassName?: string;
  className?: string;
}

export function ProjectCard({
  project,
  titleAs = "h3",
  variant = "flat",
  aspectClassName = "aspect-landscape",
  contentClassName,
  className,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <Link
      href={`/projects/${project.slug}` as Route}
      className={cn("group block min-w-0 overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card variant={variant} className="min-w-0 overflow-hidden">
        <Card.Image>
          {/* Image wrapper with overflow-hidden for the overlay slide-up */}
          <div className="relative isolate min-w-0 overflow-hidden">
            <Image
              asset={project.heroImage}
              className={aspectClassName}
              imgClassName="transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
              sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 33vw"
            />

            {/* Cinematic hover video preview (desktop only) */}
            {project.heroVideo?.url && (
              <video
                ref={videoRef}
                src={project.heroVideo.url}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 hidden h-full w-full object-cover transition-opacity duration-700 ease-out md:block",
                  isHovered ? "opacity-100" : "opacity-0",
                )}
              />
            )}

            {/* ── Hover metadata overlay — slides up from bottom with architectural specs (desktop) ────────────── */}
            <div
              aria-hidden="true"
              className={cn(
                "card-hover-overlay hidden md:block",
                "absolute inset-x-0 bottom-0",
                "bg-gradient-to-t from-black/85 via-black/50 to-transparent",
                "px-sm pb-sm pt-xl pointer-events-none min-w-0",
              )}
            >
              <div className="text-micro flex items-center justify-between gap-2 font-mono tracking-widest uppercase">
                <span className="flex items-center gap-1.5 text-white/70">
                  <span
                    className={cn(
                      "inline-block h-1.5 w-1.5 rounded-full",
                      project.status === "completed" ? "bg-white" : "bg-white/40",
                    )}
                    aria-hidden="true"
                  />
                  {project.status}
                </span>
                {project.areaM2 && <span className="text-white/60">{project.areaM2} m²</span>}
              </div>
              <p className="mt-xs text-micro font-mono tracking-[0.2em] text-white/50 uppercase">
                Explore Monograph →
              </p>
            </div>
          </div>
        </Card.Image>

        <Card.Content className={cn("min-w-0", contentClassName)}>
          {/* Metadata overline — full width, no truncation so typology is always readable */}
          <div className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
            {project.location.city}, {project.location.country} · {project.year}
            {project.typology &&
              Array.isArray(project.typology) &&
              project.typology.length > 0 &&
              ` · ${project.typology.join(", ")}`}
          </div>
          <Heading
            as={titleAs}
            variant="h3"
            className="mt-xs font-display text-xl font-medium tracking-tight break-words group-hover:underline"
          >
            {project.title}
          </Heading>
          {project.subtitle && (
            <Text
              variant="small"
              className="mt-xs text-foreground/55 line-clamp-1 text-xs font-light break-words"
            >
              {project.subtitle}
            </Text>
          )}

          {/* Mobile-only spec ledger: Status · Area & Explore Monograph CTA */}
          <div className="border-border/30 mt-sm pt-xs text-foreground/50 text-micro gap-xs flex flex-wrap items-center justify-between border-t font-mono tracking-widest uppercase md:hidden">
            <span className="flex items-center gap-1.5">
              <span
                className={cn(
                  "inline-block h-1.5 w-1.5 rounded-full",
                  project.status === "completed" ? "bg-accent" : "bg-foreground/30",
                )}
                aria-hidden="true"
              />
              <span>
                {project.status}
                {project.areaM2 && ` · ${project.areaM2} m²`}
              </span>
            </span>
            <span className="text-foreground/70 font-medium">Explore Monograph →</span>
          </div>
        </Card.Content>
      </Card>
    </Link>
  );
}
