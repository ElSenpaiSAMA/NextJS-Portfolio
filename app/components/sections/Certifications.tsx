import { certifications } from "../../data/experience";
import { Section } from "../ui/Section";

/** The certifications from the CV, as badge cards: issuer monogram, name, year. */
export function Certifications() {
  return (
    <Section id="certifications" index={4} title="Certifications" tagline="courses I finished and can show for">
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <li key={cert.name} data-reveal className="card flex items-center gap-4 p-5">
            <span
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 font-mono text-xs font-bold text-accent-text"
            >
              {cert.issuer.replace(/[^A-Z]/g, "").slice(0, 3) || cert.issuer.slice(0, 3)}
            </span>
            <div className="min-w-0">
              <p className="font-semibold leading-snug">{cert.name}</p>
              <p className="mt-1 font-mono text-xs text-fg-subtle">
                {cert.issuer} · {cert.date}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
