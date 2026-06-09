export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-faint">
        <span>© {year} Matias Speroni</span>
        <span>Barcelona, Spain</span>
      </div>
    </footer>
  );
}
