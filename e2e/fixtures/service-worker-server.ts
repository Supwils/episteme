import { createServer, type ServerResponse } from "node:http";
import { readFileSync } from "node:fs";
import { once } from "node:events";

function document(response: ServerResponse, path: string) {
  const control = path.includes("no-store")
    ? "private, no-cache, no-store"
    : "public, max-age=0, must-revalidate";
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": control });
  response.end(
    `<html lang="zh-CN"><meta charset="utf-8"><title>离线缓存测试</title><h1>${path}</h1></html>`
  );
}

export async function serviceWorkerServer(initialWorker?: string) {
  let workerSource = initialWorker ?? readFileSync("public/sw.js", "utf8");
  const server = createServer((request, response) => {
    const path = new URL(request.url!, "http://localhost").pathname;
    if (path === "/sw.js") {
      response.writeHead(200, { "Content-Type": "text/javascript", "Cache-Control": "no-store" });
      response.end(workerSource);
    } else if (path === "/sw-reading.js") {
      response.writeHead(200, { "Content-Type": "text/javascript", "Cache-Control": "no-store" });
      response.end(readFileSync("public/sw-reading.js", "utf8"));
    } else if (path.startsWith("/asset/")) {
      response.writeHead(200, {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=0",
      });
      response.end(JSON.stringify({ path }));
    } else document(response, path);
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Missing HTTP fixture address");
  return {
    origin: `http://127.0.0.1:${address.port}`,
    updateWorker: () => {
      workerSource = readFileSync("public/sw.js", "utf8");
    },
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
        server.closeAllConnections();
      }),
  };
}
