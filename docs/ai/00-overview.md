# 00 — Overview y arquitectura

## Qué es

Portfolio de **Matias Speroni**, **Backend & DevOps Engineer** en Barcelona. Viene de backend/fullstack
(.NET, React, TypeScript) y se orienta a DevOps (CI/CD, contenedores, automatización).

**Single-page estática** en inglés, con la estructura original del autor: Hero (quién soy) → Projects
(con imágenes) → Experience → Stack completo (con logos, sin niveles) → About (foto, bio, datos,
educación, certificaciones) → Contact. **El contenido sale del CV del autor** (`public/CV_Matias_Speroni_DO.pdf`). Estética **"Product page"**
(capa 02): presentado como una página de producto de Apple — Inter enorme y apretada, secciones que alternan
negro y gris claro, **video real de un data center** controlado por el scroll en el hero (caminás por el
pasillo de racks), "Build. Ship. Run." sobre una placa de circuitos, bento "Get the highlights.", galería
horizontal de proyectos y el stack como "Tech specs". Animaciones con GSAP ScrollTrigger + Lenis.

> También descartados: "Ops console" (terminal) con un clúster 3D (Three.js) y con video; el autor pidió
> "algo tipo Apple".

> Direcciones descartadas por el autor: "Night Shift" con puerto 3D (Three.js) y luego con video real.
> Pidió algo más relacionado con la informática.

> Historial de decisiones: se probaron un rediseño "DevOps case studies" y uno multipágina cálido; el
> autor prefirió volver a su estructura y contenido originales con un diseño más serio. No reintroducir
> case studies, roadmap ni multipágina sin pedirlo.

El sitio además es evidencia de DevOps: CI completo, tests, accesibilidad, Lighthouse, logs estructurados.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · `next/image` · Formspree
(fetch directo) · Vitest + Testing Library · Playwright + axe · Lighthouse CI · Vercel · Node 22.
Client components: `ContactForm`, `ProjectsGallery`, `ScrollChoreography`, `ScrubVideo`, `AmbientVideo` y los
error boundaries. GSAP y Lenis se cargan bajo demanda.

## Árbol de render

```
RootLayout (server)       layout.tsx — Inter, metadata, script de intro, IntroScreen / ScrollChoreography / SiteHeader / <main> / SiteFooter
└─ HomePage (server)      page.tsx
   ├─ Hero                #top — video del data center (scrub), nombre, rol, CTAs, highlights del perfil
   ├─ Statement           intro que se ilumina palabra por palabra
   ├─ Highlights          #highlights — bento "Get the highlights." + tile del pipeline real
   ├─ Story               #how-i-work — Build. Ship. Run. sobre la placa de circuitos (scrub)
   ├─ Projects            #projects — galería horizontal (ProjectsGallery, client)
   ├─ Experience          #experience — una tarjeta por empresa: roles y logros
   ├─ Stack               #stack — "Tech specs.": filas por grupo con logos
   ├─ About               #about — foto, bio, facts, educación, certificaciones
   ├─ Contact             #contact — canales + ContactForm (client)
   └─ JSON-LD Person
```

## Flujo de datos

```
app/data/{profile,projects,experience,stack,highlights,media}.ts ──► components/sections/* (presentación)
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
