"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { theme } from "@/config/theme";

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function subscribeToTheme(onStoreChange: () => void): () => void {
  const root = document.documentElement;
  const observer = new MutationObserver(onStoreChange);
  observer.observe(root, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getSnapshot(): boolean {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot(): boolean {
  return false;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const isDark = useSyncExternalStore(subscribeToTheme, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    localStorage.setItem(theme.storageKey, next ? "dark" : "light");
  }, []);

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
