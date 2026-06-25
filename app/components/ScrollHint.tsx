"use client";

const SANS = "var(--font-hanken), system-ui, sans-serif";

export function ScrollHint() {
  return (
    <>
      <style>{`
        @keyframes scrollFloat {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(7px); }
        }
      `}</style>
      <div
        id="scroll-hint"
        style={{
          position: "fixed",
          bottom: "38px",
          left: "50%",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          pointerEvents: "none",
          transition: "opacity 1s ease",
          animation: "scrollFloat 2.2s ease-in-out infinite",
          transform: "translateX(-50%)",
        }}
      >
        <span style={{
          fontFamily: SANS,
          fontSize: "9px",
          color: "#A8642E",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}>
          Scroll
        </span>
        <div style={{
          width: "1px",
          height: "36px",
          background: "linear-gradient(to bottom, rgba(168,100,46,0.9), transparent)",
        }} />
      </div>
    </>
  );
}
