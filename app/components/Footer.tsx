export default function Footer() {
  return (
    <footer className="bg-black border-t border-purple-500/30 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <span className="text-purple-400 text-sm sm:text-base">⭐</span>
          <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        </div>
        <p className="text-purple-300/60 text-xs sm:text-sm px-4">
          © 2025 All rights reserved to Matias Speroni.
        </p>
      </div>
    </footer>
  );
}

