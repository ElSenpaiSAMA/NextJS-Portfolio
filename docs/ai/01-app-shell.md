# 01 — App shell (`app-shell`)

**Archivos:** `app/layout.tsx`, `app/page.tsx`, `app/not-found.tsx`, `app/opengraph-image.tsx`,
`app/icon.svg`, `app/sitemap.ts`, `app/robots.ts`, `next.config.ts`

## layout.tsx

- Fuentes `Geist` (`--font-geist-sans`) y `Geist_Mono` (`--font-geist-mono`) vía `next/font/google`, mapeadas en `globals.css`.
- `metadata`: `metadataBase` = `siteUrl` (`NEXT_PUBLIC_SITE_URL` o el dominio de Vercel), título con template,
  description, canonical `/`, Open Graph (`type: profile`), Twitter `summary_large_image`, robots.
- `viewport.themeColor` claro/oscuro.
- `<script>` inline en `<head>` con `THEME_INIT_SCRIPT` (capa 02): fija `data-theme` antes del primer paint.
  Por eso `<html suppressHydrationWarning>`.

## page.tsx

Compone header, `<main id="main">` con las secciones en orden, footer y JSON-LD `Person`.
**El orden de secciones y su numeración (`index="01"`…) deben coincidir con `NAV_ITEMS` en `lib/site.ts`.**

## SEO / archivos de metadata

| Archivo | Genera |
|---------|--------|
| `opengraph-image.tsx` | `/opengraph-image` PNG 1200×630 con `ImageResponse` (estático en build) |
| `icon.svg` | favicon |
| `sitemap.ts` | `/sitemap.xml` |
| `robots.ts` | `/robots.txt` (bloquea `/api/`) |
| `not-found.tsx` | 404 con link a home |

## next.config.ts

`poweredByHeader: false` y headers de seguridad en todas las rutas: `X-Content-Type-Options`,
`Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy`. El E2E `seo-and-api.spec.ts` los verifica.

## Reglas

- `layout.tsx`, `page.tsx` y las secciones son Server Components.
- La página debe seguir siendo **estática** (`○` en el output de `next build`). Si algo la vuelve dinámica, justificarlo.
- Metadata solo en `layout.tsx` (no duplicar en `page.tsx`).

## Deuda técnica conocida

- Sin Content-Security-Policy (requiere nonce/hash para el script de tema y el JSON-LD).
