import { create } from "zustand";

export type Section = "hero" | "projects" | "about" | "contact";

interface CameraConfig {
  position: [number, number, number];
  lookAt: [number, number, number];
}

export const STATIONS: Record<Section, CameraConfig> = {
  hero:     { position: [0,   4, 14], lookAt: [0,   1.5, 0] },
  projects: { position: [32,  4, 14], lookAt: [32,  1.5, 0] },
  about:    { position: [64,  4, 14], lookAt: [64,  1.5, 0] },
  contact:  { position: [96,  4, 14], lookAt: [96,  1.5, 0] },
};

interface SceneStore {
  active: Section;
  setActive: (s: Section) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  active: "hero",
  setActive: (active) => set({ active }),
}));
