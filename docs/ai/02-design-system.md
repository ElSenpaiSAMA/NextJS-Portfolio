# 02 — Design system (`design-system`)

**Archivos:** `app/globals.css`

## Dirección de arte: "Shell"

La página **es una sesión de terminal** en `matias@speroni`. Es la evolución de "Pipeline", elegida por el autor
("algo más de programación: terminal, Linux").
- Arranca con un boot estilo systemd.
- Cada sección es la salida de un comando tipeado en el prompt: `neofetch`, `cat stack.yaml`,
  `ls -l ~/projects`, `git log`, `cat about.md`, `make deploy`. Cada comando es además una etapa del pipeline.
- Una barra de estado tipo tmux es la navegación.
- Hay una shell real para escribir.

Historial: "Night Shift", "Ops console", "Product page", "Source → Build", "Ship it.", "Companion" (calco de
ignaciobrenas.vercel.app — no reintroducir su panel narrador, pastillas 01–05, letra manuscrita ni hub) y "Pipeline".

Detalle técnico: skill **`terminal-session`**.

## Tokens (`:root`)

| Token | Valor | Uso |
|-------|-------|-----|
| `bg` | `#060708` | página (brillo verde "fósforo" arriba) |
| `surface` / `surface-2` | `#0b0d10` / `#14171c` | el panel de la terminal, ventanas / chips, barras |
| `line` | `#23272e` | bordes |
| `fg` / `fg-muted` / `fg-subtle` | `#e8eaed` / `#a6abb6` / `#878c98` | texto (≥ 4.5:1 sobre `surface-2`) |
| `ok` | `#4ade80` | verde ANSI: `user@host`, botones primarios (texto `bg`), passed, disponible, foco |
| `accent-text` / `accent` | `#8aa9ff` / `#5b8cff` | azul: rutas, rol, links |
| `accent-strong` | `#3366ff` | reservado para botones llenos con texto blanco |
| `warn` | `#fbbf24` | amarillo: running, en desarrollo, hash de commit |
| `error` | `#f87171` | rojo: errores de la shell |
| `magenta` | `#d8a4ff` | claves YAML / `key:` |
| `cyan` | `#67e8f9` | fechas, `(HEAD -> main)` |
| `--r` | `10px` | radio de ventanas (`rounded-ui`); botones `rounded-md` |

## Utilidades y CSS

- `display`: titulares (mono, bold, tracking negativo).
- `card`: ventana con borde verde al hover.
- `.caret`: bloque que parpadea (prompt que espera, bienvenida).
- `.pulse-dot`: estados vivos.
- `.typed` + `data-run="wait|go"`: el comando se tipea con `steps(var(--chars))`. Sin el atributo (servidor, sin
  JS, reduced motion) se ve completo.
- `body::after`: scanlines casi imperceptibles (textura, `pointer-events: none`).
- `:focus-visible` vive en `@layer base`, así las utilidades pueden sobreescribirlo.
- **Boot** (`.intro*`): líneas `[ OK ]` escalonadas, `speroni login: matias` y "Welcome to my portfolio" tipeado.
  Termina en ~3.5 s, una vez por sesión, con `overflow: hidden` para que no ensanche la página en móvil.
- `prefers-reduced-motion`: sin boot, caret, pulso ni tipeo.

## Tipografía

Una sola familia: **`Geist_Mono`** para todo (`--font-sans` y `--font-mono` apuntan a ella). Body de 15px.
