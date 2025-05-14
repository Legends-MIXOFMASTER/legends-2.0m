const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          50: "rgba(10, 15, 44, 0.5)",
        },
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        dark: "#0a0f2c",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
};
export default tailwindConfig;import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          50: "rgba(10, 15, 44, 0.5)"
        },
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        dark: "#0a0f2c",
        light: "#f5f5f5",
        neutral: "#4a5568",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;