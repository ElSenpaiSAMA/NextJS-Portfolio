import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80svh] max-w-7xl flex-col justify-center px-5 pt-24 sm:px-8">
      <p className="display ink-sunset w-fit text-[clamp(6rem,25vw,18rem)]" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-haze">This page does not exist.</h1>
      <Link href="/" className="mt-6 w-fit font-semibold text-haze underline decoration-haze/30 underline-offset-4 hover:text-sunset">
        Back to the homepage
      </Link>
    </div>
  );
}
