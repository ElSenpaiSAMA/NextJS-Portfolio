# 06 — Calidad y CI (`quality`)

**Archivos:** `vitest.config.mts`, `vitest.setup.ts`, `**/*.test.ts(x)`, `playwright.config.ts`, `e2e/**`,
`lighthouserc.json`, `.github/workflows/ci.yml`, `.github/dependabot.yml`, `scripts/`, `eslint.config.mjs`,
`tsconfig.json`, `package.json`, `.nvmrc`

## Comandos

```bash
npm run lint | typecheck | test | test:e2e | check:placeholders
npm run verify   # todo en orden de CI (requiere que el build pase)
```

## Unit / componentes (Vitest + jsdom)

Tests al lado del archivo (`*.test.ts(x)`). Cubren: schema de logs, logger, client logger
(envío, límite, fallback), contacto (validación, errores de Formspree, red caída), route `/api/log`,
integridad de datos (assets en `public/`, módulos del build que existen, **cada etapa del pipeline existe en `ci.yml`**), `site.test`, `ascii.test` (píxel → glifo, scramble), `source-code.test` (engineer.ts generado: datos reales, llaves balanceadas), `ContactForm`, `IntroScreen`
y la página completa (`page.test.tsx`: una h1, build log con todas las etapas, ASCII decorativo (canvas `aria-hidden`), engineer.ts con todo el stack, secciones de la nav, cada proyecto con imagen y links, stack completo, foto y facts, anclas, links externos, CV).

## E2E (Playwright, contra `next start`)

- Proyectos `desktop` (Desktop Chrome: video controlado por el scroll) y `mobile` (Pixel 7: loop). `workers` limitados (2 en CI, 4 local) para que varios navegadores decodificando video no saturen la CPU.
- `vitest.setup.ts` simula `matchMedia` sin matches (no corren GSAP, Lenis, scrub ni cursor), `play`/`pause`/`load` de `HTMLMediaElement` y `getContext` del canvas (devuelve null: el ASCII no dibuja en jsdom).
- El fixture ignora solo `net::ERR_ABORTED` en requests de tipo `media`: el navegador corta rangos de video al
  pausar o cerrar la página. Un clip faltante sigue fallando como 404.
- `a11y` corre axe con y sin `prefers-reduced-motion`, después de la intro y **después de recorrer la página** (así mide
  el estado final de las animaciones de scroll, no frases a mitad de fundido).
- **`e2e/fixtures.ts`**: fixture automático que falla cualquier test si hay error de consola, excepción
  no capturada, respuesta 4xx/5xx del propio origen o un log enviado a `/api/log`. Un test que provoca
  errores a propósito llama `errors.allowErrors()`. **Importar siempre `test`/`expect` desde `./fixtures`.**
- Specs: `home` (secciones, **todas las imágenes cargan**, el build log termina ("Compiled successfully."), el canvas del hero tiene píxeles dibujados, el video del hero avanza con el scroll en desktop / se reproduce en mobile, los revelados terminan en opacidad 1, overflow mobile, anclas, links externos, 404, nav por anclas, CTA, skip link), `intro`,
  `contact` (Formspree mockeado con `page.route`), `a11y` (axe WCAG 2.1 AA, claro y oscuro),
  `seo-and-api` (meta/OG, canonical, sitemap, robots/icon/OG image, headers de seguridad, `/api/log`).
- `E2E_BASE_URL=<url>` corre contra un deploy (preview) sin levantar servidor.

## Lighthouse CI

`lighthouserc.json`: 3 corridas mobile. Falla si accesibilidad < 0.95 o best practices/SEO < 0.9;
performance < 0.9 solo avisa (los runners de CI son ruidosos). Última corrida local: 95/100/100/100.

## Pipeline (`.github/workflows/ci.yml`)

`quality` (lint, typecheck, unit + coverage, `check:placeholders --strict`) → en paralelo `e2e` (build + Playwright,
sube el reporte si falla) y `lighthouse`. Triggers: push a `main`/`dev`/`feat`, PRs, manual.
`concurrency` cancela corridas viejas; `permissions: contents: read`; Node desde `.nvmrc`.
Dependabot: npm semanal (dev tooling agrupado) y actions mensual.

## Reglas

- Nada se commitea si `lint`, `typecheck`, `test` o `build` fallan.
- Bug nuevo → primero un test que lo reproduzca.
- Nuevas features de UI → caso E2E si tienen interacción; axe cubre la accesibilidad automáticamente.
- No bajar umbrales de Lighthouse/axe para que pase: arreglar la causa.

## Deuda técnica conocida

- Sin smoke test programado contra producción.
