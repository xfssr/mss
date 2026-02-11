import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts}",
    "./utils/**/*.{js,ts}",
    "./hooks/**/*.{js,ts}",
    "./types/**/*.{js,ts}",
    "./lib/**/*.{js,ts}",
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
