import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  transpilePackages: ["@universe/ui"],
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async rewrites() {
    return [
      { source: "/universe-physics/:path*", destination: "http://localhost:3033/universe-physics/:path*" },
      { source: "/human-history/:path*", destination: "http://localhost:3001/human-history/:path*" },
      { source: "/philosophy/:path*", destination: "http://localhost:3002/philosophy/:path*" },
    ];
  },
};

export default nextConfig;
