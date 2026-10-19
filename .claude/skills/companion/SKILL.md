---
name: companion
description: Agrega, ajusta o depura las piezas interactivas del portfolio "Companion" — el panel compañero fijo (narración por sección, preguntas del CV, deploy), el seguimiento de la sección en vista (nav 01–05), las etiquetas de tecnología detectadas del texto, el stack con física y los botones de contacto. Usar cuando se pida una interacción nueva, cambiar una existente o arreglar una rota, manteniendo datos reales, accesibilidad, reduced motion y tests.
---

# companion

## Contexto (leer primero)

Portfolio de Matias Speroni (Backend & DevOps). Next.js 16, React 19, Tailwind 4, GSAP (revelados),
matter-js (física).

Dirección **"Companion"**: fondo negro con brillo azul y un **panel compañero fijo** a la derecha que
acompaña la lectura. El autor tomó de inspiración ignaciobrenas.vercel.app (sprite que narra, secciones
01–05, tarjetas ricas, frase manuscrita) y pidió mejorarlo con los tonos negros y lo ya construido.

Docs de capa:
- `docs/ai/02-design-system.md` (tokens);
- `docs/ai/03-ui.md` (componentes).

**Principio:** el compañero nunca inventa. Todo lo que dice se arma en build desde `app/data`
(`lib/companion.ts`). Sin IA externa ni respuestas libres.

## Mapa

| Pieza | Lógica pura (testeada) | UI |
|-------|-----------------------|----|
| Narración por sección | `buildNarration(content)` → una línea por `CompanionSection` (top, experience, projects, stack, certifications, about, contact) | `CompanionPanel` pestaña Guide + `Typewriter` |
| Preguntas rápidas | `buildAnswers(content)` → `{question, answer}` del CV | pestaña Ask (chips + respuesta tipeada) |
| Deploy | `lib/deploy.ts` `buildDeployScript` (etapas reales de `ci.yml`, conteos reales) | pestaña Deploy → `ship/DeployWidget` (se monta al abrir la pestaña) |
| Sección en vista | — | `lib/active-section.ts` (`useActiveSection`): un solo `IntersectionObserver` para el header y el compañero; las secciones se marcan con `data-companion-section` |
| "Next ↓" | `SECTION_ORDER` | botón bajo el globo |
| Etiquetas de tecnología | `lib/tags.ts` `techMentioned(textos, stack)` (palabra completa, ambos lados de "C# / .NET", ignora genéricos) y `findTech` | `ui/TechTag` (logo + nombre) en Experience y Projects |
| Física | — | `ship/StackPlayground` (matter-js dinámico, pausa fuera de pantalla) |
| Contacto | — | Gmail / Outlook / `mailto:` + `CopyButton` (clipboard con aviso "Copied ✓") |
| Desktop / móvil | — | `Companion`: `<aside>` sticky (≥ lg) o botón "Ask Matias" + `<dialog>` nativo |

## Reglas

1. **Datos reales:** nada de cifras o frases inventadas.
   - Si una afirmación depende de los datos, se calcula. Por ejemplo, "all in Barcelona" solo si todas las empresas comparten ubicación.
   - El estado de una experiencia ("Current"/"Completed") sale del período: "Present" = Current.
2. **Accesibilidad**
   - `Typewriter` muestra el texto tipeado `aria-hidden` y pone el texto completo en un `aria-live="polite"` `sr-only`, así el lector de pantalla no lo deletrea.
   - Pestañas con `role="tablist"`, `tab`, `tabpanel` y ids prefijados (`desk-`, `sheet-`), porque hay dos instancias.
   - La nav compacta se llama "Jump to" para no chocar con "Sections" en los tests.
   - Botones llenos con texto blanco usan `bg-accent-strong` (`#3366ff`, 4.7:1), no `accent` (`#5b8cff`, solo para brillo, bordes y texto).
3. **Reduced motion:** sin tipeo (texto completo), sin pulso, flotado ni subrayado animado, sin física; el deploy aparece terminado.
4. **Rendimiento**
   - El deploy solo existe con su pestaña abierta.
   - matter-js se carga al ver la caja.
   - El avatar del compañero es `loading="eager"`: en móvil vive en un panel oculto y, si fuera lazy, nunca cargaría.
5. **Tests**
   - `lib/companion.test.ts`: narración y respuestas con datos reales; tags por palabra completa.
   - `page.test.tsx`: Guide, Ask y Deploy del compañero.
   - E2E: la narración cambia al bajar (desktop); en el sheet de móvil se pregunta y se despliega.

## Agregar una pregunta o una sección

- **Pregunta:** agregarla en `buildAnswers` usando solo campos de `CompanionContent`, más un test que verifique un dato real en la respuesta.
- **Sección nueva:**
  1. `id` en `NAV_ITEMS` (`lib/site.ts`) si va en la nav;
  2. `data-companion-section` (lo pone `<Section>`);
  3. su línea en `buildNarration` y en `CompanionSection`;
  4. su lugar en `SECTION_ORDER`;
  5. la etiqueta sale de `NAV_ITEMS`.

## Depurar

- **El compañero no cambia de sección:** ¿la sección tiene `data-companion-section`? La "línea de lectura" es la franja entre 35% y 40% del viewport (`rootMargin`).
- **Una tecnología no aparece como etiqueta:** el texto debe nombrarla igual que en `stack.ts` (respetando mayúsculas), o está en `SKIP` por genérica.
- **"every image loads" falla en móvil:** alguna imagen está dentro de algo oculto y es lazy. Hacerla eager o sacarla del DOM oculto.
