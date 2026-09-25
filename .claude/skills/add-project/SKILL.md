---
name: add-project
description: Agrega, reemplaza o edita un proyecto de la sección Projects (app/data/projects.ts + screenshot en public/projects). Usar cuando el usuario pida "agregá este proyecto", "sacá X", "actualizá la descripción de Y".
---

# add-project

Contexto: `docs/ai/04-content.md`.

## 1. Reunir datos (no inventar)

Pedí lo que falte:
- título y descripción (1–2 frases, inglés)
- tecnologías (las más relevantes primero)
- repo público y/o sitio en vivo (al menos uno)
- screenshot
- ¿está en desarrollo? → `inDevelopment: true` (badge "In development")

## 2. Imagen

- Guardala como `public/projects/<slug>.png|jpg` (slug en kebab-case = nombre del archivo).
- Horizontal (se muestra en 16:10 recortada desde arriba), idealmente < 500 KB.
- `next/image` la optimiza; aun así, recomprimí las muy pesadas.

## 3. Editar `app/data/projects.ts`

```ts
{
  slug: "kebab-case",
  title: "…",
  description: "…",
  tech: ["…"],
  image: "/projects/<slug>.png",
  github: "https://github.com/…",   // omitir si no hay
  siteLink: "https://…",            // omitir si no hay
  inDevelopment: true,              // omitir si no aplica
},
```

El orden del array es el orden en la grilla (3 columnas en desktop). Si el proyecto suma una
tecnología nueva que el autor usó, agregala también a `app/data/stack.ts` (con logo en `public/stack/` si hay).

## 4. Verificar y commitear

- `npm test` (verifica que la imagen exista) → `npm run build` → `npm run test:e2e` (verifica que cargue).
- `git-step`, capa `content`: `feat(content): add <title> project`.
