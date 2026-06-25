"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic pseudo-random (no Math.random so geometry is stable across renders)
function pr(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface AccentProps {
  x: number; y: number; z: number;
  scale: number; type: number;
  color: string; emissive: string; emissiveIntensity: number;
  rotSpeed: number;
}

function AccentObject({ x, y, z, scale, type, color, emissive, emissiveIntensity, rotSpeed }: AccentProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += rotSpeed;
    ref.current.rotation.y += rotSpeed * 1.4;
  });
  return (
    <mesh ref={ref} position={[x, y, z]} scale={scale}>
      {type === 0 && <icosahedronGeometry args={[1, 0]} />}
      {type === 1 && <octahedronGeometry args={[1, 0]} />}
      {type === 2 && <tetrahedronGeometry args={[1, 0]} />}
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        roughness={0.1}
        metalness={0.75}
      />
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
    color:            colorType === 0 ? "#6B3D18" : colorType === 1 ? "#162248" : "#2A1848",
    emissive:         colorType === 0 ? "#A8642E" : colorType === 1 ? "#2A5FA8" : "#6040A0",
    emissiveIntensity: 0.75 + pr(i * 0.7) * 0.6,
    rotSpeed: (0.003 + pr(i * 4.1) * 0.007) * (pr(i * 5.3) > 0.5 ? 1 : -1),
  };
});

export function Terrain() {
  const starPositions = useMemo(() => {
    const arr = new Float32Array(2200 * 3);
    for (let i = 0; i < 2200; i++) {
      arr[i * 3 + 0] = (pr(i * 1.1 + 0.3) - 0.5) * 240;
      arr[i * 3 + 1] = (pr(i * 2.3 + 0.6) - 0.5) * 100 + 5;
      arr[i * 3 + 2] = pr(i * 3.7 + 1.1) * -230 + 30;
    }
    return arr;
  }, []);

  // Smaller amber particles drifting near the camera path
  const glowPositions = useMemo(() => {
    const arr = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      arr[i * 3 + 0] = (pr(i * 5.1 + 2.1) - 0.5) * 18;
      arr[i * 3 + 1] = (pr(i * 6.3 + 1.7) - 0.5) * 8 + 4;
      arr[i * 3 + 2] = pr(i * 7.9 + 0.5) * -200 + 25;
    }
    return arr;
  }, []);

  return (
    <>
      {/* Star field */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.055} color="#c8c0b8" transparent opacity={0.45} sizeAttenuation />
      </points>

      {/* Amber path particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[glowPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#A8642E" transparent opacity={0.35} sizeAttenuation />
      </points>

      {/* Floating geometry */}
      {ACCENTS.map((a, i) => <AccentObject key={i} {...a} />)}
    </>
  );
}
