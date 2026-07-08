import { SceneLoader }    from "./components/Scene/SceneLoader";
import { ContentOverlay } from "./components/ContentOverlay";
import { SiteChrome }     from "./components/SiteChrome";
import { ScrollHint }     from "./components/ScrollHint";
import { ContactDrawer3D } from "./components/ContactDrawer3D";
import { GrainOverlay }   from "./components/GrainOverlay";
import { Cursor }         from "./components/Cursor";

export const metadata = {
  title: "Matias Speroni",
  description: "Backend & Fullstack Developer — .NET, React, Data & AI",
};

export default function Home() {
  return (
    <>
      <SceneLoader />
      <ContentOverlay />
      <SiteChrome />
      <ScrollHint />
      <ContactDrawer3D />
      <GrainOverlay />
      <Cursor />
    </>
  );
}
