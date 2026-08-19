import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  as?: "main" | "div";
  /** Remove the fixed-header top offset (used by the unpadded landing). */
  unpadded?: boolean;
}

export function PageContainer({
  children,
  className,
  as: Tag = "main",
  unpadded = false,
}: PageContainerProps) {
  return (
    <Tag
      className={cn("min-h-screen", unpadded ? "" : "pt-(--header-height)", className)}
      id={Tag === "main" ? "main-content" : undefined}
    >
      {children}
    </Tag>
  );
}
