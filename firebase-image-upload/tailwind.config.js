/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'bright-green': '0 4px 9px 5px rgba(0, 255, 0, 0.1), 0 2px 4px -1px rgba(0, 255, 0, 0.2)',
        'bright-red': '0 4px 9px 5px rgba(255, 0, 0, 0.1), 0 2px 4px -1px rgba(255, 0, 0, 0.2)',
      },
      colors: {
        'lsu-purple': '#461d7c',
        'lsu-gold': '#fdd023',
      }
    },
  },
  plugins: [],
}