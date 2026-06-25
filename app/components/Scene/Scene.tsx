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
      camera={{ position: [0, 7, 18], fov: 58 }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      shadows
    >
      <color attach="background" args={["#080604"]} />
      <fog attach="fog" args={["#080604", 35, 100]} />

      <Suspense fallback={null}>
        <SceneEnvironment />
        <CameraRig />

        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={0.3} luminanceSmoothing={0.9} mipmapBlur />
          <Vignette eskil={false} offset={0.15} darkness={0.75} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
