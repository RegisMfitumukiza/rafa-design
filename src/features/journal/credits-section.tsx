import { Link as TextLink } from "@/components/ui/Link";
import type { ImageCredit } from "@/content/journal";
import { cn } from "@/lib/cn";

interface CreditsSectionProps {
  credits: ImageCredit[];
  className?: string;
}

export function CreditsSection({ credits, className }: CreditsSectionProps) {
  if (credits.length === 0) return null;

  return (
    <div className={cn("border-border pt-2xl mt-2xl border-t", className)}>
      <p className="text-foreground/40 mb-lg font-mono text-[10px] tracking-widest uppercase">
        Specification // Credits
      </p>

      <div className="gap-y-md flex flex-col">
        {credits.map((credit, idx) => (
          <div key={idx} className="gap-x-lg grid md:grid-cols-12">
            {/* Role */}
            <div className="md:col-span-3">
              <p className="text-foreground/50 font-mono text-xs tracking-wider uppercase">
                {credit.role || "Credit"}
              </p>
            </div>

            {/* Name + Details */}
            <div className="md:col-span-9">
              {credit.url ? (
                <TextLink
                  href={credit.url}
                  external
                  variant="underline"
                  className="text-foreground text-base"
                >
                  {credit.name}
                </TextLink>
              ) : (
                <p className="text-foreground text-base">{credit.name}</p>
              )}
              {credit.images && <p className="text-foreground/60 mt-xs text-sm">{credit.images}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
