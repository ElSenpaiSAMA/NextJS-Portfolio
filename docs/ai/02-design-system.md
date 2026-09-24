# 02 — Design system (`design-system`)

**Archivos:** `app/globals.css`, `app/lib/theme.ts`

Estética: sobria y técnica. Tipografía Geist Sans para texto, Geist Mono para metadatos
(labels, eyebrows, detalles técnicos). Un solo color de acento (teal). Sin sombras ni animaciones decorativas.

## Tokens (variables CSS)

Definidos en `:root` (claro), en `[data-theme="dark"]` y en `@media (prefers-color-scheme: dark)` para
`:root:not([data-theme="light"])` (fallback sin JS). **Los tres bloques deben tener las mismas claves.**

| Token | Claro | Oscuro | Uso |
|-------|-------|--------|-----|
| `bg` | `#fafaf9` | `#0b0b0c` | fondo |
| `surface` | `#ffffff` | `#131315` | cards |
| `fg` | `#0c0a09` | `#ededec` | texto principal |
| `muted` | `#57534e` | `#a8a29e` | texto secundario |
| `subtle` | `#6b6560` | `#8f8a85` | labels mono, metadatos |
| `border` | `#e7e5e4` | `#2a2a2e` | bordes |
| `accent` / `accent-fg` | `#0f766e` / `#fff` | `#2dd4bf` / `#042f2e` | links, CTA, foco |
| `ok` / `warn` / `info` | verde / ámbar / azul | versiones claras | estados (skill level, roadmap, diagrama) |

`@theme inline` los expone como utilidades Tailwind: `bg-bg`, `text-muted`, `border-border`,
`text-accent`, `border-ok/40`, etc. **Usar siempre utilidades de token, nunca hex en componentes.**

Contraste: todos los pares texto/fondo cumplen WCAG AA — axe lo verifica en claro y oscuro en CI.
Si cambiás un color, corré `npm run test:e2e -- a11y`.

## Tema claro/oscuro

- `THEME_INIT_SCRIPT` (string inline en `<head>`): lee `localStorage["theme"]` o `prefers-color-scheme` y fija `html[data-theme]`.
- `applyTheme` / `readTheme`: usados por `ThemeToggle`.
- Variante Tailwind `dark:` = `[data-theme="dark"]` (`@custom-variant` en `globals.css`).
- Los iconos del toggle se eligen por CSS (`dark:hidden`), así el markup de server y cliente es idéntico.

## Globales

`scroll-padding-top` (header sticky), `prefers-reduced-motion`, `:focus-visible` con el acento, `::selection`.

## Deuda técnica conocida

- Los valores oscuros están duplicados (media query + `[data-theme]`); CSS no permite compartirlos sin un preprocesador.
- `opengraph-image.tsx` e `icon.svg` repiten hex del tema oscuro (no pueden leer variables CSS).
