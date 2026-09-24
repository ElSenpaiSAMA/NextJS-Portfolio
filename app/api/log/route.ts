import { logger } from "../../lib/logger";
import { MAX_LOG_BODY_BYTES, parseClientLogPayload } from "../../lib/log-schema";

/**
 * Ingestion endpoint for browser logs (see app/lib/client-logger.ts).
 * Validates the untrusted payload and re-emits it through the structured
 * server logger, so client and server errors land in the same log stream.
 */
export async function POST(request: Request): Promise<Response> {
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_LOG_BODY_BYTES) {
    return Response.json({ error: "Payload too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseClientLogPayload(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  const { level, event, context, path } = parsed.value;
  logger.fromClient(level, event, {
    ...context,
    path,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  return new Response(null, { status: 204 });
}
