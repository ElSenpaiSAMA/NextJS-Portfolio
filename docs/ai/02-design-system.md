# 02 — Design system (`design-system`)

**Archivos:** `app/globals.css`, `app/lib/theme.ts`

## Dirección visual

Limpia, formal, tranquila, minimalista, cálida. Papel + tinta + un acento terracota.
- Títulos en **serif** (Newsreader, peso normal, tracking ajustado). Texto en **Inter**.
- Sin tarjetas ni sombras: separación con **espacio** y **líneas finas** (`border-border`).
- Ancho de lectura angosto (`max-w-3xl` global, `max-w-xl` para párrafos largos).
- Labels pequeños en mayúsculas con la utilidad `label` (definida con `@utility` en `globals.css`).
- Nada de tipografía monoespaciada ni colores saturados.

## Tokens (variables CSS)

Definidos en `:root` (claro), `[data-theme="dark"]` y el fallback `@media (prefers-color-scheme: dark)`
para `:root:not([data-theme="light"])`. **Los tres bloques deben tener las mismas claves.**

| Token | Claro | Oscuro | Uso |
|-------|-------|--------|-----|
| `bg` | `#f8f5f0` papel | `#1b1815` carbón cálido | fondo |
| `surface` | `#fffdf9` | `#221f1b` | inputs, hover |
| `fg` | `#1f1b16` tinta | `#ede6da` | texto principal |
| `muted` | `#5c544a` | `#b8ad9e` | texto secundario |
| `subtle` | `#6f665a` | `#9d9284` | labels, metadatos |
| `border` | `#e6dfd3` | `#36312a` | líneas finas |
| `accent` / `accent-fg` | `#9c4a24` terracota / `#fffdf9` | `#e0a47a` arcilla / `#1b1815` | links, CTA, foco |
| `ok` / `warn` / `info` | oliva / ocre / azul grisáceo | versiones claras | niveles de skill, estados, diagrama |

Utilidades Tailwind vía `@theme inline`: `bg-bg`, `text-muted`, `border-border`, `text-accent`,
`font-serif`, `font-sans`. **Nunca hex en componentes.**

Contraste: todos los pares texto/fondo cumplen WCAG AA; axe lo verifica en las 10 páginas y ambos temas.

## Tema claro/oscuro

- `THEME_INIT_SCRIPT` (inline en `<head>`): `localStorage["theme"]` o `prefers-color-scheme` → `html[data-theme]`.
- `applyTheme` / `readTheme` para `ThemeToggle`. Variante `dark:` = `[data-theme="dark"]`.

## Deuda técnica conocida

- Valores oscuros duplicados (media query + `[data-theme]`).
- `opengraph-image.tsx`, `icon.svg` y `viewport.themeColor` repiten hex (no leen variables CSS).
