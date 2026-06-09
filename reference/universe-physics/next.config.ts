import type { NextConfig } from "next";

/**
 * Security headers applied to every route.
 *
 * Notes on CSP:
 *  - `unsafe-inline` style-src is required by Tailwind's runtime layer and
 *    Framer Motion's transform-style injection. style-src-elem could be
 *    tightened with nonces but Next.js App Router doesn't expose a stable
 *    nonce API for static export yet.
 *  - `unsafe-eval` script-src is enabled in development only — Next.js's
 *    Fast Refresh runtime needs it. Production build never evaluates from
 *    strings.
 *  - `worker-src 'self' blob:` covers KTX2 / Basis transcoders we may
 *    enable later, and any web-worker the bundler ships.
 *  - `frame-ancestors 'none'` + X-Frame-Options DENY blocks clickjacking.
 */
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
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "media-src 'self' data: blob:",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=(), payment=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["three", "@react-three/drei"],
  },
  async headers() {
    return [
      {
        // Apply security headers to every route.
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Long-cache + immutable for hashed assets.
        source: "/textures/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
