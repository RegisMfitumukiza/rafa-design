import { type ReactNode } from "react";

import { StatePanel } from "@/components/ui/StatePanel";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <StatePanel icon={icon} title={title} description={description} className={className}>
      {action}
    </StatePanel>
  );
}
