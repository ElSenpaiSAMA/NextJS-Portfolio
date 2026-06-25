"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
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
      <color attach="background" args={["#05050f"]} />
      <fog attach="fog" args={["#05050f", 30, 95]} />

      <Suspense fallback={null}>
        <SceneEnvironment />
        <CameraRig />
        <HeroStation />
        <ProjectsStation />
        <AboutStation />
        <ContactStation />
      </Suspense>
    </Canvas>
  );
}
