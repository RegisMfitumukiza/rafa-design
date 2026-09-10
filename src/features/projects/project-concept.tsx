import type { Project } from "@/content/projects";
import { Reveal, TextReveal } from "@/motion";

interface ProjectConceptProps {
  concept: Project["concept"];
  className?: string;
}

export function ProjectConcept({ concept, className = "" }: ProjectConceptProps) {
  if (!concept) return null;

  // Split concept by newlines to create paragraphs
  const paragraphs = concept.split("\n").filter((line) => line.trim() !== "");

  if (paragraphs.length === 0) return null;

  return (
    <div className={className}>
      {/* Section overline — gives the concept statement editorial hierarchy */}
      <Reveal>
        <p className="text-foreground/40 mb-md font-mono text-[10px] tracking-widest uppercase">
          Concept Statement
        </p>
      </Reveal>

      {paragraphs.length === 1 ? (
        // Single paragraph - use TextReveal
        <TextReveal
          as="p"
          text={paragraphs[0]!}
          className="text-foreground/90 text-2xl leading-snug font-light tracking-tight sm:text-3xl md:text-4xl"
          stagger={0.025}
        />
      ) : (
        // Multiple paragraphs - render with spacing
        <div className="space-y-md">
          {paragraphs.map((para, index) => (
            <TextReveal
              key={index}
              as="p"
              text={para}
              className="text-foreground/90 text-2xl leading-snug font-light tracking-tight sm:text-3xl md:text-4xl"
              stagger={0.025}
              delay={index * 0.1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
