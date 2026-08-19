import type { ProjectReferenceBlock as ProjectReferenceBlockType } from "@/content/journal";
import { Link as TextLink } from "@/components/ui/Link";
import { cn } from "@/lib/cn";

interface ProjectReferenceBlockProps {
  block: ProjectReferenceBlockType;
  className?: string;
}

export function ProjectReferenceBlock({ block, className }: ProjectReferenceBlockProps) {
  const { project } = block;

  return (
    <div className={cn("border-border border-y py-xl my-2xl", className)}>
      <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase mb-md">
        Specification // Project Reference
      </p>
      
      <div className="gap-lg grid md:grid-cols-12">
        <div className="md:col-span-8">
          <h3 className="font-display text-foreground text-2xl font-medium tracking-tight mb-xs">
            {project.title}
          </h3>
          <p className="text-foreground/60 text-sm mb-md">
            {project.location}
            {project.year && ` · ${project.year}`}
            {project.type && ` · ${project.type}`}
          </p>
          <TextLink
            href={`/projects/${project.slug}`}
            variant="underline"
            className="group inline-flex items-center gap-xs text-base"
          >
            View project
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </TextLink>
        </div>
      </div>
    </div>
  );
}
