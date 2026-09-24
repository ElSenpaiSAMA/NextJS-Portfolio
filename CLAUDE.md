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

Cada tarea se ejecuta **paso a paso**, y cada paso genera su propio ciclo completo:

1. Crear una nueva rama descriptiva desde `main`:
   ```bash
   git checkout main && git pull
   git checkout -b <nombre-descriptivo>
   ```
2. Implementar **solo ese paso**.
3. Commitear y pushear esa rama:
   ```bash
   git add <archivos>
   git commit -m "descripción del paso"
   git push -u origin <nombre-descriptivo>
   ```
4. Mergear a `main`:
   ```bash
   git checkout main
   git merge <nombre-descriptivo>
   git push origin main
   ```
5. Repetir desde el paso 1 para el siguiente paso.

**Reglas:**
- Nunca commitear directamente a `main`.
- Una tarea grande = muchos commits pequeños, cada uno con su propia rama.
- No agrupar pasos en un solo commit.
- Claude no debe aparecer como colaborador en ningún commit (sin `Co-Authored-By` ni ninguna mención).

## Estándares de código

Todo el código debe seguir principios de buena arquitectura, estabilidad y escalabilidad:

- **Separación de responsabilidades:** componentes pequeños y enfocados, lógica separada de la presentación.
- **Reutilización:** extraer lógica común a hooks, utilidades o componentes compartidos.
- **Tipado estricto:** usar TypeScript correctamente, sin `any`, con tipos explícitos en interfaces y props.
- **Mantenibilidad:** nombres claros y descriptivos, estructura de carpetas coherente.
- **No over-engineering:** no abstraer antes de que sea necesario, pero sí pensar en que el código pueda crecer sin romperse.
