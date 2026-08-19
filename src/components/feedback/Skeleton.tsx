import { cn } from "@/lib/cn";

interface SkeletonProps {
  className?: string;
  as?: "div" | "span";
}

export function Skeleton({ className, as: Tag = "div" }: SkeletonProps) {
  return <Tag className={cn("bg-muted animate-pulse rounded-sm", className)} aria-hidden="true" />;
}
