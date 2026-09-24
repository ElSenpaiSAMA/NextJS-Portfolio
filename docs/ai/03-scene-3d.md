# 03 — Escena 3D

**Archivos:** `app/components/Scene/` — `SceneLoader.tsx`, `Scene.tsx`, `CameraRig.tsx`,
`SceneEnvironment.tsx`, `Nebula.tsx`, `CorridorField.tsx`, `shaders/noise.glsl.ts`

Todo es `"use client"` y se monta **solo** en el navegador (`SceneLoader` usa `dynamic(..., { ssr: false })`).

## Componentes

| Archivo | Responsabilidad |
|---------|-----------------|
| `SceneLoader` | Wrapper sin SSR. Único punto de entrada desde `page.tsx`. |
| `Scene` | `<Canvas>` fijo fullscreen, `dpr [1, 1.5]`, fog `50→130`, `EffectComposer` (Bloom 1.5, Vignette). Bloquea el scroll del body. |
| `CameraRig` | Input (wheel/touch/teclado/pointer) → progreso 0..1 → cámara + opacidad de secciones HTML. **Es el corazón del sitio.** |
| `SceneEnvironment` | Ambient + 3 point lights con "respiración" (±15%, fases desfasadas). Monta `Nebula` y `CorridorField`. |
| `Nebula` | Esfera invertida r=150 en z=-37 con `ShaderMaterial` (3 octavas simplex). `renderOrder -1`, sin depth write. |
| `CorridorField` | 2200 estrellas (shader con desplazamiento por ruido), 400 partículas ámbar, 18 poliedros "accent" (standard / `MeshDistortMaterial` / `MeshTransmissionMaterial`). |
| `shaders/noise.glsl.ts` | `SIMPLEX_NOISE_3D`: string GLSL para interpolar en shaders (`snoise(vec3)`). |

## Geometría del corredor

- Cámara: `z = 22 - p * 95` → va de **z 22 a z -73**. `y ≈ 6`, balanceo senoidal + parallax de mouse + roll leve.
- `lookAt` suavizado hacia `(0, 2.5, camZ - 18)`.
- Nebula centrada en z -37 con radio 150: la cámara nunca sale de la esfera. Si extendés `Z_RANGE`, revisá esto.
- Accents: `z = -(i * 6.5) + 14` para i ∈ [0,17], a los costados (`|x| ∈ [8, 20]`).

## Input → progreso

| Input | Delta |
|-------|-------|
| Wheel | `deltaY / 3200` (con `preventDefault`, listener `passive: false`) |
| Touch | `dy / 1600` |
| Flechas | ±0.38 |
| Nav (store) | salto a `SECTION_PROGRESS[section]` |

`progress` sigue a `target` con `lerp(…, 0.038)` por frame (inercia).

## Rangos de secciones (acoplados a `sceneStore` y a la capa 04)

| Sección | Fade in | Pleno | Fade out | `active` si p < | `SECTION_PROGRESS` |
|---------|---------|-------|----------|-----------------|--------------------|
| hero | 0 – 0.03 | – 0.26 | – 0.33 | 0.22 | 0 |
| projects | 0.28 – 0.38 | – 0.60 | – 0.67 | 0.62 | 0.35 |
| about | 0.63 – 0.73 | – 0.97 | – 1.01 | resto | 0.76 |

`applySection` pone `opacity`, `pointerEvents`, `visibility` (umbral 0.06) y un `translateY` de hasta 14px.

## Patrones obligatorios

```tsx
// 1. ShaderMaterial: crear en useMemo, mutar uniforms vía ref (regla react-hooks/immutability)
const material = useMemo(() => new THREE.ShaderMaterial({ uniforms: { uTime: { value: 0 } }, ... }), []);
const materialRef = useRef<THREE.ShaderMaterial>(null);
useFrame(({ clock }) => { if (materialRef.current) materialRef.current.uniforms.uTime.value = clock.elapsedTime; });
<primitive ref={materialRef} object={material} attach="material" />

// 2. Aleatoriedad determinista
function pr(seed: number) { const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

// 3. Colores desde tokens
new THREE.Color(tokens.colors.sceneBlue)

// 4. Nada de setState dentro de useFrame salvo cambios discretos (setActive solo al cambiar de sección).
//    Valores continuos → useSceneStore.setState(...) estático, con throttle.
```

- GLSL como template string con el comentario `/* glsl */` e interpolando `${SIMPLEX_NOISE_3D}`.
- Uniforms con prefijo `u`, varyings con `v`, attributes custom con `a`.

## Presupuesto de rendimiento

- `MeshTransmissionMaterial` es el más caro (render extra): **máximo 2** (`TRANSMISSION_INDICES`).
- `dpr` tope 1.5. Bloom ya es costoso: no sumar más passes sin medir.
- Partículas: preferir `pointsMaterial` salvo que se necesite shader.
- Cualquier `new THREE.*` fuera de `useMemo` en un componente = leak / recreación por render.

## Deuda técnica conocida

- `Scene.tsx` usa `"#05050a"` literal en vez de `tokens.colors.bg`.
- `scrollProgress` se publica en el store pero ningún shader lo consume todavía.
- No hay `prefers-reduced-motion` ni fallback sin WebGL.
- Rangos de sección duplicados entre `CameraRig` (fades, `newSection`) y `SECTION_PROGRESS`: centralizar si se agregan secciones.
- En mobile, parallax y rendimiento no están ajustados.
