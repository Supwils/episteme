import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const isProd = process.env.NODE_ENV === "production";

// Content-Security-Policy. Extra hosts are route-scoped (see headers()):
//   • `molstar`: 'unsafe-eval' + RCSB connect, only /medicine /chemistry /molecules.
//   • `iconify`: the human-history web-component script + api.iconify.design.
// Everything else stays eval-free and third-party-script-free.
function csp(options: { molstar?: boolean; iconify?: boolean }): string {
  const allowMolstar = options.molstar === true;
  const allowIconify = options.iconify === true;
  // Turbopack dev needs eval everywhere; in prod only molecule routes get it.
  const evalSrc = !isProd || allowMolstar ? " 'unsafe-eval'" : "";
  const molstarConnect = allowMolstar
    ? " data: https://models.rcsb.org https://files.rcsb.org"
    : "";
  const iconifyScript = allowIconify
    ? " https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"
    : "";
  const iconifyConnect = allowIconify ? " https://api.iconify.design" : "";
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    `script-src 'self'${evalSrc} 'unsafe-inline'${iconifyScript}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    `connect-src 'self' https://vitals.vercel-insights.com${iconifyConnect}${molstarConnect}`,
    // blob: workers are required in prod too: Turbopack dev workers use blob:, and
    // the self-hosted Mol* viewer spins up its compute workers from blob: URLs.
    "worker-src 'self' blob:",
    "manifest-src 'self'",
  ].join("; ");
}

function securityHeaders(options: { molstar?: boolean; iconify?: boolean }) {
  return [
    { key: "Content-Security-Policy", value: csp(options) },
    // Own the HSTS policy at the app layer so it stays strong and consistent across
    // *.vercel.app and any future custom domain (Vercel's default weakens on custom
    // domains). `preload` is intentionally omitted until every subdomain is HTTPS —
    // it is a hard-to-reverse commitment.
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
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
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // The body-phrase tier reads its corpus from disk at runtime via process.cwd().
  // Nothing imports those files, so tracing cannot infer them and the deployed
  // function would fall back to an empty corpus — search would quietly return no
  // prose matches in production while working perfectly in dev.
  outputFileTracingIncludes: {
    "/api/search": ["./generated/corpus.txt", "./generated/corpus-meta.json"],
    "/search": [
      "./generated/corpus.txt",
      "./generated/corpus-meta.json",
      "./public/search-index.json",
    ],
  },
  experimental: {
    optimizePackageImports: ["three", "@react-three/drei", "framer-motion", "gsap", "katex"],
  },
  async headers() {
    return [
      // Molecule-bearing routes get the Mol*-enabled (eval + RCSB) policy.
      { source: "/medicine/:path*", headers: securityHeaders({ molstar: true }) },
      { source: "/chemistry/:path*", headers: securityHeaders({ molstar: true }) },
      { source: "/molecules/:path*", headers: securityHeaders({ molstar: true }) },
      // Human history is the only surface that loads the Iconify web component.
      { source: "/human-history/:path*", headers: securityHeaders({ iconify: true }) },
      // Everything else keeps the strict, eval-free policy. The negative lookahead
      // makes these paths match ONLY this rule — a second, stricter CSP header would
      // otherwise be enforced alongside and re-block eval on the molecule routes.
      {
        source: "/((?!medicine|chemistry|molecules|human-history).*)",
        headers: securityHeaders({}),
      },
    ];
  },
};

const withMDX = createMDX({ options: {} });

export default withMDX(nextConfig);
