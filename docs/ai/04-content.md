# 04 — Contenido (`content`)

**Archivos:** `app/data/{types,profile,projects,stack,experience,source,media}.ts`, `public/`

Todo el texto del sitio vive acá. Idioma: **inglés**. **Fuente de verdad: el CV del autor**
(`public/CV_Matias_Speroni_DO.pdf`). Rol en el sitio: **Backend & DevOps Engineer**. Imagine Group:
05/2026 – 07/2026 (coincide con el CV).

| Archivo | Exporta | Notas |
|---------|---------|-------|
| `profile.ts` | `profile` | nombre, rol, disponibilidad, intro, `highlights`, about (≤ 3 párrafos), `facts` (≤ 4), avatar, email, `phone` + `phoneHref` (E.164, deben coincidir), links, `cvUrl`, `formspreeId`, URLs de repo/CI |
| `projects.ts` | `projects: Project[]` | slug, título, descripción, tech, imagen, github/siteLink, `inDevelopment` |
| `experience.ts` | `experience`, `education`, `certifications` | empresas (varios roles por empresa, más reciente primero) con highlights del CV; formación y certificaciones |
| `stack.ts` | `stack: StackGroup[]` | 9 grupos que siguen los "Technical skills" del CV; nombre + logo opcional + `detail` opcional (ej. servicios de AWS/Azure/GCP); sin niveles |
| `media.ts` | `heroFootage`, `circuitFootage` | video de fondo: poster, loop (mp4/webm), scrub (keyframes densos) y `source` (crédito) |
| `source.ts` | `BUILD_MODULES`, `HERO_TAGLINE`, `PIPELINE`, `SECTION_PATHS` | copy de la ambientación: módulos de la pantalla de build (**archivos reales del repo**), tagline del hero, pipeline (**solo jobs de `ci.yml`**), ruta mostrada sobre cada sección |

## `public/`

| Ruta | Contenido |
|------|-----------|
| `avatar.jpg` | foto del About |
| `projects/<slug>.{png,jpg}` | screenshot de cada proyecto (nombre = slug) |
| `stack/<tecnología>.svg` | logos del stack (kebab-case). Los nuevos vienen de Simple Icons (CC0, `cdn.jsdelivr.net/npm/simple-icons@13/icons/<slug>.svg`) con `fill` del color de marca |
| `CV_Matias_Speroni_DO.pdf` | CV descargable (lo sube el autor); reemplazarlo con el mismo nombre cuando cambie el CV |
| `media/` | video de fondo (declarado en `media.ts`): `datacenter-scrub`, `datacenter-loop`, `circuit-loop` (`.mp4` + `.webm`) y posters `.jpg` |

## Video (`media.ts` + `public/media/`)

Clips de stock de **Mixkit** (licencia gratuita de Mixkit, uso comercial sin atribución obligatoria; el autor
debe confirmar los términos vigentes en mixkit.co/license). Cada `FootageClip` guarda su `source`.

| Clip | Origen | Uso |
|------|--------|-----|
| `datacenter-*` | Mixkit 23219 "Long hallway in data center" (primeros 13 s / 9 s el loop) | Hero |
| `circuit-*` | Mixkit 47051 "High tech circuit board with processor" (10 s) | Contact (en ASCII) |

Re-encodear (ffmpeg; `npm i --no-save ffmpeg-static` da un binario):

```bash
# scrub: keyframe cada 8 frames para buscar rápido con el scroll
ffmpeg -i in.mp4 -t 13 -vf scale=1280:-2 -c:v libx264 -preset slow -crf 31 -g 8 -keyint_min 8 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart -an datacenter-scrub.mp4
ffmpeg -i in.mp4 -t 13 -vf scale=1280:-2 -c:v libvpx-vp9 -b:v 0 -crf 50 -g 8 -row-mt 1 -an datacenter-scrub.webm
# loop liviano (mobile / fondo)
ffmpeg -i in.mp4 -t 9 -vf scale=854:-2 -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart -an datacenter-loop.mp4
# poster
ffmpeg -i in.mp4 -frames:v 1 -vf scale=1280:-2 -q:v 6 datacenter-poster.jpg
```

Presupuesto: scrub ≤ 2.5 MB, loops ≤ 700 KB, posters ≤ 100 KB. El código de `Source` no es copy: se genera de `profile` y `stack` (`lib/source-code.ts`).

## Reglas

- No inventar métricas, fechas, empleadores, certificaciones ni uso de herramientas: todo sale del CV.
- El stack **no muestra niveles de dominio** ni notas de "learning" (decisión del autor): solo nombre y logo.
- Si el CV cambia, actualizar `public/CV_Matias_Speroni_DO.pdf` **y** los datos en el mismo commit para que no se contradigan.
- Dato desconocido → `"[COMPLETAR: …]"`. **CI corre `check:placeholders --strict`**: un placeholder rompe el build a propósito.

## Integridad

`app/data/data.test.ts` valida: URLs https, **que cada imagen/logo/avatar/CV y cada video/poster de `media.ts` exista en `public/`**, que cada módulo del build exista en el repo y que **cada etapa del pipeline exista en `ci.yml`**,
teléfono en E.164 y coherente con el formato visible, slugs únicos, descripciones y tech presentes,
experiencia con roles y períodos, grupos del stack sin duplicados, about y facts cortos.

## Deuda técnica conocida

- Algunos screenshots pesan > 1 MB (se sirven optimizados por `next/image`, pero conviene recomprimirlos).
