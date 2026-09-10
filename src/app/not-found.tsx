import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";

export default function NotFound() {
  return (
    <PageContainer>
      <Section container="narrow" className="py-3xl">
        <div className="space-y-md">
          <p className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
            Specification // 404 Spatial Error
          </p>

          <h1 className="font-display text-foreground text-7xl font-medium tracking-tight sm:text-8xl md:text-9xl">
            404
          </h1>

          <p className="text-foreground/70 max-w-xl text-lg leading-relaxed font-medium text-balance md:text-xl">
            The spatial document or page you requested does not exist within the studio archive.
          </p>

          <div className="pt-md">
            <Link
              href="/"
              className="border-border/50 text-foreground hover:border-foreground hover:bg-foreground hover:text-background gap-xs px-md py-sm inline-flex items-center rounded-xs border font-mono text-xs tracking-widest uppercase transition-all duration-300"
            >
              ← RETURN TO STUDIO ARCHIVE
            </Link>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}
