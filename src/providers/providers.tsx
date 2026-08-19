"use client";

import { type ReactNode } from "react";

import { GSAPProvider } from "./gsap-provider";
import { LenisProvider } from "./lenis-provider";
import { ThemeProvider } from "./theme-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <GSAPProvider>
        <LenisProvider>{children}</LenisProvider>
      </GSAPProvider>
    </ThemeProvider>
  );
}
