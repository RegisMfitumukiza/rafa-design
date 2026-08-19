import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Link as TextLink } from "@/components/ui/Link";
import type { Studio } from "@/content/studio";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { Reveal, Stagger } from "@/motion";

interface WorkingMethodsProps {
  studio: Studio;
  className?: string;
}

/**
 * WorkingMethods
 *
 * Renders the studio's operational methods as an industrial, ruled grid.
 *
 * Dynamic: Maps over `studio.workingMethods` (works for 2, 3, 4, 5+ methods).
 *
 * Fix: Method titles use plain <h3> tags with Tailwind `text-xl` instead of
 * the `<Heading>` primitive (which applies inline `style.fontSize` overriding
 * Tailwind and causing long titles like "Site & Construction" to overflow).
 */
export function WorkingMethods({ studio, className }: WorkingMethodsProps) {
  return (
    <Section container="standard" className={cn(className ?? "")}>
      <Reveal>
        <div className="mb-xl gap-sm flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <p className="text-foreground/50 mb-xs font-mono text-xs tracking-widest uppercase">
              {ui.overlines.methods}
            </p>
            <Heading variant="h2">Working Methods</Heading>
          </div>
          <TextLink
            href="/process"
            variant="underline"
            className="text-sm font-medium tracking-wide"
          >
            Explore our process &rarr;
          </TextLink>
        </div>
      </Reveal>

      {/* Ruled grid for working methods */}
      <Stagger
        className="border-border/40 divide-border/40 grid divide-y border-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
        stagger={0.08}
      >
        {studio.workingMethods.map((method) => (
          <div
            key={method.code}
            className="group p-md md:p-lg hover:bg-foreground/[0.02] flex flex-col justify-between transition-colors"
          >
            <div>
              <span className="text-foreground/40 mb-md block font-mono text-[10px] tracking-wider uppercase">
                {method.code}
              </span>

              {/* Title — plain h3 so text-xl isn't overridden by inline styles */}
              <h3 className="font-display text-foreground/90 group-hover:text-foreground mb-sm text-xl font-medium tracking-tight transition-colors">
                {method.title}
              </h3>

              <Text variant="small" className="text-foreground/60 leading-relaxed">
                {method.description}
              </Text>
            </div>
          </div>
        ))}
      </Stagger>
    </Section>
  );
}
