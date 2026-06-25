import { SceneLoader } from "./components/Scene/SceneLoader";
import { Navigation3D } from "./components/Navigation3D";

export const metadata = {
  title: "Matias Speroni",
  description: "Backend & Fullstack Developer — .NET, React, Data & AI",
};

export default function Home() {
  return (
    <>
      <SceneLoader />
      <Navigation3D />
    </>
  );
}
