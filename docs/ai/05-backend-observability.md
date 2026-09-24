# 05 — Backend y observabilidad (`backend`)

**Archivos:** `app/api/log/route.ts`, `app/lib/{log-schema,logger,client-logger,contact}.ts`,
`instrumentation.ts`, `instrumentation-client.ts`, `app/error.tsx`, `app/global-error.tsx`

## Logging

| Pieza | Rol |
|-------|-----|
| `log-schema.ts` | Contrato compartido (puro): `LogLevel`, `LogEntry`, `ClientLogPayload`, `parseClientLogPayload`, `serializeError`, `MAX_LOG_BODY_BYTES` (8 KB) |
| `logger.ts` | Server: una línea JSON por evento a stdout/stderr (`timestamp, level, event, source, context`). `logger.fromClient` re-emite logs del navegador con `source: "client"` |
| `client-logger.ts` | Browser: consola solo en dev; **warn/error** se envían a `/api/log` con `sendBeacon` (fallback `fetch keepalive`); máx. 20 por página; nunca lanza |
| `api/log/route.ts` | `POST`: 413 si > 8 KB, 400 si JSON o schema inválido, 204 si ok. Agrega `path` y `userAgent` |
| `instrumentation.ts` | `onRequestError` → `server.request_error` |
| `instrumentation-client.ts` | `error`, `unhandledrejection` y errores de recursos (fase capture) |
| `error.tsx` / `global-error.tsx` | Boundaries: loguean y ofrecen `unstable_retry()` (API de Next 16) |

### Catálogo de eventos (nombres estables — no renombrar sin actualizar tests y README)

`server.request_error` · `client.unhandled_error` · `client.unhandled_rejection` · `client.resource_error` ·
`client.render_error` · `client.global_error` · `contact.submit` · `contact.validation_failed` ·
`contact.success` · `contact.failure`

Formato de `event`: minúsculas, `snake_case` separados por puntos (`dominio.accion`), máx. 80 caracteres.

## Contacto

`lib/contact.ts`: `validateContact` (cliente) y `submitContact(formId, FormData, fetch?)` → POST a
`https://formspree.io/f/<id>` con `Accept: application/json`. Devuelve un resultado discriminado
(`ok` / errores por campo / mensaje genérico); nunca lanza. Honeypot `_gotcha`.

## Reglas

- Todo `catch` que trague un error debe loguearlo con un `event` del catálogo (o agregar uno nuevo acá).
- Validar todo input externo en el servidor con un parser explícito (patrón `parseClientLogPayload`).
- Secretos solo en variables de entorno de Vercel; nada sensible en `NEXT_PUBLIC_*`.
- Si se agrega una route, crear su `route.test.ts` y un caso en `e2e/seo-and-api.spec.ts`.

## Deuda técnica conocida

- `/api/log` sin rate limiting (serverless sin estado): usar Vercel Firewall o un contador en KV.
- Sin log drain / alertas: los logs se leen en el panel de Vercel.
