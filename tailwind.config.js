import preset from "@muatmuat/tailwind-config/preset";

/**
 * @type {import('tailwindcss').Config}
 */
const config = {
  presets: [preset],
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
