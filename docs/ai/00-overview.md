# 00 — Overview y arquitectura

## Qué es

Portfolio de **Matias Speroni**, **Backend & DevOps Engineer** en Barcelona. Viene de backend/fullstack
(.NET, React, TypeScript) y se orienta a DevOps (CI/CD, contenedores, automatización).

**Single-page estática** en inglés, con la estructura original del autor: Hero (quién soy) → Projects
(con imágenes) → Experience → Stack completo (con logos, sin niveles) → About (foto, bio, datos,
educación, certificaciones) → Contact. **El contenido sale del CV del autor** (`public/CV_Matias_Speroni_DO.pdf`). Estética **"Companion"**
(capa 02): negro con brillo azul y un **panel compañero fijo** a la derecha — tu avatar narra la sección que
estás leyendo (texto generado de los datos), contesta preguntas del CV y despliega el sitio con el pipeline
real. Nav numerada 01–05 que se ilumina, "hello, I'm" manuscrito con subrayado que se dibuja, tarjetas con
etiquetas detectadas, stack con física, contacto con Gmail/Outlook/copiar. Inspirado en ignaciobrenas.vercel.app.
Interacciones documentadas en la skill `companion`.

> También descartados: "Ops console" (terminal) con clúster 3D y con video, "Product page" estilo Apple,
> "Source → Build" (ASCII sobre video) y "Ship it." (tema claro con config editable).

> Direcciones descartadas por el autor: "Night Shift" con puerto 3D (Three.js) y luego con video real.
> Pidió algo más relacionado con la informática.

> Historial de decisiones: se probaron un rediseño "DevOps case studies" y uno multipágina cálido; el
> autor prefirió volver a su estructura y contenido originales con un diseño más serio. No reintroducir
> case studies, roadmap ni multipágina sin pedirlo.

El sitio además es evidencia de DevOps: CI completo, tests, accesibilidad, Lighthouse, logs estructurados.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · `next/image` · Formspree
(fetch directo) · Vitest + Testing Library · Playwright + axe · Lighthouse CI · Vercel · Node 22.
Client components: `Companion` (+ `CompanionPanel`, `Typewriter`, `DeployWidget`), `SiteHeader`, `StackPlayground`,
`CopyButton`, `ContactForm`, `ScrollChoreography` y los error boundaries. GSAP, Lenis y matter-js se cargan bajo demanda.

## Árbol de render

```
RootLayout (server)       layout.tsx — Geist + Geist Mono, metadata, script de intro, IntroScreen / ScrollChoreography / SiteHeader / <main> / SiteFooter
└─ HomePage (server)      page.tsx
   ├─ (columna izquierda) Hero, Hub, 01 Experience, 02 Projects, 03 Stack, 04 Certifications, 05 About, Contact
   ├─ (columna derecha, ≥ lg) Companion — narración por sección, Ask, Deploy; en móvil, botón + <dialog>
   └─ JSON-LD Person
```

## Flujo de datos

```
app/data/{profile,projects,experience,stack,ship}.ts ──► lib/companion.ts (narración + respuestas) ──► components/sections/* (presentación)
lib/site.ts  NAV_ITEMS (ids de sección), siteUrl, build info
public/      avatar.jpg, CV_Matias_Speroni_DO.pdf, projects/*.{png,jpg}, stack/*.svg

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
