/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0046FF",
        secondary: "#001BB7",
        accent: "#0000",
      },
    },
  },
  plugins: [],
}

