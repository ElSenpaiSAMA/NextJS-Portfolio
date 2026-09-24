---
name: design-token
description: Agrega o modifica un design token (color, easing, variable de glass/grain) manteniendo sincronizados app/globals.css y app/lib/tokens.ts. Usar siempre que se necesite un color nuevo, al cambiar la paleta, o al migrar hex hardcodeados a tokens.
---

# design-token

Contexto: `docs/ai/02-design-system.md`. Los tokens viven en **dos** archivos que se
sincronizan a mano; ninguno deriva del otro.

## Decidir dónde va

| Tipo de valor | `globals.css` | `tokens.ts` |
|---------------|---------------|-------------|
| Color de UI / escena | `@theme static` → `--color-<kebab>` | `tokens.colors.<camel>` |
| Triplete RGB para `rgba()` | `:root` → `--color-<kebab>-rgb` (**no** en `@theme`: generaría utilidades inválidas) | `tokens.colors.<camel>Rgb` como `"R, G, B"` |
| Easing | `@theme static` → `--ease-<kebab>` | `tokens.easing.<camel> = { css, array }` |
| Glass / grain / valores sueltos | `:root` | `tokens.glass.*` / `tokens.grain.*` |

Solo hace falta el lado TS si el valor se usa en three.js o `motion`; pero por convención
**ambos archivos listan todos los colores**, así que agregalo en los dos.

## Pasos

1. Buscar si ya existe un token equivalente (`Grep` el hex en ambos archivos). Reutilizar antes que crear.
2. Nombrar por **rol**, no por color (`textMuted`, `sceneBlueDim`), ubicándolo en el grupo comentado correspondiente.
3. Agregar en `globals.css` y en `tokens.ts` con el **mismo valor exacto**.
4. Consumir:
   - Inline style / CSS: `var(--color-<kebab>)` o `rgba(var(--color-<kebab>-rgb), 0.3)`
   - Tailwind: `text-<kebab>`, `bg-<kebab>`, `ease-<kebab>`
   - three.js: `new THREE.Color(tokens.colors.<camel>)`
   - motion: `ease: tokens.easing.<camel>.array`
5. Si el token es nuevo en la tabla de paleta, agregarlo a `docs/ai/02-design-system.md`.
6. `npm run lint && npm run build`, luego `git-step`.

## Migrar hex hardcodeados

Hacerlo en un paso propio (`refactor: use design tokens in <Componente>`), un componente
por commit, sin cambios visuales. Verificar que cada hex reemplazado coincide exactamente
con el token (si no coincide, es un color nuevo: crear token o preguntar).
