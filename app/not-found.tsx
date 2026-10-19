import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80svh] max-w-[980px] flex-col items-center justify-center px-5 pt-24 text-center sm:px-8">
      <p aria-hidden="true" className="headline ink-gradient w-fit text-[clamp(6rem,22vw,12rem)] leading-none">
        404
      </p>
      <h1 className="headline mt-6 text-[clamp(2rem,5vw,3rem)]">This page does not exist.</h1>
      <Link href="/" className="mt-6 text-[17px] text-link-dark hover:underline">
        Back to the homepage
      </Link>
    </div>
  );
}
