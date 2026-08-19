import { siteConfig } from "@/config/site";

export const footerContent = {
  studio: {
    name: siteConfig.name,
    tagline: "Architecture & Interior Design Studio",
  },
  rights: "All rights reserved.",
};

export type FooterContent = typeof footerContent;
