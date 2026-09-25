# 04 — Contenido (`content`)

**Archivos:** `app/data/{types,profile,projects,stack}.ts`, `public/`

Todo el texto del sitio vive acá. Idioma: **inglés**. **Fuente de verdad: el CV del autor**
(`public/CV_Matias_Speroni_DO.pdf`). Rol en el sitio: **Backend & DevOps Engineer**. Imagine Group:
05/2026 – 07/2026 (coincide con el CV).

| Archivo | Exporta | Notas |
|---------|---------|-------|
| `profile.ts` | `profile` | nombre, rol, disponibilidad, intro, `highlights`, about (≤ 3 párrafos), `facts` (≤ 4), avatar, email, `phone` + `phoneHref` (E.164, deben coincidir), links, `cvUrl`, `formspreeId`, URLs de repo/CI |
| `projects.ts` | `projects: Project[]` | slug, título, descripción, tech, imagen, github/siteLink, `inDevelopment` |
| `experience.ts` | `experience`, `education`, `certifications` | empresas (varios roles por empresa, más reciente primero) con highlights del CV; formación y certificaciones |
| `stack.ts` | `stack: StackGroup[]` | 9 grupos que siguen los "Technical skills" del CV; nombre + logo opcional + `detail` opcional (ej. servicios de AWS/Azure/GCP); sin niveles |

## `public/`

| Ruta | Contenido |
|------|-----------|
| `avatar.jpg` | foto del About |
| `projects/<slug>.{png,jpg}` | screenshot de cada proyecto (nombre = slug) |
| `stack/<tecnología>.svg` | logos del stack (kebab-case). Los nuevos vienen de Simple Icons (CC0, `cdn.jsdelivr.net/npm/simple-icons@13/icons/<slug>.svg`) con `fill` del color de marca |
| `CV_Matias_Speroni_DO.pdf` | CV descargable (lo sube el autor); reemplazarlo con el mismo nombre cuando cambie el CV |

## Reglas

- No inventar métricas, fechas, empleadores, certificaciones ni uso de herramientas: todo sale del CV.
- El stack **no muestra niveles de dominio** ni notas de "learning" (decisión del autor): solo nombre y logo.
- Si el CV cambia, actualizar `public/CV_Matias_Speroni_DO.pdf` **y** los datos en el mismo commit para que no se contradigan.
- Dato desconocido → `"[COMPLETAR: …]"`. **CI corre `check:placeholders --strict`**: un placeholder rompe el build a propósito.

## Integridad

`app/data/data.test.ts` valida: URLs https, **que cada imagen/logo/avatar/CV exista en `public/`**,
teléfono en E.164 y coherente con el formato visible, slugs únicos, descripciones y tech presentes,
experiencia con roles y períodos, grupos del stack sin duplicados, about y facts cortos.

## Deuda técnica conocida

- Algunos screenshots pesan > 1 MB (se sirven optimizados por `next/image`, pero conviene recomprimirlos).
