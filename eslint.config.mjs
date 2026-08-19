import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs}"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
          },
          groups: [
            "type",
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
          ],
          "newlines-between": "always",
          pathGroups: [
            {
              group: "internal",
              pattern: "@/**",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          warnOnUnassignedImports: false,
        },
      ],
      "jsx-a11y/alt-text": "off",
    },
  },
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
