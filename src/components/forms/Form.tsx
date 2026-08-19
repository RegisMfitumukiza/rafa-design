import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface FormProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export function Form({ children, onSubmit, className }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={cn("gap-lg flex flex-col", className)} noValidate>
      {children}
    </form>
  );
}
