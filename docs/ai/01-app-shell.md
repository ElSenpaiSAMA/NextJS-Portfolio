# 01 — App shell (`app-shell`)

**Archivos:** `app/layout.tsx`, `app/page.tsx`, `app/not-found.tsx`, `app/opengraph-image.tsx`,
`app/icon.svg`, `app/sitemap.ts`, `app/robots.ts`, `next.config.ts`

## layout.tsx

- Fuentes: `Big_Shoulders` (display, eje `opsz`, `--font-shoulders`) e `Instrument_Sans` (texto, `--font-instrument`).
- `metadata`: `metadataBase` = `siteUrl`, título "Matias Speroni — Backend & DevOps Engineer", description,
  canonical `/`, Open Graph (`type: profile`), Twitter `summary_large_image`, robots.
- `viewport.themeColor`: `#ffffff` / `#0b1120`.
- `<script>` inline con `INTRO_INIT_SCRIPT` ("intro ya vista en esta sesión") → `<html suppressHydrationWarning>`. Tema oscuro único: `viewport` con `themeColor` `#160b2e` y `colorScheme: dark`.
- `<IntroScreen />` es el primer hijo de `<body>` (capa 03).
- Estructura: `SiteHeader` (sticky) → `<main id="main">` → `SiteFooter`.

## page.tsx

Compone las secciones en orden y el JSON-LD `Person` (incluye la foto). **El orden debe coincidir con
`NAV_ITEMS` en `lib/site.ts`** (Hero no está en la nav; es `#top`).

## SEO / metadata

| Archivo | Genera |
|---------|--------|
| `opengraph-image.tsx` | PNG 1200×630 con el degradado atardecer, nombre gigante, rol y stack |
| `icon.svg` | favicon "MS" con el degradado atardecer sobre índigo |
| `sitemap.ts` | `/` (el CV se sirve estático en `/CV_Matias_Speroni_DO.pdf`) |
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
