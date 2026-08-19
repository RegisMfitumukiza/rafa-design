export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  credit?: string;
}

export interface SocialLink {
  platform: "instagram" | "linkedin" | "behance" | "pinterest" | "x" | "website" | "github";
  url: string;
  label?: string; // Optional display label override, e.g. "Portfolio" instead of "website"
}

export interface Location {
  city: string;
  country: string;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  organization?: string;
  bio?: string;
  url?: string;
  avatar?: string;
  email?: string;
}

