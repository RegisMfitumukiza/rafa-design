"use client";

import { useId, type Ref } from "react";

import { Field } from "@/components/ui/Field";
import { cn } from "@/lib/cn";

interface TextareaProps {
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  error?: string | undefined;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  ref?: Ref<HTMLTextAreaElement>;
}

export function Textarea({
  label,
  name,
  placeholder,
  required,
  rows = 4,
  error,
  disabled,
  className,
  value,
  onChange,
  onBlur,
  ref,
}: TextareaProps) {
  const id = useId();

  return (
    <Field id={id} label={label} required={required} error={error} className={className}>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        className={cn(
          "bg-surface px-md py-sm text-foreground placeholder:text-foreground/60 motion-safe:duration-base min-h-(--spacing-3xl) resize-y rounded-sm border text-sm transition-colors",
          error
            ? "border-accent"
            : "border-border hover:border-foreground/30 focus:border-foreground",
          "focus:ring-foreground/20 focus:ring-1 focus:outline-none",
          disabled && "pointer-events-none opacity-50",
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </Field>
  );
}
