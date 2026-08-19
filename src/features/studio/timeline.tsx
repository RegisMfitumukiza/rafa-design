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
            <p className="mb-xs font-mono text-xs tracking-widest text-foreground/50 uppercase">
              {ui.overlines.chronology}
            </p>
            <Heading variant="h2">{ui.sections.timeline}</Heading>
          </Reveal>

          {/* History / Intro Narrative Column (7 cols) — Inline beside title */}
          {intro && (
            <Reveal delay={0.1} className="md:col-span-7">
              <Text
                variant="body"
                className="text-foreground/65 leading-relaxed text-balance"
              >
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
          "overflow-x-auto scrollbar-hide",
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
              "group relative flex-none w-64 xl:w-72 pr-lg pb-xl pt-lg",
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
                "font-mono font-bold leading-none",
                "text-[7rem] xl:text-[8rem]",
                "text-foreground/[0.06]",
                "select-none pointer-events-none",
                "translate-y-[-0.15em]",
                "transition-colors duration-500 group-hover:text-foreground/[0.12]",
              )}
            >
              {event.year}
            </span>

            {/* Layer 2 (Foreground): Monospace year tag, Title, Description */}
            <div className="relative z-10 pt-16 xl:pt-20">
              <Text variant="small" className="mb-sm block font-mono text-foreground/40">
                {event.year}
              </Text>
              <h3 className="font-display mb-xs text-lg font-medium leading-snug tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
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
      <div className="md:hidden px-[var(--container-gutter)]">
        <Stagger
          className="border-border/40 divide-border/40 divide-y border-y"
          stagger={0.08}
        >
          {events.map((event) => (
            <div
              key={`${event.year}-${event.title}-mobile`}
              className="gap-y-xs gap-x-md py-md grid grid-cols-12 items-baseline"
            >
              <Text
                variant="small"
                className="col-span-3 font-mono text-[11px] text-foreground/40"
              >
                {event.year}
              </Text>
              <div className="col-span-9">
                <h3 className="font-display mb-xs text-base font-medium tracking-tight text-foreground/90">
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
