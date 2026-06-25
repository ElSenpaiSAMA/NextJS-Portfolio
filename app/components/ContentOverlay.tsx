"use client";

import { useSceneStore } from "../store/sceneStore";
import { HeroContent } from "./sections/HeroContent";
import { ProjectsContent } from "./sections/ProjectsContent";
import { AboutContent } from "./sections/AboutContent";
import { ContactContent } from "./sections/ContactContent";

const SECTIONS = [
  { id: "hero",     Component: HeroContent },
  { id: "projects", Component: ProjectsContent },
  { id: "about",    Component: AboutContent },
  { id: "contact",  Component: ContactContent },
] as const;

export function ContentOverlay() {
  const active = useSceneStore((s) => s.active);
  const index = SECTIONS.findIndex((s) => s.id === active);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 5,
      overflow: "hidden",
      pointerEvents: "none",
    }}>
      {/* id="content-slider" — transform driven directly from CameraRig useFrame */}
      <div
        id="content-slider"
        style={{
          display: "flex",
          width: `${SECTIONS.length * 100}vw`,
          height: "100vh",
          willChange: "transform",
          transform: `translateX(-${index * 100}vw)`,
        }}
      >
        {SECTIONS.map(({ id, Component }) => (
          <div
            key={id}
            style={{
              width: "100vw",
              height: "100vh",
              flexShrink: 0,
              position: "relative",
              pointerEvents: active === id ? "auto" : "none",
            }}
          >
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
}
