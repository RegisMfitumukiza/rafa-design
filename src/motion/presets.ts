import { motion } from "@/design-system/motion";

export const fadeUp = {
  y: motion.values.reveal.y,
  duration: motion.values.duration.slow,
  ease: motion.values.ease.emphasized,
} as const;

export const fadeIn = {
  duration: motion.values.duration.slow,
  ease: motion.values.ease.standard,
} as const;

export const scaleIn = {
  scale: 0.95,
  duration: motion.values.duration.slow,
  ease: motion.values.ease.emphasized,
} as const;

export const revealStart = motion.values.reveal.start;

export const imageReveal = {
  clipPath: "inset(0 0 100% 0)",
  scale: 1.08,
  duration: motion.values.duration.cinematic,
  ease: motion.values.ease.emphasized,
} as const;

export const parallax = {
  speed: 0.12,
  scale: 1.24,
} as const;
