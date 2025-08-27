/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class", // important for toggling dark/light mode
  theme: {
    extend: {},
  },
  plugins: [],
};
