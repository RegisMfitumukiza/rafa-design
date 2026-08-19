"use client";

import { useEffect, useId, useRef } from "react";

interface UseDialogOptions {
  open: boolean;
  onClose: () => void;
  title?: string | undefined;
  fallbackLabel?: string | undefined;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function useDialog({ open, onClose, title, fallbackLabel }: UseDialogOptions) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null,
      );

      if (focusables.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }

      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    if (panel) {
      const firstFocusable = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        panel.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousActiveElement?.focus();
    };
  }, [open, onClose]);

  const dialogProps = {
    role: "dialog" as const,
    "aria-modal": true as const,
    ...(title
      ? { "aria-labelledby": titleId }
      : fallbackLabel
        ? { "aria-label": fallbackLabel }
        : {}),
  };

  return { panelRef, titleId, dialogProps };
}
