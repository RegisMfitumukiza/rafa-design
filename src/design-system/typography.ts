export const typography = {
  families: {
    display: "var(--font-display)",
    body: "var(--font-sans)",
    mono: "var(--font-mono)",
  },
  styles: {
    display: { size: "clamp(4rem, 8vw, 9.5rem)", lineHeight: "0.9", weight: 500 },
    h1: { size: "clamp(3rem, 6vw, 7rem)", lineHeight: "0.95", weight: 500 },
    h2: { size: "clamp(2.5rem, 4.5vw, 5rem)", lineHeight: "1", weight: 500 },
    h3: { size: "clamp(2rem, 3vw, 3.5rem)", lineHeight: "1.05", weight: 500 },
    body: { size: "1rem", lineHeight: "1.65", weight: 400 },
    small: { size: "0.875rem", lineHeight: "1.45", weight: 400 },
  },
} as const;

export type TypographyStyle = keyof typeof typography.styles;
