import { type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Stagger } from "@/motion";

interface GridProps {
  children: ReactNode;
  className?: string | undefined;
  columns?: "1" | "2" | "3";
}

const gridColumns = {
  "1": "md:grid-cols-1",
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-2 lg:grid-cols-3",
} as const;

export function Grid({ children, className, columns = "3" }: GridProps) {
  return (
    <Stagger className={cn("gap-lg grid", gridColumns[columns], className)}>{children}</Stagger>
  );
}
