export const siteConfig = {
  name: "RAFA Design Hub",
  description: "Premium architecture and interior design website foundation.",
  creator: "RAFA Design Hub",
  locale: "en",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  keywords: [
    "architecture",
    "interior design",
    "RAFA Design Hub",
    "studio",
    "residential architecture",
    "spatial design",
  ],
  introVideo: "/videos/rafa-video.mp4",
} as const;
