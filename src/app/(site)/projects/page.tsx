import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/config/schema";
import { pageContent } from "@/content/pages";
import { getProjects, getActiveCategories } from "@/content/projects/sanity";
import { ProjectsArchive } from "@/features/projects/projects-archive";
import { getPageIntros } from "@/sanity/lib";

export const metadata: Metadata = {
  title: pageContent.projects.title,
  description: pageContent.projects.description,
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const categories = await getActiveCategories();
  const cmsIntros = await getPageIntros();
  const cmsProjectsIntro = cmsIntros.projects ?? {};
  const intro = {
    ...(cmsProjectsIntro.overline ? { overline: cmsProjectsIntro.overline } : {}),
    ...(cmsProjectsIntro.title ? { title: cmsProjectsIntro.title } : {}),
    ...(cmsProjectsIntro.description ? { description: cmsProjectsIntro.description } : {}),
  } as const;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Projects", path: "/projects" }])} />
      <Section container="wide">
        <ProjectsArchive initialProjects={projects} categories={categories} intro={intro} />
      </Section>
    </>
  );
}
