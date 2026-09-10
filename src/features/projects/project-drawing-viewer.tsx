"use client";

import { useState } from "react";

import { Image } from "@/components/media/Image";
import type { ProjectDrawing } from "@/content/projects";
import { cn } from "@/lib/cn";
import { Reveal, ImageReveal } from "@/motion";

interface ProjectDrawingViewerProps {
  drawings?: ProjectDrawing[];
  className?: string;
}

/**
 * ProjectDrawingViewer
 *
 * Interactive Architectural Drawing & Plan Viewer.
 * Allows visitors and clients to toggle between architectural drawings (Ground Plan, Section A-A, Detail Spec),
 * inspect technical scales, view vector plates, and read architectural descriptions.
 */
export function ProjectDrawingViewer({ drawings, className }: ProjectDrawingViewerProps) {
  const [activeId, setActiveId] = useState(drawings?.[0]?.id);

  // Only render if drawings exist
  if (!drawings || drawings.length === 0) return null;

  const activeDrawing = drawings.find((d) => d.id === activeId) || drawings[0]!;

  return (
    <section aria-label="Architectural Drawings" className={cn("space-y-xl", className)}>
      <Reveal>
        <div className="gap-md border-border/40 pb-sm flex flex-col justify-between border-b md:flex-row md:items-end">
          <div>
            <p className="text-foreground/40 mb-xs text-overline font-mono tracking-widest uppercase">
              Specification // Architectural Drawings & Plans
            </p>
            <h3 className="font-display text-foreground text-2xl font-medium tracking-tight md:text-3xl">
              Drawing Index & Spatial Sections
            </h3>
          </div>

          {/* Layer Selector Tabs */}
          <div className="gap-xs text-overline flex flex-wrap items-center font-mono tracking-widest uppercase">
            {drawings.map((dwg) => {
              const isActive = dwg.id === activeId;
              return (
                <button
                  key={dwg.id}
                  type="button"
                  onClick={() => setActiveId(dwg.id)}
                  className={cn(
                    "cursor-pointer rounded-xs border px-3 py-1.5 transition-all duration-300",
                    isActive
                      ? "border-foreground bg-foreground text-background font-semibold"
                      : "border-border/50 text-foreground/70 hover:border-foreground hover:text-foreground",
                  )}
                  aria-pressed={isActive}
                >
                  {dwg.code} — {dwg.title}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Active Drawing Plate */}
      <div className="space-y-md">
        <ImageReveal>
          <figure className="border-border/30 bg-muted/30 relative overflow-hidden rounded-sm border">
            <Image
              asset={activeDrawing.image}
              className="aspect-[2/1] w-full object-contain contrast-110 grayscale filter"
              sizes="100vw"
            />
            {/* Architectural Drawing Badge Overlay */}
            <div className="top-md right-md bg-background/90 px-sm py-xs border-border/40 text-foreground/70 text-overline absolute rounded-xs border font-mono tracking-widest uppercase backdrop-blur-md">
              SCALE: {activeDrawing.scale}
            </div>
          </figure>
        </ImageReveal>

        {/* Technical Caption & Narrative */}
        <Reveal>
          <div className="gap-md pt-xs grid md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-foreground font-mono text-xs font-semibold tracking-wider uppercase">
                {activeDrawing.code} {"//"} {activeDrawing.title}
              </p>
              <p className="text-foreground/40 mt-xs text-overline font-mono tracking-widest uppercase">
                SCALE {activeDrawing.scale}
              </p>
            </div>
            <div className="space-y-xs md:col-span-8">
              <p className="text-foreground/80 text-sm leading-relaxed">{activeDrawing.caption}</p>
              {activeDrawing.description && (
                <p className="text-foreground/60 font-mono text-xs leading-relaxed">
                  {activeDrawing.description}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
