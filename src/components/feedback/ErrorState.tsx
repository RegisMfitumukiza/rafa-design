import { type ReactNode } from "react";

import { StatePanel } from "@/components/ui/StatePanel";

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: ReactNode;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  action,
  className,
}: ErrorStateProps) {
  return (
    <StatePanel title={title} description={message} role="alert" className={className}>
      {action}
    </StatePanel>
  );
}
