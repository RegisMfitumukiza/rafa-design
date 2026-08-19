import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

const cardVariants = {
  default: "bg-surface",
  elevated: "bg-surface shadow-soft",
  bordered: "border border-border bg-surface",
  flat: "bg-transparent",
} as const;

interface CardProps {
  children: ReactNode;
  variant?: keyof typeof cardVariants;
  className?: string;
}

function CardRoot({ children, variant = "default", className }: CardProps) {
  return <div className={cn("rounded-md", cardVariants[variant], className)}>{children}</div>;
}

interface CardImageProps {
  children: ReactNode;
  className?: string;
}

function CardImage({ children, className }: CardImageProps) {
  return <div className={cn("overflow-hidden", className)}>{children}</div>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("p-md", className)}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

function CardFooter({ children, className }: CardFooterProps) {
  return <div className={cn("border-border px-md py-sm border-t", className)}>{children}</div>;
}

export const Card = Object.assign(CardRoot, {
  Image: CardImage,
  Content: CardContent,
  Footer: CardFooter,
});
