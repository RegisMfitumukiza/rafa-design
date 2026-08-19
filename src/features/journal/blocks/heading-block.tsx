import React from "react";
import type { HeadingBlock as HeadingBlockType } from "@/content/journal";
import { cn } from "@/lib/cn";

interface HeadingBlockProps {
  block: HeadingBlockType;
  sectionNumber?: string;
  className?: string;
}

export function HeadingBlock({ block, sectionNumber, className }: HeadingBlockProps) {
  const Tag = `h${block.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  
  const headingClasses = cn(
    "font-display text-foreground font-medium tracking-tight",
    block.level === 1 && "text-3xl md:text-4xl lg:text-5xl",
    block.level === 2 && "text-2xl md:text-3xl lg:text-4xl",
    block.level === 3 && "text-xl md:text-2xl",
    className,
  );

  return (
    <div>
      {sectionNumber && (
        <p className="text-foreground/40 font-mono text-xs tracking-widest uppercase mb-xs">
          {sectionNumber}
        </p>
      )}
      <Tag id={block.id} className={headingClasses}>
        {block.content}
      </Tag>
    </div>
  );
}
