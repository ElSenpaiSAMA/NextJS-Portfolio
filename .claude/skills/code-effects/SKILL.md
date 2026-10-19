---
name: code-effects
description: Agrega, ajusta o depura los efectos visuales del portfolio "Source → Build" — video en ASCII (AsciiCanvas/AsciiFootage), texto que se decodifica (data-scramble), código que se tipea con el scroll, cursor caret, botones magnéticos, glitch RGB y scrub de video. Usar cuando se pida un efecto nuevo, cambiar uno existente o arreglar uno roto, manteniendo rendimiento, accesibilidad y reduced motion.
---

# code-effects

## Contexto (leer primero)

Portfolio de Matias Speroni (Next.js 16, React 19, Tailwind 4, GSAP + ScrollTrigger + Lenis). Dirección
de arte **"Source → Build"**: la página es código que se compila delante del visitante. El autor pidió un
sitio "enfocado a programación" con efectos y animaciones, video real de informática con scroll, pantalla
de bienvenida y todo el contenido de su CV. Docs de capa: `docs/ai/02-design-system.md` (tokens, CSS) y
`docs/ai/03-ui.md` (componentes, coreografía).

**Principio:** cada efecto tiene que significar algo del mundo del código (compilar, tipear, decodificar,
renderizar), no ser decoración suelta. Un solo momento fuerte por pantalla.

## Mapa de efectos

| Efecto | Dónde vive | Cómo se usa |
|--------|-----------|-------------|
| Video/imagen → ASCII en vivo | `components/fx/AsciiCanvas.tsx` (motor), `lib/ascii.ts` (lógica pura, testeada) | `<AsciiCanvas source={ref} live ramp cell contrast />` |
| Footage en ASCII + capa real | `components/fx/AsciiFootage.tsx` | `<AsciiFootage clip={…} name="hero" ramp={CODE_RAMP} scrub />`; marca `[data-scrub=name]`, `[data-real=name]`, `[data-ascii=name]` |
| Retrato ASCII → foto al hover | `components/fx/AsciiPortrait.tsx` | `<AsciiPortrait src alt />` |
| Texto que se decodifica | `ScrollChoreography` + `scrambleFrame()` en `lib/ascii.ts` | `<span aria-hidden data-scramble>` (al entrar), `data-scramble-now` (al cargar), `data-scramble-hover` (al pasar el mouse por el `a`/`article` padre) |
| Código que se tipea con el scroll | `sections/Source.tsx` + `lib/source-code.ts` | líneas `[data-code-line]` dentro de `[data-source]`; pasos `[data-build-step]`, cierre `[data-build-done]` |
| Hero: ASCII → video real | `ScrollChoreography` (timeline del hero) | `#top` anclado +200%, scrub del video, fundido `[data-ascii=hero]` → `[data-real=hero]`, `[data-hero-tagline]` |
| Carril horizontal | `ScrollChoreography` | `[data-track-viewport]` > `[data-track]` (solo desktop) |
| Grafo git | `ScrollChoreography` | `[data-branch]` (scaleY con scroll), `[data-node]` (pop) |
| Revelado | `ScrollChoreography` | `[data-reveal]` (batch, una vez) |
| Botón magnético | `ScrollChoreography` | `data-magnetic` (desktop); `ButtonLink` ya lo trae |
| Cursor caret | `components/fx/Cursor.tsx` | `data-cursor="label"` en cualquier elemento para el texto del cursor |
| Glitch RGB | `globals.css` `.glitch` | contenedor `.glitch` con `--glitch-image: url(...)` dentro de un `.group` |
| Pantalla de build | `globals.css` `.intro*` + `layout/IntroScreen.tsx` | CSS puro, contador con `@property --build` |
| Cintas del stack | `globals.css` `.tape` | CSS puro |

## Reglas (no negociables)

1. **Accesibilidad**
   - Todo lo animado que cambia texto es `aria-hidden`, y el nombre accesible va fijo en el padre (`aria-label` en el `h1`/`h2`/`h3`/link). Nunca dejar que un lector de pantalla lea glifos al azar.
   - Canvas y videos: `aria-hidden`. Si una imagen tiene contenido (retrato), la versión real con `alt` sigue en el DOM.
   - axe mide contraste también del texto `aria-hidden`: usar tokens (`fg-subtle` ≥ 4.5:1 sobre `ink-2`).
2. **Reduced motion:** `MOTION_QUERY` / `DESKTOP_MOTION_QUERY` en `lib/motion.ts`. Sin movimiento: sin GSAP, sin Lenis, sin cursor; el ASCII dibuja **un cuadro** desde el poster. En CSS, `@media (prefers-reduced-motion: reduce)` congela `.tape` y `.glitch`.
3. **Nada oculto en el HTML.** Los estados iniciales (opacity 0, clip-path) los pone GSAP al cargar; sin JS todo se ve.
4. **Rendimiento**
   - ASCII: el motor muestrea a una grilla chica y pinta desde un atlas (un `drawImage` por celda). Tope de fps, se detiene fuera de pantalla (IntersectionObserver), DPR ≤ 2.
   - Celda ≥ 7px; el hero en 11px (~7k celdas a 1440px).
   - Videos de scrub: keyframe cada 8 frames (`-g 8`, ver `docs/ai/04-content.md`); se bajan en `requestIdleCallback` y solo en desktop.
   - Un seek por frame como máximo.
   - GSAP y Lenis siempre por import dinámico (`loadGsap()`).
5. **Lógica pura aparte y testeada:** mapeo píxel → glifo, scramble y generación de código viven en `lib/` con tests (`ascii.test.ts`, `source-code.test.ts`). Los componentes solo dibujan.
6. **Contenido real:** el código que se muestra se **genera** de `app/data` (`buildProfileSource`); no escribir datos a mano en un efecto. Las etapas del pipeline salen de `PIPELINE` (validadas contra `ci.yml`).
7. **Un solo lugar para el scroll:** toda animación con scroll/puntero va en `ScrollChoreography` vía atributos `data-*`; las secciones siguen siendo server components.

## Agregar un efecto nuevo

1. ¿Qué significa en el mundo del código? Si no tiene una respuesta, no va.
2. Lógica pura → `lib/<efecto>.ts` + test. Dibujo → `components/fx/<Efecto>.tsx` (client) o un atributo `data-*` manejado en `ScrollChoreography`.
3. Definir el comportamiento con reduced motion y en celulares (touch, sin hover).
4. Documentar la marca en la tabla de arriba y en `docs/ai/03-ui.md` (coreografía).
5. E2E si cambia algo visible para el usuario (ver `e2e/home.spec.ts`: el canvas tiene píxeles, el build termina).
6. `npm run verify` (incluye axe con y sin reduced motion, **después** de recorrer la página).

## Depurar

- **ASCII vacío:**
  - ¿el video llegó a `readyState ≥ 2`?
  - En scrub se redibuja con el evento `seeked`.
  - ¿El canvas tiene tamaño? El `ResizeObserver` lo recalcula.
  - Subir `contrast` si el material es oscuro.
- **El texto queda con glifos:** el scrambler guarda el original en `data-text` y lo restaura en el cleanup. No setear `textContent` a mano en esos nodos.
- **El cursor queda siempre en modo link:** algún ancestro tiene `data-cursor`. El `<html>` usa `data-custom-cursor` a propósito.
- **Saltos del scroll anclado:** imágenes o fuentes tardías. `ScrollTrigger.refresh()` corre en `load`; para contenido dinámico, llamarlo después de montar.
