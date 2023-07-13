/** @type {import('tailwindcss').Config} */
export default {
  content: ["/index.html", "./**/*.{ts,tsx}"],
  theme: {
    extend: { colors: { light: "#79A9AE" } },
    fontFamily: {
      sans: ["GmarketSansMedium"],
    },
  },
  plugins: [require("daisyui"), "twin.macro"],
  daisyui: { themes: [{ mytheme: { primary: "#3B6A5C" } }] },
};
