import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { Text } from "@/components/typography/Text";
import { breadcrumbSchema, projectSchema } from "@/config/schema";
import { getProjectBySlug, getProjects, getRelatedProjects } from "@/content/projects/sanity";
import { BeforeAfterSlider } from "@/features/projects/before-after-slider";
import { ProjectChapterBlock } from "@/features/projects/project-chapter";
import { ProjectConcept } from "@/features/projects/project-concept";
import { ProjectDrawingViewer } from "@/features/projects/project-drawing-viewer";
import { ProjectGallery } from "@/features/projects/project-gallery";
import { ProjectHeroParallax } from "@/features/projects/project-hero-parallax";
import { ProjectMaterials } from "@/features/projects/project-materials";
import { ProjectMetadata } from "@/features/projects/project-metadata";
import { ProjectNavigation } from "@/features/projects/project-navigation";
import { ProjectReadingProgress } from "@/features/projects/project-reading-progress";
import { ProjectTeamMatrix } from "@/features/projects/project-team-matrix";
import { RelatedProjects } from "@/features/projects/related-projects";
import { Reveal } from "@/motion";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  // Use SEO fields if provided, otherwise fall back to defaults
  const title = project.seo?.title || project.title;
  const description = project.seo?.description || project.description;

  // Build Open Graph image URL from SEO or hero image
  const ogImage = project.seo?.ogImage?.src || project.heroImage.src;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
          width: project.seo?.ogImage?.width || project.heroImage.width || 1200,
          height: project.seo?.ogImage?.height || project.heroImage.height || 630,
          alt: project.seo?.ogImage?.alt || project.heroImage.alt || project.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const projects = await getProjects();
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined;

  const related = await getRelatedProjects(project);
  const hasFallbackStory = !project.chapters && project.story;

  return (
    <>
      <JsonLd data={projectSchema(project)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />

      {/* ─── Reading progress indicator ────────────────────────────────────── */}
      <ProjectReadingProgress />

      {/* ─── [1+2] CINEMATIC HERO PARALLAX — title merged with photography ─── */}
      <ProjectHeroParallax
        heroImage={project.heroImage}
        title={project.title}
        subtitle={project.subtitle}
        year={project.year}
        locationCity={project.location.city}
        locationCountry={project.location.country}
        typology={project.typology}
        photographerCredit={project.photographerCredit}
      />

      {/* ─── [3] CONCEPT STATEMENT + SPEC FACTS ───────────────────────────────── */}
      <Section container="standard">
        {/* Concept — large editorial type (includes its own overline via ProjectConcept) */}
        {project.concept && (
          <div className="mb-xl">
            <ProjectConcept concept={project.concept} />
          </div>
        )}

        {/* Spec facts appear after concept creates their context */}
        {/* On mobile: full width. On md+: narrower right column layout */}
        <Reveal>
          <div className="gap-xl grid items-start md:grid-cols-12">
            {/* Fallback story text (if no chapters) */}
            {hasFallbackStory && (
              <div className="md:col-span-7">
                <p className="text-foreground/40 mb-md font-mono text-[10px] tracking-widest uppercase">
                  Overview
                </p>
                <div className="text-foreground/75 space-y-md text-lg leading-relaxed">
                  {project
                    .story!.split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((para, i) => (
                      <Text key={i} variant="body" as="p">
                        {para}
                      </Text>
                    ))}
                </div>
              </div>
            )}

            {/* Spec sheet — right column / below on mobile */}
            {/* ProjectMetadata owns its own "Specifications" overline — no label needed here */}
            <div
              className={
                hasFallbackStory
                  ? "md:sticky md:top-24 md:col-span-4 md:col-start-9"
                  : "md:sticky md:top-24 md:col-span-5 md:col-start-8"
              }
            >
              <ProjectMetadata project={project} />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─── [4] NARRATIVE CHAPTERS ────────────────────────────────────────────── */}
      {project.chapters && project.chapters.length > 0 && (
        <div>
          {project.chapters.map((chapter, i) => (
            <ProjectChapterBlock key={i} chapter={chapter} index={i} />
          ))}
        </div>
      )}

      {/* ─── [4B] ARCHITECTURAL DRAWINGS & PLANS ────────────────────────────────── */}
      {project.drawings && project.drawings.length > 0 && (
        <Section container="standard" className="py-2xl border-border/30 border-t">
          <ProjectDrawingViewer drawings={project.drawings} />
        </Section>
      )}

      {/* ─── [5] MATERIAL PALETTE ─────────────────────────────────────────────── */}
      {project.materialNarrative && project.materialNarrative.length > 0 && (
        <Section container="narrow" className="py-xl">
          <ProjectMaterials materials={project.materialNarrative} />
        </Section>
      )}

      {/* ─── [6] ENVIRONMENTAL / SITE NOTES ───────────────────────────────────── */}
      {(project.lightStrategy || project.siteResponse) && (
        <Section container="narrow" className="pb-xl">
          <Reveal>
            <div className="space-y-xl">
              {project.lightStrategy && (
                <div>
                  <p className="text-foreground/40 mb-sm font-mono text-[10px] tracking-widest uppercase">
                    Light Strategy
                  </p>
                  <div className="text-foreground/60 space-y-md text-base leading-relaxed">
                    {project.lightStrategy
                      .split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((para, i) => (
                        <Text key={i} variant="body" as="p">
                          {para}
                        </Text>
                      ))}
                  </div>
                </div>
              )}
              {project.siteResponse && (
                <div>
                  <p className="text-foreground/40 mb-sm font-mono text-[10px] tracking-widest uppercase">
                    Site Response
                  </p>
                  <div className="text-foreground/60 space-y-md text-base leading-relaxed">
                    {project.siteResponse
                      .split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((para, i) => (
                        <Text key={i} variant="body" as="p">
                          {para}
                        </Text>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </Section>
      )}

      {/* ─── [7] BEFORE & AFTER — TRANSFORMATION ──────────────────────────────── */}
      {project.beforeAfter && (
        <Section container="standard" className="pb-xl">
          <BeforeAfterSlider data={project.beforeAfter} />
        </Section>
      )}

      {/* ─── [8] SPATIAL ARCHIVE — GALLERY ────────────────────────────────────── */}
      {project.gallery.length > 0 && (
        <Section container="standard" className="pb-xl">
          <Reveal>
            <p className="text-foreground/40 mb-xl font-mono text-[10px] tracking-widest uppercase">
              Spatial Archive
            </p>
          </Reveal>
          <ProjectGallery images={project.gallery} />
        </Section>
      )}

      {/* ─── [9] PROJECT CREDITS ──────────────────────────────────────────────── */}
      {(project.team || (project.awards && project.awards.length > 0)) && (
        <Section container="standard" className="py-xl">
          {project.team && <ProjectTeamMatrix team={project.team} />}

          {/* Awards */}
          {project.awards && project.awards.length > 0 && (
            <Reveal>
              <div className="border-border/30 mt-xl pt-xl border-t">
                <p className="text-foreground/40 mb-md font-mono text-[10px] tracking-widest uppercase">
                  Recognition
                </p>
                <div className="space-y-sm">
                  {project.awards.map((award, i) => (
                    <div key={i} className="gap-md flex items-baseline justify-between">
                      <p className="text-foreground/80 text-sm">{award.title}</p>
                      <p className="text-foreground/40 flex-shrink-0 font-mono text-xs">
                        {award.organization ? `${award.organization}, ` : ""}
                        {award.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </Section>
      )}

      {/* ─── [10] CONTINUE — CINEMATIC NEXT PROJECT ───────────────────────────── */}
      <ProjectNavigation prev={prev} next={next} />

      {/* Related Projects */}
      <RelatedProjects projects={related} />
    </>
  );
}
