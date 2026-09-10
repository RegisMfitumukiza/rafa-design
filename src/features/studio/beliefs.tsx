import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import type { Studio } from "@/content/studio";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { Reveal, Stagger } from "@/motion";

interface BeliefsProps {
  studio: Studio;
  className?: string;
}

/**
 * Beliefs
 *
 * Renders the studio's design principles as a ruled editorial list.
 *
 * Layout (12-col grid per row):
 *   [2] PRINCIPLE 01  |  [4] Context  |  [6] statement text
 *
 * The principle title is intentionally NOT rendered via the Heading component
 * because Heading applies inline fontSize via design tokens which overrides
 * Tailwind utility classes. Here we need Tailwind to control the size so the
 * title stays within its column without overflowing into the statement.
 */
export function Beliefs({ studio, className }: BeliefsProps) {
  return (
    <Section container="content" className={cn(className ?? "")}>
      <Reveal>
        <div className="mb-md">
          <p className="text-foreground/50 mb-xs font-mono text-xs tracking-widest uppercase">
            {ui.overlines.principles}
          </p>
          <Heading variant="h2">{ui.sections.beliefs}</Heading>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <Text variant="body" className="text-foreground/70 leading-relaxed text-balance">
          {studio.philosophy}
        </Text>
      </Reveal>
      <Stagger className="mt-xl border-border/40 divide-border/40 divide-y border-y" stagger={0.06}>
        {studio.beliefs.map((belief) => (
          <div
            key={belief.code}
            className="gap-x-md gap-y-sm py-md grid items-center md:grid-cols-12"
          >
            {/* Code — 2 cols */}
            <span className="text-foreground/40 text-overline font-mono tracking-wider uppercase md:col-span-2">
              {belief.code}
            </span>

            {/* Title — 4 cols — plain h3 so Tailwind controls the font size */}
            <h3 className="text-foreground/90 font-display text-xl font-medium tracking-tight md:col-span-4">
              {belief.title}
            </h3>

            {/* Statement — 6 cols */}
            <Text variant="small" className="text-foreground/60 leading-relaxed md:col-span-6">
              {belief.statement}
            </Text>
          </div>
        ))}
      </Stagger>
    </Section>
  );
}
