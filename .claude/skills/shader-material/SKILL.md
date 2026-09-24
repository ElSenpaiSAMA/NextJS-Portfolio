---
name: shader-material
description: Crea un objeto 3D con ShaderMaterial custom (GLSL) siguiendo los patrones del repo — useMemo + ref para uniforms, noise compartido, colores desde tokens, sin allocations por frame. Usar al agregar efectos visuales, partículas o fondos a la escena.
---

# shader-material

Contexto: `docs/ai/03-scene-3d.md`. Referencias vivas: `Scene/Nebula.tsx` (fondo) y
`Scene/CorridorField.tsx` (partículas con attributes).

## Plantilla

```tsx
"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SIMPLEX_NOISE_3D } from "./shaders/noise.glsl";
import { tokens } from "../../lib/tokens";

// <Why this object exists and how it layers with the rest of the scene>

const VERTEX = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;

${SIMPLEX_NOISE_3D}

void main() {
  float n = snoise(vec3(vUv * 3.0, uTime * 0.05));
  gl_FragColor = vec4(uColor * (0.5 + 0.5 * n), 1.0);
}
`;

export function MyEffect() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime:  { value: 0 },
          uColor: { value: new THREE.Color(tokens.colors.sceneBlue) },
        },
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
      }),
    [],
  );

  // Mutate via ref (not the memoized value) to satisfy react-hooks/immutability
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[10, 10]} />
      <primitive ref={materialRef} object={material} attach="material" />
    </mesh>
  );
}
```

## Reglas

- Montarlo desde `SceneEnvironment.tsx` (no desde `Scene.tsx`).
- Uniforms `u*`, varyings `v*`, attributes custom `a*`.
- Para reaccionar al scroll: leer `useSceneStore.getState().scrollProgress` **dentro** de `useFrame` y pasarlo a un uniform (`uProgress`). No usar el hook del store (re-renders).
- Transparencias aditivas: `transparent: true, depthWrite: false, blending: THREE.AdditiveBlending`.
- Fondos: `side: THREE.BackSide`, `depthWrite: false`, `renderOrder={-1}` en el mesh.
- Posiciones aleatorias con `pr(seed)` (copiar de `CorridorField` o extraer a `app/lib/` si se usa en un 3er archivo).
- Recordar que Bloom tiene `luminanceThreshold 0.15`: colores brillantes van a "brillar"; mantener intensidades bajas.
- Medir FPS antes/después en `npm run dev`.
- Documentar el nuevo objeto en la tabla de componentes de `docs/ai/03-scene-3d.md`.
