import type { Route } from "next";

import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { getServiceIndex, type Service } from "@/content/services";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { Reveal, Stagger } from "@/motion";

interface DisciplineRelatedProps {
  services: Service[];
  className?: string;
}

/**
 * DisciplineRelated
 *
 * Disciplines that share project evidence with the current one, rendered as a
 * ruled index of links ("01 / title / description"). Restrained by design —
 * the section is only mounted when related disciplines exist.
 */
export function DisciplineRelated({ services, className }: DisciplineRelatedProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <Section container="content" className={cn(className ?? "")}>
      <Reveal>
        <p className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
          {ui.sections.relatedDisciplines}
        </p>
      </Reveal>
      <Stagger className="border-border/40 divide-border/40 mt-md divide-y border-y" stagger={0.06}>
        {services.map((related) => (
          <Link
            key={related.id}
            href={`/services/${related.slug}` as Route}
            className="group gap-x-md gap-y-sm py-md hover:bg-foreground/[0.02] grid items-baseline transition-colors md:grid-cols-12"
          >
            <span className="text-foreground/40 text-overline font-mono tracking-wider uppercase md:col-span-2">
              {related.order
                ? String(related.order).padStart(2, "0")
                : getServiceIndex(related.slug)}
            </span>
            <h3 className="text-foreground/90 font-display group-hover:text-foreground text-xl font-medium tracking-tight transition-all group-hover:translate-x-1 md:col-span-6">
              {related.title}
            </h3>
            <p className="text-foreground/60 text-sm leading-relaxed md:col-span-3">
              {related.shortDescription}
            </p>
            <span className="text-foreground/40 group-hover:text-foreground hidden font-mono text-xs transition-all group-hover:translate-x-1 md:col-span-1 md:flex md:justify-end">
              &rarr;
            </span>
          </Link>
        ))}
      </Stagger>
    </Section>
  );
}
