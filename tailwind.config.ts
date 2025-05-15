import type { Config } from "tailwindcss";

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
        // Fonts from our design system
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'Satoshi', 'Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#321D12', // Deep Brown
          hover: '#4B2E1C'
        },
        secondary: '#FFF6E9', // Cream white
        accent: {
          DEFAULT: '#E6A756', // Gold
          hover: '#F0B979'
        },
        dark: '#1A1A1A',
        light: '#F5F5F5',
        neutral: '#4a5568',
      },
      spacing: {
        'section-y': 'clamp(80px, 10vw, 120px)',
        'section-x': 'clamp(16px, 5vw, 40px)',
      },
      borderRadius: {
        'xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
        'elevated': '0 10px 25px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)',
      },
      fontSize: {
        'hero': 'clamp(3rem, 6vw, 6rem)',
        'display': 'clamp(2.5rem, 5vw, 4.5rem)',
        'heading': 'clamp(2rem, 4vw, 3.5rem)',
        'subheading': 'clamp(1.5rem, 3vw, 2.5rem)',
        'title': 'clamp(1.25rem, 2vw, 2rem)',
        'body': 'clamp(1rem, 1.5vw, 1.2rem)',
      },
      lineHeight: {
        'tight': '1.1',
        'relaxed': '1.6',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;