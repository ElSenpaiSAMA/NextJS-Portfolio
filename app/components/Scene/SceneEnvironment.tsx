"use client";

import { Terrain } from "./Terrain";

export function SceneEnvironment() {
  return (
    <>
      {/* Very dim ambient to keep deep shadows truly dark */}
      <ambientLight intensity={0.1} color="#1a1228" />

      {/* Warm amber light near hero */}
      <pointLight position={[6, 10, 8]}   intensity={2.2} color="#ffaa44" distance={55} decay={2} />

      {/* Cool blue accent mid-scene */}
      <pointLight position={[-8, 8, -38]} intensity={1.8} color="#4488ff" distance={60} decay={2} />

      {/* Amber again near about */}
      <pointLight position={[7, 12, -76]} intensity={2.0} color="#ffaa44" distance={55} decay={2} />

      <Terrain />
    </>
  );
}
