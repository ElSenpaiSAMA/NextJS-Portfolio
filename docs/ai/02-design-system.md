# 02 — Design system (`design-system`)

**Archivos:** `app/globals.css`, `app/lib/theme.ts`

## Dirección visual

**Neutra corporativa**, seria y formal: blanco y grises slate, un acento azul marino, una sola fuente
(Inter). Tarjetas con borde fino y radio moderado (`rounded-lg`), secciones alternando fondo `bg`/`surface`,
sombras solo en hover de cards. Nada de glow, grano, 3D ni colores saturados.

## Tokens (variables CSS)

Definidos en `:root` (claro), `[data-theme="dark"]` y el fallback `@media (prefers-color-scheme: dark)`
para `:root:not([data-theme="light"])`. **Los tres bloques deben tener las mismas claves.**

| Token | Claro | Oscuro | Uso |
|-------|-------|--------|-----|
| `bg` | `#ffffff` | `#0b1120` | fondo |
| `surface` | `#f8fafc` | `#111a2e` | secciones alternas |
| `fg` | `#0f172a` | `#e2e8f0` | texto principal |
| `muted` | `#475569` | `#a3b1c6` | texto secundario |
| `subtle` | `#64748b` | `#8391a7` | labels, metadatos |
| `border` | `#e2e8f0` | `#1e293b` | bordes |
| `accent` / `accent-hover` | `#1e3a8a` / `#1e40af` | `#93b4f5` / `#b4cbf8` | rol, CTA, links, foco |
| `accent-fg` | `#ffffff` | `#0b1120` | texto sobre acento |
| `accent-soft` | `#eff4ff` | `#15213b` | chips de tecnología, iconos de contacto |
| `ok` / `warn` | verde / ámbar | versiones claras | "Available", "In development" |

Utilidades Tailwind vía `@theme inline`: `bg-surface`, `text-muted`, `border-border`, `bg-accent`,
`hover:bg-accent-hover`, `bg-accent-soft`… Utilidad propia `label` (mayúsculas pequeñas).
**Nunca hex en componentes.** Excepción documentada: los tiles de logos del stack son `bg-white` fijo
para que logos oscuros (Next.js) se vean en modo oscuro.

Contraste: todos los pares cumplen WCAG AA; axe lo verifica en claro y oscuro.

## Tema claro/oscuro

- `THEME_INIT_SCRIPT` (inline en `<head>`): `localStorage["theme"]` o `prefers-color-scheme` → `html[data-theme]`.
- `applyTheme` / `readTheme` para `ThemeToggle`. Variante `dark:` = `[data-theme="dark"]`.

## Deuda técnica conocida

- Valores oscuros duplicados (media query + `[data-theme]`).
- `opengraph-image.tsx`, `icon.svg` y `viewport.themeColor` repiten hex (no leen variables CSS).
