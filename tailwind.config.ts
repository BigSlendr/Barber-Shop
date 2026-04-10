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
        card: "0 12px 30px rgba(0,0,0,0.25)"
      }
    }
  },
  plugins: []
};

export default config;
