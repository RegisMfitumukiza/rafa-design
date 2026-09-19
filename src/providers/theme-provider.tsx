"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { theme } from "@/config/theme";

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(theme.storageKey);
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function subscribeToTheme(onStoreChange: () => void): () => void {
  const root = document.documentElement;
  const observer = new MutationObserver(onStoreChange);
  observer.observe(root, { attributes: true, attributeFilter: ["class"] });

  // If root has neither .dark nor .light yet, assert it immediately
  if (!root.classList.contains("dark") && !root.classList.contains("light")) {
    const isDarkTheme = getInitialTheme();
    root.classList.toggle("dark", isDarkTheme);
    root.classList.toggle("light", !isDarkTheme);
    root.style.colorScheme = isDarkTheme ? "dark" : "light";
    onStoreChange();
  }

  // Dynamically update theme if user changes their OS setting and has no stored manual preference
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemChange = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem(theme.storageKey)) {
      root.classList.toggle("dark", e.matches);
      root.classList.toggle("light", !e.matches);
      root.style.colorScheme = e.matches ? "dark" : "light";
      onStoreChange();
    }
  };
  mediaQuery.addEventListener("change", handleSystemChange);

  return () => {
    observer.disconnect();
    mediaQuery.removeEventListener("change", handleSystemChange);
  };
}

function getSnapshot(): boolean {
  if (typeof document === "undefined") return false;
  if (document.documentElement.classList.contains("dark")) return true;
  if (document.documentElement.classList.contains("light")) return false;
  return getInitialTheme();
}

function getServerSnapshot(): boolean {
  return false;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const isDark = useSyncExternalStore(subscribeToTheme, getSnapshot, getServerSnapshot);

  // Synchronize on mount to ensure classList.dark / classList.light is strictly active
  // even if React hydration touched the <html> root element attributes.
  useEffect(() => {
    const root = document.documentElement;
    const isDarkTheme = getInitialTheme();
    root.classList.toggle("dark", isDarkTheme);
    root.classList.toggle("light", !isDarkTheme);
    root.style.colorScheme = isDarkTheme ? "dark" : "light";
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    root.classList.toggle("light", !next);
    root.style.colorScheme = next ? "dark" : "light";
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
