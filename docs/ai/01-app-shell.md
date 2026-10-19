# 01 — App shell (`app-shell`)

**Archivos:** `app/layout.tsx`, `app/page.tsx`, `app/not-found.tsx`, `app/opengraph-image.tsx`,
`app/icon.svg`, `app/sitemap.ts`, `app/robots.ts`, `next.config.ts`

## layout.tsx

- Fuentes: `Geist` (`--font-geist`) y `Geist_Mono` (`--font-geist-mono`); `data-font="mono"` pasa toda la UI a mono.
- `metadata`: `metadataBase` = `siteUrl`, título "Matias Speroni — Backend & DevOps Engineer", description,
  canonical `/`, Open Graph (`type: profile`), Twitter `summary_large_image`, robots.
- `<script>` inline con `INTRO_INIT_SCRIPT` ("intro ya vista en esta sesión") → `<html suppressHydrationWarning>`. Tema oscuro único: `viewport` con `themeColor` `#fbfbfa` y `colorScheme: dark`. `<ScrollChoreography />` (capa 03) va antes del header. `<html>` arranca con `data-theme="light" data-font="sans"` y un segundo script inline (`CONFIG_INIT_SCRIPT`, `lib/config-init.ts`) reaplica la config guardada por el visitante antes de pintar, revalidando cada valor.
- `<IntroScreen />` es el primer hijo de `<body>` (capa 03).
- Estructura: `SiteHeader` (sticky) → `<main id="main">` → `SiteFooter`.

## page.tsx

Compone las secciones en orden y el JSON-LD `Person` (incluye la foto). **El orden debe coincidir con
`NAV_ITEMS` en `lib/site.ts`** (Hero no está en la nav; es `#top`).

## SEO / metadata

| Archivo | Genera |
|---------|--------|
| `opengraph-image.tsx` | PNG 1200×630 (tema claro): nombre y rol junto a un deploy terminado con las etapas reales (`PIPELINE`) |
| `icon.svg` | favicon: triángulo de deploy sobre negro con punto verde de "Ready" |
| `sitemap.ts` | `/` (el CV se sirve estático en `/CV_Matias_Speroni_DO.pdf`) |
| `robots.ts` | bloquea `/api/` |
| `not-found.tsx` | 404 como estado de deployment (`404 · NOT_FOUND`) + "This page does not exist." |

## next.config.ts

`poweredByHeader: false` + headers de seguridad (`X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options: DENY`, `Permissions-Policy`), verificados por E2E.

## Reglas

- `layout.tsx`, `page.tsx` y las secciones son Server Components; la página debe seguir siendo estática.
- Metadata solo en `layout.tsx`.

## Deuda técnica conocida

- Sin Content-Security-Policy.
