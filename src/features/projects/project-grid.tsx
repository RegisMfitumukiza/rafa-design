import { type ReactNode } from "react";

import { Grid } from "@/components/ui/Grid";

interface ProjectGridProps {
  children: ReactNode;
  className?: string;
}

export function ProjectGrid({ children, className }: ProjectGridProps) {
  return <Grid className={className}>{children}</Grid>;
}
