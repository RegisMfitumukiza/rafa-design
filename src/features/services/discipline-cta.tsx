import type { Route } from "next";

import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { pageContent } from "@/content/pages";
import { cn } from "@/lib/cn";
import { Reveal } from "@/motion";

interface CtaContent {
  overline: string;
  heading: string;
  body: string;
  action: string;
}

interface DisciplineCtaProps {
  className?: string;
  /** Content override — falls back to the shared services CTA copy */
  content?: CtaContent;
}

/**
 * DisciplineCta
 *
 * Editorial closing call-to-action. Points at the existing contact page — no
 * new contact system is introduced. Accepts an optional content override so
 * the same pattern can close the process page with its own copy.
 */
export function DisciplineCta({ className, content }: DisciplineCtaProps) {
  const cta = content ?? pageContent.services.cta;

  return (
    <Section container="content" className={cn(className ?? "")}>
      <div className="border-border/40 pt-2xl border-t">
        <Reveal>
          <p className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
            {cta.overline}
          </p>
          <h2 className="font-display text-foreground mt-sm text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl md:text-5xl">
            {cta.heading}
          </h2>
          <p className="text-foreground/65 mt-md text-lg leading-relaxed text-balance">
            {cta.body}
          </p>
          <Link
            href={"/contact" as Route}
            className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background group mt-xl px-md py-sm gap-lg inline-flex items-center justify-between rounded-sm border font-mono text-xs font-medium tracking-widest uppercase transition-all duration-300"
          >
            <span>{cta.action}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
