"use client";

import { createContext, useContext } from "react";

export interface NavigationContextValue {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

export const NavigationContext = createContext<NavigationContextValue | null>(null);

export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}
