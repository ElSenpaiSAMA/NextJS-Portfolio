"use client";

import { Float, Html } from "@react-three/drei";
import { useForm, ValidationError } from "@formspree/react";

const SERIF = "var(--font-fraunces), Georgia, serif";
const SANS  = "var(--font-hanken), system-ui, sans-serif";

const PANEL: React.CSSProperties = {
  background: "rgba(18, 15, 11, 0.9)",
  border: "1px solid rgba(168, 100, 46, 0.15)",
  borderRadius: "3px",
  backdropFilter: "blur(16px)",
};

const INPUT: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(168,100,46,0.2)",
  borderRadius: "2px",
  padding: "9px 12px",
  color: "#d0cdc8",
  fontFamily: "var(--font-hanken), system-ui, sans-serif",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box" as const,
};

function ContactForm() {
  const [state, handleSubmit] = useForm("mrbzwjdp");

  return (
    <div style={{ ...PANEL, width: "340px", padding: "26px", fontFamily: SANS }}>
      {state.succeeded ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <p style={{
            fontFamily: SERIF,
            fontSize: "28px",
            fontStyle: "italic",
            color: "#f0ede8",
            marginBottom: "8px",
          }}>
            Message sent.
          </p>
          <p style={{ fontSize: "13px", color: "#6E6A62" }}>I'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "10px", color: "#9C988E", textTransform: "uppercase", letterSpacing: "0.09em", display: "block", marginBottom: "6px" }}>Name</label>
            <input name="name" type="text" required style={INPUT} />
          </div>
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "10px", color: "#9C988E", textTransform: "uppercase", letterSpacing: "0.09em", display: "block", marginBottom: "6px" }}>Email</label>
            <input name="email" type="email" required style={INPUT} />
            <ValidationError field="email" prefix="Email" errors={state.errors} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "10px", color: "#9C988E", textTransform: "uppercase", letterSpacing: "0.09em", display: "block", marginBottom: "6px" }}>Message</label>
            <textarea name="message" required rows={4} style={{ ...INPUT, resize: "none" }} />
            <ValidationError field="message" prefix="Message" errors={state.errors} />
          </div>
          <button
            type="submit"
            disabled={state.submitting}
            style={{
              width: "100%",
              padding: "11px",
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
            {state.submitting ? "Sending…" : "Send message →"}
          </button>
        </form>
      )}
    </div>
  );
}

export function ContactStation() {
  return (
    <group position={[96, 0, 0]}>

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
            Contact
          </h2>
        </Html>
      </Float>

      <mesh position={[0, 4.52, 0]}>
        <boxGeometry args={[4.2, 0.01, 0.01]} />
        <meshStandardMaterial color="#6a3a12" emissive="#A8642E" emissiveIntensity={0.8} />
      </mesh>

      {/* Form */}
      <Html position={[-7, 2.1, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
        <ContactForm />
      </Html>

      {/* Social links */}
      <Html position={[7, 2.1, 0]} center transform distanceFactor={9} zIndexRange={[1, 2]}>
        <div style={{ width: "280px", fontFamily: SANS }}>
          <p style={{ fontSize: "10px", color: "#9C988E", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>
            Find me on
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { label: "Email",    value: "mnicolas03sp@gmail.com",          href: "mailto:mnicolas03sp@gmail.com" },
              { label: "GitHub",   value: "github.com/ElSenpaiSAMA",         href: "https://github.com/ElSenpaiSAMA" },
              { label: "LinkedIn", value: "linkedin.com/in/matias-speroni",  href: "https://linkedin.com/in/matias-speroni" },
            ].map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...PANEL,
                  display: "block",
                  padding: "13px 16px",
                  textDecoration: "none",
                }}
              >
                <p style={{ fontSize: "10px", color: "#A8642E", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "3px" }}>{label}</p>
                <p style={{ fontSize: "12px", color: "#9C988E" }}>{value}</p>
              </a>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
