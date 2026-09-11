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
 * Responsive behaviour:
 *   • Mobile / tablet (< md):  Full-height bottom-sheet drawer that slides up
 *     from the bottom of the viewport. The sheet itself is scrollable so content
 *     never clips regardless of viewport height.
 *   • Desktop (≥ md):  Classic centred modal, capped at 88 vh with an internal
 *     scrollable body. Width is min(92vw, 48rem).
 *
 * Both modes carry `data-lenis-prevent` so Lenis smooth-scroll never intercepts
 * wheel / touch events inside the panel.
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
    <>
      {/* ── BACKDROP ──────────────────────────────────────────────────────── */}
      <div
        className="z-modal fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── PANEL POSITIONER ──────────────────────────────────────────────── */}
      {/*
       * Mobile (< md):  Fixed to the bottom of the screen, full width, up to
       *   96 dvh tall. The panel itself scrolls vertically.
       * Desktop (≥ md):  Centred absolutely, fixed width, max-height 88 vh,
       *   with the inner body scrollable.
       *
       * `data-lenis-prevent` on the panel stops Lenis from hijacking scroll.
       */}
      <div
        className={cn(
          // Shared
          "z-modal fixed",
          // Mobile: bottom sheet
          "inset-x-0 bottom-0 max-h-[96dvh] overflow-y-auto rounded-t-xl",
          // Desktop: centred modal (overrides the sheet geometry)
          "md:inset-0 md:m-auto md:flex md:h-fit md:max-h-[88vh] md:w-[min(92vw,48rem)] md:flex-col md:overflow-hidden md:rounded-xl",
          className,
        )}
        {...dialogProps}
        ref={panelRef}
        // Stop Lenis from swallowing wheel/touch inside the modal
        data-lenis-prevent
        tabIndex={-1}
      >
        <div
          className={cn(
            "bg-surface border-border/40 shadow-medium",
            // Mobile: fills the sheet naturally
            "flex flex-col",
            // Desktop: fills the capped modal height
            "md:max-h-[88vh] md:overflow-hidden",
            "rounded-t-xl border md:rounded-xl",
          )}
        >
          {/* ── HEADER BAR ──────────────────────────────────────────────── */}
          {/*
           * Mobile: a grab handle pill signals the bottom-sheet affordance.
           * Desktop: standard title + close button bar.
           */}
          <div className="border-border/40 bg-surface/80 flex shrink-0 flex-col border-b backdrop-blur-sm">
            {/* Grab handle — visible only on mobile */}
            <div className="flex justify-center pt-3 pb-1 md:hidden" aria-hidden="true">
              <span className="bg-foreground/20 h-1 w-10 rounded-full" />
            </div>

            {/* Title bar */}
            <div className="px-lg py-md flex items-center justify-between">
              <div className="gap-xs flex items-center">
                <span className="bg-foreground/40 size-2 rounded-full" />
                <p className="text-foreground/60 text-overline font-mono tracking-widest uppercase">
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
          </div>

          {/* ── BODY ────────────────────────────────────────────────────── */}
          {/*
           * Mobile: body not scrollable — the outer panel wrapper scrolls.
           * Desktop: body scrollable inside the fixed-height modal.
           */}
          <div className="p-lg md:p-xl md:[scrollbar-width:none] md:overflow-y-auto md:[&::-webkit-scrollbar]:hidden">
            <div className="gap-xl grid md:grid-cols-12 md:items-start">
              {/* Left Column (5 cols) — Portrait & Quick Actions */}
              <div className="gap-md flex flex-col md:col-span-5">
                <div className="border-border/30 relative overflow-hidden rounded-md border">
                  <Image
                    asset={member.image}
                    fill
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
                        className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background px-md py-xs text-overline flex items-center justify-between rounded-sm border font-mono tracking-wider uppercase transition-all duration-300"
                        title={`Send email to ${member.email}`}
                      >
                        <span className="truncate">{member.email}</span>
                        <span className="ml-xs">✉</span>
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone.replace(/\s/g, "")}`}
                        className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background px-md py-xs text-overline flex items-center justify-between rounded-sm border font-mono tracking-wider uppercase transition-all duration-300"
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
                    <p className="mb-xs text-foreground/35 text-micro font-mono tracking-widest uppercase">
                      Profiles &amp; Networks
                    </p>
                    <div className="gap-x-md gap-y-xs flex flex-wrap">
                      {socialLinks.map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          className="text-foreground/60 hover:text-foreground text-overline inline-flex items-center font-mono tracking-wider uppercase transition-colors"
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
                      <span className="text-foreground/40 text-overline font-mono tracking-wider whitespace-nowrap uppercase">
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
                  <p className="mb-xs text-foreground/35 text-micro font-mono tracking-widest uppercase">
                    Biography &amp; Story
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
                        <p className="mb-xs text-foreground/35 text-micro font-mono tracking-widest uppercase">
                          Core Disciplines
                        </p>
                        <div className="gap-xs flex flex-wrap">
                          {member.disciplines.map((discipline) => (
                            <span
                              key={discipline}
                              className="bg-foreground/5 border-border/40 px-xs text-foreground/70 text-overline rounded-sm border py-[2px] font-mono tracking-wider uppercase"
                            >
                              {discipline}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {member.interests && member.interests.length > 0 && (
                      <div>
                        <p className="mb-xs text-foreground/35 text-micro font-mono tracking-widest uppercase">
                          Design Interests &amp; Focus
                        </p>
                        <p className="text-foreground/60 text-label font-mono">
                          {member.interests.join(" · ")}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* External Affiliations & Other Roles */}
                {member.otherRoles && member.otherRoles.length > 0 && (
                  <div className="border-border/30 pt-md border-t">
                    <p className="mb-sm text-foreground/35 text-micro font-mono tracking-widest uppercase">
                      Parallel Practice &amp; Affiliations (Also At)
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
                          <span className="text-foreground/50 text-overline font-mono">
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

            {/* Bottom padding for mobile sheet — ensures content clears the home indicator */}
            <div className="h-safe-bottom pt-lg md:pt-0" aria-hidden="true" />
          </div>
        </div>
      </div>
    </>
  );
}
