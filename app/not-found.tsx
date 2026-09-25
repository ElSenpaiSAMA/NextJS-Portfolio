import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-28">
      <p className="label">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">This page does not exist.</h1>
      <Link href="/" className="mt-6 inline-block font-medium text-accent underline-offset-4 hover:underline">
        ← Back to the homepage
      </Link>
    </div>
  );
}
