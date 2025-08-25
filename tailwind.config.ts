import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-source-sans)"], // default body / UI
        display: ["var(--font-source-sans)"], // headings
      },
      colors: {
        brand: {
          DEFAULT: "#7c3aed",
          fg: "#ede9fe",
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
      },
      boxShadow: { glow: "0 0 40px rgba(124,58,237,0.25)" },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(1200px 600px at 10% 10%, rgba(124,58,237,0.25), transparent 50%), radial-gradient(800px 400px at 90% 20%, rgba(16,185,129,0.15), transparent 50%), radial-gradient(900px 500px at 50% 110%, rgba(14,165,233,0.20), transparent 60%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
