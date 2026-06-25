"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SceneEnvironment() {
  return (
    <>
      {/* Ambient — very low, warm */}
      <ambientLight intensity={0.1} color="#ffe8c8" />

      {/* Main directional — warm golden angle */}
      <directionalLight position={[15, 25, 8]} intensity={0.4} color="#ffd5a0" />

      {/* Per-station warm point lights */}
      <pointLight position={[0,  9, 2]} intensity={35} color="#c8822a" distance={26} decay={2} />
      <pointLight position={[32, 9, 2]} intensity={35} color="#b87430" distance={26} decay={2} />
      <pointLight position={[64, 9, 2]} intensity={35} color="#c07828" distance={26} decay={2} />
      <pointLight position={[96, 9, 2]} intensity={35} color="#b87030" distance={26} decay={2} />

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
      <planeGeometry args={[240, 32]} />
      <meshStandardMaterial
        color="#0c0a08"
        roughness={0.18}
        metalness={0.65}
      />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const count = 240;
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = Math.random() * 115 - 5;
      pos[i * 3 + 1] = Math.random() * 11 + 0.5;
      pos[i * 3 + 2] = Math.random() * 18 - 9;
      spd[i] = 0.0015 + Math.random() * 0.002;
    }
    return [pos, spd];
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < speeds.length; i++) {
      arr[i * 3 + 1] += speeds[i] * Math.sin(t * 0.35 + i);
      if (arr[i * 3 + 1] > 12) arr[i * 3 + 1] = 0.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#d4c8a8"
        transparent
        opacity={0.28}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
