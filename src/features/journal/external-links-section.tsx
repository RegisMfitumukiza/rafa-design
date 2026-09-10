import { Link as TextLink } from "@/components/ui/Link";
import type { ExternalLink } from "@/content/journal";
import { cn } from "@/lib/cn";

interface ExternalLinksSectionProps {
  links: ExternalLink[];
  className?: string;
}

export function ExternalLinksSection({ links, className }: ExternalLinksSectionProps) {
  if (links.length === 0) return null;

  return (
    <div className={cn("border-border py-2xl my-2xl border-y", className)}>
      <p className="text-foreground/40 mb-md text-overline font-mono tracking-widest uppercase">
        Specification // Related Links
      </p>

      <div className="gap-y-lg flex flex-col">
        {links.map((link, idx) => (
          <div key={idx}>
            <TextLink
              href={link.url}
              external={link.url.startsWith("http")}
              variant="underline"
              className="group gap-xs text-foreground inline-flex items-center text-base font-medium"
            >
              {link.label}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </TextLink>
            {link.description && (
              <p className="text-foreground/60 mt-xs text-sm">{link.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
