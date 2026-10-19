import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG, configToCss, highlightConfig, parseConfig, serializeConfig } from "./site-config";

describe("portfolio.config parser", () => {
  it("round-trips the default config with no problems", () => {
    const { config, problems } = parseConfig(serializeConfig(DEFAULT_CONFIG));
    expect(problems).toEqual([]);
    expect(config).toEqual(DEFAULT_CONFIG);
  });

  it("applies valid edits", () => {
    const text = serializeConfig(DEFAULT_CONFIG).replace('"light"', '"dark"').replace("12,", "0,").replace('"#2f5bff"', "'#f0a'");
    expect(parseConfig(text).config).toMatchObject({ theme: "dark", radius: 0, accent: "#f0a" });
  });

  it("reports bad values per line and keeps the defaults for them", () => {
    const text = ["export default {", '  accent: "blue",', "  radius: 99,", '  theme: "neon",', '  font: "comic",', "};"].join("\n");
    const { config, problems } = parseConfig(text);
    expect(problems.map((p) => p.line)).toEqual([2, 3, 4, 5]);
    expect(config).toEqual(DEFAULT_CONFIG);
  });

  it("flags unknown keys and malformed lines, never evaluates code", () => {
    const text = ["export default {", "  hack: alert(1),", "  this is not code", "};"].join("\n");
    const { problems } = parseConfig(text);
    expect(problems[0].message).toMatch(/Unknown key 'hack'/);
    expect(problems[1].message).toMatch(/Expected `key: value,`/);
  });

  it("requires the export default wrapper", () => {
    expect(parseConfig("accent: \"#000\"").problems[0].message).toMatch(/export default/);
  });

  it("maps to CSS variables and attributes", () => {
    expect(configToCss({ ...DEFAULT_CONFIG, radius: 4, theme: "dark" })).toEqual({
      vars: { "--accent": DEFAULT_CONFIG.accent, "--r": "4px" },
      attrs: { "data-theme": "dark", "data-font": "sans" },
    });
  });
});

describe("highlightConfig", () => {
  it("keeps every character and tags keys, strings, numbers and comments", () => {
    const text = serializeConfig(DEFAULT_CONFIG);
    const lines = highlightConfig(text);
    expect(lines.map((l) => l.map((t) => t.text).join("")).join("\n")).toBe(text);
    const kinds = new Set(lines.flat().map((t) => t.kind));
    for (const kind of ["keyword", "key", "string", "number", "comment", "punct"]) expect(kinds).toContain(kind);
  });
});
