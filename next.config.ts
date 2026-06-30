import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const isProd = process.env.NODE_ENV === "production";

// Content-Security-Policy. `allowMolstar` adds exactly what the self-hosted Mol*
// 3D molecule viewer needs at runtime — and nothing more:
//   • 'unsafe-eval' in script-src: molstar uses new Function / eval + WebAssembly
//     to bootstrap, which a strict eval-free policy blocks.
//   • the RCSB hosts in connect-src: molstar fetches real PDB structures from them.
// It is scoped (see headers()) to only the routes that actually render a molecule
// (/medicine, /chemistry, /molecules), so the entire rest of the site keeps a
// strict, eval-free, RCSB-free script/connect policy.
function csp(allowMolstar: boolean): string {
  // Turbopack dev needs eval everywhere; in prod only molecule routes get it.
  const evalSrc = !isProd || allowMolstar ? " 'unsafe-eval'" : "";
  // molstar fetches its bundled WASM via a data: URI and real PDB structures from
  // the RCSB hosts — both only on molecule routes.
  const molstarConnect = allowMolstar
    ? " data: https://models.rcsb.org https://files.rcsb.org"
    : "";
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    `script-src 'self'${evalSrc} 'unsafe-inline' https://code.iconify.design`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    `connect-src 'self' https://api.iconify.design https://api.unisvg.com https://api.simpleicons.org https://vitals.vercel-insights.com${molstarConnect}`,
    // blob: workers are required in prod too: Turbopack dev workers use blob:, and
    // the self-hosted Mol* viewer spins up its compute workers from blob: URLs.
    "worker-src 'self' blob:",
    "manifest-src 'self'",
  ].join("; ");
}

function securityHeaders(allowMolstar: boolean) {
  return [
    { key: "Content-Security-Policy", value: csp(allowMolstar) },
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
  experimental: {
    optimizePackageImports: ["three", "@react-three/drei", "framer-motion", "gsap", "katex"],
  },
  async headers() {
    return [
      // Molecule-bearing routes get the Mol*-enabled (eval + RCSB) policy.
      { source: "/medicine/:path*", headers: securityHeaders(true) },
      { source: "/chemistry/:path*", headers: securityHeaders(true) },
      { source: "/molecules/:path*", headers: securityHeaders(true) },
      // Everything else keeps the strict, eval-free policy. The negative lookahead
      // makes these paths match ONLY this rule — a second, stricter CSP header would
      // otherwise be enforced alongside and re-block eval on the molecule routes.
      { source: "/((?!medicine|chemistry|molecules).*)", headers: securityHeaders(false) },
    ];
  },
};

const withMDX = createMDX({ options: {} });

export default withMDX(nextConfig);
