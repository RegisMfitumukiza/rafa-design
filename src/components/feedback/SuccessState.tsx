import { type ReactNode } from "react";

import { StatePanel } from "@/components/ui/StatePanel";

interface SuccessStateProps {
  title?: string;
  message?: string;
  action?: ReactNode;
  className?: string;
}

export function SuccessState({
  title = "Success",
  message = "Operation completed successfully.",
  action,
  className,
}: SuccessStateProps) {
  return (
    <StatePanel title={title} description={message} ariaLive="polite" className={className}>
      {action}
    </StatePanel>
  );
}
