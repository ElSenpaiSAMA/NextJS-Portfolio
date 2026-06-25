"use client";

import { Float, Text, Html } from "@react-three/drei";

const STACK = [
  { name: ".NET", color: "#7b3fbe" },
  { name: "C#", color: "#7b3fbe" },
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#aaaaaa" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "FastAPI", color: "#009688" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Supabase", color: "#3ecf8e" },
  { name: "Docker", color: "#2496ed" },
  { name: "Python", color: "#ffd43b" },
  { name: "Pandas", color: "#e70488" },
  { name: "Ollama", color: "#dddddd" },
];

export function AboutStation() {
  return (
    <group position={[64, 0, 0]}>
      <Float speed={0.7} floatIntensity={0.2} rotationIntensity={0.03}>
        <Text
          position={[0, 5.2, 0]}
          fontSize={0.9}
          color="#f0ede8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.03}
        >
          About
        </Text>
      </Float>

      <mesh position={[0, 4.55, 0]}>
        <boxGeometry args={[4.5, 0.012, 0.012]} />
        <meshStandardMaterial color="#3344cc" emissive="#2233aa" emissiveIntensity={1} />
      </mesh>

      {/* Bio + stack */}
      <Html position={[-8, 2.2, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
        <div style={{ width: "340px", fontFamily: "system-ui, sans-serif" }}>
          <div style={{
            background: "rgba(10,10,28,0.85)",
            border: "1px solid rgba(80,80,160,0.25)",
            borderRadius: "4px",
            padding: "24px",
            backdropFilter: "blur(12px)",
          }}>
            {/* Avatar placeholder */}
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", overflow: "hidden", marginBottom: "16px", border: "1px solid rgba(80,80,160,0.3)" }}>
              <img src="/104552415.jpg" alt="Matias" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h3 style={{ fontSize: "18px", color: "#d8d5e8", fontWeight: 600, marginBottom: "4px", letterSpacing: "-0.02em" }}>Matias Speroni</h3>
            <p style={{ fontSize: "11px", color: "#5555aa", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>Barcelona, Spain</p>
            <p style={{ fontSize: "13px", color: "#6a6882", lineHeight: 1.65, marginBottom: "12px" }}>
              Backend & fullstack developer specialized in .NET and React.
              Working at Imagine building data and AI products end to end.
            </p>
            <p style={{ fontSize: "13px", color: "#6a6882", lineHeight: 1.65 }}>
              Studying Applied Data Science. Passionate about AI, Docker, and clean architecture.
            </p>
          </div>
        </div>
      </Html>

      {/* Stack grid */}
      <Html position={[7, 2.2, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
        <div style={{ width: "340px", fontFamily: "system-ui, sans-serif" }}>
          <p style={{ fontSize: "10px", color: "#5555aa", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>Stack</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            {STACK.map((item) => (
              <div key={item.name} style={{
                background: "rgba(10,10,28,0.85)",
                border: "1px solid rgba(80,80,160,0.2)",
                borderRadius: "4px",
                padding: "10px 8px",
                backdropFilter: "blur(12px)",
                textAlign: "center",
              }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: item.color, margin: "0 auto 6px", boxShadow: `0 0 5px ${item.color}` }} />
                <p style={{ fontSize: "11px", color: "#a0a0c8", fontWeight: 500 }}>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
