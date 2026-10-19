# 02 — Design system (`design-system`)

**Archivos:** `app/globals.css`

## Dirección de arte: "Source → Build"

El portfolio es **código que se compila delante del visitante**. Pedido del autor: algo "enfocado a
programación a nivel diseño", con efectos y animaciones, que reúna todo lo pedido antes:
- contenido del CV;
- stack completo sin niveles;
- pantalla de bienvenida;
- video real de informática con scroll;
- animaciones.

Le dio libertad creativa.

La pieza firma: el **video del data center renderizado en ASCII en tiempo real**. Al bajar se avanza por
el pasillo hecho de caracteres y, a mitad del scroll, el ASCII "compila" y se vuelve el video real.

Historial de direcciones descartadas:
- "Night Shift" (puerto 3D, video de puerto);
- "Ops console" (terminal, clúster 3D, video);
- "Product page" (estilo Apple).

Reglas (skills `frontend-design`, `awwwards`, `gsap-scrolltrigger` y la propia **`code-effects`**):
- Cada efecto significa algo del mundo del código: compilar, tipear, decodificar, renderizar.
- Geist para titulares y texto, Geist Mono para todo lo "de código" (rutas, etiquetas, botones, código).
- Un azul (`accent`) para acciones; los colores de sintaxis solo dentro de código.
- Detalle de efectos, reglas y depuración: `.claude/skills/code-effects/SKILL.md`.

## Tokens (`:root` en `globals.css`)

| Token | Valor | Uso |
|-------|-------|-----|
| `ink` / `ink-2` / `ink-3` | `#07080b` / `#0e1015` / `#161922` | página / paneles y editor / chips e inputs |
| `line` | `#252a36` | líneas finas, bordes |
| `fg` | `#ecebe6` | texto principal |
| `fg-muted` / `fg-subtle` | `#a2a5b3` / `#858998` | secundario / terciario, comentarios, gutters (≥ 4.5:1 incluso sobre `ink-3`) |
| `accent` | `#5b8cff` | botones, links, foco, rutas, glifos medios del ASCII |
| `violet` / `pink` / `mint` / `amber` | `#b69cff` / `#ff8cc3` / `#5eead4` / `#fbbf24` | sintaxis: keywords / strings / funciones y ✓ / tipos y "in development" |
| `error` | `#ff6b6b` | errores |

Clases de sintaxis `.tok-<kind>` para los tokens de `lib/source-code.ts`. Utilidad `display`
(600, tracking -0.045em, interlineado 0.92).

Excepciones de color fuera de tokens:
- `AsciiCanvas.tsx` (`MID`/`HIGH`): el canvas no lee variables CSS por cuadro;
- velos `rgb(7 8 11 / α)` sobre el video;
- `opengraph-image.tsx` e `icon.svg`;
- `viewport.themeColor` (`#07080b`).

## Tipografía

`Geist` + `Geist_Mono` (`next/font`, `--font-geist` / `--font-geist-mono` → `font-sans` / `font-mono`):
la familia de Vercel/Next.js, las herramientas con las que el sitio se construye y despliega.

## CSS

- **Pantalla de build** (`.intro*`):
  - `$ next build`, los módulos reales "compilando" uno por uno;
  - un contador 0→100 % (`@property --build` entero + `counter()`), la barra y "Welcome to my portfolio";
  - después el panel se recorta hacia arriba.
  - Una vez por sesión; `pointer-events: none`.
- `.glitch`: split RGB de los screenshots al hover (dos copias con filtros rojo/azul que tiemblan).
- `.tape`: cintas infinitas del stack.
- `html[data-custom-cursor]` oculta el cursor nativo solo donde está montado el caret (desktop con movimiento).
- `prefers-reduced-motion`: sin intro, cintas y glitch quietos, transiciones casi nulas. En JS: sin GSAP,
  Lenis ni cursor; el ASCII dibuja un cuadro del poster.
