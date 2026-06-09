"use client";

import { useState, useEffect } from "react";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "mnicolas03sp@gmail.com",
    href: "mailto:mnicolas03sp@gmail.com",
    external: false,
  },
  {
    label: "GitHub",
    value: "github.com/ElSenpaiSAMA",
    href: "https://github.com/ElSenpaiSAMA",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/matias-speroni",
    href: "https://www.linkedin.com/in/matias-speroni",
    external: true,
  },
];

export default function ContactDrawer() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Listen for external open trigger (e.g. Hero "Get in touch" button)
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-contact-drawer", handler);
    return () => window.removeEventListener("open-contact-drawer", handler);
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(27, 26, 23, 0.15)",
          backdropFilter: "blur(2px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Contact"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transform: open ? "translateY(0)" : "translateY(calc(100% - 52px))",
          transition: "transform 0.42s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Pill trigger */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 28px",
              background: "#1B1A17",
              color: "#FBFAF7",
              border: "none",
              borderRadius: "20px 20px 0 0",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.01em",
              boxShadow: "0 -4px 20px rgba(27, 26, 23, 0.12)",
              userSelect: "none",
              lineHeight: "1",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transition: "transform 0.35s ease",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                fontSize: "12px",
              }}
            >
              ↑
            </span>
            {open ? "Close" : "Want to get in touch?"}
          </button>
        </div>

        {/* Panel — hidden from rendering when closed so no white strip shows */}
        <div
          style={{
            visibility: open ? "visible" : "hidden",
            transition: open ? "visibility 0s" : "visibility 0s linear 0.42s",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderTop: "1px solid #E7E4DC",
              boxShadow: "0 -8px 40px rgba(27, 26, 23, 0.1)",
              maxHeight: "50vh",
              overflowY: "auto",
            }}
          >
            <div style={{ maxWidth: "480px", margin: "0 auto", padding: "40px 24px 48px" }}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "26px",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: "#1B1A17",
                  marginBottom: "6px",
                }}
              >
                Let&apos;s talk
              </h2>
              <p style={{ fontSize: "13px", color: "#6E6A62", marginBottom: "36px" }}>
                Open to backend and fullstack opportunities — reach out anytime.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {CONTACT_LINKS.map(({ label, value, href, external }, i) => (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      padding: "16px 0",
                      borderTop: i === 0 ? "1px solid #E7E4DC" : "1px solid #E7E4DC",
                      borderBottom: i === CONTACT_LINKS.length - 1 ? "1px solid #E7E4DC" : "none",
                      textDecoration: "none",
                      color: "inherit",
                      gap: "24px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget.querySelector(".link-value") as HTMLElement).style.color = "#A8642E";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget.querySelector(".link-value") as HTMLElement).style.color = "#1B1A17";
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#9C988E",
                        flexShrink: 0,
                        minWidth: "72px",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      className="link-value"
                      style={{
                        fontSize: "14px",
                        color: "#1B1A17",
                        fontFamily: "var(--font-sans)",
                        transition: "color 0.15s ease",
                      }}
                    >
                      {value}
                    </span>
                    <span style={{ fontSize: "12px", color: "#9C988E", flexShrink: 0 }}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
