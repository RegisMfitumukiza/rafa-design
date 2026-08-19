import type { CreditsBlock as CreditsBlockType } from "@/content/journal";
import { Link as TextLink } from "@/components/ui/Link";
import { cn } from "@/lib/cn";

interface CreditsBlockProps {
  block: CreditsBlockType;
  className?: string;
}

/**
 * CreditsBlock
 *
 * Ruled Architectural Credits & Attribution Sheet.
 * Displays professional roles (Photography, Visualization, Drawing, Source),
 * names, organizations, and external links in a clean 12-column grid.
 */
export function CreditsBlock({ block, className }: CreditsBlockProps) {
  const { credits } = block;

  if (!credits || credits.length === 0) return null;

  return (
    <div className={cn("border-border/40 border-t pt-2xl mt-3xl", className)}>
      <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase mb-lg">
        Specification // Credits & Attribution
      </p>

      <div className="border-border/40 divide-border/40 divide-y border-y">
        {credits.map((credit, idx) => {
          const roleFormatted = credit.role.charAt(0).toUpperCase() + credit.role.slice(1);
          return (
            <div key={idx} className="py-md gap-x-lg gap-y-xs grid md:grid-cols-12 items-baseline">
              {/* Role */}
              <div className="md:col-span-4">
                <p className="text-foreground/40 font-mono text-[10px] uppercase tracking-widest">
                  {roleFormatted}
                </p>
              </div>

              {/* Name & Organization */}
              <div className="md:col-span-8 flex flex-col items-start justify-between sm:flex-row sm:items-center gap-xs">
                <div>
                  {credit.url ? (
                    <TextLink
                      href={credit.url}
                      external
                      variant="underline"
                      className="text-foreground font-mono text-sm font-medium"
                    >
                      {credit.name} ↗
                    </TextLink>
                  ) : (
                    <p className="text-foreground font-mono text-sm font-medium">{credit.name}</p>
                  )}
                  {credit.organization && (
                    <p className="text-foreground/50 text-xs font-mono mt-xs">{credit.organization}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
