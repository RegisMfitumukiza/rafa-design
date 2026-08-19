"use client";

import { X } from "lucide-react";
import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

import { useDialog } from "./useDialog";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Drawer({ open, side = "right", title, children, onClose, className }: DrawerProps) {
  const { panelRef, titleId, dialogProps } = useDialog({
    open,
    onClose,
    title,
    fallbackLabel: "Drawer",
  });

  if (!open) return null;

  return (
    <div className="z-overlay fixed inset-0" {...dialogProps}>
      <div
        className="bg-foreground/20 absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "bg-surface shadow-medium motion-safe:duration-slow fixed inset-y-0 flex w-full max-w-md flex-col transition-transform",
          side === "right" ? "right-0" : "left-0",
          className,
        )}
      >
        {title && (
          <div className="border-border px-lg py-md flex items-center justify-between border-b">
            <h2 id={titleId} className="text-foreground text-lg font-medium">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-foreground/50 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>
        )}
        <div className="px-lg py-md flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
