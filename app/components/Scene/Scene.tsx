"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { CameraRig } from "./CameraRig";
import { SceneEnvironment } from "./SceneEnvironment";

export function Scene() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 7, 18], fov: 58 }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      shadows
    >
      <color attach="background" args={["#f5f3ee"]} />
      <fog attach="fog" args={["#f5f3ee", 22, 72]} />

      <Suspense fallback={null}>
        <SceneEnvironment />
        <CameraRig />

        <EffectComposer>
          <Vignette eskil={false} offset={0.2} darkness={0.28} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
