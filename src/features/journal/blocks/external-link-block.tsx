import { Link as TextLink } from "@/components/ui/Link";
import type { ExternalLinkBlock as ExternalLinkBlockType } from "@/content/journal";
import { cn } from "@/lib/cn";

interface ExternalLinkBlockProps {
  block: ExternalLinkBlockType;
  className?: string;
}

export function ExternalLinkBlock({ block, className }: ExternalLinkBlockProps) {
  return (
    <div className={cn("my-md", className)}>
      <TextLink
        href={block.url}
        external={block.url.startsWith("http")}
        variant="underline"
        className="group gap-xs text-foreground inline-flex items-center text-base font-medium"
      >
        {block.label}
        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </TextLink>
      {block.description && <p className="text-foreground/60 mt-xs text-sm">{block.description}</p>}
    </div>
  );
}
