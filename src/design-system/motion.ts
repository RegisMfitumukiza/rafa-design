export const motion = {
  values: {
    duration: {
      fast: 0.16,
      base: 0.24,
      slow: 0.48,
      cinematic: 0.9,
    },
    ease: {
      standard: "ease-standard",
      emphasized: "ease-emphasized",
      cinematic: "ease-cinematic",
    },
    easePath: {
      standard: "M0,0 C0.2,0 0,1 1,1",
      emphasized: "M0,0 C0.16,1 0.3,1 1,1",
      cinematic: "M0,0 C0.77,0 0.175,1 1,1",
    },
    reveal: {
      start: "top 85%",
      y: 24,
      stagger: 0.1,
    },
    parallax: {
      max: 0.2,
    },
    micro: {
      scale: 1.04,
      lift: 4,
    },
  },
} as const;

export type MotionDuration = keyof typeof motion.values.duration;
export type MotionEase = keyof typeof motion.values.ease;
