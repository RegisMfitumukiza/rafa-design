"use client";

import type { Route } from "next";

import Link from "next/link";
import { useState } from "react";

import { Section } from "@/components/layout/Section";
import { Image } from "@/components/media/Image";
import type { Project } from "@/content/projects";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { Reveal, Stagger } from "@/motion";

interface SelectedWorkProps {
  projects: Project[];
  className?: string | undefined;
}

/**
 * SelectedWork
 *
 * Built evidence for a discipline — editorial ruled index of projects.
 * Each row: padded index number + large project title on the left,
 * location · year · typology metadata + arrow on the right.
 *
 * On desktop: hovering a row reveals the project's hero image
 * in a sticky right-column preview — the same editorial pattern
 * as the DisciplineIndex on the services index page.
 *
 * Mobile: pure text rows — no hover dependency.
 */
export function SelectedWork({ projects, className }: SelectedWorkProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const activeProject = projects[activeIndex ?? 0] ?? projects[0];

  return (
    <Section container="content" className={cn(className)}>
      <Reveal>
        <p className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
          {ui.sections.selectedWork}
        </p>
      </Reveal>

      {projects.length === 0 ? (
        <Reveal delay={0.05}>
          <div className="border-border/40 mt-md py-lg border-y">
            <p className="text-foreground/30 text-overline font-mono tracking-widest uppercase">
              {ui.overlines.noProjectEvidence}
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="mt-md gap-xl grid lg:grid-cols-12">
          {/* Ruled project rows */}
          <Stagger
            className="border-border/40 divide-border/40 divide-y border-y lg:col-span-8"
            stagger={0.06}
          >
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}` as Route}
                className="group gap-x-md gap-y-xs py-lg hover:bg-foreground/[0.02] relative grid items-baseline transition-colors md:grid-cols-12"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(index)}
              >
                {/* Index number */}
                <span className="text-foreground/40 text-overline font-mono tracking-widest uppercase md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Project title */}
                <h3 className="font-display text-foreground/90 group-hover:text-foreground text-2xl font-medium tracking-tight transition-all group-hover:translate-x-1 md:col-span-6 md:text-3xl">
                  {project.title}
                </h3>

                {/* Metadata */}
                <p className="text-foreground/40 text-overline font-mono tracking-widest uppercase md:col-span-4">
                  {project.location.city}, {project.location.country} · {project.year}
                  {project.typology &&
                    Array.isArray(project.typology) &&
                    project.typology.length > 0 &&
                    ` · ${project.typology.join(", ")}`}
                </p>

                {/* Arrow */}
                <span className="text-foreground/40 group-hover:text-foreground hidden font-mono text-xs transition-all group-hover:translate-x-1 md:col-span-1 md:flex md:justify-end">
                  →
                </span>

                {/* Accent hairline on hover */}
                <span
                  aria-hidden="true"
                  className="bg-foreground/30 absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                />
              </Link>
            ))}
          </Stagger>

          {/* Sticky image preview — desktop only */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="lg:sticky lg:top-(--header-height)">
              <div className="border-border/40 bg-muted relative aspect-[3/4] overflow-hidden border">
                {activeProject ? (
                  <Image
                    key={activeProject.slug}
                    asset={activeProject.heroImage}
                    fill
                    sizes="(max-width: 64rem) 0vw, 24vw"
                    className="size-full transition-opacity duration-500"
                    imgClassName="object-cover"
                  />
                ) : (
                  <div className="p-sm flex size-full items-end">
                    <span className="text-foreground/30 text-overline font-mono tracking-widest uppercase">
                      Selected Work // Built Evidence
                    </span>
                  </div>
                )}
              </div>
              {activeProject && (
                <p className="text-foreground/40 mt-sm text-overline font-mono tracking-widest uppercase transition-all duration-300">
                  {activeProject.title} — {activeProject.location.city} · {activeProject.year}
                </p>
              )}
            </div>
          </aside>
        </div>
      )}
    </Section>
  );
}
