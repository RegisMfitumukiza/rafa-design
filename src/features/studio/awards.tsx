import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import type { Award } from "@/content/studio";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { Reveal, Stagger } from "@/motion";

interface AwardsProps {
  awards?: Award[] | undefined;
  className?: string;
}

/**
 * Awards
 *
 * Renders third-party awards, publications, and honors in a ruled list.
 *
 * Startup-safe: If `awards` is empty (`[]`) or undefined (e.g. a new startup
 * studio that hasn't received awards yet), this component returns `null`
 * so no empty header or section shell appears on the page.
 */
export function Awards({ awards, className }: AwardsProps) {
  // If there are no awards yet (e.g., startup phase), skip rendering the section entirely
  if (!awards || awards.length === 0) {
    return null;
  }

  return (
    <Section container="content" className={cn(className ?? "")}>
      <Reveal>
        <div className="mb-xl">
          <p className="text-foreground/50 mb-xs font-mono text-xs tracking-widest uppercase">
            {ui.overlines.recognition}
          </p>
          <Heading variant="h2">{ui.sections.recognition}</Heading>
        </div>
      </Reveal>
      <Stagger className="border-border/40 divide-border/40 divide-y border-y" stagger={0.06}>
        {awards.map((award) => (
          <div
            key={`${award.title}-${award.year}`}
            className="gap-y-xs gap-x-md py-md grid md:grid-cols-12 md:items-baseline"
          >
            <span className="text-foreground/40 text-overline font-mono tracking-wider uppercase md:col-span-2">
              {award.year}
            </span>
            <div className="md:col-span-5">
              <h3 className="font-display text-foreground/90 text-xl font-medium tracking-tight">
                {award.title}
              </h3>
              {award.project && (
                <span className="text-foreground/40 text-overline font-mono tracking-wider uppercase">
                  {award.project}
                </span>
              )}
            </div>
            <div className="md:col-span-5">
              <Text variant="small" className="text-foreground/50">
                {award.organization}
              </Text>
              {award.citation && (
                <Text variant="small" className="mt-xs text-foreground/40">
                  {award.citation}
                </Text>
              )}
            </div>
          </div>
        ))}
      </Stagger>
    </Section>
  );
}
