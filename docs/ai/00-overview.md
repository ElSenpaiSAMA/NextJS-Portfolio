# 00 — Overview y arquitectura

## Qué es

Portfolio de **Matias Speroni**, posicionado como **Junior Platform / DevOps Engineer** (Barcelona).
Viene de backend/fullstack y está cambiando de área. Objetivo del sitio: que un reclutador técnico
entienda en < 30 s quién es, qué sabe y qué evidencia tiene — y que **el propio sitio sea evidencia
de DevOps** (CI completo, tests, a11y, Lighthouse, logs estructurados, previews por PR).

Single-page estática, en **inglés**, modo claro/oscuro, responsive. Sin backend propio salvo
`/api/log` (ingesta de logs del navegador).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · Formspree (fetch directo,
sin SDK) · Vitest + Testing Library · Playwright + axe · Lighthouse CI · Vercel · Node 22.

Sin librerías de UI, animación ni estado global: casi no se envía JavaScript al cliente
(solo `ThemeToggle` y `ContactForm` son client components).

## Árbol de render

```
RootLayout (server)            layout.tsx — fuentes Geist, metadata, script de tema en <head>
└─ Home (server)               page.tsx
   ├─ SiteHeader               nav por anclas + ThemeToggle (client)
   ├─ <main id="main">
   │   Hero · Skills(01) · Projects(02) · Roadmap(03) · Experience(04) · About(05) · Contact(06)
   │                                                                   └─ ContactForm (client)
   ├─ SiteFooter               entorno + commit desplegado + link al CI
   └─ JSON-LD Person
```

## Flujo de datos

```
app/data/*.ts  (contenido tipado)  ──►  components/sections/*  (presentación pura)
lib/site.ts    (NAV_ITEMS, siteUrl, build info)

Errores:
  browser ─► clientLogger ─(warn/error, sendBeacon)─► POST /api/log ─► logger (JSON stdout) ─► Vercel logs
  server  ─► instrumentation.ts onRequestError ───────────────────────► logger
```

## Mapa de carpetas

```
app/
  components/{layout,sections,ui}/   capa 03
  data/                              capa 04
  lib/                               theme (02), site (03), logger/log-schema/client-logger/contact (05)
  api/log/                           capa 05
e2e/  scripts/  .github/             capa 06
instrumentation.ts, instrumentation-client.ts   capa 05
```

## Principios

1. **Contenido separado de presentación**: todo texto vive en `app/data/`. Los componentes no tienen copy de negocio.
2. **Honestidad del contenido**: niveles de skill `used | basic | learning`; lo que no se sabe va como `[COMPLETAR: …]`, nunca inventado.
3. **Server Components por defecto**; `"use client"` solo donde hay interacción.
4. **Nada falla en silencio**: todo error de cliente/servidor se loguea con un `event` estable.
5. **Todo cambio verificable**: `npm run verify` reproduce el CI localmente.
6. Código y comentarios en inglés; docs internos en español.

## Deuda técnica transversal

- Quedan placeholders `[COMPLETAR]` (ver `npm run check:placeholders`).
- Sin CSP todavía (el script inline de tema requiere nonce o hash).
