"use client";

import { useEffect, useState } from "react";

const LINE1_S = 1.5;       // duration "Matias"
const LINE2_DELAY_S = LINE1_S + 0.2;
const LINE2_S = 1.7;       // duration "Speroni"
const TOTAL_S = LINE2_DELAY_S + LINE2_S;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), (TOTAL_S + 0.4) * 1000);
    const hideTimer = setTimeout(() => setVisible(false), (TOTAL_S + 0.9) * 1000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FBFAF7",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <style>{`
        .ms-wrap {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* Each line row holds the text + the moving pen tip */
        .ms-row {
          position: relative;
          display: block;
        }

        /* Cursive text */
        .ms-word {
          font-family: var(--font-dancing), cursive;
          font-size: clamp(50px, 12vw, 82px);
          font-weight: 600;
          color: #1B1A17;
          display: block;
          line-height: 1.3;
          white-space: nowrap;
          user-select: none;
        }

        /* Clip sweeps left → right, revealing the ink as it passes */
        .ms-word-1 {
          clip-path: inset(-20% 100% -20% 0);
          animation: ms-write ${LINE1_S}s ${EASE} forwards 0.2s;
        }
        .ms-word-2 {
          clip-path: inset(-20% 100% -20% 0);
          animation: ms-write ${LINE2_S}s ${EASE} forwards ${LINE2_DELAY_S}s;
        }
        @keyframes ms-write {
          from { clip-path: inset(-20% 100% -20% 0); }
          to   { clip-path: inset(-20%   0% -20% 0); }
        }

        /* Pen tip — a small dot that leads the sweep */
        .ms-pen {
          position: absolute;
          top: 55%;
          transform: translate(-50%, -50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #A8642E;
          pointer-events: none;
          opacity: 0;
        }
        .ms-pen-1 {
          animation: ms-pen-move ${LINE1_S}s ${EASE} forwards 0.2s;
        }
        .ms-pen-2 {
          animation: ms-pen-move ${LINE2_S}s ${EASE} forwards ${LINE2_DELAY_S}s;
        }
        @keyframes ms-pen-move {
          0%  { left: 1%;  opacity: 1; }
          97% { opacity: 1; }
          100%{ left: 99%; opacity: 0; }
        }

        /* Accent underline draws after the name is complete */
        .ms-underline {
          height: 1px;
          width: 0;
          background: #A8642E;
          margin-top: 2px;
          animation: ms-underline 0.45s ease forwards ${TOTAL_S + 0.05}s;
        }
        @keyframes ms-underline {
          to { width: 100%; }
        }
      `}</style>

      <div className="ms-wrap">
        <div className="ms-row">
          <span className="ms-word ms-word-1">Matias</span>
          <span className="ms-pen ms-pen-1" />
        </div>
        <div className="ms-row">
          <span className="ms-word ms-word-2">Speroni</span>
          <span className="ms-pen ms-pen-2" />
        </div>
        <div className="ms-underline" />
      </div>
    </div>
  );
}
