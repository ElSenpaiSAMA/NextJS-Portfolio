"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 cursor-pointer hover:from-pink-400 hover:to-purple-400 transition-all duration-300">
            Matias Speroni
          </h1>
        </Link>

        <ul className="hidden md:flex space-x-8">
          <li>
            <Link
              href="/"
              className={`${
                isActive("/")
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                  : "text-purple-300"
              } hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300 font-medium`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/sobre-mi"
              className={`${
                isActive("/sobre-mi")
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                  : "text-purple-300"
              } hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300 font-medium`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/proyectos"
              className={`${
                isActive("/proyectos")
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                  : "text-purple-300"
              } hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300 font-medium`}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/contacto"
              className={`${
                isActive("/contacto")
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                  : "text-purple-300"
              } hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300 font-medium`}
            >
              Contact
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-purple-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <ul className="md:hidden mt-4 space-y-4 bg-black/40 backdrop-blur-md rounded-lg p-4 border border-purple-500/30">
          <li>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`block ${
                isActive("/")
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                  : "text-purple-300"
              } hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300 font-medium`}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href="/sobre-mi"
              onClick={() => setIsOpen(false)}
              className={`block ${
                isActive("/sobre-mi")
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                  : "text-purple-300"
              } hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300 font-medium`}
            >
              Sobre mí
            </Link>
          </li>
          <li>
            <Link
              href="/proyectos"
              onClick={() => setIsOpen(false)}
              className={`block ${
                isActive("/proyectos")
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                  : "text-purple-300"
              } hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300 font-medium`}
            >
              Proyectos
            </Link>
          </li>
          <li>
            <Link
              href="/contacto"
              onClick={() => setIsOpen(false)}
              className={`block ${
                isActive("/contacto")
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                  : "text-purple-300"
              } hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300 font-medium`}
            >
              Contacto
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

