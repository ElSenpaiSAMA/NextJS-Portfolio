"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { CameraRig } from "./CameraRig";
import { SceneEnvironment } from "./SceneEnvironment";

export function Scene() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 6, 22], fov: 60 }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={["#05050a"]} />
      <fog attach="fog" args={["#05050a", 50, 130]} />

      <Suspense fallback={null}>
        <SceneEnvironment />
        <CameraRig />

        <EffectComposer>
          <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={1.5} />
          <Vignette eskil={false} offset={0.22} darkness={0.6} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
