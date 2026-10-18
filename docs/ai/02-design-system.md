# 02 — Design system (`design-system`)

**Archivos:** `app/globals.css`

## Dirección de arte: "Ops console"

El portfolio como **una sesión de terminal y su propio pipeline de CI**. Cada sección se abre con el
comando que la "imprime" (`ls ~/projects`, `git log --graph`, `cat stack.yml`, `cat README.md`,
`./contact.sh`) y el contenido toma la forma de ese mundo: ventanas de terminal/editor, YAML con
números de línea, un grafo de git. Pedido del autor: que se vea relacionado con la informática.

**Un solo tema, oscuro.** Base azul pizarra (no negro puro, y **no** el cliché negro + verde neón):
el verde se reserva para estados reales ("passed", disponible).

Reglas (skills `frontend-design` y `awwwards`):
- La metáfora de terminal tiene que **corresponder al contenido** (el comando de cada sección es
  el que mostraría ese contenido). No sumar decoración de "hacker" sin función.
- El pipeline del hero lista **solo jobs reales** de `.github/workflows/ci.yml` (lo valida `data.test.ts`).
- Movimiento en tres capas, cada una con su herramienta: CSS (terminal del hero, boot screen), GSAP +
  ScrollTrigger (revelados con el scroll, capa 03) y Three.js / React Three Fiber (clúster 3D del hero).
  Una sola librería de animación JS (GSAP). Skills: `gsap-scrolltrigger`, `react-three-fiber`, `threejs-webgl`.

## Tokens (`:root` en `globals.css`)

| Token | Valor | Uso |
|-------|-------|-----|
| `console` | `#0a0f1a` | fondo de la página |
| `panel` / `panel-bar` | `#0f1726` / `#141e31` | ventanas / barras de título y gutters |
| `line` | `#1f2b40` | bordes, líneas finas |
| `fg` | `#dbe4f0` | texto principal |
| `fg-muted` / `fg-subtle` | `#93a3ba` / `#7d8fa9` | secundario / terciario (≥ 4.5:1 incluso sobre `panel-bar`) |
| `amber` | `#ffb547` | prompt `$`, cursor, botón primario, roles |
| `cyan` | `#5cc8ff` | claves YAML, links, foco (`:focus-visible`) |
| `green` | `#4ade80` | ✓ passed, disponible, `+` de highlights |
| `red` | `#ff7b72` | errores de formulario / páginas de error |
| `violet` | `#c4a7ff` | valores en el YAML del hero |

Utilidades: `bg-console`, `bg-panel`, `text-fg-muted`, `border-line`, `text-amber`… (vía `@theme inline`).
Utilidad propia: `bg-grid` (grilla técnica tenue del hero).

Excepciones de color fuera de tokens: `ClusterScene.tsx` (WebGL no lee variables CSS: constante `COLORS`
que copia la paleta), `opengraph-image.tsx` (Satori no lee variables CSS: copia la paleta
en una constante), `icon.svg`, `viewport.themeColor` (`#0a0f1a`) y la sombra `rgba` de `Window`.

## Tipografía

**IBM Plex Mono** (títulos, prompts, código, etiquetas) + **IBM Plex Sans** (texto de lectura). Familia de
IBM, coherente con el tema. `next/font` en `layout.tsx` (`--font-plex-mono`, `--font-plex-sans`) →
`font-mono` / `font-sans`. Párrafos largos siempre en Sans.

## Animaciones CSS

- **Terminal del hero** (`.term-line`, `.term-typed`, `.term-status`, `.term-pending`/`.term-done`):
  cada línea aparece en su `--at`; los comandos se "tipean" con `steps(--chars)` en `ch`; cada etapa
  muestra `•` y cambia a `✓` en `--done` (cruce de opacidad en una celda de grid, no `display`).
  En la primera visita `html:not([data-intro="seen"]) .hero-term` suma `--hero-offset: 2.3s` para
  arrancar después del boot screen.
- **Boot screen** (`.intro*`): líneas estilo systemd `[ OK ]`, luego "Welcome to my portfolio", luego
  el panel sube. Una vez por sesión.
- `.cursor`: cursor de bloque que parpadea.
- `.cluster-packet`: paquetes del clúster SVG de celulares, recorren su cable con `offset-path`.
- `.code-lines` / `.code-line`: gutter con números de línea (contadores CSS), en grid de 2 columnas
  para que las líneas largas no se metan bajo el número.
- `prefers-reduced-motion`: sin intro, terminal en su estado final, cursor y paquetes quietos, transiciones casi nulas
  (y en JS: sin GSAP/Lenis, el 3D dibuja un solo cuadro).
