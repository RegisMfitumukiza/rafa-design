import { type ReactNode } from "react";

import { typography } from "@/design-system/typography";
import { cn } from "@/lib/cn";

export type HeadingTag = "h1" | "h2" | "h3";
type HeadingVariant = keyof typeof typography.styles;

const tagMap: Record<string, HeadingTag> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
};

interface HeadingProps {
  as?: HeadingVariant;
  variant?: HeadingVariant;
  children: ReactNode;
  className?: string;
}

export function Heading({ as, variant = "h2", children, className }: HeadingProps) {
  const tag = tagMap[as ?? variant];
  const Tag: HeadingTag = tag !== undefined ? tag : "h2";
  const style = typography.styles[variant as keyof typeof typography.styles];

  return (
    <Tag
      className={cn("font-display", className)}
      style={{
        fontSize: style.size,
        lineHeight: style.lineHeight,
        fontWeight: style.weight,
      }}
    >
      {children}
    </Tag>
  );
}
