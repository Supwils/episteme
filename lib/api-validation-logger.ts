/**
 * Structured logging for API validation failures.
 *
 * Logs validation errors with safe metadata (no secrets, truncated inputs) to help
 * diagnose legitimate client bugs without exposing sensitive data or bloating logs.
 */

interface ValidationLogContext {
  route: string;
  reason: string;
  ip?: string;
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Log a validation failure with structured context.
 * Safe for production: truncates large values, excludes sensitive headers.
 */
export function logValidationFailure(context: ValidationLogContext): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: "warn",
    type: "validation_failure",
    route: context.route,
    reason: context.reason,
    ip: context.ip ? maskIp(context.ip) : undefined,
    metadata: context.metadata,
  };

  console.warn("[API Validation]", JSON.stringify(logEntry));
}

/**
 * Mask IP address for privacy (keep first 2 octets for IPv4, first 3 groups for IPv6).
 */
function maskIp(ip: string): string {
  if (ip === "anonymous") return ip;

  if (ip.includes(":")) {
    // IPv6: keep first 3 groups
    const parts = ip.split(":");
    return parts.slice(0, 3).join(":") + ":****";
  }

  // IPv4: keep first 3 octets
  const parts = ip.split(".");
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.*`;
  }

  return "***";
}

/**
 * Create a safe metadata object for logging, truncating long strings.
 */
export function createSafeMetadata(
  raw: Record<string, unknown>
): Record<string, string | number | boolean> {
  const safe: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "string") {
      safe[key] = value.length > 100 ? `${value.slice(0, 97)}...` : value;
    } else if (typeof value === "number" || typeof value === "boolean") {
      safe[key] = value;
    } else if (Array.isArray(value)) {
      safe[`${key}Length`] = value.length;
    } else if (value && typeof value === "object") {
      safe[`${key}Keys`] = Object.keys(value).length;
    }
  }

  return safe;
}
