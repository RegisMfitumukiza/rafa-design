"use client";

import { gsap } from "gsap";
import { type DependencyList, type RefObject, useLayoutEffect, useRef } from "react";

type SetupCallback = (context: gsap.Context, scope: RefObject<HTMLDivElement | null>) => void;

export function useScopedGsap(
  setup: SetupCallback,
  deps: DependencyList = [],
): RefObject<HTMLDivElement | null> {
  const scope = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const context = gsap.context((ctx) => setup(ctx, scope), scope);
    return () => context.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
