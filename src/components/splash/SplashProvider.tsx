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

function waitForPageReady(): Promise<void> {
  return new Promise((resolve) => {
    const done = () => resolve();

    if (document.readyState === "complete") {
      void done();
      return;
    }

    window.addEventListener("load", done, { once: true });
  });
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
  // Start in "cover" phase on frame 0 so the SplashScreen is rendered immediately
  // without any flash of the page underneath during initial render/hydration.
  const [state, setState] = useState<SplashState>("cover");
  const completed = useRef(false);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    const alreadyPlayed = sessionStorage.getItem(SPLASH_SESSION_KEY) === "1";

    if (reducedMotion || alreadyPlayed) {
      // Defer state update to avoid synchronous setState in effect
      setTimeout(() => setState("done"), 0);
      return;
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (state !== "cover") {
      return;
    }

    let cancelled = false;

    const startAnim = async () => {
      await waitForPageReady();
      await document.fonts.ready;

      if (!cancelled) {
        setState("playing");
      }
    };

    void startAnim();

    const fallback = setTimeout(() => setState("playing"), MAX_READY_WAIT_MS);

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

  if (state === "done") {
    return <>{children}</>;
  }

  function finishSplash() {
    if (completed.current) {
      return;
    }
    completed.current = true;
    sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
    setState("done");
  }

  const phase: SplashPhase = state;

  return (
    <>
      {children}
      <SplashScreen phase={phase} onFadeComplete={finishSplash} />
    </>
  );
}
