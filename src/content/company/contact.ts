import type { ImageAsset, Location, SocialLink } from "@/content/types";

export interface Office extends Location {
  id: string;
  name: string;
  address: string;
  coordinates: string;
  hours: string;
  phone?: string;
  mapsUrl: string;
  image: ImageAsset;
}

export interface ContactInformation {
  email: string;
  phone: string;
  address: string;
  coordinates: string;
  offices: Office[];
  socialLinks: SocialLink[];
  projectTypes: string[];
  editorialImage: ImageAsset;
}

export const contactInformation: ContactInformation = {
  email: "rafadesignhub@gmail.com",
  phone: "+351 220 000 000",
  address: "Rua do Patio 42, 4000-000 Porto",
  coordinates: "41.1579° N, 8.6291° W",
  offices: [
    {
      id: "porto",
      name: "Porto Atelier",
      city: "Porto",
      country: "Portugal",
      address: "Rua do Patio 42, 4000-000 Porto",
      coordinates: "41.1579° N, 8.6291° W",
      hours: "09:00 — 18:00 WET",
      phone: "+351 220 000 000",
      mapsUrl: "https://maps.google.com/?q=41.1579,-8.6291",
      image: {
        src: "/images/studio/studio-hero.jpg",
        alt: "RAFA Design Hub Porto Atelier exterior and entry",
        caption: "Porto Atelier — Historic centre, Porto",
      },
    },
    {
      id: "lisbon",
      name: "Lisbon Studio",
      city: "Lisbon",
      country: "Portugal",
      address: "Avenida da Liberdade 110, 1250-146 Lisboa",
      coordinates: "38.7223° N, 9.1393° W",
      hours: "09:00 — 18:00 WET",
      phone: "+351 210 000 000",
      mapsUrl: "https://maps.google.com/?q=38.7223,-9.1393",
      image: {
        src: "/images/studio/studio-atelier.jpg",
        alt: "RAFA Design Hub Lisbon Studio workspace",
        caption: "Lisbon Studio — Avenida da Liberdade, Lisbon",
      },
    },
  ],
  socialLinks: [
    { platform: "instagram", url: "https://instagram.com/rafadesign" },
    { platform: "linkedin", url: "https://linkedin.com/company/rafadesign" },
    { platform: "behance", url: "https://behance.net/rafadesign" },
    { platform: "pinterest", url: "https://pinterest.com/rafadesign" },
  ],
  projectTypes: [
    "Architecture",
    "Interior Design",
    "Renovation",
    "Landscape Design",
    "Urban Design",
    "Other",
  ],
  editorialImage: {
    src: "/images/studio/studio-atelier.jpg",
    alt: "RAFA Design Hub practice atelier working environment",
    caption: "The practice atelier in Porto — material studies and working models",
  },
};
