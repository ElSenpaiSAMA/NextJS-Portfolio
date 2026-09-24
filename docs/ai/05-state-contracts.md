# 05 — Estado y contratos entre capas

**Archivo:** `app/store/sceneStore.ts` + contratos implícitos (ids DOM, eventos, atributos).

Esta capa es el "pegamento" entre la escena 3D (03) y la UI (04). Romper un contrato
de acá rompe la navegación **sin errores de TypeScript**. Revisá esta tabla antes de
renombrar cualquier id o evento.

## Store zustand `useSceneStore`

```ts
type Section = "hero" | "projects" | "about";
SECTION_PROGRESS: Record<Section, number>  // hero 0, projects 0.35, about 0.76

state:
  active:         Section         // sección visible (para dots)
  scrollTarget:   number | null   // pedido de navegación pendiente
  scrollProgress: number          // progreso de cámara 0..1 (para shaders)
actions:
  setActive(s)          // solo CameraRig
  navigateTo(s)         // UI: setea active + scrollTarget
  clearScrollTarget()   // solo CameraRig, tras consumirlo
  setScrollProgress(p)  // existe, pero CameraRig usa setState estático
```

| Quién | Lee | Escribe |
|-------|-----|---------|
| `CameraRig` | `scrollTarget` | `active`, `scrollProgress`, limpia `scrollTarget` |
| `SiteChrome` | `active` | `navigateTo` |
| `HeroContent` | – | `navigateTo("projects")` |

### Reglas del store

- Suscribirse **con selector**: `useSceneStore((s) => s.active)`. Nunca `useSceneStore()` entero.
- Valores de alta frecuencia (por frame): escribir con `useSceneStore.setState(...)` y
  leer con `useSceneStore.getState()` dentro de `useFrame` — sin hooks, sin re-renders.
- Un store por dominio. Si aparece estado que no es de la escena (ej. UI del drawer),
  crear otro store en `app/store/` en vez de engordar este.

## Contratos DOM (ids)

| id | Lo crea | Lo muta |
|----|---------|---------|
| `section-hero` | `ContentOverlay` | `CameraRig.applySection` |
| `section-projects` | `ContentOverlay` | `CameraRig.applySection` |
| `section-about` | `ContentOverlay` | `CameraRig.applySection` |
| `scroll-hint` | `ScrollHint` | `CameraRig` (opacity) |

## Contratos de eventos

| Evento | Emisor | Receptor |
|--------|--------|----------|
| `window` `CustomEvent("open-contact-drawer")` | `HeroContent` (CTA) | `ContactDrawer3D` |
| `keydown` Escape | global | `ContactDrawer3D` (cierra) |
| `keydown` flechas | global | `CameraRig` (navega) |

> Nota: las flechas mueven la cámara aunque el drawer esté abierto y el foco esté en un input.

## Contratos de atributos / clases

| Contrato | Definido en |
|----------|-------------|
| `data-cursor`, `data-cursor-label` | `Cursor.tsx` (ver capa 04) |
| `body.cursor-none-active` | `Cursor.tsx` + `globals.css` |
| `body.style.overflow = "hidden"` | `Scene.tsx` |

## Checklist para agregar una sección nueva

Usá la skill `new-section`. Resumen de los puntos que se tocan:
1. `Section` y `SECTION_PROGRESS` en `sceneStore.ts`.
2. `CameraRig`: umbrales de `newSection`, nueva llamada a `applySection` y re-balanceo de rangos.
3. `ContentOverlay`: entrada en `SECTIONS` con id `section-<nombre>`.
4. `SiteChrome`: entrada en `DOTS`.
5. Componente en `sections/<Nombre>Content.tsx`.
6. Actualizar las tablas de este doc y de [03](03-scene-3d.md).

## Deuda técnica conocida

- Ids y nombre del evento son strings mágicos repetidos: centralizar en constantes (`app/lib/contracts.ts`).
- El evento del drawer podría ser estado en un store (`useUiStore`) en vez de `CustomEvent`.
