import { Link as TextLink } from "@/components/ui/Link";
import type { ProjectReferenceBlock as ProjectReferenceBlockType } from "@/content/journal";
import { cn } from "@/lib/cn";

interface ProjectReferenceBlockProps {
  block: ProjectReferenceBlockType;
  className?: string;
}

export function ProjectReferenceBlock({ block, className }: ProjectReferenceBlockProps) {
  const { project } = block;

  return (
    <div className={cn("border-border py-xl my-2xl border-y", className)}>
      <p className="text-foreground/40 mb-md font-mono text-[10px] tracking-widest uppercase">
        Specification // Project Reference
      </p>

      <div className="gap-lg grid md:grid-cols-12">
        <div className="md:col-span-8">
          <h3 className="font-display text-foreground mb-xs text-2xl font-medium tracking-tight">
            {project.title}
          </h3>
          <p className="text-foreground/60 mb-md text-sm">
            {project.location}
            {project.year && ` · ${project.year}`}
            {project.type && ` · ${project.type}`}
          </p>
          <TextLink
            href={`/projects/${project.slug}`}
            variant="underline"
            className="group gap-xs inline-flex items-center text-base"
          >
            View project
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </TextLink>
        </div>
      </div>
    </div>
  );
}
