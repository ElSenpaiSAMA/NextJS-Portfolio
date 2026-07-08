"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CorridorField } from "./CorridorField";
import { Nebula } from "./Nebula";
import { tokens } from "../../lib/tokens";

interface CorridorLight {
  position: [number, number, number];
  intensity: number;
  color: string;
  distance: number;
  phase: number;
}

// Base setup for the three corridor lights; `phase` offsets the breathing
// so they never pulse in sync.
const LIGHTS: CorridorLight[] = [
  /* Warm amber near hero */    { position: [6, 10, 8],   intensity: 2.2, color: tokens.colors.sceneAmber, distance: 55, phase: 0 },
  /* Cool blue mid-scene */     { position: [-8, 8, -38], intensity: 1.8, color: tokens.colors.sceneBlue,  distance: 60, phase: 2.1 },
  /* Amber again near about */  { position: [7, 12, -76], intensity: 2.0, color: tokens.colors.sceneAmber, distance: 55, phase: 4.2 },
];

const BREATH_SPEED = 0.3;
const BREATH_AMOUNT = 0.15;

export function SceneEnvironment() {
  const lightRefs = useRef<(THREE.PointLight | null)[]>([]);

  // Subtle "breathing": each light drifts ±15% around its base intensity
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    LIGHTS.forEach((config, i) => {
      const light = lightRefs.current[i];
      if (!light) return;
      light.intensity =
        config.intensity + Math.sin(t * BREATH_SPEED + config.phase) * BREATH_AMOUNT * config.intensity;
    });
  });

  return (
    <>
      {/* Very dim ambient to keep deep shadows truly dark */}
      <ambientLight intensity={0.1} color={tokens.colors.sceneAmbient} />

      {LIGHTS.map((config, i) => (
        <pointLight
          key={i}
          ref={(el) => { lightRefs.current[i] = el; }}
          position={config.position}
          intensity={config.intensity}
          color={config.color}
          distance={config.distance}
          decay={2}
        />
      ))}

      <Nebula />
      <CorridorField />
    </>
  );
}
