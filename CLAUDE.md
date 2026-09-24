# Portfolio NextJS — Instrucciones para Claude Code

## Stack

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **React:** v19
- **3D:** three.js + React Three Fiber + drei + postprocessing
- **Animación / estado:** motion, zustand
- **Formularios:** Formspree

## Qué es

Portfolio single-page: el scroll mueve una cámara por un corredor 3D y `CameraRig`
controla la opacidad de tres secciones HTML superpuestas (Hero → Projects → About).
Sin backend propio.

## Estructura del proyecto

```
app/
  components/     # UI overlay (SiteChrome, ContentOverlay, Cursor, ContactDrawer3D…)
    Scene/        # Escena 3D (Canvas, CameraRig, shaders)
    sections/     # Contenido de cada sección
  hooks/          # Hooks de UI (useMagnetic)
  lib/            # tokens.ts (design tokens para JS/three.js)
  data/           # Datos estáticos (proyectos)
  store/          # Estado global (sceneStore)
  layout.tsx      # Layout raíz
  page.tsx        # Página principal (single-page con escena 3D)
public/           # Assets estáticos (imágenes, íconos)
docs/ai/          # Contexto por capas para IA
.claude/          # Agentes y skills de Claude Code
```

## Contexto para IA (leer antes de tocar código)

La documentación de arquitectura está dividida por capas en [docs/ai/](docs/ai/README.md).
Leé `docs/ai/00-overview.md` la primera vez y después **solo la capa que vas a modificar**:

| Capa | Doc |
|------|-----|
| App shell (layout, page, loading) | `docs/ai/01-app-shell.md` |
| Design system (tokens, tipografía, z-index) | `docs/ai/02-design-system.md` |
| Escena 3D | `docs/ai/03-scene-3d.md` |
| UI overlay | `docs/ai/04-ui-overlay.md` |
| Estado y contratos 3D ↔ UI | `docs/ai/05-state-contracts.md` |
| Datos y contenido | `docs/ai/06-data-content.md` |
| Integraciones / backend | `docs/ai/07-integrations-backend.md` |
| Calidad, CI, testing | `docs/ai/08-quality-ci.md` |

Si un cambio altera algo documentado (contratos, rangos, tokens), actualizá el doc de esa capa en el mismo commit.

**Agentes** (`.claude/agents/`): `architect`, `frontend-developer`, `scene-3d-developer`,
`backend-developer`, `content-editor`, `test-engineer`, `code-reviewer`.

**Skills** (`.claude/skills/`): `git-step`, `verify`, `layer-context`, `add-project`,
`design-token`, `new-section`, `shader-material`.

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run lint     # Linter
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
3. Al terminar los cambios de una capa, verificar (`npm run lint && npm run build`) y
   commitear **solo los archivos de esa capa**:
   ```bash
   git add <archivos de la capa>
   git commit -m "<tipo>(<capa>): descripción"
   ```
   Capas para el scope: `app-shell`, `design-system`, `scene-3d`, `ui`, `state`, `content`,
   `backend`, `quality`, y `ai-docs` para `docs/ai/`, `.claude/` y `CLAUDE.md`.
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
