import type { Route } from "next";

import NextLink from "next/link";
import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

const linkVariants = {
  default: "text-foreground",
  underline: "underline underline-offset-2",
  subtle: "text-foreground/60 hover:text-foreground",
} as const;

interface LinkProps {
  href: string;
  children: ReactNode;
  variant?: keyof typeof linkVariants;
  external?: boolean;
  className?: string;
}

export function Link({ href, children, variant = "default", external, className }: LinkProps) {
  const classes = cn(
    "motion-safe:duration-base transition-colors",
    linkVariants[variant],
    className,
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href as Route} className={classes}>
      {children}
    </NextLink>
  );
}
