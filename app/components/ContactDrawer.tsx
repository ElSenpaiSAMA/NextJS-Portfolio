"use client";

import { useState, useEffect, useRef } from "react";

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

interface FormState {
  name: string;
  email: string;
  message: string;
}
const EMPTY: FormState = { name: "", email: "", message: "" };

export default function ContactDrawer() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const pillRef = useRef<HTMLDivElement>(null);
  const [pillH, setPillH] = useState(44);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Measure actual pill height after mount so translateY is exact
  useEffect(() => {
    if (pillRef.current) setPillH(pillRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => firstFieldRef.current?.focus(), 420);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-contact-drawer", handler);
    return () => window.removeEventListener("open-contact-drawer", handler);
  }, []);

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Required";
    if (!form.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Invalid email";
    if (!form.message.trim()) next.message = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormState]) setErrors((p) => ({ ...p, [name]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const sub = encodeURIComponent("Portfolio contact");
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:mnicolas03sp@gmail.com?subject=${sub}&body=${body}`;
  }

  const inputBase =
    "w-full px-3 py-2.5 text-sm bg-paper border outline-none transition-colors duration-150";
  const field = (f: keyof FormState) =>
    `${inputBase} ${errors[f] ? "border-accent" : "border-hairline"} focus:border-ink`;

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

      {/* Drawer — single container: pill + panel move together */}
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
          transform: open ? "translateY(0)" : `translateY(calc(100% - ${pillH}px))`,
          transition: "transform 0.42s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Pill — measured to get exact height */}
        <div
          ref={pillRef}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 22px",
              background: "#1B1A17",
              color: "#FBFAF7",
              border: "none",
              borderRadius: "16px 16px 0 0",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.01em",
              boxShadow: "0 -4px 16px rgba(27, 26, 23, 0.14)",
              userSelect: "none",
              lineHeight: "1.2",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transition: "transform 0.35s ease",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                fontSize: "11px",
              }}
            >
              ↑
            </span>
            {open ? "Close" : "Want to get in touch?"}
          </button>
        </div>

        {/* Panel — visibility: hidden after close so no white strip */}
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
              boxShadow: "0 -8px 40px rgba(27, 26, 23, 0.08)",
              maxHeight: "50vh",
              overflowY: "auto",
            }}
          >
            <div style={{ maxWidth: "560px", margin: "0 auto", padding: "36px 24px 40px" }}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "24px",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: "#1B1A17",
                  marginBottom: "4px",
                }}
              >
                Let&apos;s talk
              </h2>
              <p style={{ fontSize: "13px", color: "#6E6A62", marginBottom: "28px" }}>
                Open to backend and fullstack opportunities — reach out anytime.
              </p>

              {/* Contact links */}
              <div style={{ display: "flex", flexDirection: "column", marginBottom: "28px" }}>
                {CONTACT_LINKS.map(({ label, value, href, external }, i) => (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderTop: "1px solid #E7E4DC",
                      borderBottom: i === CONTACT_LINKS.length - 1 ? "1px solid #E7E4DC" : "none",
                      textDecoration: "none",
                      color: "inherit",
                      gap: "24px",
                      transition: "opacity 0.15s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.55"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                  >
                    <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9C988E", flexShrink: 0, minWidth: "68px" }}>
                      {label}
                    </span>
                    <span style={{ fontSize: "13px", color: "#1B1A17", fontFamily: "var(--font-sans)", flex: 1 }}>
                      {value}
                    </span>
                    <span style={{ fontSize: "11px", color: "#9C988E", flexShrink: 0 }}>↗</span>
                  </a>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label htmlFor="drawer-name" style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9C988E", marginBottom: "5px" }}>
                      Name
                    </label>
                    <input
                      ref={firstFieldRef}
                      type="text" id="drawer-name" name="name"
                      value={form.name} onChange={handleChange}
                      placeholder="Your name"
                      className={field("name")}
                      style={{ borderRadius: "2px", color: "#1B1A17" }}
                    />
                    {errors.name && <p style={{ fontSize: "11px", color: "#A8642E", marginTop: "3px" }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="drawer-email" style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9C988E", marginBottom: "5px" }}>
                      Email
                    </label>
                    <input
                      type="email" id="drawer-email" name="email"
                      value={form.email} onChange={handleChange}
                      placeholder="you@example.com"
                      className={field("email")}
                      style={{ borderRadius: "2px", color: "#1B1A17" }}
                    />
                    {errors.email && <p style={{ fontSize: "11px", color: "#A8642E", marginTop: "3px" }}>{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="drawer-message" style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9C988E", marginBottom: "5px" }}>
                    Message
                  </label>
                  <textarea
                    id="drawer-message" name="message"
                    value={form.message} onChange={handleChange}
                    rows={3} placeholder="What would you like to talk about?"
                    className={field("message")}
                    style={{ borderRadius: "2px", color: "#1B1A17", resize: "none" }}
                  />
                  {errors.message && <p style={{ fontSize: "11px", color: "#A8642E", marginTop: "3px" }}>{errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
