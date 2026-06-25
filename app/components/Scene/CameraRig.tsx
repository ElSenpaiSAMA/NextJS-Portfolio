"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore, SECTION_PROGRESS, type Section } from "../../store/sceneStore";

const Z_START = 22;
const Z_RANGE  = 95;

function clamp(v: number, lo: number, hi: number) {
  return v < lo ? lo : v > hi ? hi : v;
}

export function CameraRig() {
  const scrollTarget     = useSceneStore((s) => s.scrollTarget);
  const clearScrollTarget = useSceneStore((s) => s.clearScrollTarget);
  const setActive        = useSceneStore((s) => s.setActive);
  const { camera }       = useThree();

  const targetRef   = useRef(0);
  const progressRef = useRef(0);
  const sectionRef  = useRef<Section>("hero");
  const lookTarget  = useRef(new THREE.Vector3(0, 2.5, 4));

  // Nav click → consume and apply scroll target
  useEffect(() => {
    if (scrollTarget !== null) {
      targetRef.current = scrollTarget;
      clearScrollTarget();
    }
  }, [scrollTarget, clearScrollTarget]);

  // Wheel + touch + keyboard
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetRef.current = clamp(targetRef.current + e.deltaY / 3200, 0, 1);
    };
    let ty = 0;
    const onTouchStart = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      const d = ty - e.touches[0].clientY;
      ty = e.touches[0].clientY;
      targetRef.current = clamp(targetRef.current + d / 1600, 0, 1);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        targetRef.current = clamp(targetRef.current + 0.38, 0, 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        targetRef.current = clamp(targetRef.current - 0.38, 0, 1);
      }
    };
    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true  });
    window.addEventListener("touchmove",  onTouchMove,  { passive: true  });
    window.addEventListener("keydown",    onKeyDown);
    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("keydown",    onKeyDown);
    };
  }, []);

  useFrame(() => {
    progressRef.current = THREE.MathUtils.lerp(progressRef.current, targetRef.current, 0.038);
    const p = progressRef.current;

    // Update active section at thresholds
    const newSection: Section = p < 0.22 ? "hero" : p < 0.62 ? "projects" : "about";
    if (newSection !== sectionRef.current) {
      sectionRef.current = newSection;
      setActive(newSection);
    }

    // Camera along Z with gentle drift
    const camZ = Z_START - p * Z_RANGE;
    camera.position.set(
      Math.sin(p * Math.PI * 1.5) * 0.7,
      6 + Math.sin(p * Math.PI * 2.5) * 0.4,
      camZ,
    );

    // Smooth lookAt slightly ahead and below
    const dest = new THREE.Vector3(0, 2.5, camZ - 18);
    lookTarget.current.lerp(dest, 0.06);
    camera.lookAt(lookTarget.current);

    // Drive content slider
    const slider = document.getElementById("content-slider");
    if (slider) {
      const sf = clamp(p * 2.5, 0, 2);
      slider.style.transform = `translateX(${-sf * window.innerWidth}px)`;
    }
  });

  return null;
}
