"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Image } from "@/components/media/Image";
import type { BeforeAfterImage } from "@/content/projects";
import { useReducedMotion } from "@/motion";
import { Reveal } from "@/motion";

interface BeforeAfterSliderProps {
  data: BeforeAfterImage;
  className?: string;
}

/**
 * BeforeAfterSlider
 *
 * An interactive clip-path drag/touch comparison slider for architectural
 * before-and-after photography. A vertical divider handle slides between
 * the two states, revealing the transformation with cinematic precision.
 *
 * Falls back to a static side-by-side layout for users who prefer reduced motion.
 */
export function BeforeAfterSlider({ data, className = "" }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50); // percentage 0–100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) updatePosition(touch.clientX);
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) updatePosition(touch.clientX);
    },
    [updatePosition],
  );

  useEffect(() => {
    if (reduced) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [reduced, handleMouseMove, handleMouseUp, handleTouchMove]);

  // Fallback: static side-by-side for reduced motion
  if (reduced) {
    return (
      <div className={className}>
        <Reveal>
          <div className="mb-md">
            <p className="text-foreground/40 mb-xs font-mono text-[10px] tracking-widest uppercase">
              Transformation
            </p>
            {data.caption && (
              <p className="text-foreground/70 text-base font-light italic">{data.caption}</p>
            )}
          </div>
        </Reveal>

        <div className="gap-md grid md:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="border-border/40 relative border">
              <div className="bg-background/85 text-foreground/70 px-xs absolute top-3 left-3 z-10 py-1 font-mono text-[10px] tracking-widest uppercase">
                The Existing Building
              </div>
              <Image
                asset={data.before}
                className="aspect-landscape w-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="border-border/40 relative border">
              <div className="bg-foreground text-background px-xs absolute top-3 left-3 z-10 py-1 font-mono text-[10px] tracking-widest uppercase">
                The Completed Work
              </div>
              <Image
                asset={data.after}
                className="aspect-landscape w-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  // Interactive clip-path slider
  return (
    <div className={className}>
      <Reveal>
        <div className="mb-md">
          <p className="text-foreground/40 mb-xs font-mono text-[10px] tracking-widest uppercase">
            Transformation
          </p>
          {data.caption && (
            <p className="text-foreground/70 text-base font-light italic">{data.caption}</p>
          )}
        </div>
      </Reveal>

      {/* Drag instructions */}
      <Reveal>
        <p className="text-foreground/30 mb-sm font-mono text-[10px] tracking-widest uppercase">
          Drag to compare ↔
        </p>
      </Reveal>

      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative aspect-[16/9] w-full cursor-col-resize overflow-hidden select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
          if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
        }}
      >
        {/* AFTER image — full width baseline layer */}
        <div className="absolute inset-0">
          <Image
            asset={data.after}
            fill
            className="h-full w-full"
            imgClassName="object-cover w-full h-full"
            sizes="100vw"
            priority
          />
          {/* After label */}
          <div className="bg-foreground text-background px-xs absolute top-3 right-3 z-10 py-1 font-mono text-[10px] tracking-widest uppercase">
            The Completed Work
          </div>
        </div>

        {/* BEFORE image — clipped to left portion */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            asset={data.before}
            fill
            className="h-full w-full"
            imgClassName="object-cover w-full h-full"
            sizes="100vw"
            priority
          />
          {/* Before label */}
          <div className="bg-background/85 text-foreground/70 px-xs absolute top-3 left-3 z-10 py-1 font-mono text-[10px] tracking-widest uppercase">
            The Existing Building
          </div>
        </div>

        {/* Divider line */}
        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-px bg-white/80"
          style={{ left: `${position}%` }}
        />

        {/* Drag handle */}
        <div
          className="pointer-events-none absolute top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 shadow-lg backdrop-blur-sm"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          {/* ↔ icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-white"
            aria-hidden="true"
          >
            <path
              d="M5 8H11M5 8L3 6M5 8L3 10M11 8L13 6M11 8L13 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
