import type { Route } from "next";

import Link from "next/link";

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
  return (
    <Link href={`/projects/${project.slug}` as Route} className="group block">
      <Card variant={variant} {...(className ? { className } : {})}>
        <Card.Image>
          {/* Image wrapper with overflow-hidden for the overlay slide-up */}
          <div className="relative overflow-hidden">
            <Image
              asset={project.heroImage}
              className={aspectClassName}
              imgClassName="transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
              sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 33vw"
            />

            {/* ── Hover metadata overlay — slides up from bottom ────────────── */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 bottom-0 translate-y-full",
                "motion-safe:group-hover:translate-y-0",
                "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "bg-gradient-to-t from-black/85 via-black/50 to-transparent",
                "px-sm pb-sm pt-xl pointer-events-none",
              )}
            >
              <p className="font-mono text-[9px] tracking-widest text-white/60 uppercase">
                {project.location.city}, {project.location.country}
                {" · "}
                {project.year}
                {project.typology && ` · ${project.typology}`}
              </p>
              <p className="text-white text-sm font-medium mt-[2px] leading-snug">
                {project.title}
              </p>
              <p className="font-mono text-[9px] tracking-[0.18em] text-white/45 uppercase mt-xs">
                View Project →
              </p>
            </div>
          </div>
        </Card.Image>

        <Card.Content {...(contentClassName ? { className: contentClassName } : {})}>
          <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
            {project.location.city}, {project.location.country} · {project.year}
            {project.typology && ` · ${project.typology}`}
          </p>
          <Heading
            as={titleAs}
            variant="h3"
            className="mt-xs text-xl font-medium tracking-tight group-hover:underline"
          >
            {project.title}
          </Heading>
          {project.subtitle && (
            <Text
              variant="small"
              className="mt-xs text-foreground/55 line-clamp-1 text-xs font-light"
            >
              {project.subtitle}
            </Text>
          )}
        </Card.Content>
      </Card>
    </Link>
  );
}
