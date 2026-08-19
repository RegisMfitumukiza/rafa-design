import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import type { Benefit } from "@/content/company/careers";
import { ui } from "@/content/ui";
import { Reveal, Stagger } from "@/motion";

interface BenefitsProps {
  benefits: Benefit[];
  className?: string;
}

export function Benefits({ benefits, className }: BenefitsProps) {
  return (
    <Section container="content" className={className ?? ""}>
      <Reveal>
        <Heading variant="h2" className="mb-xl">
          {ui.sections.workingAtRafa}
        </Heading>
      </Reveal>
      <Stagger className="gap-lg grid md:grid-cols-2">
        {benefits.map((benefit) => (
          <div key={benefit.title}>
            <Heading variant="h3">{benefit.title}</Heading>
            <Text variant="body" className="mt-sm text-foreground/60">
              {benefit.description}
            </Text>
          </div>
        ))}
      </Stagger>
    </Section>
  );
}
