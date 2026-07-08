"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { SIMPLEX_NOISE_3D } from "./shaders/noise.glsl";
import { tokens } from "../../lib/tokens";

// Deterministic pseudo-random (no Math.random so geometry is stable across renders)
function pr(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const STAR_COUNT = 2200;
const GLOW_COUNT = 400;

// ── Star field shader ─────────────────────────────────────────────────────────
// GPU-side displacement: each point drifts vertically on a slow simplex field.
// Size attenuation is done manually (same formula three.js uses internally).

const STAR_VERTEX = /* glsl */ `
uniform float uTime;
uniform float uSize;
attribute float aScale;
varying float vNoise;
varying float vDepth;

${SIMPLEX_NOISE_3D}

void main() {
  vec3 pos = position;
  float n = snoise(vec3(position.x * 0.02, position.z * 0.02, uTime * 0.05));
  pos.y += n * 1.8;
  vNoise = n;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vDepth = -mvPosition.z;
  gl_PointSize = max(uSize * aScale * (300.0 / -mvPosition.z), 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const STAR_FRAGMENT = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
varying float vNoise;
varying float vDepth;

void main() {
  // Soft circular falloff instead of the default square point
  float d = length(gl_PointCoord - vec2(0.5));
  float falloff = smoothstep(0.5, 0.12, d);
  if (falloff < 0.01) discard;

  // Warm neutral base tinted blue→purple by the same noise driving displacement
  float t = clamp(vNoise * 0.5 + 0.5, 0.0, 1.0);
  vec3 cool  = mix(uColorB, uColorC, smoothstep(0.45, 0.9, t));
  vec3 color = mix(uColorA, cool, 0.25 + t * 0.35);

  // Distant stars dim out gently (additive blending stays subtle under bloom)
  float depthFade = smoothstep(150.0, 25.0, vDepth);
  gl_FragColor = vec4(color, falloff * (0.18 + 0.32 * depthFade));
}
`;

// ── Accent objects ────────────────────────────────────────────────────────────

type AccentMaterialKind = "standard" | "distort" | "transmission";

// Which of the 18 accents get upgraded materials (spread along the corridor).
// Transmission is capped at 2 — it renders an extra buffer and is the priciest.
const DISTORT_INDICES = new Set([2, 6, 11, 15]);
const TRANSMISSION_INDICES = new Set([4, 13]);

interface AccentProps {
  x: number; y: number; z: number;
  scale: number; type: number;
  color: string; emissive: string; emissiveIntensity: number;
  rotSpeed: number;
  materialKind: AccentMaterialKind;
}

function AccentObject({ x, y, z, scale, type, color, emissive, emissiveIntensity, rotSpeed, materialKind }: AccentProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += rotSpeed;
    ref.current.rotation.y += rotSpeed * 1.4;
  });

  // Distorted blobs need vertex density to deform smoothly; the low-poly
  // primitives stay crisp for the standard and transmission (crystal) variants.
  const geometry =
    materialKind === "distort" ? <icosahedronGeometry args={[1, 4]} /> :
    type === 0 ? <icosahedronGeometry args={[1, 0]} /> :
    type === 1 ? <octahedronGeometry args={[1, 0]} /> :
    <tetrahedronGeometry args={[1, 0]} />;

  return (
    <mesh ref={ref} position={[x, y, z]} scale={scale}>
      {geometry}
      {materialKind === "distort" && (
        <MeshDistortMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity * 0.8}
          roughness={0.15}
          metalness={0.7}
          distort={0.35}
          speed={1.6}
        />
      )}
      {materialKind === "transmission" && (
        <MeshTransmissionMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.25}
          transmission={1}
          thickness={0.6}
          roughness={0.08}
          ior={1.4}
          chromaticAberration={0.35}
          samples={4}
          resolution={256}
        />
      )}
      {materialKind === "standard" && (
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          roughness={0.1}
          metalness={0.75}
        />
      )}
    </mesh>
  );
}

const ACCENTS: AccentProps[] = Array.from({ length: 18 }, (_, i) => {
  const side = pr(i * 3.1) > 0.5 ? 1 : -1;
  const colorType = i % 3;
  return {
    x:    side * (8 + pr(i * 2.7) * 12),
    y:    (pr(i * 1.9) - 0.5) * 10 + 4,
    z:    -(i * 6.5) + 14,
    scale: 0.45 + pr(i * 1.3) * 0.9,
    type:  i % 3,
    color:            colorType === 0 ? tokens.colors.sceneAmberDim : colorType === 1 ? tokens.colors.sceneNavy : tokens.colors.scenePurpleDim,
    emissive:         colorType === 0 ? tokens.colors.accent : colorType === 1 ? tokens.colors.sceneBlueDim : tokens.colors.scenePurple,
    emissiveIntensity: 0.75 + pr(i * 0.7) * 0.6,
    rotSpeed: (0.003 + pr(i * 4.1) * 0.007) * (pr(i * 5.3) > 0.5 ? 1 : -1),
    materialKind: DISTORT_INDICES.has(i) ? "distort" : TRANSMISSION_INDICES.has(i) ? "transmission" : "standard",
  };
});

export function CorridorField() {
  const starPositions = useMemo(() => {
    const arr = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      arr[i * 3 + 0] = (pr(i * 1.1 + 0.3) - 0.5) * 240;
      arr[i * 3 + 1] = (pr(i * 2.3 + 0.6) - 0.5) * 100 + 5;
      arr[i * 3 + 2] = pr(i * 3.7 + 1.1) * -230 + 30;
    }
    return arr;
  }, []);

  // Per-point size multiplier so the field reads less uniform
  const starScales = useMemo(() => {
    const arr = new Float32Array(STAR_COUNT);
    for (let i = 0; i < STAR_COUNT; i++) {
      arr[i] = 0.5 + pr(i * 9.7 + 4.2) * 1.1;
    }
    return arr;
  }, []);

  const starMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime:   { value: 0 },
          uSize:   { value: 0.14 },
          uColorA: { value: new THREE.Color(tokens.colors.sceneParticle) },
          uColorB: { value: new THREE.Color(tokens.colors.sceneBlue) },
          uColorC: { value: new THREE.Color(tokens.colors.scenePurple) },
        },
        vertexShader: STAR_VERTEX,
        fragmentShader: STAR_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  // Mutate via ref (not the memoized value) to satisfy react-hooks/immutability
  const starMaterialRef = useRef<THREE.ShaderMaterial>(null);
  useFrame(({ clock }) => {
    if (starMaterialRef.current) {
      starMaterialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  // Smaller amber particles drifting near the camera path
  const glowPositions = useMemo(() => {
    const arr = new Float32Array(GLOW_COUNT * 3);
    for (let i = 0; i < GLOW_COUNT; i++) {
      arr[i * 3 + 0] = (pr(i * 5.1 + 2.1) - 0.5) * 18;
      arr[i * 3 + 1] = (pr(i * 6.3 + 1.7) - 0.5) * 8 + 4;
      arr[i * 3 + 2] = pr(i * 7.9 + 0.5) * -200 + 25;
    }
    return arr;
  }, []);

  return (
    <>
      {/* Star field — custom shader: GPU noise displacement + soft round points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[starScales, 1]} />
        </bufferGeometry>
        <primitive ref={starMaterialRef} object={starMaterial} attach="material" />
      </points>

      {/* Amber path particles — cheap flat material is enough here */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[glowPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color={tokens.colors.accent} transparent opacity={0.35} sizeAttenuation />
      </points>

      {/* Floating geometry */}
      {ACCENTS.map((a, i) => <AccentObject key={i} {...a} />)}
    </>
  );
}
