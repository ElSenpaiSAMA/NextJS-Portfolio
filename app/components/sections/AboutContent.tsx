"use client";

const F = "var(--font-fraunces), Georgia, serif";
const S = "var(--font-hanken), system-ui, sans-serif";

const PANEL: React.CSSProperties = {
  background: "rgba(10, 8, 5, 0.78)",
  border: "1px solid rgba(168, 100, 46, 0.14)",
  borderRadius: "3px",
  backdropFilter: "blur(12px)",
};

const STACK = [
  ".NET", "C#", "React", "Next.js", "TypeScript", "FastAPI",
  "PostgreSQL", "Supabase", "Docker", "Python", "Pandas", "Ollama",
];

export function AboutContent() {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      padding: "80px 8% 24px",
      overflowY: "auto",
    }}>
      <div style={{ marginBottom: "24px", flexShrink: 0 }}>
        <h2 style={{ fontFamily: F, fontSize: "clamp(38px, 4.5vw, 60px)", fontWeight: 400, color: "#f0ede8", letterSpacing: "-0.03em", margin: "0 0 10px", lineHeight: 1 }}>About</h2>
        <div style={{ width: "36px", height: "1px", background: "#A8642E", opacity: 0.6 }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", flexShrink: 0 }}>
        {/* Bio */}
        <div style={{ ...PANEL, padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(168,100,46,0.25)", flexShrink: 0 }}>
              <img src="/104552415.jpg" alt="Matias" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <h3 style={{ fontFamily: F, fontSize: "20px", color: "#f0ede8", fontWeight: 400, letterSpacing: "-0.02em", margin: 0 }}>Matias Speroni</h3>
              <p style={{ fontFamily: S, fontSize: "10px", color: "#A8642E", textTransform: "uppercase", letterSpacing: "0.1em", margin: "3px 0 0" }}>Barcelona, Spain</p>
            </div>
          </div>
          <p style={{ fontFamily: S, fontSize: "13px", color: "#6E6A62", lineHeight: 1.7, marginBottom: "12px" }}>
            Backend &amp; fullstack developer specialized in .NET and React. Working at Imagine building data and AI products end to end.
          </p>
          <p style={{ fontFamily: S, fontSize: "13px", color: "#6E6A62", lineHeight: 1.7, marginBottom: "12px" }}>
            Studying Applied Data Science. Solid understanding of Docker and CI/CD to package and deploy applications and features.
          </p>
          <p style={{ fontFamily: S, fontSize: "13px", color: "#6E6A62", lineHeight: 1.7 }}>
            I love technology, cinema and music. Passionate about traveling and discovering new cultures.
          </p>

          <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid rgba(168,100,46,0.12)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { label: "Based in", value: "Barcelona, Spain" },
              { label: "Role", value: "Backend & Fullstack" },
              { label: "Focus", value: "Data & AI" },
              { label: "Languages", value: "ES · EN" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontFamily: S, fontSize: "10px", color: "#4a4540", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>{label}</p>
                <p style={{ fontFamily: S, fontSize: "12px", color: "#c8c4bc", fontWeight: 500 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div>
          <p style={{ fontFamily: S, fontSize: "10px", color: "#9C988E", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Stack</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "7px" }}>
            {STACK.map((name) => (
              <div key={name} style={{ ...PANEL, padding: "11px 8px", textAlign: "center" }}>
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#A8642E", margin: "0 auto 6px", boxShadow: "0 0 4px #A8642E88" }} />
                <p style={{ fontFamily: S, fontSize: "11px", color: "#c8c4bc", fontWeight: 500, margin: 0 }}>{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
