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
  projectTypes?: string[] | undefined;
  editorialImage: ImageAsset;
}

export const contactInformation: ContactInformation = {
  email: "rafadesignhub@gmail.com",
  phone: "+250 000 000 000",
  address: "Gasabo, Kigali, Rwanda",
  coordinates: "1.9592° S, 30.1047° E",
  offices: [
    {
      id: "kigali",
      name: "Kigali Studio",
      city: "Kigali",
      country: "Rwanda",
      address: "Gasabo, Kigali, Rwanda",
      coordinates: "1.9592° S, 30.1047° E",
      hours: "09:00 — 18:00 CAT",
      phone: "+250 000 000 000",
      mapsUrl: "https://maps.google.com/?q=-1.959166,30.104737",
      image: {
        src: "/images/studio/studio-hero.jpg",
        alt: "RAFA Design Hub Kigali Studio exterior and entry",
        caption: "Kigali Studio — Gasabo, Kigali",
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
    caption: "The practice atelier in Kigali — material studies and working models",
  },
};
