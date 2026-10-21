import { describe, expect, it } from "vitest";
import { readKnowledgeRequestBody } from "../knowledge-api-request";

describe("knowledge JSON transport", () => {
  it("decodes a multibyte character split across stream chunks", async () => {
    const bytes = new TextEncoder().encode('{"knownIds":["𠀀"]}');
    let position = 0;
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        if (position < bytes.length) controller.enqueue(bytes.slice(position, ++position));
        else controller.close();
      },
    });
    const init = { method: "POST", body, duplex: "half" } satisfies RequestInit & {
      duplex: "half";
    };
    const result = await readKnowledgeRequestBody(new Request("http://localhost/api", init));
    expect(result).toEqual({ ok: true, body: { knownIds: ["𠀀"] } });
  });

  it("returns a private invalid-JSON response when the request stream fails", async () => {
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.error(new Error("disconnected"));
      },
    });
    const init = { method: "POST", body, duplex: "half" } satisfies RequestInit & {
      duplex: "half";
    };
    const result = await readKnowledgeRequestBody(new Request("http://localhost/api", init));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(400);
      expect(result.response.headers.get("Cache-Control")).toBe("private, no-store");
      await expect(result.response.json()).resolves.toEqual({ error: "Invalid JSON body" });
    }
  });

  it("does not throw or take ownership of an already locked body", async () => {
    const request = new Request("http://localhost/api", { method: "POST", body: "{}" });
    const owner = request.body!.getReader();
    try {
      const result = await readKnowledgeRequestBody(request);
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.response.status).toBe(400);
      expect((await owner.read()).done).toBe(false);
    } finally {
      owner.releaseLock();
    }
  });
});
