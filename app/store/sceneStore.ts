import { create } from "zustand";

export type Section = "hero" | "projects" | "about" | "contact";

interface CameraConfig {
  position: [number, number, number];
  lookAt: [number, number, number];
}

export const STATIONS: Record<Section, CameraConfig> = {
  hero:     { position: [0,   7, 18], lookAt: [0,   0, -3] },
  projects: { position: [35,  7, 18], lookAt: [35,  0, -3] },
  about:    { position: [70,  7, 18], lookAt: [70,  0, -3] },
  contact:  { position: [105, 7, 18], lookAt: [105, 0, -3] },
};

interface SceneStore {
  active: Section;
  setActive: (s: Section) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  active: "hero",
  setActive: (active) => set({ active }),
}));
