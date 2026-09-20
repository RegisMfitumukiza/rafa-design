"use client";

import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";

import { SplashScreen, type SplashPhase } from "./SplashScreen";

const SPLASH_SESSION_KEY = "rafa-splash-played";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MAX_READY_WAIT_MS = 2000;

type SplashState = "cover" | "playing" | "done";

interface SplashProviderProps {
  children: ReactNode;
}

function lockScroll(): () => void {
  const html = document.documentElement;
  const body = document.body;

  html.style.overflow = "hidden";
  html.style.overscrollBehavior = "none";
  body.style.overflow = "hidden";

  const prevent = (event: WheelEvent | TouchEvent) => {
    if (event.cancelable) {
      event.preventDefault();
    }
  };

  window.addEventListener("wheel", prevent, { passive: false });
  window.addEventListener("touchmove", prevent, { passive: false });

  return () => {
    html.style.overflow = "";
    html.style.overscrollBehavior = "";
    body.style.overflow = "";
    window.removeEventListener("wheel", prevent);
    window.removeEventListener("touchmove", prevent);
  };
}

export function SplashProvider({ children }: SplashProviderProps) {
  // If already played in this session or marked by the pre-hydration script,
  // initialize immediately as "done" to eliminate any render flash on reload.
  // Supports ?splash=true query parameter to easily replay/test anytime.
  const [state, setState] = useState<SplashState>(() => {
    if (typeof window !== "undefined") {
      try {
        const forceSplash = window.location.search.includes("splash=");
        if (
          !forceSplash &&
          (document.documentElement.classList.contains("splash-skip") ||
            sessionStorage.getItem(SPLASH_SESSION_KEY) === "1")
        ) {
          return "done";
        }
      } catch {
        // Storage access restricted
      }
    }
    return "cover";
  });

  const completed = useRef(false);

  useLayoutEffect(() => {
    try {
      const forceSplash = window.location.search.includes("splash=");
      const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
      const alreadyPlayed =
        !forceSplash &&
        (document.documentElement.classList.contains("splash-skip") ||
          sessionStorage.getItem(SPLASH_SESSION_KEY) === "1");

      if (reducedMotion || alreadyPlayed) {
        document.documentElement.classList.add("splash-skip");
        if (state !== "done") {
          setTimeout(() => setState("done"), 0);
        }
        return;
      }
    } catch {
      // Storage access restricted
    }

    window.scrollTo(0, 0);
  }, [state]);

  useEffect(() => {
    if (state !== "cover") {
      return;
    }

    let cancelled = false;

    const startAnim = async () => {
      // Wait for typography to be ready so the architectural reveal has zero font jump
      await document.fonts?.ready;

      // Small tick (60ms) to ensure layout is measured and rendered smoothly
      await new Promise((resolve) => setTimeout(resolve, 60));

      if (!cancelled) {
        setState("playing");
      }
    };

    void startAnim();

    const fallback = setTimeout(() => {
      if (!cancelled) {
        setState("playing");
      }
    }, MAX_READY_WAIT_MS);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, [state]);

  useEffect(() => {
    if (state !== "cover" && state !== "playing") {
      return;
    }

    const unlock = lockScroll();
    return unlock;
  }, [state]);

  function finishSplash() {
    if (completed.current) {
      return;
    }
    completed.current = true;
    try {
      sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
      document.documentElement.classList.add("splash-skip");
    } catch {
      // Storage access restricted
    }
    setState("done");
  }

  if (state === "done") {
    return <>{children}</>;
  }

  const phase: SplashPhase = state;

  return (
    <>
      {children}
      <SplashScreen phase={phase} onFadeComplete={finishSplash} />
    </>
  );
}
