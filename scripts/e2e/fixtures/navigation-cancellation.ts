import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";

export interface RequestRecord {
  origin: "source" | "foreign";
  path: string;
  method: string;
  cell: string;
  transport: string;
  status?: number;
  requestOrigin?: string;
  preflightMethod?: string;
  finished?: boolean;
  headersSent?: boolean;
  cancelled?: boolean;
}

type Replacement = ReturnType<typeof deferred> & {
  response?: ServerResponse;
  closed: ReturnType<typeof deferred>;
};

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

async function listen(server: Server) {
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Expected an owned TCP server");
  return `http://127.0.0.1:${address.port}`;
}

function record(
  ledger: RequestRecord[],
  origin: RequestRecord["origin"],
  request: IncomingMessage,
  response: ServerResponse
) {
  const parsed = new URL(request.url ?? "/", "http://fixture.invalid");
  const entry: RequestRecord = {
    origin,
    path: parsed.pathname,
    method: request.method ?? "GET",
    cell: parsed.searchParams.get("cell") ?? "",
    transport: parsed.searchParams.get("transport") ?? "",
    requestOrigin: String(request.headers.origin ?? ""),
    preflightMethod: String(request.headers["access-control-request-method"] ?? ""),
    finished: false,
    headersSent: false,
  };
  ledger.push(entry);
  response.once("finish", () => {
    entry.status = response.statusCode;
    entry.finished = true;
    entry.headersSent = response.headersSent;
  });
  response.once("close", () => {
    entry.cancelled = !response.writableEnded;
  });
  return entry;
}

function sourceServer(ledger: RequestRecord[], replacements: Map<string, Replacement>) {
  return createServer((request, response) => {
    const entry = record(ledger, "source", request, response);
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Content-Type", "text/html");
    if (entry.path === "/replacement" || entry.path === "/held-probe") {
      const key = entry.path === "/replacement" ? entry.cell : `${entry.cell}:${entry.transport}`;
      const held = replacements.get(key);
      if (!held) {
        response.writeHead(400).end();
        return;
      }
      held.response = response;
      response.once("close", held.closed.resolve);
      if (entry.path === "/held-probe") {
        response.setHeader("Content-Type", "text/plain; charset=utf-8");
        response.flushHeaders();
        response.write("x".repeat(1024));
        entry.status = response.statusCode;
        entry.headersSent = true;
      }
      held.resolve();
      return;
    }
    if (entry.path === "/probe") {
      response.end("ok");
      return;
    }
    response.end("<!doctype html><title>source</title>");
  });
}

function holdReplacement(replacements: Map<string, Replacement>, cell: string) {
  const entry: Replacement = { ...deferred(), closed: deferred() };
  replacements.set(cell, entry);
  return {
    arrived: entry.promise,
    closed: entry.closed.promise,
    release() {
      if (replacements.get(cell) !== entry) return;
      replacements.delete(cell);
      entry.response?.end("<!doctype html><title>replacement</title>");
    },
  };
}

async function closeServers(servers: Server[]) {
  for (const server of servers) server.closeAllConnections();
  await Promise.all(
    servers.map((server) => new Promise<void>((resolve) => server.close(() => resolve())))
  );
}

export async function startNavigationFixture() {
  const ledger: RequestRecord[] = [];
  const replacements = new Map<string, Replacement>();
  const source = sourceServer(ledger, replacements);
  const foreign = createServer((request, response) => {
    record(ledger, "foreign", request, response);
    response.writeHead(403, { "Cache-Control": "no-store" }).end("CORS preflight denied");
  });
  const servers = [source, foreign];
  try {
    const origin = await listen(source);
    const foreignOrigin = await listen(foreign);
    return {
      origin,
      foreignOrigin,
      ledger,
      close: () => closeServers(servers),
      stop: () =>
        servers.forEach((server) => {
          server.closeAllConnections();
          server.close();
        }),
      holdReplacement: (cell: string) => holdReplacement(replacements, cell),
      holdProbe: (cell: string, transport: string) =>
        holdReplacement(replacements, `${cell}:${transport}`),
    };
  } catch (error) {
    await closeServers(servers);
    throw error;
  }
}
