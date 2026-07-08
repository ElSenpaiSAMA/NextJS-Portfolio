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

// Compute opacity for a section given current scroll progress
function sectionOp(
  p: number,
  fadeInStart: number, fadeInEnd: number,
  fadeOutStart: number, fadeOutEnd: number,
): number {
  if (p <= fadeInStart || p >= fadeOutEnd) return 0;
  if (p < fadeInEnd)   return (p - fadeInStart)  / (fadeInEnd  - fadeInStart);
  if (p < fadeOutStart) return 1;
  return 1 - (p - fadeOutStart) / (fadeOutEnd - fadeOutStart);
}

function applySection(id: string, op: number): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.opacity = String(Math.round(op * 1000) / 1000);
  el.style.pointerEvents = op > 0.06 ? "auto" : "none";
  // visibility gates hit-testing for the whole subtree: sections re-enable
  // pointer-events on inner content, which would otherwise keep intercepting
  // hover/clicks meant for the visible section stacked below.
  el.style.visibility = op > 0.06 ? "visible" : "hidden";
  el.style.transform = `translateY(${(1 - Math.min(1, op * 1.5)) * 14}px)`;
}

export function CameraRig() {
  const scrollTarget      = useSceneStore((s) => s.scrollTarget);
  const clearScrollTarget = useSceneStore((s) => s.clearScrollTarget);
  const setActive         = useSceneStore((s) => s.setActive);
  const { camera }        = useThree();

  const targetRef    = useRef(0);
  const progressRef  = useRef(0);
  const sectionRef   = useRef<Section>("hero");
  const lookTarget   = useRef(new THREE.Vector3(0, 2.5, 4));
  const destLook     = useRef(new THREE.Vector3());

  // Nav dot click → jump to section
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
      if (e.key === "ArrowDown" || e.key === "ArrowRight")
        targetRef.current = clamp(targetRef.current + 0.38, 0, 1);
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
        targetRef.current = clamp(targetRef.current - 0.38, 0, 1);
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

    // Active section for dots indicator
    const newSection: Section = p < 0.22 ? "hero" : p < 0.62 ? "projects" : "about";
    if (newSection !== sectionRef.current) {
      sectionRef.current = newSection;
      setActive(newSection);
    }

    // Camera path
    const camZ = Z_START - p * Z_RANGE;
    camera.position.set(
      Math.sin(p * Math.PI * 1.5) * 0.8,
      6 + Math.sin(p * Math.PI * 2.5) * 0.5,
      camZ,
    );

    // Smooth lookAt
    destLook.current.set(0, 2.5, camZ - 18);
    lookTarget.current.lerp(destLook.current, 0.055);
    camera.lookAt(lookTarget.current);

    // ── Section opacity (each section is a "moment" in the corridor) ──
    // hero:     full 0.00–0.26, fades out by 0.33
    // projects: fades in 0.28–0.38, full 0.38–0.60, fades out by 0.67
    // about:    fades in 0.63–0.73, stays until end
    applySection("section-hero",     sectionOp(p, 0,    0.03, 0.26, 0.33));
    applySection("section-projects", sectionOp(p, 0.28, 0.38, 0.60, 0.67));
    applySection("section-about",    sectionOp(p, 0.63, 0.73, 0.97, 1.01));

    // Scroll hint fades out after first movement
    const hint = document.getElementById("scroll-hint");
    if (hint) {
      hint.style.opacity = p < 0.02 ? "1" : "0";
    }
  });

  return null;
}
