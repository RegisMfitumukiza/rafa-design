import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/config/schema";
import { pageContent } from "@/content/pages";
import { getProjects, getActiveCategories } from "@/content/projects";
import { ProjectsArchive } from "@/features/projects/projects-archive";

export const metadata: Metadata = {
  title: pageContent.projects.title,
  description: pageContent.projects.description,
};

export default function ProjectsPage() {
  const projects = getProjects();
  const categories = getActiveCategories();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Projects", path: "/projects" }])} />
      <Section container="wide">
        <ProjectsArchive initialProjects={projects} categories={categories} />
      </Section>
    </>
  );
}
