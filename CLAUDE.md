# Portfolio NextJS — Instrucciones para Claude Code

## Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript strict, Node 22
- **Estilos:** Tailwind CSS v4 (tokens CSS, tema claro/oscuro)
- **Formularios:** Formspree (fetch directo)
- **Tests:** Vitest + Testing Library, Playwright + axe, Lighthouse CI
- **Deploy:** Vercel (preview por PR)

## Qué es

Portfolio multipágina estático de Matias Speroni, posicionado como **Junior Platform / DevOps
Engineer**. Contenido en inglés. El propio sitio es evidencia de DevOps: CI completo, tests,
accesibilidad, Lighthouse y logs estructurados (`/api/log`).

## Estructura del proyecto

```
app/
  components/{layout,sections,ui}/   # UI
  data/           # TODO el contenido (tipado) — no poner copy en componentes
  lib/            # logger, client-logger, log-schema, contact, theme, site
  api/log/        # ingesta de logs del navegador
  layout.tsx, page.tsx, error.tsx, global-error.tsx, not-found.tsx
  opengraph-image.tsx, sitemap.ts, robots.ts, icon.svg
e2e/              # Playwright (fixture que falla ante cualquier error)
scripts/          # tooling del repo
instrumentation.ts, instrumentation-client.ts
docs/ai/          # Contexto por capas para IA
.claude/          # Agentes y skills de Claude Code
```

## Reglas de contenido

- No inventar métricas, fechas, empleadores, certificaciones ni uso de herramientas.
- Herramientas que faltan para el rol → nivel `learning`, ligadas al roadmap.
- Dato desconocido → `[COMPLETAR: …]` (listados por `npm run check:placeholders`).

## Contexto para IA (leer antes de tocar código)

La documentación de arquitectura está dividida por capas en [docs/ai/](docs/ai/README.md).
Leé `docs/ai/00-overview.md` la primera vez y después **solo la capa que vas a modificar**:

| Capa (scope) | Doc |
|--------------|-----|
| App shell, SEO, headers (`app-shell`) | `docs/ai/01-app-shell.md` |
| Design system, tema (`design-system`) | `docs/ai/02-design-system.md` |
| UI (`ui`) | `docs/ai/03-ui.md` |
| Contenido (`content`) | `docs/ai/04-content.md` |
| Backend y observabilidad (`backend`) | `docs/ai/05-backend-observability.md` |
| Calidad y CI (`quality`) | `docs/ai/06-quality-ci.md` |

Si un cambio altera algo documentado (contratos, tokens, eventos de log), actualizá el doc de esa capa en el commit de esa capa.

**Agentes** (`.claude/agents/`): `architect`, `frontend-developer`, `backend-developer`,
`devops-engineer`, `content-editor`, `test-engineer`, `code-reviewer`.

**Skills** (`.claude/skills/`): `git-step`, `verify`, `layer-context`, `add-project`, `design-token`.

## Comandos

```bash
npm run dev                 # Servidor de desarrollo
npm run lint                # ESLint
npm run typecheck           # tsc --noEmit
npm test                    # Vitest (unit + componentes)
npm run build               # Build de producción
npm run test:e2e            # Playwright contra el build
npm run check:placeholders  # Lista [COMPLETAR] pendientes
npm run verify              # Todo lo anterior en orden de CI
```

## Flujo de trabajo con Git

### Ramas / entornos

| Rama | Rol | Quién la toca |
|------|-----|---------------|
| `feat` | Rama de trabajo. **Todos los commits de Claude van acá.** | Claude |
| `dev` | Entorno de desarrollo/staging | Solo el usuario |
| `main` | Producción | Solo el usuario |

Claude **nunca** commitea, mergea ni pushea a `main` ni a `dev`, ni crea otras ramas.

### Commits por capa

Se commitea **una vez por capa** (ver tabla de capas en "Contexto para IA"), cuando
los cambios de esa capa están terminados — no un commit por cada micro-paso.

1. Trabajar en `feat`:
   ```bash
   git checkout feat
   ```
2. Implementar los cambios de la tarea.
3. Al terminar los cambios de una capa, verificar (`npm run verify`) y
   commitear **solo los archivos de esa capa** (mapa archivo → capa en la skill `git-step`):
   ```bash
   git add <archivos de la capa>
   git commit -m "<tipo>(<capa>): descripción"
   ```
   Capas para el scope: `app-shell`, `design-system`, `ui`, `content`, `backend`, `quality`,
   y `ai-docs` para `docs/ai/`, `.claude/`, `CLAUDE.md` y `README.md`.
   Los tests van en `quality`.
4. Si una tarea toca varias capas → un commit por cada capa tocada.
5. Push: `git push origin feat`.

**Reglas:**
- Nunca commitear directamente a `main` ni a `dev`.
- No mezclar archivos de distintas capas en un mismo commit.
- Actualizar el doc de `docs/ai/` de una capa va en el commit de **esa** capa.
- Claude no debe aparecer como colaborador en ningún commit (sin `Co-Authored-By` ni ninguna mención).

## Estándares de código

Todo el código debe seguir principios de buena arquitectura, estabilidad y escalabilidad:

- **Separación de responsabilidades:** componentes pequeños y enfocados, lógica separada de la presentación.
- **Reutilización:** extraer lógica común a hooks, utilidades o componentes compartidos.
- **Tipado estricto:** usar TypeScript correctamente, sin `any`, con tipos explícitos en interfaces y props.
- **Mantenibilidad:** nombres claros y descriptivos, estructura de carpetas coherente.
- **No over-engineering:** no abstraer antes de que sea necesario, pero sí pensar en que el código pueda crecer sin romperse.
