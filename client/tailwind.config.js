/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Source Serif 4"', 'serif'],
        'serif-italic': ['"Source Serif 4"', 'serif', 'italic'],
      },
    },
  },
  plugins: [],
} 