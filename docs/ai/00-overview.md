# 00 — Overview y arquitectura

## Qué es

Portfolio de **Matias Speroni**, **Backend & DevOps Engineer** en Barcelona. Viene de backend/fullstack
(.NET, React, TypeScript) y se orienta a DevOps (CI/CD, contenedores, automatización).

**Single-page estática** en inglés, con la estructura original del autor: Hero (quién soy) → Projects
(con imágenes) → Experience → Stack completo (con logos, sin niveles) → About (foto, bio, datos,
educación, certificaciones) → Contact. **El contenido sale del CV del autor** (`public/CV_Matias_Speroni_DO.pdf`). Estética **"Source → Build"**
(capa 02): el portfolio como código que se compila — el video del data center **renderizado en ASCII en
tiempo real** (al bajar, el ASCII compila al video real), títulos que se decodifican, el perfil como
`engineer.ts` generado de los datos que se tipea con el scroll, build con las etapas reales del CI, git log que
se dibuja, retrato ASCII, cursor caret. Geist + Geist Mono, tinta y azul eléctrico. GSAP + ScrollTrigger + Lenis.
Efectos documentados en la skill `code-effects`.

> También descartados: "Ops console" (terminal) con clúster 3D y con video, y "Product page" estilo Apple.

> Direcciones descartadas por el autor: "Night Shift" con puerto 3D (Three.js) y luego con video real.
> Pidió algo más relacionado con la informática.

> Historial de decisiones: se probaron un rediseño "DevOps case studies" y uno multipágina cálido; el
> autor prefirió volver a su estructura y contenido originales con un diseño más serio. No reintroducir
> case studies, roadmap ni multipágina sin pedirlo.

El sitio además es evidencia de DevOps: CI completo, tests, accesibilidad, Lighthouse, logs estructurados.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · `next/image` · Formspree
(fetch directo) · Vitest + Testing Library · Playwright + axe · Lighthouse CI · Vercel · Node 22.
Client components: `ContactForm`, `ScrollChoreography`, `Cursor`, `AsciiFootage`/`AsciiCanvas`, `AsciiPortrait` y los
error boundaries. GSAP y Lenis se cargan bajo demanda.

## Árbol de render

```
RootLayout (server)       layout.tsx — Geist + Geist Mono, metadata, script de intro, IntroScreen / ScrollChoreography / Cursor / SiteHeader / <main> / SiteFooter
└─ HomePage (server)      page.tsx
   ├─ Hero                #top — data center en ASCII (scrub → video real), nombre decodificado, rol, CTAs
   ├─ Source              #source — intro + engineer.ts generado (se tipea con el scroll) + build con el CI real
   ├─ Projects            #projects — carril horizontal, glitch y títulos que se decodifican
   ├─ Experience          #experience — git log que se dibuja: empresas, roles y logros
   ├─ Stack               #stack — cintas + lista por grupo con logos
   ├─ About               #about — retrato ASCII → foto, bio, facts, educación, certificaciones
   ├─ Contact             #contact — circuito en ASCII, canales + ContactForm (client)
   └─ JSON-LD Person
```

## Flujo de datos

```
app/data/{profile,projects,experience,stack,source,media}.ts ──► components/sections/* (presentación)
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
