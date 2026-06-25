"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SceneEnvironment() {
  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={0.12} />

      {/* Main directional */}
      <directionalLight position={[20, 30, 10]} intensity={0.5} color="#d0c8ff" />

      {/* Per-station accent lights */}
      <pointLight position={[0,  10, 2]} intensity={40} color="#5566ff" distance={28} decay={2} />
      <pointLight position={[32, 10, 2]} intensity={40} color="#7744ee" distance={28} decay={2} />
      <pointLight position={[64, 10, 2]} intensity={40} color="#4466ff" distance={28} decay={2} />
      <pointLight position={[96, 10, 2]} intensity={40} color="#6644ff" distance={28} decay={2} />

      {/* Floor */}
      <Floor />

      {/* Floating particles */}
      <Particles />
    </>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[48, -0.5, 0]} receiveShadow>
      <planeGeometry args={[220, 30]} />
      <meshStandardMaterial
        color="#07071a"
        roughness={0.15}
        metalness={0.7}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const count = 280;
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = Math.random() * 115 - 5;
      pos[i * 3 + 1] = Math.random() * 12 + 0.3;
      pos[i * 3 + 2] = Math.random() * 18 - 9;
      spd[i] = 0.002 + Math.random() * 0.003;
    }
    return [pos, spd];
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < speeds.length; i++) {
      arr[i * 3 + 1] += speeds[i] * Math.sin(t * 0.4 + i);
      if (arr[i * 3 + 1] > 13) arr[i * 3 + 1] = 0.3;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#7788ff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
