/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 🔹 toggle dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0046FF",
        secondary: "#001BB7",
      },
    },
  },
  plugins: [],
}
