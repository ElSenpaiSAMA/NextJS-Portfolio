import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80svh] max-w-6xl flex-col justify-center px-5 pt-24 sm:px-8">
      <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-error">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-error" />
        404 · NOT_FOUND
      </p>
      <h1 className="display mt-6 text-[clamp(2.75rem,8vw,5.5rem)]">This page does not exist.</h1>
      <Link href="/" className="mt-8 w-fit rounded-ui bg-fg px-4 py-2.5 text-sm font-medium text-bg hover:opacity-85">
        Back to the homepage
      </Link>
    </div>
  );
}
