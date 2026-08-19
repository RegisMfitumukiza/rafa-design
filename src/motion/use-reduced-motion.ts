"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
