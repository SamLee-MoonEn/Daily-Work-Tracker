/** @type {import('tailwindcss').Config} */
export default {
  content: ["/index.html", "./**/*.{ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["GmarketSansMedium"],
    },
  },
  plugins: [require("daisyui"), "twin.macro"],
  daisyui: { themes: [{ mytheme: { primary: "#3B6A5C" } }] },
};
