import type { Instrumentation } from "next";

/**
 * Server-side error hook: every error Next.js captures while rendering,
 * in route handlers or server actions is logged as structured JSON.
 */
export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  const { logger } = await import("./app/lib/logger");
  const { serializeError } = await import("./app/lib/log-schema");

  logger.error("server.request_error", {
    error: serializeError(error),
    path: request.path,
    method: request.method,
    routePath: context.routePath,
    routeType: context.routeType,
  });
};
