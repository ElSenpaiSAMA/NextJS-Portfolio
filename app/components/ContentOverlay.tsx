"use client";

import { useSceneStore } from "../store/sceneStore";
import { HeroContent } from "./sections/HeroContent";
import { ProjectsContent } from "./sections/ProjectsContent";
import { AboutContent } from "./sections/AboutContent";
import { ContactContent } from "./sections/ContactContent";

type SectionEntry = {
  id: "hero" | "projects" | "about" | "contact";
  Component: React.ComponentType;
};

const SECTIONS: SectionEntry[] = [
  { id: "hero",     Component: HeroContent },
  { id: "projects", Component: ProjectsContent },
  { id: "about",    Component: AboutContent },
  { id: "contact",  Component: ContactContent },
];

export function ContentOverlay() {
  const active = useSceneStore((s) => s.active);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none" }}>
      {SECTIONS.map(({ id, Component }) => (
        <div
          key={id}
          style={{
            position: "absolute",
            inset: 0,
            opacity: active === id ? 1 : 0,
            transition: "opacity 0.45s ease",
            pointerEvents: active === id ? "auto" : "none",
          }}
        >
          <Component />
        </div>
      ))}
    </div>
  );
}
