---
name: pipeline-page
description: Agrega, ajusta o depura el concepto "la página es un pipeline" del portfolio — etapas (STAGES), la línea con el job que viaja (Spine), los nodos pending/running/passed (StageNode), los logs calculados de los datos (StageLog + lib/stage-logs), el badge del header y el stack con física. Usar para sumar o mover una etapa, cambiar sus logs o arreglar el seguimiento del scroll, manteniendo datos reales, accesibilidad y tests.
---

# pipeline-page

## Contexto (leer primero)

Portfolio de Matias Speroni (Backend & DevOps). Next.js 16, React 19, Tailwind 4, GSAP (revelados),
matter-js (física).

Concepto **elegido por el autor**: la página es un **pipeline de CI/CD**.
- Una línea luminosa recorre la página y cada sección es una etapa: `checkout` → `install` → `build` → `test` → `release` → `deploy`.
- Al leer, un job viaja por la línea; cada etapa pasa de pending a running (ámbar) y a passed (verde) e imprime su log.
- El header muestra el estado en vivo.

Antecedente: un diseño anterior ("Companion") calcaba demasiado ignaciobrenas.vercel.app y se descartó.
**No reintroducir** panel narrador fijo, pastillas numeradas 01–05, letra manuscrita con subrayado,
hub de perfiles ni botones Gmail/Outlook.

Docs de capa:
- `docs/ai/02-design-system.md`;
- `docs/ai/03-ui.md`;
- `docs/ai/04-content.md` (`app/data/pipeline.ts`).

## Mapa

| Pieza | Lógica pura (testeada) | UI |
|-------|-----------------------|----|
| Etapas | `app/data/pipeline.ts` `STAGES` (id de sección, `step`, `title`, `meaning`) | `pipeline/Stage` (sección + nodo + etiqueta + título + log) |
| Estado por scroll | `lib/pipeline-state.ts` `stageStates(rects, línea, alFinal)` y `summarize` | `lib/pipeline-progress.ts` (`usePipeline`): un listener de scroll pasivo con rAF; publica `{progress, states}` solo si cambió |
| Línea + job | — | `pipeline/Spine`: hairline, relleno que termina justo en la línea de lectura (45% del viewport) y el job `sticky` |
| Nodos | — | `pipeline/StageNode`: anillo punteado / ámbar girando / check verde; `data-state` y `sr-only` "Stage X: estado" |
| Logs | `lib/stage-logs.ts` `stageLogs(content)`: conteos y nombres reales por etapa | `pipeline/StageLog`: vacío hasta que la etapa corre, después imprime línea por línea y queda |
| Header | `summarize` | `pipeline/PipelineBadge`: "running 3/6 · build" → "passed 6/6" + barra |
| Contenido | `lib/tags.ts` (`techMentioned`, `findTech`) | `sections/Checkout`, `Install` (+ `pipeline/StackPlayground`), `Build`, `Test` (experiencia + certificaciones), `Release`, `Deploy` |

## Reglas

1. **Datos reales:** los logs se calculan de `app/data` (cantidad de tecnologías, proyectos, empresas, roles, certificaciones, "since …"). Los nombres de etapa son metáfora, no afirmaciones sobre el CI. Nada de duraciones o métricas inventadas.
2. **Accesibilidad**
   - Los logs y la línea son `aria-hidden`; el contenido real está en la sección.
   - Los nodos anuncian su estado con texto.
   - El h1 es el título de la etapa `checkout`.
3. **Reduced motion y sin JS:** los logs se ven completos; el seguimiento por scroll sigue funcionando (no es animación autónoma). La única animación decorativa (spinner, pulso) se apaga.
4. **Rendimiento:** un solo listener de scroll (pasivo + rAF) para todo. matter-js se carga al ver la caja.
5. **Tests**
   - `lib/pipeline-state.test.ts`: reglas de estado y resumen.
   - `lib/stage-logs.test.ts`: logs con datos reales; tags.
   - `page.test.tsx`: etapas en orden con su log.
   - E2E: running → passed al bajar, el log imprime, "passed 6/6" al final.

## Agregar o mover una etapa

1. Entrada en `STAGES` (orden = orden de la página) e id en `NAV_ITEMS` si va en el header.
2. Su log en `stageLogs` (solo datos reales) y su test.
3. Su contenido en `app/page.tsx` (`CONTENT[id]`).
4. Actualizar el conteo del E2E ("running 3/6", "passed 6/6") si cambia el total.

## Depurar

- **Un nodo no cambia de estado:** ¿la sección tiene `data-stage`? (lo pone `<Stage>`). La línea de lectura es `READING_LINE` (0.45).
- **El relleno no coincide con el job:** el relleno se mide en `Spine` contra la caja de la línea; el job es `sticky` a `top-[45vh]`. Ambos tienen que usar el mismo `READING_LINE`.
- **La última etapa nunca pasa:** al final de la página (`progress > 0.995`) todas pasan; revisar que la página tenga scroll suficiente.
