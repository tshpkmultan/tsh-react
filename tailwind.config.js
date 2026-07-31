/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        english: ["Poppins", "sans-serif"],
        urdu: ["JameelNoori", "serif"],
      },
    },
  },
  plugins: [],
};