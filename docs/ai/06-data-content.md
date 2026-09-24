# 06 — Datos y contenido

**Archivos:** `app/data/projects.ts`, `public/`, textos dentro de `sections/*Content.tsx`

## `projects.ts`

```ts
interface Project {
  id: number;              // único, orden de aparición
  title: string;
  description: string;     // se corta a 2 líneas en la card (line-clamp)
  tech: string[];          // solo se muestran los 2 primeros
  github?: string | null;
  siteLink?: string | null;
  image: string | null;    // ruta desde /public, ej "/Mira.png"; null → placeholder con inicial
  inDevelopment?: boolean; // muestra badge "WIP"
}
```

Proyectos actuales (6): Mira (WIP), Spotify Pipeline, Study Bot, Sala de Reservas,
Mundo del Libro, Portfolio.

### ⚠ Restricción de layout

`ProjectsContent` usa un grid **fijo de 3 columnas × 2 filas**. Hay exactamente 6
proyectos. Agregar un 7º lo desborda / comprime. Opciones: reemplazar uno, o
rediseñar el grid (tarea de frontend). Usá la skill `add-project`.

## Otro contenido hardcodeado

| Contenido | Dónde |
|-----------|-------|
| Nombre, rol, intro, "Currently at Imagine · Building Mira · Studying…" | `HeroContent.tsx` |
| Bio, `FACTS` (Based in / Role / Focus / Lang), `STACK_TABS` | `AboutContent.tsx` |
| Links de contacto (`CONTACT_LINKS`: email, GitHub, LinkedIn) | `ContactDrawer3D.tsx` |
| Nombre de la animación de carga (`WORD1`, `WORD2`) | `LoadingScreen.tsx` |
| Título / description SEO | `layout.tsx` (+ duplicado en `page.tsx`) |

Idioma del contenido público: **inglés**.

## `public/`

- Imágenes de proyectos: `Mira.png`, `top10.png`, `study.jpg`, `salareserva.jpg`, `mundo del libro.png`, `pagina.png`.
- Avatar: `104552415.jpg` (usado en About). `avatar.svg`, `icono.jpg`, `tlom.png` sin uso aparente.
- `public/tecnologias/*.svg`: logos de tecnologías — **actualmente sin uso** (el stack se muestra como texto).

### Convenciones para assets nuevos

- Nombres en `kebab-case` sin espacios (hay legacy con espacios: `mundo del libro.png`).
- Imágenes de cards: horizontal, ≥ 800px de ancho, peso < 300 KB (webp/jpg).

## Deuda técnica conocida

- Datos de About y contacto viven dentro de componentes: extraer a `app/data/profile.ts` si crecen.
- Assets sin uso en `public/`.
- `id: number` manual; podría ser `slug: string`.
