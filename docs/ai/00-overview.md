# 00 — Overview y arquitectura

## Qué es

Portfolio de **Matias Speroni**, **Backend & DevOps Engineer** en Barcelona. Viene de backend/fullstack
(.NET, React, TypeScript) y se orienta a DevOps (CI/CD, contenedores, automatización).

**Single-page estática** en inglés, con la estructura original del autor: Hero (quién soy) → Projects
(con imágenes) → Experience → Stack completo (con logos, sin niveles) → About (foto, bio, datos,
educación, certificaciones) → Contact. **El contenido sale del CV del autor** (`public/CV_Matias_Speroni_DO.pdf`). Estética **"Ops console"**
(capa 02): el sitio como una sesión de terminal y su propio pipeline de CI — cada sección se abre con el
comando que la muestra, IBM Plex Mono/Sans, base azul pizarra con ámbar y cian, tema oscuro único.
Animación 100% CSS (sin GSAP, Lenis, 3D ni video).

> Direcciones descartadas por el autor: "Night Shift" con puerto 3D (Three.js) y luego con video real.
> Pidió algo más relacionado con la informática.

> Historial de decisiones: se probaron un rediseño "DevOps case studies" y uno multipágina cálido; el
> autor prefirió volver a su estructura y contenido originales con un diseño más serio. No reintroducir
> case studies, roadmap ni multipágina sin pedirlo.

El sitio además es evidencia de DevOps: CI completo, tests, accesibilidad, Lighthouse, logs estructurados.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · `next/image` · Formspree
(fetch directo) · Vitest + Testing Library · Playwright + axe · Lighthouse CI · Vercel · Node 22.
Único client component: `ContactForm` (y los error boundaries). El resto es server/estático.

## Árbol de render

```
RootLayout (server)       layout.tsx — IBM Plex Mono + Sans, metadata, script de intro, IntroScreen / SiteHeader / <main> / SiteFooter
└─ HomePage (server)      page.tsx
   ├─ Hero                #top — disponibilidad, nombre, rol, intro, highlights, CTAs + terminal con el pipeline (CSS)
   ├─ Projects            #projects — ventanas ProjectCard (path, imagen, descripción, tech, links)
   ├─ Experience          #experience — grafo tipo `git log`: empresas, roles y logros
   ├─ Stack               #stack — `stack.yml` con números de línea y logos
   ├─ About               #about — ventana `README.md`: foto, bio, facts, educación, certificaciones
   ├─ Contact             #contact — canales directos + ContactForm (client)
   └─ JSON-LD Person
```

## Flujo de datos

```
app/data/{profile,projects,experience,stack,console}.ts ──► components/sections/* (presentación)
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
