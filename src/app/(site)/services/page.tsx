import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/config/schema";
import { getServicesDescription, pageContent } from "@/content/pages";
import { getServices } from "@/content/services";
import { DisciplineIndex } from "@/features/services/discipline-index";
import { Reveal } from "@/motion";

export const metadata: Metadata = {
  title: pageContent.services.title,
  description: pageContent.services.description ?? getServicesDescription(6),
};

export default function ServicesPage() {
  const services = getServices();
  // CMS Override Pattern: Uses custom CMS text if provided, otherwise calculates dynamic count description
  const description = pageContent.services.description ?? getServicesDescription(services.length);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Services", path: "/services" }])} />
      <Section container="wide">
        {/* Pattern B: 12-Column Split Intro (6/6 split, items-start, responsive display typography) */}
        <Reveal>
          <div className="mb-xl gap-x-xl gap-y-md grid items-start md:grid-cols-12">
            <div className="md:col-span-6 lg:col-span-6">
              <p className="text-foreground/50 font-mono text-xs tracking-widest uppercase">
                {pageContent.services.overline}
              </p>
              <h1 className="font-display text-foreground mt-sm text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {pageContent.services.title}
              </h1>
            </div>
            <div className="md:col-span-6 lg:col-span-6 md:pt-md">
              <p className="text-foreground/70 w-full text-xl leading-relaxed md:text-2xl">
                {description}
              </p>
            </div>
          </div>
        </Reveal>

        <DisciplineIndex services={services} className="mt-xl md:mt-2xl" />
      </Section>
    </>
  );
}
