# 02 — Design system (`design-system`)

**Archivos:** `app/globals.css`

## Dirección de arte: "Pipeline"

La página **es un pipeline de CI/CD**, un concepto elegido por el autor entre dos propuestas propias.
- Una línea luminosa baja por la izquierda; cada sección es una etapa (`checkout` → `install` → `build` → `test` → `release` → `deploy`).
- Mientras leés, un job viaja por la línea, las etapas pasan de **pending → running (ámbar) → passed (verde)** e imprimen su log.
- El header muestra el estado en vivo.

Nada de esto viene de una referencia. Un diseño anterior ("Companion") calcaba ignaciobrenas.vercel.app y
se descartó: no volver a usar su panel narrador, las pastillas 01–05, la letra manuscrita ni el hub.

Historial: "Night Shift", "Ops console", "Product page", "Source → Build", "Ship it.", "Companion".

Detalle técnico: skill **`pipeline-page`**.

## Tokens (`:root`)

| Token | Valor | Uso |
|-------|-------|-----|
| `bg` | `#060708` | página (dos brillos radiales fijos) |
| `surface` / `surface-2` | `#0d0f12` / `#15181d` | tarjetas y logs / chips |
| `line` | `#23272e` | bordes, la línea del pipeline sin recorrer |
| `fg` / `fg-muted` / `fg-subtle` | `#eef0f2` / `#a6abb6` / `#878c98` | texto (≥ 4.5:1 sobre `surface-2`) |
| `accent` | `#5b8cff` | el job, el relleno de la línea, brillos, bordes |
| `accent-text` | `#8aa9ff` | acento como texto (nombre de etapa, rol) |
| `accent-strong` | `#3366ff` | botones llenos con texto blanco (4.7:1) |
| `warn` | `#fbbf24` | etapa **running**, "building" |
| `ok` | `#4ade80` | etapa **passed**, checks, disponible |
| `error` | `#f87171` | errores |
| `--r` | `18px` | radio (`rounded-ui`) |

## Utilidades y CSS

- `display`: titulares.
- `card`: borde con brillo azul al hover.
- `.pulse-dot`: estados vivos.
- `.caret`: bienvenida.
- **Bienvenida** (`.intro*`): `hello, world` se tipea, se borra y aparece "Welcome to my portfolio". Una vez por sesión.
- `prefers-reduced-motion`: sin intro, caret, pulso ni spinner.

## Tipografía

`Geist` (UI) + `Geist_Mono` (todo lo del pipeline: etiquetas de etapa, logs, badge, nav).
