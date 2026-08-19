import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface StatePanelProps {
  icon?: ReactNode;
  title: string;
  description?: string | undefined;
  children?: ReactNode;
  role?: "alert";
  ariaLive?: "polite" | "assertive";
  className?: string | undefined;
}

export function StatePanel({
  icon,
  title,
  description,
  children,
  role,
  ariaLive,
  className,
}: StatePanelProps) {
  return (
    <div
      className={cn(
        "gap-md py-2xl flex flex-col items-center justify-center text-center",
        className,
      )}
      {...(role ? { role } : {})}
      {...(ariaLive ? { "aria-live": ariaLive } : {})}
    >
      {icon && <div className="text-foreground/20">{icon}</div>}
      <h3 className="text-foreground text-lg font-medium">{title}</h3>
      {description && <p className="text-foreground/60 max-w-sm text-sm">{description}</p>}
      {children && <div className="mt-sm">{children}</div>}
    </div>
  );
}
