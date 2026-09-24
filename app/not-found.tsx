import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-5 py-24">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">This page does not exist.</h1>
      <Link href="/" className="mt-6 w-fit text-sm font-medium text-accent underline-offset-4 hover:underline">
        ← Back to the homepage
      </Link>
    </main>
  );
}
