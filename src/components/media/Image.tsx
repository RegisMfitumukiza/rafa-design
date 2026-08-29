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

  const useFill = fill || (asset.width === undefined && asset.height === undefined);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {useFill ? (
        <NextImage {...sharedProps} fill />
      ) : (
        <NextImage {...sharedProps} width={asset.width!} height={asset.height!} />
      )}
    </div>
  );
}
