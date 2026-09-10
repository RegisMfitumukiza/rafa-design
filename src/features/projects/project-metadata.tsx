import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { Reveal } from "@/motion";

interface ProjectMetadataProps {
  project: Project;
  className?: string;
}

export function ProjectMetadata({ project, className }: ProjectMetadataProps) {
  return (
    <div className={cn(className)}>
      {/* Section overline — lives here so page.tsx doesn't need to duplicate it */}
      <Reveal>
        <p className="text-foreground/40 mb-md text-overline font-mono tracking-widest uppercase">
          Specifications
        </p>
      </Reveal>

      {/* Semantic dl wrapper — dt/dd pairs are only valid inside a dl */}
      <dl className={cn("border-border/40 divide-border/40 divide-y border-y font-mono text-xs")}>
        <div className="py-xs gap-sm flex justify-between">
          <dt className="text-foreground/40 uppercase">TYPOLOGY</dt>
          <dd className="text-foreground/90 font-medium">
            {project.typology && Array.isArray(project.typology) && project.typology.length > 0
              ? project.typology.join(", ")
              : project.category[0]}
          </dd>
        </div>

        <div className="py-xs gap-sm flex justify-between">
          <dt className="text-foreground/40 uppercase">LOCATION</dt>
          <dd className="text-foreground/90 font-medium">
            {project.location.city}, {project.location.country}
          </dd>
        </div>

        {project.coordinates && (
          <div className="py-xs gap-sm flex justify-between">
            <dt className="text-foreground/40 uppercase">COORDINATES</dt>
            <dd className="text-foreground/80 font-medium">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${project.coordinates.lat},${project.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground inline-flex items-center gap-1 underline-offset-4 transition-colors hover:underline"
                title={`View ${project.title} site location on satellite maps`}
              >
                <span>
                  {project.coordinates.lat}°N, {project.coordinates.lng}°W
                </span>
                <span className="text-foreground/40 text-overline">↗</span>
              </a>
            </dd>
          </div>
        )}

        {project.client && (
          <div className="py-xs gap-sm flex justify-between">
            <dt className="text-foreground/40 uppercase">CLIENT</dt>
            <dd className="text-foreground/80">{project.client}</dd>
          </div>
        )}

        <div className="py-xs gap-sm flex justify-between">
          <dt className="text-foreground/40 uppercase">YEAR</dt>
          <dd className="text-foreground/90 font-medium">{project.year}</dd>
        </div>

        <div className="py-xs gap-sm flex justify-between">
          <dt className="text-foreground/40 uppercase">STATUS</dt>
          <dd className="text-foreground/90 font-medium uppercase">{project.status}</dd>
        </div>

        {(project.areaM2 || project.details?.area) && (
          <div className="py-xs gap-sm flex justify-between">
            <dt className="text-foreground/40 uppercase">GROSS AREA</dt>
            <dd className="text-foreground/90 font-medium">
              {project.areaM2 ? `${project.areaM2} m²` : project.details?.area}
            </dd>
          </div>
        )}

        {project.details?.materials && project.details.materials.length > 0 && (
          <div className="py-xs flex flex-col gap-1 sm:flex-row sm:justify-between">
            <dt className="text-foreground/40 uppercase">MATERIALITY</dt>
            <dd className="text-foreground/80 sm:text-right">
              {project.details.materials.join(" · ")}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
