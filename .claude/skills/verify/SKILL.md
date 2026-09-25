---
name: verify
description: Verifica que el proyecto esté sano replicando el CI (lint, typecheck, unit, build, E2E con axe, Lighthouse opcional) y da el checklist manual. Usar antes de commitear, tras un cambio grande, o cuando el usuario pregunte "¿anda todo?".
---

# verify

## 1. Automático (orden de `.github/workflows/ci.yml`)

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e          # necesita el build; primera vez: npx playwright install chromium
npm run check:placeholders
```

Atajo: `npm run verify` (todo menos placeholders).

Lighthouse local (opcional, lento):

```bash
CHROME_PATH="$(node -e "console.log(require('@playwright/test').chromium.executablePath())")" \
  npx --yes @lhci/cli@0.15.x autorun --upload.target=filesystem --upload.outputDir=.lighthouseci/out
```

Reportá cada comando con su resultado real. Si algo falla: líneas relevantes del error + arreglo
propuesto. Nunca "todo OK" con fallos o warnings nuevos.

Si falla un E2E: `npx playwright show-report` o el `trace.zip` en `test-results/`.

## 2. Manual (`npm run dev` → http://localhost:3000)

Solo los ítems relevantes al cambio:

- [ ] Claro y oscuro (toggle + recarga mantiene el tema).
- [ ] ~400px de ancho: sin scroll horizontal, header apilado (nombre / nav + toggle).
- [ ] Links de la nav y "View work" llevan a su sección; todas las imágenes (proyectos, foto, logos) cargan.
- [ ] Formulario: validación, envío (real o mock) y mensaje de éxito/error.
- [ ] Consola del navegador sin errores.
