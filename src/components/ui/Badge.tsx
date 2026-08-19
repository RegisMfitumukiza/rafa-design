import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

const badgeVariants = {
  default: "bg-muted text-foreground",
  accent: "bg-accent text-background",
  outline: "border border-border text-foreground",
} as const;

const badgeSizes = {
  sm: "px-xs py-0.5 text-xs",
  md: "px-sm py-xs text-sm",
} as const;

interface BadgeProps {
  children: ReactNode;
  variant?: keyof typeof badgeVariants;
  size?: keyof typeof badgeSizes;
  className?: string;
}

export function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium tracking-wide",
        badgeVariants[variant],
        badgeSizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
