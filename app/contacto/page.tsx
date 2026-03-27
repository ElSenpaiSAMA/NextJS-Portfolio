"use client";

import { useForm, ValidationError } from "@formspree/react";

export default function ContactoPage() {
  const [state, handleSubmit] = useForm("mrbzwjdp");

  return (
    <section className="min-h-screen relative overflow-hidden bg-black px-4 sm:px-6 py-24 sm:py-32">
      <div className="absolute top-20 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-pink-600/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
            Contact
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-purple-500 to-pink-500 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-500">
              Contact Information
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-white text-sm sm:text-base break-all">mnicolas03sp@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-pink-500 mt-2" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/matías-speroni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors text-sm sm:text-base break-all"
                  >
                    linkedin.com/in/matías-speroni
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">GitHub</p>
                  <a
                    href="https://github.com/ElSenpaiSAMA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors text-sm sm:text-base break-all"
                  >
                    github.com/ElSenpaiSAMA
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            {state.succeeded ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded p-6 text-center">
                <div className="text-green-400 text-lg font-semibold mb-2">
                  ¡Mensaje enviado!
                </div>
                <p className="text-gray-300 text-sm">
                  Gracias por contactarme. Te responderé pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-wider text-gray-500 mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={state.submitting}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded text-white text-sm sm:text-base focus:border-purple-500/50 focus:outline-none transition-colors disabled:opacity-50"
                    placeholder="Tu nombre"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-wider text-gray-500 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={state.submitting}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded text-white text-sm sm:text-base focus:border-purple-500/50 focus:outline-none transition-colors disabled:opacity-50"
                    placeholder="tu@email.com"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-wider text-gray-500 mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    disabled={state.submitting}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded text-white text-sm sm:text-base focus:border-purple-500/50 focus:outline-none resize-none transition-colors disabled:opacity-50"
                    placeholder="Escribe tu mensaje..."
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 border border-white/10 text-white rounded hover:border-purple-500/50 hover:bg-white/10 transition-all font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}

