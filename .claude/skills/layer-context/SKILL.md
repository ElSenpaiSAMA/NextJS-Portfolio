---
name: layer-context
description: Carga el contexto de arquitectura correcto antes de tocar código. Mapea archivos/tareas a la capa de docs/ai/ que hay que leer. Usar al empezar cualquier tarea en este repo cuando no está claro qué partes del sistema se ven afectadas.
---

# layer-context

1. Si es la primera tarea de la sesión, leé `docs/ai/00-overview.md`.
2. Identificá la(s) capa(s) con esta tabla y leé **solo** esos docs:

| Si vas a tocar… | Leé |
|-----------------|-----|
| `layout.tsx`, `page.tsx`, `LoadingScreen`, metadata, fuentes | `docs/ai/01-app-shell.md` |
| colores, tipografía, easing, z-index, `globals.css`, `tokens.ts` | `docs/ai/02-design-system.md` |
| `components/Scene/**`, shaders, cámara, luces, rendimiento WebGL | `docs/ai/03-scene-3d.md` |
| secciones, nav, cursor, drawer, grain, `useMagnetic` | `docs/ai/04-ui-overlay.md` |
| `sceneStore`, navegación, ids `section-*`, eventos globales | `docs/ai/05-state-contracts.md` |
| proyectos, textos, imágenes, links | `docs/ai/06-data-content.md` |
| formularios, API routes, Server Actions, env vars, deploy | `docs/ai/07-integrations-backend.md` |
| lint, build, CI, tests | `docs/ai/08-quality-ci.md` |

3. Si la tarea cruza **3D ↔ UI**, leé siempre `05-state-contracts.md`: ahí están los acoplamientos que TypeScript no detecta.
4. Confirmá contra el código real: si el doc contradice al código, el código manda — y actualizá el doc en el mismo paso.
5. Si la tarea es grande, delegá la planificación al agente `architect`.

## Agentes disponibles (`.claude/agents/`)

| Agente | Para |
|--------|------|
| `architect` | planificar tareas multi-capa (solo lectura) |
| `frontend-developer` | UI HTML, estilos, tokens, a11y |
| `scene-3d-developer` | R3F, three.js, shaders, cámara |
| `backend-developer` | Formspree, API routes, Server Actions, env, SEO |
| `content-editor` | proyectos, textos, imágenes |
| `test-engineer` | tests y verificación |
| `code-reviewer` | revisión antes de mergear (solo lectura) |
