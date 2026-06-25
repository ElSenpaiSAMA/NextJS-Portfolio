"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), { ssr: false });

export function SceneLoader() {
  return <Scene />;
}
