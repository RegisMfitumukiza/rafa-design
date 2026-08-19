import { type ReactNode } from "react";

import { Grid } from "@/components/ui/Grid";

interface JournalGridProps {
  children: ReactNode;
  className?: string;
}

export function JournalGrid({ children, className }: JournalGridProps) {
  return <Grid className={className}>{children}</Grid>;
}
