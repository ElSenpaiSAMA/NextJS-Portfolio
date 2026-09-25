# 00 — Overview y arquitectura

## Qué es

Portfolio de **Matias Speroni**, **Backend & DevOps Engineer** en Barcelona. Viene de backend/fullstack
(.NET, React, TypeScript) y se orienta a DevOps (CI/CD, contenedores, automatización).

**Single-page estática** en inglés, con la estructura original del autor: Hero (quién soy) → Projects
(con imágenes) → Stack completo (con logos) → About (foto, bio, datos) → Contact. Estética **neutra
corporativa**: blanco y grises slate, acento azul marino, una sola fuente (Inter), modo claro/oscuro.

> Historial de decisiones: se probaron un rediseño "DevOps case studies" y uno multipágina cálido; el
> autor prefirió volver a su estructura y contenido originales con un diseño más serio. No reintroducir
> case studies, roadmap ni multipágina sin pedirlo.

El sitio además es evidencia de DevOps: CI completo, tests, accesibilidad, Lighthouse, logs estructurados.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · `next/image` · Formspree
(fetch directo) · Vitest + Testing Library · Playwright + axe · Lighthouse CI · Vercel · Node 22.
Client components: `ThemeToggle` y `ContactForm`.

## Árbol de render

```
RootLayout (server)       layout.tsx — Inter, metadata, script de tema, SiteHeader / <main> / SiteFooter
└─ HomePage (server)      page.tsx
   ├─ Hero                #top — disponibilidad, nombre, rol, intro, highlights, CTAs
   ├─ Projects            #projects — grilla de ProjectCard (imagen, descripción, tech, links)
   ├─ Stack               #stack — grupos con logos
   ├─ About               #about — foto, bio, facts
   ├─ Contact             #contact — canales directos + ContactForm (client)
   └─ JSON-LD Person
```

## Flujo de datos

```
app/data/{profile,projects,stack}.ts ──► components/sections/* (presentación)
lib/site.ts  NAV_ITEMS (ids de sección), siteUrl, build info
public/      avatar.jpg, projects/*.{png,jpg}, stack/*.svg

Errores:
  browser ─► clientLogger ─(warn/error, sendBeacon)─► POST /api/log ─► logger (JSON) ─► Vercel logs
  server  ─► instrumentation.ts onRequestError ───────────────────────► logger
```

## Principios

1. Contenido separado de presentación: todo texto vive en `app/data/`.
2. No inventar datos (fechas, métricas, empleadores, herramientas).
3. Server Components por defecto; página estática.
4. Nada falla en silencio: todo error se loguea con un `event` estable.
5. Todo verificable: `npm run verify` reproduce el CI.
6. Código y comentarios en inglés; docs internos en español.

## Deuda técnica transversal

- Sin CSP todavía (el script inline de tema requiere nonce o hash).
