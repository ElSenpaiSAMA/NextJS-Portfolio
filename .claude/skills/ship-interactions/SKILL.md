---
name: ship-interactions
description: Agrega, ajusta o depura las piezas interactivas del portfolio "Ship it." — el botón Deploy con el pipeline real (DeployWidget + lib/deploy), el editor en vivo portfolio.config.ts (ConfigEditor + lib/site-config + config-init), y el stack con física (StackPlayground, matter-js). Usar cuando se pida una interacción nueva, cambiar una existente o arreglar una rota, manteniendo seguridad, accesibilidad, reduced motion y tests.
---

# ship-interactions

## Contexto (leer primero)

Portfolio de Matias Speroni (Backend & DevOps). Next.js 16, React 19, Tailwind 4, GSAP (solo revelados),
matter-js (física).

Dirección **"Ship it."**: el visitante **opera** el sitio como lo haría un DevOps. El autor pidió que lo
sorprendieran, sin video, con un sitio enfocado a programación.

Docs de capa:
- `docs/ai/02-design-system.md` (tokens, temas);
- `docs/ai/03-ui.md` (componentes);
- `docs/ai/04-content.md` (copy en `app/data/ship.ts`).

**Principio:** cada interacción es algo que un desarrollador hace de verdad (desplegar, editar una config,
jugar con dependencias), con datos reales del CV y del repo. Nada inventado: los logs del deploy salen de
conteos reales; las etapas son las de `ci.yml`.

## Mapa

| Pieza | Lógica pura (testeada) | UI (client) |
|-------|-----------------------|-------------|
| Deploy | `lib/deploy.ts` → `buildDeployScript(stages, content)`: pasos con duración y log calculado de `projects`/`stack`/`experience` | `components/ship/DeployWidget.tsx`: estados pending/running/passed, log, barra, `role="status"` con el tiempo **medido** (`performance.now`) |
| Config en vivo | `lib/site-config.ts`: `parseConfig` (gramática estricta, **nunca eval**), `serializeConfig`, `configToCss`, `highlightConfig` | `components/ship/ConfigEditor.tsx`: textarea transparente sobre `<pre>` resaltado, panel Problems, presets; aplica en `<html>` y guarda en localStorage |
| Sin flash al recargar | `lib/config-init.ts`: `CONFIG_INIT_SCRIPT` (script inline en `<head>`, **revalida** cada valor) | `app/layout.tsx` |
| Física | — | `components/ship/StackPlayground.tsx`: matter-js por import dinámico al entrar en pantalla |

## Reglas

1. **Seguridad:** la config es input del usuario (textarea y localStorage).
   - Se parsea con regex por línea y se valida cada valor: hex, enums, rango entero.
   - No hay `eval`, `Function` ni `innerHTML`.
   - Solo se escriben variables CSS y atributos conocidos (`--accent`, `--r`, `data-theme`, `data-font`).
2. **Accesibilidad**
   - El log del deploy es `aria-hidden`; el resultado se anuncia en un único `role="status"`.
   - El textarea tiene `aria-label`; los Problems están en `aria-live="polite"`.
   - La caja de física es `aria-hidden`: la lista agrupada del stack, debajo, es el contenido real.
   - Contraste: `ok` es `#166534` porque `#15803d` no llega a 4.5:1 sobre `surface-2`.
3. **Reduced motion**
   - Deploy: muestra la corrida terminada al instante.
   - Física: los bloques quedan en un `flex-wrap` estático; el motor no se carga.
   - Revelados: no hay.
4. **Física**
   - Solo arranca al entrar en pantalla y se pausa fuera.
   - matter-js mete listeners de `wheel`/`touch` con `preventDefault`: se quitan los de wheel. El arrastre solo se activa con puntero fino; en touch, tocar la caja la sacude.
5. **Hidratación**
   - El servidor siempre renderiza los defaults.
   - Lo guardado se aplica antes de pintar con el script inline, y el editor lo lee en un `requestAnimationFrame`.
   - El React Compiler prohíbe `setState` sincrónico en effects.
6. **Tests**
   - Lógica en `lib/*.test.ts`.
   - E2E en `e2e/home.spec.ts`:
     - el deploy termina y se puede redeployar;
     - editar la config cambia `data-theme`/`--r`, reporta problemas y persiste al recargar;
     - los bloques reciben `transform`.

## Agregar una opción a portfolio.config

1. `SiteConfig` + `DEFAULT_CONFIG` + validación en `parseConfig` + línea en `serializeConfig` (`lib/site-config.ts`).
2. Mapear en `configToCss` y revalidar en `CONFIG_INIT_SCRIPT`.
3. Usarla en CSS (`globals.css`, variable o selector `:root[data-…]`).
4. Tests: round-trip, valor inválido → problema, mapeo CSS.
5. Documentar en `docs/ai/02` y en esta skill.

## Depurar

- **El tema no persiste:** ¿localStorage bloqueado? (modo privado). El cambio igual aplica en la visita.
- **Los bloques no caen:** ¿la sección se vio al 25 %? ¿Hay movimiento permitido? ¿La caja tiene alto? (`h-[36rem] sm:h-[30rem]` cuando hay movimiento).
- **El scroll se traba sobre la caja:** algún listener de matter-js volvió a quedar activo. Revisar `Mouse.create`.
- **Deploy "en vivo" en tests de jsdom:** `matchMedia` no matchea, así que se renderiza el estado inicial (stages listadas, botón Deploy).
