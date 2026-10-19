---
name: terminal-session
description: Agrega, ajusta o depura el concepto "la página es una sesión de terminal" del portfolio — comandos por sección (STAGES), el prompt que se tipea, la barra tmux (navegación + estado de make deploy), la shell interactiva (lib/shell.ts), el boot y el stack con física. Usar para sumar un comando a la shell, mover una sección o arreglar el seguimiento del scroll, manteniendo datos reales, accesibilidad y tests.
---

# terminal-session

## Contexto (leer primero)

Portfolio de Matias Speroni (Backend & DevOps). Next.js 16, React 19, Tailwind 4, GSAP (revelados),
matter-js (física).

Concepto **elegido por el autor** ("terminal, Linux"): la página es una **sesión de terminal** en `matias@speroni`.
- Boot estilo systemd.
- Cada sección es la salida de un comando que se tipea cuando llegás.
- Cada comando es también una etapa de `make deploy` (checkout → deploy).
- Una barra tmux abajo es la navegación y muestra el estado del pipeline.
- Hay una shell real donde se puede escribir.

Viene de "Pipeline" (línea + nodos), que el autor aprobó pero quería "más terminal".
**No reintroducir** piezas de ignaciobrenas.vercel.app (panel narrador, pastillas 01–05, letra manuscrita, hub).

Docs de capa:
- `docs/ai/02-design-system.md`;
- `docs/ai/03-ui.md`;
- `docs/ai/04-content.md` (`app/data/pipeline.ts` y `app/data/shell.ts`).

## Mapa

| Pieza | Lógica pura (testeada) | UI |
|-------|-----------------------|----|
| Comandos / etapas | `data/pipeline.ts` `STAGES` (`id`, `command`, `window`, `step`, `title`, `meaning`) | `terminal/Command` (sección + `Prompt` + `TypedCommand` + `# Título`) |
| Estado por scroll | `lib/pipeline-state.ts` (`stageStates`, `summarize`) | `lib/pipeline-progress.ts` `usePipeline` (un listener pasivo + rAF) |
| Tipeo | — | `TypedCommand`: `data-run` wait → go (CSS `.typed`); caret mientras espera |
| Navegación | `summarize` | `terminal/StatusBar`: ventanas `N:nombre`, `aria-current`, "make deploy · running 3/6 · build" |
| Shell | `lib/shell.ts` `runCommand`, `complete`, `since`, `shortHash`; copy en `data/shell.ts` | `terminal/Shell` (scrollback, Tab, historial, Ctrl+L, `/`) |
| make deploy | `lib/stage-logs.ts` (resumen real por etapa) | `terminal/DeployRun` |
| Boot | `data/shell.ts` `BOOT_LINES` | `layout/IntroScreen` + `.intro*` |

## Reglas

1. **Datos reales:** lo que imprime la shell, neofetch y `make deploy` sale de `app/data`. Los hashes de commit son decorativos (`aria-hidden`). Nada de métricas inventadas.
2. **Copy en `data/`:** ayuda de la shell, boot, logo y hint en `data/shell.ts`.
3. **Accesibilidad**
   - Prompts y adornos van `aria-hidden`.
   - La salida de la shell es `role="log"`.
   - El input tiene label.
   - El h1 es el nombre.
4. **Reduced motion y sin JS:** los comandos se ven completos y no hay boot. La shell funciona igual.
5. **Móvil:** sin overflow horizontal (comandos largos con `<wbr>`, la barra tmux se desplaza sola a la ventana activa).
6. **Tests**
   - `lib/shell.test.ts` (comandos, acciones, completado);
   - `page.test.tsx` (comando por sección, la shell responde);
   - E2E: tipeo y barra al bajar, "passed 6/6", la shell (help, Tab, historial, `cd`).

## Agregar un comando a la shell

1. Su caso en `runCommand` (salida desde el contenido) y, si va en `help`, su entrada en `SHELL_COMMANDS`.
2. Test en `lib/shell.test.ts` (el test de `help` exige que cada comando listado exista).

## Agregar o mover una sección

1. Entrada en `STAGES` (orden = página) e id en `NAV_ITEMS`.
2. Su resumen en `stageLogs`, su salida en `sections/` y su lugar en `page.tsx`.
3. Ajustar los conteos del E2E ("running 3/6", "passed 6/6").
