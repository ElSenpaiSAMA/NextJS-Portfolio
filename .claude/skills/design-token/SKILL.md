---
name: design-token
description: Agrega o modifica un design token (color del tema claro/oscuro) en app/globals.css manteniendo los tres bloques sincronizados y el contraste WCAG AA. Usar cuando se necesite un color nuevo o cambiar la paleta.
---

# design-token

Contexto: `docs/ai/02-design-system.md`.

## Dónde va un token

Cada color se define **4 veces** en `app/globals.css`:

1. `:root` → valor claro (`--<nombre>`)
2. `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` → valor oscuro
3. `[data-theme="dark"]` → el **mismo** valor oscuro
4. `@theme inline` → `--color-<nombre>: var(--<nombre>);` (genera `bg-<nombre>`, `text-<nombre>`, `border-<nombre>/40`…)

## Pasos

1. ¿Existe uno equivalente? Reutilizá antes de crear. Nombrá por **rol** (`warn`, `surface`), no por color.
2. Agregá los 4 puntos. Los bloques 2 y 3 deben ser idénticos.
3. Contraste: texto sobre `bg` y `surface` ≥ 4.5:1 en ambos temas.
4. Si el valor se usa donde no llegan variables CSS (`opengraph-image.tsx`, `icon.svg`, `viewport.themeColor`), actualizalo ahí también.
5. Actualizá la tabla de `docs/ai/02-design-system.md`.
6. `npm run build && npm run test:e2e` (axe verifica contraste en claro y oscuro).
7. `git-step`, capa `design-system`. Los componentes que lo usen van en el commit de `ui`.
