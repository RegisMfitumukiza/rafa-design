import type { Route } from "next";

import { navigationConfig } from "@/config/navigation";
import { routes, type RouteKey } from "@/config/routes";

function toNavLink(key: RouteKey): { label: string; path: Route } {
  const route = routes[key];
  return { label: route.label, path: route.path as Route };
}

export const primaryNavLinks = navigationConfig.primary.map(toNavLink);
export const supportingNavLinks = navigationConfig.supporting.map(toNavLink);

export type NavLink = { label: string; path: Route };
