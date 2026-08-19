"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";

interface HiringBannerProps {
  positionCount: number;
  className?: string;
}

/**
 * HiringBanner
 *
 * Elegant notification banner shown on the homepage when there are open positions.
 *
 * Features:
 * - Minimalist architectural design (ruled hairline, mono label, restrained typography)
 * - Dismissible (stores state in localStorage)
 * - Shows position count ("We're hiring • 3 open positions")
 * - Smooth entrance animation
 * - Respects reduced motion
 *
 * Design Philosophy:
 * - Not a "marketing banner" (no bright colors, no urgency tactics)
 * - Feels like an editorial note, not an advertisement
 * - Matches the site's architectural restraint
 */
export function HiringBanner({ positionCount, className }: HiringBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Defer state updates to avoid cascading renders
    setTimeout(() => {
      setIsClient(true);
      // Check if user has dismissed the banner
      const dismissed = localStorage.getItem("hiring-banner-dismissed");
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 0);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("hiring-banner-dismissed", "true");
  };

  // Don't render on server (avoid hydration mismatch)
  if (!isClient || !isVisible || positionCount === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "border-border bg-background/95 fixed top-[var(--header-height)] right-0 left-0 z-[45] border-b backdrop-blur-sm transition-all motion-reduce:transition-none",
        "animate-in slide-in-from-top-2 fade-in duration-500 motion-reduce:animate-none",
        className,
      )}
    >
      <div className="container-standard py-sm gap-md flex items-center justify-between">
        {/* Left: Label + Message */}
        <div className="gap-md flex flex-1 items-center">
          <span className="text-foreground/40 hidden font-mono text-[10px] tracking-widest uppercase sm:block">
            Recruitment
          </span>
          <div className="gap-xs flex flex-wrap items-center text-sm md:text-base">
            <span className="text-foreground/70 font-medium">{ui.careers.hiringBannerText}</span>
            <span className="text-foreground/30">·</span>
            <span className="text-foreground/50">
              {positionCount} {positionCount === 1 ? "position" : "positions"}
            </span>
          </div>
        </div>

        {/* Right: CTA + Dismiss */}
        <div className="gap-md flex items-center">
          <Link
            href="/careers"
            className="link-underline text-foreground hover:text-foreground/80 text-sm font-medium whitespace-nowrap transition-colors md:text-base"
          >
            {ui.careers.hiringBannerCta} →
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            className="text-foreground/40 hover:text-foreground/60 ml-sm shrink-0 transition-colors"
            aria-label="Dismiss notification"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
