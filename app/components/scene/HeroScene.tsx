"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { MOTION_QUERY, WEBGL_SCENE_QUERY, supportsWebGL, useMediaQuery } from "../../lib/motion";

// three.js + R3F are a separate chunk: never part of the first load.
const ClusterScene = dynamic(() => import("./ClusterScene"), { ssr: false });

/**
 * Mounts the WebGL cluster on tablets/desktops once the page is idle, and
 * stops rendering while the hero is off screen. Phones never download it
 * (they get ClusterSvg). With reduced motion it draws a single still frame.
 */
export function HeroScene() {
  const wide = useMediaQuery(WEBGL_SCENE_QUERY);
  const motion = useMediaQuery(MOTION_QUERY);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wide || !supportsWebGL()) return;
    const start = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 600);
    return () => clearTimeout(id);
  }, [wide]);

  useEffect(() => {
    const element = container.current;
    if (!ready || !element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, [ready]);

  return (
    <div ref={container} aria-hidden="true" className="absolute inset-0 hidden md:block" data-testid="hero-scene">
      {ready && <ClusterScene animate={motion} visible={visible} />}
    </div>
  );
}
