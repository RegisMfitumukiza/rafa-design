export const theme = {
  name: "RAFA Design Hub",
  colorScheme: "light dark",
  background: "#fafafa",
  backgroundDark: "#0a0a0a",
  storageKey: "rafa-theme",
} as const;

export type Theme = typeof theme;
