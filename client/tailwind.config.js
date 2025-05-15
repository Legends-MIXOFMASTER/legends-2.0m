/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',   // Light blue-gray
          100: '#e6f2ff',  // Slightly darker light blue
          500: '#3b82f6',  // Typical blue
          700: '#1d4ed8',  // Dark blue
        },
      },
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        '.bg-primary-50': {
          backgroundColor: theme('colors.primary.50'),
        },
      });
    }
  ],
}
