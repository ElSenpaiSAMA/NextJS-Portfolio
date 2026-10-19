# 01 — App shell (`app-shell`)

**Archivos:** `app/layout.tsx`, `app/page.tsx`, `app/not-found.tsx`, `app/opengraph-image.tsx`,
`app/icon.svg`, `app/sitemap.ts`, `app/robots.ts`, `next.config.ts`

## layout.tsx

- Fuentes: `Geist` (`--font-geist`) y `Geist_Mono` (`--font-geist-mono`).
- `metadata`: `metadataBase` = `siteUrl`, título "Matias Speroni — Backend & DevOps Engineer", description,
  canonical `/`, Open Graph (`type: profile`), Twitter `summary_large_image`, robots.
- `<script>` inline con `INTRO_INIT_SCRIPT` ("intro ya vista en esta sesión") → `<html suppressHydrationWarning>`. Tema oscuro único: `viewport` con `themeColor` `#07080b` y `colorScheme: dark`. `<ScrollChoreography />` y `<Cursor />` (capa 03) van antes del header.
- `<IntroScreen />` es el primer hijo de `<body>` (capa 03).
- Estructura: `SiteHeader` (sticky) → `<main id="main">` → `SiteFooter`.

## page.tsx

Compone las secciones en orden y el JSON-LD `Person` (incluye la foto). **El orden debe coincidir con
`NAV_ITEMS` en `lib/site.ts`** (Hero no está en la nav; es `#top`).

## SEO / metadata

| Archivo | Genera |
|---------|--------|
| `opengraph-image.tsx` | PNG 1200×630: banda de glifos de código (patrón determinista), ruta `~/matias/portfolio`, nombre y `<rol />` |
| `icon.svg` | favicon: `{ }` en azul sobre tinta |
| `sitemap.ts` | `/` (el CV se sirve estático en `/CV_Matias_Speroni_DO.pdf`) |
| `robots.ts` | bloquea `/api/` |
| `not-found.tsx` | 404 como error de módulo (`Cannot find module './this-page'`) + "This page does not exist." |

## next.config.ts

`poweredByHeader: false` + headers de seguridad (`X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options: DENY`, `Permissions-Policy`), verificados por E2E.

## Reglas

- `layout.tsx`, `page.tsx` y las secciones son Server Components; la página debe seguir siendo estática.
- Metadata solo en `layout.tsx`.

## Deuda técnica conocida

- Sin Content-Security-Policy.
