"use client";

import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";

import { motion } from "@/design-system/motion";

import { SplashScreen, type SplashPhase } from "./SplashScreen";

const SPLASH_SESSION_KEY = "rafa-splash-played";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const READY_BUFFER_MS = 150;
const MAX_READY_WAIT_MS = 3000;

type SplashState = "idle" | "cover" | "playing" | "fading" | "done";

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
  const [state, setState] = useState<SplashState>("idle");
  const completed = useRef(false);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    const alreadyPlayed = sessionStorage.getItem(SPLASH_SESSION_KEY) === "1";

    if (reducedMotion || alreadyPlayed) {
      queueMicrotask(() => setState("done"));
      return;
    }

    window.scrollTo(0, 0);
    queueMicrotask(() => setState("cover"));
  }, []);

  useEffect(() => {
    if (state !== "cover") {
      return;
    }

    const startedAt = Date.now();
    let cancelled = false;

    const startVideo = async () => {
      await waitForPageReady();
      await document.fonts.ready;

      const elapsed = Date.now() - startedAt;
      const remaining = READY_BUFFER_MS - elapsed;

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      if (!cancelled && document.readyState === "complete") {
        setState("playing");
      }
    };

    void startVideo();

    const fallback = setTimeout(
      () => setState("playing"),
      Math.max(READY_BUFFER_MS, MAX_READY_WAIT_MS),
    );

    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, [state]);

  useEffect(() => {
    if (state !== "cover" && state !== "playing" && state !== "fading") {
      return;
    }

    const unlock = lockScroll();
    return unlock;
  }, [state]);

  useEffect(() => {
    if (state !== "fading") {
      return;
    }

    const fallback = setTimeout(() => finishSplash(), motion.values.duration.slow * 1000 + 100);

    return () => clearTimeout(fallback);
  }, [state]);

  if (state === "done") {
    return <>{children}</>;
  }

  const handleVideoEnded = () => {
    if (state === "playing") {
      setState("fading");
    }
  };

  function finishSplash() {
    if (completed.current) {
      return;
    }
    completed.current = true;
    sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
    setState("done");
  }

  const phase: SplashPhase | null =
    state === "cover" || state === "playing" || state === "fading" ? state : null;

  return (
    <>
      {children}
      {phase ? (
        <SplashScreen phase={phase} onVideoEnded={handleVideoEnded} onFadeComplete={finishSplash} />
      ) : null}
    </>
  );
}
