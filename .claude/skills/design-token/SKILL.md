---
name: design-token
description: Agrega o modifica un design token (color, utilidad de tipografía, easing) en app/globals.css del diseño "Companion" (negro con brillo azul), manteniendo contraste WCAG AA. Usar cuando se necesite un color nuevo o cambiar la paleta.
---

# design-token

Contexto: `docs/ai/02-design-system.md`. Tema **oscuro único**: no hay bloques claro/oscuro.

## Dónde va un token

En `app/globals.css`:
1. `:root` → la variable (`--<nombre>`), nombrada por rol (`fg-muted`, `panel-bar`), no por color.
2. `@theme inline` → `--color-<nombre>: var(--<nombre>);` para tener `bg-<nombre>`, `text-<nombre>`, `border-<nombre>/40`…

## Reglas

1. ¿Ya existe uno equivalente? Reutilizá antes de crear.
2. Contraste: texto ≥ 4.5:1 sobre `bg`, `surface` y `surface-2` (axe mide también el texto `aria-hidden`). Botones llenos con texto blanco: `accent-strong`, nunca `accent`.
3. No crees una utilidad propia con prefijo `text-<color>` si existe `--color-<color>`: Tailwind genera la
   suya y la pisa (por eso una utilidad propia de texto no debe llamarse `text-<token>`).
4. Si el color se usa en WebGL/SVG/OG (`CityScene.tsx`, `StaticSkyline.tsx`, `opengraph-image.tsx`,
   `icon.svg`, `viewport.themeColor`), actualizalo también ahí: no leen variables CSS.
5. Actualizá la tabla de `docs/ai/02-design-system.md`.
6. `npm run build && npm run test:e2e` (axe verifica contraste).
7. `git-step`, capa `design-system`; los componentes que lo usen van en el commit de `ui`.
