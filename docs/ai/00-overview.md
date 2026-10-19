# 00 — Overview y arquitectura

## Qué es

Portfolio de **Matias Speroni**, **Backend & DevOps Engineer** en Barcelona. Viene de backend/fullstack
(.NET, React, TypeScript) y se orienta a DevOps (CI/CD, contenedores, automatización).

**Single-page estática** en inglés, con la estructura original del autor: Hero (quién soy) → Projects
(con imágenes) → Experience → Stack completo (con logos, sin niveles) → About (foto, bio, datos,
educación, certificaciones) → Contact. **El contenido sale del CV del autor** (`public/CV_Matias_Speroni_DO.pdf`). Estética **"Shell"**
(capa 02): la página es una sesión de terminal — boot estilo systemd, cada sección es la salida de un comando
que se tipea al llegar (`neofetch`, `cat stack.yaml`, `ls -l ~/projects`, `git log`, `cat about.md`, `make deploy`,
cada uno una etapa del pipeline), una barra tmux abajo es la navegación con el estado de `make deploy`, y hay una
shell real para escribir. Negro, una sola fuente mono, paleta ANSI. Detalle en la skill `terminal-session`.

> También descartados: "Ops console", "Product page" (Apple), "Source → Build" (ASCII sobre video), "Ship it."
> (tema claro) y "Companion" (calcaba ignaciobrenas.vercel.app: no reintroducir su panel narrador, pastillas
> 01–05, letra manuscrita ni hub).

> Direcciones descartadas por el autor: "Night Shift" con puerto 3D (Three.js) y luego con video real.
> Pidió algo más relacionado con la informática.

> Historial de decisiones: se probaron un rediseño "DevOps case studies" y uno multipágina cálido; el
> autor prefirió volver a su estructura y contenido originales con un diseño más serio. No reintroducir
> case studies, roadmap ni multipágina sin pedirlo.

El sitio además es evidencia de DevOps: CI completo, tests, accesibilidad, Lighthouse, logs estructurados.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · `next/image` · Formspree
(fetch directo) · Vitest + Testing Library · Playwright + axe · Lighthouse CI · Vercel · Node 22.
Client components: `TypedCommand`, `StatusBar`, `Shell`, `DeployRun`, `StackPlayground`, `CopyButton`, `ContactForm`,
`ScrollChoreography` y los error boundaries. GSAP, Lenis y matter-js se cargan bajo demanda.

## Árbol de render

```
RootLayout (server)       layout.tsx — Geist Mono, metadata, script de intro, IntroScreen / ScrollChoreography / SiteHeader / <main> / SiteFooter / StatusBar
└─ HomePage (server)      page.tsx
   ├─ Command neofetch         #top — Whoami (h1 = nombre, la shell)
   ├─ Command cat stack.yaml   #stack — Stack (chips + física)
   ├─ Command ls -l ~/projects #projects — Projects (README por proyecto)
   ├─ Command git log          #experience — Experience (commits + certificaciones)
   ├─ Command cat about.md     #about — About
   ├─ Command make deploy      #contact — Contact (DeployRun + canales + formulario)
   └─ JSON-LD Person
```

## Flujo de datos

```
app/data/{profile,projects,experience,stack,pipeline}.ts ──► lib/{shell,stage-logs}.ts (shell, make deploy) ──► components/sections/* (presentación)
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
