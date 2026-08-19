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
        className="bg-black/70 fixed inset-0 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Panel — explicit w-[min(92vw,48rem)] prevents flexbox shrink-wrap collapse */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "bg-surface shadow-medium border-border/40 relative z-10 w-[min(92vw,48rem)] shrink-0 overflow-hidden rounded-md border",
          "max-h-[88vh] flex flex-col my-auto",
          className,
        )}
      >
        {/* Top Header Bar */}
        <div className="border-border/40 px-lg py-md flex items-center justify-between border-b bg-surface/80 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-xs">
            <span className="bg-foreground/40 size-2 rounded-full" />
            <p className="font-mono text-[10px] tracking-widest text-foreground/60 uppercase">
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
        <div className="p-lg md:p-xl overflow-y-auto scrollbar-hide">
          <div className="gap-xl grid md:grid-cols-12 md:items-start">
            
            {/* Left Column (5 cols) — Portrait & Quick Actions */}
            <div className="md:col-span-5 flex flex-col gap-md">
              <div className="relative overflow-hidden rounded-md border border-border/30">
                <Image
                  asset={member.image}
                  className="aspect-portrait w-full"
                  sizes="(max-width: 48rem) 100vw, 320px"
                  priority
                />
              </div>

              {/* Direct Quick Contact Buttons */}
              {hasContact && (
                <div className="flex flex-col gap-xs">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background px-md py-xs font-mono text-[10px] flex items-center justify-between border uppercase tracking-wider transition-all duration-300 rounded-sm"
                      title={`Send email to ${member.email}`}
                    >
                      <span className="truncate">{member.email}</span>
                      <span className="ml-xs">✉</span>
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/\s/g, "")}`}
                      className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background px-md py-xs font-mono text-[10px] flex items-center justify-between border uppercase tracking-wider transition-all duration-300 rounded-sm"
                      title={`Call ${member.phone}`}
                    >
                      <span>{member.phone}</span>
                      <span className="ml-xs">📞</span>
                    </a>
                  )}
                </div>
              )}

              {/* Social & Portfolio links */}
              {socialLinks.length > 0 && (
                <div className="border-border/30 pt-sm border-t">
                  <p className="mb-xs font-mono text-[9px] tracking-widest text-foreground/35 uppercase">
                    Profiles & Networks
                  </p>
                  <div className="flex flex-wrap gap-x-md gap-y-xs">
                    {socialLinks.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        className="font-mono text-[10px] tracking-wider text-foreground/60 hover:text-foreground inline-flex items-center uppercase transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label ?? platformLabels[link.platform] ?? link.platform}
                        <span className="ml-[3px] text-foreground/30">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (7 cols) — Narrative, Interests, External Roles */}
            <div className="md:col-span-7 flex flex-col gap-lg">
              <div>
                <div className="flex items-baseline justify-between gap-sm mb-xs flex-wrap">
                  <h3 id={titleId} className="font-display text-2xl font-medium tracking-tight text-foreground">
                    {member.name}
                  </h3>
                  {member.experience !== undefined && (
                    <span className="font-mono text-[10px] tracking-wider text-foreground/40 uppercase whitespace-nowrap">
                      {member.experience} years experience
                    </span>
                  )}
                </div>
                <p className="font-mono text-xs text-foreground/50 tracking-wide uppercase">
                  {member.role}
                </p>
              </div>

              {/* Biography / Personal Story */}
              <div>
                <p className="mb-xs font-mono text-[9px] tracking-widest text-foreground/35 uppercase">
                  Biography & Story
                </p>
                <Text variant="body" className="leading-relaxed text-foreground/75 text-balance">
                  {member.biography}
                </Text>
              </div>

              {/* Disciplines & Interests */}
              {((member.disciplines && member.disciplines.length > 0) ||
                (member.interests && member.interests.length > 0)) && (
                <div className="border-border/30 pt-md border-t flex flex-col gap-sm">
                  {member.disciplines && member.disciplines.length > 0 && (
                    <div>
                      <p className="mb-xs font-mono text-[9px] tracking-widest text-foreground/35 uppercase">
                        Core Disciplines
                      </p>
                      <div className="flex flex-wrap gap-xs">
                        {member.disciplines.map((discipline) => (
                          <span
                            key={discipline}
                            className="bg-foreground/5 border-border/40 px-xs py-[2px] font-mono text-[10px] tracking-wider text-foreground/70 uppercase border rounded-sm"
                          >
                            {discipline}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {member.interests && member.interests.length > 0 && (
                    <div>
                      <p className="mb-xs font-mono text-[9px] tracking-widest text-foreground/35 uppercase">
                        Design Interests & Focus
                      </p>
                      <p className="font-mono text-[11px] text-foreground/60">
                        {member.interests.join(" · ")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* External Affiliations & Other Roles */}
              {member.otherRoles && member.otherRoles.length > 0 && (
                <div className="border-border/30 pt-md border-t">
                  <p className="mb-sm font-mono text-[9px] tracking-widest text-foreground/35 uppercase">
                    Parallel Practice & Affiliations (Also At)
                  </p>
                  <div className="border-border/40 divide-border/40 divide-y border-y">
                    {member.otherRoles.map((roleItem) => (
                      <div
                        key={`${roleItem.company}-${roleItem.title}`}
                        className="py-xs flex flex-col justify-between sm:flex-row sm:items-baseline gap-xs"
                      >
                        <span className="text-xs font-medium text-foreground/85">
                          {roleItem.title}
                        </span>
                        <span className="font-mono text-[10px] text-foreground/50">
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
