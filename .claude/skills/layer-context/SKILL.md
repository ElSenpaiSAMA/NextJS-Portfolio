---
name: layer-context
description: Carga el contexto de arquitectura correcto antes de tocar código. Mapea archivos/tareas a la capa de docs/ai/ que hay que leer y al agente adecuado. Usar al empezar cualquier tarea en este repo.
---

# layer-context

1. Primera tarea de la sesión → leé `docs/ai/00-overview.md`.
2. Leé **solo** la capa afectada:

| Si vas a tocar… | Leé | Scope de commit |
|-----------------|-----|-----------------|
| `layout.tsx`, `page.tsx`, metadata, OG, sitemap, robots, icon, 404, `next.config.ts` | `docs/ai/01-app-shell.md` | `app-shell` |
| colores, tema claro/oscuro, tipografía, `globals.css`, `lib/theme.ts` | `docs/ai/02-design-system.md` | `design-system` |
| componentes, secciones, nav, diagrama, `lib/site.ts` | `docs/ai/03-ui.md` | `ui` |
| textos, proyectos, skills, roadmap, experiencia, CV, `public/` | `docs/ai/04-content.md` | `content` |
| logs, errores, `/api`, instrumentation, formulario de contacto | `docs/ai/05-backend-observability.md` | `backend` |
| tests, E2E, CI, Lighthouse, Dependabot, scripts, dependencias | `docs/ai/06-quality-ci.md` | `quality` |
| `docs/ai/`, `.claude/`, `CLAUDE.md`, `README.md` | `docs/ai/README.md` | `ai-docs` |

3. Si el doc contradice al código, el código manda: actualizá el doc en el commit de esa capa.
4. Tarea grande → agente `architect` primero.

## Agentes (`.claude/agents/`)

| Agente | Para |
|--------|------|
| `architect` | planificar (solo lectura) |
| `frontend-developer` | UI, estilos, a11y, responsive |
| `backend-developer` | API, logging, errores, contacto |
| `devops-engineer` | GitHub Actions, Lighthouse, Dependabot, Vercel, headers |
| `content-editor` | contenido y placeholders |
| `test-engineer` | tests unit/E2E |
| `code-reviewer` | revisión antes de commitear (solo lectura) |
