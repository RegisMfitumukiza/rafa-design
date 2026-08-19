import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920, 2560],
    formats: ["image/avif", "image/webp"],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  typedRoutes: true,
  experimental: {
    typedEnv: true,
  },
};

export default nextConfig;
