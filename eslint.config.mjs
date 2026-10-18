import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Claude Code skills ship third-party example code; it isn't part of the app
    ".claude/**",
    // Generated test / audit artifacts
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    ".lighthouseci/**",
  ]),
]);

export default eslintConfig;
