# 02 — Design system (`design-system`)

**Archivos:** `app/globals.css`

## Dirección de arte: "Companion"

Un portfolio **negro con brillo azul** con un **compañero** al lado: un panel fijo que narra lo que estás
leyendo, contesta preguntas del CV y despliega el sitio.

Inspiración del autor: ignaciobrenas.vercel.app:
- un sprite que narra;
- secciones numeradas 01–05;
- tarjetas ricas con estado y logos;
- frase manuscrita y subrayado ondulado.

Pedido: mejorarla con los tonos negros de los diseños anteriores y lo ya construido (deploy, física,
tipeo). El narrador es tu avatar real con texto generado de tus datos, en vez de un sprite con guion fijo.

Historial descartado: "Night Shift", "Ops console", "Product page" (Apple), "Source → Build" (ASCII sobre
video) y "Ship it." (tema claro).

Interacciones: skill **`companion`** (`.claude/skills/companion/SKILL.md`).

## Tokens (`:root`)

| Token | Valor | Uso |
|-------|-------|-----|
| `bg` | `#060708` | página (con dos brillos radiales fijos, azul y menta) |
| `surface` / `surface-2` | `#0d0f12` / `#15181d` | tarjetas / chips, logs, insets |
| `line` | `#23272e` | bordes |
| `fg` / `fg-muted` / `fg-subtle` | `#eef0f2` / `#a6abb6` / `#878c98` | texto (≥ 4.5:1 sobre `surface-2`) |
| `accent` | `#5b8cff` | brillo (`--glow`), bordes activos, puntos |
| `accent-text` | `#8aa9ff` | acento como texto |
| `accent-strong` | `#3366ff` | **botones llenos con texto blanco** (4.7:1) |
| `ok` / `warn` / `error` | `#4ade80` / `#fbbf24` / `#f87171` | disponible, Shipped y checks / In development / errores |
| `--r` | `18px` | radio de tarjetas (`rounded-ui`) |
| `--glow` | sombra azul | hover de `.card`, pill activa de la nav |

## Utilidades

- `display`: titulares (650, tracking -0.045em).
- `hand`: voz manuscrita (Caveat), en "hello, I'm", las taglines y "so…".
- `card`: borde + superficie, con borde y brillo azul al hover.
- `.squiggle`: el subrayado del nombre se dibuja con `stroke-dashoffset`; espera a la bienvenida en la primera visita.
- `.caret`: cursor del tipeo.
- `.pulse-dot`: estados vivos.
- `.float`: el avatar respira.

## Tipografía

`Geist` (UI), `Geist_Mono` (etiquetas, código, narración) y `Caveat` 600 (manuscrita), vía `next/font`
(`--font-geist`, `--font-geist-mono`, `--font-caveat`).

## Bienvenida

`.intro*`: se tipea `hello, world`, se borra y se tipea "Welcome to my portfolio"; después la pantalla se
desvanece. Una vez por sesión, sin bloquear clics, se omite con reduced motion.

Con `prefers-reduced-motion` tampoco hay subrayado animado, caret, pulso ni flotado.
