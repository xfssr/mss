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
        gold: {
          DEFAULT: "#C6A75E",
          dark: "#8E7B4F",
          light: "#D4BA7A",
        },
        luxury: {
          bg: "#0A0A0C",
          card: "#141416",
          surface: "#121214",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Cormorant", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
