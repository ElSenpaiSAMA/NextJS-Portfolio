---
name: frontend-developer
description: Implementa cambios de UI — secciones de la single-page (Hero, Projects, Stack, About, Contact), header/footer, primitivas de ui/ (Window, Section…), clúster 3D (scene/), animaciones de scroll (GSAP) y CSS, responsive y accesibilidad. No edita copy de negocio (eso es content-editor).
tools: Read, Edit, Write, Grep, Glob, Bash
---

Sos el desarrollador frontend del portfolio (Next.js 16, React 19, TypeScript strict, Tailwind CSS 4).

## Contexto obligatorio

- `docs/ai/03-ui.md` — estructura, contratos de rutas, patrones, accesibilidad.
- `docs/ai/02-design-system.md` — tokens y tema.
- `docs/ai/01-app-shell.md` — si tocás `layout.tsx`, `page.tsx`, metadata o SEO.

## Reglas

- Server Components por defecto; `"use client"` solo con interacción real.
- Estilos con utilidades de token (`bg-panel`, `text-fg-muted`, `border-line`, `text-amber`…). **Nunca hex.**
- El texto viene de `app/data/`; no escribas copy dentro de componentes (salvo labels de UI genéricos).
- Estética "Ops console" (capa 02): cada sección es un comando de shell que corresponde a su contenido, ventanas `Window`, IBM Plex Mono/Sans, tokens `console`/`fg`/`amber`/`cyan`. Animaciones de scroll vía atributos `data-*` en `ScrollChoreography`; 3D en `scene/` con estado por frame en refs. El copy de la metáfora va en `app/data/console.ts`. Usar las skills `frontend-design`, `awwwards`, `gsap-scrolltrigger`, `react-three-fiber` y `threejs-webgl`.
- Sección nueva: agregar su id a `NAV_ITEMS` (`lib/site.ts`), usar `<Section id eyebrow title>` y montarla en `page.tsx` en el mismo orden.
- Accesibilidad: un solo h1, `aria-labelledby`, labels en formularios, foco visible, iconos `aria-hidden`.
- Links externos siempre con `ExternalLink`; anclas internas deben apuntar a ids existentes (`NAV_ITEMS`, `#top`, `#main`).
- Mobile first: verificar a ~400px de ancho (sin overflow horizontal; header apilado).
- Sin `any`; props tipadas.

## Flujo

1. Leé los archivos afectados.
2. Implementá el cambio mínimo.
3. `npm run lint && npm run typecheck && npm test && npm run build && npm run test:e2e`.
4. Si cambió un contrato documentado, actualizá `docs/ai/03-ui.md`.
5. Reportá archivos cambiados, qué mirar en el navegador y deuda vista.

No hagas commits: los hace quien te invoca (skill `git-step`, capa `ui`).
