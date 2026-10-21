import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST as frontier } from "../route";
import { POST as plan } from "../plan/route";
import { POST as journeys } from "../journeys/route";
import { POST as relationReview } from "../relation-review/route";

const builders = vi.hoisted(() => ({
  frontier: vi.fn(() => ({ results: [] })),
  plan: vi.fn(() => ({ target: { id: "target" } })),
  review: vi.fn(() => ({ targets: [] })),
}));
vi.mock("@/lib/knowledge-frontier-catalog", () => ({
  buildKnowledgeFrontierView: builders.frontier,
}));
vi.mock("@/lib/knowledge-gap-plan-catalog", () => ({
  buildCatalogKnowledgeGapPlan: builders.plan,
}));
vi.mock("@/lib/knowledge-relation-review-catalog", () => ({
  buildCatalogKnowledgeRelationReview: builders.review,
}));

const BODY_LIMIT = 3 * 1024 * 1024;
const encoder = new TextEncoder();
const endpoints = [
  { path: "", post: frontier, payload: { knownIds: [], filter: { status: "ready" } } },
  { path: "/plan", post: plan, payload: { knownIds: [], targetId: "target", minutes: 45 } },
  {
    path: "/journeys",
    post: journeys,
    payload: { knownIds: [], journeys: [{ targetId: "target", minutes: 45 }] },
  },
  { path: "/relation-review", post: relationReview, payload: { knownIds: [] } },
];

beforeEach(() => vi.clearAllMocks());

function request(path: string, body: string | ReadableStream<Uint8Array>, headers = {}) {
  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body,
    duplex: "half",
  } satisfies RequestInit & { duplex: "half" };
  return new Request(`http://localhost/api/knowledge-frontier${path}`, init);
}

function assertPrivate(response: Response) {
  expect(response.headers.get("Cache-Control")).toBe("private, no-store");
  expect(response.headers.get("X-Profile-Storage")).toBe("local-only");
}

function oversizedStream(json: string, cancel = vi.fn()) {
  let pulls = 0;
  const chunks = [encoder.encode(json), new Uint8Array(BODY_LIMIT).fill(32), encoder.encode(" ")];
  const stream = new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        pulls += 1;
        const chunk = chunks.shift();
        if (chunk) controller.enqueue(chunk);
        else controller.close();
      },
      cancel,
    },
    { highWaterMark: 0 }
  );
  return { stream, cancel, pulls: () => pulls };
}

describe.each(endpoints)("POST frontier$path request budget", ({ path, post, payload }) => {
  it("rejects a declared oversized body before reading it", async () => {
    const source = oversizedStream(JSON.stringify(payload));
    const response = await post(
      request(path, source.stream, { "Content-Length": String(BODY_LIMIT + 1) })
    );
    expect(response.status).toBe(413);
    assertPrivate(response);
    expect(source.pulls()).toBe(0);
    expect(source.cancel).toHaveBeenCalledTimes(1);
    expect(Object.values(builders).every((builder) => builder.mock.calls.length === 0)).toBe(true);
  });

  it.each([{}, { "Content-Length": "1" }])(
    "enforces bytes while streaming even without an accurate declared size",
    async (headers) => {
      const source = oversizedStream(JSON.stringify(payload));
      const response = await post(request(path, source.stream, headers));
      expect(response.status).toBe(413);
      assertPrivate(response);
      expect(source.pulls()).toBe(2);
      expect(source.cancel).toHaveBeenCalledTimes(1);
      expect(Object.values(builders).every((builder) => builder.mock.calls.length === 0)).toBe(
        true
      );
    }
  );

  it("accepts a valid JSON body exactly at the byte budget", async () => {
    const response = await post(request(path, JSON.stringify(payload).padEnd(BODY_LIMIT, " ")));
    expect(response.status).toBe(200);
    assertPrivate(response);
  });

  it("preserves the existing maximum useful fields even when Unicode is escaped", async () => {
    const maximum: Record<string, unknown> = {
      ...payload,
      knownIds: Array.from({ length: 2000 }, (_, index) =>
        String.fromCharCode(0x4e00 + index).repeat(200)
      ),
    };
    if (maximum.journeys) {
      maximum.journeys = Array.from({ length: 16 }, (_, index) => ({
        targetId: String.fromCharCode(0x6000 + index).repeat(200),
        minutes: 90,
      }));
    }
    const escaped = JSON.stringify(maximum).replace(
      /[\u007f-\uffff]/g,
      (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`
    );
    expect(encoder.encode(escaped).byteLength).toBeLessThan(BODY_LIMIT);
    const response = await post(request(path, escaped));
    expect(response.status).toBe(200);
    assertPrivate(response);
  });

  it.each(["rejects", "never settles"])(
    "returns promptly when cancellation %s",
    async (mode) => {
      const cancel = vi.fn(() =>
        mode === "rejects" ? Promise.reject(new Error("closed")) : new Promise<void>(() => {})
      );
      const source = oversizedStream(JSON.stringify(payload), cancel);
      const response = await post(request(path, source.stream));
      expect(response.status).toBe(413);
      expect(cancel).toHaveBeenCalledTimes(1);
    },
    1000
  );

  it("retains private 400 responses for malformed JSON and invalid fields", async () => {
    for (const body of ["{", "{}", ""]) {
      const response = await post(request(path, body));
      expect(response.status).toBe(400);
      assertPrivate(response);
    }
  });
});

describe("frontier query normalization", () => {
  it.each([
    { input: "热".repeat(119) + "𠀀", expected: "热".repeat(119) + "𠀀" },
    { input: "𠀀".repeat(121), expected: "𠀀".repeat(120) },
    { input: "  自然选择  ", expected: "自然选择" },
  ])("passes complete code points to the catalog", async ({ input, expected }) => {
    const response = await frontier(
      request("", JSON.stringify({ knownIds: [], filter: { status: "ready", query: input } }))
    );
    expect(response.status).toBe(200);
    expect(builders.frontier).toHaveBeenCalledWith(
      [],
      expect.objectContaining({ query: expected })
    );
  });
});
