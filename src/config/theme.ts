export const theme = {
  name: "RAFA Design Hub",
  colorScheme: "light dark",
  background: "#f5f1e8",
  backgroundDark: "#14120f",
  storageKey: "rafa-theme",
} as const;

export type Theme = typeof theme;
