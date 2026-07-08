"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SIMPLEX_NOISE_3D } from "./shaders/noise.glsl";
import { tokens } from "../../lib/tokens";

// Giant inverted sphere wrapping the whole corridor. Renders a slow, subtle
// aurora built from three octaves of simplex noise. It sits behind everything
// (renderOrder -1 + no depth write) so the flat <color>/<fog> in Scene.tsx
// remain as base/fallback underneath.

const NEBULA_VERTEX = /* glsl */ `
varying vec3 vWorldPosition;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

const NEBULA_FRAGMENT = /* glsl */ `
uniform float uTime;
uniform vec3 uBase;
uniform vec3 uNavy;
uniform vec3 uPurple;
uniform vec3 uAmber;
varying vec3 vWorldPosition;

${SIMPLEX_NOISE_3D}

void main() {
  vec3 dir = normalize(vWorldPosition);
  float t = uTime * 0.03;

  // Three octaves of slow-drifting noise over the sphere direction
  float n = snoise(dir * 1.4 + vec3(0.0, t, 0.0));
  n += snoise(dir * 3.1 + vec3(t * 0.7, 0.0, t * 0.4)) * 0.5;
  n += snoise(dir * 6.2 - vec3(t * 0.5)) * 0.25;
  float m = clamp(n * 0.4 + 0.5, 0.0, 1.0);

  // Very low-intensity color build-up: atmosphere, not a subject
  vec3 color = uBase;
  color = mix(color, uNavy,   smoothstep(0.35, 0.75, m) * 0.5);
  color = mix(color, uPurple, smoothstep(0.55, 0.95, m) * 0.4);

  // Faint warm wisps concentrated near the horizon band
  float band = clamp(1.0 - abs(dir.y + 0.1) * 2.4, 0.0, 1.0);
  color = mix(color, uAmber, band * smoothstep(0.62, 1.0, m) * 0.3);

  gl_FragColor = vec4(color, 1.0);
}
`;

export function Nebula() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime:   { value: 0 },
          uBase:   { value: new THREE.Color(tokens.colors.bg) },
          uNavy:   { value: new THREE.Color(tokens.colors.sceneNavy) },
          uPurple: { value: new THREE.Color(tokens.colors.scenePurpleDim) },
          uAmber:  { value: new THREE.Color(tokens.colors.sceneAmberDim) },
        },
        vertexShader: NEBULA_VERTEX,
        fragmentShader: NEBULA_FRAGMENT,
        side: THREE.BackSide,
        depthWrite: false,
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
    // Centered mid-corridor so the camera (z 22 → -73) never exits the sphere
    <mesh position={[0, 0, -37]} renderOrder={-1}>
      <sphereGeometry args={[150, 32, 32]} />
      <primitive ref={materialRef} object={material} attach="material" />
    </mesh>
  );
}
