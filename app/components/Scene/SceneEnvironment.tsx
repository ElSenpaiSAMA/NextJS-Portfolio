"use client";

import { Terrain } from "./Terrain";

export function SceneEnvironment() {
  return (
    <>
      {/* Strong ambient for light scene */}
      <ambientLight intensity={0.55} color="#fff8f0" />

      {/* Main directional — warm, high angle, creates face shadows on terrain */}
      <directionalLight position={[20, 35, 15]} intensity={0.7} color="#ffe8cc" castShadow shadow-mapSize={[1024, 1024]} />

      {/* Cool fill from opposite side — keeps shadows from going pure black */}
      <directionalLight position={[-15, 12, -10]} intensity={0.18} color="#dde8ff" />

      <Terrain />
    </>
  );
}
