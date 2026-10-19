# 02 — Design system (`design-system`)

**Archivos:** `app/globals.css`

## Dirección de arte: "Ship it."

El visitante **opera** el portfolio como un DevOps:
- aprieta **Deploy** y ve correr el pipeline real del sitio;
- edita `portfolio.config.ts` y el sitio entero cambia (acento, tema claro/oscuro, radio, fuente);
- juega con el stack como bloques con física.

Pedido del autor: "sorprendeme", sin video, enfocado a programación.

Estética de **herramienta de desarrollo moderna** (Vercel, Linear, GitHub):
- tema **claro** por defecto sobre una grilla técnica tenue, con el oscuro a una línea de config;
- Geist + Geist Mono;
- un acento configurable;
- verde, ámbar y rojo solo para estados (Ready, Building, error).

Historial: se descartaron "Night Shift", "Ops console", "Product page" (Apple) y "Source → Build" (ASCII
sobre video).

Interacciones: skill **`ship-interactions`** (`.claude/skills/ship-interactions/SKILL.md`).

## Tokens (`:root`, y `:root[data-theme="dark"]`)

| Token | Claro | Oscuro | Uso |
|-------|-------|--------|-----|
| `bg` | `#fbfbfa` | `#0b0b0c` | página (con grilla `--grid`) |
| `surface` / `surface-2` | `#ffffff` / `#f2f2ef` | `#141416` / `#1c1c1f` | tarjetas / logs, chips, paneles |
| `line` | `#e2e2dd` | `#2a2a2e` | bordes |
| `fg` / `fg-muted` / `fg-subtle` | `#111113` / `#56565c` / `#6b6b71` | `#f2f2f0` / `#a9a9ae` / `#8c8c92` | texto (≥ 4.5:1 sobre `surface-2`) |
| `ok` / `warn` / `error` | `#166534` / `#b45309` / `#dc2626` | `#4ade80` / `#fbbf24` / `#f87171` | Ready y checks / Building / errores |
| `accent` | `#2f5bff` (config) | igual | botones (texto blanco), barra del deploy |
| `accent-text` | `= accent` | `color-mix(accent 60%, white)` | acento usado como texto, legible en ambos temas |
| `--r` | `12px` (config) | igual | radio de todo (`rounded-ui`) |

`data-font="mono"` en `<html>` cambia la fuente de toda la UI a Geist Mono.

Clases de sintaxis del editor: `.tok-key|string|number|keyword|comment|punct`, con variantes oscuras.

Excepciones de color fuera de tokens:
- colores de sintaxis (`.tok-*`);
- hover de bordes (`hover:border-fg-subtle`);
- `opengraph-image.tsx` e `icon.svg`;
- `viewport.themeColor`.

## Tipografía

`Geist` + `Geist_Mono` (`next/font`). Titulares con la utilidad `display` (600, tracking -0.045em).
Etiquetas de sección en mono, mayúsculas espaciadas y pequeñas.

## CSS

- **Bienvenida** (`.intro*`): `hello, world` se tipea (ancho en `ch` con `steps`), se borra y se tipea
  "Welcome to my portfolio"; después la pantalla se desvanece. Una vez por sesión; `pointer-events: none`.
- `.pulse-dot`: estado "Building".
- `prefers-reduced-motion`: sin intro ni pulso, transiciones casi nulas. En JS: el deploy aparece
  terminado, la física no carga y no hay revelados.
