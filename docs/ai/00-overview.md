# 00 — Overview y arquitectura

## Qué es

Portfolio personal de **Matias Speroni** (Backend & Fullstack Developer, Barcelona).
Es una **single-page** donde el usuario "vuela" por un corredor 3D; el scroll no
desplaza el documento, mueve la cámara. Tres "momentos" del corredor muestran
contenido HTML superpuesto: **Hero → Projects → About**. El contacto es un drawer
inferior con formulario (Formspree).

Estética: editorial, oscura, acento ámbar (`#A8642E`), serif Fraunces + sans
Hanken Grotesk, grano de película, bloom y viñeta.

## Stack real (package.json)

| Área | Librería |
|------|----------|
| Framework | Next.js 16 (App Router), React 19.2, TypeScript strict |
| 3D | three 0.185, @react-three/fiber 9, @react-three/drei 10, @react-three/postprocessing 3 |
| Animación UI | `motion` 12 (`motion/react`) |
| Estado | zustand 5 |
| Estilos | Tailwind v4 (`@theme` en `globals.css`) + **mayormente inline styles** |
| Formularios | @formspree/react |
| Instalados pero sin uso actual | `next-view-transitions`, `opentype.js` |

## Árbol de render

```
RootLayout (server)              app/layout.tsx
├─ <LoadingScreen/>              z-100, se desmonta al terminar (~2.5 s)
└─ Home (server)                 app/page.tsx
   ├─ <SceneLoader/>             dynamic(ssr:false) → <Scene/> Canvas fijo z-0
   │   └─ SceneEnvironment (luces, Nebula, CorridorField) + CameraRig + EffectComposer
   ├─ <ContentOverlay/>          3 divs fijos apilados z-5: #section-hero/projects/about
   ├─ <SiteChrome/>              logo "MS" + dots de navegación z-20
   ├─ <ScrollHint/>              #scroll-hint z-20
   ├─ <ContactDrawer3D/>         backdrop z-40, drawer z-50
   ├─ <GrainOverlay/>            z-50, pointer-events none
   └─ <Cursor/>                  z-60, solo pointer fino
```

## Flujo de datos (lo más importante del repo)

```
wheel / touch / flechas ──► CameraRig.targetRef (0..1)
                              │ lerp 0.038 por frame
                              ▼
                        progress p ──┬─► posición/lookAt de cámara
                                     ├─► setActive(section)  ──► SiteChrome (dots)
                                     ├─► useSceneStore.setState({scrollProgress})  (shaders)
                                     └─► applySection(id, opacity) ── muta el DOM directo
                                                                     (#section-*, #scroll-hint)

Click en dot / CTA ──► navigateTo(section) ──► scrollTarget ──► CameraRig lo consume y lo limpia
"Get in touch" ──► window.dispatchEvent("open-contact-drawer") ──► ContactDrawer3D
```

**Clave:** la opacidad de las secciones HTML **no** la maneja React: la escribe
`CameraRig` en cada frame vía `document.getElementById`. Ver [05](05-state-contracts.md).

## Mapa de carpetas

```
app/
  layout.tsx, page.tsx, globals.css, icon.jpg
  components/
    Scene/            capa 03 (todo client, R3F)
      shaders/        GLSL como strings TS
    sections/         capa 04 (contenido de cada momento)
    *.tsx             capa 04 (chrome, cursor, drawer, grain, loading, hint)
  hooks/useMagnetic.ts
  lib/tokens.ts       capa 02
  store/sceneStore.ts capa 05
  data/projects.ts    capa 06
public/               imágenes de proyectos, avatar, logos de tecnologías
docs/ai/              este contexto
```

## Principios de diseño del código existente

1. **Nada de re-renders por frame.** Todo lo animado por frame se muta vía refs,
   `useFrame`, motion values o estilos DOM directos.
2. **Determinismo.** La escena usa `pr(seed)` (pseudo-random) en vez de `Math.random`.
3. **Tokens duplicados a propósito**: CSS (`globals.css`) + TS (`tokens.ts`) para
   lo que CSS no alcanza (three.js, motion).
4. **Comentarios explican el *por qué*** (reglas de lint, z-index, trade-offs). Mantené ese estilo.
5. Idioma: código y comentarios en **inglés**; docs internos en español.

## Deuda técnica transversal

- Muchos componentes usan hex hardcodeados (`#A8642E`, `#F0EDE8`...) en vez de `var(--color-*)`/`tokens`.
- Constantes de fuente `F`/`S`/`SERIF`/`SANS` duplicadas en cada componente.
- Layout **no responsive**: grids fijos (3×2 proyectos, 2 columnas About/drawer).
- `README.md` desactualizado (menciona `app/styles/`, no menciona 3D).
- No hay tests (ver [08](08-quality-ci.md)).
