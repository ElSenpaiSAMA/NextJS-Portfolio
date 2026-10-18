# 04 — Contenido (`content`)

**Archivos:** `app/data/{types,profile,projects,stack,experience,media}.ts`, `public/`

Todo el texto del sitio vive acá. Idioma: **inglés**. **Fuente de verdad: el CV del autor**
(`public/CV_Matias_Speroni_DO.pdf`). Rol en el sitio: **Backend & DevOps Engineer**. Imagine Group:
05/2026 – 07/2026 (coincide con el CV).

| Archivo | Exporta | Notas |
|---------|---------|-------|
| `profile.ts` | `profile` | nombre, rol, disponibilidad, intro, `highlights`, about (≤ 3 párrafos), `facts` (≤ 4), avatar, email, `phone` + `phoneHref` (E.164, deben coincidir), links, `cvUrl`, `formspreeId`, URLs de repo/CI |
| `projects.ts` | `projects: Project[]` | slug, título, descripción, tech, imagen, github/siteLink, `inDevelopment` |
| `experience.ts` | `experience`, `education`, `certifications` | empresas (varios roles por empresa, más reciente primero) con highlights del CV; formación y certificaciones |
| `stack.ts` | `stack: StackGroup[]` | 9 grupos que siguen los "Technical skills" del CV; nombre + logo opcional + `detail` opcional (ej. servicios de AWS/Azure/GCP); sin niveles |
| `media.ts` | `heroFootage`, `contactFootage` | video de fondo: poster, loop (mp4/webm), scrub opcional y `source` (crédito) |

## `public/`

| Ruta | Contenido |
|------|-----------|
| `avatar.jpg` | foto del About |
| `projects/<slug>.{png,jpg}` | screenshot de cada proyecto (nombre = slug) |
| `stack/<tecnología>.svg` | logos del stack (kebab-case). Los nuevos vienen de Simple Icons (CC0, `cdn.jsdelivr.net/npm/simple-icons@13/icons/<slug>.svg`) con `fill` del color de marca |
| `CV_Matias_Speroni_DO.pdf` | CV descargable (lo sube el autor); reemplazarlo con el mismo nombre cuando cambie el CV |
| `media/` | video de fondo (declarado en `app/data/media.ts`): `hero-scrub`, `hero-loop`, `ship` (`.mp4` + `.webm`) y posters `.jpg` |

## Video (`media.ts` + `public/media/`)

Clips de stock de **Mixkit** (licencia gratuita de Mixkit, uso comercial sin atribución obligatoria;
el autor debe confirmar los términos vigentes en mixkit.co/license). Cada `FootageClip` guarda su
`source` (título + URL) para no perder el crédito.

| Clip | Origen | Uso |
|------|--------|-----|
| `hero-*` | Mixkit 36318 "Large container area working at night" (8 s, 25 fps) | Hero |
| `ship` | Mixkit 35869 "Flying over a cargo ship leaving a port" (recorte 6 s → 18 s) | Contact |

Re-encodear (ffmpeg; `npm i --no-save ffmpeg-static` da un binario):

```bash
# scrub: keyframe cada 8 frames para buscar rápido con el scroll
ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 30 -g 8 -keyint_min 8 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart -an hero-scrub.mp4
ffmpeg -i in.mp4 -c:v libvpx-vp9 -b:v 0 -crf 50 -g 8 -an hero-scrub.webm
# loop liviano para mobile / fondo
ffmpeg -i in.mp4 -vf scale=854:-2 -c:v libx264 -crf 30 -pix_fmt yuv420p -movflags +faststart -an hero-loop.mp4
# poster
ffmpeg -ss 4 -i in.mp4 -frames:v 1 -q:v 7 hero-poster.jpg
```

Presupuesto: scrub ≤ 4 MB, loops ≤ 1 MB, posters ≤ 160 KB.

## Reglas

- No inventar métricas, fechas, empleadores, certificaciones ni uso de herramientas: todo sale del CV.
- El stack **no muestra niveles de dominio** ni notas de "learning" (decisión del autor): solo nombre y logo.
- Si el CV cambia, actualizar `public/CV_Matias_Speroni_DO.pdf` **y** los datos en el mismo commit para que no se contradigan.
- Dato desconocido → `"[COMPLETAR: …]"`. **CI corre `check:placeholders --strict`**: un placeholder rompe el build a propósito.

## Integridad

`app/data/data.test.ts` valida: URLs https, **que cada imagen/logo/avatar/CV y cada video/poster de `media.ts` exista en `public/`**,
teléfono en E.164 y coherente con el formato visible, slugs únicos, descripciones y tech presentes,
experiencia con roles y períodos, grupos del stack sin duplicados, about y facts cortos.

## Deuda técnica conocida

- Algunos screenshots pesan > 1 MB (se sirven optimizados por `next/image`, pero conviene recomprimirlos).
