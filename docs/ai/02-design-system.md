# 02 — Design system (`design-system`)

**Archivos:** `app/globals.css`

## Dirección de arte: "Night Shift"

Un puerto al atardecer construido con contenedores (guiño a Docker / infraestructura), con energía de
tráiler de videojuego (referencia del autor: rockstargames.com/VI). **Un solo tema, oscuro**: toda la
estética es un crepúsculo. Firma visual: el **degradado atardecer** (naranja → flamenco) dentro de la
tipografía gigante.

Reglas tomadas de las skills `frontend-design` y `awwwards` (ver `.claude/skills/`):
- Nada de etiquetas en MAYÚSCULAS sobre cada título, separadores "·", flechas "→" en links ni monoespaciada.
- No resaltar una sola palabra de un título en otro color: el degradado va en el bloque entero.
- Una sola librería de animación (GSAP). Animación solo donde cuenta la historia (hero, carrusel).

## Tokens (`:root` en `globals.css`)

| Token | Valor | Uso |
|-------|-------|-----|
| `night` | `#160b2e` | fondo (índigo, no gris-negro) |
| `dusk` / `dusk-line` | `#22113f` / `#3d1a5b` | superficies / líneas finas |
| `haze` | `#f5e6dd` | texto principal |
| `haze-muted` / `haze-subtle` | `#b9a6c4` / `#9a87a8` | texto secundario / terciario (≥ 4.5:1 sobre `night`) |
| `sunset` / `flamingo` | `#ff7849` / `#ff4f8b` | acentos y degradado firma |
| `lagoon` | `#44d7c6` | solo foco (`:focus-visible`) |
| `ok` / `warn` | verde / ámbar | disponibilidad, "In development" |

Utilidades: `bg-night`, `text-haze`, `border-dusk-line`, `text-sunset`… (vía `@theme inline`).

Utilidades propias (`@utility`):
- `display` — Big Shoulders a tamaño óptico 72, 800, mayúsculas, interlineado 0.86. Títulos gigantes.
- `ink-sunset` — degradado atardecer recortado en el texto. **Usar con `w-fit`** en bloques, si no el
  degradado se estira al ancho del contenedor y se ve un solo color. No se llama `text-sunset` porque
  Tailwind ya genera esa utilidad de color desde `--color-sunset` y la pisaría.
- `text-outline` — texto con contorno, para momentos secundarios.

Excepciones documentadas de hex fuera de tokens: el grade de color sobre video
(`FootageGrade.tsx`) y los velos de legibilidad de `Hero`/`Contact` (degradados `rgba` del tono `night`
con paradas propias), `opengraph-image.tsx`, `icon.svg`, `viewport.themeColor`.

## Tipografía

`Big_Shoulders` (variable, eje `opsz`) para display — condensada de cartelería urbana — e
`Instrument_Sans` para texto. Cargadas con `next/font` en `layout.tsx` (`--font-shoulders`, `--font-instrument`).

## Animaciones CSS

- Intro (`.intro*`, keyframes `intro-*`): letras con el degradado, línea, subtítulo, panel que sube. Una vez por sesión.
- Marquesinas del stack (`.marquee`): CSS puro, se pausa en hover, congelada con reduced-motion.
- `prefers-reduced-motion`: sin intro, sin marquesina, transiciones casi nulas.

## Deuda técnica conocida

- Colores del grade de video (`FootageGrade.tsx`) duplicados a mano de los tokens de la paleta.
