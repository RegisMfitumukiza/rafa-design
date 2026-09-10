"use client";

import { useRef } from "react";

import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import type { TimelineEvent } from "@/content/studio";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { Reveal, Stagger } from "@/motion";

interface TimelineProps {
  events: TimelineEvent[];
  intro?: string | undefined;
  className?: string | undefined;
}

/**
 * Timeline
 *
 * Horizontal architectural chronology section.
 *
 * Header: Uses an editorial 12-column split grid — Title on left (5 cols),
 * history narrative inline on right (7 cols) — eliminating vertical space waste.
 *
 * Desktop Track:
 * Layer 1 (Background): Giant 120px faint typographic year (opacity 0.06).
 * Layer 2 (Foreground): Small mono year badge, event title (h3), and description paragraph.
 *
 * Mobile: Clean 12-col ruled list stack.
 */
export function Timeline({ events, intro, className }: TimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <Section container="full" className={cn(className ?? "")} aria-label="Studio chronology">
      {/* ─── Compact 12-Column Split Header ─────────────────────────────── */}
      <div className="mb-xl px-[var(--container-gutter)]">
        <div className="gap-md grid items-baseline md:grid-cols-12">
          {/* Title Column (5 cols) */}
          <Reveal className="md:col-span-5">
            <p className="mb-xs text-foreground/50 font-mono text-xs tracking-widest uppercase">
              {ui.overlines.chronology}
            </p>
            <Heading variant="h2">{ui.sections.timeline}</Heading>
          </Reveal>

          {/* History / Intro Narrative Column (7 cols) — Inline beside title */}
          {intro && (
            <Reveal delay={0.1} className="md:col-span-7">
              <Text variant="body" className="text-foreground/65 leading-relaxed text-balance">
                {intro}
              </Text>
            </Reveal>
          )}
        </div>
      </div>

      {/* ─── Horizontal Timeline Track (Desktop) ───────────────────────── */}
      <div
        ref={trackRef}
        className={cn(
          "hidden md:flex",
          "scrollbar-hide overflow-x-auto",
          "border-border/30 border-t",
          "px-[var(--container-gutter)]",
          "gap-0",
        )}
        role="list"
      >
        {events.map((event, i) => (
          <div
            key={`${event.year}-${event.title}`}
            className={cn(
              "group pr-lg pb-xl pt-lg relative w-64 flex-none xl:w-72",
              "border-border/30",
              i < events.length - 1 && "border-r",
            )}
            role="listitem"
          >
            {/* Layer 1 (Background): Faint giant year numeral (~120px) */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-0 left-0",
                "font-mono leading-none font-bold",
                "text-[7rem] xl:text-[8rem]",
                "text-foreground/[0.06]",
                "pointer-events-none select-none",
                "translate-y-[-0.15em]",
                "group-hover:text-foreground/[0.12] transition-colors duration-500",
              )}
            >
              {event.year}
            </span>

            {/* Layer 2 (Foreground): Monospace year tag, Title, Description */}
            <div className="relative z-10 pt-16 xl:pt-20">
              <Text variant="small" className="mb-sm text-foreground/40 block font-mono">
                {event.year}
              </Text>
              <h3 className="font-display mb-xs text-foreground/90 group-hover:text-foreground text-lg leading-snug font-medium tracking-tight transition-colors">
                {event.title}
              </h3>
              <Text variant="small" className="text-foreground/55 leading-relaxed">
                {event.description}
              </Text>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Mobile: Vertical Ruled Stack ──────────────────────────────── */}
      <div className="px-[var(--container-gutter)] md:hidden">
        <Stagger className="border-border/40 divide-border/40 divide-y border-y" stagger={0.08}>
          {events.map((event) => (
            <div
              key={`${event.year}-${event.title}-mobile`}
              className="gap-y-xs gap-x-md py-md grid grid-cols-12 items-baseline"
            >
              <Text variant="small" className="text-foreground/40 text-label col-span-3 font-mono">
                {event.year}
              </Text>
              <div className="col-span-9">
                <h3 className="font-display mb-xs text-foreground/90 text-base font-medium tracking-tight">
                  {event.title}
                </h3>
                <Text variant="small" className="text-foreground/55 leading-relaxed">
                  {event.description}
                </Text>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
