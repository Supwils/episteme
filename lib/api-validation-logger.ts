/**
 * Lightweight validation error logger for API routes.
 * Logs structured validation failures with request context.
 */

export interface ValidationContext {
  requestId: string;
  endpoint: string;
  clientId?: string;
}

export interface ValidationError {
  field?: string;
  reason: string;
  value?: unknown;
}

/**
 * Log a validation failure with context.
 * In production, these would typically go to structured logging/monitoring.
 */
export function logValidationError(context: ValidationContext, errors: ValidationError[]): void {
  const timestamp = new Date().toISOString();
  const { requestId, endpoint, clientId } = context;

  // Simple console logging; in production would use structured logger
  console.warn({
    timestamp,
    level: "warn",
    type: "validation_error",
    requestId,
    endpoint,
    clientId,
    errors,
  });
}

/**
 * Log a rate limit hit with context.
 */
export function logRateLimitHit(context: ValidationContext, retryAfter: number): void {
  const timestamp = new Date().toISOString();
  const { requestId, endpoint, clientId } = context;

  console.warn({
    timestamp,
    level: "warn",
    type: "rate_limit_hit",
    requestId,
    endpoint,
    clientId,
    retryAfter,
  });
}
