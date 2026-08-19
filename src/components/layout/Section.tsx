import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SectionProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  container?: "narrow" | "content" | "standard" | "wide" | "full";
  id?: string;
  noPadding?: boolean;
}

export function Section({
  children,
  className = "",
  as: Tag = "section",
  container = "standard",
  id,
  noPadding = false,
}: SectionProps) {
  return (
    <Tag id={id} className={cn(noPadding ? "" : "py-xl md:py-2xl", className)}>
      <div className={cn(`container-${container}`)}>{children}</div>
    </Tag>
  );
}
