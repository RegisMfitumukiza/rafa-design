"use client";

import { cn } from "@/lib/cn";

import { Button } from "./Button";
import { useDialog } from "./useDialog";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  className?: string;
}

export function Dialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  className,
}: DialogProps) {
  const { panelRef, titleId, dialogProps } = useDialog({
    open,
    onClose,
    title,
  });

  if (!open) return null;

  return (
    <div className="z-modal p-md fixed inset-0 flex items-center justify-center" {...dialogProps}>
      <div
        className="bg-foreground/40 absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "bg-surface p-lg shadow-medium relative w-full max-w-md rounded-md",
          className,
        )}
      >
        <h2 id={titleId} className="text-foreground text-lg font-medium">
          {title}
        </h2>
        {description && <p className="mt-sm text-foreground/60 text-sm">{description}</p>}
        <div className="mt-lg gap-sm flex justify-end">
          <Button variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            className={cn(variant === "destructive" && "bg-foreground")}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
