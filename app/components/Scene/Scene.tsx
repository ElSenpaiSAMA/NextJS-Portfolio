"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { CameraRig } from "./CameraRig";
import { SceneEnvironment } from "./SceneEnvironment";
import { HeroStation } from "../stations/HeroStation";
import { ProjectsStation } from "../stations/ProjectsStation";
import { AboutStation } from "../stations/AboutStation";
import { ContactStation } from "../stations/ContactStation";

export function Scene() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 4, 14], fov: 60 }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      shadows
    >
      <color attach="background" args={["#0a0908"]} />
      <fog attach="fog" args={["#0a0908", 28, 92]} />

      <Suspense fallback={null}>
        <SceneEnvironment />
        <CameraRig />
        <HeroStation />
        <ProjectsStation />
        <AboutStation />
        <ContactStation />
        <EffectComposer>
          <Bloom
            intensity={0.45}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.85}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={0.65} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
