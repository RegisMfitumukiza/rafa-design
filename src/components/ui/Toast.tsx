"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/cn";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  className?: string;
}

const toastStyles: Record<ToastType, string> = {
  success: "border border-border bg-surface text-foreground",
  error: "border border-foreground bg-foreground text-background",
  info: "border border-border bg-muted text-foreground",
  warning: "border border-accent bg-surface text-foreground",
};

let toastListeners: Array<(toast: Toast) => void> = [];

export function toast(message: string, type: ToastType = "info") {
  const id = Math.random().toString(36).slice(2);
  toastListeners.forEach((listener) => listener({ id, message, type }));
}

export function ToastContainer({ className }: ToastContainerProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((t: Toast) => {
    setToasts((prev) => [...prev, t]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== t.id));
    }, 4000);
  }, []);

  useEffect(() => {
    toastListeners.push(addToast);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== addToast);
    };
  }, [addToast]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      className={cn("bottom-lg right-lg z-modal gap-sm fixed flex flex-col", className)}
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "gap-md px-md py-sm shadow-medium motion-safe:animate-in motion-safe:fade-in flex items-center rounded-md text-sm",
            toastStyles[t.type],
          )}
        >
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => removeToast(t.id)}
            className="opacity-60 transition-opacity hover:opacity-100"
            aria-label="Dismiss"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
