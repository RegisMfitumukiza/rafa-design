import { cn } from "@/lib/cn";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const loadingSizes = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-8 border-3",
} as const;

export function Loading({ size = "md", label = "Loading", className }: LoadingProps) {
  return (
    <div
      className={cn("gap-sm text-foreground/60 flex items-center text-sm", className)}
      role="status"
      aria-label={label}
    >
      <span
        className={cn(
          "border-foreground/20 border-t-foreground block animate-spin rounded-full",
          loadingSizes[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
