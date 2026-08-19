"use client";

// ============================================================================
// BACK TO TOP BUTTON
// Smooth scroll to top for long articles
// ============================================================================

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down significantly (1000px)
      setShow(window.scrollY > 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 left-6 z-40",
        "p-md bg-background border-border rounded-sm border shadow-lg",
        "hover:border-foreground/20 transition-all duration-200 hover:shadow-xl",
        "hidden items-center justify-center md:flex",
        "text-foreground/60 hover:text-foreground",
      )}
      aria-label="Back to top"
    >
      <span className="font-mono text-xs tracking-wider uppercase">↑ Top</span>
    </button>
  );
}
