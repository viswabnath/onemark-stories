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
        // Security header for every route. IMPORTANT: do NOT put a long-lived
        // `immutable` Cache-Control here — it would apply to HTML documents too,
        // freezing pages (and shared album links) in browsers for a year.
        source: "/(.*)",
        headers: [{ key: "X-Frame-Options", value: "SAMEORIGIN" }],
      },
      {
        // Fingerprinted build output — safe to cache forever.
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Fonts rarely change — long cache, immutable.
        source: "/:path*(woff2|woff|ttf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Static media (incl. album photos, which may be swapped) — cache a day
        // but revalidate so replacements/updates appear without a year's wait.
        source: "/:path*(png|jpg|jpeg|webp|avif|svg|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;