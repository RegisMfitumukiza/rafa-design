"use client";

import { X } from "lucide-react";

import { Image } from "@/components/media/Image";
import { Text } from "@/components/typography/Text";
import { useDialog } from "@/components/ui/useDialog";
import type { TeamMember } from "@/content/studio";
import { cn } from "@/lib/cn";

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
  className?: string;
}

const platformLabels: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  behance: "Behance",
  pinterest: "Pinterest",
  x: "X",
  website: "Website",
  github: "GitHub",
};

/**
 * TeamMemberModal
 *
 * Industrial Monograph Dossier overlay for a selected team member.
 *
 * Uses `w-[min(92vw,48rem)]` (`width: min(92vw, 48rem)` = exactly 768px on desktop,
 * 92% viewport on mobile). This explicit mathematical width guarantees the panel
 * NEVER shrink-wraps into a flexbox min-content vertical sliver.
 */
export function TeamMemberModal({ member, onClose, className }: TeamMemberModalProps) {
  const { panelRef, titleId, dialogProps } = useDialog({
    open: Boolean(member),
    onClose,
    title: member?.name,
    fallbackLabel: "Team Member Dossier",
  });

  if (!member) return null;

  const socialLinks = member.socialLinks?.filter((link) => link.url !== "#") ?? [];
  const hasContact = Boolean(member.email ?? member.phone);

  return (
    <div
      className="z-modal p-md sm:p-lg fixed inset-0 flex items-center justify-center overflow-y-auto"
      {...dialogProps}
    >
      {/* Backdrop scrim */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Panel — explicit w-[min(92vw,48rem)] prevents flexbox shrink-wrap collapse */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "bg-surface shadow-medium border-border/40 relative z-10 w-[min(92vw,48rem)] shrink-0 overflow-hidden rounded-md border",
          "my-auto flex max-h-[88vh] flex-col",
          className,
        )}
      >
        {/* Top Header Bar */}
        <div className="border-border/40 px-lg py-md bg-surface/80 flex shrink-0 items-center justify-between border-b backdrop-blur-sm">
          <div className="gap-xs flex items-center">
            <span className="bg-foreground/40 size-2 rounded-full" />
            <p className="text-foreground/60 font-mono text-[10px] tracking-widest uppercase">
              DOSSIER // {member.role}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="hover:bg-foreground/10 text-foreground/50 hover:text-foreground flex size-8 items-center justify-center rounded-full transition-colors"
            aria-label="Close dossier"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-lg md:p-xl scrollbar-hide overflow-y-auto">
          <div className="gap-xl grid md:grid-cols-12 md:items-start">
            {/* Left Column (5 cols) — Portrait & Quick Actions */}
            <div className="gap-md flex flex-col md:col-span-5">
              <div className="border-border/30 relative overflow-hidden rounded-md border">
                <Image
                  asset={member.image}
                  className="aspect-portrait w-full"
                  sizes="(max-width: 48rem) 100vw, 320px"
                  priority
                />
              </div>

              {/* Direct Quick Contact Buttons */}
              {hasContact && (
                <div className="gap-xs flex flex-col">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background px-md py-xs flex items-center justify-between rounded-sm border font-mono text-[10px] tracking-wider uppercase transition-all duration-300"
                      title={`Send email to ${member.email}`}
                    >
                      <span className="truncate">{member.email}</span>
                      <span className="ml-xs">✉</span>
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/\s/g, "")}`}
                      className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background px-md py-xs flex items-center justify-between rounded-sm border font-mono text-[10px] tracking-wider uppercase transition-all duration-300"
                      title={`Call ${member.phone}`}
                    >
                      <span>{member.phone}</span>
                      <span className="ml-xs">→</span>
                    </a>
                  )}
                </div>
              )}

              {/* Social & Portfolio links */}
              {socialLinks.length > 0 && (
                <div className="border-border/30 pt-sm border-t">
                  <p className="mb-xs text-foreground/35 font-mono text-[9px] tracking-widest uppercase">
                    Profiles & Networks
                  </p>
                  <div className="gap-x-md gap-y-xs flex flex-wrap">
                    {socialLinks.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        className="text-foreground/60 hover:text-foreground inline-flex items-center font-mono text-[10px] tracking-wider uppercase transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label ?? platformLabels[link.platform] ?? link.platform}
                        <span className="text-foreground/30 ml-[3px]">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (7 cols) — Narrative, Interests, External Roles */}
            <div className="gap-lg flex flex-col md:col-span-7">
              <div>
                <div className="gap-sm mb-xs flex flex-wrap items-baseline justify-between">
                  <h3
                    id={titleId}
                    className="font-display text-foreground text-2xl font-medium tracking-tight"
                  >
                    {member.name}
                  </h3>
                  {member.experience !== undefined && (
                    <span className="text-foreground/40 font-mono text-[10px] tracking-wider whitespace-nowrap uppercase">
                      {member.experience} years experience
                    </span>
                  )}
                </div>
                <p className="text-foreground/50 font-mono text-xs tracking-wide uppercase">
                  {member.role}
                </p>
              </div>

              {/* Biography / Personal Story */}
              <div>
                <p className="mb-xs text-foreground/35 font-mono text-[9px] tracking-widest uppercase">
                  Biography & Story
                </p>
                <Text variant="body" className="text-foreground/75 leading-relaxed text-balance">
                  {member.biography}
                </Text>
              </div>

              {/* Disciplines & Interests */}
              {((member.disciplines && member.disciplines.length > 0) ||
                (member.interests && member.interests.length > 0)) && (
                <div className="border-border/30 pt-md gap-sm flex flex-col border-t">
                  {member.disciplines && member.disciplines.length > 0 && (
                    <div>
                      <p className="mb-xs text-foreground/35 font-mono text-[9px] tracking-widest uppercase">
                        Core Disciplines
                      </p>
                      <div className="gap-xs flex flex-wrap">
                        {member.disciplines.map((discipline) => (
                          <span
                            key={discipline}
                            className="bg-foreground/5 border-border/40 px-xs text-foreground/70 rounded-sm border py-[2px] font-mono text-[10px] tracking-wider uppercase"
                          >
                            {discipline}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {member.interests && member.interests.length > 0 && (
                    <div>
                      <p className="mb-xs text-foreground/35 font-mono text-[9px] tracking-widest uppercase">
                        Design Interests & Focus
                      </p>
                      <p className="text-foreground/60 font-mono text-[11px]">
                        {member.interests.join(" · ")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* External Affiliations & Other Roles */}
              {member.otherRoles && member.otherRoles.length > 0 && (
                <div className="border-border/30 pt-md border-t">
                  <p className="mb-sm text-foreground/35 font-mono text-[9px] tracking-widest uppercase">
                    Parallel Practice & Affiliations (Also At)
                  </p>
                  <div className="border-border/40 divide-border/40 divide-y border-y">
                    {member.otherRoles.map((roleItem) => (
                      <div
                        key={`${roleItem.company}-${roleItem.title}`}
                        className="py-xs gap-xs flex flex-col justify-between sm:flex-row sm:items-baseline"
                      >
                        <span className="text-foreground/85 text-xs font-medium">
                          {roleItem.title}
                        </span>
                        <span className="text-foreground/50 font-mono text-[10px]">
                          {roleItem.company}
                          {roleItem.location && ` (${roleItem.location})`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
