// @ts-check
import globals from "globals"
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import tsParser from "@typescript-eslint/parser"
import eslintPluginSvelte from "eslint-plugin-svelte"
import eslintConfigPrettier from "eslint-config-prettier"
import svelteParser from "svelte-eslint-parser"
import svelteConfig from "./svelte.config.js"

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...eslintPluginSvelte.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    files: ["**/*.{js,ts,svelte}"],
  },
  {
    ignores: ["node_modules", "dist"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.js"],
        },
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: [".svelte"],
      },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
        svelteConfig,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
)
