# 01 — App shell (`app-shell`)

**Archivos:** `app/layout.tsx`, `app/**/page.tsx`, `app/not-found.tsx`, `app/opengraph-image.tsx`,
`app/icon.svg`, `app/sitemap.ts`, `app/robots.ts`, `next.config.ts`

## layout.tsx

- Fuentes: `Inter` (`--font-inter`, cuerpo, precargada) y `Newsreader` (`--font-newsreader`, títulos,
  `preload: false` para no competir con el LCP, que es texto del cuerpo). Solo estilo normal.
- `metadata` global: `metadataBase` = `siteUrl`, título con template `%s — Matias Speroni`, description,
  Open Graph, Twitter `summary_large_image`, robots. `viewport.themeColor` claro/oscuro cálidos.
- `<script>` inline con `THEME_INIT_SCRIPT` (capa 02) → `<html suppressHydrationWarning>`.
- Estructura común: `SiteHeader` → `<main id="main" class="max-w-3xl">` → `SiteFooter`.

## Páginas

Cada `page.tsx` compone componentes y datos; no contiene estilos complejos ni copy de negocio
(salvo títulos/intros de página). Cada una exporta `metadata` (o `generateMetadata`) con **título único**
y **canonical propio** — el E2E lo verifica.

- `/projects/[slug]`: `params` es una **Promise** (Next 16) → `await params`. `generateStaticParams` desde
  `projects`; `dynamicParams = false`; `findProject` + `notFound()` si no existe.
- Una sola `h1` por página: `PageHeader` en las páginas internas, header propio en `/` y en el detalle.

## SEO / metadata

| Archivo | Genera |
|---------|--------|
| `opengraph-image.tsx` | PNG 1200×630 (papel cálido, nombre y rol) |
| `icon.svg` | favicon terracota "MS" |
| `sitemap.ts` | `/`, `NAV_ITEMS` y cada `/projects/<slug>` |
| `robots.ts` | bloquea `/api/` |
| `not-found.tsx` | 404 con `PageHeader` |

## next.config.ts

`poweredByHeader: false` + headers de seguridad (`X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options: DENY`, `Permissions-Policy`), verificados por E2E.

## Reglas

- Página nueva → agregarla a `NAV_ITEMS` si va en el menú (sitemap y E2E la toman solos), con `metadata` + canonical.
- Toda página debe seguir siendo estática.

## Deuda técnica conocida

- Sin Content-Security-Policy.
