"use client";

import { cn } from "@/lib/cn";

interface VideoProps {
  src: string;
  poster?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  aspectRatio?: string;
  className?: string;
}

export function Video({
  src,
  poster,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  playsInline = true,
  aspectRatio,
  className,
}: VideoProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <video
        src={src}
        poster={poster}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        className="size-full object-cover"
      />
    </div>
  );
}
