# 00 — Overview y arquitectura

## Qué es

Portfolio de **Matias Speroni**, posicionado como **Junior Platform / DevOps Engineer** (Barcelona).
Viene de backend/fullstack y está cambiando de área. Objetivo: que un reclutador técnico entienda
en < 30 s quién es, qué sabe y qué evidencia tiene — y que **el propio sitio sea evidencia de DevOps**
(CI completo, tests, a11y, Lighthouse, logs estructurados, previews por PR).

Sitio **multipágina estático**, en **inglés**. Estética: limpia, formal, tranquila y minimalista,
colores cálidos (papel + tinta + acento terracota), títulos serif, modo claro/oscuro, responsive.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · Formspree (fetch directo)
· Vitest + Testing Library · Playwright + axe · Lighthouse CI · Vercel · Node 22.
Sin librerías de UI, animación ni estado global. Client components: `ThemeToggle`, `NavLinks`, `ContactForm`.

## Rutas (todas estáticas)

| Ruta | Archivo | Contenido |
|------|---------|-----------|
| `/` | `app/page.tsx` | presentación, trabajo destacado (featured), próximo ítem del roadmap, estado + email |
| `/projects` | `app/projects/page.tsx` | case studies, proyectos anteriores, roadmap (`#roadmap`) |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | un case study; `generateStaticParams` + `dynamicParams = false` (slug desconocido → 404) |
| `/skills` | `app/skills/page.tsx` | leyenda de niveles + categorías |
| `/about` | `app/about/page.tsx` | bio, experiencia, formación, datos, CV |
| `/contact` | `app/contact/page.tsx` | email/LinkedIn/GitHub + formulario |
| `/api/log` | `app/api/log/route.ts` | ingesta de logs del navegador (única ruta dinámica) |

`app/layout.tsx` envuelve todo con `SiteHeader`, `<main id="main">` (max-w-3xl) y `SiteFooter`.

## Flujo de datos

```
app/data/*.ts (contenido tipado) ──► pages (composición) ──► components/* (presentación)
lib/site.ts   NAV_ITEMS (rutas), projectHref, isActivePath, siteUrl, build info
              ↳ también lo leen sitemap.ts y e2e/routes.ts → una sola fuente de rutas

Errores:
  browser ─► clientLogger ─(warn/error, sendBeacon)─► POST /api/log ─► logger (JSON stdout) ─► Vercel logs
  server  ─► instrumentation.ts onRequestError ───────────────────────► logger
```

## Principios

1. **Contenido separado de presentación**: todo texto de negocio vive en `app/data/`.
2. **Honestidad**: niveles de skill `used | basic | learning`; datos desconocidos como `[COMPLETAR: …]`.
3. **Server Components por defecto**; `"use client"` solo con interacción real.
4. **Todas las páginas estáticas** (`○`/`●` en `next build`).
5. **Nada falla en silencio**: todo error se loguea con un `event` estable.
6. **Todo verificable**: `npm run verify` reproduce el CI.
7. Código y comentarios en inglés; docs internos en español.

## Deuda técnica transversal

- Quedan placeholders `[COMPLETAR]` (`npm run check:placeholders`).
- Sin CSP todavía (el script inline de tema requiere nonce o hash).
