# 04 — Contenido (`content`)

**Archivos:** `app/data/{types,profile,projects,stack}.ts`, `public/`

Todo el texto del sitio vive acá. Idioma: **inglés**. Es el contenido original del autor, actualizado:
ya no trabaja en Imagine ("Previously at Imagine") y el rol es **Backend & DevOps**.

| Archivo | Exporta | Notas |
|---------|---------|-------|
| `profile.ts` | `profile` | nombre, rol, disponibilidad, intro, `highlights`, about (≤ 3 párrafos), `facts` (≤ 4), avatar, email, links, `cvUrl` (null oculta el botón), `formspreeId`, URLs de repo/CI |
| `projects.ts` | `projects: Project[]` | slug, título, descripción, tech, imagen, github/siteLink, `inDevelopment` |
| `stack.ts` | `stack: StackGroup[]` | grupos (Backend, Frontend, DevOps & Tooling, Databases, Data & AI) con logo opcional y `note` |

## `public/`

| Ruta | Contenido |
|------|-----------|
| `avatar.jpg` | foto del About |
| `projects/<slug>.{png,jpg}` | screenshot de cada proyecto (nombre = slug) |
| `stack/<tecnología>.svg` | logos del stack (kebab-case) |
| `cv.pdf` | (pendiente) activar con `profile.cvUrl = "/cv.pdf"` |

## Reglas

- No inventar métricas, fechas, empleadores, certificaciones ni uso de herramientas.
- Lo que se está aprendiendo va en la `note` del grupo (ej. "Learning next: Kubernetes, Terraform and AWS"), no como ítem del stack.
- Dato desconocido → `"[COMPLETAR: …]"`. **CI corre `check:placeholders --strict`**: un placeholder rompe el build a propósito.

## Integridad

`app/data/data.test.ts` valida: URLs https, **que cada imagen/logo/avatar/CV exista en `public/`**,
slugs únicos, descripciones y tech presentes, grupos del stack sin duplicados, about y facts cortos.

## Deuda técnica conocida

- Algunos screenshots pesan > 1 MB (se sirven optimizados por `next/image`, pero conviene recomprimirlos).
