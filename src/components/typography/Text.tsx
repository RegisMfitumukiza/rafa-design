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
  const hasTextSizeClass = className
    ? /\btext-(xs|sm|base|lg|xl|[2-9]?xl)\b/.test(className)
    : false;

  return (
    <Tag
      className={cn("text-foreground font-sans", className)}
      style={{
        ...(hasTextSizeClass ? {} : { fontSize: style.size }),
        lineHeight: style.lineHeight,
        fontWeight: style.weight,
      }}
    >
      {children}
    </Tag>
  );
}
