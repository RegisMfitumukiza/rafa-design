import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/config/schema";
import { getProjectBySlug, type Project } from "@/content/projects";
import {
  getRelatedProjectsForService,
  getRelatedServicesForService,
  getServiceBySlug,
  getServiceIndex,
  getServices,
} from "@/content/services";
import { DisciplineApproach } from "@/features/services/discipline-approach";
import { DisciplineCta } from "@/features/services/discipline-cta";
import { DisciplineHero } from "@/features/services/discipline-hero";
import { DisciplineImageNarrative } from "@/features/services/discipline-image-narrative";
import { DisciplineRelated } from "@/features/services/discipline-related";
import { SelectedWork } from "@/features/services/selected-work";
import { Reveal } from "@/motion";

export function generateStaticParams() {
  return getServices().map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: {
      title: service.title,
      description: service.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // Resolve real projects
  const selectedProjects = getRelatedProjectsForService(service)
    .map((projectSlug) => getProjectBySlug(projectSlug))
    .filter((project): project is Project => Boolean(project));

  const relatedServices = getRelatedServicesForService(service);
  const index = getServiceIndex(service.slug);

  // Lead project drives the cinematic hero image at the top of the page
  const leadProject = selectedProjects[0];

  // Editorial image narrative:
  // - Collected from ALL related projects (not just the first)
  // - Filtered by discipline-specific editorialIntents so each discipline
  //   only shows images that are relevant to its visual language:
  //   Interior Design → spatial-experience, materiality only
  //   Landscape       → site-relationship, environmental only
  //   Architecture    → design-intent, site-relationship, construction, environmental
  //   Renovation      → construction, materiality, design-intent
  //   (Consulting has no editorialIntents → renders nothing)
  // - Deduplicated by src to avoid the same image appearing twice
  // - Capped at 5 (max compositional patterns in DisciplineImageNarrative)
  const intents = new Set(service.editorialIntents);
  const seenSrcs = new Set<string>();

  const narrativeImages = selectedProjects
    .flatMap((project) => project.gallery)
    .filter((img) => {
      const ci = img as { intent?: string; caption?: string; narrative?: string };
      // Must match a discipline intent (or accept all if intents empty)
      const intentMatch = intents.size === 0 || (ci.intent && intents.has(ci.intent as never));
      // Must have at least a caption or narrative to be editorially useful
      const hasText = Boolean(ci.caption ?? ci.narrative);
      // No duplicates
      const isNew = !seenSrcs.has(img.src);
      if (intentMatch && hasText && isNew) {
        seenSrcs.add(img.src);
        return true;
      }
      return false;
    })
    .slice(0, 5)
    .map((img) => {
      const ci = img as { caption?: string; narrative?: string };
      return {
        image: img,
        caption: ci.caption,
        narrative: ci.narrative,
      };
    });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <JsonLd data={serviceSchema(service)} />

      {/* ── 1. EDITORIAL 12-COLUMN HEADER (Pattern B — 6/6 split) ── */}
      <Section container="wide">
        <Reveal>
          <div className="gap-x-xl gap-y-md grid items-start md:grid-cols-12">
            {/* Left 6 cols: overline + monumental title */}
            <div className="md:col-span-6 lg:col-span-6">
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                {index} {/* divider */} {service.title}
              </p>
              <h1 className="font-display text-foreground mt-sm text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {service.title}
              </h1>
            </div>
            {/* Right 6 cols: concise positioning statement */}
            <div className="md:pt-md md:col-span-6 lg:col-span-6">
              <p className="text-foreground/70 w-full text-xl leading-relaxed md:text-2xl">
                {service.intro}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── 2. LEAD ARCHITECTURAL IMAGE ── */}
      <Section container="wide" className="mt-xl md:mt-2xl">
        <DisciplineHero service={service} leadProject={leadProject} />
      </Section>

      {/* ── 3. PRACTICE NARRATIVE + METHODOLOGY ── */}
      <Section container="content" className="mt-2xl">
        <Reveal>
          <div className="gap-md grid md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                Approach // Methodology
              </p>
            </div>
            <div className="md:col-span-9">
              <p className="text-foreground/70 text-lg leading-relaxed">{service.description}</p>
            </div>
          </div>
        </Reveal>

        {/* Ruled numbered methodology */}
        <DisciplineApproach service={service} className="mt-xl" />
      </Section>

      {/* ── 4. EDITORIAL IMAGE NARRATIVE ── */}
      {narrativeImages.length > 0 && (
        <Section container="wide" className="mt-2xl">
          <Reveal>
            <p className="text-foreground/40 mb-xl font-mono text-[10px] tracking-widest uppercase">
              {service.title} {/* In Practice */}
            </p>
          </Reveal>
          <DisciplineImageNarrative images={narrativeImages} />
        </Section>
      )}

      {/* ── 5. SELECTED WORK / BUILT EVIDENCE ── */}
      <SelectedWork projects={selectedProjects} className="mt-2xl" />

      {/* ── 6. RELATED DISCIPLINES ── */}
      <DisciplineRelated services={relatedServices} className="mt-2xl" />

      {/* ── 7. CTA ── */}
      <DisciplineCta className="mt-2xl" />
    </>
  );
}
