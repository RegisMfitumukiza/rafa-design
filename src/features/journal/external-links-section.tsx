import type { ExternalLink } from "@/content/journal";
import { Link as TextLink } from "@/components/ui/Link";
import { cn } from "@/lib/cn";

interface ExternalLinksSectionProps {
  links: ExternalLink[];
  className?: string;
}

export function ExternalLinksSection({ links, className }: ExternalLinksSectionProps) {
  if (links.length === 0) return null;

  return (
    <div className={cn("border-border border-y py-2xl my-2xl", className)}>
      <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase mb-md">
        Specification // Related Links
      </p>

      <div className="gap-y-lg flex flex-col">
        {links.map((link, idx) => (
          <div key={idx}>
            <TextLink
              href={link.url}
              external={link.url.startsWith("http")}
              variant="underline"
              className="group inline-flex items-center gap-xs text-foreground text-base font-medium"
            >
              {link.label}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </TextLink>
            {link.description && (
              <p className="text-foreground/60 text-sm mt-xs">{link.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
