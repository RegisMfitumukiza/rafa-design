"use client";

import { createContext, useContext } from "react";

import type { ContactInformation } from "@/content/company/contact";

export const ContactContext = createContext<ContactInformation | null>(null);

export function useContact(): ContactInformation {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within ContactProvider");
  }
  return context;
}
