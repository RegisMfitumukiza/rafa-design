"use client";

import { gsap } from "gsap";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { Image } from "@/components/media/Image";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/motion";

interface ProjectLightboxProps {
  images: ImageAsset[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * ProjectLightbox
 *
 * A cinematic fullscreen image viewer for the project Spatial Archive gallery.
 * Supports keyboard navigation (← → ESC), scroll lock, and GSAP fade entrance.
 */
export function ProjectLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: ProjectLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const image = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, handlePrev, handleNext]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // GSAP entrance
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (reduced) {
      gsap.set(overlay, { autoAlpha: 1 });
      return;
    }
    gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
  }, [reduced]);

  // GSAP image transition when index changes
  useLayoutEffect(() => {
    const img = imageRef.current;
    if (!img || reduced) return;
    gsap.fromTo(
      img,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [currentIndex, reduced]);

  if (!image) return null;

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Project image lightbox"
      style={{ visibility: "hidden" }}
      className="fixed inset-0 z-[500] flex flex-col bg-black/96"
      onClick={onClose}
    >
      {/* Top bar — close + counter */}
      <div
        className="flex items-center justify-between px-md py-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-white/40 font-mono text-[10px] tracking-widest uppercase">
          SPATIAL ARCHIVE /{" "}
          <span className="text-white/70">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>{" "}
          OF {String(images.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="text-white/50 hover:text-white font-mono text-[10px] tracking-widest uppercase transition-colors"
        >
          ESC · CLOSE
        </button>
      </div>

      {/* Image container */}
      <div
        ref={imageRef}
        className="relative flex flex-1 items-center justify-center p-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full w-full max-w-6xl mx-auto">
          <Image
            asset={image}
            className="h-full w-full object-contain"
            sizes="(max-width: 768px) 100vw, 90vw"
            priority
          />
        </div>
      </div>

      {/* Caption + navigation row */}
      <div
        className="flex items-center justify-between px-md py-sm gap-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Caption */}
        <p
          className={cn(
            "text-white/40 font-mono text-[11px] tracking-wide italic flex-1",
            !image.caption && "opacity-0 select-none",
          )}
        >
          {image.caption ?? "—"}
        </p>

        {/* Prev / Next */}
        <div className="flex items-center gap-md font-mono text-[10px] tracking-widest uppercase">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!hasPrev}
            aria-label="Previous image"
            className={cn(
              "transition-colors",
              hasPrev ? "text-white/60 hover:text-white" : "text-white/20 cursor-not-allowed",
            )}
          >
            ← PREV
          </button>
          <span className="text-white/20">|</span>
          <button
            type="button"
            onClick={handleNext}
            disabled={!hasNext}
            aria-label="Next image"
            className={cn(
              "transition-colors",
              hasNext ? "text-white/60 hover:text-white" : "text-white/20 cursor-not-allowed",
            )}
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
