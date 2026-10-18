import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80svh] max-w-6xl flex-col justify-center px-5 pt-24 font-mono sm:px-8">
      <p aria-hidden="true" className="text-sm text-fg-subtle">
        <span className="text-amber">$</span> cd ./this-page
      </p>
      <p aria-hidden="true" className="mt-2 text-sm text-red">
        cd: no such file or directory (404)
      </p>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-fg sm:text-5xl">This page does not exist.</h1>
      <Link href="/" className="mt-8 w-fit text-cyan underline decoration-cyan/30 underline-offset-4 hover:text-amber">
        cd ~ (back to the homepage)
      </Link>
    </div>
  );
}
