# 04 — UI overlay (HTML sobre la escena)

**Archivos:** `app/components/ContentOverlay.tsx`, `sections/{Hero,Projects,About}Content.tsx`,
`SiteChrome.tsx`, `ContactDrawer3D.tsx`, `Cursor.tsx`, `GrainOverlay.tsx`, `ScrollHint.tsx`,
`app/hooks/useMagnetic.ts`

Todos son `"use client"`.

## Componentes

| Componente | Qué hace | Notas |
|------------|----------|-------|
| `ContentOverlay` | Renderiza 3 `div` fijos (`inset: 0`, z-5) con ids `section-hero/projects/about`. | Solo la opacidad inicial la pone React; después la controla `CameraRig`. |
| `HeroContent` | Nombre, rol, intro, CTAs "View work" (→ `navigateTo("projects")`) y "Get in touch" (→ evento). | Contenedor con `pointerEvents: none`, contenido con `auto`. |
| `ProjectsContent` | Grid **3×2** de cards image-first desde `data/projects.ts`. Muestra 2 tags de tech, badge WIP, links GitHub/sitio. | Hover escala la imagen mutando `style` directo. |
| `AboutContent` | Bio, avatar, facts, tabs de stack ("Backend & Fullstack" / "Data & AI"). | Datos (`STACK_TABS`, `FACTS`) hardcodeados en el componente. |
| `SiteChrome` | Logo "MS" (→ hero) y nav de dots a la derecha, lee `active` del store. | `DotButton` es componente propio para tener su propio `useMagnetic`. |
| `ContactDrawer3D` | Drawer inferior: pill siempre visible + panel con links y form Formspree. | Abre por click, por evento `open-contact-drawer`; cierra con Escape/backdrop. |
| `Cursor` | Dot 1:1 + ring con spring. Variantes vía `data-cursor`. | No se monta con `pointer: coarse`. |
| `GrainOverlay` | SVG feTurbulence inline, jitter cada 80 ms mutando `backgroundPosition`. | `pointer-events-none`. |
| `ScrollHint` | "Scroll" + línea, id `scroll-hint`. | `CameraRig` lo oculta cuando p ≥ 0.02. |

## Hook `useMagnetic<T>(strength = 0.3)`

- Devuelve `{ ref, style }`. `ref` es **callback ref**; `style` son motion values `{ x, y }`.
- El elemento **debe** ser `motion.*` (ej. `motion.button`).
- **Siempre desestructurar**: `const { ref, style } = useMagnetic<HTMLButtonElement>();`
  (la regla `react-hooks/refs` falla con `magnetic.ref`).
- Spread al final: `style={{ ...cssProps, ...style }}`.
- No aplicarlo a un elemento cuyo padre ya anima `transform` del mismo nodo (ver comentario en `ContactDrawer3D`).

## Contrato del cursor

| Atributo | Efecto |
|----------|--------|
| `data-cursor="link"` | ring ×1.8, dot atenuado — botones y links |
| `data-cursor="view"` | ring ×2.6 relleno ámbar + label — cards |
| `data-cursor-label="..."` | texto del label en `view` (default "View") |

Todo elemento interactivo nuevo debería llevar `data-cursor="link"`.

## Convenciones de estilo actuales

- Estilos **inline** (`style={{}}`) con constantes de fuente al tope del archivo:
  `const F = "var(--font-fraunces), Georgia, serif"; const S = "var(--font-hanken), system-ui, sans-serif";`
- Tailwind se usa poco (`GrainOverlay`). Para código nuevo se permite Tailwind con los tokens de `@theme`;
  no mezclar ambos enfoques en un mismo elemento.
- Cada sección es `position: absolute; inset: 0` dentro de su contenedor fijo, con un
  gradiente radial de legibilidad detrás del texto.
- Títulos de sección: `h2` serif `clamp(32px, 3.5vw, 52px)` + línea degradada ámbar.

## Reglas

- **No** controlar la visibilidad de una sección con estado React: la maneja `CameraRig`.
- Elementos interactivos dentro de secciones necesitan `pointerEvents: "auto"` explícito.
- Links externos: `target="_blank" rel="noopener noreferrer"`.
- Accesibilidad mínima: `aria-label` en botones solo-ícono, `aria-hidden` en decorativos,
  `role="dialog"`/`aria-modal` en overlays.

## Deuda técnica conocida

- Sin responsive: grid 3×2 fijo y 2 columnas en About/drawer rompen en mobile.
- `<img>` en vez de `next/image` (Projects, About).
- Hex hardcodeados y constantes `F`/`S` duplicadas → candidato a `app/lib/typography.ts` o clases Tailwind.
- Cards de proyecto no usan `data-cursor="view"` aunque el cursor lo soporta.
- `ContactDrawer3D`: `setTimeout` de focus sin cleanup; sin focus trap; `label`s sin `htmlFor`.
- `AboutContent`: cast `key as "fullstack" | "data"` — tipar `STACK_TABS` con `as const`.
- Hover de cards muta DOM con `querySelector`; podría ser CSS `:hover`.
