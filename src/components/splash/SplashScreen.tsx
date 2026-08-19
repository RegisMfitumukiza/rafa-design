"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export type SplashPhase = "cover" | "playing" | "fading";

interface SplashScreenProps {
  phase: SplashPhase;
  onVideoEnded: () => void;
  onFadeComplete: () => void;
}

export function SplashScreen({ phase, onVideoEnded, onFadeComplete }: SplashScreenProps) {
  const showVideo = phase === "playing" || phase === "fading";

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn(
        "bg-background z-overlay duration-slow ease-emphasized fixed inset-0 transition-opacity",
        phase === "fading" && "opacity-0",
      )}
      onTransitionEnd={(event) => {
        if (event.propertyName === "opacity") {
          onFadeComplete();
        }
      }}
    >
      {showVideo ? (
        <video
          src={siteConfig.introVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="h-full w-full object-cover"
          onEnded={onVideoEnded}
          onError={onVideoEnded}
        />
      ) : null}
    </div>
  );
}
