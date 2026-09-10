"use client";

import { Image } from "@/components/media/Image";
import type { HeadingTag } from "@/components/typography/Heading";
import type { ProcessStep as ProcessStepType } from "@/content/process";
import { cn } from "@/lib/cn";
import { ImageReveal } from "@/motion";

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
  titleAs?: HeadingTag;
  className?: string;
}

/**
 * ProcessStep
 *
 * A single phase of the methodology rendered as a ruled editorial row:
 *
 *   [1] index  |  [4] title + duration  |  [7] description + deliverables
 *
 * Visual Alternation:
 *   - Even step visuals (e.g. 02 Concept) align to the left 8 columns.
 *   - Odd step visuals (e.g. 05 Construction) align to the right 8 columns (col-start-5).
 *   This provides visual storytelling rhythm across the methodology sequence.
 */
export function ProcessStep({ step, index, titleAs = "h3", className }: ProcessStepProps) {
  const Tag = (titleAs === "h1" ? "h2" : titleAs) as "h2" | "h3";
  const code = String(index + 1).padStart(2, "0");
  const caption = step.visual?.caption ?? step.visual?.alt;

  // Visual Alternation Grid Alignment
  const isEvenVisual = index % 2 === 1; // 0-indexed: index 1 is step 02, index 4 is step 05
  const imageGridClass = isEvenVisual
    ? "md:col-span-8 md:col-start-1"
    : "md:col-span-8 md:col-start-5";

  return (
    <div className={cn("py-lg md:py-xl", className ?? "")}>
      {/* Ruled row grid: index | title & duration | description & deliverables */}
      <div className="gap-x-md gap-y-sm grid items-start md:grid-cols-12">
        {/* Index code */}
        <span className="text-foreground/35 text-label font-mono tracking-widest uppercase md:col-span-1 md:pt-1.5">
          {code}
        </span>

        {/* Phase title & Duration */}
        <div className="md:col-span-4">
          <Tag className="text-foreground font-display text-2xl font-medium tracking-tight md:text-3xl lg:text-[2rem]">
            {step.title}
          </Tag>
          {step.duration && (
            <div className="mt-xs gap-xs flex items-center">
              <span className="bg-foreground/30 inline-block h-px w-3" />
              <span className="text-foreground/45 text-overline font-mono tracking-widest uppercase">
                {step.duration}
              </span>
            </div>
          )}
        </div>

        {/* Description & Deliverables */}
        <div className="space-y-md md:col-span-7">
          <p className="text-foreground/70 text-base leading-relaxed md:text-lg">
            {step.description}
          </p>

          {/* Deliverables architectural register */}
          {step.deliverables && step.deliverables.length > 0 && (
            <div className="mt-md border-border/25 pt-sm border-t">
              <div className="gap-x-md text-overline flex flex-wrap items-baseline gap-y-1.5 font-mono tracking-wider uppercase">
                <span className="text-foreground/35 select-none">SPEC // DELIVERABLES:</span>
                <div className="gap-x-sm flex flex-wrap items-center gap-y-1">
                  {step.deliverables.map((item, idx) => (
                    <span key={item} className="text-foreground/70 flex items-center">
                      {idx > 0 && (
                        <span className="text-foreground/25 mr-sm select-none" aria-hidden>
                          /
                        </span>
                      )}
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editorial evidence plate — with visual alternation */}
      {step.visual && (
        <div className="mt-xl gap-md grid md:grid-cols-12">
          <div className={imageGridClass}>
            <ImageReveal className="w-full">
              <Image
                asset={step.visual}
                fill
                sizes="(max-width: 48rem) 100vw, 66vw"
                className="aspect-[16/10] w-full"
                imgClassName="object-cover"
              />
            </ImageReveal>
            {caption && (
              <div className="mt-sm border-border/25 pt-xs text-overline flex items-baseline justify-between border-t font-mono tracking-widest uppercase">
                <p className="text-foreground/45">
                  FIG. {code} {"//"} {caption}
                </p>
                <span className="text-foreground/25 hidden sm:inline-block">Phase Evidence</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
