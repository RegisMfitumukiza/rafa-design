"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect image brightness by analyzing pixel data
 * Returns a brightness score from 0 (dark) to 255 (bright)
 *
 * @param imageUrl - The URL of the image to analyze
 * @param enabled - Whether to run the analysis (default: true)
 */
export function useImageBrightness(imageUrl: string | undefined, enabled = true) {
  const shouldAnalyze = Boolean(enabled && imageUrl);
  const [brightness, setBrightness] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(shouldAnalyze);

  useEffect(() => {
    if (!enabled || !imageUrl) {
      return;
    }

    let cancelled = false;

    const analyzeImage = async () => {
      try {
        setIsLoading(true);

        // Create an off-screen canvas
        const img = new Image();
        img.crossOrigin = "anonymous";

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = imageUrl;
        });

        if (cancelled) return;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setBrightness(null);
          setIsLoading(false);
          return;
        }

        // Sample a smaller version for performance
        const sampleWidth = 200;
        const sampleHeight = (img.height / img.width) * sampleWidth;

        canvas.width = sampleWidth;
        canvas.height = sampleHeight;

        ctx.drawImage(img, 0, 0, sampleWidth, sampleHeight);

        // Get pixel data from bottom third where text overlay appears
        const bottomThirdY = Math.floor(sampleHeight * 0.66);
        const imageData = ctx.getImageData(
          0,
          bottomThirdY,
          sampleWidth,
          sampleHeight - bottomThirdY,
        );
        const data = imageData.data;

        // Calculate average brightness (luminance formula)
        let totalBrightness = 0;
        const pixelCount = data.length / 4;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i] ?? 0;
          const g = data[i + 1] ?? 0;
          const b = data[i + 2] ?? 0;
          // Using relative luminance formula (weighted for human perception)
          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          totalBrightness += luminance;
        }

        const avgBrightness = totalBrightness / pixelCount;

        if (!cancelled) {
          setBrightness(avgBrightness);
          setIsLoading(false);
        }
      } catch (error) {
        console.warn("Failed to analyze image brightness:", error);
        if (!cancelled) {
          setBrightness(null);
          setIsLoading(false);
        }
      }
    };

    analyzeImage();

    return () => {
      cancelled = true;
    };
  }, [imageUrl, enabled]);

  return { brightness, isLoading };
}

/**
 * Utility to determine if an overlay should be strengthened based on brightness
 *
 * @param brightness - Brightness value from 0-255
 * @returns "light" | "medium" | "dark"
 */
export function getBrightnessCategory(brightness: number | null): "light" | "medium" | "dark" {
  if (brightness === null) return "medium"; // Default fallback

  if (brightness > 180) return "light"; // Very bright image - need strong overlay
  if (brightness > 100) return "medium"; // Normal image - standard overlay
  return "dark"; // Dark image - lighter overlay
}

/**
 * Get dynamic overlay opacity based on image brightness
 */
export function getOverlayOpacity(brightness: number | null): {
  gradient: string;
  backdrop: string;
} {
  const category = getBrightnessCategory(brightness);

  switch (category) {
    case "light":
      return {
        gradient: "from-black/98 via-black/75 to-black/15",
        backdrop: "from-black/80 via-black/45 to-transparent",
      };
    case "medium":
      return {
        gradient: "from-black/95 via-black/60 to-black/5",
        backdrop: "from-black/70 via-black/30 to-transparent",
      };
    case "dark":
      return {
        gradient: "from-black/90 via-black/45 to-black/0",
        backdrop: "from-black/50 via-black/20 to-transparent",
      };
  }
}
