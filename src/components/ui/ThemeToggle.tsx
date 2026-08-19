"use client";

import { Moon, Sun } from "lucide-react";

import { ui } from "@/content/ui";
import { useTheme } from "@/providers/theme-provider";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="text-foreground/50 hover:text-foreground flex size-(--touch-target) items-center justify-center transition-colors"
      aria-label={isDark ? ui.theme.light : ui.theme.dark}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
