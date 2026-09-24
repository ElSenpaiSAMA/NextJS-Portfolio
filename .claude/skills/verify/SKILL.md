---
name: verify
description: Verifica que el proyecto esté sano replicando el CI (lint + build + tests si existen) y da el checklist manual de la experiencia 3D. Usar antes de commitear, después de un cambio grande, o cuando el usuario pregunte "¿anda todo?".
---

# verify

## 1. Checks automáticos (mismo orden que `.github/workflows/ci.yml`)

```bash
npx eslint .
npm run build
```

Si `package.json` tiene script `test`, correr también `npm test` antes del build.

Reportar cada comando con su resultado real. Si algo falla, pegar las líneas relevantes
del error y proponer el arreglo; no declarar "todo OK" si hubo warnings nuevos.

## 2. Checklist manual (`npm run dev` → http://localhost:3000)

Indicar al usuario solo los ítems relevantes al cambio:

- [ ] Loading screen ("Matias Speroni") termina y desaparece.
- [ ] Scroll / flechas: Hero → Projects → About con transición suave; los dots de la derecha siguen la sección.
- [ ] Click en dots, logo "MS" y CTA "View work" navegan.
- [ ] En cada sección, solo los botones visibles son clickeables (los de secciones ocultas no interceptan).
- [ ] Drawer de contacto: abre con la pill y con "Get in touch", cierra con Escape y backdrop, el envío muestra "Message sent.".
- [ ] Cursor custom en desktop (crece sobre links); cursor nativo en touch.
- [ ] Sin errores ni warnings en la consola del navegador.
- [ ] FPS estables al recorrer el corredor (DevTools → Performance / Rendering → FPS meter).

## 3. Referencia

Detalles de estrategia de testing y reglas de lint conocidas: `docs/ai/08-quality-ci.md`.
