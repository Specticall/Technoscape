/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#6F51E6",
        light: "#F5F2FF",
      },
    },
  },
  plugins: [],
};
