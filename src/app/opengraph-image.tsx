import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0a0a0a",
        color: "#fafafa",
        padding: 72,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ fontSize: 36, textTransform: "uppercase", opacity: 0.6 }}>
          Architecture &amp; Interior Design
        </div>
        <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: -2 }}>{siteConfig.name}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: "#986f45",
          }}
        />
        <div style={{ fontSize: 28, opacity: 0.7 }}>{siteConfig.url}</div>
      </div>
    </div>,
    size,
  );
}
