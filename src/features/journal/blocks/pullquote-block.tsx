import type { PullQuoteBlock as PullQuoteBlockType } from "@/content/journal";
import { cn } from "@/lib/cn";

interface PullQuoteBlockProps {
  block: PullQuoteBlockType;
  className?: string;
}

/**
 * PullQuoteBlock
 *
 * Horizontal Architectural Pullquote.
 * Uses a 12-column horizontal split grid:
 *   [3 cols] Monospace quote overline + author attribution
 *   [9 cols] Refined horizontal quote text (text-xl md:text-2xl lg:text-3xl)
 *
 * Prevents screen-filling vertical text blocks while giving quotes a restrained,
 * monograph-quality horizontal layout bounded by hairline borders.
 */
export function PullQuoteBlock({ block, className }: PullQuoteBlockProps) {
  const { content, author } = block;

  if (!content || !content.trim()) return null;

  return (
    <blockquote className={cn("border-border/40 border-y py-lg md:py-xl my-xl w-full", className)}>
      <div className="gap-x-xl gap-y-sm grid items-start md:grid-cols-12">
        {/* Left 3 cols: Monospace metadata & Author */}
        <div className="md:col-span-3">
          <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
            Specification // Statement
          </p>
          {author && (
            <p className="text-foreground/60 font-mono text-xs mt-xs">
              — {author}
            </p>
          )}
        </div>

        {/* Right 9 cols: Horizontal Quote Text */}
        <div className="md:col-span-9">
          <p className="font-display text-foreground/90 text-xl font-medium leading-snug tracking-tight md:text-2xl lg:text-3xl text-balance">
            &ldquo;{content}&rdquo;
          </p>
        </div>
      </div>
    </blockquote>
  );
}
