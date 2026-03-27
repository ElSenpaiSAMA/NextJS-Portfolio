"use client";

// Componente de pantalla de carga con efecto de terminal animado

import { useState, useEffect, useMemo } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const lines = [
    "> Initializing system...",
    "> Connecting to server...",
    "> Verifying credentials...",
    "> Decrypting data...",
    "> Loading modules...",
    "> Establishing secure connection...",
    "> Accessing portfolio...",
    "> ACCESS GRANTED",
  ];

  const randomNumbers = useMemo(() => 
    [3, 7, 1, 9, 4, 2, 8, 6, 5, 0, 3, 7, 1, 9, 4, 2, 8, 6, 5, 0], 
    []
  );

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= lines.length - 1) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 350);

    const unlockTimer = setTimeout(() => {
      setIsUnlocked(true);
    }, 2600);

    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
      clearTimeout(unlockTimer);
      clearTimeout(hideTimer);
    };
  }, [lines.length]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-all duration-700 ${
        isUnlocked ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      <div className="max-w-2xl w-full px-8">
        <div className="mb-8 text-center">
          <div className="inline-block px-6 py-3 border-2 border-purple-500/50 rounded-lg mb-4">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 font-mono">
              SISTEMA DE ACCESO
            </h1>
          </div>
        </div>

        <div className="bg-black/60 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
          <div className="space-y-2 mb-6 font-mono text-sm">
            {lines.slice(0, currentLine + 1).map((line, i) => (
              <div
                key={i}
                className={`${
                  i === lines.length - 1 && isUnlocked
                    ? "text-green-400 text-lg font-bold animate-pulse"
                    : "text-purple-400"
                } transition-all duration-300`}
                style={{
                  textShadow:
                    i === lines.length - 1 && isUnlocked
                      ? "0 0 10px rgba(74, 222, 128, 0.8)"
                      : "0 0 5px rgba(168, 85, 247, 0.5)",
                }}
              >
                {line}
                {i === currentLine && !isUnlocked && (
                  <span className="inline-block w-2 h-4 bg-purple-400 ml-1 animate-pulse" />
                )}
              </div>
            ))}
          </div>

          {!isUnlocked && (
            <>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-purple-400 mb-1 font-mono">
                  <span>Progreso</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-3 bg-gray-900 rounded-full overflow-hidden border border-purple-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 transition-all duration-300 relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="flex gap-1 justify-center mt-4 flex-wrap">
                {randomNumbers.map((num, i) => (
                  <span
                    key={i}
                    className="text-purple-500/50 text-xs font-mono animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </>
          )}

          {isUnlocked && (
            <div className="text-center mt-4">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 border-2 border-green-500 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-green-400 font-bold text-lg font-mono">
                  DESBLOQUEADO
                </span>
              </div>
            </div>
          )}
        </div>

        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(168, 85, 247, 0.05) 50%, transparent 100%)",
            animation: "scan 2s linear infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
}
