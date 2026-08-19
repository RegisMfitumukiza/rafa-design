"use client";

import { X } from "lucide-react";
import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

import { useDialog } from "./useDialog";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const modalSizes = {
  sm: "w-[min(92vw,24rem)]",
  md: "w-[min(92vw,32rem)]",
  lg: "w-[min(92vw,42rem)]",
  xl: "w-[min(92vw,48rem)]",
  "2xl": "w-[min(92vw,64rem)]",
} as const;

/**
 * Modal
 *
 * Universal accessible dialog modal overlay.
 * Uses `w-[min(92vw,...)]` explicit widths so that flexbox centered overlays
 * NEVER shrink-wrap panels into min-content vertical slivers.
 */
export function Modal({ open, onClose, title, children, size = "md", className }: ModalProps) {
  const { panelRef, titleId, dialogProps } = useDialog({
    open,
    onClose,
    title,
    fallbackLabel: "Dialog",
  });

  if (!open) return null;

  return (
    <div
      className="z-modal p-md sm:p-lg fixed inset-0 flex items-center justify-center overflow-y-auto"
      {...dialogProps}
    >
      {/* Backdrop */}
      <div
        className="bg-black/60 fixed inset-0 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "bg-surface shadow-medium border-border/40 relative z-10 shrink-0 overflow-hidden rounded-md border my-auto",
          modalSizes[size],
          className,
        )}
      >
        {title && (
          <div className="border-border/40 px-lg py-md flex items-center justify-between border-b bg-surface/50 backdrop-blur-sm">
            <h2 id={titleId} className="text-foreground text-lg font-medium">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-foreground/50 hover:text-foreground hover:bg-foreground/10 flex size-8 items-center justify-center rounded-full transition-colors"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </button>
          </div>
        )}
        <div className="px-lg py-md">{children}</div>
      </div>
    </div>
  );
}
