import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography/Heading";
import type { Project } from "@/content/projects";
import { ui } from "@/content/ui";
import { Reveal, Stagger } from "@/motion";

import { ProjectCard } from "./project-card";

interface RelatedProjectsProps {
  projects: Project[];
  className?: string;
}

export function RelatedProjects({ projects, className }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <Section container="wide" className={className ?? ""}>
      <Reveal>
        <div className="mb-xl gap-sm flex flex-wrap items-end justify-between">
          <Heading variant="h2">{ui.sections.relatedProjects}</Heading>
          <Link
            href="/projects"
            className="text-foreground/50 hover:text-foreground font-mono text-xs tracking-wider uppercase transition-colors"
          >
            ALL PROJECTS →
          </Link>
        </div>
      </Reveal>
      <Stagger className="gap-lg grid md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Stagger>
    </Section>
  );
}
