import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/config/schema";
import { getServicesDescription, pageContent } from "@/content/pages";
import type { ImageAsset } from "@/content/types";
import { DisciplineIndex } from "@/features/services/discipline-index";
import { Reveal } from "@/motion";
import { getPageIntros, getServices, getStudioInfo } from "@/sanity/lib";

export async function generateMetadata(): Promise<Metadata> {
  const services = await getServices();
  const description = getServicesDescription(services.length);
  return {
    title: pageContent.services.title,
    description,
  };
}

export default async function ServicesPage() {
  const [services, studio, cmsIntros] = await Promise.all([
    getServices(),
    getStudioInfo(),
    getPageIntros(),
  ]);
  const description = cmsIntros.services?.description ?? getServicesDescription(services.length);
  const defaultImage = studio?.atelierImage ?? studio?.images?.[0];

  // Build a previewImages map: service.slug → first related project heroImage (or coverImage)
  // The servicesQuery now dereferences relatedProjects[]-> so heroImage is already available.
  const previewImages: Record<string, ImageAsset> = {};
  for (const service of services) {
    if (service.coverImage) {
      previewImages[service.slug] = service.coverImage;
    } else if (service.relatedProjects.length > 0) {
      // relatedProjects are slugs — but service.coverImage covers the Sanity image path.
      // For the index preview we rely on coverImage set in Studio, or leave blank (bg-muted shows).
    }
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Services", path: "/services" }])} />
      <Section container="wide">
        {/* Pattern B: 12-Column Split Intro (6/6 split, items-start, responsive display typography) */}
        <Reveal>
          <div className="mb-xl gap-x-xl gap-y-md grid items-start md:grid-cols-12">
            <div className="md:col-span-6 lg:col-span-6">
              <p className="text-foreground/50 font-mono text-xs tracking-widest uppercase">
                {cmsIntros.services?.overline ?? pageContent.services.overline}
              </p>
              <h1 className="font-display text-foreground mt-sm text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {cmsIntros.services?.title ?? pageContent.services.title}
              </h1>
            </div>
            <div className="md:pt-md md:col-span-6 lg:col-span-6">
              <p className="text-foreground/70 w-full text-xl leading-relaxed md:text-2xl">
                {description}
              </p>
            </div>
          </div>
        </Reveal>

        <DisciplineIndex
          services={services}
          previewImages={previewImages}
          defaultImage={defaultImage}
          className="mt-xl md:mt-2xl"
        />
      </Section>
    </>
  );
}
