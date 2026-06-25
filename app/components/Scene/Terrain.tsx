"use client";

import { useMemo } from "react";
import * as THREE from "three";

function noise(x: number, y: number): number {
  return (
    Math.sin(x * 0.09 + 1.3) * Math.cos(y * 0.11) * 2.4 +
    Math.sin(x * 0.24 + y * 0.19 + 0.8) * 1.2 +
    Math.sin(x * 0.52 + 2.3) * Math.cos(y * 0.48 + 1.1) * 0.6 +
    (Math.sin(x * 1.1 + y * 0.9) * 0.5)
  );
}

export function Terrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(210, 65, 75, 28);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < arr.length; i += 3) {
      const x = arr[i];
      const y = arr[i + 1];

      // Hollow in the center (path for camera) + hills on sides
      const camPath = Math.abs(y) / 30;
      const baseHeight = camPath * camPath * 3.5;
      const n = noise(x, y) + (Math.random() - 0.4) * 1.8;

      arr[i + 2] = Math.max(-0.4, baseHeight + n * 0.9);
    }

    geo.rotateX(-Math.PI / 2);
    pos.needsUpdate = true;
    geo.computeVertexNormals();

    return geo.toNonIndexed();
  }, []);

  return (
    <mesh geometry={geometry} position={[52, -1, -2]} receiveShadow castShadow>
      <meshStandardMaterial
        color="#b0aca4"
        flatShading
        roughness={0.92}
        metalness={0.0}
      />
    </mesh>
  );
}
