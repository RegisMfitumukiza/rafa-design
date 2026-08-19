"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, type ReactNode, type KeyboardEvent } from "react";

import { cn } from "@/lib/cn";

interface CarouselProps {
  children: ReactNode[];
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  ariaLabel?: string;
}

/**
 * Carousel
 *
 * Accessible image and media carousel primitive.
 * Supports touch drag/snap, keyboard ArrowLeft/ArrowRight navigation,
 * aria-roledescription slide annotations, and screen reader controls.
 */
export function Carousel({
  children,
  showArrows = true,
  showDots = true,
  className,
  ariaLabel = "Media Carousel",
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const targetIndex = (index + children.length) % children.length;
    const child = container.children[targetIndex] as HTMLElement;
    if (!child) return;

    child.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setCurrent(targetIndex);
  };

  const next = () => scrollTo(current + 1);
  const prev = () => scrollTo(current - 1);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn("relative focus:outline-hidden focus:ring-1 focus:ring-foreground/20 rounded-xs", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        ref={containerRef}
        className="gap-md scrollbar-hide flex snap-x snap-mandatory overflow-x-auto"
        onScroll={(e) => {
          const container = e.currentTarget;
          if (container.clientWidth <= 0) return;
          const index = Math.round(container.scrollLeft / container.clientWidth);
          setCurrent(Math.max(0, Math.min(index, children.length - 1)));
        }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            className="min-w-full snap-start"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${children.length}`}
          >
            {child}
          </div>
        ))}
      </div>

      {showArrows && children.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="left-sm bg-background/80 p-sm text-foreground shadow-soft hover:bg-background absolute top-1/2 -translate-y-1/2 rounded-full backdrop-blur-sm transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="right-sm bg-background/80 p-sm text-foreground shadow-soft hover:bg-background absolute top-1/2 -translate-y-1/2 rounded-full backdrop-blur-sm transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      {showDots && children.length > 1 && (
        <div className="mt-md gap-sm flex justify-center">
          {children.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              className={cn(
                "size-2 rounded-full transition-colors",
                i === current ? "bg-foreground" : "bg-foreground/20 hover:bg-foreground/40",
              )}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
