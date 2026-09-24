---
name: new-section
description: Agrega (o elimina/reordena) una sección/"momento" del corredor 3D — tipo Section del store, rangos de CameraRig, ContentOverlay, dots de SiteChrome y el componente de contenido. Usar cuando el usuario pida una sección nueva (ej. "Experience", "Blog", "Contact").
---

# new-section

Contexto: `docs/ai/05-state-contracts.md` y `docs/ai/03-scene-3d.md`.
Una sección toca **5 archivos acoplados por strings y números**; TypeScript solo detecta parte.

## 1. Diseñar los rangos primero

Hoy (progreso de cámara 0..1):

| Sección | fadeIn | full | fadeOut | `active` hasta | SECTION_PROGRESS |
|---------|--------|------|---------|----------------|------------------|
| hero | 0–0.03 | –0.26 | –0.33 | 0.22 | 0 |
| projects | 0.28–0.38 | –0.60 | –0.67 | 0.62 | 0.35 |
| about | 0.63–0.73 | –0.97 | –1.01 | 1 | 0.76 |

Redistribuir para N secciones: cada una necesita una ventana "full" y los fades de
secciones vecinas deben solaparse poco (≈0.05). `SECTION_PROGRESS` debe caer dentro de su
ventana full. Si el corredor queda corto, evaluar subir `Z_RANGE` (y revisar Nebula/fog —
ver capa 03). Mostrar la tabla nueva al usuario antes de implementar.

## 2. Implementar (orden recomendado, puede ser un paso por punto)

1. **`app/store/sceneStore.ts`**: agregar el nombre a `Section` y su valor en `SECTION_PROGRESS`.
2. **`app/components/sections/<Nombre>Content.tsx`**: `"use client"`, raíz `position: absolute; inset: 0`,
   gradiente de legibilidad, `pointerEvents: "auto"` en el contenido interactivo, header igual al de Projects/About
   (h2 serif + línea ámbar). Seguir `docs/ai/04-ui-overlay.md`.
3. **`app/components/ContentOverlay.tsx`**: entrada en `SECTIONS` con `id: "section-<nombre>"`, `initialOp: 0`.
4. **`app/components/Scene/CameraRig.tsx`**:
   - umbrales de `newSection` (cadena de ternarios),
   - nueva llamada `applySection("section-<nombre>", sectionOp(p, …))`,
   - re-balanceo de las llamadas existentes según la tabla nueva,
   - actualizar el comentario de rangos.
5. **`app/components/SiteChrome.tsx`**: entrada en `DOTS` con label en inglés.

## 3. Verificar

- `npm run lint && npm run build`
- `npm run dev`: recorrer todo con scroll y con dots; cada sección aparece sola, los dots se sincronizan,
  los botones de secciones ocultas no interceptan clicks, `SECTION_PROGRESS` aterriza en la sección pleno.

## 4. Documentar

Actualizar las tablas de rangos en `docs/ai/03-scene-3d.md` y `docs/ai/05-state-contracts.md`,
y esta misma skill (tabla del punto 1).

Para eliminar o reordenar una sección, aplicar los mismos 5 puntos a la inversa.
