import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import type { Studio } from "@/content/studio";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { Reveal } from "@/motion";

interface HistoryProps {
  studio: Studio;
  className?: string;
}

export function History({ studio, className }: HistoryProps) {
  if (!studio.history) {
    return null;
  }

  return (
    <Section container="narrow" className={cn(className ?? "")}>
      <Reveal>
        <p className="text-foreground/50 mb-xs font-mono text-xs tracking-widest uppercase">
          {ui.overlines.history}
        </p>
        <Heading variant="h2" className="mb-md">
          {ui.sections.history}
        </Heading>
      </Reveal>
      <Reveal delay={0.1}>
        <Text variant="body" className="text-foreground/65 leading-relaxed text-balance">
          {studio.history}
        </Text>
      </Reveal>
    </Section>
  );
}
