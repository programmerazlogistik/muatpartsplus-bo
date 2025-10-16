import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  // 1. Core ESLint rules
  js.configs.recommended,

  // 2. Next.js presets using the new recommended syntax.
  // 'next/core-web-vitals' includes React, Hooks, and Next.js specific rules.
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "prettier", // This must be last to override formatting rules.
    ],
  }),

  // 3. Your custom configurations, rules, and overrides.
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: {
      // Only plugins for your custom rules are needed here.
      prettier,
    },
    rules: {
      // Core JavaScript/ES6 rules
      "no-console": "warn",
      "no-undef": "error",
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-constant-condition": "off",
      "no-constant-binary-expression": "off",
      "no-useless-escape": "off",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      semi: "error",

      // React rules that should be errors
      "react/jsx-no-undef": "error",
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
      "react/no-unescaped-entities": "off",

      // -- Your Other Overrides --
      "@next/next/no-img-element": "off",
    },
    languageOptions: {
      globals: {
        React: "readonly",
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },

  // 4. TypeScript-specific configuration
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      prettier,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      // TypeScript-specific rules
      "no-undef": "off", // Disable no-undef for TypeScript as it handles type checking
      "no-unused-vars": "off", // Disable in favor of TypeScript's unused vars
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // Core JavaScript/ES6 rules for TypeScript files
      "no-console": "warn",
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-constant-condition": "off",
      "no-constant-binary-expression": "off",
      "no-useless-escape": "off",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      semi: "error",

      // React rules that should be errors
      "react/jsx-no-undef": "error",
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
      "react/no-unescaped-entities": "off",

      // -- Your Other Overrides --
      "@next/next/no-img-element": "off",
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },

  // 5. Storybook configurations
  ...storybook.configs["flat/recommended"],
];
