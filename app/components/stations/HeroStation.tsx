"use client";

import { useRef } from "react";
import { Float, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "../../store/sceneStore";

const SERIF = "var(--font-fraunces), Georgia, serif";
const SANS  = "var(--font-hanken), system-ui, sans-serif";

export function HeroStation() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const setActive = useSceneStore((s) => s.setActive);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.14;
      ring1.current.rotation.x = Math.sin(t * 0.25) * 0.12;
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.2;
      ring2.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>

      {/* Decorative rings — warm copper/bronze */}
      <mesh ref={ring1} position={[0, 4.2, -3.5]}>
        <torusGeometry args={[3.8, 0.016, 4, 120]} />
        <meshStandardMaterial color="#7a4a1a" emissive="#A8642E" emissiveIntensity={0.7} roughness={0.15} metalness={0.9} />
      </mesh>

      <Float speed={0.5} rotationIntensity={0.04} floatIntensity={0.18}>
        <mesh ref={ring2} position={[2.2, 3.2, -1.5]} rotation={[0.5, 0.3, 0]}>
          <torusGeometry args={[1.4, 0.011, 4, 80]} />
          <meshStandardMaterial color="#6a3a12" emissive="#9a5220" emissiveIntensity={0.9} roughness={0.1} metalness={0.95} />
        </mesh>
      </Float>

      {/* Name — large, Fraunces, HTML in 3D */}
      <Float speed={0.7} rotationIntensity={0.03} floatIntensity={0.22}>
        <Html position={[0, 4.3, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
          <h1 style={{
            fontFamily: SERIF,
            fontSize: "78px",
            fontWeight: 400,
            color: "#f0ede8",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            margin: 0,
            whiteSpace: "nowrap",
            textShadow: "0 0 40px rgba(168,100,46,0.3)",
          }}>
            Matias Speroni
          </h1>
        </Html>
      </Float>

      {/* Role subtitle */}
      <Html position={[0, 3.0, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
        <p style={{
          fontFamily: SANS,
          fontSize: "13px",
          fontWeight: 500,
          color: "#9C988E",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          margin: 0,
          whiteSpace: "nowrap",
        }}>
          Backend &amp; Fullstack Developer
        </p>
      </Html>

      {/* Intro + CTAs */}
      <Html position={[0, 1.1, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
        <div style={{ width: "500px", textAlign: "center" }}>
          <p style={{
            fontFamily: SANS,
            fontSize: "15px",
            lineHeight: 1.7,
            color: "#6E6A62",
            marginBottom: "28px",
            maxWidth: "380px",
            margin: "0 auto 28px",
          }}>
            I build production software end to end — from .NET and React
            to data pipelines and AI tools.
          </p>

          <p style={{
            fontFamily: SANS,
            fontSize: "11px",
            color: "#4a4540",
            marginBottom: "32px",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
          }}>
            Currently at&nbsp;<span style={{ color: "#A8642E" }}>Imagine</span>
            &nbsp;·&nbsp;Building&nbsp;<span style={{ color: "#A8642E" }}>Mira</span>
            &nbsp;·&nbsp;<span style={{ color: "#6E6A62" }}>Barcelona</span>
          </p>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              onClick={() => setActive("projects")}
              style={{
                padding: "10px 26px",
                background: "#f0ede8",
                color: "#1B1A17",
                border: "none",
                borderRadius: "2px",
                fontFamily: SANS,
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}
            >
              View projects →
            </button>
            <button
              onClick={() => setActive("contact")}
              style={{
                padding: "10px 26px",
                background: "transparent",
                color: "#9C988E",
                border: "1px solid #2a2520",
                borderRadius: "2px",
                fontFamily: SANS,
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}
            >
              Get in touch
            </button>
          </div>
        </div>
      </Html>

      {/* Available badge */}
      <Html position={[0, -0.75, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#5B7F58", display: "inline-block",
            boxShadow: "0 0 5px #5B7F58",
          }} />
          <span style={{
            fontFamily: SANS,
            fontSize: "11px",
            color: "#5B7F58",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            Available for work
          </span>
        </div>
      </Html>

    </group>
  );
}
