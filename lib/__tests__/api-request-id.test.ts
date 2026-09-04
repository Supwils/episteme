import { describe, it, expect } from "vitest";
import { getRequestId, withRequestId } from "../api-request-id";

describe("api-request-id", () => {
  describe("getRequestId", () => {
    it("should extract x-request-id from headers", () => {
      const request = new Request("http://localhost", {
        headers: { "x-request-id": "test-123" },
      });
      expect(getRequestId(request)).toBe("test-123");
    });

    it("should extract x-correlation-id from headers", () => {
      const request = new Request("http://localhost", {
        headers: { "x-correlation-id": "corr-456" },
      });
      expect(getRequestId(request)).toBe("corr-456");
    });

    it("should prefer x-request-id over x-correlation-id", () => {
      const request = new Request("http://localhost", {
        headers: { "x-request-id": "req-123", "x-correlation-id": "corr-456" },
      });
      expect(getRequestId(request)).toBe("req-123");
    });

    it("should generate UUID when no header present", () => {
      const request = new Request("http://localhost");
      const id = getRequestId(request);
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });

    it("should trim whitespace from header values", () => {
      const request = new Request("http://localhost", {
        headers: { "x-request-id": "  trimmed-id  " },
      });
      expect(getRequestId(request)).toBe("trimmed-id");
    });

    it("should generate UUID for empty header", () => {
      const request = new Request("http://localhost", {
        headers: { "x-request-id": "   " },
      });
      const id = getRequestId(request);
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });
  });

  describe("withRequestId", () => {
    it("should create Headers with request ID", () => {
      const headers = withRequestId("test-id");
      expect(headers.get("x-request-id")).toBe("test-id");
    });

    it("should merge with existing headers", () => {
      const existing = { "Content-Type": "application/json", "Cache-Control": "no-store" };
      const headers = withRequestId("test-id", existing);
      expect(headers.get("x-request-id")).toBe("test-id");
      expect(headers.get("content-type")).toBe("application/json");
      expect(headers.get("cache-control")).toBe("no-store");
    });

    it("should preserve existing headers when merging", () => {
      const existing = new Headers({ "X-Custom": "value" });
      const headers = withRequestId("test-id", existing);
      expect(headers.get("x-request-id")).toBe("test-id");
      expect(headers.get("x-custom")).toBe("value");
    });
  });
});
