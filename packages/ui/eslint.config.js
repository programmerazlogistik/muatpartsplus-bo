// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { nextJsConfig } from "@muatmuat/config/eslint-next";
import storybook from "eslint-plugin-storybook";

const eslintConfig = [
  ...nextJsConfig, // Add any UI-specific overrides here if needed
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    rules: {
      // UI-specific rule overrides can go here
    },
  }, // Exclude SCSS files from ESLint since they're handled by Sass/Tailwind
  // Exclude SCSS files and TypeScript declaration files from ESLint
  {
    ignores: [
      "src/**/*.scss",
      "src/**/*.css",
      "**/*.d.ts",
      "src/types/**/*",
      "src/**/*.stories.*",
      "src/**/*.test.*",
    ],
  },
  ...storybook.configs["flat/recommended"],
];

export default eslintConfig;
