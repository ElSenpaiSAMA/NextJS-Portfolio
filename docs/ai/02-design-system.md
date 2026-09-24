# 02 — Design system

**Archivos:** `app/globals.css`, `app/lib/tokens.ts`

## Fuente de verdad (doble, sincronizada a mano)

| Dónde | Para qué | Cómo se consume |
|-------|----------|-----------------|
| `globals.css` `@theme static { ... }` | Tokens de Tailwind + variables CSS | clases Tailwind (`bg-bg`, `text-accent`...) o `var(--color-accent)` en inline styles |
| `globals.css` `:root { ... }` | Variables que **no** deben generar utilidades (`*-rgb`, glass, grain) | `rgba(var(--color-accent-rgb), 0.3)` |
| `tokens.ts` | Mismos valores para JS: materiales three.js, luces, `motion` | `tokens.colors.accent`, `tokens.easing.outExpo.array` |

> **Regla de oro:** si cambiás o agregás un token, hacelo en **ambos** archivos en el
> mismo commit. Ninguno deriva del otro. Usá la skill `design-token`.

`@theme static` fuerza a emitir todas las variables aunque ninguna clase Tailwind las use
(el scanner no ve inline styles).

## Paleta

| Token | Hex | Uso |
|-------|-----|-----|
| `bg` | `#05050a` | fondo global, fog, clear color del Canvas |
| `bg-elevated` | `#0e0d14` | pill del drawer, superficies |
| `text-primary` | `#F0EDE8` | títulos, texto principal |
| `text-secondary` | `#8A8680` | párrafos |
| `text-tertiary` → `text-ghost` | `#6A6460` → `#3A3830` | jerarquía descendente |
| `accent` | `#A8642E` (rgb `168,100,46`) | ámbar de marca: CTAs, líneas, glow |
| `available` | `#5B7F58` | indicador "Available for work" |
| `scene-*` | amber/blue/purple/navy/ambient/particle | **solo** escena 3D |

Patrón visual recurrente: bordes `1px solid rgba(168,100,46, 0.12–0.4)` + `boxShadow`
glow ámbar. Radios casi rectos (`2px`/`3px`).

## Tipografía

- **Serif** `var(--font-serif)` = Fraunces: h1/h2/h3, weight **400** siempre, `letterSpacing` negativo (-0.02 a -0.035em).
- **Sans** `var(--font-sans)` = Hanken Grotesk: UI. Labels en `uppercase`, 9–11px, `letterSpacing` 0.08–0.2em.
- Tamaños fluidos con `clamp()` en títulos grandes.

## Easing

| Token | Curva | Uso |
|-------|-------|-----|
| `outExpo` | `cubic-bezier(0.16, 1, 0.3, 1)` | entradas, cursor |
| `outCirc` | `cubic-bezier(0.76, 0, 0.24, 1)` | salidas, loading |

En CSS: `ease-out-expo` (Tailwind) o `var(--ease-out-expo)`. En motion: `tokens.easing.outExpo.array`.

## Z-index

| z | Capa |
|---|------|
| 0 | Canvas 3D |
| 5 | Secciones (`ContentOverlay`) |
| 20 | `SiteChrome`, `ScrollHint` |
| 40 | Backdrop del drawer |
| 50 | Drawer de contacto, `GrainOverlay` |
| 60 | `Cursor` (siempre encima de todo lo interactivo) |
| 100 | `LoadingScreen` |

## Cursor custom (contrato de estilos)

`body.cursor-none-active` oculta el cursor nativo con `!important` (necesario porque
los botones ponen `cursor: pointer` inline). Ver capa 04 para `data-cursor`.

## Reglas

- Código nuevo: **usar tokens** (`var(--color-*)` o `tokens.*`), nunca hex sueltos.
- Si tocás un componente con hex hardcodeados, podés migrarlo a tokens en un commit aparte.
- No introducir fuentes nuevas sin agregarlas en `layout.tsx` + `@theme`.

## Deuda técnica conocida

- Hex hardcodeados en casi todos los componentes de UI y en `Scene.tsx` (`#05050a`).
- Colores sin token usados en UI: `#C8C4BC`, `#D0CCC6`, `#7A7670`.
- No hay escala de spacing ni de tamaños tipográficos tokenizada.
- No hay breakpoints/responsive definidos.
