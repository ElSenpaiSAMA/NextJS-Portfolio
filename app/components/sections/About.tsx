import { profile } from "../../data/profile";
import { Section } from "../ui/Section";

export function About() {
  return (
    <Section id="about" index="05" title="About">
      <div className="max-w-2xl space-y-4 text-lg leading-relaxed">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="font-mono text-sm text-subtle">
          {profile.location} · {profile.languages.join(" / ")}
        </p>
      </div>
    </Section>
  );
}
