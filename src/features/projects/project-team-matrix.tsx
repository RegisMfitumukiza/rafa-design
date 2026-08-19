import type { ProjectTeam } from "@/content/projects";
import { Reveal } from "@/motion";

interface ProjectTeamMatrixProps {
  team: ProjectTeam;
  className?: string;
}

export function ProjectTeamMatrix({ team, className = "" }: ProjectTeamMatrixProps) {
  return (
    <div className={className}>
      <Reveal>
        <p className="text-foreground/50 mb-md font-mono text-xs tracking-widest uppercase">
          PROJECT TEAM & CREDITS
        </p>

        <div className="border-border/40 divide-border/40 divide-y border-y font-mono text-xs">
          <div className="py-sm gap-xs flex flex-col justify-between sm:flex-row sm:items-center">
            <span className="text-foreground/40 uppercase">PARTNER IN CHARGE</span>
            <span className="text-foreground/90 font-medium">{team.partnerInCharge}</span>
          </div>

          <div className="py-sm gap-xs flex flex-col justify-between sm:flex-row sm:items-center">
            <span className="text-foreground/40 uppercase">PROJECT LEAD</span>
            <span className="text-foreground/90 font-medium">{team.projectLead}</span>
          </div>

          {team.team.length > 0 && (
            <div className="py-sm gap-xs flex flex-col justify-between sm:flex-row sm:items-start">
              <span className="text-foreground/40 uppercase">PROJECT TEAM</span>
              <span className="text-foreground/80 sm:text-right">{team.team.join(" · ")}</span>
            </div>
          )}

          {team.collaborators && team.collaborators.length > 0 && (
            <div className="py-sm gap-xs flex flex-col justify-between sm:flex-row sm:items-start">
              <span className="text-foreground/40 uppercase">COLLABORATORS & ENGINEERS</span>
              <span className="text-foreground/80 sm:text-right">
                {team.collaborators.join(" · ")}
              </span>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
