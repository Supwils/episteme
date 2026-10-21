import assert from "node:assert/strict";
import type { JSHandle, Page } from "@playwright/test";
import type { RequestRecord } from "./fixtures/navigation-cancellation";

export type ProbeOutcome = {
  transport: string;
  event: string;
  status?: number;
  name?: string;
  message?: string;
  body?: string;
};
export type Observed =
  | { state: "settled"; outcomes: ProbeOutcome[] }
  | { state: "pending" }
  | { state: "evaluation-error"; error: string };
export type Cell = {
  engine: string;
  phase: "control" | "cors" | "replacement" | "inflight";
  id: string;
  origin: string;
  targetOrigin: string;
  outcome: Observed;
  pageErrors: string[];
  signals: string[] | null;
  requests: RequestRecord[];
  finalTitle: string;
  finding: string;
  requestFailures: { path: string; transport: string; message: string }[];
  inflight?: {
    responseHeadersObserved: number;
    cancelledWhileResponseHeld: number;
    closedBeforeContextClose: boolean;
  };
};

function settled(cell: Cell) {
  assert(cell.outcome.state === "settled", "Control requests must finish");
  return cell.outcome.outcomes;
}

function validateControl(cell: Cell, probes: RequestRecord[]) {
  assert.equal(cell.origin, cell.targetOrigin);
  assert.deepEqual(
    settled(cell).map(({ transport, event, status, body }) => ({ transport, event, status, body })),
    [
      { transport: "fetch", event: "resolved", status: 200, body: "ok" },
      { transport: "xhr", event: "load", status: 200, body: "ok" },
    ]
  );
  assert.equal(probes.length, 2);
  assert.deepEqual(probes.map((request) => request.transport).sort(), ["fetch", "xhr"]);
  assert(
    probes.every(
      (request) =>
        request.origin === "source" &&
        request.method === "POST" &&
        request.status === 200 &&
        request.finished === true
    )
  );
  assert.deepEqual(cell.pageErrors, []);
  assert.deepEqual(cell.signals, []);
  assert.equal(cell.finalTitle, "source");
  return "same-origin-control-passed";
}

function validateCors(cell: Cell, probes: RequestRecord[]) {
  assert.notEqual(cell.origin, cell.targetOrigin);
  assert.deepEqual(
    settled(cell).map(({ transport, event }) => ({ transport, event })),
    [
      { transport: "fetch", event: "rejected" },
      { transport: "xhr", event: "error" },
    ]
  );
  assert.equal(probes.length, 2);
  assert.deepEqual(probes.map((request) => request.transport).sort(), ["fetch", "xhr"]);
  assert(
    probes.every(
      (request) =>
        request.origin === "foreign" &&
        request.method === "OPTIONS" &&
        request.status === 403 &&
        request.requestOrigin === cell.origin &&
        request.preflightMethod === "POST" &&
        request.finished === true
    )
  );
  assert.deepEqual(cell.signals, []);
  assert.equal(cell.finalTitle, "source");
  return "cross-origin-preflight-denied";
}

function classifyReplacement(cell: Cell, probes: RequestRecord[]) {
  assert.equal(cell.origin, cell.targetOrigin);
  assert.equal(cell.finalTitle, "replacement");
  assert(
    cell.requests.some(
      (request) =>
        request.origin === "source" && request.path === "/replacement" && request.status === 200
    )
  );
  if (cell.outcome.state === "pending") return "pending-at-observation-deadline";
  assert.deepEqual(cell.signals, []);
  const outcomes = settled(cell);
  const refused =
    outcomes[0]?.event === "rejected" &&
    outcomes[1]?.event === "error" &&
    outcomes[1]?.status === 0;
  const accessErrors =
    cell.pageErrors.length === 2 &&
    ["Fetch API cannot load ", "XMLHttpRequest cannot load "].every((prefix) =>
      cell.pageErrors.some(
        (error) => error.startsWith(prefix) && error.endsWith("due to access control checks.")
      )
    );
  return refused && probes.length === 0 && accessErrors
    ? "same-origin-refusal-with-pageerrors-reproduced"
    : "different-behavior-observed";
}

