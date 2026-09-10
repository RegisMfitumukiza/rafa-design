import { ImageResponse } from "next/og";

import { getSiteConfig } from "@/lib/get-site-config";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage() {
  const config = await getSiteConfig();
  const title = config.seoDefaults?.title ?? config.name;
  const tagline = config.tagline ?? "Architecture & Spatial Design Studio";

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
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 24,
            textTransform: "uppercase",
            letterSpacing: 4,
            opacity: 0.5,
          }}
        >
          {tagline}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: -2,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: "#fafafa",
            }}
          />
          <div style={{ fontSize: 24, letterSpacing: 1, opacity: 0.75 }}>{config.name}</div>
        </div>
        <div style={{ fontSize: 22, opacity: 0.45, letterSpacing: 2, textTransform: "uppercase" }}>
          {config.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    </div>,
    size,
  );
}
