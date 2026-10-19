# 00 — Overview y arquitectura

## Qué es

Portfolio de **Matias Speroni**, **Backend & DevOps Engineer** en Barcelona. Viene de backend/fullstack
(.NET, React, TypeScript) y se orienta a DevOps (CI/CD, contenedores, automatización).

**Single-page estática** en inglés, con la estructura original del autor: Hero (quién soy) → Projects
(con imágenes) → Experience → Stack completo (con logos, sin niveles) → About (foto, bio, datos,
educación, certificaciones) → Contact. **El contenido sale del CV del autor** (`public/CV_Matias_Speroni_DO.pdf`). Estética **"Ship it."**
(capa 02): el visitante **opera** el sitio como un DevOps — botón **Deploy** que corre el pipeline real del
sitio con logs calculados de los datos, editor en vivo de `portfolio.config.ts` que cambia acento, tema,
radio y fuente de toda la página, y el stack como bloques con física (matter-js). Tema claro de herramienta
de desarrollo (oscuro a una línea de config), Geist + Geist Mono. Interacciones documentadas en la skill
`ship-interactions`.

> También descartados: "Ops console" (terminal) con clúster 3D y con video, "Product page" estilo Apple y
> "Source → Build" (ASCII sobre video). El autor pidió "sorprendeme", sin video.

> Direcciones descartadas por el autor: "Night Shift" con puerto 3D (Three.js) y luego con video real.
> Pidió algo más relacionado con la informática.

> Historial de decisiones: se probaron un rediseño "DevOps case studies" y uno multipágina cálido; el
> autor prefirió volver a su estructura y contenido originales con un diseño más serio. No reintroducir
> case studies, roadmap ni multipágina sin pedirlo.

El sitio además es evidencia de DevOps: CI completo, tests, accesibilidad, Lighthouse, logs estructurados.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · `next/image` · Formspree
(fetch directo) · Vitest + Testing Library · Playwright + axe · Lighthouse CI · Vercel · Node 22.
Client components: `ContactForm`, `ScrollChoreography`, `DeployWidget`, `ConfigEditor`, `StackPlayground` y los error
boundaries. GSAP, Lenis y matter-js se cargan bajo demanda.

## Árbol de render

```
RootLayout (server)       layout.tsx — Geist + Geist Mono, metadata, script de intro, IntroScreen / ScrollChoreography / SiteHeader / <main> / SiteFooter
└─ HomePage (server)      page.tsx
   ├─ Hero                #top — nombre, rol, intro, CTAs + DeployWidget (pipeline real, tiempo medido)
   ├─ Config              #config — "Make it yours.": ConfigEditor (portfolio.config.ts en vivo)
   ├─ Projects            #projects — dashboard de deployments (Ready / Building)
   ├─ Experience          #experience — CHANGELOG: una release por empresa
   ├─ Stack               #stack — StackPlayground (física) + lista agrupada con logos
   ├─ About               #about — README: foto, bio, facts, educación, certificaciones
   ├─ Contact             #contact — canales + "New issue" (ContactForm, client)
   └─ JSON-LD Person
```

## Flujo de datos

```
app/data/{profile,projects,experience,stack,ship}.ts ──► components/sections/* (presentación)
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
