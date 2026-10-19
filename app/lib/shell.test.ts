import { describe, expect, it } from "vitest";
import { certifications, education, experience } from "../data/experience";
import { STAGES } from "../data/pipeline";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { SHELL_COMMANDS } from "../data/shell";
import { stack } from "../data/stack";
import { complete, runCommand, shortHash, since } from "./shell";

const content = { profile, stack, projects, experience, education, certifications, stages: STAGES };
const text = (input: string) =>
  runCommand(input, content)
    .lines.map((l) => l.text)
    .join("\n");

describe("runCommand", () => {
  it("prints nothing for an empty line", () => {
    expect(runCommand("   ", content)).toEqual({ lines: [] });
  });

  it("lists every command in help, and help lists only commands that exist", () => {
    for (const { name, usage } of SHELL_COMMANDS) {
      expect(text("help")).toContain(usage);
      expect(text(name === "git" ? "git log" : name === "make" ? "make deploy" : name)).not.toMatch(/command not found/);
    }
  });

  it("prints files from the real content", () => {
    expect(text("cat about.md")).toContain(profile.about[0]);
    expect(text("cat ~/stack.yaml")).toContain("  - Kubernetes  # Pods, Deployments, Services, Ingress");
    expect(text("cat projects/mira")).toContain(projects[0].description);
    expect(text("cat ./projects/portfolio/README.md")).toContain("# Portfolio");
    expect(text("ls projects")).toBe(projects.map((p) => `${p.slug}/`).join("  "));
    expect(text("git log")).toContain(`${experience[0].roles[0].period}  ${experience[0].roles[0].title}`);
  });

  it("explains what went wrong", () => {
    expect(text("cat nope.txt")).toBe("cat: nope.txt: No such file or directory");
    expect(text("cat projects")).toBe("cat: projects: Is a directory");
    expect(text("frobnicate")).toBe("frobnicate: command not found. Type 'help'.");
    expect(text("sudo rm -rf /")).toMatch(/not in the sudoers file/);
  });

  it("turns navigation into actions", () => {
    expect(runCommand("cd projects", content).action).toEqual({ type: "scroll", id: "projects" });
    expect(runCommand("cd", content).action).toEqual({ type: "scroll", id: "top" });
    expect(runCommand("cd ~/about.md", content).action).toEqual({ type: "scroll", id: "about" });
    expect(runCommand("make deploy", content).action).toEqual({ type: "scroll", id: "contact" });
    expect(runCommand("open mira", content).action).toEqual({ type: "open", url: projects[0].siteLink });
    expect(runCommand("open spotify-pipeline", content).action).toEqual({ type: "open", url: projects[1].github });
    expect(runCommand("cv", content).action).toEqual({ type: "download", url: profile.cvUrl });
    expect(runCommand("clear", content).action).toEqual({ type: "clear" });
  });

  it("links contact lines to the real channels", () => {
    const hrefs = runCommand("contact", content).lines.map((l) => l.href);
    expect(hrefs).toContain(`mailto:${profile.email}`);
    expect(hrefs).toContain(profile.linkedinUrl);
  });

  it("numbers the history", () => {
    expect(runCommand("history", content, ["ls", "help"]).lines.map((l) => l.text)).toEqual(["   1  ls", "   2  help"]);
  });

  it("dates the uptime from the oldest role", () => {
    expect(since(experience)).toBe("11/2024");
    expect(text("neofetch")).toContain("since 11/2024");
  });
});

describe("complete", () => {
  it("completes a unique command or file", () => {
    expect(complete("neo", content)).toBe("neofetch ");
    expect(complete("cat ab", content)).toBe("cat about.md ");
    expect(complete("cat projects/mi", content)).toBe("cat projects/mira ");
    expect(complete("ls proj", content)).toBe("ls projects/");
  });

  it("stops at the shared prefix, and gives up when nothing matches", () => {
    expect(complete("c", content)).toBe(null); // cat, cd, contact, cv, clear
    expect(complete("cat projects/s", content)).toBe(null); // spotify-pipeline, study-bot, sala-de-reservas
    expect(complete("zzz", content)).toBe(null);
  });
});

describe("shortHash", () => {
  it("is a stable 7-char hex per name", () => {
    expect(shortHash("Imagine Group")).toMatch(/^[0-9a-f]{7}$/);
    expect(shortHash("Imagine Group")).toBe(shortHash("Imagine Group"));
    expect(shortHash("Imagine Group")).not.toBe(shortHash("Novicell ES"));
  });
});
