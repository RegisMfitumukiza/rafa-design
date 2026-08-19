import { notFound } from "next/navigation";
import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { breadcrumbSchema, projectSchema } from "@/config/schema";
import { getProjectBySlug, getProjects, getRelatedProjects } from "@/content/projects";
import { BeforeAfterSlider } from "@/features/projects/before-after-slider";
import { ProjectChapterBlock } from "@/features/projects/project-chapter";
import { ProjectConcept } from "@/features/projects/project-concept";
import { ProjectGallery } from "@/features/projects/project-gallery";
import { ProjectHeroParallax } from "@/features/projects/project-hero-parallax";
import { ProjectMaterials } from "@/features/projects/project-materials";
import { ProjectMetadata } from "@/features/projects/project-metadata";
import { ProjectNavigation } from "@/features/projects/project-navigation";
import { ProjectReadingProgress } from "@/features/projects/project-reading-progress";
import { ProjectDrawingViewer } from "@/features/projects/project-drawing-viewer";
import { ProjectTeamMatrix } from "@/features/projects/project-team-matrix";
import { RelatedProjects } from "@/features/projects/related-projects";
import { Reveal } from "@/motion";

export function generateStaticParams() {
  return getProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const projects = getProjects();
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined;

  const related = getRelatedProjects(project);
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

        {/* Concept — large editorial type */}
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
                <Text variant="body" className="text-foreground/75 text-lg leading-relaxed">
                  {project.story}
                </Text>
              </div>
            )}

            {/* Spec sheet — right column / below on mobile */}
            <div
              className={
                hasFallbackStory
                  ? "md:sticky md:top-24 md:col-span-4 md:col-start-9"
                  : "md:sticky md:top-24 md:col-span-5 md:col-start-8"
              }
            >
              <p className="text-foreground/40 mb-md font-mono text-[10px] tracking-widest uppercase">
                Specifications
              </p>
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
      <Section container="standard" className="py-2xl border-t border-border/30">
        <ProjectDrawingViewer />
      </Section>

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
                  <Text variant="body" className="text-foreground/60 text-base leading-relaxed">
                    {project.lightStrategy}
                  </Text>
                </div>
              )}
              {project.siteResponse && (
                <div>
                  <p className="text-foreground/40 mb-sm font-mono text-[10px] tracking-widest uppercase">
                    Site Response
                  </p>
                  <Text variant="body" className="text-foreground/60 text-base leading-relaxed">
                    {project.siteResponse}
                  </Text>
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
