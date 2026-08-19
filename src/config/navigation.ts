import type { RouteKey } from "./routes";

export const navigationConfig = {
  primary: ["projects", "studio", "services", "process", "journal", "contact"],
  supporting: ["careers", "sustainability"],
} as const satisfies {
  primary: readonly RouteKey[];
  supporting: readonly RouteKey[];
};
