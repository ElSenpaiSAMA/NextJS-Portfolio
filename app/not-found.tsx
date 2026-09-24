import type { Metadata } from "next";
import { PageHeader } from "./components/ui/PageHeader";
import { TextLink } from "./components/ui/TextLink";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <PageHeader eyebrow="404" title="This page does not exist.">
      <div className="mt-8">
        <TextLink href="/">Back to the homepage</TextLink>
      </div>
    </PageHeader>
  );
}
