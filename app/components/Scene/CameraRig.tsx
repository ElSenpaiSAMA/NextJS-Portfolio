"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore, STATIONS } from "../../store/sceneStore";

// Sections are spaced 35 units apart in world X.
// Slider maps world X → -vw: sliderX = -(cameraX / 35) * 100vw
const SECTION_STEP = 35;

export function CameraRig() {
  const { camera } = useThree();
  const active = useSceneStore((s) => s.active);

  const pos       = useRef(new THREE.Vector3(0, 7, 18));
  const look      = useRef(new THREE.Vector3(0, 0, -3));
  const targetPos  = useRef(new THREE.Vector3(0, 7, 18));
  const targetLook = useRef(new THREE.Vector3(0, 0, -3));
  const sliderRef  = useRef<HTMLElement | null>(null);

  useEffect(() => {
    sliderRef.current = document.getElementById("content-slider");
  }, []);

  useEffect(() => {
    const { position, lookAt } = STATIONS[active];
    targetPos.current.set(...position);
    targetLook.current.set(...lookAt);
  }, [active]);

  useFrame(() => {
    pos.current.lerp(targetPos.current, 0.045);
    look.current.lerp(targetLook.current, 0.045);
    camera.position.copy(pos.current);
    camera.lookAt(look.current);

    // Drive content slider directly from camera X — perfectly in sync
    if (sliderRef.current) {
      const vw = window.innerWidth;
      const tx = -(pos.current.x / SECTION_STEP) * vw;
      sliderRef.current.style.transform = `translateX(${tx}px)`;
    }
  });

  return null;
}
