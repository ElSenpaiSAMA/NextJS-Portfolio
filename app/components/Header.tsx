import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/30">
      <Navbar />
    </header>
  );
}

