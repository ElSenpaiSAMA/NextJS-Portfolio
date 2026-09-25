# 01 — App shell (`app-shell`)

**Archivos:** `app/layout.tsx`, `app/page.tsx`, `app/not-found.tsx`, `app/opengraph-image.tsx`,
`app/icon.svg`, `app/sitemap.ts`, `app/robots.ts`, `next.config.ts`

## layout.tsx

- Fuente única `Inter` (`--font-inter`), `display: swap`.
- `metadata`: `metadataBase` = `siteUrl`, título "Matias Speroni — Backend & DevOps Engineer", description,
  canonical `/`, Open Graph (`type: profile`), Twitter `summary_large_image`, robots.
- `viewport.themeColor`: `#ffffff` / `#0b1120`.
- `<script>` inline con `THEME_INIT_SCRIPT` (capa 02) → `<html suppressHydrationWarning>`.
- Estructura: `SiteHeader` (sticky) → `<main id="main">` → `SiteFooter`.

## page.tsx

Compone las secciones en orden y el JSON-LD `Person` (incluye la foto). **El orden debe coincidir con
`NAV_ITEMS` en `lib/site.ts`** (Hero no está en la nav; es `#top`).

## SEO / metadata

| Archivo | Genera |
|---------|--------|
| `opengraph-image.tsx` | PNG 1200×630 blanco con franja y badge azul marino, nombre, rol y stack |
| `icon.svg` | favicon "MS" azul marino |
| `sitemap.ts` | `/` (el CV se sirve estático en `/CV_Matias_Speroni.pdf`) |
| `robots.ts` | bloquea `/api/` |
| `not-found.tsx` | 404 |

## next.config.ts

`poweredByHeader: false` + headers de seguridad (`X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options: DENY`, `Permissions-Policy`), verificados por E2E.

## Reglas

- `layout.tsx`, `page.tsx` y las secciones son Server Components; la página debe seguir siendo estática.
- Metadata solo en `layout.tsx`.

## Deuda técnica conocida

- Sin Content-Security-Policy.
