"use client";

import { type ReactNode } from "react";

import { contactInformation as staticContactInformation } from "@/content/company/contact";
import type { ContactInformation } from "@/content/company/contact";

import { ContactContext } from "./contact-context";

interface ContactProviderProps {
  children: ReactNode;
  /** Sanity contact document, or null to fall back to the static content module. */
  contact?: ContactInformation | null;
}

/**
 * Provides the site-wide contact information (social links, offices, contact
 * details) to client surfaces. The server feeds the Sanity `contact` document;
 * when it is absent the static `contactInformation` module is used so no
 * surface ever renders empty.
 */
export function ContactProvider({ children, contact }: ContactProviderProps) {
  const value = contact ?? staticContactInformation;

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}
