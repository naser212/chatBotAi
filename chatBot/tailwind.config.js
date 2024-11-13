/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purp: "#32305F",
        button: "#429383",
        dark: "#1E1F21",
        gold: "#D3A32A",
        ramd: "#D9D9D9",
      },
      fontFamily: {
        lato: "Lato",
      },
    },
  },
  plugins: [],
};
