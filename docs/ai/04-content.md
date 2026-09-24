# 04 — Contenido (`content`)

**Archivos:** `app/data/*.ts` (tipos en `types.ts`), `public/`

Todo el texto del sitio vive acá. Idioma: **inglés**. Tono: profesional, directo, sin relleno
("passionate about technology" prohibido). Nivel junior honesto.

| Archivo | Exporta | Notas |
|---------|---------|-------|
| `profile.ts` | `profile` | nombre, rol, propuesta de valor, links, `cvUrl` (null oculta el botón), about (máx. 3 párrafos), `formspreeId`, URLs de repo/CI/badge |
| `skills.ts` | `skillCategories`, labels de nivel | nivel `used` (proyecto público, nombrarlo en `context`) · `basic` · `learning` (roadmap) |
| `projects.ts` | `projects: CaseStudy[]` | problema → solución → arquitectura → stack → deploy → resultado → `nextSteps` (gaps honestos). `featured: true` = case study completo |
| `roadmap.ts` | `roadmap` | proyectos futuros ordenados por impacto; al terminar uno, pasa a `projects.ts` |
| `experience.ts` | `experience`, `education` | cortos, orientados al rol |

## Reglas de honestidad

- No inventar métricas, fechas, empleadores, certificaciones ni uso de herramientas.
- Herramientas que falten para el rol → nivel `learning` y ligadas a un ítem del roadmap.
- Dato desconocido → `"[COMPLETAR: qué falta]"`. `npm run check:placeholders` los lista; CI los reporta como warnings.
- Métricas solo si son verificables (ej. los 14 snapshots del Spotify Pipeline se cuentan en el repo).

## `public/`

Vacío salvo lo que se agregue. CV: `public/cv.pdf` + `profile.cvUrl = "/cv.pdf"`.

## Integridad

`app/data/data.test.ts` valida: URLs https, slugs únicos y URL-safe,
case studies completos, `findProject`, Spotify Pipeline y portfolio como featured, skills sin duplicados, about ≤ 3 párrafos.

## Deuda técnica conocida

- Placeholders pendientes en `experience.ts`, `projects.ts` (Study Bot, Sala de Reservas) y `skills.ts` (Supabase).
- Mira quedó fuera hasta confirmar si hay repo/demo compartible.
