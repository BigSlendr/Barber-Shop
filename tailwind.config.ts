import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          background: "var(--brand-background)",
          surface: "var(--brand-surface)",
          text: "var(--brand-text)",
          accent: "var(--brand-accent)",
          muted: "var(--brand-muted)"
        }
      },
      boxShadow: {
        card: "var(--brand-shadow-card)"
      }
    }
  },
  plugins: []
};

export default config;
