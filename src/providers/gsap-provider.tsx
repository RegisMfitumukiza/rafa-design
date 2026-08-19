"use client";

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode } from "react";

import { motion } from "@/design-system/motion";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("ease-standard", motion.values.easePath.standard);
CustomEase.create("ease-emphasized", motion.values.easePath.emphasized);
CustomEase.create("ease-cinematic", motion.values.easePath.cinematic);

interface GSAPProviderProps {
  children: ReactNode;
}

export function GSAPProvider({ children }: GSAPProviderProps) {
  return <>{children}</>;
}
