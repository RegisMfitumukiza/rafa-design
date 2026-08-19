import { Image } from "@/components/media/Image";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import type { TeamMember } from "@/content/studio";
import { cn } from "@/lib/cn";

interface TeamMemberCardProps {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
  className?: string;
}

/**
 * TeamMemberCard
 *
 * Minimal, museum-grade architectural card for the main studio page grid.
 *
 * Keeps the page grid ultra-clean while providing a high-impact interactive
 * hover experience. Clicking anywhere on the card triggers the rich Dossier Modal.
 */
export function TeamMemberCard({ member, onSelect, className }: TeamMemberCardProps) {
  return (
    <article className={cn("group border-border/40 pt-md border-t", className ?? "")}>
      <button
        type="button"
        onClick={() => onSelect(member)}
        className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-foreground/50 rounded-sm"
        aria-label={`View dossier for ${member.name}`}
      >
        {/* Portrait image with hover scale & gradient overlay */}
        <div className="relative overflow-hidden rounded-md border border-border/20">
          <Image
            asset={member.image}
            className="aspect-portrait w-full"
            imgClassName="transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
            sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 25vw"
          />

          {/* Hover scrim & trigger cue */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-black/0 p-md transition-colors duration-500 group-hover:bg-black/35"
          >
            {/* Top right tag */}
            <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-black/60 backdrop-blur-sm text-white/80 font-mono text-[9px] tracking-widest px-xs py-[2px] uppercase rounded-sm border border-white/10">
                DOSSIER +
              </span>
            </div>

            {/* Bottom disciplines tag */}
            <div className="translate-y-2 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              {member.disciplines && member.disciplines.length > 0 && (
                <p className="font-mono text-[9px] tracking-wider text-white/70 uppercase">
                  {member.disciplines.join(" · ")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Name + experience */}
        <div className="mt-md flex items-baseline justify-between gap-sm">
          <Heading variant="h3" className="text-xl font-medium tracking-tight group-hover:text-foreground/80 transition-colors">
            {member.name}
          </Heading>
          {member.experience !== undefined && (
            <span className="whitespace-nowrap font-mono text-[10px] tracking-wider text-foreground/40 uppercase">
              {member.experience} yrs
            </span>
          )}
        </div>

        {/* Role */}
        <Text variant="small" className="text-foreground/50 mt-xs">
          {member.role}
        </Text>

        {/* Action link cue at bottom */}
        <div className="mt-sm flex items-center justify-between border-t border-border/30 pt-xs font-mono text-[10px] tracking-widest text-foreground/40 uppercase group-hover:text-foreground transition-colors">
          <span>View Dossier</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </button>
    </article>
  );
}
