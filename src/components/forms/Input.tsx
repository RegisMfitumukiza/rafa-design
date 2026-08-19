"use client";

import { useId, type Ref } from "react";

import { Field } from "@/components/ui/Field";
import { cn } from "@/lib/cn";

interface InputProps {
  label?: string;
  name: string;
  type?: "text" | "email" | "tel" | "url" | "password";
  placeholder?: string;
  required?: boolean;
  error?: string | undefined;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
}

export function Input({
  label,
  name,
  type = "text",
  placeholder,
  required,
  error,
  disabled,
  className,
  value,
  onChange,
  onBlur,
  ref,
}: InputProps) {
  const id = useId();

  return (
    <Field id={id} label={label} required={required} error={error} className={className}>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        className={cn(
          "bg-surface px-md py-sm text-foreground placeholder:text-foreground/60 motion-safe:duration-base rounded-sm border text-sm transition-colors",
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
