import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80svh] max-w-6xl flex-col justify-center px-5 pt-24 sm:px-8">
      <p aria-hidden="true" className="font-mono text-sm text-error">
        Error: Cannot find module &apos;./this-page&apos; (404)
      </p>
      <h1 className="display mt-6 text-[clamp(2.75rem,8vw,6rem)]">This page does not exist.</h1>
      <Link href="/" className="mt-8 w-fit font-mono text-sm text-accent hover:underline">
        cd ~ (back to the homepage)
      </Link>
    </div>
  );
}
