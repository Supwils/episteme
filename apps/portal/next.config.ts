import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src 'self'${isProd ? "" : " 'unsafe-eval'"} 'unsafe-inline'`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "manifest-src 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=(), payment=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
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
      // Proxy universe-physics pages and static assets
      { source: "/universe-physics/:path*", destination: "http://localhost:3033/universe-physics/:path*" },
      // Proxy human-history pages and static assets
      { source: "/human-history/:path*", destination: "http://localhost:3001/human-history/:path*" },
      // Proxy philosophy pages and static assets
      { source: "/philosophy/:path*", destination: "http://localhost:3002/philosophy/:path*" },
    ];
  },
};

export default nextConfig;
