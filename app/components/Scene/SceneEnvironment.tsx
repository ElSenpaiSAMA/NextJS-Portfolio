"use client";

import { Terrain } from "./Terrain";

export function SceneEnvironment() {
  return (
    <>
      {/* Very dim ambient — keeps valleys nearly black */}
      <ambientLight intensity={0.06} color="#ffe8c8" />

      {/* Main directional — warm golden, high angle, catches terrain peaks */}
      <directionalLight
        position={[30, 40, 20]}
        intensity={1.1}
        color="#ffd090"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Subtle cool fill from the opposite side */}
      <directionalLight position={[-20, 10, -15]} intensity={0.12} color="#c8d4ff" />

      {/* Accent point lights per section — warm copper glow on terrain */}
      <pointLight position={[0,   12, 0]} intensity={55} color="#c8782a" distance={35} decay={2} />
      <pointLight position={[35,  12, 0]} intensity={55} color="#b87030" distance={35} decay={2} />
      <pointLight position={[70,  12, 0]} intensity={55} color="#c07828" distance={35} decay={2} />
      <pointLight position={[105, 12, 0]} intensity={55} color="#b87030" distance={35} decay={2} />

      <Terrain />
    </>
  );
}
