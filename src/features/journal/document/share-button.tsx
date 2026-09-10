"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

interface ShareButtonProps {
  title?: string;
  className?: string;
}

export function ShareButton({ title, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    if (navigator.share && /mobile|android|iphone/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: title || document.title,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        "text-overline inline-flex items-center gap-1.5 font-mono tracking-widest uppercase transition-colors",
        copied ? "text-foreground font-medium" : "text-foreground/50 hover:text-foreground",
        className,
      )}
      aria-label="Share article link"
    >
      <span>{copied ? "Copied to clipboard ✓" : "Share article ↗"}</span>
    </button>
  );
}
