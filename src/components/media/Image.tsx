"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import NextImage from "next/image";
import { useState } from "react";

import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";

interface ImageProps {
  asset: ImageAsset;
  sizes: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  /** Force Next.js `fill` layout mode (ignores asset width/height). Use for hero images that must cover their container. */
  fill?: boolean;
  /** Enable blur placeholder for smoother loading experience */
  placeholder?: "blur" | "empty";
  /** Quality setting for Next.js Image optimization (1-100) */
  quality?: number;
  className?: string;
  imgClassName?: string;
}

export function Image({
  asset,
  sizes,
  priority = false,
  loading,
  fetchPriority,
  fill = false,
  placeholder = "empty",
  quality = 85,
  className,
  imgClassName,
}: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div role="img" aria-label={asset.alt} className={cn("bg-muted", className)} />;
  }

  const sharedProps = {
    src: asset.src,
    alt: asset.alt,
    sizes,
    priority,
    loading,
    fetchPriority,
    quality,
    placeholder,
    onError: () => setFailed(true),
    onLoad: () => {
      // Debounce ScrollTrigger refresh to avoid excessive recalculations
      if (typeof window !== "undefined") {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }
    },
    className: cn("object-cover", imgClassName),
  } as const;

  // When `fill` is explicitly requested as a prop, the caller manages their own
  // positioned container (e.g. hero parallax, absolute background layer, full-bleed card).
  if (fill) {
    return (
      <NextImage {...sharedProps} fill className={cn("object-cover", imgClassName, className)} />
    );
  }

  // Standard mode: Image component renders the wrapper <div> with `className`
  // (which provides aspect-ratio, width, height, borders, etc.) so that it
  // never collapses to 0 height even if intrinsic dimensions are not provided.
  const hasDimensions = typeof asset.width === "number" && typeof asset.height === "number";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {hasDimensions ? (
        <NextImage
          {...sharedProps}
          width={asset.width!}
          height={asset.height!}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      ) : (
        <NextImage {...sharedProps} fill />
      )}
    </div>
  );
}
