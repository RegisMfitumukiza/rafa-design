import { type ReactNode } from "react";

import { typography } from "@/design-system/typography";
import { cn } from "@/lib/cn";

type TextVariant = "body" | "small";

interface TextProps {
  as?: "p" | "span" | "div";
  variant?: TextVariant;
  children: ReactNode;
  className?: string;
}

export function Text({ as: Tag = "p", variant = "body", children, className }: TextProps) {
  const style = typography.styles[variant];

  return (
    <Tag
      className={cn("text-foreground font-sans", className)}
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
