---
name: add-project
description: Agrega, reemplaza o edita un proyecto en la sección Projects del portfolio (app/data/projects.ts + imagen en public/). Usar cuando el usuario pida "agregá este proyecto", "sacá X", "actualizá la descripción de Y".
---

# add-project

Contexto: `docs/ai/06-data-content.md`.

## 1. Reunir datos

Pedir lo que falte (no inventar URLs):
- `title`, `description` (1–2 frases, en inglés), `tech` (las 2 más importantes primero)
- `github` y/o `siteLink` (opcionales, URL completa)
- imagen (ruta a un archivo existente o a copiar a `public/`)
- ¿está en desarrollo? → `inDevelopment: true` (badge WIP)

## 2. Chequear capacidad del grid

`ProjectsContent.tsx` usa un grid **fijo 3×2 → máximo 6 proyectos**. Contar los actuales:

- Si hay < 6 → agregar.
- Si hay 6 → **preguntar** qué proyecto reemplazar, o si se prefiere rediseñar el grid
  (eso es otra tarea para `frontend-developer`, en su propio paso).

## 3. Imagen

- Copiar a `public/` con nombre `kebab-case` sin espacios (ej. `public/study-bot.jpg`).
- Horizontal, ≥ 800px de ancho, idealmente < 300 KB.
- Verificar que existe: `ls public/<archivo>`.
- Si no hay imagen, `image: null` → la card muestra la inicial sobre gradiente.

## 4. Editar `app/data/projects.ts`

```ts
{
  id: <siguiente id único>,
  title: "…",
  description: "…",
  tech: ["Más relevante", "Segunda", "…"],
  github: "https://github.com/…",      // omitir si no hay
  siteLink: "https://…",               // omitir si no hay
  image: "/<archivo>",
  inDevelopment: true,                 // omitir si no aplica
},
```

El orden del array es el orden en pantalla (izq→der, arriba→abajo).

## 5. Verificar y commitear

- `npm run lint && npm run build`
- En `npm run dev`: la card se ve, la descripción no se corta raro, los botones abren el link correcto.
- Commit con la skill `git-step`: `feat: add <title> to projects` (o `chore: update …`).
