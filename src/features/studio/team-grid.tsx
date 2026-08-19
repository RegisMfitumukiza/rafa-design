"use client";

import { useState } from "react";

import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography/Heading";
import type { TeamMember } from "@/content/studio";
import { ui } from "@/content/ui";
import { Reveal, Stagger } from "@/motion";

import { TeamMemberCard } from "./team-member-card";
import { TeamMemberModal } from "./team-member-modal";

interface TeamGridProps {
  members: TeamMember[];
  className?: string;
}

/**
 * TeamGrid
 *
 * Responsive, scalable grid for studio team members.
 * Manages active member state for launching the rich Monograph Dossier Modal.
 */
export function TeamGrid({ members, className }: TeamGridProps) {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  return (
    <>
      <Section container="wide" className={className ?? ""}>
        <Reveal>
          <div className="mb-xl flex items-baseline justify-between">
            <div>
              <p className="mb-xs font-mono text-xs tracking-widest text-foreground/50 uppercase">
                {ui.overlines.team}
              </p>
              <Heading variant="h2">{ui.sections.team}</Heading>
            </div>
            <p className="hidden font-mono text-xs tracking-wider text-foreground/40 uppercase sm:block">
              {members.length} Members // Click card for dossier
            </p>
          </div>
        </Reveal>

        {/* Scalable fluid grid */}
        <Stagger className="gap-xl grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.08}>
          {members.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onSelect={(selected) => setActiveMember(selected)}
            />
          ))}
        </Stagger>
      </Section>

      {/* Industrial Monograph Dossier Modal */}
      <TeamMemberModal
        member={activeMember}
        onClose={() => setActiveMember(null)}
      />
    </>
  );
}
