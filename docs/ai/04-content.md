# 04 — Contenido (`content`)

**Archivos:** `app/data/{types,profile,projects,stack}.ts`, `public/`

Todo el texto del sitio vive acá. Idioma: **inglés**. **Fuente de verdad: el CV del autor**
(`public/cv.pdf`). Rol en el sitio: **Backend & DevOps Engineer**. Imagine Group se muestra como
experiencia terminada ("05/2026 – 2026") por indicación del autor, aunque el PDF todavía dice "Present".

| Archivo | Exporta | Notas |
|---------|---------|-------|
| `profile.ts` | `profile` | nombre, rol, disponibilidad, intro, `highlights`, about (≤ 3 párrafos), `facts` (≤ 4), avatar, email, `phone` + `phoneHref` (E.164, deben coincidir), links, `cvUrl`, `formspreeId`, URLs de repo/CI |
| `projects.ts` | `projects: Project[]` | slug, título, descripción, tech, imagen, github/siteLink, `inDevelopment` |
| `experience.ts` | `experience`, `education`, `certifications` | empresas (varios roles por empresa, más reciente primero) con highlights del CV; formación y certificaciones |
| `stack.ts` | `stack: StackGroup[]` | 7 grupos del CV; `level` (Basic/Intermediate/Advanced) **solo si el CV lo indica**; logo opcional |

## `public/`

| Ruta | Contenido |
|------|-----------|
| `avatar.jpg` | foto del About |
| `projects/<slug>.{png,jpg}` | screenshot de cada proyecto (nombre = slug) |
| `stack/<tecnología>.svg` | logos del stack (kebab-case) |
| `cv.pdf` | CV descargable (copia de `Desktop/devop/CV_Matias_Speroni.pdf`); reemplazarlo cuando cambie el CV |

## Reglas

- No inventar métricas, fechas, empleadores, certificaciones ni uso de herramientas: todo sale del CV.
- Niveles del stack = autoevaluación del CV; no agregar niveles que el CV no tenga ni notas de "learning".
- Si el CV cambia, actualizar `public/cv.pdf` **y** los datos en el mismo commit para que no se contradigan.
- Dato desconocido → `"[COMPLETAR: …]"`. **CI corre `check:placeholders --strict`**: un placeholder rompe el build a propósito.

## Integridad

`app/data/data.test.ts` valida: URLs https, **que cada imagen/logo/avatar/CV exista en `public/`**,
teléfono en E.164 y coherente con el formato visible, slugs únicos, descripciones y tech presentes,
experiencia con roles y períodos, niveles válidos, grupos del stack sin duplicados, about y facts cortos.

## Deuda técnica conocida

- Algunos screenshots pesan > 1 MB (se sirven optimizados por `next/image`, pero conviene recomprimirlos).
