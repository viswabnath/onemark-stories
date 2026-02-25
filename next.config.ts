import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Compress assets
  compress: true,

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200],
  },

  // Reduce JS bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ─── MAINTENANCE MODE REDIRECT ────────────────────────────────────
  async redirects() {
    // Check if the environment variable is set to "true"
    if (process.env.MAINTENANCE_MODE === "true") {
      return [
        {
          // Match all routes EXCEPT /maintenance and internal Next.js assets
          source: "/((?!maintenance|_next|favicon.ico).*)",
          destination: "/maintenance",
          permanent: false, // Important: 307 Temporary Redirect for SEO
        },
      ];
    }
    return [];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Cache static assets
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*(js|css|png|jpg|jpeg|webp|avif|svg|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;