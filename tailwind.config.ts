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
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#070B14",
          light: "#0E1625",
          highlight: "#1B2A44",
          card: "#111827",
        },
        cta: {
          DEFAULT: "#C81E1E",
          hover: "#E02D2D",
          dark: "#B11226",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
