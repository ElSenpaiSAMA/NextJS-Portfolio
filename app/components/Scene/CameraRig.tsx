"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore, STATIONS } from "../../store/sceneStore";

export function CameraRig() {
  const { camera } = useThree();
  const active = useSceneStore((s) => s.active);

  const pos = useRef(new THREE.Vector3(0, 4, 14));
  const look = useRef(new THREE.Vector3(0, 1.5, 0));
  const targetPos = useRef(new THREE.Vector3(0, 4, 14));
  const targetLook = useRef(new THREE.Vector3(0, 1.5, 0));

  useEffect(() => {
    const { position, lookAt } = STATIONS[active];
    targetPos.current.set(...position);
    targetLook.current.set(...lookAt);
  }, [active]);

  useFrame(() => {
    pos.current.lerp(targetPos.current, 0.035);
    look.current.lerp(targetLook.current, 0.035);
    camera.position.copy(pos.current);
    camera.lookAt(look.current);
  });

  return null;
}
