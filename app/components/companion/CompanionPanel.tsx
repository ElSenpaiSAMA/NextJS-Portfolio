"use client";

import Image from "next/image";
import { useState } from "react";
import { SECTION_ORDER, type Answer, type CompanionSection } from "../../lib/companion";
import type { DeployStep } from "../../lib/deploy";
import { useActiveSection } from "../../lib/active-section";
import { NAV_ITEMS } from "../../lib/site";
import { DeployWidget } from "../ship/DeployWidget";
import { Typewriter } from "./Typewriter";

export interface CompanionData {
  name: string;
  avatar: string;
  narration: Record<CompanionSection, string>;
  answers: Answer[];
  deploy: { steps: DeployStep[]; command: string };
}

type Tab = "guide" | "ask" | "deploy";
const TABS: { id: Tab; label: string }[] = [
  { id: "guide", label: "Guide" },
  { id: "ask", label: "Ask" },
  { id: "deploy", label: "Deploy" },
];

const SECTION_LABEL: Record<string, string> = {
  top: "Intro",
  contact: "Contact",
  ...Object.fromEntries(NAV_ITEMS.map(({ id, label }, i) => [id, `${String(i + 1).padStart(2, "0")} ${label}`])),
};

/**
 * The companion's content: a header with live status, three tabs and the
 * avatar. Guide narrates the section in view (typed); Ask answers quick
 * questions from the CV; Deploy runs the site's real pipeline.
 */
export function CompanionPanel({ data, idPrefix }: { data: CompanionData; idPrefix: string }) {
  const section = useActiveSection() as CompanionSection;
  const [tab, setTab] = useState<Tab>("guide");
  const [asked, setAsked] = useState<Answer | null>(null);
  const firstName = data.name.split(" ")[0];
  const next = SECTION_ORDER[SECTION_ORDER.indexOf(section) + 1];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-ui border border-line bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
          <span aria-hidden="true" className="pulse-dot h-2 w-2 rounded-full bg-ok" />
          {firstName} · companion
        </p>
        <p className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-fg-subtle">
          viewing: <span className="text-fg">{SECTION_LABEL[section] ?? "Intro"}</span>
        </p>
      </div>

      <div role="tablist" aria-label="Companion" className="flex gap-1 border-b border-line px-3 py-2">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`${idPrefix}-panel-${id}`}
            onClick={() => setTab(id)}
            className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${tab === id ? "bg-surface-2 text-fg" : "text-fg-muted hover:text-fg"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${idPrefix}-panel-${tab}`} aria-labelledby={`${idPrefix}-tab-${tab}`} className="flex min-h-0 flex-1 flex-col p-4">
        {tab === "guide" && (
          <>
            <div className="relative rounded-xl border border-line bg-surface-2 p-4">
              <p className="min-h-[7.5rem] font-mono text-[13px] leading-relaxed">
                <Typewriter text={data.narration[section] ?? data.narration.top} />
              </p>
              <span aria-hidden="true" className="absolute -bottom-2 left-10 h-4 w-4 rotate-45 border-b border-r border-line bg-surface-2" />
            </div>
            {next && (
              <a
                href={`#${next}`}
                className="mt-5 inline-flex w-fit items-center gap-2 self-end rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:border-accent hover:text-fg"
              >
                Next: {SECTION_LABEL[next]} <span aria-hidden="true">↓</span>
              </a>
            )}
            <Avatar src={data.avatar} name={data.name} />
          </>
        )}

        {tab === "ask" && (
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <ul className="flex flex-wrap gap-2">
              {data.answers.map((a) => (
                <li key={a.question}>
                  <button
                    type="button"
                    onClick={() => setAsked(a)}
                    aria-pressed={asked?.question === a.question}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      asked?.question === a.question ? "border-accent text-fg" : "border-line text-fg-muted hover:border-fg-subtle hover:text-fg"
                    }`}
                  >
                    {a.question}
                  </button>
                </li>
              ))}
            </ul>
            <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-line bg-surface-2 p-4 font-mono text-[13px] leading-relaxed" data-testid="companion-answer">
              {asked ? (
                <>
                  <p className="text-accent-text">&gt; {asked.question}</p>
                  <p className="mt-2">
                    <Typewriter key={asked.question} text={asked.answer} cps={90} />
                  </p>
                </>
              ) : (
                <p className="text-fg-subtle">Pick a question — the answers come straight from my CV.</p>
              )}
            </div>
          </div>
        )}

        {tab === "deploy" && (
          <div className="min-h-0 flex-1 overflow-y-auto">
            <DeployWidget steps={data.deploy.steps} command={data.deploy.command} />
          </div>
        )}
      </div>
    </div>
  );
}

function Avatar({ src, name }: { src: string; name: string }) {
  return (
    <div className="mt-6 flex flex-1 items-end justify-center">
      <div className="float relative">
        <div aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-accent/30 blur-2xl" />
        <Image src={src} alt={`Avatar of ${name}`} width={168} height={168} loading="eager" className="h-40 w-40 rounded-full border-2 border-accent/60 object-cover xl:h-44 xl:w-44" />
      </div>
    </div>
  );
}
