# 02 — Design system (`design-system`)

**Archivos:** `app/globals.css`

## Dirección de arte: "Product page" (estilo Apple)

El portfolio presentado como Apple presenta un producto (pedido del autor: "algo tipo Apple"). Rasgos:
titulares enormes y apretados en Inter, mucho aire, contenido centrado en 980px, secciones que **alternan
negro y gris claro**, video real de informática controlado por el scroll, un azul reservado para acciones y
un único degradado frío como firma.

Historial: se descartaron "Night Shift" (puerto 3D / video de puerto), "Ops console" (terminal) con un
clúster 3D y con video. Lo que el autor pidió a lo largo de todo y se conserva: contenido del CV, stack
completo sin niveles, pantalla de bienvenida, video real de informática con scroll, animaciones con GSAP.

Reglas (skills `frontend-design`, `awwwards`, `gsap-scrolltrigger`):
- Una sola familia (Inter). Titulares con la utilidad `headline` y punto final ("Selected work.").
- Azul `blue` solo para botones; links en `link-dark`/`link-light` con chevron ("Get in touch ›").
- El degradado va en **una** línea por pantalla (rol del hero, tagline, "what's next.", figuras del bento).
- Movimiento: GSAP + ScrollTrigger (capa 03) y CSS (bienvenida). Una sola librería de animación JS.

## Tokens (`:root` en `globals.css`)

| Token | Valor | Uso |
|-------|-------|-----|
| `black` | `#000000` | secciones oscuras (hero, statement, story, about, contact) |
| `graphite` | `#1d1d1f` | tiles sobre negro; texto sobre claro |
| `paper` | `#f5f5f7` | secciones claras (highlights, experience), footer |
| `white` | `#ffffff` | tiles sobre paper; secciones projects y stack |
| `mute-dark` | `#a1a1a6` | texto secundario sobre negro/graphite (≥ 6:1) |
| `mute-light` | `#6e6e73` | texto secundario sobre paper/white (≥ 4.7:1) |
| `hairline-dark` / `hairline-light` | `#424245` / `#d2d2d7` | líneas finas |
| `blue` | `#0071e3` | botones (texto blanco ≥ 4.5:1) |
| `link-dark` / `link-light` | `#2997ff` / `#0066cc` | links sobre oscuro / claro; foco |
| `ok` / `warn` / `error` | `#30d158` / `#b64400` / `#ff453a` | disponible y checks / "In development" sobre claro / errores de formulario |

Utilidades propias (`@utility`):
- `headline` — 600, tracking -0.035em, interlineado 1.04, `text-wrap: balance`.
- `ink-gradient` — degradado firma (cian → azul → violeta) en el texto, **solo sobre fondos oscuros**. Usar con `w-fit`.
- `ink-gradient-deep` — la misma idea en azul → índigo → violeta, con contraste AA **sobre fondos claros**.
- `gallery` — scroll horizontal con snap y sin scrollbar (galería de proyectos).
- `[data-scrubbing] [data-story-caption]` — en desktop las tres frases de Build/Ship/Run comparten una celda de grid.

Excepciones de color fuera de tokens: hovers de botón (`#0077ed`, `#2a2a2d`), los velos de legibilidad sobre
video (`rgb(0 0 0 / α)`), `opengraph-image.tsx` e `icon.svg` (Satori/SVG no leen variables CSS),
`viewport.themeColor` (`#000000`).

## Tipografía

**Inter** variable (`next/font`, `--font-inter` → `font-sans`), lo más cercano abierto a SF Pro. Pila de
respaldo con `-apple-system` / SF Pro Display. Tamaños fluidos con `clamp()`; texto de lectura a 17–21px.

## Animaciones CSS

- **Bienvenida** (`.intro*`): el nombre entra en foco (blur → nítido), aparece "Welcome to my portfolio" con
  el degradado y la pantalla se disuelve. Una vez por sesión; `pointer-events: none`.
- `prefers-reduced-motion`: sin bienvenida, transiciones casi nulas (y en JS: sin GSAP/Lenis, videos en su poster).
