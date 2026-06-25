"use client";

import { Float, Html } from "@react-three/drei";

const SERIF = "var(--font-fraunces), Georgia, serif";
const SANS  = "var(--font-hanken), system-ui, sans-serif";

const PANEL: React.CSSProperties = {
  background: "rgba(18, 15, 11, 0.88)",
  border: "1px solid rgba(168, 100, 46, 0.15)",
  borderRadius: "3px",
  backdropFilter: "blur(14px)",
};

const STACK = [
  { name: ".NET",        accent: "#A8642E" },
  { name: "C#",          accent: "#9a5a28" },
  { name: "React",       accent: "#b06a30" },
  { name: "Next.js",     accent: "#9C988E" },
  { name: "TypeScript",  accent: "#A8642E" },
  { name: "FastAPI",     accent: "#8a7060" },
  { name: "PostgreSQL",  accent: "#9a6030" },
  { name: "Supabase",    accent: "#A8642E" },
  { name: "Docker",      accent: "#8a6040" },
  { name: "Python",      accent: "#b07828" },
  { name: "Pandas",      accent: "#9a6030" },
  { name: "Ollama",      accent: "#9C988E" },
];

export function AboutStation() {
  return (
    <group position={[64, 0, 0]}>

      <Float speed={0.6} floatIntensity={0.18} rotationIntensity={0.02}>
        <Html position={[0, 5.3, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: "64px",
            fontWeight: 400,
            color: "#f0ede8",
            letterSpacing: "-0.03em",
            margin: 0,
            whiteSpace: "nowrap",
          }}>
            About
          </h2>
        </Html>
      </Float>

      <mesh position={[0, 4.52, 0]}>
        <boxGeometry args={[3.8, 0.01, 0.01]} />
        <meshStandardMaterial color="#6a3a12" emissive="#A8642E" emissiveIntensity={0.8} />
      </mesh>

      {/* Bio panel */}
      <Html position={[-7.8, 2.1, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
        <div style={{ ...PANEL, width: "340px", padding: "24px", fontFamily: SANS }}>
          <div style={{
            width: "52px", height: "52px",
            borderRadius: "50%", overflow: "hidden",
            marginBottom: "16px",
            border: "1px solid rgba(168,100,46,0.3)",
          }}>
            <img src="/104552415.jpg" alt="Matias" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          <h3 style={{
            fontFamily: SERIF,
            fontSize: "22px",
            color: "#f0ede8",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            marginBottom: "2px",
          }}>
            Matias Speroni
          </h3>

          <p style={{ fontSize: "10px", color: "#A8642E", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
            Barcelona, Spain
          </p>

          <p style={{ fontSize: "13px", color: "#6E6A62", lineHeight: 1.65, marginBottom: "10px" }}>
            Backend & fullstack developer specialized in .NET and React.
            Working at Imagine building data and AI products end to end.
          </p>
          <p style={{ fontSize: "13px", color: "#6E6A62", lineHeight: 1.65 }}>
            Studying Applied Data Science. Passionate about AI, Docker, and clean architecture.
          </p>
        </div>
      </Html>

      {/* Stack grid */}
      <Html position={[7.8, 2.1, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
        <div style={{ width: "320px", fontFamily: SANS }}>
          <p style={{ fontSize: "10px", color: "#9C988E", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
            Stack
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "7px" }}>
            {STACK.map((item) => (
              <div key={item.name} style={{
                ...PANEL,
                padding: "10px 8px",
                textAlign: "center",
              }}>
                <div style={{
                  width: "5px", height: "5px",
                  borderRadius: "50%",
                  background: item.accent,
                  margin: "0 auto 6px",
                  boxShadow: `0 0 4px ${item.accent}`,
                }} />
                <p style={{ fontSize: "11px", color: "#c8c4bc", fontWeight: 500 }}>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
