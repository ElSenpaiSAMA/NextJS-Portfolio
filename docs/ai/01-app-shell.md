# 01 — App shell

**Archivos:** `app/layout.tsx`, `app/page.tsx`, `app/components/LoadingScreen.tsx`, `app/icon.jpg`, `next.config.ts`

## Responsabilidad

Montar la página, cargar fuentes, definir metadata y el orden de las capas visuales.
No contiene lógica de negocio.

## layout.tsx (Server Component)

- Carga fuentes con `next/font/google`:
  - `Fraunces` → variable CSS `--font-fraunces` (400, normal + italic) — títulos.
  - `Hanken_Grotesk` → `--font-hanken` (400, 500) — cuerpo/UI.
- Las variables se inyectan en `<body className>` y `globals.css` las mapea a
  `--font-serif` / `--font-sans`.
- Renderiza `<LoadingScreen />` **antes** de `children` (overlay z-100).
- `<html lang="en">`: el contenido público está en inglés.

## page.tsx (Server Component)

Solo compone. **El orden de los hijos importa** para el apilado cuando z-index empata:

```tsx
<SceneLoader />      // Canvas 3D (z-0)
<ContentOverlay />   // secciones (z-5)
<SiteChrome />       // z-20
<ScrollHint />       // z-20
<ContactDrawer3D />  // z-40 / z-50
<GrainOverlay />     // z-50
<Cursor />           // z-60 — siempre último
```

Al agregar un overlay global nuevo: elegí su z-index según la tabla de
[02-design-system](02-design-system.md#z-index) y montalo acá.

## LoadingScreen.tsx (client)

- Máquina de fases: `init → in → line → exit → done` con `setTimeout` calculados
  a partir de constantes (`LETTER_DELAY`, `LETTER_DUR`, etc.). Duración total ≈ 2.5 s.
- En `done` retorna `null` (se desmonta).
- Doble `requestAnimationFrame` para que la transición inicial se aplique.
- `aria-hidden` — es decorativo.

## Reglas

- `layout.tsx` y `page.tsx` deben seguir siendo **Server Components**. Todo lo
  interactivo va en componentes con `"use client"`.
- La escena 3D siempre se importa vía `SceneLoader` (`dynamic(..., { ssr: false })`):
  three.js no puede ejecutarse en el servidor.
- No agregar rutas nuevas sin considerar que `Scene.tsx` pone `body.style.overflow = "hidden"`.

## Deuda técnica conocida

- `metadata` está duplicada en `layout.tsx` y `page.tsx` (idéntica). Debería vivir solo en `layout.tsx`.
- Faltan Open Graph / Twitter cards y `metadataBase`.
- `next.config.ts` vacío: no hay `images.remotePatterns` ni headers.
- `package.json` se llama `"mi-proyecto"`.