export function validateNavigationCell(cell: Cell) {
  assert.notEqual(cell.outcome.state, "evaluation-error");
  if (cell.outcome.state === "settled")
    assert.deepEqual(
      cell.outcome.outcomes.map((item) => item.transport),
      ["fetch", "xhr"]
    );
  assert(cell.requests.every((request) => request.cell === cell.id));
  const probes = cell.requests.filter((request) => request.path === "/probe");
  if (cell.phase === "control") return validateControl(cell, probes);
  if (cell.phase === "cors") return validateCors(cell, probes);
  if (cell.phase === "inflight") return classifyInflight(cell);
  return classifyReplacement(cell, probes);
}

function classifyInflight(cell: Cell) {
  assert.equal(cell.origin, cell.targetOrigin);
  assert.equal(cell.finalTitle, "replacement");
  assert.equal(cell.inflight?.responseHeadersObserved, 2);
  const requests = cell.requests.filter((request) => request.path === "/held-probe");
  assert.deepEqual(requests.map((request) => request.transport).sort(), ["fetch", "xhr"]);
  assert(
    requests.every(
      (request) =>
        request.origin === "source" &&
        request.method === "POST" &&
        request.headersSent &&
        request.status === 200
    )
  );
  if (cell.outcome.state === "settled") assert.deepEqual(cell.signals, []);
  return cell.inflight?.closedBeforeContextClose &&
    requests.every((request) => request.cancelled && !request.finished)
    ? "inflight-body-cancellation-observed"
    : "different-inflight-behavior-observed";
}

type ProbeWindow = { window: Window & typeof globalThis; signals: string[] };

export async function observeWindow(page: Page) {
  return await page.evaluateHandle(() => {
    const signals: string[] = [];
    window.addEventListener("error", (event) => signals.push(`error:${event.message}`));
    window.addEventListener("unhandledrejection", (event) =>
      signals.push(`unhandledrejection:${String(event.reason)}`)
    );
    return { window, signals };
  });
}

// Playwright serializes this function; keep its runtime dependencies inside it.
async function collectProbes({ window: w }: ProbeWindow, target: string) {
  return Promise.all(
    ["fetch", "xhr"].map(async (transport) => {
      const endpoint = new URL(target);
      endpoint.searchParams.set("transport", transport);
      let responseStatus: number | undefined;
      try {
        if (transport === "fetch") {
          const response = await w.fetch(endpoint, {
            method: "POST",
            headers: { "X-Probe": "1" },
            body: "probe",
          });
          responseStatus = response.status;
          const body = await response.text();
          return { transport, event: "resolved", status: response.status, body };
        }
        return await new Promise<ProbeOutcome>((done) => {
          const xhr = new w.XMLHttpRequest();
          xhr.open("POST", endpoint);
          xhr.setRequestHeader("X-Probe", "1");
          xhr.timeout = 3000;
          for (const event of ["load", "error", "abort", "timeout"])
            xhr.addEventListener(event, () =>
              done({
                transport,
                event,
                status: xhr.status,
                body: event === "load" ? xhr.responseText : undefined,
              })
            );
          xhr.send("probe");
        });
      } catch (error) {
        return {
          transport,
          event: "rejected",
          name: (error as Error).name,
          message: (error as Error).message,
          status: responseStatus,
        };
      }
    })
  );
}

export function probe(handle: JSHandle<ProbeWindow>, url: string): Promise<Observed> {
  return handle.evaluate(collectProbes, url).then(
    (outcomes) => ({ state: "settled", outcomes }),
    (error) => ({ state: "evaluation-error", error: String(error) })
  );
}

export async function observe(pending: Promise<Observed>, milliseconds: number): Promise<Observed> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      pending,
      new Promise<Observed>((done) => {
        timer = setTimeout(() => done({ state: "pending" }), milliseconds);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}
