import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { getProjectByTitle } from "@/content/projects";
import type { ClientSector } from "@/content/studio";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { Reveal, Stagger } from "@/motion";

interface PartnersProps {
  sectors?: ClientSector[] | undefined;
  note?: string | undefined;
  className?: string | undefined;
}

/**
 * Partners
 *
 * Renders the studio's client sectors, project typologies, key collaborators,
 * and featured clients.
 *
 * Enhancement: Project names under `Commissions //` are rendered as interactive,
 * hoverable links (`/projects/[slug]`) with outward arrows `↗`. Clicking any
 * project name opens its full monograph page with exact specs, team, and photos.
 *
 * Startup Safe: Returns `null` if `sectors` is empty or undefined.
 */
export function Partners({ sectors, note, className }: PartnersProps) {
  if (!sectors || sectors.length === 0) {
    return null;
  }

  return (
    <Section container="content" className={cn(className ?? "")}>
      <Reveal>
        <div className="mb-xl">
          <p className="text-foreground/50 mb-xs font-mono text-xs tracking-widest uppercase">
            {ui.overlines.collaboration}
          </p>
          <Heading variant="h2">{ui.sections.clientsCollaborators}</Heading>
        </div>
      </Reveal>

      <Stagger className="border-border/40 divide-border/40 divide-y border-y" stagger={0.06}>
        {sectors.map((sector) => {
          const hasProjects = Boolean(sector.projects && sector.projects.length > 0);
          const hasCollaborators = Boolean(sector.collaborators && sector.collaborators.length > 0);
          const hasClients = Boolean(sector.clients && sector.clients.length > 0);

          return (
            <div
              key={sector.code}
              className="gap-y-xs gap-x-md py-md grid md:grid-cols-12 md:items-baseline"
            >
              {/* Sector Code */}
              <span className="text-foreground/40 font-mono text-[10px] tracking-wider uppercase md:col-span-3">
                {sector.code}
              </span>

              {/* Sector Title */}
              <h3 className="font-display text-foreground/90 text-xl font-medium tracking-tight md:col-span-4">
                {sector.title}
              </h3>

              {/* Sector Description + Differentiated Categories */}
              <div className="md:col-span-5 flex flex-col gap-xs">
                <Text variant="small" className="text-foreground/60 leading-relaxed">
                  {sector.description}
                </Text>

                {/* Interactive Commissions / Projects Links */}
                {hasProjects && (
                  <div className="mt-xs flex flex-wrap items-baseline gap-x-xs font-mono text-[10px]">
                    <span className="text-foreground/35 tracking-widest uppercase">
                      Commissions //
                    </span>
                    <div className="inline-flex flex-wrap items-center gap-x-xs">
                      {sector.projects!.map((title, index) => {
                        const project = getProjectByTitle(title);
                        const href = project ? `/projects/${project.slug}` : "/projects";

                        return (
                          <span key={title} className="inline-flex items-center">
                            <Link
                              href={href as any}
                              className="text-foreground/75 hover:text-foreground underline-offset-4 hover:underline transition-colors uppercase"
                              title={`View ${title} monograph`}
                            >
                              {title}
                              <span className="ml-[2px] text-foreground/35 font-normal">↗</span>
                            </Link>
                            {index < sector.projects!.length - 1 && (
                              <span className="ml-xs text-foreground/25">—</span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Collaborators */}
                {hasCollaborators && (
                  <div className="mt-xs flex flex-wrap items-baseline gap-x-xs font-mono text-[10px]">
                    <span className="text-foreground/35 tracking-widest uppercase">
                      Collaborators //
                    </span>
                    <span className="text-foreground/65 tracking-wider uppercase">
                      {sector.collaborators!.join(" — ")}
                    </span>
                  </div>
                )}

                {/* Key Clients */}
                {hasClients && (
                  <div className="mt-xs flex flex-wrap items-baseline gap-x-xs font-mono text-[10px]">
                    <span className="text-foreground/35 tracking-widest uppercase">
                      Key Clients //
                    </span>
                    <span className="text-foreground/65 tracking-wider uppercase">
                      {sector.clients!.join(" — ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Stagger>

      {note && (
        <Reveal delay={0.1}>
          <p className="text-foreground/35 mt-md font-mono text-[10px] tracking-widest uppercase">
            {note}
          </p>
        </Reveal>
      )}
    </Section>
  );
}
