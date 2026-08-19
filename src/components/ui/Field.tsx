import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface FieldProps {
  id: string;
  label?: string | undefined;
  required?: boolean | undefined;
  error?: string | undefined;
  children: ReactNode;
  className?: string | undefined;
}

export function Field({ id, label, required, error, children, className }: FieldProps) {
  return (
    <div className={cn("gap-xs flex flex-col", className)}>
      {label && (
        <label htmlFor={id} className="text-foreground text-sm font-medium">
          {label}
          {required && (
            <span className="text-accent ml-px" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="text-accent text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
