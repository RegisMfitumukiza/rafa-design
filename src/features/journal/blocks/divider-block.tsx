import type { DividerBlock as DividerBlockType } from "@/content/journal";
import { cn } from "@/lib/cn";

interface DividerBlockProps {
  block: DividerBlockType;
  className?: string;
}

export function DividerBlock({ block, className }: DividerBlockProps) {
  const { style = "ruled" } = block;
  
  if (style === "space") {
    return <div className={cn("my-2xl", className)} />;
  }
  
  if (style === "line") {
    return <hr className={cn("border-border border-t my-2xl", className)} />;
  }
  
  // ruled (architectural separator)
  return (
    <div className={cn("my-2xl", className)}>
      <div className="border-border border-t w-full" />
    </div>
  );
}
