// A local stand-in for the CDN in front of `next start` during Lighthouse runs.
// `next start` gzips pages and public files but serves force-static route
// handler bodies uncompressed — /knowledge-graph/graph-data went out as 3 MB
// locally versus 575 KB brotli on Vercel, which put the lab LCP at ~18 s while
// production measured 1.2 s. Budgets must measure what production serves.
import http from "node:http";
import { brotliCompress, brotliCompressSync, constants } from "node:zlib";

const COMPRESSIBLE = /^(text\/|application\/(json|javascript|xml|manifest\+json)|image\/svg)/;
const FAST_QUALITY = 6;
// Vercel pre-compresses static output at maximum quality.
const CDN_QUALITY = 11;

function brotliOptions(quality) {
  return { params: { [constants.BROTLI_PARAM_QUALITY]: quality } };
}

/**
 * Starts a proxy on a free port and resolves to its base URL. Uncompressed
 * text responses are sent as brotli; the max-quality result is cached by URL
 * (computed in the background), so warmed-up routes transfer CDN-sized bodies.
 */
export function startCompressingProxy(upstreamBase) {
  const upstream = new URL(upstreamBase);
  const cache = new Map();

  const server = http.createServer((req, res) => {
    const acceptsBrotli = /\bbr\b/.test(req.headers["accept-encoding"] ?? "");
    const proxied = http.request(
      {
        hostname: upstream.hostname,
        port: upstream.port,
        path: req.url,
        method: req.method,
        headers: { ...req.headers, host: upstream.host, "accept-encoding": "identity" },
      },
      (upstreamRes) => {
        const type = upstreamRes.headers["content-type"] ?? "";
        const chunks = [];
        upstreamRes.on("data", (chunk) => chunks.push(chunk));
        upstreamRes.on("end", () => {
          const body = Buffer.concat(chunks);
          const headers = { ...upstreamRes.headers };
          delete headers["content-length"];
          if (!acceptsBrotli || !COMPRESSIBLE.test(type) || body.length < 1024) {
            res.writeHead(upstreamRes.statusCode ?? 200, headers);
            res.end(body);
            return;
          }
          const key = `${req.url}:${body.length}`;
          let compressed = cache.get(key);
          if (!compressed) {
            compressed = brotliCompressSync(body, brotliOptions(FAST_QUALITY));
            brotliCompress(body, brotliOptions(CDN_QUALITY), (error, best) => {
              if (!error) cache.set(key, best);
            });
          }
          headers["content-encoding"] = "br";
          headers.vary = [headers.vary, "Accept-Encoding"].filter(Boolean).join(", ");
          res.writeHead(upstreamRes.statusCode ?? 200, headers);
          res.end(compressed);
        });
      }
    );
    proxied.on("error", (error) => {
      res.writeHead(502);
      res.end(String(error));
    });
    req.pipe(proxied);
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ base: `http://127.0.0.1:${port}`, close: () => server.close() });
    });
  });
}
