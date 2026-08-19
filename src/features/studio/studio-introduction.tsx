import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import type { Studio } from "@/content/studio";
import { Reveal } from "@/motion";

interface StudioIntroductionProps {
  studio: Studio;
  className?: string;
}

/**
 * StudioIntroduction
 *
 * The editorial introduction block rendered immediately below the cinematic
 * StudioHero. Contains the manifesto (left column) and the studio introduction
 * paragraph (right column) in a 12-column split grid.
 *
 * The hero image has moved to StudioHero — this component is now pure text.
 */
export function StudioIntroduction({ studio, className }: StudioIntroductionProps) {
  return (
    <Section container="standard" className={className ?? ""}>
      <div className="mt-lg gap-xl grid items-baseline md:grid-cols-12">
        <Reveal mount delay={0.2} className="md:col-span-6">
          <Heading as="h2" variant="h3" className="text-foreground/85 leading-tight">
            {studio.manifesto}
          </Heading>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
          <Text variant="body" className="text-foreground/60 leading-relaxed text-balance">
            {studio.introduction}
          </Text>
        </Reveal>
      </div>
    </Section>
  );
}
