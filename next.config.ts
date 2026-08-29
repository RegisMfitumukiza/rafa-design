import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  // Enable compression for all responses
  compress: true,

  // Optimize images with Next.js Image component
  images: {
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920, 2560],
    formats: ["image/avif", "image/webp"],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year for immutable images
    dangerouslyAllowSVG: false, // Security: prevent SVG XSS
    contentDispositionType: "attachment", // Security: force download for user uploads
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  // Remove X-Powered-By header
  poweredByHeader: false,

  // Enable React Strict Mode for development
  reactStrictMode: true,

  // Enable experimental typed routes
  typedRoutes: true,

  experimental: {
    typedEnv: true,
    // Optimize package imports for better tree-shaking
    optimizePackageImports: ["gsap", "lenis", "lucide-react"],
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // Add security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      // Cache static assets aggressively
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
