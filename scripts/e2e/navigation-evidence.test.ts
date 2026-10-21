import { describe, expect, it } from "vitest";
import { validateNavigationCell, type Cell } from "./navigation-evidence";

function replacement(): Cell {
  return {
    engine: "webkit",
    phase: "replacement",
    id: "test",
    origin: "http://127.0.0.1:1234",
    targetOrigin: "http://127.0.0.1:1234",
    outcome: {
      state: "settled",
      outcomes: [
        { transport: "fetch", event: "rejected", name: "TypeError" },
        { transport: "xhr", event: "error", status: 0 },
      ],
    },
    pageErrors: [
      "Fetch API cannot load http: /probe due to access control checks.",
      "XMLHttpRequest cannot load http: /probe due to access control checks.",
    ],
    signals: [],
    requests: [
      {
        origin: "source",
        path: "/replacement",
        method: "GET",
        cell: "test",
        transport: "",
        status: 200,
      },
    ],
    finalTitle: "replacement",
    finding: "unvalidated",
    requestFailures: [],
  };
}

function control(): Cell {
  const cell = replacement();
  return {
    ...cell,
    phase: "control",
    finalTitle: "source",
    pageErrors: [],
    outcome: {
      state: "settled",
      outcomes: [
        { transport: "fetch", event: "resolved", status: 200, body: "ok" },
        { transport: "xhr", event: "load", status: 200, body: "ok" },
      ],
    },
    requests: ["fetch", "xhr"].map((transport) => ({
      origin: "source",
      path: "/probe",
      method: "POST",
      cell: cell.id,
      transport,
      status: 200,
      finished: true,
    })),
  };
}

function inflight(): Cell {
  const cell = replacement();
  cell.phase = "inflight";
  cell.outcome = { state: "pending" };
  cell.signals = null;
  cell.pageErrors = [];
  cell.inflight = {
    responseHeadersObserved: 2,
    cancelledWhileResponseHeld: 0,
    closedBeforeContextClose: true,
  };
  cell.requests.push(
    ...["fetch", "xhr"].map((transport) => ({
      origin: "source" as const,
      path: "/held-probe",
      method: "POST",
      cell: cell.id,
      transport,
      status: 200,
      headersSent: true,
      finished: false,
      cancelled: true,
    }))
  );
  return cell;
}

describe("navigation evidence", () => {
  it("attributes a refusal only with two matching errors and no probe ingress", () => {
    expect(validateNavigationCell(replacement())).toBe(
      "same-origin-refusal-with-pageerrors-reproduced"
    );
  });

  it("does not attribute the same error messages when the request reached the server", () => {
    const cell = replacement();
    cell.requests.push({
      origin: "source",
      path: "/probe",
      method: "POST",
      cell: cell.id,
      transport: "fetch",
      status: 200,
    });
    expect(validateNavigationCell(cell)).toBe("different-behavior-observed");
  });

  it("keeps unrelated page errors distinct", () => {
    const cell = replacement();
    cell.pageErrors = ["ReferenceError: broken", "TypeError: broken"];
    expect(validateNavigationCell(cell)).toBe("different-behavior-observed");
  });

  it("rejects a JavaScript exception rather than calling it a browser-only diagnostic", () => {
    const cell = replacement();
    cell.signals = ["unhandledrejection:Error: broken"];
    expect(() => validateNavigationCell(cell)).toThrow();
  });

  it("does not equate pending observation with successful or refused requests", () => {
    const cell = replacement();
    cell.outcome = { state: "pending" };
    cell.signals = null;
    cell.pageErrors = [];
    expect(validateNavigationCell(cell)).toBe("pending-at-observation-deadline");
  });

  it("refuses cross-origin data in a same-origin replacement cell", () => {
    const cell = replacement();
    cell.targetOrigin = "http://127.0.0.1:4321";
    expect(() => validateNavigationCell(cell)).toThrow();
  });
});

describe("navigation control integrity", () => {
  it("does not treat a destroyed evaluation context as a completed probe", () => {
    const cell = replacement();
    cell.outcome = { state: "evaluation-error", error: "context destroyed" };
    expect(() => validateNavigationCell(cell)).toThrow();
  });

  it("requires both transports in the successful control", () => {
    const cell = control();
    cell.outcome = { state: "settled", outcomes: [] };
    expect(() => validateNavigationCell(cell)).toThrow();
  });

  it("requires actual server ingress for successful control responses", () => {
    const cell = control();
    cell.requests = [];
    expect(() => validateNavigationCell(cell)).toThrow();
  });

  it("does not replace an XHR ledger entry with a duplicate fetch", () => {
    const cell = control();
    cell.requests[1]!.transport = "fetch";
    expect(() => validateNavigationCell(cell)).toThrow();
  });

  it("recognizes a real denied preflight through server evidence", () => {
    const cell = replacement();
    cell.phase = "cors";
    cell.targetOrigin = "http://127.0.0.1:4321";
    cell.finalTitle = "source";
    cell.requests = ["fetch", "xhr"].map((transport) => ({
      origin: "foreign",
      path: "/probe",
      method: "OPTIONS",
      cell: cell.id,
      transport,
      status: 403,
      finished: true,
      requestOrigin: cell.origin,
      preflightMethod: "POST",
    }));
    expect(validateNavigationCell(cell)).toBe("cross-origin-preflight-denied");
    cell.requests[0]!.status = 200;
    expect(() => validateNavigationCell(cell)).toThrow();
  });
});

describe("response body evidence", () => {
  it("does not count response headers alone as a complete successful control", () => {
    const cell = control();
    if (cell.outcome.state === "settled") delete cell.outcome.outcomes[0]!.body;
    expect(() => validateNavigationCell(cell)).toThrow();
  });

  it("distinguishes cancellation of an already streaming body from a refused new request", () => {
    expect(validateNavigationCell(inflight())).toBe("inflight-body-cancellation-observed");
  });

  it("does not attribute cleanup-induced closure to navigation", () => {
    const cell = inflight();
    cell.inflight!.closedBeforeContextClose = false;
    expect(validateNavigationCell(cell)).toBe("different-inflight-behavior-observed");
  });

  it("requires browser confirmation of both response headers", () => {
    const cell = inflight();
    cell.inflight!.responseHeadersObserved = 1;
    expect(() => validateNavigationCell(cell)).toThrow();
  });

  it("does not call a finished response body a cancellation", () => {
    const cell = inflight();
    for (const request of cell.requests)
      if (request.path === "/held-probe") {
        request.cancelled = false;
        request.finished = true;
      }
    expect(validateNavigationCell(cell)).toBe("different-inflight-behavior-observed");
  });
});
