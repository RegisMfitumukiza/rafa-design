import type { ProjectMaterial } from "@/content/projects";
import { Reveal } from "@/motion";

interface ProjectMaterialsProps {
  materials: ProjectMaterial[];
  className?: string;
}

export function ProjectMaterials({ materials, className = "" }: ProjectMaterialsProps) {
  if (!materials || materials.length === 0) return null;

  return (
    <div className={className}>
      <Reveal>
        <p className="text-foreground/40 mb-md font-mono text-[10px] tracking-widest uppercase">
          Material Palette
        </p>
        <div className="border-border/30 divide-border/30 divide-y border-t">
          {materials.map((material, i) => (
            <div key={i} className="gap-md py-md grid md:grid-cols-12">
              {/* Material name */}
              <div className="md:col-span-3">
                <p className="text-foreground/90 text-sm font-medium tracking-wide">
                  {material.name}
                </p>
              </div>
              {/* Rationale */}
              <div className="md:col-span-8 md:col-start-5">
                <p className="text-foreground/55 text-sm leading-relaxed">{material.rationale}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
