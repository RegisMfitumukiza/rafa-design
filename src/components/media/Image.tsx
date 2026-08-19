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
  className?: string;
  imgClassName?: string;
}

export function Image({ asset, sizes, priority = false, className, imgClassName }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div role="img" aria-label={asset.alt} className={cn("bg-muted", className)} />;
  }

  const sharedProps = {
    src: asset.src,
    alt: asset.alt,
    sizes,
    priority,
    onError: () => setFailed(true),
    onLoad: () => ScrollTrigger.refresh(),
    className: cn("object-cover", imgClassName),
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {asset.width !== undefined && asset.height !== undefined ? (
        <NextImage {...sharedProps} width={asset.width} height={asset.height} />
      ) : (
        <NextImage {...sharedProps} fill />
      )}
    </div>
  );
}
