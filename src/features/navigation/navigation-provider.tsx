"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { FullscreenNavigation } from "./fullscreen-navigation";
import { NavigationContext } from "./navigation-context";

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }
    previousPathname.current = pathname;
    queueMicrotask(() => setMenuOpen(false));
  }, [pathname]);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  // Global Keyboard Shortcut: '/' or '⌘K' / 'Ctrl+K' opens menu
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInput =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        (activeElement instanceof HTMLElement && activeElement.isContentEditable);

      if (isInput) {
        return;
      }

      if ((event.key === "/" || ((event.metaKey || event.ctrlKey) && event.key === "k")) && !isMenuOpen) {
        event.preventDefault();
        setMenuOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <NavigationContext.Provider value={{ isMenuOpen, openMenu, closeMenu, toggleMenu }}>
      <div className="contents" inert={isMenuOpen || undefined}>
        {children}
      </div>
      <FullscreenNavigation />
    </NavigationContext.Provider>
  );
}
