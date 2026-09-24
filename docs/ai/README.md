# Contexto por capas para IA

Documentación pensada para que un agente de IA tome contexto rápido y preciso
antes de tocar código. **Leé solo la capa que vas a modificar** (más el overview
si es tu primera vez en el repo).

| # | Capa | Archivos que cubre | Cuándo leerla |
|---|------|--------------------|---------------|
| 00 | [Overview y arquitectura](00-overview.md) | todo el repo | Siempre la primera vez |
| 01 | [App shell](01-app-shell.md) | `app/layout.tsx`, `app/page.tsx`, `LoadingScreen.tsx` | Metadata, fuentes, orden de montaje |
| 02 | [Design system](02-design-system.md) | `app/globals.css`, `app/lib/tokens.ts` | Colores, tipografía, easing, z-index |
| 03 | [Escena 3D](03-scene-3d.md) | `app/components/Scene/**` | Cámara, luces, shaders, post-procesado |
| 04 | [UI overlay](04-ui-overlay.md) | `app/components/*.tsx`, `sections/`, `hooks/` | Secciones HTML, nav, cursor, drawer |
| 05 | [Estado y contratos](05-state-contracts.md) | `app/store/sceneStore.ts` + contratos DOM/eventos | Navegación, comunicación 3D ↔ HTML |
| 06 | [Datos y contenido](06-data-content.md) | `app/data/`, `public/`, textos en secciones | Agregar proyectos, skills, textos |
| 07 | [Integraciones / backend](07-integrations-backend.md) | Formspree, futuras API routes | Formularios, APIs, env vars |
| 08 | [Calidad, CI y testing](08-quality-ci.md) | `eslint.config.mjs`, `.github/workflows/ci.yml` | Lint, build, tests, verificación |

## Reglas para mantener estos docs

- Si un cambio altera un **contrato** (ids DOM, eventos, rangos de scroll, tokens),
  actualizá la capa correspondiente **en el mismo commit**.
- Estos archivos describen el *por qué* y los *contratos*; no copies código entero.
- Cada doc termina con una sección **Deuda técnica conocida**: si la resolvés, borrala del doc.
