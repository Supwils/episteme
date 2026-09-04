import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { logValidationError, logRateLimitHit } from "../api-validation-logger";

describe("api-validation-logger", () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  describe("logValidationError", () => {
    it("should log validation errors with context", () => {
      const context = {
        requestId: "req-123",
        endpoint: "/api/test",
        clientId: "1.2.3.4",
      };
      const errors = [
        { field: "email", reason: "Invalid format", value: "not-an-email" },
        { reason: "Missing required field" },
      ];

      logValidationError(context, errors);

      expect(consoleWarnSpy).toHaveBeenCalledOnce();
      const loggedData = consoleWarnSpy.mock.calls[0]?.[0] as Record<string, unknown>;
      expect(loggedData).toMatchObject({
        level: "warn",
        type: "validation_error",
        requestId: "req-123",
        endpoint: "/api/test",
        clientId: "1.2.3.4",
        errors,
      });
      expect(loggedData.timestamp).toBeDefined();
    });

    it("should handle context without clientId", () => {
      const context = {
        requestId: "req-456",
        endpoint: "/api/public",
      };
      const errors = [{ reason: "Invalid input" }];

      logValidationError(context, errors);

      expect(consoleWarnSpy).toHaveBeenCalledOnce();
      const loggedData = consoleWarnSpy.mock.calls[0]?.[0] as Record<string, unknown>;
      expect(loggedData).toMatchObject({
        type: "validation_error",
        requestId: "req-456",
        endpoint: "/api/public",
        errors,
      });
      expect(loggedData.clientId).toBeUndefined();
    });

    it("should include timestamp in ISO format", () => {
      const context = { requestId: "req-789", endpoint: "/api/test" };
      const errors = [{ reason: "Test error" }];

      logValidationError(context, errors);

      const loggedData = consoleWarnSpy.mock.calls[0]?.[0] as Record<string, unknown>;
      expect(loggedData.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });
  });

  describe("logRateLimitHit", () => {
    it("should log rate limit hits with context", () => {
      const context = {
        requestId: "req-abc",
        endpoint: "/api/search",
        clientId: "5.6.7.8",
      };
      const retryAfter = 30;

      logRateLimitHit(context, retryAfter);

      expect(consoleWarnSpy).toHaveBeenCalledOnce();
      const loggedData = consoleWarnSpy.mock.calls[0]?.[0] as Record<string, unknown>;
      expect(loggedData).toMatchObject({
        level: "warn",
        type: "rate_limit_hit",
        requestId: "req-abc",
        endpoint: "/api/search",
        clientId: "5.6.7.8",
        retryAfter: 30,
      });
      expect(loggedData.timestamp).toBeDefined();
    });

    it("should handle context without clientId", () => {
      const context = {
        requestId: "req-def",
        endpoint: "/api/data",
      };

      logRateLimitHit(context, 60);

      expect(consoleWarnSpy).toHaveBeenCalledOnce();
      const loggedData = consoleWarnSpy.mock.calls[0]?.[0] as Record<string, unknown>;
      expect(loggedData).toMatchObject({
        type: "rate_limit_hit",
        requestId: "req-def",
        retryAfter: 60,
      });
    });

    it("should include timestamp in ISO format", () => {
      const context = { requestId: "req-ghi", endpoint: "/api/test" };

      logRateLimitHit(context, 10);

      const loggedData = consoleWarnSpy.mock.calls[0]?.[0] as Record<string, unknown>;
      expect(loggedData.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });
  });
});
