import type { Project } from "@/content/projects";
import { TextReveal } from "@/motion";

interface ProjectConceptProps {
  concept: Project["concept"];
  className?: string;
}

export function ProjectConcept({ concept, className = "" }: ProjectConceptProps) {
  if (!concept) return null;

  return (
    <div className={className}>
      <TextReveal
        as="p"
        text={concept}
        className="text-foreground/90 text-2xl leading-snug font-light tracking-tight sm:text-3xl md:text-4xl"
        stagger={0.025}
      />
    </div>
  );
}
