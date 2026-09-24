import type { Metadata } from "next";
import { ContactDetails } from "../components/contact/ContactDetails";
import { ContactForm } from "../components/contact/ContactForm";
import { Block } from "../components/ui/Block";
import { PageHeader } from "../components/ui/PageHeader";
import { profile } from "../data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Matias Speroni about junior Platform / DevOps roles.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s talk"
        intro={`${profile.availability}. Email is the quickest way to reach me; the form goes to the same inbox.`}
      />
      <Block title="Directly">
        <ContactDetails />
      </Block>
      <Block title="Send a message">
        <div className="max-w-md">
          <ContactForm formId={profile.formspreeId} />
        </div>
      </Block>
    </>
  );
}
