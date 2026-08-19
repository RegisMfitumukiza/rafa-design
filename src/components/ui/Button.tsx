"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

const buttonVariants = {
  primary: "bg-accent text-background hover:bg-accent/90",
  secondary: "bg-surface text-foreground hover:bg-muted",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  outline: "border border-border text-foreground hover:bg-muted",
} as const;

const buttonSizes = {
  sm: "px-sm py-xs text-sm",
  md: "px-md py-sm text-sm",
  lg: "px-lg py-md text-base",
} as const;

interface ButtonProps {
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "motion-safe:duration-base inline-flex items-center justify-center rounded-sm font-medium tracking-wide uppercase transition-colors",
        buttonVariants[variant],
        buttonSizes[size],
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}
